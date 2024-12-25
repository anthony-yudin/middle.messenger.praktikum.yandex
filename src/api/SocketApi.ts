import HTTPTransport from "../framework/HTTPTransport";

class SocketApi extends HTTPTransport {
  connect(userId: string, token: string, chatId: string) {
    return new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
  }

  send(socket: WebSocket, content: string) {
    socket.send(JSON.stringify({
      content: content,
      type: 'message',
    }));
  }

  close(socket: WebSocket) {
    socket.addEventListener('close', (event: CloseEvent) => {
      console.log(event.wasClean, event.code, event.reason, 'event.wasClean');

      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
  }
}

export default new SocketApi();
