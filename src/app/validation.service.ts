import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {

    getValidatorErrorMessage = (validatorName: string, validatorErrors?: ValidationErrors): string | undefined => {
        const messageConfig = this.messages.get(validatorName);
        if (messageConfig) {
            const args = messageConfig.validatorErrorsKey?.map(name => validatorErrors?.[name]);
            return args ? this.stringFormat(messageConfig.message, ...args) : messageConfig.message;
        }
        return undefined;
    };

    messages = new Map<string, { message: string, validatorErrorsKey?: string[] }>([
        ['required', { message: 'This field is required' }],
        ['invalidUsername', { message: 'First Letter must be capital and contain only letters' }],
        ['minlength', { message: 'Password must be at least {0} characters long', validatorErrorsKey: ['requiredLength'] }],
        ['maxlength', { message: 'Password cannot be more than {0} characters long', validatorErrorsKey: ['requiredLength'], }],
        ['email', { message: 'Please enter valid email' }],
        ['pattern', { message: 'Password must have at least one number and one symbol' }],
        ['patternPhoneNumber', { message: 'Phone number must be exactly 10 digits long' }],
        ['requiredTrue', { message: 'Gender must be selected' }],
        ['passwordMismatch', { message: 'Passwords do not match' }],
        ['passwordUppercaseLowercase', { message: 'Password must contain both uppercase and lowercase letters' }],
        ['ageRange', { message: 'Age must be between 18 and 99', validatorErrorsKey: ['min', 'max'] }],
        ['emailTaken', { message: 'Email already Exists' }],
        ['usernameTaken', { message: 'Username already Exists' }],
        ['invalidDateRange', { message: 'End date must be selected after start date' }],

    ]);

    private stringFormat(template: string | undefined, ...args: any[]) {
        if (template) {
            return template.replace(/{(\d+)}/g, (match, index) => {
                return typeof args[index] !== 'undefined'
                    ? args[index]
                    : match;
            });
        }
        return undefined;
    }

    customValidators = {
        patternPhoneNumber: /^[0-9]{10}$/,
        dateRangeValidator: () => this.dateRangeValidator,
        validEmailPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    };


    emailValidator = (control: FormControl): ValidationErrors | null => {
        const value = control.value;
        if (!value || !!this.customValidators.validEmailPattern.test(value)) {
            return { 'email': true };
        }
        return null;
    };

    usernameValidator(control: FormControl): ValidationErrors | null {
        const value = control.value;
        if (!value) {
            return { 'required': true };
        }
        if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
            return { 'invalidUsername': true };
        }
        return null;
    };


    usernameAsyncValidator(existingNames: string[]): (control: FormControl) => Observable<ValidationErrors | null> {
        return (control: FormControl): Observable<ValidationErrors | null> => {
            return of(control.value).pipe(
                map(username => {
                    if (existingNames.includes(username)) {
                        return { 'usernameTaken': true };
                    }
                    return null;
                })
            )
        }
    }

    dateRangeValidator(controlName1: string, controlName2: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const control1 = formGroup.get(controlName1);
            const control2 = formGroup.get(controlName2);

            if (control1 && control2) {
                const startDate = control1.value;
                const endDate = control2.value;

                if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
                    control2.setErrors({ 'invalidDateRange': true });
                } else {
                    control2.setErrors(null);
                }
            }
            return null;
        };
    }

    passwordUppercaseLowercaseValidator(control: FormControl): ValidationErrors | null {
        const password = control.value;
        if (password && !/[a-z]/.test(password)) {
            return { 'passwordUppercaseLowercase': true };
        }
        if (password && !/[A-Z]/.test(password)) {
            return { 'passwordUppercaseLowercase': true };
        }
        return null;
    }

    phoneNumberValidator(control: FormControl): ValidationErrors | null {
        if (control.value && control.value.length != 10) {
            return { 'patternPhoneNumber': true };
        }
        return null;
    }

    ageRangeValidator(min: number, max: number) {
        return (control: FormControl): ValidationErrors | null => {
            const age = +control.value;
            if (age < min || age > max) {
                return { 'ageRange': true };
            }
            return null;
        };
    }

    confirmPasswordValidator(control: FormControl): ValidationErrors | null {
        const form = control.parent as FormGroup;
        if (form) {
            const passwordControl = form.get('password');
            if (passwordControl && control.value !== passwordControl.value) {
                return { 'passwordMismatch': true };
            }
        }
        return null;
    }


    emailAsyncValidator(existingEmails: string[]): (control: FormControl) => Observable<ValidationErrors | null> {
        return (control: FormControl): Observable<ValidationErrors | null> => {
            return of(control.value).pipe(
                map(email => {
                    if (existingEmails.includes(email)) {
                        console.log('Email exists:', email);
                        return { 'emailTaken': true };
                    }
                    return null;
                })
            );
        };
    }
}






