import Block from '../framework/Block';
import {Link} from "./Link";
import {ListChats} from "./ListChats";
import {chats} from '../mockData';
import {TChat} from "../type/chat";
import {Button} from "./Button";
import {submitForm} from "../utils/submitForm";
import {FormTextareaWrapper} from "./FormTextareaWrapper";

export class Chat extends Block {
  constructor() {
    super({
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
        },
      }),
      ListChats: chats.map((item: TChat) => new ListChats(item)),
      FormChatTextarea: [new FormTextareaWrapper({
        textarea: {
          name: 'message',
          class: 'chat__message-send-input',
          placeholder: 'Сообщение',
        },
        classWrapper: 'chat__message-send-input-box',
      })],
      ButtonSendMessage: new Button({
        class: 'chat__message-send-button',
        class_icon: 'chat__message-send-button-icon',
        icon: 'arrow-right2',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();

          submitForm(this.lists.FormChatTextarea, 'chat__message-send-input-box');
        },
      }),
    });
  }

  render(): string {

    return `
      <div class="chat">
        <aside class="chat__left">
          <div class="chat__left-header">
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

        <main class="chat__current chat__current_inactive2">
          <div class="chat__chat-not-selected">
            Выберите чат, чтобы отправить сообщение
          </div>

          <div class="chat__current-selected">
            <div class="chat__current-header">
              <div class="chat__current-header-profile">
                <div class="chat__avatar chat__current-header-avatar"></div>
                Андрей
              </div>
              
              <div class="chat__current-header-menu">
                <div class="chat__current-header-menu-point-box">
                  <div class="chat__current-header-menu-point"></div>
                  <div class="chat__current-header-menu-point"></div>
                  <div class="chat__current-header-menu-point"></div>
                </div>
                
                <div class="chat__menu-box chat__menu-box_bottom chat__menu-box_right">
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
                </div>
              </div>
            </div>
            
            <div class="chat__current-body-box">
              <div class="chat__current-body">
                  <div class="chat__current-body-time">19 июня</div>
                
                  <div class="chat__current-body-message-box">
                      <div class="chat__current-body-message">
                        Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br><br>
                        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                        <div class="chat__current-body-message-time">11:56</div>
                      </div>
                  </div>
                  
                  <div class="chat__current-body-message-box">
                      <div class="chat__current-body-message chat__current-body-message_img">
                        <img src="../../" alt>
                      </div>
                  </div>
                  
                  <div class="chat__current-body-message-box chat__current-body-message-box_right">
                      <div class="chat__current-body-message">
                          Круто!
                          <div class="chat__current-body-message-right">
                              <div class="chat__current-body-message-info-box">
                                <div class="chat__current-body-message-info"></div>
                                <div class="chat__current-body-message-info"></div>
                                <div class="chat__current-body-message-info"></div>
                              </div>
                              <div class="chat__current-body-message-time">12:00</div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            
            <form class="chat__footer">
              <div class="chat__footer-attach-files">
                <div class="chat__footer-attach-files-btn-box">
                  <svg class="chat__footer-attach-files-btn"><use xlink:href="#attach" /></svg>
                </div>
              
                <div class="chat__menu-box chat__menu-box_top chat__menu-box_left">
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
                </div>
              </div>

              {{{ FormChatTextarea }}}
              {{{ ButtonSendMessage }}}
            </form>
          </div>
        </main>
      </div>
  `;
  }
}
