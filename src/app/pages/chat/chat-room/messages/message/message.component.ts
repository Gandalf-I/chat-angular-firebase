import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {IMessage} from '@shared/interfaces/message';
import {IUser} from '@shared/interfaces/user';
import {AuthService} from '@core/services/auth.service';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, DoCheck {

  @Input()
  public message: IMessage;
  public userSender: IUser;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.getUserById(this.message.senderId).snapshotChanges().pipe(
      map(snap => {
        this.userSender = {...snap.payload.val()};
      }),
      take(1)
    ).subscribe();
  }

  ngDoCheck(): void {
  }

}


