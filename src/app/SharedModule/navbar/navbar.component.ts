import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/CoreModule/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, public authService: AuthService) {}
  
  user$!: Observable<any>;

  userName!: string;

  authState$!: Observable<boolean>;

  isAuth: boolean = false;

  ngOnInit() {

    this.authService.user$.subscribe((user) => {
      this.userName = user.userName;
    })
    
    this.authState$ = this.authService.authState$;
  
    this.authState$.subscribe((state) => this.isAuth = state);
  }


  logout(){
    this.authService.logout();
    this.isAuth = false;
    this.authService.logout();
  }
}
