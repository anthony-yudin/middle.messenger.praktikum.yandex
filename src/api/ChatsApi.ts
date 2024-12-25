import HTTPTransport from "../framework/HTTPTransport";

type TDataForm = Record<string, string>;
const baseUrl: string = 'https://ya-praktikum.tech/api/v2';

class ChatsApi extends HTTPTransport {
  getChat() {
    return this.get(`${baseUrl}/chats`);
  }

  createChat(data: TDataForm) {
    return this.post(`${baseUrl}/chats`, {data: JSON.stringify(data)});
  }

  deleteChat(data: TDataForm) {
    return this.delete(`${baseUrl}/chats`, {data: JSON.stringify(data)});
  }

  getToken(id: string) {
    return this.post(`${baseUrl}/chats/token/${id}`);
  }

  addUserChat(data: { users: number[]; chatId: number }) {
    return this.put(`${baseUrl}/chats/users`, {data: JSON.stringify(data)});
  }

  deleteUserChat(data: { users: number[]; chatId: number }) {
    return this.delete(`${baseUrl}/chats/users`, {data: JSON.stringify(data)});
  }
}

export default new ChatsApi();