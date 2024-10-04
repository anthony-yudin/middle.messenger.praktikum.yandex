import Block from '../../framework/Block';
import {Reg} from '../../components/page/auth-reg/Reg';

export class RegPage extends Block {
  constructor() {
    super({
      Reg: new Reg(),
    });
  }

  render(): string {
    return `
      {{{ Reg }}}
    `;
  }
}
