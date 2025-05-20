import { actualizarEstado } from "./mesasEstado.js";
document.addEventListener('DOMContentLoaded', async () => {
    localStorage.clear();
    let cont  = 0;
    async function actualizarMesas() {
        const salasData = await getSalas();
        let index = 0;
        if (window.location.pathname.endsWith('sala2.html')) {
            index = 1;
        }
        const mesasData = await getMesas(salasData.salas[index].idSala);
        generarMesas(mesasData);

        await actualizarEstado();
        console.log("actualizacion: "+(cont++));
    }

    // Llamada inicial
    await actualizarMesas();
    // Actualización cada 5 segundos
    setInterval(actualizarEstado, 5000);
});

const generarMesas = (mesas) => {
    const container = document.getElementById("plano");
    const mesasHTML = mesas.mesas.map(item =>
        `<button class="mesa n${item.numMesa}" data-id="${item.numMesa}">${item.numMesa}</button>`
    ).join('');
    container.innerHTML = mesasHTML;
}

async function getSalas() {
    const response = await fetch("https://apiostalaritza.lhusurbil.eus/GetSalas");
    const data = await response.json();
    return data;
}

async function getMesas(idSala){
    const response = await fetch(`https://apiostalaritza.lhusurbil.eus/GetMesas?idSala=${idSala}`);
    const data = await response.json();
    return data;
}


// id mesa
// estado 0 1 2 3

//  array y json

// 0 libre 
// 1 reservado 
// 2 comanda pedia
// 3 finalizado

