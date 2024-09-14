import Handlebars from 'handlebars';
import * as Pages from './pages/pages.js';
import {auth, chats, reg} from './mockData.js';

// Register partials
import ErrorMessage from './components/ErrorMessage.js';
import Button from './components/Button.js';
import Link from './components/Link.js';
import FormItem from './components/FormItem.js';

Handlebars.registerPartial('ErrorMessage', ErrorMessage);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('FormItem', FormItem);

export default class App {
  constructor() {
    this.state = {
      currentPage: 'reg',
      chats,
      reg,
      auth
    };
    this.appElement = document.getElementById('app');
  }

  render() {
    let template;

    switch (this.state.currentPage) {
      case 'reg':
        template = Handlebars.compile(Pages.Reg);
        this.appElement.innerHTML = template({
          data: this.state.reg,
        });
        break;
      case 'auth':
        template = Handlebars.compile(Pages.Auth);
        this.appElement.innerHTML = template({
          data: this.state.auth,
        });
        break;
      case 'chat':
        template = Handlebars.compile(Pages.Chat);
        this.appElement.innerHTML = template({
          chats: this.state.chats,
        });
        break;
      case 'profile':
        template = Handlebars.compile(Pages.Profile);
        this.appElement.innerHTML = template({
          chats: this.state.chats,
        });
        break;
      case 'error404':
        template = Handlebars.compile(Pages.error404);
        this.appElement.innerHTML = template({});
        break;
      case 'error500':
        template = Handlebars.compile(Pages.error500);
        this.appElement.innerHTML = template({});
        break;
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    const footerLinks = document.querySelectorAll('a');

    footerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    });
  }

  changePage(page) {
    this.state.currentPage = page;
    this.render();
  }
}
