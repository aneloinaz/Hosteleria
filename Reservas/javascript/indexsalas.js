document.addEventListener('DOMContentLoaded', async () => {
    localStorage.clear();
    const salasData = await getSalas();

    for (let i = 0; i < salasData.salas.length; i++) {
        const idSala = salasData.salas[i].idSala;
        const mesasData = await getMesas(idSala);
        const planoId = i === 0 ? "plano-sala1" : "plano-sala2";
        generarMesas(mesasData.mesas, planoId, salasData.salas[i].nombreSala);
    }

    // Actualizar cada 5 seg si lo necesitas
    setInterval(actualizarEstados, 5000);
});

const generarMesas = (mesas, planoId, nombreSala) => {
    const container = document.getElementById(planoId);
    container.innerHTML = mesas.map(item => {
        return `<button class="mesa n${item.numMesa}" data-id="${item.numMesa}" data-sala="${nombreSala}">
                  ${item.numMesa}
                </button>`;
    }).join('');

    container.querySelectorAll('.mesa').forEach(mesa => {
        mesa.addEventListener('click', () => {
            // Guardar selección en localStorage
            localStorage.setItem('mesaSeleccionada', mesa.dataset.id);
            localStorage.setItem('salaSeleccionada', mesa.dataset.sala);

            // Marcar visualmente
            document.querySelectorAll('.mesa').forEach(btn => btn.classList.remove('seleccionada'));
            mesa.classList.add('seleccionada');
        });
    });
};

async function getSalas() {
    const response = await fetch("https://apiostalaritza.lhusurbil.eus/GetSalas");
    return await response.json();
}

async function getMesas(idSala) {
    const response = await fetch(`https://apiostalaritza.lhusurbil.eus/GetMesas?idSala=${idSala}`);
    return await response.json();
}

async function actualizarEstados() {
  // Aquí podrías volver a consultar disponibilidad por mesa y marcar ocupadas si lo deseas.
}

document.querySelector("#FechaReserva").addEventListener("submit", function(event) {
    event.preventDefault();
    const numComensales = document.getElementById("personas").value;
    const fecha = document.getElementById("fecha").value;
    //const hora = document.getElementById("hora").value;
    localStorage.setItem("personas",numComensales);
    localStorage.setItem("fecha", fecha);
    //localStorage.setItem("hora",hora);
    const mesa = localStorage.getItem("mesaSeleccionada");
    if (!mesa) {
      alert("Por favor seleccione una mesa antes de continuar.");
      e.preventDefault();
    } else {
      const hiddenMesa = document.createElement("input");
      hiddenMesa.type = "hidden";
      hiddenMesa.name = "mesa";
      hiddenMesa.value = mesa;
      this.appendChild(hiddenMesa);
    }
  
    
    
    
    
    
    
    
    /*const url = `https://apiostalaritza.lhusurbil.eus/GetMesasLibresFecha?numComensales=${encodeURIComponent(numComensales)}&fecha=${encodeURIComponent(fecha)}`;

    fetch(url, {
      method: "GET"
    })
    .then(response => response.json())
    .then(data => {
      if (data.mesas.length!=0) {
        alert(`✅ Hay disponibilidad para ${personas} personas ${fecha}.`);
        const numMesa=data.mesas[0].numMesa;
        localStorage.setItem("numMesa",numMesa);
        window.location.href = '/Reservas/html/iconfirmacion.html';
        
      } else if (data.length== 0) {
        alert(`❌ No hay disponibilidad para esta ${fecha}`);
      } else {
        alert("⚠️ " + (data.error || "Error al comprobar disponibilidad."));
      }
    })
   .catch(error => {
      console.error("Error:", error);
      alert("❌ Error al conectar con el servidor.");
    
    });*/
  });