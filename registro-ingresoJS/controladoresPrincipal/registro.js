import { GestorUsuarios } from "../modelos/GestorUsuarios";
import { PERFIL } from "../modelos/PERFIL";

// Instancio GestorUsuarios
let gestor = GestorUsuarios.instanciar();

// Función para obtener los valores del formulario según el título de la página
function obtenerDatosSegunTitulo() {
    // Obtener el título h2 de la página actual
    let tituloPagina = document.querySelector("h2.subtitle").textContent;

    // Dependiendo del título de la página, obtener los valores de los campos del formulario
    switch (tituloPagina) {
        case "Registro de Pacientes":
            // Obtener los valores del formulario de registro de pacientes
            let apellido = document.getElementById("apellido").value;
            let nombre = document.getElementById("nombre").value;
            let dni = document.getElementById("dni").value;
            let fechaNac = document.getElementById("fechaNac").value;
            let obraSocial = document.getElementById("obraSocial").value;
            let numAfil = document.getElementById("numAfil").value;
            let telefono = document.getElementById("contacto").value;
            let correo1 = document.getElementById("correo1").value;
            let correo2 = document.getElementById("correo2").value;
            let contra1 = document.getElementById("contra1").value;
            let contra2 = document.getElementById("contra2").value;
            let perfil = PERFIL.PACIENTE;



            break;
        case "Registro del Personal Médico":
            // Obtener los valores del formulario de registro del personal médico
            let apellidoM = document.getElementById("apellidoM").value;
            let nombreM = document.getElementById("nombreM").value;
            let dniM = document.getElementById("dniM").value;
            let fechaNacM = document.getElementById("fechaNacM").value;
            let matriculaM = document.getElementById("matriculaM").value;
            let contactoM = document.getElementById("contactoM").value;
            let correo1M = document.getElementById("correo1M").value;
            let correo2M = document.getElementById("correo2M").value;
            let contra1M = document.getElementById("contra1M").value;
            let contra2M = document.getElementById("contra2M").value;

            // Creo usuario con la función del gestor y los datos obtenidos del formulario
            let nuevoUsuario = gestor.crearUsuario(PERFIL.MEDICO, nombreM, apellidoM, dniM, fechaNacM, contactoM, correo1M, contra1M, contra2M, matriculaM, extra2);

            break;
        default:
            console.log("Título de página no reconocido");
    }
}

// Detectar el cambio de página y llamar a la función para obtener los datos del formulario
window.addEventListener("load", obtenerDatosSegunTitulo);

// Creo usuario con la función del gestor y los datos obtenidos del formulario
let nuevoUsuario = gestor.crearUsuario(perfil, nombre, apellido, dni, fechaNac, telefono, correo, contra, contraRep, extra1, extra2);

// Agrego el nuevo usuario la lista de pendientes
GestorUsuarios.usuariosPendientes.push(nuevoUsuario);

// Envío confirmación de creación de usuario
if (nuevoUsuario === 'EXITO') {
    alert('Gracias por registrarte. Pronto te informaremos cuando puedas ingresar a la web. Primero revisaremos tus datos.\nClinic Solutions');
} else {
    alert('Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.');
}
