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

  baseImgUrl!: any;

  constructor(public movieListService: MovieService) {}
  ngOnInit() {
    
    // Set img (base Url/img size) observable
    this.movieListService.configMoviesDB();

    // Get img config url observable
    this.moviesConfig$ = this.movieListService.baseUrl_cover$;
    this.moviesConfig$.forEach((item) => {
      console.log("Item: ", item);
      this.baseImgUrl = item;
    })
    //?const urls = [...Object.values(this.movieListService.allUrls)];
    //?this.baseImgUrl = urls[1];
    //?console.log("DNENEKNK", urls[1]);
    // console.log('Movie List: ', this.movieListService.getMovieList());
    this.movieListService.getMovieList().subscribe();
    this.movies$ = this.movieListService.movies$;
    // console.log('In movieList this.movies$: ', this.movies$);

    // const d = [...Object.values(this.movieListService.obsTrialValues)];
    
    // console.log("OBJ TRIAL:::", d[1]);
  }
}
