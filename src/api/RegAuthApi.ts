import HTTPTransport from "../framework/HTTPTransport";

type TDataForm = Record<string, string>;
const baseUrl: string = 'https://ya-praktikum.tech/api/v2';

class RegAuthApi extends HTTPTransport {
  regApi(dataForm: TDataForm) {
    return this.post(`${baseUrl}/auth/signup`, {data: JSON.stringify(dataForm)});
  }

  authApi(dataForm: TDataForm) {
    return this.post(`${baseUrl}/auth/signin`, {data: JSON.stringify(dataForm)});
  }

  logout() {
    return this.post(`${baseUrl}/auth/logout`);
  }
}

export default new RegAuthApi();
