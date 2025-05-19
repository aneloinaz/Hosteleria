// Mendez
document.addEventListener('DOMContentLoaded', async () => {
    const salasData = await getSalas();
    let index = 0;
    if (window.location.pathname.endsWith('sala2.html')) {
        index = 1;
    }
    generarMesas(salasData.salas[index].mesas);


     const mesas = document.querySelectorAll('.mesa');
     mesas.forEach(mesa => {
    mesa.addEventListener('click', function() {
      const idMesa = this.getAttribute('data-id');
      localStorage.setItem('mesaSeleccionada', idMesa);
     window.location.href = '../mesasHTML/mesa1.html';
    });
  });
});

const generarMesas = (mesas) => {
    const container = document.getElementById("plano");
    const mesasHTML = mesas.map(item =>
        `<button class="mesa n${item.id}" data-id="${item.id}">${item.id}</button>`
    ).join('');
    container.innerHTML = mesasHTML;
}

async function getSalas() {
    const response = await fetch("salas.json");
    const data = await response.json();
    return data;
}


