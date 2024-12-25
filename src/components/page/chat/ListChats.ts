import Block from '../../../framework/Block';
import { TChat } from "../../../type/chat";

export class ListChats extends Block {
  constructor(props: TChat) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  render(): string {
    return `
      <div class="chat__left-list-item" data-id="{{{ id }}}">
        {{# if avatar }}
          <img src="https://ya-praktikum.tech/api/v2/resources/{{{ avatar }}}" class="chat__avatar">
        {{else}}
          <div class="chat__avatar"></div>
        {{/ if }}

        <div class="chat__left-list-content">
          <div class="chat__left-list-content-title">{{ title }}</div>
          <div class="chat__left-list-content-message">{{# if myMessage }}Вы: {{/ if }}{{ last_message }}</div>
        </div>
  
        {{# if time }}
          <div class="chat__left-list-item-time">{{ time }}</div>
        {{/ if }}
  
        {{# if unread_count }}
          <div class="chat__left-list-item-info-message">{{ unread_count }}</div>
        {{/ if }}
      </div>
    </div>
    `;
  }
}