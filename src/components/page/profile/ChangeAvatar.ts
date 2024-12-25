import Block from '../../../framework/Block';

class ChangeAvatar extends Block {
  constructor(props: { onClick?: (e: Event) => void }) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  render(): string {
    return `<div class="profile__avatar-img-text">Поменять аватар</div>`;
  }
}
export default ChangeAvatar;
