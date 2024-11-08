import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class NameValidator {
    static validatorName(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const name = control.value;
            return NameValidator.validateName(name) ? null : { invalidName: true };
        };
    }

    static validateName(name: string): boolean {
        return /^[A-Za-z]{2,}(?: [A-Za-z]+)*$/.test(name);
    }
}
