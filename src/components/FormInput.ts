import Block from '../framework/Block';
import {TInput} from "../type/form";

export class FormInput extends Block {
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
