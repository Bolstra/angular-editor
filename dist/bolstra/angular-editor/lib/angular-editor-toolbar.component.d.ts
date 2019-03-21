import { OnInit, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { AngularEditorService } from './angular-editor.service';
import { CustomClass, Font, Tag } from './config';
import { Observable } from 'rxjs';
export declare class AngularEditorToolbarComponent implements OnInit {
    private renderer;
    private editorService;
    private document;
    id: string;
    htmlMode: boolean;
    showToolbar: boolean;
    linkSelected: boolean;
    block: string;
    defaultFontId: any;
    fontId: number;
    fontSize: string;
    fonts: Font[];
    tagList?: Observable<Tag[]>;
    customClassId: number;
    customClasses: CustomClass[];
    currentTag: Tag;
    tagGroups: any[];
    tagMap: {
        BLOCKQUOTE: string;
        A: string;
    };
    select: string[];
    buttons: string[];
    execute: EventEmitter<string>;
    myInputFile: ElementRef;
    constructor(renderer: Renderer2, editorService: AngularEditorService, document: any);
    ngOnInit(): void;
    /**
     * Trigger command from editor header buttons
     * @param command string from toolbar buttons
     */
    triggerCommand(command: string): void;
    /**
     * highlight editor buttons when cursor moved or positioning
     */
    triggerButtons(): void;
    /**
     * trigger highlight editor buttons when cursor moved or positioning in block
     */
    triggerBlocks(nodes: Node[]): void;
    /**
     * insert URL link
     */
    insertUrl(): void;
    /**
     * insert Vedio link
     */
    insertVideo(): void;
    /**
     * insert Vedio link
     */
    insertTag(): void;
    /** insert color */
    insertColor(color: string, where: string): void;
    /**
     * set font Name/family
     * @param fontId number
     */
    setFontName(fontId: number): void;
    /**
     * set font Size
     * @param fontSize string
     */
    setFontSize(fontSize: string): void;
    /**
     * toggle editor mode (WYSIWYG or SOURCE)
     * @param m boolean
     */
    setEditorMode(m: boolean): void;
    /**
     * Upload image when file is selected
     */
    onFileChanged(event: any): void;
    /**
     * Reset Input
     */
    fileReset(): void;
    /**
     * Set custom class
     */
    setCustomClass(classId: number): void;
}
