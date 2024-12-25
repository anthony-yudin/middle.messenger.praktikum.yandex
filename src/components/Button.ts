import Block from '../framework/Block';

type TButton = {
  class: string;
  text?: string;
  class_icon?: string;
  class_inner?: string,
  text_inner?: string,
  icon?: string;
  disabled?: string,
  onClick?: (e: Event) => void;
}

class Button extends Block {
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
        
        {{# if class_inner }}
          <span class="{{ class_inner }}">
            {{# if text_inner }}{{ text_inner }}{{/ if }}
          </span>
        {{/ if }}
        
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

// const withUser = connect(state => ({ text: state.button }));
// export default withUser(Button);

export default Button;