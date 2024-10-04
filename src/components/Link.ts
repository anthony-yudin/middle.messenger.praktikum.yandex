import Block from '../framework/Block';

interface TLink {
  href: string;
  datapage?: string;
  text?: string;
  class?: string;
  onClick?: (e: Event) => void;
  class_icon?: string;
  icon?: string;
}

export class Link extends Block {
  constructor(props: TLink) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  render(): string {
    return `
      <a href="{{ href }}" class="{{ class }}" data-page="{{ datapage }}">
        {{ text }}
      
        {{# if class_icon }}
          {{# if icon }}
            <svg class="{{ class_icon }}"><use xlink:href="#{{ icon }}" /></svg>
          {{/ if }}
        {{/ if }}
      </a>
  `;
  }
}
