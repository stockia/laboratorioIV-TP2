import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class IdValidator {
    static validatorId(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const id = control.value;
            return IdValidator.validateId(id) ? null : { invalidId: true };
        };
    }

    static validateId(id: string): boolean {
        return /^\d{7,8}$/.test(id);
    }
}
