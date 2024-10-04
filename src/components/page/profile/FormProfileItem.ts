import Block from '../../../framework/Block';
import {FormInput} from "../../FormInput";
import {validateForm} from "../../../utils/validateForm";
import {TInput} from "../../../type/form";

export class FormProfileItem extends Block {
  constructor(props: TInput) {
    super({
      ...props,

      FormInput: new FormInput({
        type: props.type,
        name: props.name,
        value: props.value,
        class: 'profile__form-input',
        disabled: true,
        onBlur: () => {
          console.log('BLUR');

          if (this._element) {
            validateForm(this._element, 'profile__form-item');
          }
        },
      }),
    });
    console.log(this);
  }



  render(): string {
    return `
      <div class="profile__form-item">
        <label class="profile__form-title" for="{{ this.name }}">{{ name_ru }}</label>
        {{{ FormInput }}}
        <div class="profile__form-item-error"></div>
      </div>
  `;
  }
}
