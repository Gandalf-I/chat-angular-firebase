import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  googleSignIn(): void {
    this.auth.googleSignIn()
      .then(() =>
        this.router.navigateByUrl('chat'));
  }
}
