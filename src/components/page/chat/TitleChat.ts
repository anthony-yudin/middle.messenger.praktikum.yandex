import Block from './../../../framework/Block';
import {connect} from "../../../framework/HOC";
import Store from "../../../framework/Store";

class TitleChat extends Block {
  constructor() {
    super({
      title: Store.getState("chatActive").title,
    });
  }

  render(): string {
    return `<div>{{{ title }}}</div>`;
  }
}

const withState = connect(state => ({ title: state.chatActive?.title }));
export default withState(TitleChat);
