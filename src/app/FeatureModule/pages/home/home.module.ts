import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { backgroundModule } from 'src/app/SharedModule/background/backgroundModule.module';
import { RouterModule, Routes } from '@angular/router';

// $ Components
import { HomeComponent } from './pages/home.component';


const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    backgroundModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeModule { }
