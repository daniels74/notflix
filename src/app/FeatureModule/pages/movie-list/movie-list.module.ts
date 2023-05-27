import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { backgroundModule } from 'src/app/SharedModule/background/backgroundModule.module';
import { MovieListGuard } from 'src/app/SharedModule/guards/movie-list.guard';
import { RouterModule, Routes } from '@angular/router';

// // Components
import { MovieItemComponent } from 'src/app/FeatureModule/pages/movie-list/components/movie-item/movie-item.component';
import { MovieListComponent } from './pages/movie-list.component';
import { GlowDirectiveModule } from 'src/app/SharedModule/glow-directive/glow-directive.module';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';


const routes: Routes = [
  { path: '', canActivate: [MovieListGuard], component: MovieListComponent },
];


@NgModule({
  declarations: [MovieListComponent, MovieItemComponent],
  // declarations: [MovieListComponent],
  providers: [MovieListGuard],
  imports: [
    CommonModule,
    // MovieListRoutingModule,
    backgroundModule,
    GlowDirectiveModule,
    // MatProgressSpinnerModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MovieListModule {}
