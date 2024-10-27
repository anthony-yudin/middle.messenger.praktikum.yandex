import Block from '../../framework/Block';
import { Profile } from '../../components/page/profile/Profile';

export class ProfilePage extends Block {
  constructor() {
    super({
      Profile: new Profile(),
    });
  }

  render(): string {
    return `
      {{{ Profile }}}
    `;
  }
}
