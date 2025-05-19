// Mendez
document.addEventListener('DOMContentLoaded', async () => {
    const salasData = await getSalas();
    let index = 0;
    if (window.location.pathname.endsWith('sala2.html')) {
        index = 1;
    }
    generarMesas(salasData.salas[index].mesas);
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


