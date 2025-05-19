
  const botones = document.querySelectorAll(".boton.disponible");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      // Elimina selección anterior
      botones.forEach(b => b.classList.remove("seleccionado"));
      
      // Marca el botón como seleccionado
      boton.classList.add("seleccionado");

      // Guarda la hora seleccionada
      localStorage.setItem("horaSeleccionada", boton.textContent);
      
      // Puedes guardar también la fecha si lo deseas
      const fecha = document.querySelector(".fecha").textContent;
      localStorage.setItem("fechaSeleccionada", fecha);
    });
  });

    // Recupera los valores guardados
    const hora = localStorage.getItem("horaSeleccionada");
    const fecha = localStorage.getItem("fechaSeleccionada");
  
    // Inserta en el resumen
    const resumen = document.querySelector(".resumen");
    resumen.innerHTML += `<p><strong>DÍA:</strong> ${fecha}</p>`;
    resumen.innerHTML += `<p><strong>HORA:</strong> ${hora}</p>`;

