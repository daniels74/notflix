import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseUrl } from '../../RootModule/app.module';
import { BehaviorSubject, map, take } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { AuthService } from './auth.service';

@Injectable()
export class MovieService {
  private movieList!: Movie[];
  private movieListSubject$ = new BehaviorSubject(this.movieList);
  movies$ = this.movieListSubject$.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string,
    private authService: AuthService
  ) {}

  // $ Obtain a list of movies and set that list in this service
  setMovieList() {
     const api_key = this.authService.apiKey;
  
    return this.http.get([this.baseUrl, 'discover/movie', api_key].join('')).pipe(
      map((MovieRes: any) => {
        const movieData = MovieRes.results;

        this.movieList = [...movieData];

        this.movieListSubject$.next(this.movieList);
      })
    );
  }
}
