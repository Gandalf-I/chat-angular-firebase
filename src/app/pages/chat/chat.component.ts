import {Component, HostListener, OnInit} from '@angular/core';
import {ChatService} from '@core/services/chat.service';
import {AppService} from '@core/services/app.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private chatS: ChatService,
              public appS: AppService) {
    chatS.activeChat$.subscribe(data => this.appS.chatSelect = data != null);
  }

  ngOnInit(): void {
    this.appS.widthWindow.subscribe(v => this.appS.visibility = v > 700);
    this.appS.widthWindow.next(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.appS.widthWindow.next(event.target.innerWidth);
  }
}
