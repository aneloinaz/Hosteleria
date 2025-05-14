// funcion que trae los datos del pedido generados en la pagina anterior
//funcion que tien que hacer yahir
function resumenTicket() {
    
}
document.addEventListener('DOMContentLoaded', () => {
    mostrarPedidoEnCobrar();
    mostrarTotalEnCobrar();
});

function mostrarPedidoEnCobrar() {
    const pedidoGuardado = localStorage.getItem('pedido');
    const lista = document.getElementById('listaCobro');
    lista.innerHTML = '';

    if (!pedidoGuardado) {
        lista.innerHTML = '<li>No hay productos en el pedido.</li>';
        return;
    }

    const pedido = JSON.parse(pedidoGuardado);
    pedido.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} x${item.cantidad} - ${(item.precio * item.cantidad).toFixed(2)}€`;
        lista.appendChild(li);
    });
}

function mostrarTotalEnCobrar() {
    const pedidoGuardado = localStorage.getItem('pedido');
    const totalSpan = document.getElementById('totalCobro');
    let total = 0;

    if (pedidoGuardado) {
        const pedido = JSON.parse(pedidoGuardado);
        total = pedido.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }

    totalSpan.textContent = `${total.toFixed(2)}€`;
}
// 
function cancelarPago() {
    if (confirm('¿Estás seguro de cancelar la operació?')) {
        
        localStorage.removeItem('pedido'); // Eliminar el pedido del localStorage
        resumenTicket();  // Actualizar la vista del ticket 
        window.location.href = 'menu.html';
    } else {
        alert('Operacion cancelada');
    }
}

function PagoTarjeta() {
    alert('La operación se ha realizado con éxito');
    window.location.href = 'factura.html';
}

function PagoEfectivo() {
let total = totalTicket(); // Obtener el total desde la función totalTicket() 
let recibido = parseFloat(prompt('Ingrese la cantidad recibida:'));
let cambio = recibido - total;

if (cambio === 0) {
    alert('Importe exacto.');
} else if (cambio > 0) {
    alert(`Pago realizado con éxito. Su cambio es: €${cambio.toFixed(2)}`);
} 
}