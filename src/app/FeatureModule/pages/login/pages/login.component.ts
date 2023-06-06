import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/CoreModule/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  form: FormGroup;
  matcher = new ErrorStateMatcher();
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
  ngOnDestroy() {}

  get userEmail(): FormControl {
    return this.form.get('userEmail') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  onSubmit() {
    this.authService
      .loginAttempt(this.form.value)
      .pipe(take(1))
      .subscribe((res) => {
        this.spinner.show('primary');
        this.loadingState = true;

        setTimeout(() => {
          //  Store token in local storage & Set user authorizations
          this.authService.tokenPermissions(res.accessToken, res.role);
          this.spinner.hide();
        }, 1000);
      });
  }
}
