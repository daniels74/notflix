import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BaseUrl, movieDetails_BaseUrl } from '../../RootModule/app.module';
import { AuthService } from 'src/app/CoreModule/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieTrailersResolver implements Resolve<boolean> {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.params['id'];

    const api_key = this.authService.apiKey;

    const combined_Url =
      [this.baseUrl, 'movie/', id].join('') + '/videos' + api_key;

    return this.http.get(combined_Url);
  }
}
