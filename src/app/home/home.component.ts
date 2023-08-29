import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  confirmPasswordValidator,
  phoneNumberValidator,
  usernameValidator,
  passwordUppercaseLowercaseValidator,
  emailAsyncValidator,
  usernameAsyncValidator,
  dateRangeValidator,
} from '../validators-utils';

import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'test-app';
  userForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);

  constructor(private router: Router) {
    const usedEmails = ['sanil@gmail.com', 'ram@gmail.com'];
    const usedNames = ['Sanil', 'Ram'];

    this.userForm = this.fb.group({
      username: ['', [usernameValidator], [usernameAsyncValidator(usedNames)]],
      email: [
        '',
        [Validators.required, Validators.email],
        [emailAsyncValidator(usedEmails)],
      ],

      phone: ['', [Validators.required, phoneNumberValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(/.*[0-9].*/),
          Validators.pattern(/.*[!@#$%^&*].*/),
          passwordUppercaseLowercaseValidator,
        ],
      ],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.userForm.setValidators(dateRangeValidator('startDate', 'endDate'));
  }

  get usernameValidationMessage(): string | undefined {
    const usernameControl = this.userForm.get('username');
    if (usernameControl && usernameControl.touched) {
      const username = usernameControl.value;
      if (username.length <= 2) {
        return 'The entered username is too short.';
      }
    }
    return undefined;
  }


  onSubmit() {
    if (this.userForm.valid) {
    } else {
      Object.values(this.userForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  next() {
    this.router.navigate(['/dynamic']);
  }
}
