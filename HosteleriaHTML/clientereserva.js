document.addEventListener("DOMContentLoaded", () => {
    // Recuperar hora y fecha guardadas
    /*const hora = localStorage.getItem("horaSeleccionada");
    const fecha = localStorage.getItem("fechaSeleccionada");
  
    // Insertar en el resumen
    const resumen = document.querySelector(".resumen");
    if (hora && fecha) {
      const pFecha = document.createElement("p");
      pFecha.innerHTML = `<strong>DÍA:</strong> ${fecha}`;
      resumen.appendChild(pFecha);
  
      const pHora = document.createElement("p");
      pHora.innerHTML = `<strong>HORA:</strong> ${hora}`;
      resumen.appendChild(pHora);
    }*/
  
    // Manejo del envío del formulario
    const formulario = document.querySelector(".formulario");
    formulario.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevenir envío
  
      // Obtener valores del formulario
      const fecha = document.getElementById("fecha").value;
      const hora = document.getElementById("hora").value;
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const telefono = document.getElementById("telefono").value;
      const email = document.getElementById("email").value;
      const personas = document.getElementById("personas").value;
      const comentario = document.getElementById("comentarios").value;
  
      // Guardar en localStorage para usarlos luego si es necesario
      localStorage.setItem("fecha", fecha);
      localStorage.setItem("hora",hora);
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("apellido", apellido);
      localStorage.setItem("telefono", telefono);
      localStorage.setItem("email", email);
      localStorage.setItem("personas", personas);
      localStorage.setItem("comentarios", comentario);
      
      fetch("Api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fecha,
          //hora,
          //nombre,
          //apellido,
          //telefono,
          //email,
          personas,
          //comentario
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al enviar la reserva");
        }
        return response.json();
      })
      .then(data => {
        console.log("Reserva enviada con éxito:", data);
        // Redirigir después del éxito
        window.location.href = "ConfirmacionReserva.html";
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error al enviar la reserva.");
      });
  
      // Redirigir a la página de confirmación
      window.location.href = "ConfirmacionReserva.html";
    });
  });
  