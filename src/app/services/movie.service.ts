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

  constructor(
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string,
    @Inject(moviesConfigUrl) private configUrl: string
  ) {}

  // TODO: configMoviesDB()
  // should find a base Url ,
  // find an image size,
  // combine into one url for later concat with movie img
  configMoviesDB() {
    this.http.get(this.configUrl).subscribe((configRes) => {
      //configRes.images
      //configRes.change_keys
      const config = [...Object.entries(configRes)];

      // "base_url": string,
      // "secure_base_url": string,
      // "backdrop_sizes": string[],
      // "logo_sizes": string[],
      // "poster_sizes": [],
      // "profile_sizes": [],
      // "still_sizes": []
      this.movieConfig_BaseUrl =
        config[0][1].base_url + config[0][1].poster_sizes[0];

      this.movieConfig_BaseUrlSubject$.next(this.movieConfig_BaseUrl);
    });
  }

  // TODO: getMovieList()
  // Obtain a list of movies and set that list in this service
  getMovieList() {
    return this.http.get(this.baseUrl).pipe(
      map((MovieRes: any) => {
        const movieData = MovieRes.results;

        this.movieList = [...movieData];

        this.movieListSubject$.next(this.movieList);
      })
    );
  }
}
