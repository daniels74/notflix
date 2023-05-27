import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './pages/movie-details.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YoutubeComponent } from 'src/app/FeatureModule/pages/movie-details/components/youtube/youtube.component';
import { GlowDirectiveModule } from 'src/app/SharedModule/glow-directive/glow-directive.module';
import { MovieDetailsGuard } from 'src/app/SharedModule/guards/movie-details.guard';

const routes: Routes = [{ path: '', canActivate: [MovieDetailsGuard], component: MovieDetailsComponent }];

@NgModule({
  declarations: [MovieDetailsComponent, YoutubeComponent],
  providers: [MovieDetailsGuard],
  imports: [CommonModule, YouTubePlayerModule,GlowDirectiveModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieDetailsModule {}
