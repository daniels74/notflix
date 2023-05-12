import { NgModule } from '@angular/core';
import { BackgroundComponent } from './components/background/background.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';

@NgModule({
  declarations: [BackgroundComponent],
  exports: [BackgroundComponent],
})
export class SharedModule {}
