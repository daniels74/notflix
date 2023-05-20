import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/SharedModule.module';
import { MovieListGuard } from 'src/app/guards/movie-list.guard';
import { RouterModule, Routes } from '@angular/router';

// // Components
import { MovieItemComponent } from 'src/app/components/movie-item/movie-item.component';
import { MovieListComponent } from './movie-list.component';
import { GlowDirectiveModule } from 'src/app/glow-directive/glow-directive.module';

const routes: Routes = [
  { path: '', canActivate: [MovieListGuard], component: MovieListComponent },
];
@NgModule({
  declarations: [MovieListComponent, MovieItemComponent],
  providers: [MovieListGuard],
  imports: [
    CommonModule,
    // MovieListRoutingModule,
    SharedModule,
    GlowDirectiveModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MovieListModule {}
