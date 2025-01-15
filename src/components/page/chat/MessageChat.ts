import Block from '../../../framework/Block';
import {TChat} from "../../../type/chat";
import {FormTextareaWrapper} from "../../FormTextareaWrapper";
import Button from "../../Button";
import TitleChat from "./TitleChat";
import AvatarChat from "./AvatarChat";
import Store from "../../../framework/Store";
import SocketApi from "../../../api/SocketApi";
import MessageItemChat from "./MessageItemChat";
import ChatsApi from "../../../api/ChatsApi";
import ChatsUpdate from "../../../controllers/ChatsUpdate";
import {thisChat} from "./Chat";
import ButtonAddUserChat from "./ButtonAddUserChat";
import ButtonRemoveUserChat from "./ButtonRemoveUserChat";
import PopupAddUserChat from "../../popup/PopupAddUserChat";
import PopupRemoveUserChat from "../../popup/PopupRemoveUserChat";

export default class MessageChat extends Block {
  constructor(props: {
    isChatActive: boolean
  }) {
    super({
      isChatActive: props.isChatActive,
      MessageItemChat: Store.getState("chatActive")?.messages?.map((item: TChat) => new MessageItemChat({
        ...item,
      })),
      TitleChat: new TitleChat({ title: '' }),
      AvatarChat: new AvatarChat({ avatar: '' }),
      FormChatTextarea: new FormTextareaWrapper({
        textarea: {
          name: 'message',
          class: 'chat__message-send-input',
          placeholder: 'Сообщение',
        },
        classWrapper: 'chat__message-send-input-box',
      }),
      ButtonSendMessage: new Button({
        class: 'chat__message-send-button',
        class_icon: 'chat__message-send-button-icon',
        icon: 'arrow-right2',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          const target: EventTarget | null = event.target;

          if (target) {
            const textarea: string | null | undefined = (target as HTMLElement).closest('form')?.querySelector('textarea')?.value;

            if (textarea) {
              SocketApi.send(Store.getState("chatActive").socket, textarea);
            }
          }
        },
      }),
      ButtonAddUserChat: new ButtonAddUserChat({
        onClick: () => {
          const elPopupAddUser = document.querySelector('.popup_add-user-chat');

          if (elPopupAddUser) {
            elPopupAddUser?.classList.add('popup_active');
            elPopupAddUser?.querySelector('.popup__form-text')?.classList.remove('popup__form-text_active', 'popup__form-text_success', 'popup__form-text_error');

            setTimeout(() => {
              elPopupAddUser.querySelector('input')?.focus();
            }, 50)
          }
        },
      }),
      PopupAddUserChat: new PopupAddUserChat({
        onClick: (event) => {
          const target: EventTarget | null = event.target;

          if (!(target as HTMLElement).classList.contains('popup__box') && !(target as HTMLElement).closest('.popup__box')) {
            document.querySelector('.popup_add-user-chat')?.classList.remove('popup_active');
          }
        },
      }),
      ButtonRemoveUserChat: new ButtonRemoveUserChat({
        onClick: () => {
          const elPopupRemoveUser = document.querySelector('.popup_remove-user-chat');
          console.log(elPopupRemoveUser, '111');
          if (elPopupRemoveUser) {
            elPopupRemoveUser?.classList.add('popup_active');
            elPopupRemoveUser?.querySelector('.popup__form-text')?.classList.remove('popup__form-text_active', 'popup__form-text_success', 'popup__form-text_error');

            setTimeout(() => {
              elPopupRemoveUser.querySelector('input')?.focus();
            }, 50)
          }
        },
      }),
      PopupRemoveUserChat: new PopupRemoveUserChat({
        onClick: (event) => {
          const target: EventTarget | null = event.target;

          if (!(target as HTMLElement).classList.contains('popup__box') && !(target as HTMLElement).closest('.popup__box')) {
            document.querySelector('.popup_remove-user-chat')?.classList.remove('popup_active');
          }
        },
      }),
      ButtonDeleteChat: new Button({
        class: 'chat__menu-item-btn-delete-chat',
        text: 'Удалить чат',
        onClick: () => {
          const chatDeleted = Store.getState("chatActive");

          ChatsApi.deleteChat({ 'chatId': chatDeleted.id }).then(() => {
            const currentStateChats = Object.values(Store.getState("chats")).reduce((res: Record<string, TChat>, item: TChat) => {
              if (item.id !== chatDeleted.id) {
                res = {
                  ...res,
                  [`'${item.id}'`]: {
                    ...item
                  },
                };
              }

              return res;
            }, {});

            SocketApi.close(chatDeleted.socket);
            Store.set("chats", []);
            Store.set("chats", currentStateChats);
            Store.set("chatActive", []);
            ChatsUpdate.updateChatsList();
            ChatsUpdate.updateChatsMessages();
            thisChat.children.MessageChat.setProps({ isChatActive: false })
          });
        },
      }),
    });

    console.log(this, 'this');
  }

  render(): string {
    return `
    <main class="chat__current chat__current_inactive">
      {{{ PopupAddUserChat }}}
      {{{ PopupRemoveUserChat }}}
    
      {{# unless isChatActive }}
        <div class="chat__chat-not-selected">Выберите чат, чтобы отправить сообщение</div>
      {{/ unless }}

      <div class="chat__current-selected">
        <div class="chat__current-header">
          <div class="chat__current-header-profile">
            {{{ AvatarChat }}}
            {{{ TitleChat }}}
          </div>

          <div class="chat__current-header-menu">
             <div class="chat__current-header-menu-point-box">
                <div class="chat__current-header-menu-point"></div>
                <div class="chat__current-header-menu-point"></div>
                <div class="chat__current-header-menu-point"></div>
             </div>
             <div class="chat__menu-box chat__menu-box_bottom chat__menu-box_right">
              <div class="chat__menu">
                 {{{ ButtonAddUserChat }}}
                 {{{ ButtonRemoveUserChat }}}
                 {{{ ButtonDeleteChat }}}
              </div>
             </div>
          </div>
        </div>

        <div class="chat__current-body-box">
          <div class="chat__current-body">
            {{{ MessageItemChat }}}
          </div>
        </div>

        <form class="chat__footer">
          <div class="chat__footer-attach-files">
            <div class="chat__footer-attach-files-btn-box">
              <svg class="chat__footer-attach-files-btn"><use xlink:href="#attach" /></svg>
            </div>

            <!--<div class="chat__menu-box chat__menu-box_top chat__menu-box_left">
              <div class="chat__menu">
                  <div class="chat__menu-item">
                    <svg class="chat__menu-item-icon"><use xlink:href="#add-user" /></svg>
                    <div class="chat__menu-item-text">Добавить пользователя</div>
                  </div>
                  
                  <div class="chat__menu-item">
                    <svg class="chat__menu-item-icon"><use xlink:href="#delete-user" /></svg>
                    <div class="chat__menu-item-text">Удалить пользователя</div>
                  </div>
              </div>
            </div>-->
          </div>

          {{{ FormChatTextarea }}}
          {{{ ButtonSendMessage }}}
        </form>
      </div>
    </div>
    `;
  }
}
