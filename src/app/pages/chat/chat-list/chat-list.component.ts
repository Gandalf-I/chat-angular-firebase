import {Component, OnInit} from '@angular/core';
import {ChatService} from '@core/services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  private count: number = 15;
  constructor(public chat: ChatService) {
  }

  ngOnInit(): void {
    this.chat.chatsId$ = this.chat.getChats(this.count).valueChanges();
  }

  public loadMore(): void {
    this.count += 15;
    this.chat.chatsId$ = this.chat.getChats(this.count).valueChanges();
  }



}
