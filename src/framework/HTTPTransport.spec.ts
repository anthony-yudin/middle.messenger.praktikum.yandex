import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';

const baseUrl: string = 'https://ya-praktikum.tech/api/v2';

describe('HTTPTransport', () => {
  it('"Cookie is not valid" при попытке получить данные о пользователе будучи неавторизованным', async () => {
    const http = new HTTPTransport();

    await http.get(`${baseUrl}/auth/user`, {}).catch((error) => {
      expect(error).to.equal("Cookie is not valid");
    });
  });

  it('"Login is empty, but required" при авторизации из-за неверных данных', async () => {
    const http = new HTTPTransport();

    await http.post(`${baseUrl}/auth/signin`, {}).catch((error) => {
      expect(error).to.equal("login is empty, but required");
    });
  });
});
