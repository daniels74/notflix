import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {

@Input() movieimage!: string;

@Input() movietitle!: string;

@Input() baseImgUrl!: string;

fullImgUrl:string = this.movieimage;

}
