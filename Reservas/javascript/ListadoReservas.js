  document.addEventListener('DOMContentLoaded', () => {
    fetch('https://apiostalaritza.lhusurbil.eus/GetReservasDia') // Ruta al servidor o API
      .then(response => {
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        return response.json();
      }) 
      .then(reservas => {
        const tbody = document.querySelector('#ListadoReserva tbody');
        tbody.innerHTML = ''; // Limpiar contenido existente

        // Mostrar solo las 5 primeras (o todas si hay menos)
        reservas.forEach(reserva => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${reserva.fecha}</td>
            <td>${reserva.mesa}</td>
            <td>${reserva.hora}</td>
            <td>${reserva.nombre}</td>
            <td>${reserva.apellido}</td>
            <td>${reserva.telefono}</td>
            <td>${reserva.comensales}</td>
         
          `;
          tbody.appendChild(fila);
        });
      })
      .catch(error => {
        console.error('Error al cargar las reservas:', error);
      });
  });

