import {Component, OnInit, ElementRef, EventEmitter, Inject, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {AngularEditorService} from './angular-editor.service';
import {HttpResponse} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {CustomClass, Font, Tag} from './config';
import {Observable} from 'rxjs';

@Component({
  selector: 'angular-editor-toolbar',
  templateUrl: './angular-editor-toolbar.component.html',
  styleUrls: ['./angular-editor-toolbar.component.scss']
})

export class AngularEditorToolbarComponent implements OnInit {
  id = '';
  htmlMode = false;
  showToolbar = true;
  linkSelected = false;
  block = 'default';
  defaultFontId;
  fontId = 0;
  fontSize = '5';
  fonts: Font[];

  customClassId = -1;
  customClasses: CustomClass[];
  currentTag: Tag = null;
  tagGroups: any[] = [];

  tagMap = {
    BLOCKQUOTE: 'indent',
    A: 'link'
  };

  select = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'PRE', 'DIV'];

  buttons = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'justifyLeft', 'justifyCenter',
    'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'link'];

  @Input() tagList: Tag[];

  @Output() execute: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('fileInput') myInputFile: ElementRef;


  constructor(private renderer: Renderer2,
              private editorService: AngularEditorService, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    console.log(this.tagList);
    if (this.tagList && this.tagList.length > 0) {
      this.tagList.forEach ( t => {
        let group = this.tagGroups.find(g => g.name === t.groupName);
        if (!group) {
          group = {name: t.groupName, tags: []};
          this.tagGroups.push(group);
        }
        group.tags.push(t);
      });
      console.log(this.tagGroups);
    }
  }
  /**
   * Trigger command from editor header buttons
   * @param command string from toolbar buttons
   */
  triggerCommand(command: string) {
    this.execute.emit(command);
  }

  /**
   * highlight editor buttons when cursor moved or positioning
   */
  triggerButtons() {
    if (!this.showToolbar) {
      return;
    }
    this.buttons.forEach(e => {
      const result = this.document.queryCommandState(e);
      const elementById = this.document.getElementById(e + '-' + this.id);
      if (result) {
        this.renderer.addClass(elementById, 'active');
      } else {
        this.renderer.removeClass(elementById, 'active');
      }
    });
  }

  /**
   * trigger highlight editor buttons when cursor moved or positioning in block
   */
  triggerBlocks(nodes: Node[]) {
    if (!this.showToolbar) {
      return;
    }
    this.linkSelected = nodes.findIndex(x => x.nodeName === 'A') > -1;
    let found = false;
    this.select.forEach(y => {
      const node = nodes.find(x => x.nodeName === y);
      if (node !== undefined && y === node.nodeName) {
        if (found === false) {
          this.block = node.nodeName.toLowerCase();
          found = true;
        }
      } else if (found === false) {
        this.block = 'default';
      }
    });

    found = false;
    if (this.fonts) {
      this.fonts.forEach((y, index) => {
        const node = nodes.find(x => {
          if (x instanceof HTMLFontElement) {
            return x.face === y.name;
          }
        });
        if (node !== undefined) {
          if (found === false) {
            this.fontId = index;
            found = true;
          }
        } else if (found === false) {
          this.fontId = this.defaultFontId;
        }
      });
    }

    found = false;
    if (this.customClasses) {
      this.customClasses.forEach((y, index) => {
        const node = nodes.find(x => {
          if (x instanceof Element) {
            return x.className === y.class;
          }
        });
        if (node !== undefined) {
          if (found === false) {
            this.customClassId = index;
            found = true;
          }
        } else if (found === false) {
          this.customClassId = -1;
        }
      });
    }

    Object.keys(this.tagMap).map(e => {
      const elementById = this.document.getElementById(this.tagMap[e] + '-' + this.id);
      const node = nodes.find(x => x.nodeName === e);
      if (node !== undefined && e === node.nodeName) {
        this.renderer.addClass(elementById, 'active');
      } else {
        this.renderer.removeClass(elementById, 'active');
      }
    });
  }

  /**
   * insert URL link
   */
  insertUrl() {
    const url = prompt('Insert URL link', `https://`);
    if (url && url !== '' && url !== `https://`) {
      this.editorService.createLink(url);
    }
  }

  /**
   * insert Vedio link
   */
  insertVideo() {
    this.execute.emit('');
    const url = prompt('Insert Video link', `https://`);
    if (url && url !== '' && url !== `https://`) {
      this.editorService.insertVideo(url);
    }
  }

  /**
   * insert Vedio link
   */
  insertTag() {
    this.execute.emit('');
    this.editorService.insertTag(this.currentTag);
    this.currentTag = null;
    this.execute.emit('');
  }

  /** insert color */
  insertColor(color: string, where: string) {
    this.editorService.insertColor(color, where);
    this.execute.emit('');
  }

  /**
   * set font Name/family
   * @param fontId number
   */
  setFontName(fontId: number): void {
    this.editorService.setFontName(this.fonts[fontId].name);
    this.execute.emit('');
  }

  /**
   * set font Size
   * @param fontSize string
   */
  setFontSize(fontSize: string): void {
    this.editorService.setFontSize(fontSize);
    this.execute.emit('');
  }

  /**
   * toggle editor mode (WYSIWYG or SOURCE)
   * @param m boolean
   */
  setEditorMode(m: boolean) {
    const toggleEditorModeButton = this.document.getElementById('toggleEditorMode' + '-' + this.id);
    if (m) {
      this.renderer.addClass(toggleEditorModeButton, 'active');
    } else {
      this.renderer.removeClass(toggleEditorModeButton, 'active');
    }
    this.htmlMode = m;
  }

  /**
   * Upload image when file is selected
   */
  onFileChanged(event) {
    const file = event.target.files[0];
    if (file.type.includes('image/')) {
      this.editorService.uploadImage(file).subscribe(e => {
        if (e instanceof HttpResponse) {
          this.execute.emit('');
          this.editorService.insertImage(e.body.imageUrl);
          this.fileReset();
        }
      });
    }
  }

  /**
   * Reset Input
   */
  fileReset() {
    this.myInputFile.nativeElement.value = '';
  }

  /**
   * Set custom class
   */
  setCustomClass(classId: number) {
    this.editorService.createCustomClass(this.customClasses[classId]);
  }
}
