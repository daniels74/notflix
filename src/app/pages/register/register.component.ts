import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  title = 'newMat';

  isLinear = true;

  firstFormGroup!: FormGroup;

  secondFormGroup!: FormGroup;

  largeForm = false;

  plans = ["Basic", "Standard", "Premium"];

  prices = ["$9.99", "$15.49", "$19.99"];

  qualities = ["Good", "Better", "Best"];

  resolutions = ["480p", "1080p", "4k + HDR"];

  
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', Validators.nullValidator],

      password: ['', Validators.nullValidator],
    });

    this.secondFormGroup = this._formBuilder.group({
      username: ['', Validators.nullValidator],

      tmdb_key: ['', Validators.nullValidator],
    });
  }

  expandForm(decide : boolean){
    this.largeForm = decide; 
  }

  submit() {
    console.log(this.firstFormGroup.value);

    console.log(this.secondFormGroup.value);
  }
}
