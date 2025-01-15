import Router from './framework/Router';
import * as Pages from './pages/pages';
import {TPages} from "./type/pages";
import UserApi from "./api/UserApi";

export const router = new Router('.app');

export default class App {
  constructor() {
    const chatPage = Pages.ChatPage;
    const authPage = Pages.AuthPage;
    const regPage = Pages.RegPage;
    const profilePage = Pages.ProfilePage;
    const currentPath = window.location.pathname;

    router
      .use(TPages.auth, authPage)
      .use(TPages.reg, regPage)
      .use(TPages.chat, chatPage)
      .use(TPages.profile, profilePage)
      .start();

    if (currentPath === TPages.auth || currentPath === TPages.reg) {
      UserApi.setProfile()?.then(() => {
        router.go(TPages.chat);
      });
    }
  }

  render(): string {
    return '';
  }
}
