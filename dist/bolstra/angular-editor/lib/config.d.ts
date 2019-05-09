import { Observable } from 'rxjs';
export interface CustomClass {
    name: string;
    class: string;
    tag?: string;
}
export interface Font {
    name: string;
    class: string;
}
export interface Tag {
    propertyName: string;
    name: string;
    group: string;
}
export interface AngularEditorConfig {
    editable?: boolean;
    spellcheck?: boolean;
    height?: 'auto' | string;
    minHeight?: '0' | string;
    maxHeight?: 'auto' | string;
    width?: 'auto' | string;
    minWidth?: '0' | string;
    translate?: 'yes' | 'now' | string;
    enableToolbar?: boolean;
    showToolbar?: boolean;
    placeholder?: string;
    defaultParagraphSeparator?: string;
    defaultFontName?: string;
    defaultFontSize?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | string;
    uploadUrl?: string;
    fonts?: Font[];
    customClasses?: CustomClass[];
    tagList?: Observable<Tag[]>;
    showFullFeature: boolean;
}
export declare const angularEditorConfig: AngularEditorConfig;
