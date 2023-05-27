import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseUrl } from '../../RootModule/app.module';
import { BehaviorSubject, map } from 'rxjs';
import { Movie } from '../../interfaces/movie';

@Injectable()
export class MovieService {
  private movieList!: Movie[];
  private movieListSubject$ = new BehaviorSubject(this.movieList);
  movies$ = this.movieListSubject$.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string,
  ) {}

  // $ Obtain a list of movies and set that list in this service
  getMovieList() {
    return this.http.get(this.baseUrl).pipe(
      map((MovieRes: any) => {
        const movieData = MovieRes.results;

        this.movieList = [...movieData];

        this.movieListSubject$.next(this.movieList);

        console.log('--MovieSerivice--getMovieList(): ', this.movieList);
      })
    );
  }

  get movieListData() {
    return this.movieListSubject$.value;
  }

  allusers() {
    return this.http.get('http://localhost:443/api/users/getAllUsers');
  }
}