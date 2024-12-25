export type TInput = {
    name_ru?: string;
    name: string;
    type: string;
    class?: string;
    value?: string;
    disabled?: boolean;
    onBlur?: (e?: Event) => void;
}

export type TPassword = {
    oldPassword: string,
    password: string,
    password_repeat: string
}

export type TFormTextarea = {
    name: string;
    class: string;
    placeholder: string;
    onBlur?: (e?: Event) => void;
    keydown?: (e?: Event) => void;
}

export type TFormTextareaWrapper = {
    textarea: TFormTextarea;
    classWrapper: string;
}