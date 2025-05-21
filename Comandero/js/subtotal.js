import { AlertMessage } from "../../components/AlertComponents.js";
function mostrarPedidoEnCobrar() {
    const lista = document.getElementById('listaCobro');
    lista.innerHTML = '';

    const params = new URLSearchParams(window.location.search);
    const idComanda = localStorage.getItem('idComanda') || '1'; // Toma el idComanda del localStorage
    const url = `https://apiostalaritza.lhusurbil.eus/GetDetalleComanda?idComanda=${idComanda}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(text => {
            const pedido = JSON.parse(text);

            if (!pedido.detalleComandas || pedido.detalleComandas.length === 0) {
                lista.innerHTML = '<li>No hay productos en el pedido.</li>';
                return;
            }

            let pedidoLocal = [];

            pedido.detalleComandas.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.nombre} x${item.cantidad} - ${(item.precio * item.cantidad).toFixed(2)}€`;
                lista.appendChild(li);
                pedidoLocal.push(item);
            });

            localStorage.setItem('pedido', JSON.stringify(pedidoLocal));
            mostrarTotalEnCobrar();
            
        })
        .catch(error => {
            console.error('Error al obtener el pedido:', error);
            lista.innerHTML = '<li>Error al cargar el pedido.</li>';
        });
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

    calcularBase();
    calcularCuota();
    calcularMediaxComensal();
}

function calcularBase() {
    const total = parseFloat(document.getElementById('total').textContent);
    const base = total / 1.10;
    document.getElementById('base-iva').textContent = base.toFixed(2);
}

function calcularCuota() {
    const total = parseFloat(document.getElementById('total').textContent);
    const cuota = total * 0.10;
    document.getElementById('cuota-iva').textContent = cuota.toFixed(2);
}

function calcularMediaxComensal() {
    const total = parseFloat(document.getElementById('total').textContent);
    const numComensales = parseInt(localStorage.getItem('numComensales'), 10) || 1;
    document.getElementById('comensales').textContent = numComensales;
    const mediaxComensal = total / numComensales;
    document.getElementById('mediaxComensal').textContent = mediaxComensal.toFixed(2);
}

function imprimirSub() {
    const ticket = document.getElementById('ticket');
    const ventanaImpresion = window.open('', '', 'width=600,height=400');
    ventanaImpresion.document.write('<html><head><title>Ticket de compra</title></head><body>');
    ventanaImpresion.document.write(ticket.innerHTML);
    ventanaImpresion.document.write('<style>body{font-family: Arial, sans-serif;}</style>');
    ventanaImpresion.document.close();
    ventanaImpresion.print();
    ventanaImpresion.close();
    message = 'El ticket se ha impreso correctamente';
    redirection = "../../Salas_/sala1.html";
    AlertMessage(message,redirection);
}

function mostrarFechaYHora() {
    const ahora = new Date();
    const formato = ahora.toLocaleString();
    document.getElementById('fecha-hora').textContent = formato;
}

function mostrarInfoExtra() {
    const salaMesa = localStorage.getItem('salaMesa') || '1 - A';
    const formaPago = localStorage.getItem('formaPago') || 'Pago en efectivo';
    document.getElementById('sala-mesa').textContent = salaMesa;
    document.getElementById('forma-pago').textContent = formaPago;
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarPedidoEnCobrar();
    mostrarFechaYHora();
    mostrarInfoExtra();
});
