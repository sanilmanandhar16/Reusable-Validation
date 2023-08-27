import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, delay, map, of } from "rxjs";


export const getValidatorErrorMessage = (validatorName: string, validatorErrors?: ValidationErrors): string | undefined => {
  const messageConfig = messages.get(validatorName);
  if (messageConfig) {
      const args = messageConfig.validatorErrorsKey?.map(name => validatorErrors?.[name]);
      return args ? stringFormat(messageConfig.message, ...args) : messageConfig.message;
  }
  return undefined;
};


const messages = new Map<string, { message: string, validatorErrorsKey?: string[] }>([
    ['required', { message: 'This field is required' }],
    ['invalidUsername', {message: 'First Letter must be capital and contain only letters'}],
    ['minlength', { message: 'Password must be at least {0} characters long', validatorErrorsKey: ['requiredLength'] }],
    ['maxlength', { message: 'Password cannot be more than {0} characters long', validatorErrorsKey: ['requiredLength'], }],
    ['email', { message: 'Please enter valid email' }],
    ['pattern', { message: 'Password must have at least one number and one symbol' }],
    ['patternPhoneNumber', { message: 'Phone number must be exactly 10 digits long' }],
    ['requiredTrue', { message: 'Gender must be selected' }],
    ['passwordMismatch', { message: 'Passwords do not match' }],
    ['passwordUppercaseLowercase', { message: 'Password must contain both uppercase and lowercase letters' }],
    ['ageRange', { message: 'Age must be between 18 and 99', validatorErrorsKey: ['min', 'max'] }],
    ['emailTaken', {message: 'Email already Exists'}],
    ['usernameTaken', {message:'Username already Exists'}],
    ['invalidDateRange', { message: 'End date must be after start date' }], 
  
]);

function stringFormat(template: string | undefined, ...args: any[]) {
    if (template) { 
        return template.replace(/{(\d+)}/g, (match, index) => {
            return typeof args[index] !== 'undefined'
                ? args[index]
                : match;
        });
    }
    return undefined;
}


export function usernameValidator (control: FormControl): ValidationErrors | null  {
      const value = control.value;
      
    if (!value) {
        return { 'required': true };
      }
     if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
        return { 'invalidUsername': true };
      }
  
      return null;
    };
  

export const customValidators = {
    patternPhoneNumber: /^[0-9]{10}$/,
    dateRangeValidator: dateRangeValidator
  
};

export function dateRangeValidator() {
  return (control: FormControl): ValidationErrors | null => {

    const from = control.get("startDate")?.value;
    const to = control.get("endDate")?.value;

    if (from && to && new Date(from) > new Date(to)) {
      return { invalidDateRange: true };
    }
    return null;
  };
}
export function ageRangeValidator(min: number, max: number) {
    return (control: FormControl): ValidationErrors | null => {
      const age = +control.value;
      if (age < min || age > max) {
        return { 'ageRange': true };
      }
      return null;
    };
  }

  export function passwordUppercaseLowercaseValidator(control: FormControl): ValidationErrors | null {
    const password = control.value;
    if (password && !/[a-z]/.test(password)) {
      return { 'passwordUppercaseLowercase': true };
    }
    if (password && !/[A-Z]/.test(password)) {
      return { 'passwordUppercaseLowercase': true };
    }
    return null;
  }
  
export function confirmPasswordValidator(control: FormControl): ValidationErrors | null {
    const form = control.parent as FormGroup;
    if (form) {
        const passwordControl = form.get('password');
        if (passwordControl && control.value !== passwordControl.value) {
            return { 'passwordMismatch': true };
        }
    }
    return null;
}
export function phoneNumberValidator(control: FormControl): ValidationErrors | null {
    if (control.value && control.value.length != 10) {
        return { 'patternPhoneNumber': true };
    }
    return null;
}

export function emailAsyncValidator(existingEmails: string[]): (control: FormControl) => Observable<ValidationErrors | null> {
    return (control: FormControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(

        map(email => {
          console.log('Checking email:', email); 
          if (existingEmails.includes(email)) {
            console.log('Email exists:', email); 
            return { 'emailTaken': true };
          }
          console.log("Email doesnot Exist")
          return null;
        })
      );
    };
  }
  
  export function usernameAsyncValidator(existingNames: string[]): (control: FormControl) => Observable <ValidationErrors | null>{
    return (control: FormControl): Observable<ValidationErrors | null> =>{
        return of (control.value).pipe(
            delay(1000),
            map(username =>{
                console.log('Checking user name: ', username)
                if(existingNames.includes(username)){
                    console.log('Username Exists: ', username);
                    return{ 'usernameTaken': true};
                }
                return null;
            })
        )
    }
  }

  // export function dateRangeValidator(control: FormGroup): ValidationErrors | null {
  //   const startDate = control.get('startDate')?.value;
  //   const endDate = control.get('endDate')?.value;
  
  //   if (startDate && endDate && startDate > endDate) {
  //     return { 'invalidDateRange': true };
  //   }
  
  //   return null;
  // }