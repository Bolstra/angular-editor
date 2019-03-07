import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomClass, Tag } from './config';
export interface UploadResponse {
    imageUrl: string;
}
export declare class AngularEditorService {
    private http;
    private document;
    savedSelection: Range | null;
    selectedText: string;
    uploadUrl: string;
    constructor(http: HttpClient, document: any);
    /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param command string from triggerCommand
     */
    executeCommand(command: string): void;
    /**
     * Create URL link
     * @param url string from UI prompt
     */
    createLink(url: string): void;
    /**
     * insert color either font or background
     *
     * @param color color to be inserted
     * @param where where the color has to be inserted either text/background
     */
    insertColor(color: string, where: string): void;
    /**
     * Set font name
     * @param fontName string
     */
    setFontName(fontName: string): void;
    /**
     * Set font size
     * @param fontSize string
     */
    setFontSize(fontSize: string): void;
    /**
     * Create raw HTML
     * @param html HTML string
     */
    insertHtml(html: string): void;
    /**
     * save selection when the editor is focussed out
     */
    saveSelection(): any;
    /**
     * restore selection when the editor is focussed in
     *
     * saved selection when the editor is focussed out
     */
    restoreSelection(): boolean;
    /** check any slection is made or not */
    private checkSelection;
    /**
     * Upload file to uploadUrl
     * @param file
     */
    uploadImage(file: File): Observable<HttpEvent<UploadResponse>>;
    /**
     * Insert image with Url
     * @param imageUrl
     */
    insertImage(imageUrl: string): void;
    insertVideo(videoUrl: string): void;
    insertTag(tag: Tag): void;
    setDefaultParagraphSeparator(separator: string): void;
    createCustomClass(customClass: CustomClass): void;
    private insertYouTubeVideoTag;
    private insertVimeoVideoTag;
}
