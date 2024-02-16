import { PERFIL } from "../modelos/PERFIL";

function validarFormulario(tipo) {
    let form;
    if (tipo === 'paciente') {
        form = document.getElementById('formPac');
    } else if (tipo === 'medico') {
        form = document.getElementById('formMed');
    }

    let campos = form.querySelectorAll('input, select');
    let valido = true;

    for (let i = 0; i < campos.length; i++) {
        if (!campos[i].checkValidity()) {
            valido = false;
            mostrarMensajeError(campos[i].validationMessage);
            break;
        }
    }

    if (valido) {
        // Aquí iría el código para registrar al usuario
        alert('Usuario registrado correctamente.');
        return true;
    } else {
        return false;
    }
}

function mostrarMensajeError(mensaje) {
    alert(mensaje);
}
