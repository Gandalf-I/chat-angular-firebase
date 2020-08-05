import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageService} from '@core/services/message.service';
import {AuthService} from '@core/services/auth.service';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  public messageForm: FormGroup;
  public userPhoto: string = null;

  constructor(private fb: FormBuilder,
              private messageS: MessageService,
              private auth: AuthService) {
  }


  ngOnInit(): void {
    this.initMessageForm();
    this.auth.getUserById(this.auth.uid).snapshotChanges().pipe(
      map(snap => {
        this.userPhoto = snap.payload.val().photoURL;
      }),
      take(1)
    ).subscribe();
  }

  private initMessageForm(): void {
    this.messageForm = this.fb.group({
      message: ['']
    });
  }

  public resetMessageForm(): void {
    this.messageForm.reset({message: ''});
  }

  public sendMessage(): void {
    const messageValue = this.messageForm.value.message.trim();
    if (messageValue !== '') {
      this.messageS.sendMessage(messageValue);
    }
    this.resetMessageForm();
  }


}
