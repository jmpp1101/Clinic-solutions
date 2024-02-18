class Turno {
    // Constructor
    constructor(medico, paciente, fecha, hora) {
        this.medico = medico;
        this.paciente = paciente;
        this.fecha = fecha;
        this.hora = hora;
    }

    // Métodos GET/SET
    get verMedico() {
        return this.medico;
    }
    get verPaciente() {
        return this.paciente;
    }
    get verFecha() {
        return this.fecha;
    }
    get verHora() {
        return this.hora;
    }

    set asignarMedico(medico) {
        this.medico = medico;
    }
    set asignarPaciente(paciente) {
        this.paciente = paciente;
    }
    set asignarFecha(fecha) {
        this.fecha = fecha;
    }
    set asignarHora(hora) {
        this.hora = hora;
    }
}