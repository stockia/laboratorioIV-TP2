import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AgeValidator {
    static validatorAge(isPatient: boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const entityType = isPatient ? 'patient' : 'specialist';
            const age = control.value;
            return AgeValidator.validateAge(entityType, age) ? null : { invalidAge: true };
        };
    }

    static validateAge(entityType: string, age: number): boolean {
        if (entityType === 'patient') {
            return age >= 18 && age <= 100;
        } else if (entityType === 'specialist') {
            return age >= 22 && age <= 75;
        }
        return false;
    }
}
