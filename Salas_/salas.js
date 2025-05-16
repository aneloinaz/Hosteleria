document.addEventListener('DOMContentLoaded', function() {
  const mesas = document.querySelectorAll('.mesa');
  mesas.forEach(mesa => {
    mesa.addEventListener('click', function() {
      const idMesa = this.getAttribute('data-id');
      localStorage.setItem('mesaSeleccionada', idMesa);
     window.location.href = '../mesasHTML/mesa1.html';
    });
  });
});