export interface IMessage {
  mid?: string;
  senderId?: string; // senderId_receiverId
  content?: string;
  date?: number;
}
