const idMesa = localStorage.getItem('mesaSeleccionada');
const numeroSpan = document.querySelector('.numero');
const entradaInput = document.querySelector('.entrada');
const botonAceptar = document.querySelector('.boton-aceptar');

/* aqui va la llamada a la api para que devuelva la capacidad de la mesa segun su idMesa*/


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