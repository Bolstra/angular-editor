/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Inject, Output, Renderer2, ViewChild } from '@angular/core';
import { AngularEditorService } from './angular-editor.service';
import { HttpResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
var AngularEditorToolbarComponent = /** @class */ (function () {
    function AngularEditorToolbarComponent(_renderer, editorService, _document) {
        this._renderer = _renderer;
        this.editorService = editorService;
        this._document = _document;
        this.id = '';
        this.htmlMode = false;
        this.showToolbar = true;
        this.linkSelected = false;
        this.block = 'default';
        this.fontId = 0;
        this.fontSize = '5';
        this.customClassId = -1;
        this.currentTag = null;
        this.tagMap = {
            BLOCKQUOTE: 'indent',
            A: 'link'
        };
        this.select = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'PRE', 'DIV'];
        this.buttons = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'justifyLeft', 'justifyCenter',
            'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'link'];
        this.tagGroups = [
            { name: 'Contact', tags: [
                    { name: 'First Name', field: 'accountUser.firstName' },
                    { name: 'Last Name', field: 'accountUser.lastName' }
                ] },
            { name: 'Account', tags: [
                    { name: 'Account Title', field: 'account.title' }
                ] },
            { name: 'Activity', tags: [
                    { name: 'Activity Title', field: 'activity.title' },
                    { name: 'Activity Start Date', field: 'activity.startDate' }
                ] }
        ];
        this.execute = new EventEmitter();
    }
    /**
     * Trigger command from editor header buttons
     * @param command string from toolbar buttons
     */
    /**
     * Trigger command from editor header buttons
     * @param {?} command string from toolbar buttons
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.triggerCommand = /**
     * Trigger command from editor header buttons
     * @param {?} command string from toolbar buttons
     * @return {?}
     */
    function (command) {
        this.execute.emit(command);
    };
    /**
     * highlight editor buttons when cursor moved or positioning
     */
    /**
     * highlight editor buttons when cursor moved or positioning
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.triggerButtons = /**
     * highlight editor buttons when cursor moved or positioning
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.showToolbar) {
            return;
        }
        this.buttons.forEach((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var result = _this._document.queryCommandState(e);
            /** @type {?} */
            var elementById = _this._document.getElementById(e + '-' + _this.id);
            if (result) {
                _this._renderer.addClass(elementById, 'active');
            }
            else {
                _this._renderer.removeClass(elementById, 'active');
            }
        }));
    };
    /**
     * trigger highlight editor buttons when cursor moved or positioning in block
     */
    /**
     * trigger highlight editor buttons when cursor moved or positioning in block
     * @param {?} nodes
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.triggerBlocks = /**
     * trigger highlight editor buttons when cursor moved or positioning in block
     * @param {?} nodes
     * @return {?}
     */
    function (nodes) {
        var _this = this;
        if (!this.showToolbar) {
            return;
        }
        this.linkSelected = nodes.findIndex((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.nodeName === 'A'; })) > -1;
        /** @type {?} */
        var found = false;
        this.select.forEach((/**
         * @param {?} y
         * @return {?}
         */
        function (y) {
            /** @type {?} */
            var node = nodes.find((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.nodeName === y; }));
            if (node !== undefined && y === node.nodeName) {
                if (found === false) {
                    _this.block = node.nodeName.toLowerCase();
                    found = true;
                }
            }
            else if (found === false) {
                _this.block = 'default';
            }
        }));
        found = false;
        if (this.fonts) {
            this.fonts.forEach((/**
             * @param {?} y
             * @param {?} index
             * @return {?}
             */
            function (y, index) {
                /** @type {?} */
                var node = nodes.find((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) {
                    if (x instanceof HTMLFontElement) {
                        return x.face === y.name;
                    }
                }));
                if (node !== undefined) {
                    if (found === false) {
                        _this.fontId = index;
                        found = true;
                    }
                }
                else if (found === false) {
                    _this.fontId = _this.defaultFontId;
                }
            }));
        }
        found = false;
        if (this.customClasses) {
            this.customClasses.forEach((/**
             * @param {?} y
             * @param {?} index
             * @return {?}
             */
            function (y, index) {
                /** @type {?} */
                var node = nodes.find((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) {
                    if (x instanceof Element) {
                        return x.className === y.class;
                    }
                }));
                if (node !== undefined) {
                    if (found === false) {
                        _this.customClassId = index;
                        found = true;
                    }
                }
                else if (found === false) {
                    _this.customClassId = -1;
                }
            }));
        }
        Object.keys(this.tagMap).map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var elementById = _this._document.getElementById(_this.tagMap[e] + '-' + _this.id);
            /** @type {?} */
            var node = nodes.find((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.nodeName === e; }));
            if (node !== undefined && e === node.nodeName) {
                _this._renderer.addClass(elementById, 'active');
            }
            else {
                _this._renderer.removeClass(elementById, 'active');
            }
        }));
    };
    /**
     * insert URL link
     */
    /**
     * insert URL link
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.insertUrl = /**
     * insert URL link
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = prompt('Insert URL link', "https://");
        if (url && url !== '' && url !== "https://") {
            this.editorService.createLink(url);
        }
    };
    /**
     * insert Vedio link
     */
    /**
     * insert Vedio link
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.insertVideo = /**
     * insert Vedio link
     * @return {?}
     */
    function () {
        this.execute.emit('');
        /** @type {?} */
        var url = prompt('Insert Video link', "https://");
        if (url && url !== '' && url !== "https://") {
            this.editorService.insertVideo(url);
        }
    };
    /**
     * insert Vedio link
     */
    /**
     * insert Vedio link
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.insertTag = /**
     * insert Vedio link
     * @return {?}
     */
    function () {
        this.execute.emit('');
        this.editorService.insertTag(this.currentTag);
        this.currentTag = null;
        this.execute.emit('');
    };
    /** insert color */
    /**
     * insert color
     * @param {?} color
     * @param {?} where
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.insertColor = /**
     * insert color
     * @param {?} color
     * @param {?} where
     * @return {?}
     */
    function (color, where) {
        this.editorService.insertColor(color, where);
        this.execute.emit('');
    };
    /**
     * set font Name/family
     * @param fontId number
     */
    /**
     * set font Name/family
     * @param {?} fontId number
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.setFontName = /**
     * set font Name/family
     * @param {?} fontId number
     * @return {?}
     */
    function (fontId) {
        this.editorService.setFontName(this.fonts[fontId].name);
        this.execute.emit('');
    };
    /**
     * set font Size
     * @param fontSize string
     *  */
    /**
     * set font Size
     * @param {?} fontSize string
     *
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.setFontSize = /**
     * set font Size
     * @param {?} fontSize string
     *
     * @return {?}
     */
    function (fontSize) {
        this.editorService.setFontSize(fontSize);
        this.execute.emit('');
    };
    /**
     * toggle editor mode (WYSIWYG or SOURCE)
     * @param m boolean
     */
    /**
     * toggle editor mode (WYSIWYG or SOURCE)
     * @param {?} m boolean
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.setEditorMode = /**
     * toggle editor mode (WYSIWYG or SOURCE)
     * @param {?} m boolean
     * @return {?}
     */
    function (m) {
        /** @type {?} */
        var toggleEditorModeButton = this._document.getElementById('toggleEditorMode' + '-' + this.id);
        if (m) {
            this._renderer.addClass(toggleEditorModeButton, 'active');
        }
        else {
            this._renderer.removeClass(toggleEditorModeButton, 'active');
        }
        this.htmlMode = m;
    };
    /**
     * Upload image when file is selected
     */
    /**
     * Upload image when file is selected
     * @param {?} event
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.onFileChanged = /**
     * Upload image when file is selected
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var file = event.target.files[0];
        if (file.type.includes('image/')) {
            this.editorService.uploadImage(file).subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (e instanceof HttpResponse) {
                    _this.editorService.insertImage(e.body.imageUrl);
                    _this.fileReset();
                }
            }));
        }
    };
    /**
     * Reset Input
     */
    /**
     * Reset Input
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.fileReset = /**
     * Reset Input
     * @return {?}
     */
    function () {
        this.myInputFile.nativeElement.value = '';
    };
    /**
     * Set custom class
     */
    /**
     * Set custom class
     * @param {?} classId
     * @return {?}
     */
    AngularEditorToolbarComponent.prototype.setCustomClass = /**
     * Set custom class
     * @param {?} classId
     * @return {?}
     */
    function (classId) {
        this.editorService.createCustomClass(this.customClasses[classId]);
    };
    AngularEditorToolbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'angular-editor-toolbar',
                    template: "<div class=\"angular-editor-toolbar\" *ngIf=\"showToolbar\">\n  <div class=\"angular-editor-toolbar-set\">\n    <button type=\"button\" title=\"Undo\" class=\"angular-editor-button\" (click)=\"triggerCommand('undo')\" tabindex=\"-1\"><i\n      class='fa fa-undo'></i></button>\n    <button type=\"button\" title=\"Redo\" class=\"angular-editor-button\" (click)=\"triggerCommand('redo')\" tabindex=\"-1\"><i\n      class='fa fa-repeat'></i></button>\n  </div>\n  <div class=\"angular-editor-toolbar-set\">\n    <button [id]=\"'bold-'+id\" type=\"button\" title=\"Bold\" class=\"angular-editor-button\" (click)=\"triggerCommand('bold')\"\n            [disabled]=\"htmlMode\" tabindex=\"-1\"><i class='fa fa-bold'></i></button>\n    <button [id]=\"'italic-'+id\" type=\"button\" title=\"Italic\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('italic')\"\n            [disabled]=\"htmlMode\" tabindex=\"-1\"><i class='fa fa-italic'></i></button>\n    <button [id]=\"'underline-'+id\" type=\"button\" title=\"Underline\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('underline')\" [disabled]=\"htmlMode\" tabindex=\"-1\"><i class='fa fa-underline'></i></button>\n    <button [id]=\"'strikeThrough-'+id\" type=\"button\" title=\"Strikethrough\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('strikeThrough')\" [disabled]=\"htmlMode\" tabindex=\"-1\"><i class='fa fa-strikethrough'></i></button>\n    <button [id]=\"'subscript-'+id\" type=\"button\" title=\"Subscript\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('subscript')\" [disabled]=\"htmlMode\" tabindex=\"-1\"><i class='fa fa-subscript'></i></button>\n    <button [id]=\"'superscript-'+id\" type=\"button\" title=\"Superscript\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('superscript')\" [disabled]=\"htmlMode\" tabindex=\"-1\"><i class='fa fa-superscript'></i></button>\n  </div>\n  <div class=\"angular-editor-toolbar-set\">\n    <button [id]=\"'justifyLeft-'+id\" type=\"button\" title=\"Justify Left\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('justifyLeft')\" [disabled]=\"htmlMode\" tabindex=\"-1\"><i\n      class='fa fa-align-left'></i></button>\n    <button [id]=\"'justifyCenter-'+id\" type=\"button\" title=\"Justify Center\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('justifyCenter')\" [disabled]=\"htmlMode\" tabindex=\"-1\"><i class='fa fa-align-center'></i></button>\n    <button [id]=\"'justifyRight-'+id\" type=\"button\" title=\"Justify Right\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('justifyRight')\" [disabled]=\"htmlMode\" tabindex=\"-1\">\n      <i class='fa fa-align-right'></i></button>\n    <button [id]=\"'justifyFull-'+id\" type=\"button\" title=\"Justify Full\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('justifyFull')\" [disabled]=\"htmlMode\" tabindex=\"-1\"><i\n      class='fa fa-align-justify'></i></button>\n  </div>\n  <div class=\"angular-editor-toolbar-set\">\n    <button [id]=\"'indent-'+id\" type=\"button\" title=\"Indent\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('indent')\"\n            [disabled]=\"htmlMode\" tabindex=\"-1\"><i\n      class='fa fa-indent'></i></button>\n    <button [id]=\"'outdent-'+id\" type=\"button\" title=\"Outdent\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('outdent')\"\n            [disabled]=\"htmlMode\" tabindex=\"-1\"><i\n      class='fa fa-outdent'></i></button>\n  </div>\n  <div class=\"angular-editor-toolbar-set\">\n    <button [id]=\"'insertUnorderedList-'+id\" type=\"button\" title=\"Unordered List\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('insertUnorderedList')\" [disabled]=\"htmlMode\" tabindex=\"-1\"><i class='fa fa-list-ul'></i></button>\n    <button [id]=\"'insertOrderedList-'+id\" type=\"button\" title=\"Ordered List\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('insertOrderedList')\" [disabled]=\"htmlMode\" tabindex=\"-1\"><i class='fa fa-list-ol'></i></button>\n  </div>\n  <div class=\"angular-editor-toolbar-set\">\n    <label [for]=\"'heading-'+id\" class=\"block-label\" tabindex=\"-1\"></label>\n    <select title=\"Formatting\" [id]=\"'heading-'+id\" class=\"select-heading\" [(ngModel)]=\"block\"\n            (change)=\"triggerCommand(block)\"\n            [disabled]=\"htmlMode\"  tabindex=\"-1\">\n      <optgroup label=\"Formatting\"></optgroup>\n      <option class=\"h1\" value=\"h1\">Heading 1</option>\n      <option class=\"h2\" value=\"h2\">Heading 2</option>\n      <option class=\"h3\" value=\"h3\">Heading 3</option>\n      <option class=\"h4\" value=\"h4\">Heading 4</option>\n      <option class=\"h5\" value=\"h5\">Heading 5</option>\n      <option class=\"h6\" value=\"h6\">Heading 6</option>\n      <option class=\"p\" value=\"p\">Paragraph</option>\n      <option class=\"pre\" value=\"pre\">Predefined</option>\n      <option class=\"div\" value=\"div\">Standard</option>\n      <option class=\"default\" value=\"default\">Default</option>\n    </select>\n  </div>\n  <div class=\"angular-editor-toolbar-set\">\n    <label [for]=\"'fontSelector-'+id\" class=\"block-label\"></label>\n    <select title=\"Font Name\" [id]=\"'fontSelector-'+id\" class=\"select-font\" [(ngModel)]=\"fontId\"\n            (change)=\"setFontName(fontId)\"\n            [disabled]=\"htmlMode\" tabindex=\"-1\">\n      <optgroup label=\"Font Name\"></optgroup>\n      <option *ngFor=\"let item of fonts; let i = index\" [class]=\"item.class\" [value]=\"i\">{{item.name}}</option>\n     <!-- <option class=\"arial\" value=\"Arial\">Arial</option>\n      <option class=\"calibri\" value=\"Calibri\">Calibri</option>\n      <option class=\"comic-sans-ms\" value=\"Comic Sans MS\">Comic Sans MS</option>\n      <option class=\"times-new-roman\" value=\"Times New Roman\">Times New Roman</option>-->\n    </select>\n  </div>\n  <div class=\"angular-editor-toolbar-set\">\n    <label [for]=\"'fontSizeSelector-'+id\" class=\"block-label\"></label>\n    <select title=\"Font Size\" [id]=\"'fontSizeSelector-'+id\" class=\"select-font-size\" [(ngModel)]=\"fontSize\"\n            (change)=\"setFontSize(fontSize)\"\n            [disabled]=\"htmlMode\" tabindex=\"-1\">\n      <optgroup label=\"Font Sizing\"></optgroup>\n      <option class=\"size1\" value=\"1\">1</option>\n      <option class=\"size2\" value=\"2\">2</option>\n      <option class=\"size3\" value=\"3\">3</option>\n      <option class=\"size4\" value=\"4\">4</option>\n      <option class=\"size5\" value=\"5\">5</option>\n      <option class=\"size6\" value=\"6\">6</option>\n      <option class=\"size7\" value=\"7\">7</option>\n    </select>\n  </div>\n  <div class=\"angular-editor-toolbar-set\">\n    <input\n      style=\"display: none\"\n      type=\"color\" (change)=\"insertColor(fgInput.value, 'textColor')\"\n      #fgInput>\n    <button [id]=\"'foregroundColorPicker-'+id\" type=\"button\" class=\"angular-editor-button\" (click)=\"fgInput.click()\" title=\"Text Color\"\n            [disabled]=\"htmlMode\" tabindex=\"-1\"><span class=\"color-label foreground\"><i class=\"fa fa-font\"></i></span></button>\n    <input\n      style=\"display: none\"\n      type=\"color\" (change)=\"insertColor(bgInput.value, 'backgroundColor')\"\n      #bgInput>\n    <button [id]=\"'backgroundColorPicker-'+id\" type=\"button\" class=\"angular-editor-button\" (click)=\"bgInput.click()\" title=\"Background Color\"\n            [disabled]=\"htmlMode\" tabindex=\"-1\"><span class=\"color-label background\"><i class=\"fa fa-font\"></i></span></button>\n  </div>\n  <div *ngIf=\"customClasses\" class=\"angular-editor-toolbar-set\">\n    <label [for]=\"'customClassSelector-'+id\" class=\"block-label\"></label>\n    <select title=\"Custom Style\" [id]=\"'customClassSelector-'+id\" class=\"select-custom-style\" [(ngModel)]=\"customClassId\"\n            (change)=\"setCustomClass(customClassId)\"\n            [disabled]=\"htmlMode\" tabindex=\"-1\">\n      <optgroup label=\"Custom Class\"></optgroup>\n      <option class=\"\" value=-1>Clear Class</option>\n      <option *ngFor=\"let item of customClasses; let i = index\" [class]=\"item.class\" [value]=\"i\">{{item.name}}</option>\n    </select>\n  </div>\n  <div class=\"angular-editor-toolbar-set\">\n    <button [id]=\"'link-'+id\" type=\"button\" class=\"angular-editor-button\" (click)=\"insertUrl()\"\n            title=\"Insert Link\" [disabled]=\"htmlMode\" tabindex=\"-1\">\n      <i class=\"fa fa-link\"></i>\n    </button>\n    <button type=\"button\" class=\"angular-editor-button\" (click)=\"triggerCommand('unlink')\"\n            title=\"Unlink\" [disabled]=\"htmlMode||!linkSelected\" tabindex=\"-1\">\n      <i class=\"fa fa-chain-broken\"></i>\n    </button>\n    <input\n      style=\"display: none\"\n      accept=\"image/*\"\n      type=\"file\" (change)=\"onFileChanged($event)\"\n      #fileInput>\n    <button type=\"button\" class=\"angular-editor-button\" (click)=\"fileInput.click()\" title=\"Insert Image\"\n            [disabled]=\"htmlMode\" tabindex=\"-1\"><i class=\"fa fa-image\"></i></button>\n    <button type=\"button\" class=\"angular-editor-button\" (click)=\"insertVideo()\" title=\"Insert Vedio\"\n            [disabled]=\"htmlMode\" tabindex=\"-1\"><i class=\"fa fa-video-camera\"></i></button>\n    <button type=\"button\" title=\"Horizontal Line\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('insertHorizontalRule')\" [disabled]=\"htmlMode\" tabindex=\"-1\"><i class=\"fa fa-minus\"></i></button>\n  </div>\n  <div class=\"angular-editor-toolbar-set\">\n  \n    <select title=\"Insert Custom Tags\" [(ngModel)]=\"currentTag\"\n      (change)=\"insertTag()\"\n      [disabled]=\"htmlMode\" tabindex=\"-1\" style='width: 150px !important'>\n      <option [value]=null>Replacement Tags</option>\n      <optgroup *ngFor=\"let group of tagGroups\" [label]=\"group.name\" style=\"font-weight: bold\">\n        <option *ngFor=\"let item of group.tags\" [ngValue]=\"item\">{{item.name}}</option>\n      </optgroup>\n    </select>\n  </div>\n\n  <div class=\"angular-editor-toolbar-set\">\n    <button type=\"button\" title=\"Clear Formatting\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('removeFormat')\" [disabled]=\"htmlMode\" tabindex=\"-1\"><i class='fa fa-remove'></i></button>\n  </div>\n  <div class=\"angular-editor-toolbar-set\">\n    <button [id]=\"'toggleEditorMode-'+id\" type=\"button\" title=\"HTML Code\" class=\"angular-editor-button\"\n            (click)=\"triggerCommand('toggleEditorMode')\" tabindex=\"-1\"><i class='fa fa-code'></i></button>\n  </div>\n</div>\n",
                    styles: ["@charset \"UTF-8\";/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */@font-face{font-family:FontAwesome;src:url(https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?v=4.7.0);src:url(https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0) format(\"embedded-opentype\"),url(https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0) format(\"woff2\"),url(https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0) format(\"woff\"),url(https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0) format(\"truetype\"),url(https://netdna.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular) format(\"svg\");font-weight:400;font-style:normal}.fa{display:inline-block;font:14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14286em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14286em;width:2.14286em;top:.14286em;text-align:center}.fa-li.fa-lg{left:-1.85714em}.fa-border{padding:.2em .25em .15em;border:.08em solid #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:2s linear infinite fa-spin;animation:2s linear infinite fa-spin}.fa-pulse{-webkit-animation:1s steps(8) infinite fa-spin;animation:1s steps(8) infinite fa-spin}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-webkit-transform:scale(1,-1);transform:scale(1,-1)}:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{-webkit-filter:none;filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:\"\uF000\"}.fa-music:before{content:\"\uF001\"}.fa-search:before{content:\"\uF002\"}.fa-envelope-o:before{content:\"\uF003\"}.fa-heart:before{content:\"\uF004\"}.fa-star:before{content:\"\uF005\"}.fa-star-o:before{content:\"\uF006\"}.fa-user:before{content:\"\uF007\"}.fa-film:before{content:\"\uF008\"}.fa-th-large:before{content:\"\uF009\"}.fa-th:before{content:\"\uF00A\"}.fa-th-list:before{content:\"\uF00B\"}.fa-check:before{content:\"\uF00C\"}.fa-close:before,.fa-remove:before,.fa-times:before{content:\"\uF00D\"}.fa-search-plus:before{content:\"\uF00E\"}.fa-search-minus:before{content:\"\uF010\"}.fa-power-off:before{content:\"\uF011\"}.fa-signal:before{content:\"\uF012\"}.fa-cog:before,.fa-gear:before{content:\"\uF013\"}.fa-trash-o:before{content:\"\uF014\"}.fa-home:before{content:\"\uF015\"}.fa-file-o:before{content:\"\uF016\"}.fa-clock-o:before{content:\"\uF017\"}.fa-road:before{content:\"\uF018\"}.fa-download:before{content:\"\uF019\"}.fa-arrow-circle-o-down:before{content:\"\uF01A\"}.fa-arrow-circle-o-up:before{content:\"\uF01B\"}.fa-inbox:before{content:\"\uF01C\"}.fa-play-circle-o:before{content:\"\uF01D\"}.fa-repeat:before,.fa-rotate-right:before{content:\"\uF01E\"}.fa-refresh:before{content:\"\uF021\"}.fa-list-alt:before{content:\"\uF022\"}.fa-lock:before{content:\"\uF023\"}.fa-flag:before{content:\"\uF024\"}.fa-headphones:before{content:\"\uF025\"}.fa-volume-off:before{content:\"\uF026\"}.fa-volume-down:before{content:\"\uF027\"}.fa-volume-up:before{content:\"\uF028\"}.fa-qrcode:before{content:\"\uF029\"}.fa-barcode:before{content:\"\uF02A\"}.fa-tag:before{content:\"\uF02B\"}.fa-tags:before{content:\"\uF02C\"}.fa-book:before{content:\"\uF02D\"}.fa-bookmark:before{content:\"\uF02E\"}.fa-print:before{content:\"\uF02F\"}.fa-camera:before{content:\"\uF030\"}.fa-font:before{content:\"\uF031\"}.fa-bold:before{content:\"\uF032\"}.fa-italic:before{content:\"\uF033\"}.fa-text-height:before{content:\"\uF034\"}.fa-text-width:before{content:\"\uF035\"}.fa-align-left:before{content:\"\uF036\"}.fa-align-center:before{content:\"\uF037\"}.fa-align-right:before{content:\"\uF038\"}.fa-align-justify:before{content:\"\uF039\"}.fa-list:before{content:\"\uF03A\"}.fa-dedent:before,.fa-outdent:before{content:\"\uF03B\"}.fa-indent:before{content:\"\uF03C\"}.fa-video-camera:before{content:\"\uF03D\"}.fa-image:before,.fa-photo:before,.fa-picture-o:before{content:\"\uF03E\"}.fa-pencil:before{content:\"\uF040\"}.fa-map-marker:before{content:\"\uF041\"}.fa-adjust:before{content:\"\uF042\"}.fa-tint:before{content:\"\uF043\"}.fa-edit:before,.fa-pencil-square-o:before{content:\"\uF044\"}.fa-share-square-o:before{content:\"\uF045\"}.fa-check-square-o:before{content:\"\uF046\"}.fa-arrows:before{content:\"\uF047\"}.fa-step-backward:before{content:\"\uF048\"}.fa-fast-backward:before{content:\"\uF049\"}.fa-backward:before{content:\"\uF04A\"}.fa-play:before{content:\"\uF04B\"}.fa-pause:before{content:\"\uF04C\"}.fa-stop:before{content:\"\uF04D\"}.fa-forward:before{content:\"\uF04E\"}.fa-fast-forward:before{content:\"\uF050\"}.fa-step-forward:before{content:\"\uF051\"}.fa-eject:before{content:\"\uF052\"}.fa-chevron-left:before{content:\"\uF053\"}.fa-chevron-right:before{content:\"\uF054\"}.fa-plus-circle:before{content:\"\uF055\"}.fa-minus-circle:before{content:\"\uF056\"}.fa-times-circle:before{content:\"\uF057\"}.fa-check-circle:before{content:\"\uF058\"}.fa-question-circle:before{content:\"\uF059\"}.fa-info-circle:before{content:\"\uF05A\"}.fa-crosshairs:before{content:\"\uF05B\"}.fa-times-circle-o:before{content:\"\uF05C\"}.fa-check-circle-o:before{content:\"\uF05D\"}.fa-ban:before{content:\"\uF05E\"}.fa-arrow-left:before{content:\"\uF060\"}.fa-arrow-right:before{content:\"\uF061\"}.fa-arrow-up:before{content:\"\uF062\"}.fa-arrow-down:before{content:\"\uF063\"}.fa-mail-forward:before,.fa-share:before{content:\"\uF064\"}.fa-expand:before{content:\"\uF065\"}.fa-compress:before{content:\"\uF066\"}.fa-plus:before{content:\"\uF067\"}.fa-minus:before{content:\"\uF068\"}.fa-asterisk:before{content:\"\uF069\"}.fa-exclamation-circle:before{content:\"\uF06A\"}.fa-gift:before{content:\"\uF06B\"}.fa-leaf:before{content:\"\uF06C\"}.fa-fire:before{content:\"\uF06D\"}.fa-eye:before{content:\"\uF06E\"}.fa-eye-slash:before{content:\"\uF070\"}.fa-exclamation-triangle:before,.fa-warning:before{content:\"\uF071\"}.fa-plane:before{content:\"\uF072\"}.fa-calendar:before{content:\"\uF073\"}.fa-random:before{content:\"\uF074\"}.fa-comment:before{content:\"\uF075\"}.fa-magnet:before{content:\"\uF076\"}.fa-chevron-up:before{content:\"\uF077\"}.fa-chevron-down:before{content:\"\uF078\"}.fa-retweet:before{content:\"\uF079\"}.fa-shopping-cart:before{content:\"\uF07A\"}.fa-folder:before{content:\"\uF07B\"}.fa-folder-open:before{content:\"\uF07C\"}.fa-arrows-v:before{content:\"\uF07D\"}.fa-arrows-h:before{content:\"\uF07E\"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:\"\uF080\"}.fa-twitter-square:before{content:\"\uF081\"}.fa-facebook-square:before{content:\"\uF082\"}.fa-camera-retro:before{content:\"\uF083\"}.fa-key:before{content:\"\uF084\"}.fa-cogs:before,.fa-gears:before{content:\"\uF085\"}.fa-comments:before{content:\"\uF086\"}.fa-thumbs-o-up:before{content:\"\uF087\"}.fa-thumbs-o-down:before{content:\"\uF088\"}.fa-star-half:before{content:\"\uF089\"}.fa-heart-o:before{content:\"\uF08A\"}.fa-sign-out:before{content:\"\uF08B\"}.fa-linkedin-square:before{content:\"\uF08C\"}.fa-thumb-tack:before{content:\"\uF08D\"}.fa-external-link:before{content:\"\uF08E\"}.fa-sign-in:before{content:\"\uF090\"}.fa-trophy:before{content:\"\uF091\"}.fa-github-square:before{content:\"\uF092\"}.fa-upload:before{content:\"\uF093\"}.fa-lemon-o:before{content:\"\uF094\"}.fa-phone:before{content:\"\uF095\"}.fa-square-o:before{content:\"\uF096\"}.fa-bookmark-o:before{content:\"\uF097\"}.fa-phone-square:before{content:\"\uF098\"}.fa-twitter:before{content:\"\uF099\"}.fa-facebook-f:before,.fa-facebook:before{content:\"\uF09A\"}.fa-github:before{content:\"\uF09B\"}.fa-unlock:before{content:\"\uF09C\"}.fa-credit-card:before{content:\"\uF09D\"}.fa-feed:before,.fa-rss:before{content:\"\uF09E\"}.fa-hdd-o:before{content:\"\uF0A0\"}.fa-bullhorn:before{content:\"\uF0A1\"}.fa-bell:before{content:\"\uF0F3\"}.fa-certificate:before{content:\"\uF0A3\"}.fa-hand-o-right:before{content:\"\uF0A4\"}.fa-hand-o-left:before{content:\"\uF0A5\"}.fa-hand-o-up:before{content:\"\uF0A6\"}.fa-hand-o-down:before{content:\"\uF0A7\"}.fa-arrow-circle-left:before{content:\"\uF0A8\"}.fa-arrow-circle-right:before{content:\"\uF0A9\"}.fa-arrow-circle-up:before{content:\"\uF0AA\"}.fa-arrow-circle-down:before{content:\"\uF0AB\"}.fa-globe:before{content:\"\uF0AC\"}.fa-wrench:before{content:\"\uF0AD\"}.fa-tasks:before{content:\"\uF0AE\"}.fa-filter:before{content:\"\uF0B0\"}.fa-briefcase:before{content:\"\uF0B1\"}.fa-arrows-alt:before{content:\"\uF0B2\"}.fa-group:before,.fa-users:before{content:\"\uF0C0\"}.fa-chain:before,.fa-link:before{content:\"\uF0C1\"}.fa-cloud:before{content:\"\uF0C2\"}.fa-flask:before{content:\"\uF0C3\"}.fa-cut:before,.fa-scissors:before{content:\"\uF0C4\"}.fa-copy:before,.fa-files-o:before{content:\"\uF0C5\"}.fa-paperclip:before{content:\"\uF0C6\"}.fa-floppy-o:before,.fa-save:before{content:\"\uF0C7\"}.fa-square:before{content:\"\uF0C8\"}.fa-bars:before,.fa-navicon:before,.fa-reorder:before{content:\"\uF0C9\"}.fa-list-ul:before{content:\"\uF0CA\"}.fa-list-ol:before{content:\"\uF0CB\"}.fa-strikethrough:before{content:\"\uF0CC\"}.fa-underline:before{content:\"\uF0CD\"}.fa-table:before{content:\"\uF0CE\"}.fa-magic:before{content:\"\uF0D0\"}.fa-truck:before{content:\"\uF0D1\"}.fa-pinterest:before{content:\"\uF0D2\"}.fa-pinterest-square:before{content:\"\uF0D3\"}.fa-google-plus-square:before{content:\"\uF0D4\"}.fa-google-plus:before{content:\"\uF0D5\"}.fa-money:before{content:\"\uF0D6\"}.fa-caret-down:before{content:\"\uF0D7\"}.fa-caret-up:before{content:\"\uF0D8\"}.fa-caret-left:before{content:\"\uF0D9\"}.fa-caret-right:before{content:\"\uF0DA\"}.fa-columns:before{content:\"\uF0DB\"}.fa-sort:before,.fa-unsorted:before{content:\"\uF0DC\"}.fa-sort-desc:before,.fa-sort-down:before{content:\"\uF0DD\"}.fa-sort-asc:before,.fa-sort-up:before{content:\"\uF0DE\"}.fa-envelope:before{content:\"\uF0E0\"}.fa-linkedin:before{content:\"\uF0E1\"}.fa-rotate-left:before,.fa-undo:before{content:\"\uF0E2\"}.fa-gavel:before,.fa-legal:before{content:\"\uF0E3\"}.fa-dashboard:before,.fa-tachometer:before{content:\"\uF0E4\"}.fa-comment-o:before{content:\"\uF0E5\"}.fa-comments-o:before{content:\"\uF0E6\"}.fa-bolt:before,.fa-flash:before{content:\"\uF0E7\"}.fa-sitemap:before{content:\"\uF0E8\"}.fa-umbrella:before{content:\"\uF0E9\"}.fa-clipboard:before,.fa-paste:before{content:\"\uF0EA\"}.fa-lightbulb-o:before{content:\"\uF0EB\"}.fa-exchange:before{content:\"\uF0EC\"}.fa-cloud-download:before{content:\"\uF0ED\"}.fa-cloud-upload:before{content:\"\uF0EE\"}.fa-user-md:before{content:\"\uF0F0\"}.fa-stethoscope:before{content:\"\uF0F1\"}.fa-suitcase:before{content:\"\uF0F2\"}.fa-bell-o:before{content:\"\uF0A2\"}.fa-coffee:before{content:\"\uF0F4\"}.fa-cutlery:before{content:\"\uF0F5\"}.fa-file-text-o:before{content:\"\uF0F6\"}.fa-building-o:before{content:\"\uF0F7\"}.fa-hospital-o:before{content:\"\uF0F8\"}.fa-ambulance:before{content:\"\uF0F9\"}.fa-medkit:before{content:\"\uF0FA\"}.fa-fighter-jet:before{content:\"\uF0FB\"}.fa-beer:before{content:\"\uF0FC\"}.fa-h-square:before{content:\"\uF0FD\"}.fa-plus-square:before{content:\"\uF0FE\"}.fa-angle-double-left:before{content:\"\uF100\"}.fa-angle-double-right:before{content:\"\uF101\"}.fa-angle-double-up:before{content:\"\uF102\"}.fa-angle-double-down:before{content:\"\uF103\"}.fa-angle-left:before{content:\"\uF104\"}.fa-angle-right:before{content:\"\uF105\"}.fa-angle-up:before{content:\"\uF106\"}.fa-angle-down:before{content:\"\uF107\"}.fa-desktop:before{content:\"\uF108\"}.fa-laptop:before{content:\"\uF109\"}.fa-tablet:before{content:\"\uF10A\"}.fa-mobile-phone:before,.fa-mobile:before{content:\"\uF10B\"}.fa-circle-o:before{content:\"\uF10C\"}.fa-quote-left:before{content:\"\uF10D\"}.fa-quote-right:before{content:\"\uF10E\"}.fa-spinner:before{content:\"\uF110\"}.fa-circle:before{content:\"\uF111\"}.fa-mail-reply:before,.fa-reply:before{content:\"\uF112\"}.fa-github-alt:before{content:\"\uF113\"}.fa-folder-o:before{content:\"\uF114\"}.fa-folder-open-o:before{content:\"\uF115\"}.fa-smile-o:before{content:\"\uF118\"}.fa-frown-o:before{content:\"\uF119\"}.fa-meh-o:before{content:\"\uF11A\"}.fa-gamepad:before{content:\"\uF11B\"}.fa-keyboard-o:before{content:\"\uF11C\"}.fa-flag-o:before{content:\"\uF11D\"}.fa-flag-checkered:before{content:\"\uF11E\"}.fa-terminal:before{content:\"\uF120\"}.fa-code:before{content:\"\uF121\"}.fa-mail-reply-all:before,.fa-reply-all:before{content:\"\uF122\"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:\"\uF123\"}.fa-location-arrow:before{content:\"\uF124\"}.fa-crop:before{content:\"\uF125\"}.fa-code-fork:before{content:\"\uF126\"}.fa-chain-broken:before,.fa-unlink:before{content:\"\uF127\"}.fa-question:before{content:\"\uF128\"}.fa-info:before{content:\"\uF129\"}.fa-exclamation:before{content:\"\uF12A\"}.fa-superscript:before{content:\"\uF12B\"}.fa-subscript:before{content:\"\uF12C\"}.fa-eraser:before{content:\"\uF12D\"}.fa-puzzle-piece:before{content:\"\uF12E\"}.fa-microphone:before{content:\"\uF130\"}.fa-microphone-slash:before{content:\"\uF131\"}.fa-shield:before{content:\"\uF132\"}.fa-calendar-o:before{content:\"\uF133\"}.fa-fire-extinguisher:before{content:\"\uF134\"}.fa-rocket:before{content:\"\uF135\"}.fa-maxcdn:before{content:\"\uF136\"}.fa-chevron-circle-left:before{content:\"\uF137\"}.fa-chevron-circle-right:before{content:\"\uF138\"}.fa-chevron-circle-up:before{content:\"\uF139\"}.fa-chevron-circle-down:before{content:\"\uF13A\"}.fa-html5:before{content:\"\uF13B\"}.fa-css3:before{content:\"\uF13C\"}.fa-anchor:before{content:\"\uF13D\"}.fa-unlock-alt:before{content:\"\uF13E\"}.fa-bullseye:before{content:\"\uF140\"}.fa-ellipsis-h:before{content:\"\uF141\"}.fa-ellipsis-v:before{content:\"\uF142\"}.fa-rss-square:before{content:\"\uF143\"}.fa-play-circle:before{content:\"\uF144\"}.fa-ticket:before{content:\"\uF145\"}.fa-minus-square:before{content:\"\uF146\"}.fa-minus-square-o:before{content:\"\uF147\"}.fa-level-up:before{content:\"\uF148\"}.fa-level-down:before{content:\"\uF149\"}.fa-check-square:before{content:\"\uF14A\"}.fa-pencil-square:before{content:\"\uF14B\"}.fa-external-link-square:before{content:\"\uF14C\"}.fa-share-square:before{content:\"\uF14D\"}.fa-compass:before{content:\"\uF14E\"}.fa-caret-square-o-down:before,.fa-toggle-down:before{content:\"\uF150\"}.fa-caret-square-o-up:before,.fa-toggle-up:before{content:\"\uF151\"}.fa-caret-square-o-right:before,.fa-toggle-right:before{content:\"\uF152\"}.fa-eur:before,.fa-euro:before{content:\"\uF153\"}.fa-gbp:before{content:\"\uF154\"}.fa-dollar:before,.fa-usd:before{content:\"\uF155\"}.fa-inr:before,.fa-rupee:before{content:\"\uF156\"}.fa-cny:before,.fa-jpy:before,.fa-rmb:before,.fa-yen:before{content:\"\uF157\"}.fa-rouble:before,.fa-rub:before,.fa-ruble:before{content:\"\uF158\"}.fa-krw:before,.fa-won:before{content:\"\uF159\"}.fa-bitcoin:before,.fa-btc:before{content:\"\uF15A\"}.fa-file:before{content:\"\uF15B\"}.fa-file-text:before{content:\"\uF15C\"}.fa-sort-alpha-asc:before{content:\"\uF15D\"}.fa-sort-alpha-desc:before{content:\"\uF15E\"}.fa-sort-amount-asc:before{content:\"\uF160\"}.fa-sort-amount-desc:before{content:\"\uF161\"}.fa-sort-numeric-asc:before{content:\"\uF162\"}.fa-sort-numeric-desc:before{content:\"\uF163\"}.fa-thumbs-up:before{content:\"\uF164\"}.fa-thumbs-down:before{content:\"\uF165\"}.fa-youtube-square:before{content:\"\uF166\"}.fa-youtube:before{content:\"\uF167\"}.fa-xing:before{content:\"\uF168\"}.fa-xing-square:before{content:\"\uF169\"}.fa-youtube-play:before{content:\"\uF16A\"}.fa-dropbox:before{content:\"\uF16B\"}.fa-stack-overflow:before{content:\"\uF16C\"}.fa-instagram:before{content:\"\uF16D\"}.fa-flickr:before{content:\"\uF16E\"}.fa-adn:before{content:\"\uF170\"}.fa-bitbucket:before{content:\"\uF171\"}.fa-bitbucket-square:before{content:\"\uF172\"}.fa-tumblr:before{content:\"\uF173\"}.fa-tumblr-square:before{content:\"\uF174\"}.fa-long-arrow-down:before{content:\"\uF175\"}.fa-long-arrow-up:before{content:\"\uF176\"}.fa-long-arrow-left:before{content:\"\uF177\"}.fa-long-arrow-right:before{content:\"\uF178\"}.fa-apple:before{content:\"\uF179\"}.fa-windows:before{content:\"\uF17A\"}.fa-android:before{content:\"\uF17B\"}.fa-linux:before{content:\"\uF17C\"}.fa-dribbble:before{content:\"\uF17D\"}.fa-skype:before{content:\"\uF17E\"}.fa-foursquare:before{content:\"\uF180\"}.fa-trello:before{content:\"\uF181\"}.fa-female:before{content:\"\uF182\"}.fa-male:before{content:\"\uF183\"}.fa-gittip:before,.fa-gratipay:before{content:\"\uF184\"}.fa-sun-o:before{content:\"\uF185\"}.fa-moon-o:before{content:\"\uF186\"}.fa-archive:before{content:\"\uF187\"}.fa-bug:before{content:\"\uF188\"}.fa-vk:before{content:\"\uF189\"}.fa-weibo:before{content:\"\uF18A\"}.fa-renren:before{content:\"\uF18B\"}.fa-pagelines:before{content:\"\uF18C\"}.fa-stack-exchange:before{content:\"\uF18D\"}.fa-arrow-circle-o-right:before{content:\"\uF18E\"}.fa-arrow-circle-o-left:before{content:\"\uF190\"}.fa-caret-square-o-left:before,.fa-toggle-left:before{content:\"\uF191\"}.fa-dot-circle-o:before{content:\"\uF192\"}.fa-wheelchair:before{content:\"\uF193\"}.fa-vimeo-square:before{content:\"\uF194\"}.fa-try:before,.fa-turkish-lira:before{content:\"\uF195\"}.fa-plus-square-o:before{content:\"\uF196\"}.fa-space-shuttle:before{content:\"\uF197\"}.fa-slack:before{content:\"\uF198\"}.fa-envelope-square:before{content:\"\uF199\"}.fa-wordpress:before{content:\"\uF19A\"}.fa-openid:before{content:\"\uF19B\"}.fa-bank:before,.fa-institution:before,.fa-university:before{content:\"\uF19C\"}.fa-graduation-cap:before,.fa-mortar-board:before{content:\"\uF19D\"}.fa-yahoo:before{content:\"\uF19E\"}.fa-google:before{content:\"\uF1A0\"}.fa-reddit:before{content:\"\uF1A1\"}.fa-reddit-square:before{content:\"\uF1A2\"}.fa-stumbleupon-circle:before{content:\"\uF1A3\"}.fa-stumbleupon:before{content:\"\uF1A4\"}.fa-delicious:before{content:\"\uF1A5\"}.fa-digg:before{content:\"\uF1A6\"}.fa-pied-piper-pp:before{content:\"\uF1A7\"}.fa-pied-piper-alt:before{content:\"\uF1A8\"}.fa-drupal:before{content:\"\uF1A9\"}.fa-joomla:before{content:\"\uF1AA\"}.fa-language:before{content:\"\uF1AB\"}.fa-fax:before{content:\"\uF1AC\"}.fa-building:before{content:\"\uF1AD\"}.fa-child:before{content:\"\uF1AE\"}.fa-paw:before{content:\"\uF1B0\"}.fa-spoon:before{content:\"\uF1B1\"}.fa-cube:before{content:\"\uF1B2\"}.fa-cubes:before{content:\"\uF1B3\"}.fa-behance:before{content:\"\uF1B4\"}.fa-behance-square:before{content:\"\uF1B5\"}.fa-steam:before{content:\"\uF1B6\"}.fa-steam-square:before{content:\"\uF1B7\"}.fa-recycle:before{content:\"\uF1B8\"}.fa-automobile:before,.fa-car:before{content:\"\uF1B9\"}.fa-cab:before,.fa-taxi:before{content:\"\uF1BA\"}.fa-tree:before{content:\"\uF1BB\"}.fa-spotify:before{content:\"\uF1BC\"}.fa-deviantart:before{content:\"\uF1BD\"}.fa-soundcloud:before{content:\"\uF1BE\"}.fa-database:before{content:\"\uF1C0\"}.fa-file-pdf-o:before{content:\"\uF1C1\"}.fa-file-word-o:before{content:\"\uF1C2\"}.fa-file-excel-o:before{content:\"\uF1C3\"}.fa-file-powerpoint-o:before{content:\"\uF1C4\"}.fa-file-image-o:before,.fa-file-photo-o:before,.fa-file-picture-o:before{content:\"\uF1C5\"}.fa-file-archive-o:before,.fa-file-zip-o:before{content:\"\uF1C6\"}.fa-file-audio-o:before,.fa-file-sound-o:before{content:\"\uF1C7\"}.fa-file-movie-o:before,.fa-file-video-o:before{content:\"\uF1C8\"}.fa-file-code-o:before{content:\"\uF1C9\"}.fa-vine:before{content:\"\uF1CA\"}.fa-codepen:before{content:\"\uF1CB\"}.fa-jsfiddle:before{content:\"\uF1CC\"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-ring:before,.fa-life-saver:before,.fa-support:before{content:\"\uF1CD\"}.fa-circle-o-notch:before{content:\"\uF1CE\"}.fa-ra:before,.fa-rebel:before,.fa-resistance:before{content:\"\uF1D0\"}.fa-empire:before,.fa-ge:before{content:\"\uF1D1\"}.fa-git-square:before{content:\"\uF1D2\"}.fa-git:before{content:\"\uF1D3\"}.fa-hacker-news:before,.fa-y-combinator-square:before,.fa-yc-square:before{content:\"\uF1D4\"}.fa-tencent-weibo:before{content:\"\uF1D5\"}.fa-qq:before{content:\"\uF1D6\"}.fa-wechat:before,.fa-weixin:before{content:\"\uF1D7\"}.fa-paper-plane:before,.fa-send:before{content:\"\uF1D8\"}.fa-paper-plane-o:before,.fa-send-o:before{content:\"\uF1D9\"}.fa-history:before{content:\"\uF1DA\"}.fa-circle-thin:before{content:\"\uF1DB\"}.fa-header:before{content:\"\uF1DC\"}.fa-paragraph:before{content:\"\uF1DD\"}.fa-sliders:before{content:\"\uF1DE\"}.fa-share-alt:before{content:\"\uF1E0\"}.fa-share-alt-square:before{content:\"\uF1E1\"}.fa-bomb:before{content:\"\uF1E2\"}.fa-futbol-o:before,.fa-soccer-ball-o:before{content:\"\uF1E3\"}.fa-tty:before{content:\"\uF1E4\"}.fa-binoculars:before{content:\"\uF1E5\"}.fa-plug:before{content:\"\uF1E6\"}.fa-slideshare:before{content:\"\uF1E7\"}.fa-twitch:before{content:\"\uF1E8\"}.fa-yelp:before{content:\"\uF1E9\"}.fa-newspaper-o:before{content:\"\uF1EA\"}.fa-wifi:before{content:\"\uF1EB\"}.fa-calculator:before{content:\"\uF1EC\"}.fa-paypal:before{content:\"\uF1ED\"}.fa-google-wallet:before{content:\"\uF1EE\"}.fa-cc-visa:before{content:\"\uF1F0\"}.fa-cc-mastercard:before{content:\"\uF1F1\"}.fa-cc-discover:before{content:\"\uF1F2\"}.fa-cc-amex:before{content:\"\uF1F3\"}.fa-cc-paypal:before{content:\"\uF1F4\"}.fa-cc-stripe:before{content:\"\uF1F5\"}.fa-bell-slash:before{content:\"\uF1F6\"}.fa-bell-slash-o:before{content:\"\uF1F7\"}.fa-trash:before{content:\"\uF1F8\"}.fa-copyright:before{content:\"\uF1F9\"}.fa-at:before{content:\"\uF1FA\"}.fa-eyedropper:before{content:\"\uF1FB\"}.fa-paint-brush:before{content:\"\uF1FC\"}.fa-birthday-cake:before{content:\"\uF1FD\"}.fa-area-chart:before{content:\"\uF1FE\"}.fa-pie-chart:before{content:\"\uF200\"}.fa-line-chart:before{content:\"\uF201\"}.fa-lastfm:before{content:\"\uF202\"}.fa-lastfm-square:before{content:\"\uF203\"}.fa-toggle-off:before{content:\"\uF204\"}.fa-toggle-on:before{content:\"\uF205\"}.fa-bicycle:before{content:\"\uF206\"}.fa-bus:before{content:\"\uF207\"}.fa-ioxhost:before{content:\"\uF208\"}.fa-angellist:before{content:\"\uF209\"}.fa-cc:before{content:\"\uF20A\"}.fa-ils:before,.fa-shekel:before,.fa-sheqel:before{content:\"\uF20B\"}.fa-meanpath:before{content:\"\uF20C\"}.fa-buysellads:before{content:\"\uF20D\"}.fa-connectdevelop:before{content:\"\uF20E\"}.fa-dashcube:before{content:\"\uF210\"}.fa-forumbee:before{content:\"\uF211\"}.fa-leanpub:before{content:\"\uF212\"}.fa-sellsy:before{content:\"\uF213\"}.fa-shirtsinbulk:before{content:\"\uF214\"}.fa-simplybuilt:before{content:\"\uF215\"}.fa-skyatlas:before{content:\"\uF216\"}.fa-cart-plus:before{content:\"\uF217\"}.fa-cart-arrow-down:before{content:\"\uF218\"}.fa-diamond:before{content:\"\uF219\"}.fa-ship:before{content:\"\uF21A\"}.fa-user-secret:before{content:\"\uF21B\"}.fa-motorcycle:before{content:\"\uF21C\"}.fa-street-view:before{content:\"\uF21D\"}.fa-heartbeat:before{content:\"\uF21E\"}.fa-venus:before{content:\"\uF221\"}.fa-mars:before{content:\"\uF222\"}.fa-mercury:before{content:\"\uF223\"}.fa-intersex:before,.fa-transgender:before{content:\"\uF224\"}.fa-transgender-alt:before{content:\"\uF225\"}.fa-venus-double:before{content:\"\uF226\"}.fa-mars-double:before{content:\"\uF227\"}.fa-venus-mars:before{content:\"\uF228\"}.fa-mars-stroke:before{content:\"\uF229\"}.fa-mars-stroke-v:before{content:\"\uF22A\"}.fa-mars-stroke-h:before{content:\"\uF22B\"}.fa-neuter:before{content:\"\uF22C\"}.fa-genderless:before{content:\"\uF22D\"}.fa-facebook-official:before{content:\"\uF230\"}.fa-pinterest-p:before{content:\"\uF231\"}.fa-whatsapp:before{content:\"\uF232\"}.fa-server:before{content:\"\uF233\"}.fa-user-plus:before{content:\"\uF234\"}.fa-user-times:before{content:\"\uF235\"}.fa-bed:before,.fa-hotel:before{content:\"\uF236\"}.fa-viacoin:before{content:\"\uF237\"}.fa-train:before{content:\"\uF238\"}.fa-subway:before{content:\"\uF239\"}.fa-medium:before{content:\"\uF23A\"}.fa-y-combinator:before,.fa-yc:before{content:\"\uF23B\"}.fa-optin-monster:before{content:\"\uF23C\"}.fa-opencart:before{content:\"\uF23D\"}.fa-expeditedssl:before{content:\"\uF23E\"}.fa-battery-4:before,.fa-battery-full:before,.fa-battery:before{content:\"\uF240\"}.fa-battery-3:before,.fa-battery-three-quarters:before{content:\"\uF241\"}.fa-battery-2:before,.fa-battery-half:before{content:\"\uF242\"}.fa-battery-1:before,.fa-battery-quarter:before{content:\"\uF243\"}.fa-battery-0:before,.fa-battery-empty:before{content:\"\uF244\"}.fa-mouse-pointer:before{content:\"\uF245\"}.fa-i-cursor:before{content:\"\uF246\"}.fa-object-group:before{content:\"\uF247\"}.fa-object-ungroup:before{content:\"\uF248\"}.fa-sticky-note:before{content:\"\uF249\"}.fa-sticky-note-o:before{content:\"\uF24A\"}.fa-cc-jcb:before{content:\"\uF24B\"}.fa-cc-diners-club:before{content:\"\uF24C\"}.fa-clone:before{content:\"\uF24D\"}.fa-balance-scale:before{content:\"\uF24E\"}.fa-hourglass-o:before{content:\"\uF250\"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:\"\uF251\"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:\"\uF252\"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:\"\uF253\"}.fa-hourglass:before{content:\"\uF254\"}.fa-hand-grab-o:before,.fa-hand-rock-o:before{content:\"\uF255\"}.fa-hand-paper-o:before,.fa-hand-stop-o:before{content:\"\uF256\"}.fa-hand-scissors-o:before{content:\"\uF257\"}.fa-hand-lizard-o:before{content:\"\uF258\"}.fa-hand-spock-o:before{content:\"\uF259\"}.fa-hand-pointer-o:before{content:\"\uF25A\"}.fa-hand-peace-o:before{content:\"\uF25B\"}.fa-trademark:before{content:\"\uF25C\"}.fa-registered:before{content:\"\uF25D\"}.fa-creative-commons:before{content:\"\uF25E\"}.fa-gg:before{content:\"\uF260\"}.fa-gg-circle:before{content:\"\uF261\"}.fa-tripadvisor:before{content:\"\uF262\"}.fa-odnoklassniki:before{content:\"\uF263\"}.fa-odnoklassniki-square:before{content:\"\uF264\"}.fa-get-pocket:before{content:\"\uF265\"}.fa-wikipedia-w:before{content:\"\uF266\"}.fa-safari:before{content:\"\uF267\"}.fa-chrome:before{content:\"\uF268\"}.fa-firefox:before{content:\"\uF269\"}.fa-opera:before{content:\"\uF26A\"}.fa-internet-explorer:before{content:\"\uF26B\"}.fa-television:before,.fa-tv:before{content:\"\uF26C\"}.fa-contao:before{content:\"\uF26D\"}.fa-500px:before{content:\"\uF26E\"}.fa-amazon:before{content:\"\uF270\"}.fa-calendar-plus-o:before{content:\"\uF271\"}.fa-calendar-minus-o:before{content:\"\uF272\"}.fa-calendar-times-o:before{content:\"\uF273\"}.fa-calendar-check-o:before{content:\"\uF274\"}.fa-industry:before{content:\"\uF275\"}.fa-map-pin:before{content:\"\uF276\"}.fa-map-signs:before{content:\"\uF277\"}.fa-map-o:before{content:\"\uF278\"}.fa-map:before{content:\"\uF279\"}.fa-commenting:before{content:\"\uF27A\"}.fa-commenting-o:before{content:\"\uF27B\"}.fa-houzz:before{content:\"\uF27C\"}.fa-vimeo:before{content:\"\uF27D\"}.fa-black-tie:before{content:\"\uF27E\"}.fa-fonticons:before{content:\"\uF280\"}.fa-reddit-alien:before{content:\"\uF281\"}.fa-edge:before{content:\"\uF282\"}.fa-credit-card-alt:before{content:\"\uF283\"}.fa-codiepie:before{content:\"\uF284\"}.fa-modx:before{content:\"\uF285\"}.fa-fort-awesome:before{content:\"\uF286\"}.fa-usb:before{content:\"\uF287\"}.fa-product-hunt:before{content:\"\uF288\"}.fa-mixcloud:before{content:\"\uF289\"}.fa-scribd:before{content:\"\uF28A\"}.fa-pause-circle:before{content:\"\uF28B\"}.fa-pause-circle-o:before{content:\"\uF28C\"}.fa-stop-circle:before{content:\"\uF28D\"}.fa-stop-circle-o:before{content:\"\uF28E\"}.fa-shopping-bag:before{content:\"\uF290\"}.fa-shopping-basket:before{content:\"\uF291\"}.fa-hashtag:before{content:\"\uF292\"}.fa-bluetooth:before{content:\"\uF293\"}.fa-bluetooth-b:before{content:\"\uF294\"}.fa-percent:before{content:\"\uF295\"}.fa-gitlab:before{content:\"\uF296\"}.fa-wpbeginner:before{content:\"\uF297\"}.fa-wpforms:before{content:\"\uF298\"}.fa-envira:before{content:\"\uF299\"}.fa-universal-access:before{content:\"\uF29A\"}.fa-wheelchair-alt:before{content:\"\uF29B\"}.fa-question-circle-o:before{content:\"\uF29C\"}.fa-blind:before{content:\"\uF29D\"}.fa-audio-description:before{content:\"\uF29E\"}.fa-volume-control-phone:before{content:\"\uF2A0\"}.fa-braille:before{content:\"\uF2A1\"}.fa-assistive-listening-systems:before{content:\"\uF2A2\"}.fa-american-sign-language-interpreting:before,.fa-asl-interpreting:before{content:\"\uF2A3\"}.fa-deaf:before,.fa-deafness:before,.fa-hard-of-hearing:before{content:\"\uF2A4\"}.fa-glide:before{content:\"\uF2A5\"}.fa-glide-g:before{content:\"\uF2A6\"}.fa-sign-language:before,.fa-signing:before{content:\"\uF2A7\"}.fa-low-vision:before{content:\"\uF2A8\"}.fa-viadeo:before{content:\"\uF2A9\"}.fa-viadeo-square:before{content:\"\uF2AA\"}.fa-snapchat:before{content:\"\uF2AB\"}.fa-snapchat-ghost:before{content:\"\uF2AC\"}.fa-snapchat-square:before{content:\"\uF2AD\"}.fa-pied-piper:before{content:\"\uF2AE\"}.fa-first-order:before{content:\"\uF2B0\"}.fa-yoast:before{content:\"\uF2B1\"}.fa-themeisle:before{content:\"\uF2B2\"}.fa-google-plus-circle:before,.fa-google-plus-official:before{content:\"\uF2B3\"}.fa-fa:before,.fa-font-awesome:before{content:\"\uF2B4\"}.fa-handshake-o:before{content:\"\uF2B5\"}.fa-envelope-open:before{content:\"\uF2B6\"}.fa-envelope-open-o:before{content:\"\uF2B7\"}.fa-linode:before{content:\"\uF2B8\"}.fa-address-book:before{content:\"\uF2B9\"}.fa-address-book-o:before{content:\"\uF2BA\"}.fa-address-card:before,.fa-vcard:before{content:\"\uF2BB\"}.fa-address-card-o:before,.fa-vcard-o:before{content:\"\uF2BC\"}.fa-user-circle:before{content:\"\uF2BD\"}.fa-user-circle-o:before{content:\"\uF2BE\"}.fa-user-o:before{content:\"\uF2C0\"}.fa-id-badge:before{content:\"\uF2C1\"}.fa-drivers-license:before,.fa-id-card:before{content:\"\uF2C2\"}.fa-drivers-license-o:before,.fa-id-card-o:before{content:\"\uF2C3\"}.fa-quora:before{content:\"\uF2C4\"}.fa-free-code-camp:before{content:\"\uF2C5\"}.fa-telegram:before{content:\"\uF2C6\"}.fa-thermometer-4:before,.fa-thermometer-full:before,.fa-thermometer:before{content:\"\uF2C7\"}.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:\"\uF2C8\"}.fa-thermometer-2:before,.fa-thermometer-half:before{content:\"\uF2C9\"}.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:\"\uF2CA\"}.fa-thermometer-0:before,.fa-thermometer-empty:before{content:\"\uF2CB\"}.fa-shower:before{content:\"\uF2CC\"}.fa-bath:before,.fa-bathtub:before,.fa-s15:before{content:\"\uF2CD\"}.fa-podcast:before{content:\"\uF2CE\"}.fa-window-maximize:before{content:\"\uF2D0\"}.fa-window-minimize:before{content:\"\uF2D1\"}.fa-window-restore:before{content:\"\uF2D2\"}.fa-times-rectangle:before,.fa-window-close:before{content:\"\uF2D3\"}.fa-times-rectangle-o:before,.fa-window-close-o:before{content:\"\uF2D4\"}.fa-bandcamp:before{content:\"\uF2D5\"}.fa-grav:before{content:\"\uF2D6\"}.fa-etsy:before{content:\"\uF2D7\"}.fa-imdb:before{content:\"\uF2D8\"}.fa-ravelry:before{content:\"\uF2D9\"}.fa-eercast:before{content:\"\uF2DA\"}.fa-microchip:before{content:\"\uF2DB\"}.fa-snowflake-o:before{content:\"\uF2DC\"}.fa-superpowers:before{content:\"\uF2DD\"}.fa-wpexplorer:before{content:\"\uF2DE\"}.fa-meetup:before{content:\"\uF2E0\"}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}a{cursor:pointer}#editor{min-height:150px;overflow:auto;margin-top:5px;resize:vertical;outline:0}.angular-editor-toolbar{font:100 .8rem/15px Roboto,Arial,sans-serif;background-color:#f5f5f5;padding:.2rem;border:1px solid #ddd}.angular-editor-toolbar .angular-editor-toolbar-set{display:inline-block;border-radius:5px;background-color:#fff;margin-right:5px;vertical-align:middle;border:1px solid #ddd;margin-bottom:3px}.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button{background-color:transparent;padding:.4rem;min-width:2rem;float:left;border:0 solid #ddd}.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button:first-child{border-radius:5px 0 0 5px}.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button:last-child{border-radius:0 5px 5px 0}.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button:first-child:last-child{border-radius:5px}.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button:hover{cursor:pointer;background-color:#f1f1f1;transition:.2s}.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button.focus,.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button:focus{outline:0}.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button:disabled{background-color:#f5f5f5;pointer-events:none;cursor:not-allowed}.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button:disabled>.color-label{pointer-events:none;cursor:not-allowed}.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button:disabled>.color-label.background,.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button:disabled>.color-label.foreground :after{background:#555}.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button.active{background:#fff5b9}.angular-editor-toolbar .angular-editor-toolbar-set .angular-editor-button.active:hover{background-color:#fffa98}.angular-editor-toolbar .angular-editor-toolbar-set select{font-size:11px;width:90px;vertical-align:middle;background-color:transparent;border:.5px solid rgba(255,255,255,0);border-radius:5px;outline:0;padding:.4rem;cursor:pointer}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading{width:90px}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading:disabled{background-color:#f5f5f5;pointer-events:none;cursor:not-allowed}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading:hover{cursor:pointer;background-color:#f1f1f1;transition:.2s}.angular-editor-toolbar .angular-editor-toolbar-set .select-font{width:90px}.angular-editor-toolbar .angular-editor-toolbar-set .select-font:disabled{background-color:#f5f5f5;pointer-events:none;cursor:not-allowed}.angular-editor-toolbar .angular-editor-toolbar-set .select-font:hover{cursor:pointer;background-color:#f1f1f1;transition:.2s}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size{width:50px}@supports not (-moz-appearance:none){.angular-editor-toolbar .angular-editor-toolbar-set .select-heading optgroup{font-size:12px;background-color:#f4f4f4;padding:5px}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading option{border:1px solid;background-color:#fff}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading .default{font-size:16px}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading .h1{font-size:24px}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading .h2{font-size:20px}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading .h3{font-size:16px}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading .h4{font-size:15px}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading .h5{font-size:14px}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading .h6{font-size:13px}.angular-editor-toolbar .angular-editor-toolbar-set .select-heading .div,.angular-editor-toolbar .angular-editor-toolbar-set .select-heading .pre{font-size:12px}.angular-editor-toolbar .angular-editor-toolbar-set .select-font optgroup{font-size:12px;background-color:#f4f4f4;padding:5px}.angular-editor-toolbar .angular-editor-toolbar-set .select-font option{border:1px solid;background-color:#fff}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size optgroup{font-size:12px;background-color:#f4f4f4;padding:5px}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size option{border:1px solid;background-color:#fff}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size .size1{font-size:10px}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size .size2{font-size:12px}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size .size3{font-size:14px}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size .size4{font-size:16px}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size .size5{font-size:18px}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size .size6{font-size:20px}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size .size7{font-size:24px}}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size:disabled{background-color:#f5f5f5;pointer-events:none;cursor:not-allowed}.angular-editor-toolbar .angular-editor-toolbar-set .select-font-size:hover{cursor:pointer;background-color:#f1f1f1;transition:.2s}.angular-editor-toolbar .angular-editor-toolbar-set .color-label{position:relative;cursor:pointer}.angular-editor-toolbar .angular-editor-toolbar-set .background{font-size:smaller;background:#1b1b1b;color:#fff;padding:3px}.angular-editor-toolbar .angular-editor-toolbar-set .foreground :after{position:absolute;content:\"\";left:-1px;top:auto;bottom:-3px;right:auto;width:15px;height:2px;z-index:0;background:#1b1b1b}"]
                }] }
    ];
    /** @nocollapse */
    AngularEditorToolbarComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: AngularEditorService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    AngularEditorToolbarComponent.propDecorators = {
        execute: [{ type: Output }],
        myInputFile: [{ type: ViewChild, args: ['fileInput',] }]
    };
    return AngularEditorToolbarComponent;
}());
export { AngularEditorToolbarComponent };
if (false) {
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.id;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.htmlMode;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.showToolbar;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.linkSelected;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.block;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.defaultFontId;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.fontId;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.fontSize;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.fonts;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.customClassId;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.customClasses;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.currentTag;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.tagMap;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.select;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.buttons;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.tagGroups;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.execute;
    /** @type {?} */
    AngularEditorToolbarComponent.prototype.myInputFile;
    /**
     * @type {?}
     * @private
     */
    AngularEditorToolbarComponent.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    AngularEditorToolbarComponent.prototype.editorService;
    /**
     * @type {?}
     * @private
     */
    AngularEditorToolbarComponent.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1lZGl0b3ItdG9vbGJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa29sa292L2FuZ3VsYXItZWRpdG9yLyIsInNvdXJjZXMiOlsibGliL2FuZ3VsYXItZWRpdG9yLXRvb2xiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFHekM7SUFpREUsdUNBQW9CLFNBQW9CLEVBQ3BCLGFBQW1DLEVBQTRCLFNBQWM7UUFEN0UsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFBNEIsY0FBUyxHQUFULFNBQVMsQ0FBSztRQTNDakcsT0FBRSxHQUFHLEVBQUUsQ0FBQztRQUNSLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUVsQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsYUFBUSxHQUFHLEdBQUcsQ0FBQztRQUdmLGtCQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFbkIsZUFBVSxHQUFRLElBQUksQ0FBQztRQUV2QixXQUFNLEdBQUc7WUFDUCxVQUFVLEVBQUUsUUFBUTtZQUNwQixDQUFDLEVBQUUsTUFBTTtTQUNWLENBQUM7UUFFRixXQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJ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LGtEQUE0Qjs7Ozs7SUFDNUIsc0RBQTJDOzs7OztJQUFFLGtEQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgT3V0cHV0LCBSZW5kZXJlcjIsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FuZ3VsYXJFZGl0b3JTZXJ2aWNlfSBmcm9tICcuL2FuZ3VsYXItZWRpdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHtIdHRwUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0N1c3RvbUNsYXNzLCBGb250fSBmcm9tICcuL2NvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FuZ3VsYXItZWRpdG9yLXRvb2xiYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYW5ndWxhci1lZGl0b3ItdG9vbGJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FuZ3VsYXItZWRpdG9yLXRvb2xiYXIuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJFZGl0b3JUb29sYmFyQ29tcG9uZW50IHtcbiAgaWQgPSAnJztcbiAgaHRtbE1vZGUgPSBmYWxzZTtcbiAgc2hvd1Rvb2xiYXIgPSB0cnVlO1xuICBsaW5rU2VsZWN0ZWQgPSBmYWxzZTtcbiAgYmxvY2sgPSAnZGVmYXVsdCc7XG4gIGRlZmF1bHRGb250SWQ7XG4gIGZvbnRJZCA9IDA7XG4gIGZvbnRTaXplID0gJzUnO1xuICBmb250czogRm9udFtdO1xuXG4gIGN1c3RvbUNsYXNzSWQgPSAtMTtcbiAgY3VzdG9tQ2xhc3NlczogQ3VzdG9tQ2xhc3NbXTtcbiAgY3VycmVudFRhZzogYW55ID0gbnVsbDtcblxuICB0YWdNYXAgPSB7XG4gICAgQkxPQ0tRVU9URTogJ2luZGVudCcsXG4gICAgQTogJ2xpbmsnXG4gIH07XG5cbiAgc2VsZWN0ID0gWydIMScsICdIMicsICdIMycsICdINCcsICdINScsICdINicsICdQJywgJ1BSRScsICdESVYnXTtcblxuICBidXR0b25zID0gWydib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCAnc3RyaWtlVGhyb3VnaCcsICdzdWJzY3JpcHQnLCAnc3VwZXJzY3JpcHQnLCAnanVzdGlmeUxlZnQnLCAnanVzdGlmeUNlbnRlcicsXG4gICAgJ2p1c3RpZnlSaWdodCcsICdqdXN0aWZ5RnVsbCcsICdpbmRlbnQnLCAnb3V0ZGVudCcsICdpbnNlcnRVbm9yZGVyZWRMaXN0JywgJ2luc2VydE9yZGVyZWRMaXN0JywgJ2xpbmsnXTtcblxuICB0YWdHcm91cHMgPSBbXG4gICAge25hbWU6ICdDb250YWN0JywgdGFnczogW1xuICAgICAge25hbWU6ICdGaXJzdCBOYW1lJywgZmllbGQ6ICdhY2NvdW50VXNlci5maXJzdE5hbWUnfSxcbiAgICAgIHtuYW1lOiAnTGFzdCBOYW1lJywgZmllbGQ6ICdhY2NvdW50VXNlci5sYXN0TmFtZSd9XG4gICAgXX0sXG4gICAge25hbWU6ICdBY2NvdW50JywgdGFnczogW1xuICAgICAge25hbWU6ICdBY2NvdW50IFRpdGxlJywgZmllbGQ6ICdhY2NvdW50LnRpdGxlJ31cbiAgICBdfSxcbiAgICB7bmFtZTogJ0FjdGl2aXR5JywgdGFnczogW1xuICAgICAge25hbWU6ICdBY3Rpdml0eSBUaXRsZScsIGZpZWxkOiAnYWN0aXZpdHkudGl0bGUnfSxcbiAgICAgIHtuYW1lOiAnQWN0aXZpdHkgU3RhcnQgRGF0ZScsIGZpZWxkOiAnYWN0aXZpdHkuc3RhcnREYXRlJ31cbiAgICBdfVxuICBdO1xuXG4gIEBPdXRwdXQoKSBleGVjdXRlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2ZpbGVJbnB1dCcpIG15SW5wdXRGaWxlOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWRpdG9yU2VydmljZTogQW5ndWxhckVkaXRvclNlcnZpY2UsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnkpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGNvbW1hbmQgZnJvbSBlZGl0b3IgaGVhZGVyIGJ1dHRvbnNcbiAgICogQHBhcmFtIGNvbW1hbmQgc3RyaW5nIGZyb20gdG9vbGJhciBidXR0b25zXG4gICAqL1xuICB0cmlnZ2VyQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpIHtcbiAgICB0aGlzLmV4ZWN1dGUuZW1pdChjb21tYW5kKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoaWdobGlnaHQgZWRpdG9yIGJ1dHRvbnMgd2hlbiBjdXJzb3IgbW92ZWQgb3IgcG9zaXRpb25pbmdcbiAgICovXG4gIHRyaWdnZXJCdXR0b25zKCkge1xuICAgIGlmICghdGhpcy5zaG93VG9vbGJhcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaChlID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX2RvY3VtZW50LnF1ZXJ5Q29tbWFuZFN0YXRlKGUpO1xuICAgICAgY29uc3QgZWxlbWVudEJ5SWQgPSB0aGlzLl9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlICsgJy0nICsgdGhpcy5pZCk7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRCeUlkLCAnYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhlbGVtZW50QnlJZCwgJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRyaWdnZXIgaGlnaGxpZ2h0IGVkaXRvciBidXR0b25zIHdoZW4gY3Vyc29yIG1vdmVkIG9yIHBvc2l0aW9uaW5nIGluIGJsb2NrXG4gICAqL1xuICB0cmlnZ2VyQmxvY2tzKG5vZGVzOiBOb2RlW10pIHtcbiAgICBpZiAoIXRoaXMuc2hvd1Rvb2xiYXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5saW5rU2VsZWN0ZWQgPSBub2Rlcy5maW5kSW5kZXgoeCA9PiB4Lm5vZGVOYW1lID09PSAnQScpID4gLTE7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgdGhpcy5zZWxlY3QuZm9yRWFjaCh5ID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlcy5maW5kKHggPT4geC5ub2RlTmFtZSA9PT0geSk7XG4gICAgICBpZiAobm9kZSAhPT0gdW5kZWZpbmVkICYmIHkgPT09IG5vZGUubm9kZU5hbWUpIHtcbiAgICAgICAgaWYgKGZvdW5kID09PSBmYWxzZSkge1xuICAgICAgICAgIHRoaXMuYmxvY2sgPSBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGZvdW5kID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmJsb2NrID0gJ2RlZmF1bHQnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZm91bmQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5mb250cykge1xuICAgICAgdGhpcy5mb250cy5mb3JFYWNoKCh5LCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXMuZmluZCh4ID0+IHtcbiAgICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIEhUTUxGb250RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHguZmFjZSA9PT0geS5uYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChub2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoZm91bmQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmZvbnRJZCA9IGluZGV4O1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChmb3VuZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLmZvbnRJZCA9IHRoaXMuZGVmYXVsdEZvbnRJZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm91bmQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5jdXN0b21DbGFzc2VzKSB7XG4gICAgICB0aGlzLmN1c3RvbUNsYXNzZXMuZm9yRWFjaCgoeSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzLmZpbmQoeCA9PiB7XG4gICAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4geC5jbGFzc05hbWUgPT09IHkuY2xhc3M7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmIChmb3VuZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tQ2xhc3NJZCA9IGluZGV4O1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChmb3VuZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLmN1c3RvbUNsYXNzSWQgPSAtMTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXModGhpcy50YWdNYXApLm1hcChlID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRCeUlkID0gdGhpcy5fZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy50YWdNYXBbZV0gKyAnLScgKyB0aGlzLmlkKTtcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlcy5maW5kKHggPT4geC5ub2RlTmFtZSA9PT0gZSk7XG4gICAgICBpZiAobm9kZSAhPT0gdW5kZWZpbmVkICYmIGUgPT09IG5vZGUubm9kZU5hbWUpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudEJ5SWQsICdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGVsZW1lbnRCeUlkLCAnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogaW5zZXJ0IFVSTCBsaW5rXG4gICAqL1xuICBpbnNlcnRVcmwoKSB7XG4gICAgY29uc3QgdXJsID0gcHJvbXB0KCdJbnNlcnQgVVJMIGxpbmsnLCBgaHR0cHM6Ly9gKTtcbiAgICBpZiAodXJsICYmIHVybCAhPT0gJycgJiYgdXJsICE9PSBgaHR0cHM6Ly9gKSB7XG4gICAgICB0aGlzLmVkaXRvclNlcnZpY2UuY3JlYXRlTGluayh1cmwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBpbnNlcnQgVmVkaW8gbGlua1xuICAgKi9cbiAgaW5zZXJ0VmlkZW8oKSB7XG4gICAgdGhpcy5leGVjdXRlLmVtaXQoJycpO1xuICAgIGNvbnN0IHVybCA9IHByb21wdCgnSW5zZXJ0IFZpZGVvIGxpbmsnLCBgaHR0cHM6Ly9gKTtcbiAgICBpZiAodXJsICYmIHVybCAhPT0gJycgJiYgdXJsICE9PSBgaHR0cHM6Ly9gKSB7XG4gICAgICB0aGlzLmVkaXRvclNlcnZpY2UuaW5zZXJ0VmlkZW8odXJsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5zZXJ0IFZlZGlvIGxpbmtcbiAgICovXG4gIGluc2VydFRhZygpIHtcbiAgICB0aGlzLmV4ZWN1dGUuZW1pdCgnJyk7XG4gICAgdGhpcy5lZGl0b3JTZXJ2aWNlLmluc2VydFRhZyh0aGlzLmN1cnJlbnRUYWcpO1xuICAgIHRoaXMuY3VycmVudFRhZyA9IG51bGw7XG4gICAgdGhpcy5leGVjdXRlLmVtaXQoJycpO1xuICB9XG5cbiAgLyoqIGluc2VydCBjb2xvciAqL1xuICBpbnNlcnRDb2xvcihjb2xvcjogc3RyaW5nLCB3aGVyZTogc3RyaW5nKSB7XG4gICAgdGhpcy5lZGl0b3JTZXJ2aWNlLmluc2VydENvbG9yKGNvbG9yLCB3aGVyZSk7XG4gICAgdGhpcy5leGVjdXRlLmVtaXQoJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCBmb250IE5hbWUvZmFtaWx5XG4gICAqIEBwYXJhbSBmb250SWQgbnVtYmVyXG4gICAqL1xuICBzZXRGb250TmFtZShmb250SWQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZWRpdG9yU2VydmljZS5zZXRGb250TmFtZSh0aGlzLmZvbnRzW2ZvbnRJZF0ubmFtZSk7XG4gICAgdGhpcy5leGVjdXRlLmVtaXQoJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCBmb250IFNpemVcbiAgICogQHBhcmFtIGZvbnRTaXplIHN0cmluZ1xuICAgKiAgKi9cbiAgc2V0Rm9udFNpemUoZm9udFNpemU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZWRpdG9yU2VydmljZS5zZXRGb250U2l6ZShmb250U2l6ZSk7XG4gICAgdGhpcy5leGVjdXRlLmVtaXQoJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRvZ2dsZSBlZGl0b3IgbW9kZSAoV1lTSVdZRyBvciBTT1VSQ0UpXG4gICAqIEBwYXJhbSBtIGJvb2xlYW5cbiAgICovXG4gIHNldEVkaXRvck1vZGUobTogYm9vbGVhbikge1xuICAgIGNvbnN0IHRvZ2dsZUVkaXRvck1vZGVCdXR0b24gPSB0aGlzLl9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9nZ2xlRWRpdG9yTW9kZScgKyAnLScgKyB0aGlzLmlkKTtcbiAgICBpZiAobSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModG9nZ2xlRWRpdG9yTW9kZUJ1dHRvbiwgJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0b2dnbGVFZGl0b3JNb2RlQnV0dG9uLCAnYWN0aXZlJyk7XG4gICAgfVxuICAgIHRoaXMuaHRtbE1vZGUgPSBtO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBpbWFnZSB3aGVuIGZpbGUgaXMgc2VsZWN0ZWRcbiAgICovXG4gIG9uRmlsZUNoYW5nZWQoZXZlbnQpIHtcbiAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgaWYgKGZpbGUudHlwZS5pbmNsdWRlcygnaW1hZ2UvJykpIHtcbiAgICAgICAgdGhpcy5lZGl0b3JTZXJ2aWNlLnVwbG9hZEltYWdlKGZpbGUpLnN1YnNjcmliZShlID0+IHtcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3JTZXJ2aWNlLmluc2VydEltYWdlKGUuYm9keS5pbWFnZVVybCk7XG4gICAgICAgICAgICB0aGlzLmZpbGVSZXNldCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgSW5wdXRcbiAgICovXG4gIGZpbGVSZXNldCgpIHtcbiAgICB0aGlzLm15SW5wdXRGaWxlLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgY3VzdG9tIGNsYXNzXG4gICAqL1xuICBzZXRDdXN0b21DbGFzcyhjbGFzc0lkOiBudW1iZXIpIHtcbiAgICB0aGlzLmVkaXRvclNlcnZpY2UuY3JlYXRlQ3VzdG9tQ2xhc3ModGhpcy5jdXN0b21DbGFzc2VzW2NsYXNzSWRdKTtcbiAgfVxufVxuIl19