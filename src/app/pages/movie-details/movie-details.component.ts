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
  // ? URLs  
  baseImgUrl_Producers!: string;
  baseImgUrl_Cover!: string;

  // ? Movie Details
  movieTitle!: string;
  releaseDate!: string;
  genres!: any;
  overview!: string;
  backdrop_path!: string;
  poster_path!: string;
  producers!: any[];
  
  // ? Youtube
  playerState: boolean = false;
  trailerIds!: any;
  currentTrailer!: string;
  trailerIndex!: number;

  // ? Data from resolver
  allData!: any[];

  ngOnInit() {

    this.route.data.subscribe((data: any) => {
      console.log('Resolver::: ', data.myData);
      this.allData = [...Object.entries(data.myData)];
    });

    // $ Set Img congifgs

    const coverUrl = this.allData[0][1][2];

    this.baseImgUrl_Cover = coverUrl[1];

    const smallUrl = this.allData[0][1][1];

    this.baseImgUrl_Producers = smallUrl[1];

    // $ Set movie detials

    const movie_details = this.movieDetailsService.movieDetailsData;

    this.movieTitle = movie_details[9][1];

    this.releaseDate = movie_details[15][1];

    this.genres = [...Object.values(movie_details[4][1])];

    this.backdrop_path = movie_details[1][1];

    this.poster_path = movie_details[12][1];

    this.overview = movie_details[10][1];

    this.producers = [...movie_details[13][1]];

    // $ Set Trailers data

    const trailerss = this.movieDetailsService.movieTrailersData;

    const ids = trailerss.map((element: any) => {
      let arr = Object.values(element);

      return arr[3];
    });

    this.trailerIds = ids;

    this.trailerIndex = 0;

    this.currentTrailer = this.trailerIds[this.trailerIndex];
  }

  toggleYoutube(player: boolean) {
    this.playerState = player;
  }

  moveLeft() {
    if (this.trailerIndex === 0) {
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
