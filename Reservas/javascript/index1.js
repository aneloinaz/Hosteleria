document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('FechaReserva');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Evitar envío tradicional del formulario
  
      const personas = document.getElementById('personas').value;
      const fecha = document.getElementById('fecha').value;
      const hora = '12:00'; // fija, como indica el HTML
      const mesa = document.("mesaSeleccionada");
    if (!mesa) {
      alert("Por favor seleccione una mesa antes de continuar.");
      e.preventDefault();
    } else {
      const hiddenMesa = document.createElement("input");
      hiddenMesa.type = "hidden";
      hiddenMesa.name = "mesa";
      hiddenMesa.value = mesa;
      this.appendChild(hiddenMesa);
    }
  
      // Crear objeto para enviar
      const datos = {
        fecha: fecha,
        hora: hora,
        comensales: personas
      };
  
      // Enviar con fetch
      fetch('/api/verificarMesas.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      })
      .then(response => response.json())
      .then(data => {
        if (data.disponible) {
           cargarSala("sala1.html");
          // Redirigir si hay mesas libres
          window.location.href = 'iconfirmacion.html';
        } else {
          alert('Lo sentimos, no hay mesas disponibles para la fecha seleccionada.');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        alert('Error al verificar disponibilidad. Inténtalo de nuevo más tarde.');
      });
    });
  });
  function cargarSala(sala) {
    fetch(sala)
      .then(response => response.text())
      .then(html => {
        document.getElementById("contenedorSala").innerHTML = html;
      });
  }
  