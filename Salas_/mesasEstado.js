document.addEventListener('DOMContentLoaded', async () => {
    const mesas = document.getElementsByClassName("mesa"); // Corregido: sin punto
    Array.from(mesas).forEach(async item => {
        const ID = item.dataset.id;
        await BuscarEstadoMesa(ID, item);
    });
});

async function fetchMesasEstado(ID){
    try{
        const response = await fetch(`https://apiostalaritza.lhusurbil.eus/GetComandasMesaAbiertas?idMesa=${ID}`);
        const data = await response.json();
        return data;
    }catch(e){
        console.error("Error al hacer la peticion al servidor : "+e);
    }
}

async function BuscarEstadoMesa(ID, mesaElemento){
    const data = await fetchMesasEstado(ID);
    if (!data || !('comandas' in data)) return;
    if(data.comandas.length <= 0){ 
        mesaElemento.style.backgroundColor = "green";
    }else{
        mesaElemento.style.backgroundColor = "red";
    }
}