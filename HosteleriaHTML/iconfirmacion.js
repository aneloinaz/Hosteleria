document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("FormReserva");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener valores del formulario
    const nombre = form.querySelector('input[placeholder="Nombre"]').value.trim();
    const Apellido = form.querySelector('input[placeholder="Apellido"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const telefono = form.querySelector('.telefono input[type="tel"]').value.trim();
    const codigoPostal = form.querySelector('input[placeholder="Código postal"]').value.trim();
    const observaciones = form.querySelector('textarea').value;
    const fecha = localStorage.getItem("fecha", fecha);
    const numcomensales = localStorage.getItem("numcomensales", numcomensales);
    const nummeesa = localStorage.getItem("nummesa", nummeesa);


    fetch("https://apiostalaritza.lhusurbil.eus/NuevaReserva", {
      method: "post",
      body: JSON.stringify({
        numcomensales: numcomensales,
        fecha: fecha,
        nombre: nombre,
        Apellido: Apellido,
        email: email,
        telefono: telefono,
        codigoPostal: codigoPostal,
        observaciones: observaciones,
        nummeesa: nummeesa
        //hora: hora
      })
        .then(response => response.json())
        .then(data => {
          alert(data.mensaje || 'Reserva enviada con éxito');
          window.location.href="index.html";
        })
        .catch(error => {
          console.error('Error al enviar reserva:', error);
          alert('Ocurrió un error al procesar la reserva.');
        })
    });
  });
});
