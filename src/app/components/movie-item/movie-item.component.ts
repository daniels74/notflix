import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  @Input() movieImage!: string;

  @Input() movieTitle!: string;

  @Input() baseImgUrl!: string;

  @Input() releaseDate!: string;

  @Input() voteAverage!: string;

  @Input() movieId!: string;

  loadingState = false;

  constructor(private router: Router){}

  showMore(id: string){
    this.loadingState = true;
    setTimeout(() => {
      this.router.navigate(['/MovieDetails', id]);
    }, 1000);
  }
}
