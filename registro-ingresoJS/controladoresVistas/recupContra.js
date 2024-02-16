let input = document.getElementById('recuperar_btn');
let contenedorMensaje = document.getElementById('contMensaje');
let contenedorForm = document.getElementById('contForm');
let errorMail= document.getElementById('errorMail');
let errorDNI = document.getElementById('errorDNI');

//Para controlar el ingreso de datos para enviar un mail
input.addEventListener('input', function() {
    let valor = input.value;

    if(valor !== '' || valor !== null){
        contenedorMensaje.style.display = 'block';
        contenedorForm.style.display = 'none';
    }
})