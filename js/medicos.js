const datosTurnos = [
    {
        medico: "Dr. García",
        especialidad: "Cardiología",
        paciente: "Juan Pérez",
        hora: "10:00",
        motivoConsulta: "Dolor en el pecho"
    },
    {
        medico: "Dra. Martínez",
        especialidad: "Dermatología",
        paciente: "María López",
        hora: "11:30",
        motivoConsulta: "Erupción cutánea"
    },
    {
        medico: "Dr. Rodríguez",
        especialidad: "Pediatría",
        paciente: "Luisa García",
        hora: "13:45",
        motivoConsulta: "Control de rutina"
    },
    {
        medico: "Dra. Fernández",
        especialidad: "Ginecología",
        paciente: "Ana Martínez",
        hora: "15:20",
        motivoConsulta: "Consulta prenatal"
    },
    {
        medico: "Dr. López",
        especialidad: "Oftalmología",
        paciente: "Carlos Sánchez",
        hora: "17:00",
        motivoConsulta: "Examen de la vista"
    }
];

// Guardar los datos en localStorage
localStorage.setItem("turnos", JSON.stringify(datosTurnos));

// Función para obtener los datos desde localStorage
function obtenerDatosDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem("turnos");
    return JSON.parse(datosGuardados);
}

// Obtener los datos iniciales desde localStorage o usar un array vacío si no hay datos guardados
const arrayDeObjetos = obtenerDatosDesdeLocalStorage() || [];

const filtroInput = document.getElementById('filtroInput');
const resultados = document.getElementById('resultados');

// Función para actualizar los resultados
function actualizarResultados() {
  const filtro = filtroInput.value.toLowerCase();
  const objetosFiltrados = arrayDeObjetos.filter(objeto =>
    Object.values(objeto).some(valor =>
      valor.toString().toLowerCase().includes(filtro)
    )
  );
  
  mostrarResultados(objetosFiltrados);
}

// Escuchar el evento 'input' en el input de filtro
filtroInput.addEventListener('input', actualizarResultados);

// Función para mostrar los resultados
function mostrarResultados(objetos) {
    resultados.innerHTML = '';
    objetos.forEach((objeto, index) => {
      const card = document.createElement('div');
      card.classList.add('card', 'visible');
  
      const cardHeader = document.createElement('h5');
      cardHeader.classList.add('card-header');
      cardHeader.textContent = `${objeto.medico} - ${objeto.especialidad}`;
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = `${objeto.paciente} - ${objeto.hora}`;
  
      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.textContent = objeto.motivoConsulta;
  
      const cancelarBtn = document.createElement('button');
      cancelarBtn.textContent = 'Cancelar';
      cancelarBtn.classList.add('btn', 'btn-danger');
      cancelarBtn.addEventListener('click', () => {
        eliminarTurno(index);
      });
  
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(cancelarBtn);
  
      card.appendChild(cardHeader);
      card.appendChild(cardBody);

  
      resultados.appendChild(card);
    });
  }
  
  function eliminarTurno(index) {
    arrayDeObjetos.splice(index, 1);
    localStorage.setItem("turnos", JSON.stringify(arrayDeObjetos));
    actualizarResultados();
  }
  

// Llamar a la función para mostrar los resultados inicialmente
actualizarResultados();

console.log(datosTurnos); 