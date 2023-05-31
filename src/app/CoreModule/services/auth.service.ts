import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, take } from 'rxjs';
import { User } from '../interfaces/user';
import { Fulluser } from '../interfaces/fulluser';
@Injectable()
export class AuthService {
  private user!: Fulluser;
  private userSubject$ = new BehaviorSubject<any>(this.user);
  user$ = this.userSubject$.asObservable();

  private authState: boolean = false;
  private authStateSubject$ = new BehaviorSubject(this.authState);
  authState$ = this.authStateSubject$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // LOGIN: Authentication of User using credentials
  loginAttempt({ userEmail, password }: any) {
    return this.http.post('http://localhost:443/auth/signin', {
      email: userEmail,
      password: password,
    });
  }

  // Set user and authorizations for that user
  tokenPermissions(token: string, userRole?: string) {
    localStorage.setItem('token', token);

    const userObject: User = jwtDecode(token);

    this.user = {
      ...userObject,
      userRole: userRole,
    };
    this.userSubject$.next(this.user);
    //! Start refresh token timer

    // Set auth state
    this.authState = true;
    this.authStateSubject$.next(this.authState);

    this.router.navigate(['/MovieList']);
  }

  // Register new user
  registerUser(fullForm: {}) {
    return this.http.post('http://localhost:443/auth/signup', fullForm);
  }

  // Set user and new authorizations for that user
  updateUserInfo(plan: string) {
    const userObj = this.userSubject$.value;

    return this.http.patch('http://localhost:443/auth/userupdate', {
      email: userObj.email,
      role: plan,
    });
  }

  refreshToken(userObj: User) {
    return this.http.post('http://localhost:443/auth/refresh-token', {
      id: userObj.id,
      email: userObj.email,
      username: userObj.username,
      tmdb_key: userObj.tmdb_key,
    });
  }

  // Logout and set not auth
  logout() {
    localStorage.removeItem('token');

    this.authState = false;
    this.authStateSubject$.next(this.authState);

    this.router.navigate(['/']);
  }

  // Check if user is logged in
  liveSessionCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      const userObject: User = jwtDecode(token);

      const refresh$ = this.refreshToken(userObject);

      refresh$.pipe(take(1)).subscribe((res: any) => {
        this.tokenPermissions(res.accessToken, res.role);
      });
    }
  }

  // used in Register.ts for condtions for updating roles
  get userRole() {
    const userObject: Fulluser = this.userSubject$.value;
    return userObject.userRole;
  }

  get apiKey(){
    const userObject: Fulluser = this.userSubject$.value;
    return userObject.tmdb_key;
  }

  // Get current auth state
  get authenticationState() {
    return this.authStateSubject$.value;
  }
}
