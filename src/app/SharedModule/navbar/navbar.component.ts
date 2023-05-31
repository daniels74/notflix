import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/CoreModule/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  usernameSub$!: Subscription;
  authSub$!: Subscription;

  userName!: any;
  isAuth: boolean = false;
  loadingState = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    public spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // Set usernme for nav btn
    this.usernameSub$ = this.authService.user$.subscribe((user) => {
      if (user) {
        this.userName = user.username;
      }
    });
    // Set auth State
    this.authSub$ = this.authService.authState$.subscribe((state) => (this.isAuth = state));
  }

  ngOnDestroy() {
    this.usernameSub$.unsubscribe();
    this.authSub$.unsubscribe();
  }

  movieListNav() {
    this.spinner.show('primary');

    this.loadingState = true;

    setTimeout(() => {
      this.spinner.hide();

      this.loadingState = false;

      this.router.navigate(['/MovieList']);
    }, 1000);
  }

  logout() {
    this.isAuth = false;
    this.authService.logout();
  }
}
