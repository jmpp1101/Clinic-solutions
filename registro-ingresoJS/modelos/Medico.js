import { ESPECIALIDADES } from '/especialidades.js';

class Medico extends Usuario{
    //Constructor
    constructor(nombre, apellido, dni, fechaNac, telefono, correo, contrasenia, matricula, especialidad){
        super(nombre, apellido, dni, fechaNac, telefono, correo, contrasenia);
        this.matricula = matricula;
        this.especialidad = especialidad;
        this.horario = ['8', '9', '10'];
    }

    //Métodos
    //Métodos GET/SET
    get verMatricula(){
        return this.matricula;
    }
    get verEspecialidad(){
        return this.especialidad;
    }

    set asignarMatricula(matricula){
        this.matricula = matricula;
    }
    set asignarEspecialidad(especialidad){
        this.especialidad = especialidad;
    }

    /**
     * Método que devuelve todos los turnos creados 
     * Se utiliza el patrón Singleton
     * @return turnos
     */
    
}