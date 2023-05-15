import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { VideoPlayerComponent } from 'src/app/components/videoplayer/videoplayer.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubePlayerExample } from 'src/app/components/youtube.component';


@NgModule({
  declarations: [MovieDetailsComponent, VideoPlayerComponent, YoutubePlayerExample],
  imports: [CommonModule, MovieDetailsRoutingModule, YouTubePlayerModule],
})
export class MovieDetailsModule {}

 let apiLoaded = false;

