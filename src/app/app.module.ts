import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

// Navbar
import { NavbarComponent } from './components/navbar/navbar.component';

// PAGES
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { BackgroundComponent } from './components/background/background.component';
import { MovieService } from './services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';


export const BaseUrl = new InjectionToken<string>('');
export const moviesConfigUrl = new InjectionToken<string>('');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    BackgroundComponent,
    MovieListComponent,
    MovieItemComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: '', component: HomeComponent },
      { path: 'list', component: MovieListComponent },
    ]),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [
    {provide: MovieService, useClass: MovieService},
    {provide: BaseUrl, useValue: "https://api.themoviedb.org/3/discover/movie?api_key=2f837be3c800489e1e3094b7fc6a3688"},
    {provide: moviesConfigUrl, useValue: "https://api.themoviedb.org/3/configuration?api_key=2f837be3c800489e1e3094b7fc6a3688"},

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
