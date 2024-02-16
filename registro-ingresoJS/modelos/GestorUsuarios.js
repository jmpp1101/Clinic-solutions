import { PERFIL } from './PERFIL.js';
import { Textos } from '../interfaces/IGestorUsuarios.js';
// import {Usuarios} from './Usuarios.js'
// import {Paciente} from './Paciente.js'
// import {Medico} from './Medico.js'
export
class GestorUsuarios{
    /**
     * Constructor
     */
    constructor() {
        this.usuarios = [];
        this.usuariosPendientes = [];
        this.gestor;

        // Agregar usuarios de ejemplo a la lista de usuarios pendientes
        // Puedes ajustar los valores según sea necesario
        let usuario1 = new Paciente('Nombre1', 'Apellido1', '12345678', '01/01/1990', '1234567890', 'correo1@example.com', 'contraseña1', 'ObraSocial1', 'NumObraSocial1');
        let usuario2 = new Paciente('Nombre2', 'Apellido2', '23456789', '02/02/1991', '2345678901', 'correo2@example.com', 'contraseña2', 'ObraSocial2', 'NumObraSocial2');
        
        this.usuariosPendientes.push(usuario1, usuario2);
    }

    /**
     * Mecanismo para que sólo se pueda crear una instancia de GestorUsuarios
     * @return gestor como unica instancia
     */
    static instanciar() {
        if (!GestorUsuarios.gestor) {
            GestorUsuarios.gestor = new GestorUsuarios();
        }
        return GestorUsuarios.gestor;
    }

    /**
     * Crea un nuevo usuario
     */
    crearUsuario(perfil, nombre, apellido, dni, fechaNac, telefono, correo, contra, contraRep, extra1, extra2) {
        let validacion = validarUsuario(perfil, nombre, apellido, dni, telefono, correo, contra, contraRep, extra1, extra2);
        if (validacion === Textos.VALIDACION_EXITO) {
            let usuario;
            switch (perfil) {
                case PERFIL.PACIENTE:
                    usuario = new Paciente(nombre, apellido, dni, fechaNac, telefono, correo, contra, extra1, extra2);
                    return agregarUsuario(usuario);
                case PERFIL.MEDICO:
                    usuario = new Medico(nombre, apellido, dni, fechaNac, telefono, correo, contra, extra1, extra2);
                    return agregarUsuario(usuario);
                default:
                    return Textos.ERROR;
            }
        }
        else {
            return validacion;
        }
    }

    /*
     * Modifica un usuario de la lista
     */
    modificarUsuario(perfil, nombre, apellido, dni, fechaNac, telefono, correo, contra, contraRep, extra1, extra2){
        let validacion = this.validarUsuario(perfil, nombre, apellido, dni, telefono, correo, contra, contraRep, extra1, extra2);
        if(validacion === Textos.VALIDACION_EXITO){
            let usuarioEncontrado = this.obtenerUsuario(dni);
            for(const u of this.usuarios){
                if(u === usuarioEncontrado){
                    
                    u.asignarNombre(nombre);
                    u.asignarApellido(apellido);
                    u.asignarDni(dni);
                    u.asignarFechaNac(fechaNac);
                    u.asignarTelefono(telefono);
                    u.asignarCorreo(correo);
                    u.asignarContra(contra);
                    switch (perfil) {
                        case PERFIL.PACIENTE:
                            u.asignarObraSocial(extra1);
                            u.asignarNumObraSoc(extra2);
                            break;
                        case PERFIL.MEDICO:
                            u.asignarMatricula(extra1);
                            u.asignarEspecialidad(extra2);
                            break;
                        default:
                            break;
                    }
                    u.mostrar();
                }
            }
            return Textos.EXITO;
        }
        return validacion;
    }

    
    /**
     * Devuelve todos los usuarios
     * @return {Array} Lista con todos los usuarios
     */
    verUsuarios() {
        /* Compara los apellidos y los nombres de los usuarios por separado
         * Envía el usuario ordenado por apellido y luego por el nombre
         */
        const apellidoComp = (usuario1, usuario2) => {
            let comparacion = usuario1.apellido.localeCompare(usuario2.apellido);
            if (comparacion === 0) {
                comparacion = usuario1.nombre.localeCompare(usuario2.nombre);
            }
            return comparacion;
        };

        this.usuarios.sort(apellidoComp);
        return this.usuarios;
    }


