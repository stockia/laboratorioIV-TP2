import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class SpecialtyValidator {
    static validatorSpecialty(isSpecialist: boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const entityType = isSpecialist ? 'specialist' : 'patient';
            const specialty = control.value;
            return SpecialtyValidator.validateSpecialty(entityType, specialty) ? null : { invalidSpecialty: true };
        };
    }

    static validateSpecialty(entityType: string, specialty: string): boolean {
        if (entityType === 'patient') {
            return true;
        } else if (entityType === 'specialist') {
            return specialty !== '';
        }
        return false;
    }
}
