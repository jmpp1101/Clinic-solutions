document.addEventListener('DOMContentLoaded', function () {
    // Cargar médicos desde el almacenamiento local al select
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const selectMedico = document.getElementById('selectMedico');
    medicos.forEach(medico => {
        const option = document.createElement('option');
        option.textContent = `${medico.nombre} ${medico.apellido} - ${medico.especialidad}`;
        option.value = medico.matricula;
        selectMedico.appendChild(option);
    });

    // Obtener datos del paciente logeado (supongamos que está almacenado en localStorage)
    const pacienteLogeado = JSON.parse(localStorage.getItem('pacienteLogeado'));
    document.getElementById('inputPaciente').value = `${pacienteLogeado.nombre} ${pacienteLogeado.apellido}`;

    // Agregar evento de cambio al select de médico para cargar las horas disponibles
    selectMedico.addEventListener('change', function () {
        const medicoSeleccionado = medicos.find(medico => medico.matricula === selectMedico.value);
        const selectHora = document.getElementById('selectHora');
        selectHora.innerHTML = ''; // Limpiar opciones anteriores
        medicoSeleccionado.horario.forEach(hora => {
            const option = document.createElement('option');
            option.textContent = hora;
            option.value = hora;
            selectHora.appendChild(option);
        });
    });

    // Agregar evento de submit al formulario
    document.getElementById('formAgregarTurno').addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener valores del formulario
        const medicoSeleccionado = medicos.find(medico => medico.matricula === selectMedico.value);
        const paciente = pacienteLogeado;
        const fecha = document.getElementById('inputFecha').value;
        const hora = document.getElementById('selectHora').value;

        // Validar que los campos no estén vacíos y que la fecha y hora sean válidas
        if (!medicoSeleccionado || fecha === '' || hora === '') {
            mostrarMensaje('Por favor complete todos los campos.', 'alert-danger');
            return;
        }

        // Realizar la validación en el controlador de turnos
        const resultadoValidacion = turnoController.validarTurno(medicoSeleccionado, fecha, hora);
        if (resultadoValidacion === 'ocupado') {
            mostrarMensaje('Ya hay un turno reservado para esta fecha y hora para este médico.', 'alert-danger');
            return;
        } else if (resultadoValidacion === 'fueraDeHorario') {
            mostrarMensaje('El médico no atiende en este horario.', 'alert-warning');
            return;
        }

        // Agregar turno utilizando el controlador
        const resultadoAgregarTurno = turnoController.agregarTurno(medicoSeleccionado, paciente, fecha, hora);
        if (resultadoAgregarTurno === 'agregado') {
            mostrarMensaje('Turno agregado correctamente.', 'alert-success');
        } else {
            mostrarMensaje('Hubo un problema al agregar el turno.', 'alert-danger');
        }

        // Limpiar el formulario después de agregar el turno
        document.getElementById('formAgregarTurno').reset();
    });

    // Función para mostrar un mensaje en la interfaz
    function mostrarMensaje(mensaje, clase) {
        const divMensaje = document.createElement('div');
        divMensaje.className = `alert ${clase} mt-3`;
        divMensaje.textContent = mensaje;
        document.querySelector('.container').insertBefore(divMensaje, document.querySelector('.row'));

        // Desaparecer el mensaje después de 3 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
});