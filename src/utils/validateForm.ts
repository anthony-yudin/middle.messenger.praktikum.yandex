export function validateForm(elItem: HTMLElement, sItem: string) {
  const sError: string = `${sItem}-error`;
  const elInput: HTMLInputElement | HTMLTextAreaElement | null = elItem?.querySelector('input') || elItem.querySelector('textarea');
  const elForm: HTMLFormElement | null | undefined = elInput?.closest('form');
  const elError: HTMLElement | null = elItem.querySelector(`.${sError}`);
  let value: string | undefined = elInput?.value;
  const regSpaces = /\s/g; // есть ли пробелы
  // есть ли пробелы
  const regNumbers = /[0-9]/g; // есть ли цифры
  const regChar = /[!;:@#$%^&*()_]/g; // есть ли спецсимволы
  const regCyrillic = /[А-яёЁ]/g; // есть ли кириллица
  const regLatin = /[A-z]/g; // есть ли латиница
  const regEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim; // email
  const messageErrorInputEmpty = 'Поле не должно быть пустым';

  function setError(messageError: string) {
    if (elError) {
      elError.textContent = messageError;
    }

    elItem.classList.add(`${sItem}_error`);
  }

  function deleteError() {
    if (elError) {
      elError.textContent = '';
    }

    elItem.classList.remove(`${sItem}_error`);
  }

  function checkNameUser(elInput: HTMLInputElement | HTMLTextAreaElement) {
    if (value) {
      // Не должно быть пробелов, цифр, спецсимволов ! @ # $ % ^ & * () _',
      value = value.replace(regSpaces, '').replace(regNumbers, '').replace(regChar, '');
      // Должно начинаться с заглавной буквы
      elInput.value = value[0].toUpperCase() + value.slice(1);

      deleteError();
    } else {
      setError(messageErrorInputEmpty);
    }
  }

  switch (elInput?.getAttribute('name')) {
    case 'first_name':
      checkNameUser(elInput);

      break;
    case 'second_name':
      checkNameUser(elInput);

      break;

    case 'login':
      if (value) {
        const isSpecCharExceptUnderscore = !regChar.test(value) || !!value.match(regChar)?.every(item => item === '_');

        if (regLatin.test(value) && (value.length > 2 && value.length < 21) && isSpecCharExceptUnderscore) {
          elInput.value = value.replace(regCyrillic, '');
          deleteError();
        } else if (value.length <= 2) {
          setError('Логин должен состоять как минимум из 3 символов');
        } else if (value.length >= 21) {
          setError('Логин не может превышать 20 символов');
        } else if (!isSpecCharExceptUnderscore) {
          setError('Логин не может содержать спецсимволы: ! @ # $ % ^ & * () _\',');
        }
      } else {
        setError(messageErrorInputEmpty);
      }

      break;

    case 'email':
      if (value && regEmail.test(value)) {
        deleteError();
      } else {
        setError('Неверный формат email адреса');
      }

      break;

    case 'password':
      if (value) {
        const arrValue = [...value];
        const isNumber = arrValue.some(item => typeof Number(item) === 'number' && !isNaN(Number(item)));
        const isUpperCaseChar = arrValue.some(item => item.toUpperCase() === item && isNaN(Number(item)));
        const elsInputPassword: NodeListOf<HTMLInputElement> | undefined = elForm?.querySelectorAll('[type=password]');
        const valuePasswordRepeat: string | null = elsInputPassword ? elsInputPassword[1]?.value : null;

        if (value.length > 7 && value.length < 41 && isNumber && isUpperCaseChar) {
          deleteError();
        } else if (value.length <= 7) {
          setError('Пароль должен состоять как минимум из 7 символов');
        } else if (value.length >= 41) {
          setError('Пароль не может превышать 40 символов');
        } else if (!isNumber && !isUpperCaseChar) {
          setError('Пароль должен содержать как минимум 1 цифру и 1 заглавную букву');
        } else if (!isNumber) {
          setError('Пароль должен содержать как минимум 1 цифру');
        } else if (!isUpperCaseChar) {
          setError('Пароль должен содержать как минимум 1 заглавную букву');
        } else if (!isUpperCaseChar) {
          setError('Пароль должен содержать как минимум 1 заглавную букву');
        }

        // Если отредактировано первое поле с паролем и теперь оно совпадает со вторым,
        // удаляем из второго поля ошибку не совпадения пароля
        if (elsInputPassword && valuePasswordRepeat && value === valuePasswordRepeat) {
          const elItemPasswordRepeat: HTMLElement | null = elsInputPassword[1]?.closest(`.${sItem}`);
          const elErrorPasswordRepeat: HTMLElement | null | undefined = elItemPasswordRepeat?.querySelector(`.${sError}`);

          if (elErrorPasswordRepeat) {
            elErrorPasswordRepeat.textContent = '';
            elErrorPasswordRepeat.classList.remove(`${sError}_active`);
          }
        }
        //
      } else {
        setError(messageErrorInputEmpty);
      }

      break;

    case 'password_repeat':
      const elInputPassword: HTMLInputElement | null | undefined = elForm?.querySelector('[type=password]');
      const valuePassword: string | undefined = elInputPassword?.value;

      if (valuePassword && valuePassword === value) {
        deleteError();
      } else {
        setError('Пароли не совпадают');
      }

      break;

    case 'phone':
      value = value?.replace(regCyrillic, '').replace(regLatin, '');

      if (value) {
        elInput.value = value;

        if (value.length > 9 && value.length < 15) {
          deleteError();
        } else if (value.length <= 9) {
          setError('Номер телефона должен состоять как минимум из 9 символов');
        } else if (value.length >= 15) {
          setError('Номер телефона не может превышать 15 символов');
        }
      } else {
        setError(messageErrorInputEmpty);
      }

      break;

    case 'message':
      if (value?.length) {
        deleteError();
      } else {
        setError(messageErrorInputEmpty);
      }

      break;
  }
}
