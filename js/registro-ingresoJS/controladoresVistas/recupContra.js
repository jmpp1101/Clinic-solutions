import { usuariosDefinitivosIniciales } from "../controladoresPrincipal/administrador.js";

let formRec = document.getElementById('formRec');
let contenedorMensaje = document.getElementById('contMensaje');
let contenedorForm = document.getElementById('contForm');
let errorDNI = document.getElementById('errorDNI');

// Ocultar mensajes de error y contenedor de mensaje al principio
// errorDNI.style.display = 'none';
// contenedorMensaje.style.display = 'none';

// Validación del campo "DNI" al hacer clic en el botón "Recuperar contraseña"
formRec.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    let dni = document.getElementById('datoUsuario').value.trim()
    let userEstaRegistrado = false
    let usuarioEncontrado

    //Se verifica el dni
    console.log(dni)
    if (dni === '' || dni.length < 7 || dni < 160000) {
        errorDNI.style.display = 'block';
        // contenedorForm.style.display = 'none';
    } else {
        usuariosDefinitivosIniciales.forEach(usuarioDefinitivo => {
            //si existe el usuario con el dni ingresado, se establece la bandera positiva 
            if (usuarioDefinitivo.dni === dni) {
                userEstaRegistrado = true;
                usuarioEncontrado = usuarioDefinitivo
            }
        })
        if (userEstaRegistrado) {
            contenedorMensaje.style.display = 'block';
            contenedorForm.style.display = 'none';
            // return usuarioEncontrado
        } else {
            console.log('El usuario no esta registrado')
            errorDNI.style.display = 'block';
        }
    }

    // Si no hay errores, mostrar el contenedor de mensaje
});