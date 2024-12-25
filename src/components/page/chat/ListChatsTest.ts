import Block from '../../../framework/Block';
import { TChat } from "../../../type/chat";
import {connect} from "../../../framework/HOC";

export class ListChatsTest extends Block {
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
      <div class="chat__left-list">
        {{#each chats}}
          {{#each this}}
            {{ this.avatar }}
          {{/each}}
          <div class="chat__left-list-item" data-id="{{{ this.id }}}">
            {{# if this.avatar }}
                <div class="chat__avatar"></div>
            {{ else }}
                <div class="chat__avatar"></div>
            {{/ if }}
      
            <div class="chat__left-list-content">
              <div class="chat__left-list-content-title">{{ this.title }} {{ this.myMessage }} myMessageфыв</div>
              <div class="chat__left-list-content-message">{{# if this.myMessage }}Вы: {{/ if }}{{ this.last_message }}</div>
            </div>
      
            {{# if this.time }}
              <div class="chat__left-list-item-time">{{ this.time }}</div>
            {{/ if }}
      
            {{# if this.unread_count }}
              <div class="chat__left-list-item-info-message">{{ this.unread_count }}</div>
            {{/ if }}
          </div>
        {{/each}}
      </div>
    `;
  }
}

const withState = connect(state => ({ chats: state.chats }));
export default withState(ListChatsTest);
