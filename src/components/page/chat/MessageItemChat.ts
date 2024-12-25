import Block from '../../../framework/Block';
import {connect} from "../../../framework/HOC";

export class MessageItemChat extends Block {
  constructor() {
    super();
  }

  render(): string {
    return `
      <div class="chat__current-body">
        {{#each messages}}
          {{# if newDate }}
            <div class="chat__current-body-time">19 июня</div>
          {{/ if }}
  
          {{# if this.myMessage }}
            <div class="chat__current-body-message-box chat__current-body-message-box_right">
          {{/ if }}
          {{# unless this.myMessage }}
            <div class="chat__current-body-message-box">
          {{/ unless }}
            <div class="chat__current-body-message">
              {{{ this.content }}}
  
              <div class="chat__current-body-message-right">
                {{# if this.is_read }}
                  <div class="chat__current-body-message-info-box chat__current-body-message-info-box_read">
                {{/ if }}
                {{# unless this.is_read }}
                  <div class="chat__current-body-message-info-box">
                {{/ unless }}
                  <div class="chat__current-body-message-info"></div>
                  <div class="chat__current-body-message-info"></div>
                  <div class="chat__current-body-message-info"></div>
                </div>
                <div class="chat__current-body-message-time">{{{ this.time }}}</div>
              </div>
            </div>
          </div>
        {{/each}}
      </div>
    `;
  }
}

const withState = connect(state => ({ messages: state.chatActive.messages }));
export default withState(MessageItemChat);