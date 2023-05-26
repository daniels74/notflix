import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { moviesConfigUrl } from '../../RootModule/app.module';

@Injectable({
  providedIn: 'root'
})
export class MovieUrlsResolver implements Resolve<boolean> {

  constructor( 
    private http: HttpClient,
    @Inject(moviesConfigUrl) private configUrl: string) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.http.get(this.configUrl);
  }
}
