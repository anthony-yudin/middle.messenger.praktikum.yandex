import Block from '../framework/Block';
import {Link} from "./Link";

type TErrorMessage = {
  'error': string;
  'text': string;
}

export class ErrorMessage extends Block {
  constructor(props: TErrorMessage) {
    super({
      ...props,
      LinkBack: new Link({
        href: '#',
        datapage: 'chat',
        class: 'error-page__link',
        text: 'Назад к чатам',
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();
        },
      }),
    });
  }

  render(): string {
    return `
      <main class="error-page">
        <div class="error-page__box">
          <div class="error-page__title">{{ error }}</div>
          <div class="error-page__desc">{{ text }}</div>

          {{{ LinkBack }}}
        </div>
      </main>
    `;
  }
}
