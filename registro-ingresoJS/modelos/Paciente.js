class Paciente extends Usuario{
    //Constructor
    constructor(nombre, apellido, dni, fechaNac, telefono, correo, contrasenia, obraSocial, numObraSoc){
        super(nombre, apellido, dni, fechaNac, telefono, correo, contrasenia);
        this.obraSocial = obraSocial;
        this.numObraSoc = numObraSoc;
    }

    //Métodos
    //Métodos GET/SET
    get verObraSocial(){
        return this.obraSocial;
    }
    get verNumObraSoc(){
        return this.numObraSoc;
    }

    set asignarObraSocial(obraSocial){
        this.obraSocial = obraSocial;
    }
    set asignarNumObraSoc(numObraSoc){
        this.numObraSoc = numObraSoc;
    }

    /**
     * Devuelve una lista de turnos
     * @return turnos
     */
    
    /**
     * Agrega el turno agendado a la lista de turnos del paciente
     * Si ya está lo reemplaza. Si no está lo agrega
     * @param turno turno
     */
    
    /**
     * Cancela el turno del paciente. Lo elimina de la lista
     * @param turno turno
     */
}