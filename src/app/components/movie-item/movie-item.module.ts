import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlowDirectiveModule } from 'src/app/glow-directive/glow-directive.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CommonModule,
    GlowDirectiveModule,
    MatProgressSpinnerModule
  ],
})
export class MovieListModule {}
