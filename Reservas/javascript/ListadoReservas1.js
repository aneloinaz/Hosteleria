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
function eliminarReserva(idReserva){
     if (!confirm(`¿Seguro que deseas eliminar la reserva de la mesa ${idReserva}?`)) return;

    fetch(`/api/reservas/eliminar`, {
      method: "POST", // Cambia a DELETE si tu API lo requiere
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idReserva })
    })
      .then(response => {
        if (!response.ok) throw new Error("Error al eliminar la reserva");
        // Recargar reservas para la fecha actual
        cargarReservas(fechaInput.value);
      })
      .catch(error => {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar la reserva");
      });
  }


