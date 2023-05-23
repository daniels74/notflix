import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPreloadingStrategyService } from './services/custom-preloading-strategy.service';
import { MyResolver } from './movie-details.resolver';

const routes: Routes = [
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
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'MovieList',
    loadChildren: () =>
      import('./pages/movie-list/movie-list.module').then(
        (m) => m.MovieListModule
      ),
      data: { preload: true }
  },
  {
    // ! Use RESOLVER to load data before rendering page 
    path: 'MovieDetails/:id',
    resolve: { myData: MyResolver }, 
    loadChildren: () =>
      import('./pages/movie-details/movie-details.module').then(
        (m) => m.MovieDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule implements OnInit {
  ngOnInit() {}
}
