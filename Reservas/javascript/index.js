document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const numcomensales = document.getElementById("numcomensales").value;
    const fecha = document.getElementById("fecha").value;
    //const hora = document.getElementById("hora").value;
    localStorage.setItem("personas",personas);
    localStorage.setItem("fecha", fecha);
    //localStorage.setItem("hora",hora);
  
    fetch("https://apiostalaritza.lhusurbil.eus/NuevaReserva", {
      method: "GET",
      body: JSON.stringify({
        numcomensales: numcomensales,
        fecha: fecha
        //hora: hora
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.length!=0) {
        alert(`✅ Hay disponibilidad para ${personas} personas ${fecha}.`);
        const nummesa=data.nummesa[0];
        localStorage.setItem("nummesa",nummesa);
        // Aquí podrías redirigir a la siguiente página del proceso
      } else if (data.length== 0) {
        alert(`❌ No hay disponibilidad para esta ${fecha}`);
      } else {
        alert("⚠️ " + (data.error || "Error al comprobar disponibilidad."));
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("❌ Error al conectar con el servidor.");
    });
  });
  