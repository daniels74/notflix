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
export const moviesConfigUrl = new InjectionToken<string>('');
export const movieDetails_BaseUrl = new InjectionToken<string>('');
export const movieDetails_KeyUrl = new InjectionToken<string>('');

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
      useValue:
        'https://api.themoviedb.org/3/discover/movie?api_key=2f837be3c800489e1e3094b7fc6a3688',
    },
    {
      provide: moviesConfigUrl,
      useValue:
        'https://api.themoviedb.org/3/configuration?api_key=2f837be3c800489e1e3094b7fc6a3688',
    },
    {
      provide: movieDetails_BaseUrl,
      useValue: 'https://api.themoviedb.org/3/movie/',
    },
    {
      provide: movieDetails_KeyUrl,
      useValue: '?api_key=2f837be3c800489e1e3094b7fc6a3688&language=en-US',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
