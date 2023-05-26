import { NgModule, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MyResolver } from '../SharedModule/resolvers/movie-details.resolver';
import { MovieTrailersResolver } from '../SharedModule/resolvers/movie-trailers.resolver';
import { MovieUrlsResolver } from '../SharedModule/resolvers/movie-urls.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../FeatureModule/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../FeatureModule/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../FeatureModule/pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'MovieList',
    resolve: {urls: MovieUrlsResolver},
    loadChildren: () =>
      import('../FeatureModule/pages/movie-list/movie-list.module').then(
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
      import('../FeatureModule/pages/movie-details/movie-details.module').then(
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
