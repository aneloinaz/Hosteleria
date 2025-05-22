  // const personas= document.getElementById("personas");
  // const visualpersona= document.createElement("div");
   // visualpersona.innerHTML = `<strong>PERSONAS:</strong> ${numComensales}`;
   //personas.appendChild(visualpersona);
document.addEventListener("DOMContentLoaded",()=>{
   const fecha = localStorage.getItem("fecha");
    const numComensales = localStorage.getItem("personas");
    /* const resumen = document.querySelector(".resumen");
    const datos = resumen.querySelectorAll("p");
  
    if (datos.length >= 1) {
      datos[0].innerHTML = `<strong>DÍA:</strong> ${fecha}`;
      datos[1].innerHTML = `<strong>Personas:</strong> ${numComensales}`;
    }*/
  
    // Insertar datos en los párrafos del resumen
   const fechaReserva = document.getElementById('Fecha');
    const visualfecha = document.createElement('p');
    visualfecha.innerText=fecha;
    fechaReserva.appendChild(visualfecha);
})
document.addEventListener("DOMContentLoaded",()=>{
// Obtener valores del formulario
    const nombre = form.querySelector('input[placeholder="Nombre"]').value.trim();
    const Apellido = form.querySelector('input[placeholder="Apellido"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const telefono = form.querySelector('.telefono input[type="tel"]').value.trim();
    const observaciones = form.querySelector('textarea').value;
    /*const fecha = localStorage.getItem("fecha", fecha);
    const numComensales = localStorage.getItem("numcomensales", numcomensales);
    const numMesa = localStorage.getItem("nummesa", numMesa);*/


    fetch("https://apiostalaritza.lhusurbil.eus/PostReservar", {
      method: "post",
      body: JSON.stringify({
        
        fecha: fecha,
        numMesa:numMesa,
        nombreCliente: nombre,
        apellidoCliente: Apellido,
        telefonoCliente: telefono,
        emailCliente: email,
        numComensales: numComensales,
        observaciones: observaciones,
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

