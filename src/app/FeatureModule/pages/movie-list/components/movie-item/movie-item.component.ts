import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit {
  @Input() movieImage!: string;

  @Input() movieTitle!: string;

  @Input() baseImgUrl!: string;

  @Input() releaseDate!: string;

  @Input() voteAverage!: string;

  @Input() movieId!: string;

  loadingState = false;

  constructor(
    private router: Router,
    public spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    // this.data = JSON.parse(JSON.stringify(this.movieData));
    // console.log("DATATAAA: " , this.data.title);
  }

  showMore(id: string) {
  
    this.spinner.show('primary');

    this.loadingState = true;

    setTimeout(() => {
      this.router.navigate(['/MovieDetails', id]);

      this.spinner.hide();
    }, 1000);
  }
}
