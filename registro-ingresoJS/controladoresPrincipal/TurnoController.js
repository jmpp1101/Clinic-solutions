class TurnoController {
    constructor() {
        // Inicializar el array de turnos desde el almacenamiento local, si existe
        this.turnos = JSON.parse(localStorage.getItem('turnos')) || [];
    }

    // Método para agregar un turno, verificando disponibilidad de fecha y hora para el médico especificado
    agregarTurno(medico, paciente, fecha, hora) {
        const turnoExistente = this.turnos.find(turno => turno.medico.matricula === medico.matricula && turno.fecha === fecha && turno.hora === hora);
        if (turnoExistente) {
            return 'ocupado';
        }

        // Verificar si el médico atiende en el horario seleccionado
        if (!medico.horario.includes(hora)) {
            return 'fueraDeHorario';
        }

        // Si no hay un turno existente y el médico está disponible, agregar el nuevo turno
        const turno = new Turno(medico, paciente, fecha, hora);
        this.turnos.push(turno);
        this.guardarTurnosEnLocalStorage();
        return 'agregado';
    }

    // Método para validar la disponibilidad de un turno para el médico especificado
    validarTurno(medico, fecha, hora) {
        const turnoExistente = this.turnos.find(turno => turno.medico.matricula === medico.matricula && turno.fecha === fecha && turno.hora === hora);
        if (turnoExistente) {
            return 'ocupado';
        }

        // Verificar si el médico atiende en el horario seleccionado
        if (!medico.horario.includes(hora)) {
            return 'fueraDeHorario';
        }

        return 'disponible';
    }

    // Método para obtener todos los turnos
    obtenerTurnos() {
        return this.turnos;
    }

    // Método para obtener los turnos de un médico específico
    obtenerTurnosMedico(medico) {
        return this.turnos.filter(turno => turno.medico.matricula === medico.matricula);
    }

    // Método para guardar los turnos en el almacenamiento local
    guardarTurnosEnLocalStorage() {
        localStorage.setItem('turnos', JSON.stringify(this.turnos));
    }
}
