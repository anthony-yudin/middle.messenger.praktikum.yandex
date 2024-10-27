import Block from '../../../framework/Block';
import {FormInput} from "../../FormInput";
import {validateForm} from "../../../utils/validateForm";
import {TInput} from "../../../type/form";

export class FormAuthRegItem extends Block {
  constructor(props: TInput) {
    super({
      ...props,
      FormInput: new FormInput({
        type: props.type,
        name: props.name,
        class: 'form-auth-reg__item-input',
        onBlur: () => {
          console.log('BLUR');

          if (this._element) {
            validateForm(this._element, 'form-auth-reg__item');
          }
        },
      }),
    });
  }

  render(): string {
    return `
      <div class="form-auth-reg__item">
        <label class="form-auth-reg__item-title" for="{{ this.name }}">{{ name_ru }}</label>
        {{{ FormInput }}}
        <div class="form-auth-reg__item-error"></div>
      </div>
  `;
  }
}
