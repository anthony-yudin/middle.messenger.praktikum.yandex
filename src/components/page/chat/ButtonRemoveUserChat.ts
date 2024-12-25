import Block from './../../../framework/Block';

class ButtonAddUserChat extends Block {
  constructor(props: { onClick?: (e: Event) => void }) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  render(): string {
    return `
      <div class="chat__menu-item">
        <svg class="chat__menu-item-icon">
           <use xlink:href="#delete-user" />
        </svg>
        <div class="chat__menu-item-text">Удалить пользователя</div>
      </div>
    `;
  }
}

export default ButtonAddUserChat;