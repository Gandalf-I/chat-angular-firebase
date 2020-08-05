import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatListComponent} from '@pages/chat/chat-list/chat-list.component';
import {ChatBoxComponent} from './chat-box/chat-box.component';
import {SearchComponent} from './search/search.component';
import {CreateChatComponent} from './create-chat/create-chat.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';


@NgModule({
  declarations: [ChatListComponent, ChatBoxComponent, SearchComponent, CreateChatComponent],
  exports: [
    ChatListComponent,
    CreateChatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    InfiniteScrollModule
  ]
})
export class ChatListModule {
}
