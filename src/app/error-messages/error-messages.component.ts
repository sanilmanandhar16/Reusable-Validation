import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from '../validation.service'; 

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent {
  @Input() control!: AbstractControl;
  @Input() validationMessage: string | undefined;

  constructor(private validationService: ValidationService) {}

  get errorMessage() {
    if (this.control && this.control.touched) {
      for (const validatorName in this.control.errors) {
        const validatorError = this.control.errors[validatorName];
        const errorMessage = this.validationService.getValidatorErrorMessage(
          validatorName,
          validatorError
        );
        return errorMessage;
      }
    }
    return this.validationMessage || null;
  }
}
