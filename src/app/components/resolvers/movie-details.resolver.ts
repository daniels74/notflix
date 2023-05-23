import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Observable, map, of } from 'rxjs';
import { movieDetails_BaseUrl, movieDetails_KeyUrl } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyResolver implements Resolve<any>, OnDestroy {

  constructor(private movieService : MovieService, private router: Router,
    private http : HttpClient,
    @Inject(movieDetails_BaseUrl) private movieDetails_BaseUrl: string,
    @Inject(movieDetails_KeyUrl) private movieDetails_KeyUrl: string ) {}
  
  ngOnDestroy(): void {
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<any>
  {
    // let id = route.params['id'];

    // // $ Set URLS 
    
    // this.movieService.configMoviesDB();
    
    // const urls = this.movieService.allUrls;
  
    // // $ FETCH MOVIE DETAILS
    
    // this.movieService.getMovieDetails(id).subscribe();

    // // $ FETCH TRAILERS
    
    // this.movieService.getTrailers(id).subscribe();

    // let allData = {
    //   "URLS": [...Object.entries(urls)],
    // }

    // return of(allData);
    
    let id = route.params['id'];

    const combined_Url =
      this.movieDetails_BaseUrl + id + this.movieDetails_KeyUrl;

    return this.http.get(combined_Url);
  }
}