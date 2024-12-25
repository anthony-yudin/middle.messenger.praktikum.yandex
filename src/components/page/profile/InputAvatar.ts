import Block from '../../../framework/Block';

class InputAvatar extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        change: (e: Event) => props.onChange && props.onChange(e),
      },
    });
  }

  render(): string {
    return `<input id="avatar" type="file" name="avatar" accept="image/*" class="profile__avatar-img-input">`;
  }
}
export default InputAvatar;