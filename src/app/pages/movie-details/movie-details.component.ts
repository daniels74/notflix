import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public movieDetailsService: MovieService
  ) {}
  myid!: string;

  movieTrailers$!: Observable<string[]>;

  movieDetails$!: Observable<any[]>;

  baseUrl_cover$!: Observable<string>;

  producersImg_Config$!: Observable<string>;

  baseImgUrl_Producers!: string;

  baseImgUrl_Cover!: string;

  movieTitle!: string;

  releaseDate!: string;

  genres!: any;

  overview!: string;

  backdrop_path!: string;

  poster_path!: string;

  producers!: any[];

  apiLoaded: boolean = false;

  playerState: boolean = false;

  trailerIds!: any;

  currentTrailer!: string;

  trailerIndex!: number;

  g!: any[];

  ngOnInit() {
    // if (!this.apiLoaded) {
    //   // This code loads the IFrame Player API code asynchronously, according to the instructions at
    //   // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    //   const tag = document.createElement('script');
    //   tag.src = 'https://www.youtube.com/iframe_api';
    //   document.body.appendChild(tag);
    //   this.apiLoaded = true;
    // }

    //  Set img (base Url/img size) observable
    this.movieDetailsService.configMoviesDB();

    //  Get img config url observable
    this.baseUrl_cover$ = this.movieDetailsService.baseUrl_cover$;

    this.baseUrl_cover$.forEach((item) => {
      console.log('Item: ', item);
      this.baseImgUrl_Cover = item;
    });

    this.producersImg_Config$ = this.movieDetailsService.baseUrl_Small$;

    this.producersImg_Config$.forEach((item) => {
      console.log('Item: ', item);
      this.baseImgUrl_Producers = item;
    });

    // Get movie ID from params
    this.route.params.subscribe((params) => {
      this.myid = params['id'];
      console.log('YO: ', this.myid);
    });

    // fetch the movie data
    this.movieDetailsService.getMovieDetails(this.myid).subscribe();

    this.movieDetails$ = this.movieDetailsService.movieDetails$;

    this.movieDetails$.subscribe((ele) => {
      this.movieTitle = ele[9][1];

      this.releaseDate = ele[15][1];

      this.genres = [...Object.values(ele[4][1])];

      console.log('Genres: ', this.genres);

      this.backdrop_path = ele[1][1];

      this.poster_path = ele[12][1];

      this.overview = ele[10][1];

      //is array of objects
      console.log('Producers: ', [...ele[13][1]]);
      this.producers = [...ele[13][1]];
    });

    // fetch Trailers
    this.movieDetailsService.getTrailers(this.myid).subscribe();

    this.movieTrailers$ = this.movieDetailsService.movieTrailers$;

    this.movieTrailers$.subscribe((eles) => {
      const obj = [...eles];

      console.log('keys::: ', Object.values(obj));

      const vals = Object.values(obj);

      const ids = vals.map((element) => {
        let arr = Object.values(element);
        console.log('ARR: ', arr[3]);

        return arr[3];
      });

      this.trailerIds = ids;
      console.log('trailerIDS: ', this.trailerIds);

      this.trailerIndex = 0;

      this.currentTrailer = this.trailerIds[this.trailerIndex];

      console.log('current IDS: ', this.currentTrailer);
    });
  }

  toggleYoutube(player: boolean) {
    this.playerState = player;
  }

  moveLeft() {
    if (
      this.trailerIndex === 0
    ) {
      this.trailerIndex = this.trailerIds.length - 1;
      console.log(this.trailerIndex);
    } else {
      this.trailerIndex--;
      console.log(this.trailerIndex);
    }
  }

  moveRight() {
    if (this.trailerIndex === this.trailerIds.length - 1) {
      this.trailerIndex = 0;
      console.log(this.trailerIndex);
    } else {
      this.trailerIndex++;
      console.log(this.trailerIndex);
    }
  }
}
