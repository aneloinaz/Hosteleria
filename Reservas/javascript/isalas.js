function FechaReserva(){
  const numComensales = document.getElementById("personas").value;
  const fecha = document.getElementById("fecha").value;

  localStorage.setItem("personas", numComensales);
  localStorage.setItem("fecha", fecha);

  const url = `https://apiostalaritza.lhusurbil.eus/GetMesasLibresFecha?numComensales=${encodeURIComponent(numComensales)}&fecha=${encodeURIComponent(fecha)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.mesas.length !== 0) {
        const mesasLibres = data.mesas.map(m => m.numMesa);
        localStorage.setItem("mesasLibres", JSON.stringify(mesasLibres));

        // Ir a la sala para elegir mesa
        window.location.href = "sala1.html";
      } else {
        alert("❌ No hay disponibilidad para esta fecha y número de personas.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("❌ Error al consultar disponibilidad.");
    });}

   function cargarMesas(){
    const generarMesas = (mesas, planoId, nombreSala) => {
    const container = document.getElementById(planoId || "plano");
  const mesasLibres = JSON.parse(localStorage.getItem("mesasLibres") || "[]");

  container.innerHTML = mesas.map(item => {
    const esLibre = mesasLibres.includes(item.numMesa);
    const clase = esLibre ? "libre" : "ocupada";

    return `<button 
              class="mesa ${clase} n${item.numMesa}" 
              data-id="${item.numMesa}" 
              data-sala="${nombreSala}"
              ${esLibre ? "" : "disabled"}>
              ${item.numMesa}
            </button>`;
  }).join('');

  container.querySelectorAll('.mesa.libre').forEach(mesa => {
    mesa.addEventListener('click', () => {
      localStorage.setItem('mesaSeleccionada', mesa.dataset.id);
      localStorage.setItem('salaSeleccionada', mesa.dataset.sala);
      window.location.href = "/Reservas/html/iconfirmacion.html";
    });
  });
};

   }

