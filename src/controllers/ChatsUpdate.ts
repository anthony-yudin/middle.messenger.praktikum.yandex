import {TChat, TChatApi} from "../type/chat";
import {ListChats} from "../components/page/chat/ListChats";
import Store from "../framework/Store";
import ChatsApi from "../api/ChatsApi";
import connectSocket from "./connectSocket";
import MessageItemChatTest from "../components/page/chat/MessageItemChatTest";
import {setDate} from "../utils/setDate";
import {setViewChatActive, thisChat} from "../components/page/chat/Chat";

export default class ChatsUpdate {
  static getChatDataAndOpenSocket() {
    if (!Store.getState("chats").length) {
      ChatsApi.getChat().then((data: TChatApi[]) => {
        const chats: Record<string, TChat> = {};
        const promises: Promise<unknown>[] = [];

        data.forEach((itemData: TChatApi) => {
          promises.push(
            ChatsApi.getToken(itemData.id).then((data: { token: string; }) => {
              let time!: { day: string; hour: string; minute: string; };
              const userId: string = String(Store.getState("profile").id);
              const tokenData = data.token;
              const chatId = itemData.id;

              if (itemData?.last_message?.time) {
                time = setDate(itemData?.last_message?.time);
              }

              chats[`'${chatId}'`] = {
                "token": tokenData,
                "id": chatId,
                "title": itemData.title,
                "messages": [],
                "avatar": itemData?.last_message?.avatar,
                "time": time && time.hour && time.minute ? `${time.hour}:${time.minute}` : null,
                "unread_count": itemData.unread_count,
                "last_message": itemData?.last_message?.content || null,
                "login": itemData?.last_message?.user.login,
                "myMessage": itemData?.last_message?.user.login === Store.getState("profile").login,
              };

              connectSocket(userId, tokenData, chatId);
            })
          )
        });

        Promise.all(promises).then(() => {
          Store.set("chats", chats);
        });
      });
    }
  }

  static setChatActive(event: Event, itemChat: TChat, fnView: (event?: Event) => void) {
    fnView(event);

    if (!itemChat.token) {
      ChatsApi.getToken(itemChat.id).then((data: { token: string; }) => {
        const currentChatState = Store.getState("chats");

        currentChatState[`'${itemChat.id}'`] = { ...currentChatState[`'${itemChat.id}'`], 'token': data.token }
        Store.set("chats", currentChatState);
        this.updateChatsMessages();

        connectSocket(String(Store.getState("profile").id), data.token, itemChat.id, true);
        console.log(Store.getState("chats")[`'${itemChat.id}'`], '22222222222111');
      });
    }

    Store.set("chatActive", Store.getState("chats")[`'${itemChat.id}'`])
    this.updateChatsMessages();
  }

  static updateChatsList() {
    thisChat.setLists({
      ListChats: Object.values(Store.getState("chats")).map((item: TChat) => new ListChats({
        ...item,
        onClick: (event: Event) => this.setChatActive(event, item, setViewChatActive),
      }))
    });
  }

  static updateChatsMessages() {
    if (Store.getState("chatActive")?.messages) {
      thisChat.children.MessageChat.setProps({ isChatActive: true })

      thisChat.children.MessageChat.setLists({
        MessageItemChatTest: Store.getState("chatActive")?.messages?.map((item: TChat) => new MessageItemChatTest({
          ...item,
        })),
      });
    } else {
      thisChat.children.MessageChat.setLists({
        MessageItemChatTest: []
      });
    }
  }
}
