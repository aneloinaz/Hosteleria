document.addEventListener("DOMContentLoaded", () => {
    // Recuperar hora y fecha guardadas
    const hora = localStorage.getItem("horaSeleccionada");
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
    }
  
    // Manejo del envío del formulario
    const formulario = document.querySelector(".formulario");
    formulario.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevenir envío
  
      // Obtener valores del formulario
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const telefono = document.getElementById("telefono").value;
      const email = document.getElementById("email").value;
      const personas = document.getElementById("personas").value;
  
      // Guardar en localStorage para usarlos luego si es necesario
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("apellido", apellido);
      localStorage.setItem("telefono", telefono);
      localStorage.setItem("email", email);
      localStorage.setItem("personas", personas);
  
      // Redirigir a la página de confirmación
      window.location.href = "ConfirmacionReserva.html";
    });
  });
  