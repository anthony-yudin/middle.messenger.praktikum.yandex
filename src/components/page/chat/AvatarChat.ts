import Block from './../../../framework/Block';
import {connect} from "../../../framework/HOC";
import Store from "../../../framework/Store";

class AvatarChat extends Block {
  constructor() {
    super({
      avatar: Store.getState("chatActive").avatar,
    });
  }

  render(): string {
    return `
      <div>
        {{# if avatar }}
          <img src="https://ya-praktikum.tech/api/v2/resources/{{{ avatar }}}" class="chat__avatar chat__current-header-avatar">
        {{else}}
          <div class="chat__avatar chat__current-header-avatar"></div>
        {{/ if }}
      </div>
    `;
  }
}

const withState = connect(state => ({ avatar: state.chatActive?.avatar }));
export default withState(AvatarChat);