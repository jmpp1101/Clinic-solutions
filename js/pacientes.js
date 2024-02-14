const formulario = document.querySelector('#buscadorpacientes');

const filtrar = () => {
    console.log(formulario.value);
    const texto = formulario.value.toLowerCase();
    for (let medico of medicos) {
        let nombre = medico.nombre.toLowerCase();
        if (nombre.includes(texto)) {
            // Aquí puedes realizar alguna acción con el médico que coincide
            // Por ejemplo, mostrarlo en algún lugar de la interfaz
            console.log(medico);
        }
    }
};

let containerTurnos = document.getElementById('turnos');

// Parsea los turnos desde el almacenamiento local
let turnos = JSON.parse(localStorage.getItem('turnos')) || [
    {
        medico: "Dr. García",
        especialidad: "Cardiología",
        paciente: "Juan Pérez",
        hora: "10:00"
    },
    {
        medico: "Dra. Martínez",
        especialidad: "Dermatología",
        paciente: "María López",
        hora: "11:30"
    },
    {
        medico: "Dr. Rodríguez",
        especialidad: "Pediatría",
        paciente: "Luisa García",
        hora: "13:45"
    },
    {
        medico: "Dra. Fernández",
        especialidad: "Ginecología",
        paciente: "Ana Martínez",
        hora: "15:20"
    },
    {
        medico: "Dr. López",
        especialidad: "Oftalmología",
        paciente: "Carlos Sánchez",
        hora: "17:00"
    }
];

turnos.forEach(function(turno) {
    let div = document.createElement("div");
    div.classList.add("container-sm", "turno");

    let infoDiv = document.createElement("div");
    infoDiv.classList.add("info-turno");

    let medicoP = document.createElement("p");
    medicoP.textContent = `Médico: ${turno.medico}`;

    let especialidadP = document.createElement("p");
    especialidadP.textContent = `Especialidad: ${turno.especialidad}`;

    let pacienteP = document.createElement("p");
    pacienteP.textContent = `Paciente: ${turno.paciente}`;

    let horaP = document.createElement("p");
    horaP.textContent = `Hora: ${turno.hora}`;

    let cancelarBtn = document.createElement("button");
    cancelarBtn.textContent = "Cancelar";
    cancelarBtn.classList.add("btn", "btn-danger");

    cancelarBtn.addEventListener("click", function() {
        // Encuentra el índice del turno en el array
        const index = turnos.indexOf(turno);
        if (index !== -1) {
            // Elimina el turno del array
            turnos.splice(index, 1);
            // Actualiza el almacenamiento local con el nuevo array de turnos
            localStorage.setItem('turnos', JSON.stringify(turnos));
            // Elimina el div del turno cancelado de la interfaz
            div.remove();
            // Muestra un mensaje de éxito
            alert("Turno cancelado correctamente.");
        }
    });

    infoDiv.appendChild(medicoP);
    infoDiv.appendChild(especialidadP);
    infoDiv.appendChild(pacienteP);
    infoDiv.appendChild(horaP);

    div.appendChild(infoDiv);
    div.appendChild(cancelarBtn);
    containerTurnos.appendChild(div);
});
