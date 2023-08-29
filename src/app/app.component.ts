import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { phoneNumberValidator } from './validators-utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-app';
  userForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      // phone: ['', [Validators.required, phoneNumberValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(/.*[0-9].*/),
          Validators.pattern(/.*[!@#$%^&*].*/)
        ]
      ]
    });
  }
}
