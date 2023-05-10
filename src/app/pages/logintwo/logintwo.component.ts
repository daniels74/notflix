import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-logintwo',
  templateUrl: './logintwo.component.html',
  styleUrls: ['./logintwo.component.scss']
})

export class LogintwoComponent {

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }


  form: FormGroup;
  customErrorStateMatcher = new ErrorStateMatcher();
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });
  }
}
