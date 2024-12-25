import Block, { BlockProps } from '../../../framework/Block';
import {connect} from "../../../framework/HOC";

class Avatar extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return `
      <div>
        {{# if avatar }}
          <img src="https://ya-praktikum.tech/api/v2/resources/{{{ avatar }}}" class="profile__avatar-img">
        {{else}}
          <div class="profile__avatar-img">
            <svg class="profile__avatar-img-icon"><use xlink:href="#mask-avatar"></svg>
          </div>
        {{/ if }}
      </div>
    `;
  }
}

const withState = connect(state => ({ avatar: state.profile.avatar }));
export default withState(Avatar);
