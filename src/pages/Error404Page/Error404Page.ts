import Block from '../../framework/Block';
import {ErrorMessage} from '../../components/ErrorMessage';

export class Error404Page extends Block {
  constructor() {
    super({
      ErrorMessage: new ErrorMessage({
        'error': '404',
        'text': 'Не туда попали'
      }),
    });
  }

  render(): string {
    return `
      {{{ ErrorMessage }}}
    `;
  }
}
