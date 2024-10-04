import Block from '../../framework/Block';
import {ErrorMessage} from '../../components/ErrorMessage';

export class Error500Page extends Block {
  constructor() {
    super({
      ErrorMessage: new ErrorMessage({
        'error': '500',
        'text': 'Мы уже фиксим'
      }),
    });
  }

  render(): string {
    return `
      {{{ ErrorMessage }}}
    `;
  }
}
