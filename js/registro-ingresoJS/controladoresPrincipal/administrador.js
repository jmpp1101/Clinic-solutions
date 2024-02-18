// Datos de ejemplo de usuarios pendientes
let usuariosIniciales = [
    { nombre: "Juan", apellido: "Pérez", dni: "12345678" },
    { nombre: "María", apellido: "Gómez", dni: "98765432" },
    { nombre: "Carlos", apellido: "López", dni: "54321678" }
];

// Datos de ejemplo de usuarios definitivos
export let usuariosDefinitivosIniciales = [
    { nombre: "Lucía", apellido: "Martínez", dni: "123456789" },
    { nombre: "Pedro", apellido: "García", dni: "987654321" },
    { nombre: "Prueba", apellido: "Prueba", dni: "9"}
];


//Inicializo arrays auxiliares vacíos
let usuariosDefinitivos = []
let usuariosPendientes = []


//Funcion para definir arrays vacios en LS
function iniciarLS(){
    let usuariosPendientesLS = JSON.parse(localStorage.getItem('usuariosPendientes')) || [];
    let usuariosDefinitivosLS = JSON.parse(localStorage.getItem('usuariosDefinitivos')) || [];
    
    if(usuariosPendientesLS.length === 0){
        localStorage.setItem('usuariosPendientes', JSON.stringify(usuariosIniciales));
        usuariosPendientes = usuariosIniciales;
    } else {
        usuariosPendientes = usuariosPendientesLS;
    }

    if(usuariosDefinitivosLS.length === 0){
        localStorage.setItem('usuariosDefinitivos', JSON.stringify(usuariosDefinitivosIniciales));
        usuariosDefinitivos = usuariosDefinitivosIniciales;
    } else {
        usuariosDefinitivos = usuariosDefinitivosLS;
    }
}

iniciarLS();

// Función para guardar los datos en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem('usuariosPendientes', JSON.stringify(usuariosPendientes));
    localStorage.setItem('usuariosDefinitivos', JSON.stringify(usuariosDefinitivos));
}

// Función para aceptar un usuario pendiente
function aceptarUsuario(dni) {
    let usuarioPendiente = usuariosPendientes.find(u => u.dni === dni);
    usuariosPendientes = usuariosPendientes.filter(u => u.dni !== dni);
    
    let existencia = usuariosDefinitivos.some(usuario => usuario.dni === dni);

    if (existencia) {
        console.log(`Ya existe un usuario con el DNI ${dni}.`);
        alert('No se pudo agregar el usuario a la lista de usuarios');
        usuariosPendientes = usuariosPendientes.filter(u => u.dni !== dni);
        // let indiceUsuario = usuariosPendientes.findIndex(usuario => usuario.dni === dni);
        
        // if (indiceUsuario === -1) {
        //     usuariosPendientes.splice(indiceUsuario, 1);
        //     console.log('Usuario eliminado de la lista de pendientes.');
            guardarEnLocalStorage();
            llenarTablaPendientes();
        //     // llenarTablaDefinitivos();
            console.log(usuariosPendientes)
        // }
    } else {
        usuariosDefinitivos.push(usuarioPendiente);

        console.log(`Usuario ${usuarioPendiente.dni} aceptado.`);
        console.log(`Se ha agregado al usuario ${dni} a la lista definitiva de usuarios`);
        alert(`Se ha agregado al usuario ${dni} a la lista definitiva de usuarios`);
        guardarEnLocalStorage();
    }

    // Actualizar las tablas después de aceptar un usuario
    llenarTablaPendientes();
    llenarTablaDefinitivos();
}

// Función para rechazar un usuario pendiente
function rechazarUsuario(dni) {
    let usuarioIndex = usuariosPendientes.findIndex(u => u.dni === dni);
    usuariosPendientes.splice(usuarioIndex, 1);
    console.log(`Usuario con DNI ${dni} rechazado.`);
    alert('Usuario eliminado de la lista de pendientes');
    guardarEnLocalStorage();

    // Actualizar la tabla de usuarios pendientes después de rechazar un usuario
    llenarTablaPendientes();
}

//***********************************************LLENAR TABLAS */
// Función para llenar la tabla de usuarios pendientes
function llenarTablaPendientes() {
    let tabla = document.getElementById("tablaUsuariosPendientes");
    let tbody = tabla.querySelector("tbody");
    
    tbody.innerHTML = "";
    
    usuariosPendientes.forEach(usuario => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>${usuario.dni}</td>
        <td>
                <button class="btn-aceptar">Aceptar</button>
                <button class="btn-rechazar">Rechazar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}


// Función para llenar la tabla de usuarios definitivos
function llenarTablaDefinitivos() {
    let tabla = document.getElementById("tablaUsuariosDefinitivos");
    let tbody = tabla.querySelector("tbody");
    
    tbody.innerHTML = "";
    
    usuariosDefinitivos.forEach(usuario => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>${usuario.dni}</td>
        `;
        tbody.appendChild(fila);
    });
}
// Llenar las tablas al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    llenarTablaPendientes();
    llenarTablaDefinitivos();

    // Obtener el contenedor de la tabla de usuarios pendientes
    let tablaPendientes = document.getElementById('tablaUsuariosPendientes');

    // Agregar un event listener al contenedor de usuarios pendientes
    tablaPendientes.addEventListener('click', function (event) {
        // Verificar si se hizo clic en un botón de aceptar
        if (event.target.classList.contains('btn-aceptar')) {
            let dni = event.target.parentElement.previousElementSibling.textContent;
            aceptarUsuario(dni);
        }
        // Verificar si se hizo clic en un botón de rechazar
        else if (event.target.classList.contains('btn-rechazar')) {
            let dni = event.target.parentElement.previousElementSibling.textContent;
            rechazarUsuario(dni);
        }
    });

    // Obtener el contenedor de la tabla de usuarios definitivos
    let tablaDefinitivos = document.getElementById('tablaUsuariosDefinitivos');

    // Agregar un event listener al contenedor de usuarios definitivos
    tablaDefinitivos.addEventListener('click', function (event) {
        // Aquí puedes agregar lógica adicional si es necesario
        // Por ejemplo, para manejar eventos dentro de la tabla de usuarios definitivos
    });
});
