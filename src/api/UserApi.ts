import HTTPTransport from "../framework/HTTPTransport";
import Store from "../framework/Store";
import {TProfileApi} from "../type/profile";

type TDataForm = Record<string, string>;
const baseUrl: string = 'https://ya-praktikum.tech/api/v2';

class UserApi extends HTTPTransport {
  getProfile() {
    return this.get(`${baseUrl}/auth/user`);
  }

  changeProfile(dataForm: TDataForm) {
    return this.put(`${baseUrl}/user/profile`, {data: JSON.stringify(dataForm)});
  }

  changePassword(dataForm: TDataForm) {
    return this.put(`${baseUrl}/user/password`, {data: JSON.stringify(dataForm)});
  }

  changeAvatar(dataForm: FormData) {
    return this.put(`${baseUrl}/user/profile/avatar`, {data: dataForm});
  }

  searchUser(data: TDataForm) {
    return this.post(`${baseUrl}/user/search`, {data: JSON.stringify(data)});
  }

  setProfile() {
    if (!Store.getState("profile").email) {
      return this.getProfile().then((data: TProfileApi) => {
        Store.set("profile", {
          "id": data.id,
          "email": data.email,
          "login": data.login,
          "firstName": data.first_name,
          "secondName": data.second_name,
          "displayName": data.display_name,
          "avatar": data.avatar,
          "phone": data.phone
        });
      });
    }

    return null;
  }
}

export default new UserApi();
