document.addEventListener("DOMContentLoaded", () => {
  // Obtener elementos del DOM
  const fechaReserva = document.getElementById('Fecha');
  const personasDiv = document.getElementById('personas');
  const form = document.getElementById('FormReserva');

  // Obtener datos desde localStorage
  const fecha = localStorage.getItem("fecha");
  const numComensales = localStorage.getItem("personas");
  const numMesa = localStorage.getItem("nummesa"); // Asegúrate de guardarlo antes

  // Mostrar datos en el HTML
  if (fecha) {
    const visualFecha = document.createElement('p');
    visualFecha.innerHTML = `<strong>DÍA:</strong> ${fecha}`;
    fechaReserva.appendChild(visualFecha);
  }

  if (numComensales) {
    const visualPersonas = document.createElement('p');
    visualPersonas.innerHTML = `<strong>COMENSALES:</strong> ${numComensales}`;
    personasDiv.appendChild(visualPersonas);
  }

  // Escuchar envío del formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener valores del formulario
    const nombre = form.querySelector('input[placeholder="Nombre"]').value.trim();
    const apellido = form.querySelector('input[placeholder="Apellido"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const telefono = form.querySelector('input[type="tel"]').value.trim();
    const observaciones = form.querySelector('textarea').value.trim();

    // Validación básica
    if (!fecha || !numComensales || !numMesa) {
      alert('Faltan datos de la reserva. Vuelva al paso anterior.');
      return;
    }

    // Enviar datos al backend
    fetch("https://apiostalaritza.lhusurbil.eus/PostReservar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fecha: fecha,
        numMesa: numMesa,
        nombreCliente: nombre,
        apellidoCliente: apellido,
        telefonoCliente: telefono,
        emailCliente: email,
        numComensales: numComensales,
        observaciones: observaciones
      })
    })
      .then(response => response.json())
      .then(data => {
        alert(data.mensaje || 'Reserva enviada con éxito');
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error('Error al enviar reserva:', error);
        alert('Ocurrió un error al procesar la reserva.');
      });
  });
});
