import { Component, EventEmitter, Input } from '@angular/core';

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

  showMore(id: string){

  }
}
