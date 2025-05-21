document.addEventListener('DOMContentLoaded', () => {
    mostrarPedidoEnCobrar();
    mostrarTotalEnCobrar();
    
    
});

import { AlertMessage } from "../../components/AlertComponents.js";
import { AlertConfirm } from "../../components/AlertComponents.js";
function mostrarPedidoEnCobrar() {
    const lista = document.getElementById('listaCobro');
    lista.innerHTML = '';

    const mesaId = localStorage.getItem('mesaSeleccionada');
    if (!mesaId) {
        lista.innerHTML = '<li>No hay mesa seleccionada.</li>';
        return;
    }

    const pedidoGuardado = localStorage.getItem(`pedido_mesa_${mesaId}`);
    if (!pedidoGuardado) {
        lista.innerHTML = '<li>No hay productos en el pedido.</li>';
        return;
    }

    const pedido = JSON.parse(pedidoGuardado);
    if (pedido.length === 0) {
        lista.innerHTML = '<li>No hay productos en el pedido.</li>';
        return;
    }

    pedido.forEach(item => {
        const li = document.createElement('li');
        const subtotal = (item.precio * item.cantidad).toFixed(2);
        li.textContent = `${item.nombre} x${item.cantidad} - ${subtotal}€`;
        lista.appendChild(li);
    });

    localStorage.setItem('pedido', JSON.stringify(pedido)); // para usarlo en otras funciones
    mostrarTotalEnCobrar();

}

function mostrarTotalEnCobrar() {
    const pedidoGuardado = localStorage.getItem('pedido');
    const totalSpan = document.getElementById('total');
    let total = 0;

    if (pedidoGuardado) {
        const pedido = JSON.parse(pedidoGuardado);
        total = pedido.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }

    totalSpan.textContent = total.toFixed(2);
}


   function cancelarPago() {
    message = '¿Estás seguro de cancelar la operació?';
    redirection = "./menu.html";
    if (AlertConfirm(message,redirection)) {
        localStorage.removeItem('pedido'); 
        resumenTicket(); 
        window.location.href = 'Comandero/html/sala1.html';
    } else {
        alert('Operacion cancelada');
    }
}

function PagoTarjeta() {
    alert('La operación se ha realizado con éxito');
    window.location.href = 'salas1.html';
    const mesaId = localStorage.getItem('mesaSeleccionada');
    localStorage.removeItem(`pedido_mesa_${mesaId}`);
    window.location.href = 'salas1.html';
}

function PagoEfectivo() {
    const pedidoGuardado = localStorage.getItem("pedido");
    let total = 0;
    if (pedidoGuardado) {
        const pedido = JSON.parse(pedidoGuardado);
        total = pedido.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }
    let recibido = parseFloat(prompt('Ingrese la cantidad recibida:'));
    if (isNaN(recibido)) {
        alert('Por favor, ingrese una cantidad válida.');
        return;
    }
    let cambio = recibido - total;

    if (cambio === 0) {
        alert('Importe exacto.');
        const mesaId = localStorage.getItem('mesaSeleccionada');
        localStorage.removeItem(`pedido_mesa_${mesaId}`);
        window.location.href = 'salas1.html';
    } else if (cambio > 0) {
        alert(`Pago realizado con éxito. Su cambio es: €${cambio.toFixed(2)}`);
        const mesaId = localStorage.getItem('mesaSeleccionada');
        localStorage.removeItem(`pedido_mesa_${mesaId}`);
        window.location.href = 'salas1.html';
    }
  }