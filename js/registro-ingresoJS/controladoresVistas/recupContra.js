let input = document.getElementById('recuperar_btn');
let contenedorMensaje = document.getElementById('contMensaje');
let contenedorForm = document.getElementById('contForm');
let errorMail= document.getElementById('errorMail');

//Para controlar el ingreso de datos para enviar un mail
input.addEventListener('input', function() {
    let valor = input.value;

    // Validación del campo "email".
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(valor)) {
        // Esta es una expresión regular básica para validar el formato de correo electrónico
        errorMail.style.display = 'block'
    }else{
        contenedorMensaje.style.display = 'block';
        contenedorForm.style.display = 'none';

    }
})