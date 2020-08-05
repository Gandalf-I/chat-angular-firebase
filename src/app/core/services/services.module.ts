import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from './auth.service';
import {MessageService} from '@core/services/message.service';
import {ChatService} from '@core/services/chat.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    MessageService,
    ChatService
  ],
})
export class ServicesModule {
}
