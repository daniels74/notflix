import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './services/login.service';
import { Observable } from 'rxjs';
import { ROUTES } from '@angular/router';

// const routes: Routes = [
//   { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
//   { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
//   { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
//   { path: 'MovieList', loadChildren: () => import('./pages/movie-list/movie-list.module').then(m => m.MovieListModule) },
//   { path: 'MovieDetails/:id', loadChildren: () => import('./pages/movie-details/movie-details.module').then(m => m.MovieDetailsModule) },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })

function routesFactory(loginService: LoginService) {
  // ! Auth does not update when signing in through MovieList path. 
  let auth$ = loginService.authState$;
  let auth = false;
  auth$.subscribe((state) => (auth = state));
  console.log('AUTH: ', auth);

  return [
    {
      path: '',
      loadChildren: () =>
        import('./pages/home/home.module').then((m) => m.HomeModule),
    },
    {
      path: 'login',
      loadChildren: () =>
        import('./pages/login/login.module').then((m) => m.LoginModule),
    },
    {
      path: 'register',
      loadChildren: () =>
        import('./pages/register/register.module').then(
          (m) => m.RegisterModule
        ),
    },
    {
      path: 'MovieDetails/:id',
      loadChildren: () =>
        import('./pages/movie-details/movie-details.module').then(
          (m) => m.MovieDetailsModule
        ),
    },
    {
      path: 'MovieList',
      loadChildren: () => {
        return auth
          ? import('./pages/movie-list/movie-list.module').then(
              (m) => m.MovieListModule
            )
          : import('./pages/login/login.module').then((m) => m.LoginModule);
      },
    },
  ];
}

@NgModule({
  imports: [RouterModule.forRoot([])],
  providers: [
    {
      provide: ROUTES,
      useFactory: routesFactory,
      multi: true,
      deps: [LoginService],
    },
  ],
  exports: [RouterModule],
})
export class AppRoutingModule implements OnInit {
  ngOnInit() {}
}
