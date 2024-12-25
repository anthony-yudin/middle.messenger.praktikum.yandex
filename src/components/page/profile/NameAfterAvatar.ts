import Block, { BlockProps } from '../../../framework/Block';
import {connect} from "../../../framework/HOC";
import FormProfileItem from "./FormProfileItem";

class NameAfterAvatar extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return `<div class="profile__avatar-title">{{{ login }}}</div>`;
  }
}

const withState = connect(state => ({ login: state.profile.login }));
export default withState(NameAfterAvatar);