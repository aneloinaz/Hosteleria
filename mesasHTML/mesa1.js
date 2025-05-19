const idMesa = localStorage.getItem('mesaSeleccionada');
const numeroSpan = document.querySelector('.numero');
const entradaInput = document.querySelector('.entrada');
const botonAceptar = document.querySelector('.boton-aceptar');

/* aqui va la llamada a la api para que devuelva la capacidad de la mesa segun su idMesa*/


if (idMesa){
  consultarCapacidad(idMesa)
}else {
  console.error('No se selecciono ninguna mesa');
  alert('No se selecciono ninguna mesa');
}

function consultarCapacidad(idMesa) {
  const url = `https://apiostalaritza.lhusurbil.eus/GetMesa?idMesa=${idMesa}/capacidad`;
  fetch(url)
    .then(response =>{
      if(!response.ok){
        throw new Error('Error de red: ' + response.status);
      }
      return response.json();
    })
    .then(data =>{;
      console.log('Capacidad de la mesa ${idMesa}:', data.capacidad);
      document.querySelector('.numero').textContent = data.capacidad;
    })
    .catch(error=>{
      console.error('Error al consultar la capacidad de la mesa ;', error);
      alert('Error al consultar la capacidad de la mesa. Por favor, vuelve a intentarlo mas tarde.')

    })
  }




botonAceptar.addEventListener('click', function() {
  const cantidadIngresada = parseInt(entradaInput.value);
  if (isNaN(cantidadIngresada) || cantidadIngresada <= 0) {
    alert('Por favor, ingresa un número válido de comensales.');
    return;
  }

  // Validar que no supere la capacidad
  const capacidadMax = parseInt(numeroSpan.textContent);
  if (cantidadIngresada > capacidadMax) {
    alert(`La cantidad ingresada supera la capacidad máxima de la mesa (${capacidadMax}).`);
    return;
  }
  localStorage.setItem('comensalesMesa', cantidadIngresada);
  window.location.href = '../Comandero/menu.html';
});