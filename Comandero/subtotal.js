document.addEventListener('DOMContentLoaded', () => {
    const listaPedido=document.querySelector('.pedido-ul');
    const totalSpan=document.getElementById('total-span');

    const pedido=JSON.parse(localStorage.getItem('pedido')) || [];

    if(pedido.length === 0){
        listaPedido.innerHTML='<li>No hay productos en el pedido</li>';
        totalSpan.textContent='0.00€';
        return;
    }

    let total=0;

    pedido.forEach(producto => {
        const li=document.createElement('li');
        const subtotal=producto.precio*producto.cantidad;
        li.innerHTML=`
            ${producto.nombre} <span class="cantidad">x${producto.cantidad}</span> - 
            <span class="precio-total">${subtotal.toFixed(2)}€</span>
        `;
        listaPedido.appendChild(li);
        total += subtotal;
    });
    totalSpan.textContent= `${total.toFixed(2)}€`;
});

document.getElementById('volver-btn').addEventListener('click',()=>{
    window.location.href='menu.html';
});

document.getElementById('cobrar-btn').addEventListener('click',()=>{
    window.location.href='cobrar.html';
});