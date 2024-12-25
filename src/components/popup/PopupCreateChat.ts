import Block from '../../framework/Block';
import Button from "../Button";
import ChatsApi from "../../api/ChatsApi";
import ChatsUpdate from "../../controllers/ChatsUpdate";
import Store from "../../framework/Store";

class PopupCreateChat extends Block {
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
          document.querySelector('.popup_create')?.classList.remove('popup_active');
        }
      }),
      ButtonCreateChat: new Button({
        text: 'Создать',
        class: 'btn',
        onClick: () => {
          const elPopupCreate = document.querySelector('.popup_create');
          const elPopupCreateInput = elPopupCreate?.querySelector('input') as HTMLInputElement;
          const valueInput = elPopupCreateInput?.value;

          if (valueInput) {
            ChatsApi.createChat({ 'title': valueInput }).then(({ id }: { id: string }) => {
              const currentChatState = Store.getState("chats");

              currentChatState[`'${id}'`] = {
                "id": id,
                "title": valueInput,
                "messages": []
              }

              Store.set("chats", currentChatState)
              elPopupCreate?.classList.remove('popup_active');
              ChatsUpdate.updateChatsList();
              elPopupCreateInput.value = '';
            });
          }
        }
      })
    });
  }

  render(): string {
    return `
      <div class="popup popup_create">
        <div class="popup__box">
          {{{ ButtonClose }}}

          <div class="popup__title">Создать чат</div>
          <div class="popup__form">
            <label class="popup__form-title" for="title">Название чата</label>
            <input type="text" class="popup__form-input" name="title" id="title">
            {{{ ButtonCreateChat }}}
          </div>
        </div>         
      </div>
    `;
  }
}

export default PopupCreateChat;
