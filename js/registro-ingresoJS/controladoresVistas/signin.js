//Funcion para mostrar el formulario de medicos al hacer click en el boton 'Registro del personal'
function mostrarForm(idForm) {

    let formPacientes = document.getElementById('formPac');
    let formMedicos = document.getElementById('formMed');
    let formMostrado = document.getElementById(idForm);

    let titlePacientes = document.getElementById('titlePac');
    let titleMedicos = document.getElementById('titleMed');

    let accion = document.querySelector('a[id="registroPersonal"]');
    // let accion2 = document.querySelector('a[id="volver"]');

    if (accion) {
        if (formMostrado == formMedicos) {
            formMedicos.style.display = 'block';
            formPacientes.style.display = 'none';

            titleMedicos.style.display = 'flex';
            titlePacientes.style.display = 'none';
        }
    }
}

//Funcion para obtener en qué botón se hizo click en la pagina anterior************************* */
// Función para obtener el parámetro de la URL
function obtenerParametroURL(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
}

// Función para mostrar u ocultar contenido según el parámetro en la URL
function manejarContenido() {
    const boton = obtenerParametroURL('boton');

    let formPacientes = document.getElementById('formPac'); //Para los form
    let formMedicos = document.getElementById('formMed');

    let titlePacientes = document.getElementById('titlePac'); //Para el titulo
    let titleMedicos = document.getElementById('titleMed');

    if (boton === 'registro_pacientes') {
        formPacientes.style.display = 'block';
        formMedicos.style.display = 'none';

        titleMedicos.style.display = 'none';
        titlePacientes.style.display = 'flex';
    }
    if (boton == 'registro_medicos') {
        formMedicos.style.display = 'block';
        formPacientes.style.display = 'none';

        titleMedicos.style.display = 'flex';
        titlePacientes.style.display = 'none';
    }
}

// Llamada a la función al cargar la página
window.onload = function () {
    manejarContenido();
};