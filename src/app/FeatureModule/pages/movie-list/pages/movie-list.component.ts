import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/CoreModule/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies$!: Observable<any[]>;
  baseImgUrl!: any;

  constructor(
    public movieListService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    const dataRes = this.route.snapshot.data['urls'];

    const imgSettings = dataRes.images;

    this.baseImgUrl = imgSettings.base_url + imgSettings.backdrop_sizes[2];

    this.movieListService.getMovieList().subscribe();

    this.movies$ = this.movieListService.movies$;

  }
}
