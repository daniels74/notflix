import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  @Input() baseImgUrl!: string;

  @Input() movieData!: any;

  loadingState = false;

  constructor(private router: Router, public spinner: NgxSpinnerService) {}

  showMore(id: string) {
    this.spinner.show('primary');

    this.loadingState = true;

    setTimeout(() => {
      this.router.navigate(['/MovieDetails', id]);

      this.spinner.hide();
    }, 1000);
  }
}
