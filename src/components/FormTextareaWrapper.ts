import Block from '../framework/Block';
import {validateForm} from "../utils/validateForm";
import {TFormTextareaWrapper} from '../type/form';
import {FormTextarea} from "./FormTextarea";

export class FormTextareaWrapper extends Block {
  constructor(props: TFormTextareaWrapper) {
    super({
      ...props,
      FormTextarea: new FormTextarea({
        name: props.textarea.name,
        class: 'chat__message-send-input',
        placeholder: props.textarea.placeholder,
        onBlur: () => {
          console.log('BLUR');

          if (this._element) {
            validateForm(this._element, this.props.classWrapper);
          }
        },
      }),
    });
    console.log(typeof this._element);
  }

  render(): string {
    return `
      <div class="{{ classWrapper }}">
        {{{ FormTextarea }}}
      </div>
  `;
  }
}
