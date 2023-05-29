import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/CoreModule/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  
  authState = this.authService.authenticationState;

  firstFormGroup!: FormGroup;

  secondFormGroup!: FormGroup;

  selectedPlan!: string;

  largeForm = this.authState ? true : false;
  plans = ['Basic', 'Standard', 'Premium'];
  prices = ['$9.99', '$15.49', '$19.99'];
  qualities = ['Good', 'Better', 'Best'];
  resolutions = ['480p', '1080p', '4k + HDR'];
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

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]), //['', [Validators.required.Validators.email],

      password: new FormControl('', [Validators.required]),
    });

    this.secondFormGroup = this._formBuilder.group({
      username: new FormControl('', [Validators.required]),

      tmdb_key: new FormControl('', [Validators.required]),
    });
  }

  expandForm(decide: boolean) {
    this.largeForm = decide;
  }

  selectPlan(planIndex: number) {
    this.selectedIndex = planIndex;
    if (planIndex === 0) {
      this.selectedPlan = 'USER';
    } else if (planIndex === 1) {
      this.selectedPlan = 'SUPERUSER';
    } else if (planIndex === 2) {
      this.selectedPlan = 'ADMIN';
    }
  }

  submit() {
    // Update user role
    if (this.authState === true) {
      const currentRole = this.authService.userRole;
      if (this.selectedIndex === 2) {
        if (currentRole === 'admin') {
          console.log('User has max role !');
        } else {
          this.authService.updateUserRole_Manualy('admin');
//          this.authService.updateUserInfo();
        }
      } else if (this.selectedIndex === 1) {
        console.log('No role effect');
      }
    }
    // Submit full form
    else {

      let fullForm = {
        username: this.secondFormGroup.value.username,
        password: this.firstFormGroup.value.password,
        email: this.firstFormGroup.value.email,
        role: this.selectedPlan,
        tmdb_key: this.secondFormGroup.value.tmdb_key,
      };

      const userRes = this.authService.registerUser(fullForm);

      userRes.subscribe((response) => {
  
        // Gain access to key names
        const userString = JSON.stringify(response); 
        const userObject = JSON.parse(userString);
          
        const userToken = userObject.accessToken;
    
        // Store token  & Get authorizations from token
        this.authService.tokenPermissions(userToken);
       
        });
    }
  }
}
