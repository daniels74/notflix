import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../CoreModule/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class MovieDetailsGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
   
    const userRole = this.authService.userRole;
    // this.authService.user$.subscribe((user: any) => {
        if (userRole === 'ADMIN' || userRole === 'SUPERUSER') {
          console.log("ITEM GAURD!: ", userRole);
            return true;

        } else {
          console.log('Authorization Denied: ', userRole);
          this.router.navigate(['/register']);
          return false;
        }
      // })
      return false;

}
  
}
