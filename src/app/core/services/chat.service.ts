import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {IChat} from '@shared/interfaces/chat';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public activeChat$: BehaviorSubject<IChat> = new BehaviorSubject(null);
  public chatsId$: Observable<IChat[]>;
  public subscribeNewMessages: Subscription;

  constructor(private db: AngularFireDatabase) {
  }

  public setActiveChat(dialog: IChat): void {
    this.subscribeNewMessages?.unsubscribe();
    this.activeChat$.next(dialog);
  }

  public getChats(count: number): AngularFireList<IChat> {
    return this.db.list(`chats`, ref => ref.limitToLast(count));
  }

  public searchChat(title: string): void {
    this.chatsId$ = this.db.list(`chats`,
      ref => ref.orderByChild('title')
        .startAt(title)
        .endAt(title + '\uf8ff')
        .limitToLast(15)).valueChanges();
  }

  public createChat(titleChat: string): void {
    const chatId = this.db.createPushId();
    this.db.list(`chats`).set(chatId, {cid: chatId, title: titleChat});
  }

  public deleteChat(cid: string): void {
    this.db.list(`chats/${cid}`).remove()
      .then(() => this.activeChat$.next(null));
    this.db.list(`messages/${cid}`).remove();
  }

  // public getUserChatsId(): AngularFireList<string[]> {
  //   return this.db.list(`user${this.auth.uid}/chats`, ref => ref.limitToLast(15));
  // }
  //
  // public getMoreUserChatsId(cid: string): AngularFireList<string[]> {
  //   return this.db.list(`user${this.auth.uid}/chats`,
  //     ref => ref.orderByChild('cid').endAt(cid).limitToLast(15));
  // }databaseReference.orderByChild('_searchLastName')
  //                  .startAt(queryText)
  //                  .endAt(queryText+"\uf8ff")


}
