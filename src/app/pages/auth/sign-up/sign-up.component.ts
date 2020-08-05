import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
  ) {
  }


  ngOnInit(): void {
    this.initSignInForm();
  }

  private initSignInForm(): void {
    this.signUpForm = this.fb.group({
      login: ['', [Validators.minLength(4)]],
      email: ['', [
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]
      ],
      password: ['', [Validators.minLength(6)]],
    });
  }


  submit(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    // this.loaderBtn.showLoader();
    this.auth.simpleSignUp(this.signUpForm.get('email').value, this.signUpForm.get('password').value, this.signUpForm.get('login').value)
      .then(() => {
          alert('Registration complete!');
          this.signUpForm.reset({login: '', email: '', password: ''});
        }
      ).catch(() => alert('Incorrect input!'));
    // .pipe(
    //   takeUntil(this.unsubscribe$),
    //   finalize(() => {
    //     this.loaderBtn.hideLoader();
    //   })
    // )
    // .subscribe(() => {
    //   this.router.navigateByUrl('profile');
    // });
  }
}
