import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { backgroundModule } from 'src/app/SharedModule/background/backgroundModule.module';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';

// $ Components
import { LoginComponent } from './pages/login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    backgroundModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginModule { }
