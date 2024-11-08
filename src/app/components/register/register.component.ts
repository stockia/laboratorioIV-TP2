import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Patient } from '../../interfaces/Patient';
import { Specialist } from '../../interfaces/Specialist';
import { NameValidator } from '../../validators/name-validator.service';
import { AgeValidator } from '../../validators/age-validator.service';
import { PasswordValidator } from '../../validators/password-validator.service';
import { IdValidator } from '../../validators/id-validator.service';
import { HealthInsuranceValidator } from '../../validators/healthInsurance-validator.service';
import { SpecialtyValidator } from '../../validators/speciality-validator.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  formError: boolean = false;
  isLoading: boolean = false;
  isPatient: boolean = false; // Inicialmente no es paciente
  isSpecialist: boolean = false; // Inicialmente no es especialista
  entitySelected: boolean = false; // Para controlar si se ha seleccionado una entidad
  obraSocialError: boolean = false;
  specialtyError: boolean = false;

  constructor() {
    this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, NameValidator.validatorName()]),
      apellido: new FormControl('', [Validators.required, NameValidator.validatorName()]),
      edad: new FormControl('', [Validators.required, AgeValidator.validatorAge(this.isPatient)]),
      dni: new FormControl('', [Validators.required, IdValidator.validatorId()]),
      obraSocial: new FormControl('', [HealthInsuranceValidator.validatorHealthInsurance(this.isPatient)]),
      especialidad: new FormControl('', [SpecialtyValidator.validatorSpecialty(this.isSpecialist)]),
      mail: new FormControl('', Validators.required),
      contrasena: new FormControl('', [Validators.required, PasswordValidator.validatePassword]),
      imagenesPerfil: new FormControl(''),
      imagenPerfil: new FormControl(''),
    });
  }

  selectEntity(entity: string) {
    this.entitySelected = true;
    if (entity === 'patient') {
      this.isPatient = true;
      this.isSpecialist = false;
    } else {
      this.isPatient = false;
      this.isSpecialist = true;
    }
  }

  register() {
    let registroData: Patient | Specialist; // Definir el tipo de registroData
    const entitySelected = this.isPatient ? 'patient' : 'specialist';

    try {
      this.formError = false;
      if (this.validateForm(entitySelected)) {
        if (this.isPatient) {
          registroData = {
            nombre: this.registerForm.value.nombre,
            apellido: this.registerForm.value.apellido,
            edad: this.registerForm.value.edad,
            dni: this.registerForm.value.dni,
            obraSocial: this.registerForm.value.obraSocial, // Campo obligatorio
            mail: this.registerForm.value.mail,
            contrasena: this.registerForm.value.contraseña,
            imagenesPerfil: this.registerForm.value.imagenesPerfil, // Campo obligatorio
          } as Patient;
        } else {
          const habilitado = false; // Habilitado es false si es especialista
          registroData = {
          nombre: this.registerForm.value.nombre,
          apellido: this.registerForm.value.apellido,
          edad: this.registerForm.value.edad,
          dni: this.registerForm.value.dni,
          especialidad: this.registerForm.value.especialidad, // Campo obligatorio
          mail: this.registerForm.value.mail,
          contrasena: this.registerForm.value.contraseña,
          imagenPerfil: this.registerForm.value.imagenPerfil, // Campo obligatorio
          habilitado: habilitado,
        } as Specialist;
        }
      } else {
        console.log('Error en el formulario');
        this.formError = true;
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      this.formError = true;
    }
  }

  validateForm(entity: string) {
    this.setSpecialFields(entity);
    if (this.registerForm.valid) {
      this.isLoading = true;
      if (entity === 'patient') {
        const hasImages = this.registerForm.value.imagenesPerfil.length > 0;
        const hasObraSocial = this.registerForm.value.obraSocial !== '';
        if (!hasImages || !hasObraSocial) {
          this.isLoading = false;
          this.touchAllFields();
          return false;
        }

        return true;
      } else {
        const hasImage = this.registerForm.value.imagenPerfil !== '';
        const hasSpecialty = this.registerForm.value.especialidad !== '';
        if (!hasImage || !hasSpecialty) {
          this.isLoading = false;
          this.touchAllFields();
          return false;
        }

        return true;
      }
    }
    this.touchAllFields();
    return false;
  }

  setSpecialFields(entity: string) {
    if (entity === 'patient') {
      this.registerForm.get('obraSocial')?.setValidators([Validators.required]);
      this.registerForm.get('obraSocial')?.updateValueAndValidity();
    } else {
      this.registerForm.get('obraSocial')?.clearValidators();
      this.registerForm.get('obraSocial')?.updateValueAndValidity();
    }

    // Validación para especialidad
    if (entity === 'specialist') {
      this.registerForm.get('especialidad')?.setValidators([Validators.required]);
      this.registerForm.get('especialidad')?.updateValueAndValidity();
    } else {
      this.registerForm.get('especialidad')?.clearValidators();
      this.registerForm.get('especialidad')?.updateValueAndValidity();
    }
  }

  touchAllFields() {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  getAgeErrorMessage() {
    if (this.isPatient) {
      return 'La edad debe estar entre 18 y 100 años';
    } else {
      return 'La edad debe estar entre 22 y 75 años';
    }
  }

  getPasswordErrorMessage() {
    return 'La contraseña debe tener al menos 6 caracteres y no debe contener espacios';
  }

  getIdErrorMessage() {
    return 'El DNI debe tener entre 7 y 8 dígitos';
  }

  getFirstNameErrorMessage() {
    return 'El nombre debe tener al menos 2 letras y no debe contener números o caracteres especiales';
  }

  getLastNameErrorMessage() {
    return 'El apellido debe tener al menos 2 letras y no debe contener números o caracteres especiales';
  }

  getHealthInsuranceErrorMessage() {
    return 'Campo requerido para pacientes';
  }

  getSpecialtyErrorMessage() {
    return 'Campo requerido para especialistas';
  }
}
