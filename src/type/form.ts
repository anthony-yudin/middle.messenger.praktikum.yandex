export type TInput = {
    name: string;
    type: string;
    class?: string;
    value?: string;
    disabled?: boolean;
    onBlur?: (e?: Event) => void;
}

export type TFormTextarea = {
    name: string;
    class: string;
    placeholder: string;
    onBlur?: (e?: Event) => void;
}

export type TFormTextareaWrapper = {
    textarea: TFormTextarea;
    classWrapper: string;
}
