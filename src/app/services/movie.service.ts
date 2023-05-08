import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseUrl, moviesConfigUrl } from '../app.module';
import { BehaviorSubject, map } from 'rxjs';
import { Movie, MoviesAllData } from '../interfaces/movie';

@Injectable()
export class MovieService {
  private movieList!: Movie[];
  private movieListSubject$ = new BehaviorSubject(this.movieList);
  movies$ = this.movieListSubject$.asObservable();

  private movieConfig_BaseUrl!: string;
  private movieConfig_BaseUrlSubject$ = new BehaviorSubject(
    this.movieConfig_BaseUrl
  );
  moviesConfig$ = this.movieConfig_BaseUrlSubject$.asObservable();

  private configRes: any;

  constructor(
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string,
    @Inject(moviesConfigUrl) private configUrl: string
  ) {}

  // Get configuration for all images
  // should find a base Url for config of images ,
  // find an image size for images,
  // combine into one url for later concat with image back_drop
  configMoviesDB() {
    this.http.get(this.configUrl).subscribe((configRes)=>{
       //configRes.images
      //configRes.change_keys
      console.log("WOERK", configRes);
      
      const c = [...Object.entries(configRes)];
     
      console.log("c", c[0][1]);

        // "base_url": string,
        // "secure_base_url": string,
        // "backdrop_sizes": string[],
        // "logo_sizes": string[],
        // "poster_sizes": [],
        // "profile_sizes": [],
        // "still_sizes": []
        this.movieConfig_BaseUrl = c[0][1].base_url + c[0][1].backdrop_sizes[0];
        this.movieConfig_BaseUrlSubject$.next(this.movieConfig_BaseUrl);
    }

    );
    
  }

  getMovieList() {
    return this.http.get(this.baseUrl).pipe(
      map((MovieRes: any) => {
        const movieData = MovieRes.results;
        this.movieList = [...movieData];

        console.log('In service: ', this.movieList);
        this.movieListSubject$.next(this.movieList);
      })
    );
  }
  // getMovieList() {
  //   return this.http.get(this.baseUrl)
  //   .pipe(
  //     map((bookRes: MoviesAllData) => {
  //       const info = bookRes.results;
  //       this.bookList = [...info];
  //       this.bookList = this.bookList.filter(el => {
  //         if (el !== undefined ) {

  //          return el.title.toLowerCase().includes(nameSearch.toLowerCase());
  //         }
  //       });
  //       console.log(this.bookList);
  //       this.booklistSubject$.next(this.bookList);

  //     }),
  //   )
  // }
}
