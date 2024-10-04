import Block from '../../../framework/Block';
import {Link} from '../../Link';
import {FormAuthRegItem} from './FormAuthRegItem';
import {TInput} from '../../../type/form';
import {reg} from '../../../mockData';
import {Button} from "../../Button";
import {submitForm} from "../../../utils/submitForm";

export class Reg extends Block {
  constructor() {
    super({
      ButtonReg: new Button({
        text: 'Зарегистрироваться',
        class: 'btn btn_auth-reg',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();

          submitForm(this.lists.FormAuthRegItems, 'form-auth-reg__item');
        },
      }),
      LinkAuth: new Link({
        href: '#',
        datapage: 'auth',
        text: 'Войти',
        class: 'form-auth-reg__link-auth-reg',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();
        },
      }),
      FormAuthRegItems: reg.map((item: TInput) => new FormAuthRegItem(item))
    });
  }

  render(): string {
    return `
      <main class="form-auth-reg">
        <form class="form-auth-reg__box">
          <div class="form-auth-reg__title">Регистрация</div>
          
          {{{ FormAuthRegItems }}}
          {{{ ButtonReg }}}
          
          <div class="form-auth-reg__link-auth-reg-box">
            {{{ LinkAuth }}}
          </div>
        </form>
      </main>
    `;
  }
}
