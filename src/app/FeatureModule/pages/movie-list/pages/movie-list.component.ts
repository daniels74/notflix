import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/CoreModule/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  baseImgUrl!: any;
  moviesList!: any[];
  setListSub!: Subscription;
  movieListSub!: Subscription;

  constructor(
    public movieListService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    // Get data from resolver
    const dataRes = this.route.snapshot.data['urls'];

    const imgSettings = dataRes.images;

    this.baseImgUrl = imgSettings.base_url + imgSettings.backdrop_sizes[2];

    this.setListSub = this.movieListService.setMovieList().subscribe();

    this.movieListSub = this.movieListService.movies$.subscribe(
      (movies: any) => {
        this.moviesList = movies;
      }
    );
  }

  ngOnDestroy() {
    this.setListSub.unsubscribe();
    this.movieListSub.unsubscribe();
  }
}
