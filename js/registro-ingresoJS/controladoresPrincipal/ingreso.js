
/********************************************/
import { PERFIL } from '../enum/PERFIL.js';

let usuario1 = {
    perfil: PERFIL.PACIENTE,
    usuario: '11223344',
    contra: 'salvador'
}

let usuario2 = {
    perfil: PERFIL.MEDICO,
    usuario: '11111111',
    contra: 'anas'
}

let administrador = {
    perfil: PERFIL.MEDICO,
    usuario: '88888888',
    contra: 'anak'
}

let usuarios = [];
usuarios.push(usuario1, usuario2)
localStorage.setItem('usuarios', JSON.stringify(usuarios))


let form = document.getElementById('formulario');
let userEstaRegistrado = false;


form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    //Recopilacion datos ingresados
    //obtener datos de los input
    let perfil = document.querySelector('input:checked').value;
    let usuario = document.getElementById('usuario').value.trim();
    let contra = document.getElementById('contra').value.trim();
    let errorMsg = document.getElementById('errorLogIn');
    errorMsg.style.display = 'none'

    //crear objeto usuario
    let usuarioIngreso = {
        perfil: perfil,
        usuario: usuario,
        contra: contra
    }

    //Funcion para poder ser redireccionados a la pagina principal dependiendo del perfil del usuario
    if (usuarioIngreso.perfil === PERFIL.MEDICO && usuarioIngreso.usuario === '88888888' && usuarioIngreso.contra === 'anak') {
        console.log('Bienvenido administrador')
        window.location.href = 'administrador.html';

    } else {
        let usuarioEncontrado

        //se busca un usuario con los mismos datos del usuario ingresado
        usuarios.forEach(usuarioDefinitivo => {
            //si existe el usuario, se establece la bandera positiva para ingresar. 
            if (usuarioIngreso.perfil === PERFIL.PACIENTE || usuarioIngreso.perfil === PERFIL.MEDICO) {
                if (usuarioDefinitivo.perfil === usuarioIngreso.perfil && usuarioDefinitivo.usuario === usuarioIngreso.usuario && usuarioDefinitivo.contra === usuarioIngreso.contra) {
                    userEstaRegistrado = true;
                    usuarioEncontrado = usuarioDefinitivo
                }
            }
            //si no existe entonces no

        })
        //Si bandera es positiva, redireccionar y retonar el usuario para que la pagina principal cargue sus datos
        if (userEstaRegistrado === true) {
            console.log('Usuario encontrado. Redireccionando')
            alert('Redireccionando')
            window.location.href = '/.html';
            // return usuarioEncontrado
        }

        //sino, se muestra cartel de acceso denegado
        else {
            if (userEstaRegistrado === false || ((usuario === '' && contra === '') || (usuario === '' || contra === '') || (usuario !== '' && contra.length < 4))) {
                //Para mostrar u ocultar el mensaje de error en Login
                errorMsg.style.display = 'block';

                
                console.log('Este usuario no esta registrado')
                //Control espacios vacíos y contraseña menor a X caracteres
                if (errorMsg.style.display == 'block' && usuario != '' && contra.length > 4) {
                    errorMsg.style.display = 'none';
                }
            }
        }

    }





})