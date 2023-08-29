import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { getValidatorErrorMessage } from '../validators-utils';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent {
  @Input() control!: AbstractControl;
  @Input() validationMessage: string | undefined;

  get errorMessage() {
    if (this.control && this.control.touched) {
      for (const validatorName in this.control.errors) {
        return getValidatorErrorMessage(
          validatorName,
          this.control.errors[validatorName]
        );
      }
    }
    return this.validationMessage || null;
  }
}




