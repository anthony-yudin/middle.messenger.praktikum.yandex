import Block from '../../framework/Block';
import {Auth} from '../../components/page/auth-reg/Auth';

export class AuthPage extends Block {
  constructor() {
    super({
      Auth: new Auth(),
    });
  }

  render(): string {
    return `
      {{{ Auth }}}
    `;
  }
}
