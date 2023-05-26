import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { movieDetails_BaseUrl } from '../../RootModule/app.module';

@Injectable({
  providedIn: 'root'
})
export class MovieTrailersResolver implements Resolve<boolean> {
  
  constructor( 
    private http: HttpClient,
    @Inject(movieDetails_BaseUrl) private movieDetails_BaseUrl: string,) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    let id = route.params['id'];

    const end =
      '/videos?api_key=2f837be3c800489e1e3094b7fc6a3688&language=en-US';

    const combined_Url = this.movieDetails_BaseUrl + id + end;

    return this.http.get(combined_Url);
  }
}
