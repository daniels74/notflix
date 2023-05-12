import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from '../../pages/login/myerrorstatematcher';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  // passwordFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  // matcher = new MyErrorStateMatcher();

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  form: FormGroup;

  customErrorStateMatcher = new MyErrorStateMatcher();

  matcher = new ErrorStateMatcher();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required]),
    });
  }
}
