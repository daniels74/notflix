import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  isLinear = true;

  firstFormGroup!: FormGroup;

  secondFormGroup!: FormGroup;

  largeForm = false;

  plans = ["Basic", "Standard", "Premium"];

  prices = ["$9.99", "$15.49", "$19.99"];

  qualities = ["Good", "Better", "Best"];

  resolutions = ["480p", "1080p", "4k + HDR"];

  selectedIndex = 0;

  get email(): FormControl {
    return this.firstFormGroup.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.firstFormGroup.get('password') as FormControl;
  }

  get username(): FormControl {
    return this.secondFormGroup.get('username') as FormControl;
  }

  get tmdb_key(): FormControl {
    return this.secondFormGroup.get('tmdb_key') as FormControl;
  }
  
  constructor(private _formBuilder: FormBuilder, private registerService : AuthService) {}

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      email: new FormControl ('', [Validators.required, Validators.email]),//['', [Validators.required.Validators.email],

      password: new FormControl ('', [Validators.required]),
    });

    this.secondFormGroup = this._formBuilder.group({
      username: new FormControl ('', [Validators.required]),

      tmdb_key: new FormControl ('', [Validators.required]),
    });
  }

  expandForm(decide : boolean){
    this.largeForm = decide; 
  }

  selectPlan(planIndex: number) {
    this.selectedIndex = planIndex;
  }
  
  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);

    // let fullForm = {
    //   "email" : this.firstFormGroup.value.email,
    //   "password" : this.firstFormGroup.value.password,
    //   "username" : this.secondFormGroup.value.username,
    //   "tmbd_key" : this.secondFormGroup.value.tmbd_key
    // }

    //this.registerService.registerUser(fullForm).subscribe();
  }
}
