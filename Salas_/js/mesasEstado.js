export async function actualizarEstado(){
      const fecha = new Date().toISOString().slice(0,10);
  const mesas = document.getElementsByClassName("mesa");

    const estados = await cargarEstadosDesdeJSON(fecha);
    actualizarContador(fecha);

    Array.from(mesas).forEach(mesa => {
        const ID = parseInt(mesa.dataset.id);
        const mesaEstado = estados.estados.find(m => m.idMesa === ID);
        if (mesaEstado) {
            cambiarColorMesa(mesa, mesaEstado.estado);
        }
    });
}

 async function cargarEstadosDesdeJSON(fecha) {
    try {
        const response = await fetch(`https://apiostalaritza.lhusurbil.eus/GetEstadoMesas?fecha=${fecha}`);  // const response = await fetch('https://apiostalaritza.lhusurbil.eus/GetmesasEsado?idMesa=${idMesa}'); 
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
     mesaElemento.addEventListener('click', function() {
                const idMesa = this.getAttribute('data-id'); 
                localStorage.setItem('mesaSeleccionada', idMesa);
                 window.location.href = 'info1.html'});
   } else if (estado==1) {
     mesaElemento.style.backgroundColor = "red"; // Reservado
     mesaElemento.addEventListener('click', function() {
                const idMesa = this.getAttribute('data-id'); 
                localStorage.setItem('mesaSeleccionada', idMesa);
                 window.location.href = '../Comandero/html/menu.html'});
   } else if (estado==2) {
     mesaElemento.style.backgroundColor = "orange"; // Comanda pedida
     mesaElemento.addEventListener('click', function() {
                const idMesa = this.getAttribute('data-id'); 
                localStorage.setItem('mesaSeleccionada', idMesa);
                 window.location.href = '../Comandero/html/menu.html'});
   } else if (estado==3) {
     mesaElemento.style.backgroundColor = "blue"; // Finalizado
     mesaElemento.addEventListener('click', function() {
                const idMesa = this.getAttribute('data-id'); 
                localStorage.setItem('mesaSeleccionada', idMesa);
                 window.location.href = '../Comandero/html/menu.html'});
   }

  

}

async function actualizarContador(fecha){
  const data = await getComensalesMesa(fecha);
  let comensales = 0;
  data.mesas.forEach(mesa =>{
    comensales += mesa.numComensales;
    console.log("Num Mesa: "+mesa.numMesa + "-- comensales: " + mesa.numComensales);
  });
  console.log(comensales);
  document.getElementById("contador").textContent = comensales;
}

async function getComensalesMesa(fecha){
  try{
    const response = await fetch(`https://apiostalaritza.lhusurbil.eus/GetMesasOcupadasFecha?fecha=${fecha}`);
    const data = await response.json();
    return data;
  }catch(e){
    console.error("Error al hacer la peticion: "+e);
  }
}
