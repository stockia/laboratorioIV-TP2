export interface Patient {
    nombre: string;
    apellido: string;
    edad: number;
    dni: string;
    obraSocial: string;
    mail: string;
    contrasena: string;
    imagenesPerfil: string[]; // Array para las 2 imágenes
}