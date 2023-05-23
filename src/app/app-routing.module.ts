import { NgModule, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CustomPreloadingStrategyService } from './services/custom-preloading-strategy.service';
import { MyResolver } from './components/resolvers/movie-details.resolver';
import { MovieTrailersResolver } from './components/resolvers/movie-trailers.resolver';
import { MovieUrlsResolver } from './components/resolvers/movie-urls.resolver';

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
    resolve: {urls: MovieUrlsResolver},
    loadChildren: () =>
      import('./pages/movie-list/movie-list.module').then(
        (m) => m.MovieListModule
      ),
  },
  {
    path: 'MovieDetails/:id',
    resolve: { 
      urls: MovieUrlsResolver,
      movieDetails: MyResolver,
      trailers: MovieTrailersResolver
     }, 
    loadChildren: () =>
      import('./pages/movie-details/movie-details.module').then(
        (m) => m.MovieDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
})
export class AppRoutingModule implements OnInit {
  ngOnInit() {}
}
