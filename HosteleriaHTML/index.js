document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const personas = document.getElementById("personas").value;
    const fecha = document.getElementById("fecha").value;
    //const hora = document.getElementById("hora").value;
    localStorage.setItem("personas",personas);
    localStorage.setItem("fecha", fecha);
    //localStorage.setItem("hora",hora);
  
    fetch("https://apiostalaritza.lhusurbil.eus/", {
      method: "GET",
      body: JSON.stringify({
        personas: personas,
        fecha: fecha
        //hora: hora
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.puedeReservar) {
        alert(`✅ Hay disponibilidad para ${personas} personas a las ${fecha}.`);
        // Aquí podrías redirigir a la siguiente página del proceso
      } else if (data.disponibles !== undefined) {
        alert(`❌ No hay disponibilidad para este ${fecha}`);
      } else {
        alert("⚠️ " + (data.error || "Error al comprobar disponibilidad."));
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("❌ Error al conectar con el servidor.");
    });
  });
  