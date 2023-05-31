import { Inject, Injectable, OnDestroy } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  BaseUrl,
} from '../../RootModule/app.module';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/CoreModule/services/auth.service';

@Injectable()
export class MyResolver implements Resolve<any>, OnDestroy {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string
  ) {}

  ngOnDestroy(): void {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.params['id'];

    const api_key = this.authService.apiKey;

    const combined_Url = this.baseUrl + 'movie/' + id + api_key;

    return this.http.get(combined_Url);
  }
}
