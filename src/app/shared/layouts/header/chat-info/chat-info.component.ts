import {Component, OnInit} from '@angular/core';
import {ChatService} from '@core/services/chat.service';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit {

  public chatName: string;

  constructor(public chatS: ChatService) {
    chatS.activeChat$.subscribe(data => {
      if (data) {
        this.chatName = data.title;
      } else {
        this.chatName = null;
      }
    });

  }

  ngOnInit(): void {
  }

  deleteChat(): void {
    if (confirm('Delete chat?')) {
      console.log(this.chatS.activeChat$.getValue().cid);
      this.chatS.deleteChat(this.chatS.activeChat$.getValue().cid);
    }
  }

  exitChat(): void {
    this.chatS.activeChat$.next(null);
  }
}
