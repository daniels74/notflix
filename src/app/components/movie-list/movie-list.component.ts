import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies$!: Observable<any[]>;
  moviesConfig$!: Observable<string>;

  baseImgUrl!: string;

  constructor(public movieListService: MovieService) {}
  ngOnInit() {
    // this.movieListService.configMoviesDB();
    // console.log('BASEURL: ', this.movieListService.configMoviesDB());
    this.movieListService.configMoviesDB();
    this.moviesConfig$ = this.movieListService.moviesConfig$;
    // console.log('moviesConfig$: ', this.moviesConfig$);

    this.moviesConfig$.forEach((item) => {
      console.log("Item: ", item);
      this.baseImgUrl = item;
    })

    // console.log('Movie List: ', this.movieListService.getMovieList());
    this.movieListService.getMovieList().subscribe();
    this.movies$ = this.movieListService.movies$;
    // console.log('In movieList this.movies$: ', this.movies$);
  }
}