    /**
     * Busca si existen usuarios con el apellido especificado (total o parcialmente)
     * @param {string} apellido Apellido del usuario a buscar
     * @return {Array} Lista de usuarios con el apellido ingresado
     */
    buscarUsuarios(apellido) {
        /* Compara los apellidos y los nombres de los usuarios por separado
        * Envía el usuario ordenado por apellido y luego por el nombre
        */
        const usuariosAp = [];
        for (const u of this.usuarios) {
            if (u.verApellido().toLowerCase().includes(apellido.toLowerCase())) {
                usuariosAp.push(u);
            }
        }

        usuariosAp.sort((a, b) => a.apellido.localeCompare(b.apellido));
        return usuariosAp;
    }


    /**
     * Devuelve true si existe el usuario especificado, false en caso contrario.
     * @param usuario Usuario a buscar
     * @return true or false, usuario existente o no
     */
    existeEsteUsuario(usuario) {
        for (const u of this.usuarios) {
            if (u.verDni() === usuario.verDni()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Obtiene el usuario con el correo especificado
     * Si no hay un usuario con el correo, devuelve null.
     * @param correo Correo del usuario
     * @return El usuario con el correo ingresado
     */
    obtenerUsuario(dni) {
        for (const u of this.usuarios) {
            if (u.verDNI() === dni) {
                return u;
            }
        }
        return null;
    }

    /**
     * Borra un usuario siempre y cuando no haya turnos con el mismo
     * @param usuario Usuario a eliminar
     * @return Resultado de la operación
     */
    


    //Métodos auxiliares (No los utiliza el administrador)
    /**
     * Verifica si un usuario cumple con los requisitos
     */
    validarUsuario(perfil, nombre, apellido, dni, telefono, correo, contra, contraRep, extra1, extra2) {
        
        if (nombre == null || nombre === '') {
            return Textos.ERROR_NOMBRE;
        }
        if (apellido == null || apellido === '') {
            return Textos.ERROR_APELLIDO;
        }
        if(dni.length < 7 || dni <= 1600000){
            return Textos.ERROR_DNI;
        }
        //falta fechaNac
        if(telefono.length < 10){
            return Textos.ERROR_TELEFONO;
        }
        if (correo == null || correo === '' || !correo.includes("@") || (correo.indexOf("@") != correo.lastIndexOf("@"))) {
            return Textos.ERROR_CORREO;
        }
        if (contra == null || contraRep === '') {
            return Textos.ERROR_CONTRASENIA;
        }
        if (contraRep == null || contraRep === '' || contraRep !== contra) {
            return Textos.ERROR_CLAVES;
        }
        if(perfil === PERFIL.PACIENTE){
            if(extra1 == 'Selecciona una opción'){
                return Textos.ERROR_OBRASOCIAL;
            }
            if (extra1 == 'No poseo obra social' && (extra2 != '' || extra2 != null)) {
                return Textos.ERROR_NOPOSEO;
            }
        }
        if(perfil === PERFIL.MEDICO){
            if(extra1.length < 5 || extra1 <= 50000){
                return Textos.ERROR_OBRASOCIAL;
            }
        }
        return Textos.VALIDACION_EXITO;
    }

    /**
     * Agrega un usuario a la lista dependiendo de si ya está agregado o no
     * @param usuario Un usuario
     * @return Resultado de la operación
     */
    agregarUsuario(usuario) {
        if (this.usuarios.includes(usuario)) {
            return Textos.USUARIOS_DUPLICADOS;
        }
        else {
            this.usuarios.push(usuario);
            return Textos.EXITO;
        }
    }


    /**
     * Método auxiliar para revisión desde consola.
     */
    mostrarUsuarios() {
        for (const u of this.usuarios) {
            u.mostrar();
        }
    }
}