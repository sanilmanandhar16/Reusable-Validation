import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../validation.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'test-app';
  userForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private validationService: ValidationService 
  ) {
    const usedEmails = ['sanil@gmail.com', 'ram@gmail.com'];
    const usedNames = ['Sanil', 'Ram'];

    this.userForm = this.fb.group({
      username: [
        '', 
        [Validators.required, validationService.usernameValidator],
        [this.validationService.usernameAsyncValidator(usedNames)]],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.validationService.emailAsyncValidator(usedEmails)], 
      ],

      phone: ['', [Validators.required, this.validationService.phoneNumberValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.pattern(/.*[0-9].*/),
          Validators.pattern(/.*[!@#$%^&*].*/),
          this.validationService.passwordUppercaseLowercaseValidator,
        ],
      ],
      confirmPassword: ['', [Validators.required, this.validationService.confirmPasswordValidator]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.userForm.setValidators(
      this.validationService.dateRangeValidator('startDate', 'endDate')
    );
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

