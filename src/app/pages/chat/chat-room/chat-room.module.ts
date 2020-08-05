import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatRoomComponent} from '@pages/chat/chat-room/chat-room.component';
import {PanelComponent} from '@pages/chat/chat-room/panel/panel.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MessagesModule} from '@pages/chat/chat-room/messages/messages.module';

@NgModule({
  declarations: [
    ChatRoomComponent,
    PanelComponent,
  ],
  exports: [
    ChatRoomComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    ScrollingModule,
    TextFieldModule,
    MessagesModule
  ]
})
export class ChatRoomModule {
}
