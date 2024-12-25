import Block from '../../../framework/Block';
import {Link} from '../../Link';
import {FormAuthRegItem} from './FormAuthRegItem';
import {TInput} from '../../../type/form';
import {reg} from '../../../mockData';
import Button from "../../Button";
import {submitForm} from "../../../utils/submitForm";
import { router } from "../../../App";
import Store from "../../../framework/Store";
import {TPages} from "../../../type/pages";
import RegAuthApi from "../../../api/RegAuthApi";

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

          const dataForm = submitForm(this.lists.FormAuthRegItems, 'form-auth-reg__item');
          const elFormError = document.querySelector('.form-auth-reg__error');

          if (dataForm) {
            RegAuthApi.regApi(dataForm).then((data: { id: string }) => {
              Store.set("profile", {
                "id": data.id,
                "email": dataForm.email,
                "login": dataForm.login,
                "firstName": dataForm.first_name,
                "secondName": dataForm.second_name,
                "phone": dataForm.phone,
                "password": dataForm.password,
              });

              if (elFormError) {
                elFormError.classList.remove('form-auth-reg__error_active')
              }

              router.go(TPages.chat);
            }).catch((err) => {
              if (elFormError) {
                elFormError.classList.add('form-auth-reg__error_active');
                elFormError.textContent = err;
              }
            });
          }


        },
      }),
      LinkAuth: new Link({
        href: '/sign-up',
        datapage: 'auth',
        text: 'Войти',
        class: 'form-auth-reg__link-auth-reg',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();

          router.go(TPages.auth);
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
          <div class="form-auth-reg__error"></div>
          {{{ ButtonReg }}}
          
          <div class="form-auth-reg__link-auth-reg-box">
            {{{ LinkAuth }}}
          </div>
        </form>
      </main>
    `;
  }
}
