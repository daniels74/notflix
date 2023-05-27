import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Components
import { MovieItemComponent } from 'src/app/FeatureModule/pages/movie-list/components/movie-item/movie-item.component';
import { MovieListComponent } from './pages/movie-list.component';
// Resources
import { GlowDirectiveModule } from 'src/app/SharedModule/glow-directive/glow-directive.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { backgroundModule } from 'src/app/SharedModule/background/backgroundModule.module';
import { MovieListGuard } from 'src/app/SharedModule/guards/movie-list.guard';

const routes: Routes = [
  { path: '', canActivate: [MovieListGuard], component: MovieListComponent },
];
@NgModule({
  declarations: [MovieListComponent, MovieItemComponent],
  providers: [MovieListGuard],
  imports: [
    CommonModule,
    backgroundModule,
    GlowDirectiveModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MovieListModule {}
