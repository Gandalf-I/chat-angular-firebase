import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { FirstSplitComponent } from './first-split/first-split.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ChatInfoComponent,
    FirstSplitComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
