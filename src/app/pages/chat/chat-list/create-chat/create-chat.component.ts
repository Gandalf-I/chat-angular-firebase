import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ChatService} from '@core/services/chat.service';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.scss']
})
export class CreateChatComponent implements OnInit {
  public newChat: FormGroup;

  constructor(private fb: FormBuilder,
              private chatS: ChatService) {
    this.newChat = this.fb.group({
      title: ['']
    });
  }

  ngOnInit(): void {
  }

  createChat(): void {
    if (this.newChat.get('title').value.trim()) {
      this.chatS.createChat(this.newChat.get('title').value);
      this.newChat.reset({title: ''});
    }
  }
}
