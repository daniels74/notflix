import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, map } from 'rxjs';

@Injectable()
export class AuthService {
  private user!: {};
  private userSubject$ = new BehaviorSubject<any>(this.user);
  user$ = this.userSubject$.asObservable();

  private authState: boolean = false;
  private authStateSubject$ = new BehaviorSubject(this.authState);
  authState$ = this.authStateSubject$.asObservable();

  private userName : string = '';
  

  constructor(private http: HttpClient, private router: Router) {}

  // $ Authentication of User using credentials
  // ! LOGIN
  loginAttempt() {
    return this.http.post('http://localhost:443/api/login', {
      // userEmail: 'group.callbackcats@gmail.com',
      // password: '$2a$10$d8QWXUh.xZKdluBDAriCpeW2VrXm1JCuJZqgdTkTm/l0aBwmFiz2q',
      userEmail: 'kru24528@gmail.com',
      password: '$2a$10$ZXYbVii8zmrPxlS3geAA9ubA6ftkHV1Vqy2MRZ/JZiZtUhOaonIq.',
    });
  }

  // $ Set user and authorizations for that user
  tokenPermissions(token: string, userName?: string) {
    // ! Save token to local storage
    localStorage.setItem('token', token);

    // ! Destructure the token
    const helper = jwtDecode(token);

    const userString = JSON.stringify(helper);

    let userObject = JSON.parse(userString);

    console.log('token decoded: ', userObject.userRole);

    if(!userName) {
      userObject = {
        ...userObject,
        'userName': userObject.userRole
      } 
    } else {
      userObject = {
        ...userObject,
        'userName': userName
      }
    }

    console.log("USEROBJECT after decode: ", userObject);
    // ! Set tmdb API KEY through service
    // ! Set user
    this.user = userObject;
    this.userSubject$.next(this.user);
    console.log("User SET: ", this.user);
    //! Start refresh token timer

    // ! Set auth state
    this.authState = true;
    this.authStateSubject$.next(this.authState);

    this.router.navigate(['/MovieList']);
  }

  // $ Register new user
  // ! REGISTER
  registerUser(fullForm: {}) {
    return this.http.post(
      'http://localhost:443/api/register/createNewAccount',
      { fullForm }
    );
  }

  // $ Set user and new authorizations for that user
  updateUserInfo() {
    return this.http.patch('http://localhost:443/auth/userupdate', {});
  }

  // $ Update current role of current user.
  // ? Used in regsiter component
  updateUserRole_Manualy(newRole: string) {
    const userObjectupdate = {
      ...this.user,
      'userRole': newRole 
    }

    this.user = userObjectupdate;

    this.userSubject$.next(this.user);
  }

  // $ Logout and set not auth
  logout() {
    localStorage.removeItem('token');

    this.authState = false;
    this.authStateSubject$.next(this.authState);

    this.router.navigate(['/']);
  }

  // $ Check if user is logged in
  liveSessionCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenPermissions(token);
    }
  }

  // $ Get jwt token of current user
  getJwtToken() {
    return localStorage.getItem('token');
  }

  // ? used in Register.ts for condtions for updating roles
  get userRole() {
    const userObject = this.userSubject$.value;
    return userObject.userRole;
  }

  // $ Get current auth state
  get authenticationState() {
    return this.authStateSubject$.value;
  }
}
