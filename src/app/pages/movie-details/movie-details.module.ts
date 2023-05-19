import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubeComponent } from 'src/app/components/youtube/youtube.component';


@NgModule({
  declarations: [MovieDetailsComponent, YoutubeComponent],
  imports: [CommonModule, MovieDetailsRoutingModule, YouTubePlayerModule],
})
export class MovieDetailsModule {}

