import Block from '../../../framework/Block';
import {Link} from '../../Link';
import {FormAuthRegItem} from './FormAuthRegItem';
import Button from "../../Button";
import {TInput} from '../../../type/form';
import {submitForm} from "../../../utils/submitForm";
import {auth} from '../../../mockData';
import {router} from "../../../App";
import {TPages} from "../../../type/pages";
import RegAuthApi from "../../../api/RegAuthApi";
import UserApi from "../../../api/UserApi";
import Store from "../../../framework/Store";
import {TProfileApi} from '../../../type/profile';

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

          router.go(TPages.reg);
        },
      }),
      ButtonAuth: new Button({
        text: 'Авторизоваться',
        class: 'btn',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();

          const dataForm = submitForm(this.lists.FormAuthRegItems, 'form-auth-reg__item');

          if (dataForm) {
            RegAuthApi.authApi(dataForm).then(() => {
              UserApi.getProfile().then((data: TProfileApi) => {
                Store.set("profile", {
                  "id": data.id,
                  "email": data.email,
                  "login": data.login,
                  "firstName": data.first_name,
                  "secondName": data.second_name,
                  "displayName": data.display_name,
                  "avatar": data.avatar,
                  "phone": data.phone
                });
              });

              router.go(TPages.chat);
            });
          }
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
