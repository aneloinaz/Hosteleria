import { AlertMessage } from "../../components/AlertComponents.js";
import { AlertConfirm } from "../../components/AlertComponents.js";
// funcion que trae los datos del pedido generados en la pagina anterior
//funcion que tien que hacer yahir
// function resumenTicket() {

// }

function mostrarPedidoEnCobrar() {
    const lista = document.getElementById('listaCobro');
    lista.innerHTML = '';

    fetch("https://apiostalaritza.lhusurbil.eus/api/GetDetallePedido") // ← URL real de la API, sin "swagger/index.html"
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(pedido => {
            if (!pedido || pedido.length === 0) {
                lista.innerHTML = '<li>No hay productos en el pedido.</li>';
                return;
            }
            pedido.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.nombre} x${item.cantidad} - ${(item.precio * item.cantidad).toFixed(2)}€`;
                lista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al obtener el pedido:', error);
            lista.innerHTML = '<li>Error al cargar el pedido.</li>';
        });
}


function mostrarTotalEnCobrar() {
    const pedidoGuardado = localStorage.getItem("pedido");
    const totalSpan = document.getElementById("total");
    let total = 0;

    if (pedidoGuardado) {
        const pedido = JSON.parse(pedidoGuardado);
        total = pedido.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }

    totalSpan.textContent = total.toFixed(2);

    calcularBase();
    calcularCuota();
    calcularMediaxComensal();
    mostrarQR();
}
// 
document.getElementById("boton-tarjeta").addEventListener('click', PagoTarjeta);
document.getElementById("boton-efectivo").addEventListener('click', PagoEfectivo);
document.getElementById("boton-cancelar").addEventListener('click', async () => { cancelarPago() });
//
async function cancelarPago() {
    let message = "¿Estás seguro de cancelar la operación?";
    if (await AlertConfirm(message)) {
        const mesaId = localStorage.getItem('mesaSeleccionada');
        localStorage.removeItem(`pedido_mesa_${mesaId}`);
        resumenTicket();
        window.location.href = './menu.html';
    } else {
        message = "Operacion cancelada";
        AlertMessage(message);
    }
}

function PagoTarjeta() {
    let message = "La operación se ha realizado con éxito";
    let redirection = "../../Salas_/sala1.html";
    AlertMessage(message, redirection);
}

function PagoEfectivo() {
    let total = totalTicket(); // Obtener el total desde la función totalTicket()
    let recibido = parseFloat(prompt('Ingrese la cantidad recibida:'));
    let cambio = recibido - total;
    let redirection = "";
    if (cambio === 0) {
        message = "Importe Exacto";
        redirection = "../../Salas_/sala1.html";
        AlertMessage(message, redirection);
    } else if (cambio > 0) {
        message = `Pago realizado con éxito. Su cambio es: €${cambio.toFixed(2)}`;
        redirection = "";
        AlertMessage(message, redirection);
    }
}