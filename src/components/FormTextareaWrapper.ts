import Block from '../framework/Block';
import {validateForm} from "../utils/validateForm";
import {TFormTextareaWrapper} from '../type/form';
import {FormTextarea} from "./FormTextarea";
import SocketApi from "../api/SocketApi";
import Store from "../framework/Store";

export class FormTextareaWrapper extends Block {
  constructor(props: TFormTextareaWrapper) {
    super({
      ...props,
      FormTextarea: new FormTextarea({
        name: props.textarea.name,
        class: 'chat__message-send-input',
        placeholder: props.textarea.placeholder,
        onBlur: () => {
          if (this._element) {
            validateForm(this._element, this.props.classWrapper);
          }
        },
        keydown: (event: KeyboardEvent) => {
          const target: EventTarget | null = event.target;

          if (target) {
            if (event.shiftKey && event.keyCode == 13) {
              event.preventDefault();

              (target as HTMLTextAreaElement).value = (target as HTMLTextAreaElement).value + '\n';
            } else if (event.keyCode === 13 && !event.shiftKey) {
              SocketApi.send(Store.getState("chatActive").socket, (target as HTMLTextAreaElement).value.replace('\n', ''));
              (target as HTMLTextAreaElement).value = '';
            }
          }
        }
      }),
    });
  }

  render(): string {
    return `
      <div class="{{ classWrapper }}">
        {{{ FormTextarea }}}
      </div>
  `;
  }
}
