class Usuario {
    //Constructor
    constructor (nombre, apellido, dni, fechaNac, telefono, correo, contrasenia){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fechaNac = fechaNac;
        this.telefono = telefono;
        this.correo = correo;
        this.contrasenia = contrasenia;
    }

    //Métodos
    //Métodos GET/SET
    get verNombre (){
        return this.nombre;
    }
    get verApellido (){
        return this.apellido;
    }
    get verDni (){
        return this.dni;
    }
    get verFechaNac (){
        return this.fechaNac;
    }
    get verTelefono (){
        return this.telefono;
    }
    get verCorreo (){
        return this.correo;
    }
    get verContrasenia (){
        return this.contrasenia;
    }

    set asignarNombre(nombre){
        this.nombre = nombre;
    }
    set asignarApellido(apellido){
        this.apellido = apellido;
    }
    set asignarDni(dni){
        this.dni = dni;
    }
    set asignarFechaNac(fechaNac){
        this.fechaNac = fechaNac;
    }
    set asignarTelefono(telefono){
        this.telefono = telefono;
    }
    set asignarCorreo(correo){
        this.correo = correo;
    }
    set asignarContra(contrasenia){
        this.contrasenia = contrasenia;
    }

    
    toString() {
        return `Usuario: Apellido: ${this.apellido}, Nombre: ${this.nombre}, DNI: ${this.dni},\n FechaNac: ${this.fechaNac}, Telefono: ${this.telefono}, Correo electrónico: ${this.correo}, Contrasenia: ${this.contrasenia}`;
    }

    /*
     * Muestra los atributos del objeto Usuario creado
     */
    mostrar(){
        console.log(this.verApellido()+ ", " +this.verNombre());
        console.log("DNI: " + this.verDni());
        console.log("Correo: " + this.verCorreo());
    }

    /**
     * Método encargado del ordenamiento de los usuarios
     * @param o Un usuario
     * @return resultado de la comparacion de los usuarios para el ordenamiento
     */
    @Override
    compareTo(o) {
        if(o.apellido.compareTo(this.verApellido()) == 0){
            return o.nombre.compareToIgnoreCase(this.verNombre())*(-1);
        }
        else{
            return o.apellido.compareTo(this.verApellido())*(-1);
        }
    }   
}