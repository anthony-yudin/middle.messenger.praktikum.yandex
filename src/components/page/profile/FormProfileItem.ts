import Block from '../../../framework/Block';
import FormInput from "../../FormInput";
import {validateForm} from "../../../utils/validateForm";
import {TInput} from "../../../type/form";
import {connect} from "../../../framework/HOC";
import Store from "../../../framework/Store";

class FormProfileItem extends Block {
  constructor(props: TInput) {
    super({
      ...props,

      FormInput: new FormInput({

        type: props.type,
        name: props.name,
        value: props.value,
        class: `profile__form-input${props.class ? ` ${props.class}` : ''}`,
        disabled: props.disabled,
        onBlur: () => {
          console.log('BLUR');

          if (this._element) {
            validateForm(this._element, 'profile__form-item');
          }
        },
      }),
    });
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

const withUser = connect(state => ({ value: state.profile.email }));
export default FormProfileItem;