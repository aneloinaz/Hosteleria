document.addEventListener('DOMContentLoaded',()=>{
    console.log("Script cargado");

    const pedido=JSON.parse(localStorage.getItem('pedido')) || [];
    console.log("Pedido:", pedido);

    const resumenDiv=document.querySelector('.resumen-listado');
    const totalBarraDiv=document.querySelector('.total-barra');

    if(pedido.length===0){
        resumenDiv.innerHTML='<div>No hay productos en el pedido</div>';
        totalBarraDiv.textContent='0.00€';
        return;
    }

    let resumenHTML='<strong>Resumen del pedido:</strong><br>';
    let total=0;

    pedido.forEach(producto=>{
        const subtotal=producto.precio*producto.cantidad;
        resumenHTML += `${producto.nombre} x${producto.cantidad} - ${subtotal.toFixed(2)}€`;
        total += subtotal;
    });

    resumenDiv.innerHTML=resumenHTML;
    totalBarraDiv.textContent=`${total.toFixed(2)}€`;

    document.getElementById('boton-tarjeta').addEventListener('click',()=>pagar('tarjeta'));
    document.getElementById('boton-efectivo').addEventListener('click',()=>pagar('efectivo'));
    document.getElementById('boton-cancelar').addEventListener('click',cancelar);
});

function pagar(metodo){
    alert(`Pago realizado con ${metodo}`);
    localStorage.removeItem('pedido');
    window.location.href='menu.html';
}

function cancelar(){
    window.location.href='menu.html';
}