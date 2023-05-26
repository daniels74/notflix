import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/CoreModule/services/auth.service';
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent implements OnInit{
  @Input() movieImage!: string;

  @Input() movieTitle!: string;

  @Input() baseImgUrl!: string;

  @Input() releaseDate!: string;

  @Input() voteAverage!: string;

  @Input() movieId!: string;


  data!: any;

  loadingState = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    // this.data = JSON.parse(JSON.stringify(this.movieData));
    
    // console.log("DATATAAA: " , this.data.title);
  }

  showMore(id: string) {
    this.authService.user$.subscribe((user: any) => {
      if (user.userRole === 'admin') {
        this.spinner.show('primary');

        this.loadingState = true;

        setTimeout(() => {
          this.router.navigate(['/MovieDetails', id]);

          this.spinner.hide();
        }, 1000);
      } else {
        console.log('Authorization Denied: ', user.userRole);

        this.router.navigate(['/register']);
      }
    });
  }
}
