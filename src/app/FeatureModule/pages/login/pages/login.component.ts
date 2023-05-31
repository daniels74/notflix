import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/CoreModule/services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  
  form: FormGroup;
  matcher = new ErrorStateMatcher();
  signInSub!: Subscription;
  loadingState = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public spinner: NgxSpinnerService
  ) {
    this.form = this.fb.group({
      userEmail: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnDestroy() {
    if (this.signInSub) {
      this.signInSub.unsubscribe();
    }
  }

  get userEmail(): FormControl {
    return this.form.get('userEmail') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  onSubmit() {
    const res = this.authService.loginAttempt(this.form.value);

    this.signInSub = res.subscribe((response: any) => {
      const userString = JSON.stringify(response);
      const userObject = JSON.parse(userString);

      const userToken = userObject.accessToken;
      const userRole = userObject.role;

      this.spinner.show('primary');

      this.loadingState = true;

      setTimeout(() => {
        //  Store token in local storage & Set user authorizations
        this.authService.tokenPermissions(userToken, userRole);
        this.spinner.hide();
      }, 1000);
    });
  }
}
