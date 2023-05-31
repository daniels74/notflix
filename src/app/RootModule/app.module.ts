import {
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Components
import { NavbarComponent } from '../SharedModule/navbar/navbar.component';
import { AppComponent } from './app.component';
// Resources
import { MovieService } from '../CoreModule/services/movie.service';
import { AuthService } from '../CoreModule/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MyResolver } from '../SharedModule/resolvers/movie-details.resolver';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TokenInterceptor } from '../CoreModule/interceptors/token.interceptor';

export const BaseUrl = new InjectionToken<string>('');

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MyResolver, useClass: MyResolver },
    { provide: MovieService, useClass: MovieService },
    { provide: AuthService, useClass: AuthService },
    {
      provide: BaseUrl,
      useValue: 'https://api.themoviedb.org/3/',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
