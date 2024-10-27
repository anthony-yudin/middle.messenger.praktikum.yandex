import * as Pages from './pages/pages';

interface TAppState {
  currentPage: string;
}

export default class App {
  private state: TAppState;
  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: 'profile',
    };

    this.appElement = document.querySelector('.app');
  }

  render() {
    if (this.appElement) {
      this.appElement.innerHTML = '';
    }

    switch (this.state.currentPage) {
      case 'chat': {
        const chat = new Pages.ChatPage();

        if (this.appElement) {
          this.appElement.append(chat.getContent());
        }

        break;
      }
      case 'auth': {
        const auth = new Pages.AuthPage();

        if (this.appElement) {
          this.appElement.append(auth.getContent());
        }

        break;
      }
      case 'reg': {
        const reg = new Pages.RegPage();

        if (this.appElement) {
          this.appElement.append(reg.getContent());
        }

        break;
      }
      case 'profile': {
        const profile = new Pages.ProfilePage();

        if (this.appElement) {
          this.appElement.append(profile.getContent());
        }

        break;
      }
      case 'error404': {
        const error404 = new Pages.Error404Page();

        if (this.appElement) {
          this.appElement.append(error404.getContent());
        }

        break;
      }
      case 'error500': {
        const error500 = new Pages.Error500Page();

        if (this.appElement) {
          this.appElement.append(error500.getContent());
        }

        break;
      }
    }

    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.appElement && !document.querySelector('.navigation')) {
      document.body.insertAdjacentHTML(<"afterbegin" | "afterend" | "beforebegin" | "beforeend">'beforeend',
        `
            <nav class="navigation">
              <ul class="navigation__box">
                <li class="navigation__item">
                  <a href="#" data-page="auth">Авторизация</a>
                </li>
                <li class="navigation__item">
                  <a href="#" data-page="reg">Регистрация</a>
                </li>
                <li class="navigation__item">
                  <a href="#" data-page="error404">404</a>
                </li>
                <li class="navigation__item">
                  <a href="#" data-page="error500">500</a>
                </li>
                <li class="navigation__item">
                  <a href="#" data-page="chat">Чат</a>
                </li>
              </ul>
            </nav>
          `
      );
    }

    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e: MouseEvent) => {
        const targetElement = e.target as HTMLElement;
        e.preventDefault();

        if (targetElement) {
          this.changePage(targetElement?.getAttribute('data-page'));
        }
      });
    })
  }

  changePage(page: string | null | undefined) {
    if (page) {
      this.state.currentPage = page;
      this.render();
    }
  }
}
