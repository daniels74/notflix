import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlowDirectiveModule } from 'src/app/SharedModule/glow-directive/glow-directive.module';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GlowDirectiveModule,
    NgxSpinnerModule,
  ],
})
export class MovieListModule {}
