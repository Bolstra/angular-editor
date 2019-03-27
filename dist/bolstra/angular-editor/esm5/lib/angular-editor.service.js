/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/common";
/**
 * @record
 */
export function UploadResponse() { }
if (false) {
    /** @type {?} */
    UploadResponse.prototype.imageUrl;
}
var AngularEditorService = /** @class */ (function () {
    function AngularEditorService(http, document) {
        this.http = http;
        this.document = document;
    }
    /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param command string from triggerCommand
     */
    /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param {?} command string from triggerCommand
     * @return {?}
     */
    AngularEditorService.prototype.executeCommand = /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param {?} command string from triggerCommand
     * @return {?}
     */
    function (command) {
        /** @type {?} */
        var commands = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
        if (commands.includes(command)) {
            this.document.execCommand('formatBlock', false, command);
        }
        this.document.execCommand(command, false, null);
    };
    /**
     * Create URL link
     * @param url string from UI prompt
     */
    /**
     * Create URL link
     * @param {?} url string from UI prompt
     * @return {?}
     */
    AngularEditorService.prototype.createLink = /**
     * Create URL link
     * @param {?} url string from UI prompt
     * @return {?}
     */
    function (url) {
        if (!url.includes('http')) {
            this.document.execCommand('createlink', false, url);
        }
        else {
            /** @type {?} */
            var newUrl = "<a href='" + url + "' target='_blank'>" + this.selectedText + "</a>";
            this.insertHtml(newUrl);
        }
    };
    /**
     * insert color either font or background
     *
     * @param color color to be inserted
     * @param where where the color has to be inserted either text/background
     */
    /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    AngularEditorService.prototype.insertColor = /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    function (color, where) {
        /** @type {?} */
        var restored = this.restoreSelection();
        if (restored) {
            if (where === 'textColor') {
                this.document.execCommand('foreColor', false, color);
            }
            else {
                this.document.execCommand('hiliteColor', false, color);
            }
        }
    };
    /**
     * Set font name
     * @param fontName string
     */
    /**
     * Set font name
     * @param {?} fontName string
     * @return {?}
     */
    AngularEditorService.prototype.setFontName = /**
     * Set font name
     * @param {?} fontName string
     * @return {?}
     */
    function (fontName) {
        this.document.execCommand('fontName', false, fontName);
    };
    /**
     * Set font size
     * @param fontSize string
     */
    /**
     * Set font size
     * @param {?} fontSize string
     * @return {?}
     */
    AngularEditorService.prototype.setFontSize = /**
     * Set font size
     * @param {?} fontSize string
     * @return {?}
     */
    function (fontSize) {
        this.document.execCommand('fontSize', false, fontSize);
    };
    /**
     * Create raw HTML
     * @param html HTML string
     */
    /**
     * Create raw HTML
     * @param {?} html HTML string
     * @return {?}
     */
    AngularEditorService.prototype.insertHtml = /**
     * Create raw HTML
     * @param {?} html HTML string
     * @return {?}
     */
    function (html) {
        /** @type {?} */
        var isHTMLInserted = this.document.execCommand('insertHTML', false, html);
        if (!isHTMLInserted) {
            throw new Error('Unable to perform the operation');
        }
    };
    /**
     * save selection when the editor is focussed out
     */
    /**
     * save selection when the editor is focussed out
     * @return {?}
     */
    AngularEditorService.prototype.saveSelection = /**
     * save selection when the editor is focussed out
     * @return {?}
     */
    function () {
        if (window.getSelection) {
            /** @type {?} */
            var sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                this.savedSelection = sel.getRangeAt(0);
                this.selectedText = sel.toString();
            }
        }
        else if (this.document.getSelection && this.document.createRange) {
            this.savedSelection = document.createRange();
        }
        else {
            this.savedSelection = null;
        }
    };
    /**
     * restore selection when the editor is focussed in
     *
     * saved selection when the editor is focussed out
     */
    /**
     * restore selection when the editor is focussed in
     *
     * saved selection when the editor is focussed out
     * @return {?}
     */
    AngularEditorService.prototype.restoreSelection = /**
     * restore selection when the editor is focussed in
     *
     * saved selection when the editor is focussed out
     * @return {?}
     */
    function () {
        if (this.savedSelection) {
            if (window.getSelection) {
                /** @type {?} */
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(this.savedSelection);
                return true;
            }
            else if (this.document.getSelection /*&& this.savedSelection.select*/) {
                // this.savedSelection.select();
                return true;
            }
        }
        else {
            return false;
        }
    };
    /** check any slection is made or not */
    /**
     * check any slection is made or not
     * @private
     * @return {?}
     */
    AngularEditorService.prototype.checkSelection = /**
     * check any slection is made or not
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var slectedText = this.savedSelection.toString();
        if (slectedText.length === 0) {
            throw new Error('No Selection Made');
        }
        return true;
    };
    /**
     * Upload file to uploadUrl
     * @param file
     */
    /**
     * Upload file to uploadUrl
     * @param {?} file
     * @return {?}
     */
    AngularEditorService.prototype.uploadImage = /**
     * Upload file to uploadUrl
     * @param {?} file
     * @return {?}
     */
    function (file) {
        /** @type {?} */
        var uploadData = new FormData();
        uploadData.append('file', file, file.name);
        return this.http.post(this.uploadUrl, uploadData, {
            reportProgress: true,
            observe: 'events',
        });
    };
    /**
     * Insert image with Url
     * @param imageUrl
     */
    /**
     * Insert image with Url
     * @param {?} imageUrl
     * @return {?}
     */
    AngularEditorService.prototype.insertImage = /**
     * Insert image with Url
     * @param {?} imageUrl
     * @return {?}
     */
    function (imageUrl) {
        this.document.execCommand('insertImage', false, imageUrl);
    };
    /**
     * @param {?} videoUrl
     * @return {?}
     */
    AngularEditorService.prototype.insertVideo = /**
     * @param {?} videoUrl
     * @return {?}
     */
    function (videoUrl) {
        if (videoUrl.match('www.youtube.com')) {
            this.insertYouTubeVideoTag(videoUrl);
        }
        if (videoUrl.match('vimeo.com')) {
            this.insertVimeoVideoTag(videoUrl);
        }
    };
    /**
     * @param {?} tag
     * @return {?}
     */
    AngularEditorService.prototype.insertTag = /**
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        if (tag === null) {
            return;
        }
        /** @type {?} */
        var tagS = tag.group + " -> " + tag.name;
        /** @type {?} */
        var size = tagS.length;
        /** @type {?} */
        var tagHtml = "\n      <input tag='" + tag.propertyName + "' value='" + tagS + "'\n        readonly size=" + size + "\n        style='background-color:lightgrey;\n        padding: 5px;\n        border-radius: 5px;\n        text-align: center;\n        border-left:5px solid red;\n        border-right:5px solid red;\n        border-top:0;\n        border-bottom:0;'\n        ></input>\n    ";
        this.insertHtml(tagHtml);
    };
    /**
     * @param {?} separator
     * @return {?}
     */
    AngularEditorService.prototype.setDefaultParagraphSeparator = /**
     * @param {?} separator
     * @return {?}
     */
    function (separator) {
        this.document.execCommand('defaultParagraphSeparator', false, separator);
    };
    /**
     * @param {?} customClass
     * @return {?}
     */
    AngularEditorService.prototype.createCustomClass = /**
     * @param {?} customClass
     * @return {?}
     */
    function (customClass) {
        /** @type {?} */
        var newTag = this.selectedText;
        if (customClass) {
            /** @type {?} */
            var tagName = customClass.tag ? customClass.tag : 'span';
            newTag = "<" + tagName + " class='" + customClass.class + "'>" + this.selectedText + "</" + tagName + ">";
        }
        this.insertHtml(newTag);
    };
    /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    AngularEditorService.prototype.insertYouTubeVideoTag = /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    function (videoUrl) {
        /** @type {?} */
        var id = videoUrl.split('v=')[1];
        /** @type {?} */
        var imageUrl = "https://img.youtube.com/vi/" + id + "/0.jpg";
        /** @type {?} */
        var thumbnail = "\n      <div style='position: relative'>\n        <img style='position: absolute; left:200px; top:140px'\n             src=\"https://img.icons8.com/color/96/000000/youtube-play.png\"\n        <a href='" + videoUrl + "' target='_blank'>\n          <img src=\"" + imageUrl + "\" alt=\"click to watch\"/>\n        </a>\n      </div>";
        this.insertHtml(thumbnail);
    };
    /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    AngularEditorService.prototype.insertVimeoVideoTag = /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    function (videoUrl) {
        var _this = this;
        /** @type {?} */
        var sub = this.http.get("https://vimeo.com/api/oembed.json?url=" + videoUrl).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var imageUrl = data.thumbnail_url_with_play_button;
            /** @type {?} */
            var thumbnail = "<div>\n        <a href='" + videoUrl + "' target='_blank'>\n          <img src=\"" + imageUrl + "\" alt=\"" + data.title + "\"/>\n        </a>\n      </div>";
            _this.insertHtml(thumbnail);
            sub.unsubscribe();
        }));
    };
    AngularEditorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AngularEditorService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ AngularEditorService.ngInjectableDef = i0.defineInjectable({ factory: function AngularEditorService_Factory() { return new AngularEditorService(i0.inject(i1.HttpClient), i0.inject(i2.DOCUMENT)); }, token: AngularEditorService, providedIn: "root" });
    return AngularEditorService;
}());
export { AngularEditorService };
if (false) {
    /** @type {?} */
    AngularEditorService.prototype.savedSelection;
    /** @type {?} */
    AngularEditorService.prototype.selectedText;
    /** @type {?} */
    AngularEditorService.prototype.uploadUrl;
    /**
     * @type {?}
     * @private
     */
    AngularEditorService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    AngularEditorService.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1lZGl0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bib2xzdHJhL2FuZ3VsYXItZWRpdG9yLyIsInNvdXJjZXMiOlsibGliL2FuZ3VsYXItZWRpdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQVksTUFBTSxzQkFBc0IsQ0FBQztBQUUzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7QUFHekMsb0NBRUM7OztJQURDLGtDQUFpQjs7QUFHbkI7SUFVRSw4QkFBb0IsSUFBZ0IsRUFBNEIsUUFBYTtRQUF6RCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQTRCLGFBQVEsR0FBUixRQUFRLENBQUs7SUFDN0UsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsNkNBQWM7Ozs7O0lBQWQsVUFBZSxPQUFlOztZQUN0QixRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDO1FBQ2pFLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzFEO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx5Q0FBVTs7Ozs7SUFBVixVQUFXLEdBQVc7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFB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QVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFFTyxrREFBbUI7Ozs7O0lBQTNCLFVBQTRCLFFBQWdCO1FBQTVDLGlCQVdDOztZQVZPLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSwyQ0FBeUMsUUFBVSxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsSUFBSTs7Z0JBQzFGLFFBQVEsR0FBRyxJQUFJLENBQUMsOEJBQThCOztnQkFDOUMsU0FBUyxHQUFHLDZCQUNMLFFBQVEsaURBQ0wsUUFBUSxpQkFBVSxJQUFJLENBQUMsS0FBSyxxQ0FFckM7WUFDUCxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixDQUFDLEVBQUM7SUFDSixDQUFDOztnQkFuT0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFYTyxVQUFVO2dEQW1CdUIsTUFBTSxTQUFDLFFBQVE7OzsrQkFwQnhEO0NBOE9DLEFBcE9ELElBb09DO1NBak9ZLG9CQUFvQjs7O0lBRS9CLDhDQUE2Qjs7SUFDN0IsNENBQXFCOztJQUNyQix5Q0FBa0I7Ozs7O0lBR04sb0NBQXdCOzs7OztJQUFFLHdDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudCwgSHR0cEV2ZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q3VzdG9tQ2xhc3MsIFRhZ30gZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVwbG9hZFJlc3BvbnNlIHtcbiAgaW1hZ2VVcmw6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckVkaXRvclNlcnZpY2Uge1xuXG4gIHNhdmVkU2VsZWN0aW9uOiBSYW5nZSB8IG51bGw7XG4gIHNlbGVjdGVkVGV4dDogc3RyaW5nO1xuICB1cGxvYWRVcmw6IHN0cmluZztcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZWQgY29tbWFuZCBmcm9tIGVkaXRvciBoZWFkZXIgYnV0dG9ucyBleGNsdWRlIHRvZ2dsZUVkaXRvck1vZGVcbiAgICogQHBhcmFtIGNvbW1hbmQgc3RyaW5nIGZyb20gdHJpZ2dlckNvbW1hbmRcbiAgICovXG4gIGV4ZWN1dGVDb21tYW5kKGNvbW1hbmQ6IHN0cmluZykge1xuICAgIGNvbnN0IGNvbW1hbmRzID0gWydoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdwJywgJ3ByZSddO1xuICAgIGlmIChjb21tYW5kcy5pbmNsdWRlcyhjb21tYW5kKSkge1xuICAgICAgdGhpcy5kb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgY29tbWFuZCk7XG4gICAgfVxuXG4gICAgdGhpcy5kb2N1bWVudC5leGVjQ29tbWFuZChjb21tYW5kLCBmYWxzZSwgbnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIFVSTCBsaW5rXG4gICAqIEBwYXJhbSB1cmwgc3RyaW5nIGZyb20gVUkgcHJvbXB0XG4gICAqL1xuICBjcmVhdGVMaW5rKHVybDogc3RyaW5nKSB7XG4gICAgaWYgKCF1cmwuaW5jbHVkZXMoJ2h0dHAnKSkge1xuICAgICAgdGhpcy5kb2N1bWVudC5leGVjQ29tbWFuZCgnY3JlYXRlbGluaycsIGZhbHNlLCB1cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdVcmwgPSBgPGEgaHJlZj0nJHt1cmx9JyB0YXJnZXQ9J19ibGFuayc+JHt0aGlzLnNlbGVjdGVkVGV4dH08L2E+YDtcbiAgICAgIHRoaXMuaW5zZXJ0SHRtbChuZXdVcmwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBpbnNlcnQgY29sb3IgZWl0aGVyIGZvbnQgb3IgYmFja2dyb3VuZFxuICAgKlxuICAgKiBAcGFyYW0gY29sb3IgY29sb3IgdG8gYmUgaW5zZXJ0ZWRcbiAgICogQHBhcmFtIHdoZXJlIHdoZXJlIHRoZSBjb2xvciBoYXMgdG8gYmUgaW5zZXJ0ZWQgZWl0aGVyIHRleHQvYmFja2dyb3VuZFxuICAgKi9cbiAgaW5zZXJ0Q29sb3IoY29sb3I6IHN0cmluZywgd2hlcmU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHJlc3RvcmVkID0gdGhpcy5yZXN0b3JlU2VsZWN0aW9uKCk7XG4gICAgaWYgKHJlc3RvcmVkKSB7XG4gICAgICBpZiAod2hlcmUgPT09ICd0ZXh0Q29sb3InKSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2ZvcmVDb2xvcicsIGZhbHNlLCBjb2xvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRvY3VtZW50LmV4ZWNDb21tYW5kKCdoaWxpdGVDb2xvcicsIGZhbHNlLCBjb2xvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBmb250IG5hbWVcbiAgICogQHBhcmFtIGZvbnROYW1lIHN0cmluZ1xuICAgKi9cbiAgc2V0Rm9udE5hbWUoZm9udE5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2ZvbnROYW1lJywgZmFsc2UsIGZvbnROYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZm9udCBzaXplXG4gICAqIEBwYXJhbSBmb250U2l6ZSBzdHJpbmdcbiAgICovXG4gIHNldEZvbnRTaXplKGZvbnRTaXplOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRvY3VtZW50LmV4ZWNDb21tYW5kKCdmb250U2l6ZScsIGZhbHNlLCBmb250U2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHJhdyBIVE1MXG4gICAqIEBwYXJhbSBodG1sIEhUTUwgc3RyaW5nXG4gICAqL1xuICBpbnNlcnRIdG1sKGh0bWw6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgY29uc3QgaXNIVE1MSW5zZXJ0ZWQgPSB0aGlzLmRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xuXG4gICAgaWYgKCFpc0hUTUxJbnNlcnRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcGVyZm9ybSB0aGUgb3BlcmF0aW9uJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHNhdmUgc2VsZWN0aW9uIHdoZW4gdGhlIGVkaXRvciBpcyBmb2N1c3NlZCBvdXRcbiAgICovXG4gIHNhdmVTZWxlY3Rpb24oKTogYW55IHtcbiAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgaWYgKHNlbC5nZXRSYW5nZUF0ICYmIHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSBzZWwudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuZG9jdW1lbnQuZ2V0U2VsZWN0aW9uICYmIHRoaXMuZG9jdW1lbnQuY3JlYXRlUmFuZ2UpIHtcbiAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNhdmVkU2VsZWN0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVzdG9yZSBzZWxlY3Rpb24gd2hlbiB0aGUgZWRpdG9yIGlzIGZvY3Vzc2VkIGluXG4gICAqXG4gICAqIHNhdmVkIHNlbGVjdGlvbiB3aGVuIHRoZSBlZGl0b3IgaXMgZm9jdXNzZWQgb3V0XG4gICAqL1xuICByZXN0b3JlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnNhdmVkU2VsZWN0aW9uKSB7XG4gICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgc2VsLmFkZFJhbmdlKHRoaXMuc2F2ZWRTZWxlY3Rpb24pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5kb2N1bWVudC5nZXRTZWxlY3Rpb24gLyomJiB0aGlzLnNhdmVkU2VsZWN0aW9uLnNlbGVjdCovKSB7XG4gICAgICAgIC8vIHRoaXMuc2F2ZWRTZWxlY3Rpb24uc2VsZWN0KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqIGNoZWNrIGFueSBzbGVjdGlvbiBpcyBtYWRlIG9yIG5vdCAqL1xuICBwcml2YXRlIGNoZWNrU2VsZWN0aW9uKCk6IGFueSB7XG5cbiAgICBjb25zdCBzbGVjdGVkVGV4dCA9IHRoaXMuc2F2ZWRTZWxlY3Rpb24udG9TdHJpbmcoKTtcblxuICAgIGlmIChzbGVjdGVkVGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gU2VsZWN0aW9uIE1hZGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGxvYWQgZmlsZSB0byB1cGxvYWRVcmxcbiAgICogQHBhcmFtIGZpbGVcbiAgICovXG4gIHVwbG9hZEltYWdlKGZpbGU6IEZpbGUpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxVcGxvYWRSZXNwb25zZT4+IHtcblxuICAgIGNvbnN0IHVwbG9hZERhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICB1cGxvYWREYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFVwbG9hZFJlc3BvbnNlPih0aGlzLnVwbG9hZFVybCwgdXBsb2FkRGF0YSwge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHRydWUsXG4gICAgICBvYnNlcnZlOiAnZXZlbnRzJyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgaW1hZ2Ugd2l0aCBVcmxcbiAgICogQHBhcmFtIGltYWdlVXJsXG4gICAqL1xuICBpbnNlcnRJbWFnZShpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5kb2N1bWVudC5leGVjQ29tbWFuZCgnaW5zZXJ0SW1hZ2UnLCBmYWxzZSwgaW1hZ2VVcmwpO1xuICB9XG5cbiAgaW5zZXJ0VmlkZW8odmlkZW9Vcmw6IHN0cmluZykge1xuICAgIGlmICh2aWRlb1VybC5tYXRjaCgnd3d3LnlvdXR1YmUuY29tJykpIHtcbiAgICAgIHRoaXMuaW5zZXJ0WW91VHViZVZpZGVvVGFnKHZpZGVvVXJsKTtcbiAgICB9XG4gICAgaWYgKHZpZGVvVXJsLm1hdGNoKCd2aW1lby5jb20nKSkge1xuICAgICAgdGhpcy5pbnNlcnRWaW1lb1ZpZGVvVGFnKHZpZGVvVXJsKTtcbiAgICB9XG4gIH1cblxuICBpbnNlcnRUYWcodGFnOiBUYWcpIHtcbiAgICBpZiAodGFnID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRhZ1MgPSBgJHt0YWcuZ3JvdXB9IC0+ICR7dGFnLm5hbWV9YDtcbiAgICBjb25zdCBzaXplID0gdGFnUy5sZW5ndGg7XG4gICAgY29uc3QgdGFnSHRtbCA9IGBcbiAgICAgIDxpbnB1dCB0YWc9JyR7dGFnLnByb3BlcnR5TmFtZX0nIHZhbHVlPScke3RhZ1N9J1xuICAgICAgICByZWFkb25seSBzaXplPSR7c2l6ZX1cbiAgICAgICAgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6bGlnaHRncmV5O1xuICAgICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBib3JkZXItbGVmdDo1cHggc29saWQgcmVkO1xuICAgICAgICBib3JkZXItcmlnaHQ6NXB4IHNvbGlkIHJlZDtcbiAgICAgICAgYm9yZGVyLXRvcDowO1xuICAgICAgICBib3JkZXItYm90dG9tOjA7J1xuICAgICAgICA+PC9pbnB1dD5cbiAgICBgO1xuICAgIHRoaXMuaW5zZXJ0SHRtbCh0YWdIdG1sKTtcbiAgfVxuXG4gIHNldERlZmF1bHRQYXJhZ3JhcGhTZXBhcmF0b3Ioc2VwYXJhdG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRvY3VtZW50LmV4ZWNDb21tYW5kKCdkZWZhdWx0UGFyYWdyYXBoU2VwYXJhdG9yJywgZmFsc2UsIHNlcGFyYXRvcik7XG4gIH1cblxuICBjcmVhdGVDdXN0b21DbGFzcyhjdXN0b21DbGFzczogQ3VzdG9tQ2xhc3MpIHtcbiAgICBsZXQgbmV3VGFnID0gdGhpcy5zZWxlY3RlZFRleHQ7XG4gICAgaWYgKGN1c3RvbUNsYXNzKSB7XG4gICAgICBjb25zdCB0YWdOYW1lID0gY3VzdG9tQ2xhc3MudGFnID8gY3VzdG9tQ2xhc3MudGFnIDogJ3NwYW4nO1xuICAgICAgbmV3VGFnID0gYDwke3RhZ05hbWV9IGNsYXNzPScke2N1c3RvbUNsYXNzLmNsYXNzfSc+JHt0aGlzLnNlbGVjdGVkVGV4dH08LyR7dGFnTmFtZX0+YDtcbiAgICB9XG4gICAgdGhpcy5pbnNlcnRIdG1sKG5ld1RhZyk7XG4gIH1cblxuICBwcml2YXRlIGluc2VydFlvdVR1YmVWaWRlb1RhZyh2aWRlb1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgaWQgPSB2aWRlb1VybC5zcGxpdCgndj0nKVsxXTtcbiAgICBjb25zdCBpbWFnZVVybCA9IGBodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS8ke2lkfS8wLmpwZ2A7XG4gICAgY29uc3QgdGh1bWJuYWlsID0gYFxuICAgICAgPGRpdiBzdHlsZT0ncG9zaXRpb246IHJlbGF0aXZlJz5cbiAgICAgICAgPGltZyBzdHlsZT0ncG9zaXRpb246IGFic29sdXRlOyBsZWZ0OjIwMHB4OyB0b3A6MTQwcHgnXG4gICAgICAgICAgICAgc3JjPVwiaHR0cHM6Ly9pbWcuaWNvbnM4LmNvbS9jb2xvci85Ni8wMDAwMDAveW91dHViZS1wbGF5LnBuZ1wiXG4gICAgICAgIDxhIGhyZWY9JyR7dmlkZW9Vcmx9JyB0YXJnZXQ9J19ibGFuayc+XG4gICAgICAgICAgPGltZyBzcmM9XCIke2ltYWdlVXJsfVwiIGFsdD1cImNsaWNrIHRvIHdhdGNoXCIvPlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5gO1xuICAgIHRoaXMuaW5zZXJ0SHRtbCh0aHVtYm5haWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbnNlcnRWaW1lb1ZpZGVvVGFnKHZpZGVvVXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzdWIgPSB0aGlzLmh0dHAuZ2V0PGFueT4oYGh0dHBzOi8vdmltZW8uY29tL2FwaS9vZW1iZWQuanNvbj91cmw9JHt2aWRlb1VybH1gKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBjb25zdCBpbWFnZVVybCA9IGRhdGEudGh1bWJuYWlsX3VybF93aXRoX3BsYXlfYnV0dG9uO1xuICAgICAgY29uc3QgdGh1bWJuYWlsID0gYDxkaXY+XG4gICAgICAgIDxhIGhyZWY9JyR7dmlkZW9Vcmx9JyB0YXJnZXQ9J19ibGFuayc+XG4gICAgICAgICAgPGltZyBzcmM9XCIke2ltYWdlVXJsfVwiIGFsdD1cIiR7ZGF0YS50aXRsZX1cIi8+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PmA7XG4gICAgICB0aGlzLmluc2VydEh0bWwodGh1bWJuYWlsKTtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=