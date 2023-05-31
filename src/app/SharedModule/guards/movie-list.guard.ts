import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../CoreModule/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieListGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.authenticationState) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
