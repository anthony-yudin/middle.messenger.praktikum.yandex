import Router from './framework/Router';
import * as Pages from './pages/pages';
import {TPages} from "./type/pages";

export const router = new Router('.app');

export default class App {
  constructor() {
    const chatPage = Pages.ChatPage;
    const authPage = Pages.AuthPage;
    const regPage = Pages.RegPage;
    const profilePage = Pages.ProfilePage;

    router
      .use(TPages.auth, authPage)
      .use(TPages.reg, regPage)
      .use(TPages.chat, chatPage)
      .use(TPages.profile, profilePage)
      .start();
  }

  render(): string {
    return '';
  }
}
