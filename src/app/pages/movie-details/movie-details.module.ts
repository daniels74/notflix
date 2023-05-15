import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubePlayerExample } from 'src/app/components/youtube.component';
import { YoutubeComponent } from 'src/app/components/youtube/youtube.component';


@NgModule({
  declarations: [MovieDetailsComponent, YoutubePlayerExample, YoutubeComponent],
  imports: [CommonModule, MovieDetailsRoutingModule, YouTubePlayerModule],
})
export class MovieDetailsModule {}

