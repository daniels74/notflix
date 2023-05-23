import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubeComponent } from 'src/app/components/youtube/youtube.component';
import { GlowDirectiveModule } from 'src/app/glow-directive/glow-directive.module';
import { MyResolver } from 'src/app/components/resolvers/movie-details.resolver';

const routes: Routes = [{ path: '', component: MovieDetailsComponent }];

@NgModule({
  declarations: [MovieDetailsComponent, YoutubeComponent],
  imports: [CommonModule, YouTubePlayerModule,GlowDirectiveModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieDetailsModule {}
