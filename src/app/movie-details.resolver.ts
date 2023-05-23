import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MovieService } from './services/movie.service';

@Injectable()
export class MyResolver implements Resolve<any> {
  constructor(private movieService : MovieService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Object {
    let id = route.params['id'];

    // $ Set URLS 
    
    this.movieService.configMoviesDB();
    
    const urls = this.movieService.allUrls;
  
    // $ FETCH MOVIE DETAILS
    
    this.movieService.getMovieDetails(id).subscribe();

    // $ FETCH TRAILERS
    
    this.movieService.getTrailers(id).subscribe();

    let allData = {
      "URLS": [...Object.entries(urls)],
    }

    return allData;
  }
}