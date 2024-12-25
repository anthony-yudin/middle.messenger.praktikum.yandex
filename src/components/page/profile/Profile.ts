import Block, {BlockProps} from '../../../framework/Block';
import {Link} from '../../Link';
import Button from "../../Button";
import {TInput} from "../../../type/form";
import FormProfileItem from "./FormProfileItem";
import {submitForm} from "../../../utils/submitForm";
import {router} from "../../../App";
import {TPages} from "../../../type/pages";
import RegAuthApi from "../../../api/RegAuthApi";
import setProfileForm from "../../../utils/setProfileForm";
import UserApi from "../../../api/UserApi";
import {TProfileApi} from "../../../type/profile";
import Store from "../../../framework/Store";
import ChangeAvatar from "./ChangeAvatar";
import InputAvatar from "./InputAvatar";
import Avatar from "./Avatar";
import NameAfterAvatar from "./NameAfterAvatar";

class Profile extends Block {
  constructor() {
    const dataProfile = UserApi.setProfile();

    if (dataProfile) {
      dataProfile.then(() => {
        this.setLists({
          FormProfileItems: setProfileForm().map((item: TInput) => new FormProfileItem(item))
        });
      })
    }

    super({
      NameAfterAvatar: new NameAfterAvatar({
        login: Store.getState("profile").login,
      }),
      Avatar: new Avatar({
        avatar: Store.getState("profile").avatar,
      }),
      ChangeAvatar: new ChangeAvatar({
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          const elInputFile = (event.target as HTMLElement).closest('form')?.querySelector("[type=file]") as HTMLElement;

          elInputFile.click();
        }
      }),
      InputAvatar: new InputAvatar({
        onChange: (event: Event) => {
          const elForm = (event.target as HTMLElement)?.closest('form');

          if (elForm) {
            const dataForm = new FormData(elForm);

            UserApi.changeAvatar(dataForm).then((data: TProfileApi) => {
              Store.set("profile", {
                "avatar": data.avatar,
              });
            });
          }
        }
      }),
      ButtonSavePassword: new Button({
        class: 'btn profile__btn-save-profile profile__btn-save-profile_password',
        text: 'Сохранить новый пароль',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          const dataForm: Record<string, string> | boolean = submitForm(this.lists.FormProfileItemPassword, 'profile__form-item');
          const elFormError = document.querySelector('.profile__form-error_password');

          if (dataForm) {
            UserApi.changePassword({ oldPassword: dataForm.oldPassword, newPassword: dataForm.password }).then(() => {
              this._element?.classList.remove('profile_active-edit');
              this._element?.classList.remove('profile_active-edit-password');

              if (elFormError) {
                elFormError.classList.remove('profile__form-error_active')
              }
            }).catch((err) => {
              if (elFormError) {
                elFormError.classList.add('profile__form-error_active');
                elFormError.textContent = err;
              }
            });
          }
        }
      }),
      FormProfileItemPassword: [
        new FormProfileItem({
          "name_ru": "Старый пароль",
          "name": "oldPassword",
          "type": "password",
          "disabled": false,
        }),
        new FormProfileItem({
          "name_ru": "Новый пароль",
          "name": "password",
          "type": "password",
          "disabled": false,
          "class": "password",
        }),
        new FormProfileItem({
          "name_ru": "Пароль (ещё раз)",
          "name": "password_repeat",
          "type": "password",
          "disabled": false,
          "class": "password",
        }),
      ],

      ButtonSave: new Button({
        class: 'btn profile__btn-save-profile',
        text: 'Сохранить',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          // Store.set("button", "button1123123");
          // const profileState = Store.getState("profile");

          const dataForm = submitForm(this.lists.FormProfileItems, 'profile__form-item');

          if (dataForm) {
            UserApi.changeProfile(dataForm).then((data: TProfileApi) => {
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

              this._element?.classList.remove('profile_active-edit');

              this.lists.FormProfileItems.forEach((item: BlockProps) => {
                item._element.querySelector('input').setAttribute('disabled', 'true');
              });
            });
          }
        },
      }),
      ButtonLogout: new Button({
        class: 'profile__btn profile__btn_out',
        text: 'Выйти',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();

          RegAuthApi.logout().then(() => {
            router.go(TPages.auth);
          });
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

          router.go(TPages.chat);
        },
      }),
      EditLink: new Link({
        href: '#',
        class: 'profile__btn profile__btn_edit-info',
        text: 'Изменить данные',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();

          this._element?.classList.remove('profile_active-edit-password');
          this._element?.classList.add('profile_active-edit');

          this.lists.FormProfileItems.forEach((item: BlockProps) => {
            item._element.querySelector('input').removeAttribute('disabled');
          });
        },
      }),
      EditPassword: new Link({
        href: '#',
        class: 'profile__btn profile__btn_edit-password',
        text: 'Изменить пароль',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();

          this._element?.classList.remove('profile_active-edit');
          this._element?.classList.add('profile_active-edit-password');
        },
      }),
      FormProfileItems: setProfileForm().map((item: TInput) => new FormProfileItem(item))
    });
  }

  render(): string {
    return `
      <div class="profile">
        <main class="profile__box">

          <div class="profile__avatar-box">
            <form class="profile__avatar-img-box">
              {{{ Avatar }}}
              {{{ ChangeAvatar }}}
              {{{ InputAvatar }}}
            </form>

            {{{ NameAfterAvatar }}}
          </div>

          <form class="profile__form profile__form_edit-password">
            <div class="profile__form-item-box">
              {{{ FormProfileItemPassword }}}
            </div>

            <div class="profile__form-error profile__form-error_password"></div>
            {{{ ButtonSavePassword }}}
          </form>

          <form class="profile__form">
            <div class="profile__form-item-box">
              {{{ FormProfileItems }}}
            </div>

            {{{ ButtonSave }}}
          </form>

          <div class="profile__btn-box">
            {{{ EditLink }}}
            {{{ EditPassword }}}
            {{{ ButtonLogout }}}
          </div>
        </main>
      
        <aside>
          {{{ LinkBack }}}
        </aside>
      </div>
    `;
  }
}

export default Profile;
