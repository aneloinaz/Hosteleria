document.addEventListener("DOMContentLoaded", () => {
    // Recuperar datos del localStorage
    const fecha = localStorage.getItem("fecha");
    const hora = localStorage.getItem("hora");
    const personas = localStorage.getItem("personas");
    const nombre = localStorage.getItem("nombre");
    const apellido = localStorage.getItem("apellido");
    const telefono = localStorage.getItem("telefono");
    const email = localStorage.getItem("email");
  
    // Insertar datos en los párrafos del resumen
    const resumen = document.querySelector(".resumen");
    const datos = resumen.querySelectorAll("p");
  
    if (datos.length >= 7) {
      datos[0].innerHTML = `<strong>DÍA:</strong> ${fecha}`;
      datos[1].innerHTML = `<strong>HORA:</strong> ${hora}`;
      datos[2].innerHTML = `<strong>PERSONAS:</strong> ${personas}`;
      datos[3].innerHTML = `<strong>NOMBRE:</strong> ${nombre}`;
      datos[4].innerHTML = `<strong>APELLIDO:</strong> ${apellido}`;
      datos[5].innerHTML = `<strong>TELÉFONO:</strong> ${telefono}`;
      datos[6].innerHTML = `<strong>EMAIL:</strong> ${email}`;
    }
  
    // Evento al confirmar reserva
    const btnReservar = document.querySelector(".btn-reservar");
    btnReservar.addEventListener("click", () => {
      // Redirigir a página de agradecimiento
      window.location.href = "Reservado.html";
    });
  });
  