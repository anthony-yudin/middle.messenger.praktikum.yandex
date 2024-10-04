import Block from '../../../framework/Block';
import {Link} from '../../Link';
import {Button} from "../../Button";
import {TInput} from "../../../type/form";
import {profile} from '../../../mockData';
import {FormProfileItem} from "./FormProfileItem";
import {submitForm} from "../../../utils/submitForm";

export class Profile extends Block {
  constructor() {
    super({
      ButtonSave: new Button({
        class: 'btn profile__btn-save-profile',
        text: 'Сохранить',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          const successSubmit = submitForm(this.lists.FormProfileItem, 'profile__form-item');

          if (successSubmit) {
            this._element?.classList.remove('profile_active-edit');

            this.lists.FormProfileItem.forEach((item: any) => {
              item._element.querySelector('input').setAttribute('disabled', 'true');
            });
          }
        },
      }),
      LinkBack: new Link({
        href: '#',
        datapage: 'chat',
        class: 'profile__back-btn-box',
        class_icon: 'profile__back-btn-icon',
        icon: 'back-btn',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();
        },
      }),
      EditLink: new Link({
        href: '#',
        class: 'profile__btn profile__btn_edit',
        text: 'Изменить данные',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();

          this._element?.classList.add('profile_active-edit');

          this.lists.FormProfileItem.forEach((item: any) => {
            item._element.querySelector('input').removeAttribute('disabled');
          });
        },
      }),
      FormProfileItem: profile.map((item: TInput) => new FormProfileItem(item))
    });
  }

  render(): string {
    return `
      <div class="profile">
        <main class="profile__box">
      
          <div class="profile__avatar-box">
            <div class="profile__avatar-img-box">
              <div class="profile__avatar-img">
                <svg class="profile__avatar-img-icon"><use xlink:href="#mask-avatar" /></svg>
              </div>
      
              <div class="profile__avatar-img-text">Поменять аватар</div>
            </div>
      
            <div class="profile__avatar-title">Иван</div>
          </div>
      
          <form class="profile__form">
            <div class="profile__form-item-box">
              {{{ FormProfileItem }}}
            </div>
      
            {{{ ButtonSave }}}
          </form>
      
          <div class="profile__btn-box">
            {{{ EditLink }}}
            
            <div class="profile__btn">Изменить пароль</div>
            <div class="profile__btn profile__btn_out">Выйти</div>
          </div>
        </main>
      
        <aside>
          {{{ LinkBack }}}
        </aside>
      </div>
    `;
  }
}
