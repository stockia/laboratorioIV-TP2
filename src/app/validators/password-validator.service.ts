import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
    static validatePassword(control: AbstractControl): ValidationErrors | null {
        const password = control.value;
        const minLength = 6;
        const hasSpaces = /\s/.test(password);
        
        if (password.length < minLength || hasSpaces) {
            return { invalidPassword: true };
        }

        return null;
    }
}
