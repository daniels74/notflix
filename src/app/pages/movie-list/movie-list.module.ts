import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieListComponent } from './movie-list.component';
import { SharedModule } from 'src/app/SharedModule.module';
import { MovieItemComponent } from 'src/app/components/movie-item/movie-item.component';


@NgModule({
  declarations: [
    MovieListComponent,
    MovieItemComponent
  ],
  imports: [
    CommonModule,
    MovieListRoutingModule,
    SharedModule
  ]
})
export class MovieListModule { }
