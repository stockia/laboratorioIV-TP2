import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class HealthInsuranceValidator {
    static validatorHealthInsurance(isPatient: boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const entityType = isPatient ? 'patient' : 'specialist';
            const healthInsurance = control.value;
            return HealthInsuranceValidator.validateHealthInsurance(entityType, healthInsurance) ? null : { invalidHealthInsurance: true };
        };
    }

    static validateHealthInsurance(entityType: string, healthInsurance: string): boolean {
        debugger;
        if (entityType === 'patient') {
            return healthInsurance !== '';
        } else if (entityType === 'specialist') {
            return true;
        }
        return false;
    }
}
