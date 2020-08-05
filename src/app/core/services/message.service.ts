import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {IMessage} from '@shared/interfaces/message';
import {AuthService} from '@core/services/auth.service';
import {BehaviorSubject} from 'rxjs';
import {ChatService} from '@core/services/chat.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public message: IMessage = {};
  public messages: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);

  constructor(private db: AngularFireDatabase,
              private auth: AuthService,
              public chat: ChatService) {
  }


  public sendMessage(content: string): void {
    this.message.mid = this.db.createPushId();
    this.message.senderId = this.auth.uid;
    this.message.content = content;
    this.message.date = Date.now();
    this.messages.next([...this.messages.getValue(), {...this.message}]);
    this.db.list(`messages/${this.chat.activeChat$.getValue().cid}`).set(this.message.mid, this.message);
  }

  public getNewMessages(): AngularFireList<IMessage> {
    return this.db.list(`messages/${this.chat.activeChat$.getValue().cid}`, ref => ref.limitToLast(1));
  }

  public getMoreMessages(mid: string): AngularFireList<IMessage> {
    return this.db.list(`messages/${this.chat.activeChat$.getValue().cid}`,
      ref => ref.orderByChild('mid').endAt(mid).limitToLast(20));
  }
}
