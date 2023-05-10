import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Pages
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { LogintwoComponent } from './pages/logintwo/logintwo.component';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logintwo', component: LogintwoComponent },
  { path: '', component: HomeComponent },
  { path: 'list', component: MovieListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatFormFieldModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
