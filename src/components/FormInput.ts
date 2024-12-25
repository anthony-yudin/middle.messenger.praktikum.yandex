import Block from '../framework/Block';
import {TInput} from "../type/form";
import {connect} from "../framework/HOC";
import Store from "../framework/Store";

class FormInput extends Block {
  constructor(props: TInput) {
    super({
      ...props,
      events: {
        blur: () => props.onBlur && props.onBlur(),
      },
    });
  }

  render(): string {
    return `
      <input type="{{ type }}" class="{{ class }}" name="{{ name }}" id="{{ name }}"
        {{# if disabled }}
          disabled
        {{/ if }}
        {{# if value }}
          value="{{ value }}"
        {{/ if }}
      >`;
  }
}

const withUser = connect(state => ({ state: state }));
export default FormInput;