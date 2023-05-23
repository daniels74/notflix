import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  BaseUrl,
  movieDetails_BaseUrl,
  movieDetails_KeyUrl,
  moviesConfigUrl,
} from '../app.module';
import { BehaviorSubject, map } from 'rxjs';
import { Movie, MoviesAllData } from '../interfaces/movie';

@Injectable()
export class MovieService {
  // Movie List
  private movieList!: Movie[];
  private movieListSubject$ = new BehaviorSubject(this.movieList);
  movies$ = this.movieListSubject$.asObservable();

  // $ URL
  private Urls!: {};
  private UrlsSubject$ = new BehaviorSubject(this.Urls);
  allUrls$ = this.UrlsSubject$.asObservable();
  //!_________________________
  private movieConfig_BaseUrl!: string;
  private movieConfig_BaseUrlSubject$ = new BehaviorSubject(
    this.movieConfig_BaseUrl
  );
  moviesConfig$ = this.movieConfig_BaseUrlSubject$.asObservable();

  //!_________________________
  private movieConfig_BaseUrl_Cover!: string;
  private movieConfig_BaseUrl_CoverSubject$ = new BehaviorSubject(
    this.movieConfig_BaseUrl_Cover
  );
  baseUrl_cover$ = this.movieConfig_BaseUrl_CoverSubject$.asObservable();

  //!_________________________
  private movieConfig_BaseUrl_Small!: string;
  private movieConfig_BaseUrl_SmallSubject$ = new BehaviorSubject(
    this.movieConfig_BaseUrl_Small
  );
  baseUrl_Small$ = this.movieConfig_BaseUrl_SmallSubject$.asObservable();

  // $ Details
  private movieDetails!: any[];
  private movieDetailsSubject$ = new BehaviorSubject(this.movieDetails);
  movieDetails$ = this.movieDetailsSubject$.asObservable();

  // $ Trailers
  private movieTrailers!: any[];
  private movieTrailersSubject$ = new BehaviorSubject(this.movieTrailers);
  movieTrailers$ = this.movieTrailersSubject$.asObservable();

  //Observable trials
  // private obsTrial!: {};
  // private obsTrialSubject$ = new BehaviorSubject(this.obsTrial);
  // obsTrial$ = this.obsTrialSubject$.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string,
    @Inject(moviesConfigUrl) private configUrl: string,
    @Inject(movieDetails_BaseUrl) private movieDetails_BaseUrl: string,
    @Inject(movieDetails_KeyUrl) private movieDetails_KeyUrl: string
  ) {}

  getTrailers(movieId: string) {
    const end =
      '/videos?api_key=2f837be3c800489e1e3094b7fc6a3688&language=en-US';
    const combined_Url = this.movieDetails_BaseUrl + movieId + end;

    return this.http.get(combined_Url).pipe(
      map((trailer: any) => {
        // trailer = an Object of two arrays
        this.movieTrailers = [...trailer.results];

        this.movieTrailersSubject$.next(this.movieTrailers);

        console.log('--MovieSerivice--getTrailers(): ', this.movieTrailers);
      })
    );
  }

  // TODO: getMovieDetails()
  // 1.) Should fetch further details on a movie given a movie ID
  // $ Sets movie details object.
  getMovieDetails(movieId: string) {
    // "adult": false,
    // "backdrop_path": "/iJQIbOPm81fPEGKt5BPuZmfnA54.jpg",
    // "belongs_to_collection": null,
    // "budget": 100000000,
    // "genres": [
    //     {
    //         "id": 16,
    //         "name": "Animation"
    //     },
    //     {
    //         "id": 12,
    //         "name": "Adventure"
    //     },
    //     {
    //         "id": 10751,
    //         "name": "Family"
    //     },
    //     {
    //         "id": 14,
    //         "name": "Fantasy"
    //     },
    //     {
    //         "id": 35,
    //         "name": "Comedy"
    //     }
    // ],
    // "homepage": "https://www.thesupermariobros.movie",
    // "id": 502356,
    // "imdb_id": "tt6718170",
    // "original_language": "en",
    // "original_title": "The Super Mario Bros. Movie",
    // "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
    // "popularity": 2915.871,
    // "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    // "production_companies": [
    //     {
    //         "id": 33,
    //         "logo_path": "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
    //         "name": "Universal Pictures",
    //         "origin_country": "US"
    //     },
    //     {
    //         "id": 6704,
    //         "logo_path": "/fOG2oY4m1YuYTQh4bMqqZkmgOAI.png",
    //         "name": "Illumination",
    //         "origin_country": "US"
    //     },
    //     {
    //         "id": 12288,
    //         "logo_path": "/e4dQAqZD374H5EuM0W1ljEBWTKy.png",
    //         "name": "Nintendo",
    //         "origin_country": "JP"
    //     }
    // ],
    // "production_countries": [
    //     {
    //         "iso_3166_1": "JP",
    //         "name": "Japan"
    //     },
    //     {
    //         "iso_3166_1": "US",
    //         "name": "United States of America"
    //     }
    // ],
    // "release_date": "2023-04-05",
    // "revenue": 1162684440,
    // "runtime": 92,
    // "spoken_languages": [
    //     {
    //         "english_name": "English",
    //         "iso_639_1": "en",
    //         "name": "English"
    //     }
    // ],
    // "status": "Released",
    // "tagline": "",
    // "title": "The Super Mario Bros. Movie",
    // "video": false,
    // "vote_average": 7.472,
    // "vote_count": 1935

    const combined_Url =
      this.movieDetails_BaseUrl + movieId + this.movieDetails_KeyUrl;

    return this.http.get(combined_Url).pipe(
      map((movieDetails: any) => {
        this.movieDetails = [...Object.entries(movieDetails)];

        this.movieDetailsSubject$.next(this.movieDetails);

        console.log('--MovieSerivice--getMovieDetails(): ', this.movieDetails);
      })
    );
  }

  // TODO: configMoviesDB()
  // $1.) should find a base Url ,
  // $2.) find an image size,
  // $3.) combine into one url for later concat with movie img
  configMoviesDB() {
    this.http.get(this.configUrl).subscribe((configRes) => {

      // ? Object value access
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
      const settings = config[0][1]; // ! .images

      this.movieConfig_BaseUrl = settings.base_url + settings.poster_sizes[0];

      this.movieConfig_BaseUrlSubject$.next(this.movieConfig_BaseUrl);

      this.movieConfig_BaseUrl_Cover =
        settings.base_url + settings.backdrop_sizes[2];

      this.movieConfig_BaseUrl_CoverSubject$.next(
        this.movieConfig_BaseUrl_Cover
      );

      this.movieConfig_BaseUrl_Small =
        settings.base_url + settings.backdrop_sizes[0];

      this.movieConfig_BaseUrl_SmallSubject$.next(
        this.movieConfig_BaseUrl_Small
      );

      //$--------------------------------------------------------

      this.Urls = {
        poster_zero: this.movieConfig_BaseUrl,
        backdrop_zero: this.movieConfig_BaseUrl_Small,
        backdrop_two: this.movieConfig_BaseUrl_Cover
      };

      this.UrlsSubject$.next(this.Urls);
    });
  }

  // TODO: getMovieList()
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

  get allUrls(){
    return this.UrlsSubject$.value;
  }
  
  get movieDetailsData() {
      return this.movieDetailsSubject$.value;
    }

  get movieTrailersData() {
    return this.movieTrailersSubject$.value;
  }
}