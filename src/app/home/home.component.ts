
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator, phoneNumberValidator } from '../validators-utils';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'test-app';
  userForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);

  constructor(private router: Router) {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, phoneNumberValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(/.*[0-9].*/),
          Validators.pattern(/.*[!@#$%^&*].*/)
        ]
      ],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
    });
  }
  next(){
    this.router.navigate(['/dynamic'])
  }
}
