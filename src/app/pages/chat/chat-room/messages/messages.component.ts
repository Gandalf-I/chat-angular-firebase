import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '@core/services/message.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IMessage} from '@shared/interfaces/message';
import {map, take} from 'rxjs/operators';
import {ChatService} from '@core/services/chat.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @ViewChild('scrollMe', {static: false})
  messagesContainer: ElementRef<HTMLDivElement>;
  public messages: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  private fromBottom: number;

  constructor(private chat: ChatService,
              public messageS: MessageService) {

  }

  ngOnInit(): void {
    this.chat.activeChat$.subscribe(v => {
      if (v) {
        this.messages.next([]);
        this.chat.subscribeNewMessages = this.getNewMessage();
      }
    });
  }


  public getNewMessage(): Subscription {
    return this.messageS.getNewMessages().snapshotChanges().pipe(
      map(message => {
        const newMessages = message.map(snap => {
          return {mid: snap.payload.key, ...snap.payload.val()};
        });
        this.messages.next([...this.messages.getValue(), ...newMessages]);

      })
    ).subscribe(() => {
      if (this.messages.value.length === 1) {
        this.getMoreMessage();
        this.scrollIntoNewMessages(300);
      }
      this.scrollIntoNewMessages();
    });
  }

  public getMoreMessage(): void {
    this.messageS.getMoreMessages(this.messages.getValue()[0].mid).snapshotChanges().pipe(
      map(message => {
        const newMessages = message.map(snap => {
          return {mid: snap.payload.key, ...snap.payload.val()};
        });
        const {nativeElement} = this.messagesContainer;
        this.fromBottom = nativeElement.scrollHeight - nativeElement.scrollTop;
        newMessages.pop();
        this.messages.next([...newMessages, ...this.messages.getValue()]);

      }),
      take(1)
    ).subscribe(() => {
      this.scrollIntoView();
    });
  }


  public scrollIntoNewMessages(stop?: number): void {
    if (this.messagesContainer) {
      setTimeout(() => {
        const {nativeElement} = this.messagesContainer;
        nativeElement.scrollTop = nativeElement.scrollHeight;
      }, stop);
    }

  }

  public scrollIntoView(): void {
    if (this.messagesContainer) {
      setTimeout(() => {
        const {nativeElement} = this.messagesContainer;
        nativeElement.scrollTop = nativeElement.scrollHeight - this.fromBottom;
      });
    }

  }
}
