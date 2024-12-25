import Block, { BlockProps } from "./Block";
import Store from "./Store";

export enum StoreEvents {
  Updated = 'updated',
}

type Indexed<T = any> = {
  [key in string]: T;
};

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject | [], rhs: PlainObject | []) {
  // Сравнение количества ключей объектов и массивов
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];

    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      // Здесь value и rightValue может быть только массивом или объектом
      // И TypeScript это обрабатывает
      if (isEqual(value, rightValue)) {
        continue;
      }

      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: BlockProps | undefined) {
        // сохраняем начальное состояние
        let state = mapStateToProps(Store.getState());

        super({...props, ...state});

        // подписываемся на событие
        Store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(Store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({...newState});
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    }
  }
}
