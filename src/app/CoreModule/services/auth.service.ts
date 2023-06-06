import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { User } from '../interfaces/user';
import { Fulluser } from '../interfaces/fulluser';
import { Signinresponse } from '../interfaces/signinresponse';
@Injectable()
export class AuthService {
  private user!: Fulluser;
  private userSubject$ = new BehaviorSubject(this.user);
  user$ = this.userSubject$.asObservable();

  private authState: boolean = false;
  private authStateSubject$ = new BehaviorSubject(this.authState);
  authState$ = this.authStateSubject$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // LOGIN: Authentication of User using credentials
  loginAttempt({ userEmail, password }: any): Observable<Signinresponse> {
    return this.http.post<Signinresponse>('http://localhost:443/auth/signin', {
      email: userEmail,
      password: password,
    });
  }

  // Set user and authorizations for that user
  tokenPermissions(token: string, userRole?: string): void {
    localStorage.setItem('token', token);

    const userObject: User = jwtDecode(token);

    this.user = {
      ...userObject,
      userRole: userRole,
    };
    this.userSubject$.next(this.user);

    // Start refresh token timer // 1 hour
    const timer = 60000 * 60;
    setTimeout(() => {
      localStorage.removeItem('token');
    }, timer);

    // Set auth state
    this.authState = true;
    this.authStateSubject$.next(this.authState);

    this.router.navigate(['/MovieList']);
  }

  // Register new user
  registerUser(fullForm: {}): Observable<Signinresponse> {
    return this.http.post<Signinresponse>(
      'http://localhost:443/auth/signup',
      fullForm
    );
  }

  // Set user and new authorizations for that user
  updateUserInfo(plan: string): Observable<Signinresponse> {
    const userObj = this.userSubject$.value;

    return this.http.patch<Signinresponse>(
      'http://localhost:443/auth/userupdate',
      {
        email: userObj.email,
        role: plan,
      }
    );
  }

  refreshToken(userObj: User): Observable<Signinresponse> {
    return this.http.post<Signinresponse>(
      'http://localhost:443/auth/refresh-token',
      {
        id: userObj.id,
        email: userObj.email,
        username: userObj.username,
        tmdb_key: userObj.tmdb_key,
      }
    );
  }

  // Logout and set not auth
  logout(): void {
    localStorage.removeItem('token');

    this.authState = false;
    this.authStateSubject$.next(this.authState);

    this.router.navigate(['/']);
  }

  // Check if user is logged in
  liveSessionCheck(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const userObject: User = jwtDecode(token);

      this.refreshToken(userObject)
        .pipe(take(1))
        .subscribe((res) => {
          this.tokenPermissions(res.accessToken, res.role);
        });
    } else {
      return;
    }
  }

  // used in Register.ts for condtions for updating roles
  get userRole() : string | undefined {
    const userObject: Fulluser = this.userSubject$.value;
    return userObject.userRole;
  }

  get apiKey() : string {
    const userObject: Fulluser = this.userSubject$.value;
    return userObject.tmdb_key;
  }

  // Get current auth state
  get authenticationState() : boolean {
    return this.authStateSubject$.value;
  }
}
