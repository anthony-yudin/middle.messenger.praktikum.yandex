import Store from "../framework/Store";
import {TInput} from "../type/form";

const profileState = Store.getState("profile");

export default function setProfileForm(): TInput[] {
  return [
    {
      "name_ru": "Почта",
      "name": "email",
      "type": "text",
      "disabled": true,
      "value": profileState.email
    },
    {
      "name_ru": "Логин",
      "name": "login",
      "type": "text",
      "disabled": true,
      "value": profileState.login
    },
    {
      "name_ru": "Имя",
      "name": "first_name",
      "type": "text",
      "disabled": true,
      "value": profileState.firstName
    },
    {
      "name_ru": "Фамилия",
      "name": "second_name",
      "type": "text",
      "disabled": true,
      "value": profileState.secondName
    },
    {
      "name_ru": "Имя в чате",
      "name": "display_name",
      "type": "text",
      "disabled": true,
      "value": profileState.login
    },
    {
      "name_ru": "Телефон",
      "name": "phone",
      "type": "phone",
      "disabled": true,
      "value": profileState.phone
    },
  ];
}
