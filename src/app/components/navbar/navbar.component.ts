import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, public authService: AuthService) {}
  
  username$!: Observable<string>;

  authState$!: Observable<boolean>;

  isAuth: boolean = false;

  ngOnInit() {
    this.username$ = this.authService.username$; 
    
    this.authState$ = this.authService.authState$;
  
    this.authState$.subscribe((state) => this.isAuth = state);
  }


  logout(){
    this.isAuth = false;
    this.authService.logout();
  }
}
