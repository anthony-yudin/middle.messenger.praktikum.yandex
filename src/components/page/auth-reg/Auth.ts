import Block from '../../../framework/Block';
import {Link} from '../../Link';
import {FormAuthRegItem} from './FormAuthRegItem';
import {Button} from "../../Button";
import {TInput} from '../../../type/form';
import {submitForm} from "../../../utils/submitForm";
import {auth} from '../../../mockData';

export class Auth extends Block {
  constructor() {
    super({
      LinkNoAccount: new Link({
        href: '#',
        datapage: 'reg',
        text: 'Нет аккаунта?',
        class: 'form-auth-reg__link-auth-reg',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();
        },
      }),
      ButtonAuth: new Button({
        text: 'Авторизоваться',
        class: 'btn',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();

          submitForm(this.lists.FormAuthRegItems, 'form-auth-reg__item');
        },
      }),
      FormAuthRegItems: auth.map((item: TInput) => new FormAuthRegItem(item))
    });
  }

  render(): string {
    return `
      <main class="form-auth-reg">
          <form class="form-auth-reg__box">
            <div class="form-auth-reg__title">Вход</div>
              
              {{{ FormAuthRegItems }}}
              {{{ ButtonAuth }}}
        
            <div class="form-auth-reg__link-auth-reg-box">
              {{{ LinkNoAccount }}}
            </div>
          </form>
        </main>
      `;
  }
}
