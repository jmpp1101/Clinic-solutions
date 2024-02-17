
let input = document.getElementById('usuario');
let radioSeleccionado = document.querySelector('input:checked');

//Para mostrar el párrafo de un medico o un paciente
function mostrarParrafo(idParrafo) {

    let parrafoMedico = document.getElementById("parrafoMedico");
    let parrafoPaciente = document.getElementById("parrafoPaciente");
 
    // Mostrar el párrafo correspondiente al radio seleccionado
    if (radioSeleccionado) {
        let parrafoMostrado = document.getElementById(idParrafo);
        if (parrafoMostrado === parrafoPaciente) {
            parrafoMostrado.style.display = 'block';
            parrafoMedico.style.display = 'none';
            input.placeholder = "DNI";
        }
        if (parrafoMostrado === parrafoMedico) {
            parrafoMostrado.style.display = 'block';
            parrafoPaciente.style.display = 'none';
            input.placeholder = "Matrícula Profesional";
        }
    }
}

/************************************************************************ */
/******************* Control formulario de LOG IN ************************* */

//Para no permitir que se ingrese letras o caracteres
input.addEventListener('keydown', function (event) {
    // Obtenemos el código de la tecla presionada
    let keyCode = event.keyCode || event.which;

    // Permitir teclas especiales como flechas de navegación, retroceso y suprimir
    if (keyCode === 8 || keyCode === 9 || keyCode === 46 || (keyCode >= 37 && keyCode <= 40)) {
        return;
    }

    // Verificar si la tecla presionada es un número
    if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
    }
});

//Para establecer un minimo de caracteres numericos en el ingreso
//y control de DNI o Matrícula
input.addEventListener('input', function() {
    let usuario = input.value;
    let errorDNI= document.getElementById('errorDNI');
    let errorMat= document.getElementById('errorMat');
    let radioPaciente = document.getElementById('paciente');

    if(usuario !== '' || usuario !== null){
        if(radioPaciente.checked){
            if (usuario.length < 7 || usuario <= 1600000) {
                errorDNI.style.display = 'block';
            }else{
                errorDNI.style.display = 'none';
            }
        }
        else{
            errorDNI.style.display = 'none';
            if (usuario.length < 5 || usuario <= 50000) {
                errorMat.style.display = 'block';
            }else{
                errorMat.style.display = 'none';
            }
        }
    }else{
        errorDNI.style.display = 'none';
        errorMat.style.display = 'none';
    }
    
    
});

/******************************************************************************************* */
//Control de formulario completo (PABLO) NO ME FUNCIONA :( 
// document.getElementById('formulario').addEventListener('submit', function (event) {
//     event.preventDefault(); // Previene el envío automático del formulario.

//     const usuario = document.getElementById('usuario').value.trim();
//     const contra = document.getElementById('contra').value.trim();
//     const erroresDiv = document.getElementById('errores');
//     let errores = []; // Almacena mensajes de error.

//     // Validación del campo "usuario".
    
//     if(radioSeleccionado.id === 'paciente'){
//         if (usuario === "") {
//             errores.push('Ingrese su DNI');
//         }
//         if ((usuario.length > 0 && usuario.length < 7) || usuario <= 1600000) {
//             errores.push('Ingrese un DNI válido');
//         }
//         if (usuario.length > 12) {
//             errores.push('El usuario debe tener maximo 12 caracteres.');
//         }
        
//     }
//     if(radioSeleccionado.id === 'medico'){
//         if (usuario === "") {
//             errores.push('Ingrese su matrícula');
//         }
//         if ((usuario.length > 0 && usuario.length < 5) || usuario <= 50000) {
//             errores.push('Ingrese una matrícula válida');
//         }
//         if (usuario.length > 12) {
//             errores.push('El usuario debe tener maximo 10 caracteres.');
//         }

//     }

//     //Validación 'contraseña'
//     if (contra === "" || contra.length<6) {
//         errores.push('Usuario o contraseña incorrectos');
//     }

//     // Limpiar mensajes de error anteriores.
//     erroresDiv.innerHTML = '';

//     // Mostrar errores si los hay.
//     if (errores.length > 0) {
//         errores.forEach(function (error) {
//             const p = document.createElement('p');
//             p.textContent = error;
//             erroresDiv.appendChild(p);
//         });
//     } else {
//         // Lógica para manejar el formulario válido (por ejemplo, enviar datos a un servidor).
//         console.log(`Usuario: ${usuario}, Perfil: ${radioSeleccionado}`);
//         alert(`Gracias por contactarnos: ${usuario} - ${radioSeleccionado}`);
//     }
// });