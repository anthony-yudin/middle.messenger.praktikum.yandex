import Store from "./../framework/Store";
import SocketApi from "./../api/SocketApi";
import {setDate} from "../utils/setDate";
import ChatsUpdate from "./ChatsUpdate";
import {TChat, TMessageApi} from "../type/chat";

export default function connectSocket(userId: string, token: string | null, chatId: string | null, newConnect: boolean = false) {
  if (userId && token && chatId) {
    const socket = SocketApi.connect(userId, token, chatId);

    socket.addEventListener('open', () => {
      const chats = Store.getState("chats");

      chats[`'${chatId}'`] = {"socket": socket, ...Store.getState("chats")[`'${chatId}'`]};
      Store.set("chats", chats);

      if (newConnect) {
        Store.set("chatActive", Store.getState("chats")[`'${chatId}'`])
      }

      socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    });

    socket.addEventListener('message', (event: MessageEvent & {
      srcElement: { url: string }
    }) => {
      const messages = JSON.parse(event.data);

      if (messages?.content || messages[0]?.content) {
        const storeChats = Store.getState("chats");
        let chatId = 0;
        const arrMessages: TMessageApi[] = [];

        if (messages?.length > 1) {
          messages.reverse().forEach((itemMessage: TMessageApi) => {
            const time = setDate(itemMessage.time);

            if (itemMessage.user_id === Store.getState("profile").id) {
              itemMessage = { ...itemMessage, 'myMessage': true }
            }

            itemMessage = { ...itemMessage, 'time': `${time.hour}:${time.minute}`  }
            arrMessages.push(itemMessage);
            chatId = itemMessage.chat_id;
          });

          if (storeChats[`'${chatId}'`]) {
            storeChats[`'${chatId}'`]['messages'].push(...arrMessages);
          }

          Store.set("chats", storeChats);
        } else if (messages[0]?.content || messages?.content) {
          const messageSingle = messages[0] || messages;

          Object.values(Store.getState("chats")).some((itemChat: TChat) => {
            if (event?.srcElement?.url?.includes(itemChat.id)) {
              if (messageSingle.time) {
                const time: { day: string; hour: string; minute: string; } = setDate(messageSingle.time);

                messageSingle.time = time && time.hour && time.minute ? `${time.hour}:${time.minute}` : null;
              }

              storeChats[`'${itemChat.id}'`]['last_message'] = messageSingle.content;

              if (Number(userId) !== messageSingle.user_id) {
                storeChats[`'${itemChat.id}'`]['unread_count'] += 1;
              } else {
                messageSingle.myMessage = true;
                storeChats[`'${itemChat.id}'`]['myMessage'] = true;
              }

              storeChats[`'${itemChat.id}'`]['messages'].push(messageSingle);
              Store.set("chats", storeChats);
            }

            ChatsUpdate.updateChatsMessages();
          });
        }
      }

      ChatsUpdate.updateChatsList();
    });

    socket.addEventListener('error', (event: ErrorEvent) => {
      console.log('Ошибка', event.message);
    });
  }
}