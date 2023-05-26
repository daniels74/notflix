import {
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule,
  Pipe,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterModule } from '@angular/router';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

// Navbar
import { NavbarComponent } from '../SharedModule/navbar/navbar.component';

// PAGES
import { AppComponent } from './app.component';

// Resources
import { MovieService } from '../CoreModule/services/movie.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
//import { YoutubePlayerExample } from './components/youtube.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AuthService } from '../CoreModule/services/auth.service';
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
    // ! Important
    BrowserModule,
    AppRoutingModule,
    // UI
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
    YouTubePlayerModule,
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
