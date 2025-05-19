document.addEventListener('DOMContentLoaded', async () => {
    const mesas = document.getElementsByClassName("mesa");

    const estados = await cargarEstadosDesdeJSON();

    Array.from(mesas).forEach(mesa => {
        const ID = parseInt(mesa.dataset.id);
        const mesaEstado = estados.find(m => m.idMesa === ID);
        if (mesaEstado) {
            cambiarColorMesa(mesa, mesaEstado.estado);
        }
    });
});

async function cargarEstadosDesdeJSON() {
    try {
        const response = await fetch('./json/mesasEstados.json');  // const response = await fetch('https://apiostalaritza.lhusurbil.eus/GetmesasEsado?idMesa=${idMesa}'); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar el archivo:', error);
        return [];
    }
}

function cambiarColorMesa(mesaElemento, estado) {
   if (estado==0) {
     mesaElemento.style.backgroundColor = "green"; // Libre
   } else if (estado==1) {
     mesaElemento.style.backgroundColor = "red"; // Reservado
   } else if (estado==2) {
     mesaElemento.style.backgroundColor = "orange"; // Comanda pedida
   } else if (estado==3) {
     mesaElemento.style.backgroundColor = "blue"; // Finalizado
   }
}
