
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ageRangeValidator, customValidators, phoneNumberValidator } from '';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  userForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);

  constructor(private router: Router) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      // phone: ['', [Validators.required, phoneNumberValidator]],
      gender: [false, Validators.requiredTrue],
      // age: ['', [Validators.required, ageRangeValidator(18, 99)]],

    });
  }
}
