import Block from '../framework/Block';
import { TChat } from "../type/chat";

export class ListChats extends Block {
  constructor(props: TChat) {
    super({
      ...props,
    });
  }

  render(): string {
    return `
      <div class="chat__left-list-item">
        <div class="chat__avatar"></div>
  
        <div class="chat__left-list-content">
          <div class="chat__left-list-content-title">{{ name }}</div>
          <div class="chat__left-list-content-message">{{ message }}</div>
        </div>
  
        <div class="chat__left-list-item-time">{{ time }}</div>
  
        {{# if unread_messages }}
          <div class="chat__left-list-item-info-message">{{ unread_messages }}</div>
        {{/ if }}
      </div>
    `;
  }
}
