import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/CoreModule/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService) {}

  user$!: Observable<any>;

  userName!: any;

  authState$!: Observable<boolean>;

  isAuth: boolean = false;

  ngOnInit() {
    // Set usernme for nav btn
    this.authService.user$.subscribe((user) => {
      this.userName = user.userName;
    });

    // Set auth State
    this.authService.authState$.subscribe((state) => (this.isAuth = state));
  }

  logout() {
    this.isAuth = false;
    this.authService.logout();
  }
}
