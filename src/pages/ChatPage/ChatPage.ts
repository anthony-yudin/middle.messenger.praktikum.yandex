import Block from '../../framework/Block';
import {Chat} from '../../components/Chat';

export class ChatPage extends Block {
  constructor() {
    super({
      Chat: new Chat(),
    });
  }

  render(): string {
    return `
      {{{ Chat }}}
    `;
  }
}
