import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlowDirectiveModule } from 'src/app/SharedModule/glow-directive/glow-directive.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MovieItemGuard } from 'src/app/SharedModule/guards/movie-item.guard';
@NgModule({
  declarations: [],
  providers: [MovieItemGuard],
  imports: [
    CommonModule,
    GlowDirectiveModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
  ],
})
export class MovieListModule {}
