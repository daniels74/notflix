import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, public loginService: LoginService) {}
  
  username$!: Observable<string>;

  authState$!: Observable<boolean>;

  isAuth: boolean = false;

  ngOnInit() {
    this.username$ = this.loginService.username$; 
    
    this.authState$ = this.loginService.authState$;
  
    this.authState$.subscribe((state) => this.isAuth = state);
  }


  logout(){
    this.isAuth = false;
    this.loginService.logout();
  }
}
