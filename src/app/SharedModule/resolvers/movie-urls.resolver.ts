import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BaseUrl } from '../../RootModule/app.module';
import { AuthService } from 'src/app/CoreModule/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieUrlsResolver implements Resolve<boolean> {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string

  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const api_key = this.authService.apiKey;

    return this.http.get([this.baseUrl, 'configuration', api_key].join(''));
  }
}
