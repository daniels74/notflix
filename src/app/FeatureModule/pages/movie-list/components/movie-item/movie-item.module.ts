import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlowDirectiveModule } from 'src/app/SharedModule/glow-directive/glow-directive.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CommonModule,
    GlowDirectiveModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    // BrowserAnimationsModule
  ],
})
export class MovieListModule {}
