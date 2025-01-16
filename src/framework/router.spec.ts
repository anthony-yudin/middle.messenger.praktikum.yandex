import { expect } from "chai";
import { stub } from "sinon";
import Router from './Router';
import Block from "./Block";

const root = document.createElement('div');

root.id = 'app';
document.body.appendChild(root);
const router = new Router('#app');

class Test extends Block {
  render() {
    return '<div>test</div>';
  }
}

describe('Router', () => {
  const pushStateStub = stub(window.history, 'pushState');
  const historyBackStub = stub(history, 'back');
  const historyForwardStub = stub(history, 'forward');

  before(() => {
    router
      .use('/test1', Test)
      .use('/test2', Test)
      .start();

    router.go('/');
  });

  after(() => {
    pushStateStub.restore();
  });

  it('Длина истории роутера', () => {
    router.go('/test1');
    router.go('/test2');

    expect(pushStateStub.callCount).to.equal(3);
  });

  it('"Назад" по истории роутера', () => {
    router.back();
    expect(historyBackStub.calledOnce).to.be.true;
  });

  it('"Вперед" по истории роутера', () => {
    router.forward();
    expect(historyForwardStub.calledOnce).to.be.true;
  });
});