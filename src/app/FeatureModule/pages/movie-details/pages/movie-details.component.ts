import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/CoreModule/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  // URLs
  baseImgUrl_Producers!: any;
  baseImgUrl_Cover!: any;
  // Movie Details
  movie: any;
  genres!: any;
  producers!: any[];
  // Youtube
  playerState: boolean = false;
  trailerIds!: any;
  currentTrailer!: string;
  trailerIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    public movieDetailsService: MovieService
  ) {}

  ngOnInit() {
    // Get all data from resolvers
    const urls = this.route.snapshot.data['urls'];
    this.movie = this.route.snapshot.data['movieDetails'];
    const trailers = this.route.snapshot.data['trailers'];

    // Set Img congifgs
    const imgSettings = urls.images;

    this.baseImgUrl_Cover =
      imgSettings.base_url + imgSettings.backdrop_sizes[2];

    this.baseImgUrl_Producers =
      imgSettings.base_url + imgSettings.backdrop_sizes[0];

    // Set complex movie detials
    this.genres = [...Object.values(this.movie.genres)];

    this.producers = [...this.movie.production_companies];

    // Set Trailer Ids for youtube player
    this.trailerIds = trailers.results.map((element: any) => {
      return element.key;
    });

    this.currentTrailer = this.trailerIds[this.trailerIndex];
  }

  toggleYoutube(player: boolean) {
    this.playerState = player;
  }

  moveLeft() {
    if (this.trailerIndex === 0) {
      this.trailerIndex = this.trailerIds.length - 1;
    } else {
      this.trailerIndex--;
    }
  }

  moveRight() {
    if (this.trailerIndex === this.trailerIds.length - 1) {
      this.trailerIndex = 0;
    } else {
      this.trailerIndex++;
    }
  }
}
