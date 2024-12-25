import Block from '../../framework/Block';
import Button from "../Button";
import ChatsApi from "../../api/ChatsApi";
import Store from "../../framework/Store";
import UserApi from "../../api/UserApi";

class PopupRemoveUserChat extends Block {
  constructor(props: { onClick?: (e: Event) => void }) {
    super({
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
      ButtonClose: new Button({
        text: '',
        class: 'popup__close-box',
        class_inner: 'popup__close',
        onClick: () => {
          document.querySelector('.popup_add-user-chat')?.classList.remove('popup_active');
        }
      }),
      ButtonRemoveUserChat: new Button({
        text: 'Удалить',
        class: 'btn',
        onClick: () => {
          const elPopupAddUser = document.querySelector('.popup_remove-user-chat');
          const elPopupAddUserInput = elPopupAddUser?.querySelector('input') as HTMLInputElement;
          const valueInput = elPopupAddUserInput?.value;

          if (valueInput) {
            UserApi.searchUser({ 'login': valueInput }).then((data: { id: number }[]) => {
              const elResFormText = elPopupAddUser?.querySelector('.popup__form-text');

              if (data.length > 0 && data[0] && data[0].id) {
                const dataSend = { "users": [data[0].id], "chatId": Store.getState("chatActive").id };

                ChatsApi.deleteUserChat(dataSend).then(() => {
                  elPopupAddUserInput.value = '';

                  if (elResFormText) {
                    elResFormText?.classList.add('popup__form-text_active', 'popup__form-text_success');
                    elResFormText.textContent = 'Пользователь удалён!';
                  }

                  setTimeout(() => {
                    elPopupAddUser?.classList.remove('popup_active');
                  }, 1000)
                })
              } else {
                if (elResFormText) {
                  elResFormText?.classList.add('popup__form-text_active', 'popup__form-text_error');
                  elResFormText.textContent = `Пользователь с ником "${valueInput}" не найден`;
                }
              }
            });
          }
        }
      })
    });
  }

  render(): string {
    return `
      <div class="popup popup_remove-user-chat">
        <div class="popup__box">
          {{{ ButtonClose }}}

          <div class="popup__title">Удалить пользователя</div>
          <div class="popup__form">
            <label class="popup__form-title" for="title">Логин</label>
            <input type="text" class="popup__form-input" name="title" id="title">
            {{{ ButtonRemoveUserChat }}}
            <div class="popup__form-text">Готово!</div>
          </div>
        </div>         
      </div>
    `;
  }
}

export default PopupRemoveUserChat;
