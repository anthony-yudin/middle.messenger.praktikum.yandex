import Block, { BlockProps } from '../../../framework/Block';
import {Link} from "../../Link";
import {ListChats} from "./ListChats";
import {TChat} from "../../../type/chat";
import Button from "../../Button";
import {router} from "../../../App";
import {TPages} from "../../../type/pages";
import PopupCreateChat from "../../popup/PopupCreateChat";
import Store from "../../../framework/Store";
import MessageChat from "./MessageChat";
import UserApi from "../../../api/UserApi";
import ChatsUpdate from "../../../controllers/ChatsUpdate";

export let thisChat: BlockProps;

export function setViewChatActive(event: Event) {
  const currentTarget = event.currentTarget as HTMLElement;

  document.querySelectorAll('.chat__left-list-item').forEach((item) => {
    item.classList.remove('chat__left-list-item_active');
  });

  currentTarget.classList.add('chat__left-list-item_active');
  document.querySelector('.chat__current')?.classList.remove('chat__current_inactive')
}

function getThisChat(thisClass: BlockProps) {
  return thisClass;
}

class Chat extends Block {
  constructor() {
    super({
      ListChats: Object.values(Store.getState("chats")).map((item: TChat) => new ListChats({
        ...item,
        onClick: (event: Event) => ChatsUpdate.setChatActive(event, item, setViewChatActive),
      })),
      LinkProfile: new Link({
        href: '#',
        datapage: 'profile',
        class: 'chat__left-link-profile',
        text: 'Профиль',
        class_icon: 'chat__left-link-profile-icon',
        icon: 'arrow-right',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();

          router.go(TPages.profile);
        },
      }),
      PopupCreateChat: new PopupCreateChat({
        onClick: (event) => {
          const target: EventTarget | null = event.target;

          if (!(target as HTMLElement).classList.contains('popup__box') && !(target as HTMLElement).closest('.popup__box')) {
            document.querySelector('.popup_create')?.classList.remove('popup_active');
          }
        },
      }),
      MessageChat: new MessageChat({ isChatActive: false }),
      BtnCreateChat: new Button({
        class: 'chat__left-link-profile chat__left-link-profile_create-chat',
        text: 'Создать чат',
        onClick: () => {
          const elPopupCreate = document.querySelector('.popup_create');

          if (elPopupCreate) {
            document.querySelector('.popup_create')?.classList.add('popup_active');

            setTimeout(() => {
              elPopupCreate.querySelector('input')?.focus();
            }, 50)
          }
        },
      }),
    });

    thisChat = getThisChat(this);
    UserApi.setProfile();
    ChatsUpdate.getChatDataAndOpenSocket();
  }

  render(): string {
    return `
      <div class="chat">
        <aside class="chat__left">
          <div class="chat__left-header">
            {{{ BtnCreateChat }}}
            {{{ PopupCreateChat }}}
            {{{ LinkProfile }}}
      
            <form class="chat__left-search">
              <div class="chat__left-search-input-box">
                <label class="chat__left-search-label">
                  <input type="text" name="search" class="chat__left-search-input">
                </label>
      
                <div class="chat__left-search-input-placeholder">
                  <svg class="chat__left-search-input-icon"><use xlink:href="#search" /></svg>
                  Поиск
                </div>
              </div>
            </form>
          </div>
      
           <div class="chat__left-list">
            {{{ ListChats }}}
          </div>
        </aside>

        {{{ MessageChat }}}
      </div>
  `;
  }
}

export default Chat;
