import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from '@pages/chat/chat.component';
import {ChatRoomModule} from '@pages/chat/chat-room/chat-room.module';
import {ChatListModule} from '@pages/chat/chat-list/chat-list.module';
import {HeaderModule} from '@shared/layouts/header/header.module';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ChatRoomModule,
    ChatListModule,
    HeaderModule
  ]
})
export class ChatModule {
}
