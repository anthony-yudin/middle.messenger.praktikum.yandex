import Block, {BlockProps} from './Block';
import sinon from 'sinon';
import { expect } from "chai";

describe('Block', () => {
  let PageComponent: any;

  before(() => {
    class Page extends Block {
      constructor(props: BlockProps) {
        super({ ...props })
      }

      render() {
        return `
          <div>
            <span id="test-text">{{text}}</span>
            <button>{{text-button}}</button>
          </div>
        `
      }
    }

    PageComponent = Page;
  })

  // написать тест на то что компонент создается с переданными пропсами
  it('Должен создать компонент с состоянием из конструктора', () => {
    const text = 'Hello';

    const pageComponent = new PageComponent({text});

    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  // проверить что реактивность у компонента работает
  it('Компонент должен иметь реактивное поведение', () => {
    const newValue = 'New value';

    const pageComponent = new PageComponent({text: "Hello"});

    pageComponent.setProps({text: newValue})
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(newValue);
  });

  // проверить что компонент навешивает события
  it('Компонент должен установить события на элемент', () => {
    const clickhadnlerStub = sinon.stub();
    const pageComponent = new PageComponent({
      events: {
        click: clickhadnlerStub
      }
    });

    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);

    expect(clickhadnlerStub.calledOnce).to.be.true;
  })
})
