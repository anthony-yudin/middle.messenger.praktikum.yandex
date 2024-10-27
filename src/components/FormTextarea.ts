import Block from '../framework/Block';
import {TFormTextarea} from '../type/form';

export class FormTextarea extends Block {
  constructor(props: TFormTextarea) {
    super({
      ...props,
      events: {
        blur: () => props.onBlur && props.onBlur(),
      },
    });
  }

  render(): string {
    return `<textarea class="{{ class }}" placeholder="{{ placeholder }}" name="{{ name }}"></textarea></div>`;
  }
}
