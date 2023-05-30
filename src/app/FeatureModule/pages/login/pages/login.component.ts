import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from '../components/myerrorstatematcher';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/CoreModule/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // $ VARIABLES
  form: FormGroup;
  customErrorStateMatcher = new MyErrorStateMatcher();
  matcher = new ErrorStateMatcher();

  // $ CONSTRUCTOR
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    public authService: AuthService
  ) {
    this.form = this.fb.group({
      userEmail: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required]),
    });

    this.http
      .get('http://localhost:443/api/users/getAllUsers')
      .subscribe((res) => console.log('Users: ', res));
  }
  // $ FUNCTIONS
  get userEmail(): FormControl {
    return this.form.get('userEmail') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  onSubmit(formData: any) {
    console.log('FORMMM: ', this.form.value);
    // this.http
    //   .post('http://localhost:443/api/login', this.form.value)
    //   .subscribe({
    //     next: (response) => console.log(response),
    //     error: (error) => console.log(error),
    //   });
    console.log('FORMMM: ', this.form.value.userEmail);
    // ? this.authService.loginUser().subscribe();

    //console.log("LOGIN res: ", this.authService.loginAttempt());

    const res = this.authService.loginAttempt(this.form.value);

    res.subscribe((response) => {
  
    const userString = JSON.stringify(response); // ? turn into string
    const userObject = JSON.parse(userString); // ? turn into object for access to names
      
    console.log("UserOb: ", userObject);
    const userToken = userObject.accessToken;
    const userRole = userObject.role;

    // ! Store token in local storage
    // ! Get user authorizations from token
    this.authService.tokenPermissions(userToken, userRole);
   
    this.authService.user$.subscribe((user) => { console.log("UUUSSER: ", user)});
    });
  }
}
