export type TChat = {
  "token"?: string;
  "id": string;
  "title": string;
  "avatar"?: string | undefined;
  "time"?: string | null,
  "unread_count"?: number,
  "last_message"?: string | null,
  "login"?: string | undefined,
  "onClick"?: (e: Event) => void;
  "messages": never[] | [],
  "myMessage"?: boolean,
}

type TLastMessage = {
  "user": {
    "login": string
  },
  "content": string
  "time": Date,
  "avatar": string;
}

export type TChatApi = {
  "id": string;
  "title": string;
  "unread_count": number,
  "last_message": TLastMessage | null
}

export type TMessageApi = {
  "myMessage": boolean;
  "chat_id": number;
  "content": string;
  "file"?: null | string;
  "is_read": boolean;
  "time": Date | string;
  "type": string;
  "user_id": number;
}