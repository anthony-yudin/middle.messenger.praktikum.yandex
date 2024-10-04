import Block from '../framework/Block';

type TButton = {
  class: string;
  text?: string;
  class_icon?: string;
  icon?: string;
  disabled?: string,
  onClick?: (e: Event) => void;
}

export class Button extends Block {
  constructor(props: TButton) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  render(): string {
    return `
      <button class="{{ class }}" type="submit"
        {{# if disabled }}
          disabled
        {{/ if }}>
        
        {{# if class_icon }}
          {{# if icon }}
            <svg class="{{ class_icon }}"><use xlink:href="#{{ icon }}" /></svg>
          {{/ if }}
        {{/ if }}
        {{ text }}
      </button>
    `;
  }
}
