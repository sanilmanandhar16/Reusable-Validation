import { FormControl, ValidationErrors } from "@angular/forms";

export const getValidatorErrorMessage = (validatorName: string, validatorErrors?: ValidationErrors): string | undefined => {
    let args = messages.get(validatorName)?.validatorErrorsKey?.map(name => validatorErrors?.[name]);
    return (args) ? stringFormat(messages.get(validatorName)?.message, ...args) : messages.get(validatorName)?.message;
}

const messages = new Map<string, { message: string, validatorErrorsKey?: string[] }>([
    ['required', { message: 'This field is required' }],
    ['minlength', { message: 'Password must be at least {0} characters long', validatorErrorsKey: ['requiredLength'] }],
    ['maxlength', { message: 'Password cannot be more than {0} characters long', validatorErrorsKey: ['requiredLength'], }],
    ['email', { message: 'Email must be a valid email address' }],
    ['pattern', { message: 'Password must have at least one number and one symbol' }],
    ['patternPhoneNumber', { message: 'Phone number must be exactly 10 digits long' }],
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

export const customValidators = {
    patternPhoneNumber: /^[0-9]{10}$/
};

export function phoneNumberValidator(control: FormControl): ValidationErrors | null {
    // !customValidators.patternPhoneNumber.test(control.value)
    if (control.value && control.value.length != 10) {
        return { 'patternPhoneNumber': true };
    }
    return null;
}