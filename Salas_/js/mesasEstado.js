document.addEventListener('DOMContentLoaded', async () => {
    const mesas = document.getElementsByClassName("mesa"); 

    Array.from(mesas).forEach(async item => {
        const ID = item.dataset.id;
        await BuscarEstadoMesa(ID, item);
    });
});

async function fetchMesasEstado(ID){
    try{
        const response = await fetch(`https://apiostalaritza.lhusurbil.eus/GetEstadoMesa?idMesa=${ID}`);
        const data = await response.json();
        return data;
    }catch(e){
        console.error("Error al hacer la peticion al servidor : "+e);
    }
}
    
async function BuscarEstadoMesa(ID, mesaElemento){
    const data = await fetchMesasEstado(ID);
    if (!data || !('comandas' in data)) return;
    if(estado == 0){ 
        mesaElemento.style.backgroundColor = "green";
    }else if(estado == 1){
        mesaElemento.style.backgroundColor = "red";
    }else if(estado == 2){
        mesaElemento.style.backgroundColor = "blue"
    }else if(estado == 3){
        mesaElemento.style.backgroundColor = "yellow"
    }
}