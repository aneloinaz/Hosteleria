document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.getElementById("ListadoReservas");
  const fechaInput = document.getElementById("fechaInput");
  const buscarBtn = document.getElementById("buscarBtn");

  // Función para cargar reservas para una fecha
  function cargarReservas(fecha) {
    tablaBody.innerHTML = "<tr><td colspan='8'>Cargando...</td></tr>";

    fetch(`https://apiostalaritza.lhusurbil.eus/GetReservasDia?fecha=${fecha}`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener reservas");
        return response.json();
      })
      .then(datos => {
        tablaBody.innerHTML = "";

        if (datos.length === 0) {
          tablaBody.innerHTML = "<tr><td colspan='8'>No hay reservas para este día</td></tr>";
          return;
        }

        datos.reservas.forEach(reserva => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
           <td>${reserva.idReserva}</td> 
          <td>${reserva.numMesa}</td>
            <td>${reserva.nombreCliente}</td>
            <td>${reserva.apellidoCliente}</td>
            <td>${reserva.telefonoCliente}</td>
            <td>${reserva.numComensales}</td>
            <td>${reserva.observaciones}</td>
            <td>  <button onclick="eliminarReserva(${reserva.idReserva})">-</button> </td>
          `;
          tablaBody.appendChild(fila);
        });
      })
      .catch(error => {
        console.error("Error:", error);
        tablaBody.innerHTML = "<tr><td colspan='8'>Error al cargar reservas</td></tr>";
      });
  }

  // Evento botón buscar
  buscarBtn.addEventListener("click", () => {
    const fechaSeleccionada = fechaInput.value;
    if (!fechaSeleccionada) {
      alert("Selecciona una fecha primero");
      return;
    }
    cargarReservas(fechaSeleccionada);
  });

  // (Opcional) cargar reservas de hoy al inicio
  const hoy = new Date().toISOString().split("T")[0];
  fechaInput.value = hoy;
  cargarReservas(hoy);
});
document.addEventListener("DOMContentLoaded", () => {
  const agregarBtn = document.getElementById("agregarBtn");

  if (agregarBtn) {
    agregarBtn.addEventListener("click", () => {
      window.location.href = "index.html"; // o la ruta completa si está en otro directorio
    });
  }
});
function eliminarReserva(idreserva){
    console.log(idreserva);
     if (!confirm(`¿Seguro que deseas eliminar la reserva?`)) return;

    fetch(`https://apiostalaritza.lhusurbil.eus/DeleteReserva?idreserva=${encodeURIComponent(idreserva)}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idreserva })
    })
        
      
    .then(response => response.json())
    .then(data => {
      
        if (!data.ok) throw new Error("Error al eliminar la reserva");
        // Recargar reservas para la fecha actual
        else
            cargarReservas(fechaInput);
      })
      .catch(error => {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar la reserva ssSS");
      });
  }


