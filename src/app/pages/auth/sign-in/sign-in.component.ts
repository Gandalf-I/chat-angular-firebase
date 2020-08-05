import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {

  public signInForm: FormGroup;
  public warning: boolean = false;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initSignInForm();
  }

  private initSignInForm(): void {
    this.signInForm = this.fb.group({
      email: ['', [
        Validators.minLength(5),
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]
      ],
      password: ['', [Validators.minLength(6)]],
    });
  }


  submit(): void {
    if (this.signInForm.invalid) {
      return;
    }
    this.auth.simpleSignIn(this.signInForm.get('email').value, this.signInForm.get('password').value)
      .then(result => {
        if (result) {
          this.router.navigateByUrl('chat');
        } else {
          this.warning = true;
        }
      });
  }

}
