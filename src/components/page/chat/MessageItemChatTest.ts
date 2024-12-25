import Block from '../../../framework/Block';
import { TChat } from "../../../type/chat";

export class MessageItemChatTest extends Block {
  constructor(props: TChat) {
    super({
      ...props
    });
  }

  render(): string {
    return `
      <div>
        {{# if newDate }}
          <div class="chat__current-body-time">19 июня</div>
        {{/ if }}

        {{# if myMessage }}
          <div class="chat__current-body-message-box chat__current-body-message-box_right">
        {{/ if }}
        {{# unless myMessage }}
          <div class="chat__current-body-message-box">
        {{/ unless }}
          <div class="chat__current-body-message">
            {{{ content }}}

            <div class="chat__current-body-message-right">
              {{# if is_read }}
                <div class="chat__current-body-message-info-box chat__current-body-message-info-box_read">
              {{/ if }}
              {{# unless is_read }}
                <div class="chat__current-body-message-info-box">
              {{/ unless }}
                <div class="chat__current-body-message-info"></div>
                <div class="chat__current-body-message-info"></div>
                <div class="chat__current-body-message-info"></div>
              </div>
              <div class="chat__current-body-message-time">{{{ time }}}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export default MessageItemChatTest;