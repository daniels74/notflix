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

  // private userName!: any;
  // private userNameSubject$ = new BehaviorSubject(this.userName);
  // username$ = this.userNameSubject$.asObservable();

  private authState: boolean = false;
  private authStateSubject$ = new BehaviorSubject(this.authState);
  authState$ = this.authStateSubject$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // $ Auth and set auth
  // ? Currently using temp credentials
  // ? Will add credentails as paramameters
  // loginUser() {
  //   return this.http
  //     .post('http://localhost:443/api/login', {
  //       userEmail: 'group.callbackcats@gmail.com',
  //       password:
  //         '$2a$10$d8QWXUh.xZKdluBDAriCpeW2VrXm1JCuJZqgdTkTm/l0aBwmFiz2q',
  //     })
  //     .pipe(
  //       map((response: any) => {
  //         const res = [...Object.values(response)];
  //         this.userName = res[1];

  //         console.log('username: ', this.userName);
  //         console.log('Login RESPONSE: ', response);

  //         this.userNameSubject$.next(this.userName);

  //         this.authState = true;
  //         this.authStateSubject$.next(this.authState);
  //       })
  //     );
  // }

  // $ Authentication of User using credentials
  loginAttempt() {
    return this.http.post('http://localhost:443/api/login', {
      userEmail: 'group.callbackcats@gmail.com',
      password: '$2a$10$d8QWXUh.xZKdluBDAriCpeW2VrXm1JCuJZqgdTkTm/l0aBwmFiz2q',
    });
  }

  // $ Set user and authorizations for that user
  tokenPermissions(token: string) {
    // ! Save token to local storage
    localStorage.setItem('token', token);

    // ! Destructure the token
    const helper = jwtDecode(token);

    const userString = JSON.stringify(helper);

    const userObject = JSON.parse(userString);

    console.log('token decoded: ', userObject.userRole);

    // ! Set tmdb API KEY through service
    // ! Set user
    this.user = userObject;
    this.userSubject$.next(this.user);
    //! Start refresh token timer

    // ! Set auth state
    this.authState = true;
    this.authStateSubject$.next(this.authState);

    this.router.navigate(['/MovieList']);
  }

  // $ Register new user
  registerUser() {
    return this.http.post('http://localhost:443/api/signin', {
      // userEmail: 'group.callbackcats@gmail.com',
      // password:
      //   '$2a$10$d8QWXUh.xZKdluBDAriCpeW2VrXm1JCuJZqgdTkTm/l0aBwmFiz2q',
    });
  }

  // $ Set user and new authorizations for that user
  updateUserInfo(){
    return this.http.patch('http://localhost:443/auth/userupdate', {});
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

  // $ Get current auth state
  get authenticationState() {
    return this.authStateSubject$.value;
  }
}
