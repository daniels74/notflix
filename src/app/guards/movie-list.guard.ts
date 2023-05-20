import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieListGuard implements CanActivate {

  constructor(private authService: AuthService, private route: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
   
      if(this.authService.authenticationState) {
        return true;
      } else {  
        this.route.navigate(['/login']);
        return false}

  }
  
}
