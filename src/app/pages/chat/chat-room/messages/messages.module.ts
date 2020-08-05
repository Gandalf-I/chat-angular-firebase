import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesComponent} from './messages.component';
import {MessageComponent} from './message/message.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    MessagesComponent,
    MessageComponent
  ],
  exports: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    ScrollingModule
  ]
})
export class MessagesModule { }
