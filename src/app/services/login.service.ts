import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable()
export class LoginService {
  private userName!: any;
  private userNameSubject$ = new BehaviorSubject(this.userName);
  username$ = this.userNameSubject$.asObservable();

  private authState: boolean = false;
  private authStateSubject$ = new BehaviorSubject(this.authState);
  authState$ = this.authStateSubject$.asObservable();

  constructor(private http: HttpClient) {}
  // $ Login and set auth
  loginUser() {
    return this.http
      .post('http://localhost:443/api/login', {
        userEmail: 'group.callbackcats@gmail.com',
        password:
          '$2a$10$d8QWXUh.xZKdluBDAriCpeW2VrXm1JCuJZqgdTkTm/l0aBwmFiz2q',
      })
      .pipe(
        map((response: any) => {
          const res = [...Object.values(response)];
          this.userName = res[1];

          console.log('username: ', this.userName);
          console.log('RESPONSE: ', response);

          this.userNameSubject$.next(this.userName);

          this.authState = true;
          this.authStateSubject$.next(this.authState);
        })
      );
  }

  // $ Logout and set not auth
  logout() {
    this.authState = false;
    this.authStateSubject$.next(this.authState);
  }
}
