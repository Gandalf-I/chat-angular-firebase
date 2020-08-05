import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '@core/services/chat.service';
import {IChat} from '@shared/interfaces/chat';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  @Input() chat: IChat;
  public chatActive: boolean = false;

  constructor(public chatS: ChatService) {
  }

  ngOnInit(): void {
    this.chatS.activeChat$.subscribe(data => {

      if (data) {
        this.chatActive = this.chat.cid === data.cid;
      } else {
        this.chatActive = false;
      }
    });
  }

}
