import { AlertMessage } from "../../components/AlertComponents.js";
import { AlertConfirm } from "../../components/AlertComponents.js";
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

   function cancelarPago() {
    message = '¿Estás seguro de cancelar la operació?';
    redirection = "./menu.html";
    if (AlertConfirm(message,redirection)) {
        localStorage.removeItem('pedido'); 
        resumenTicket(); 
        window.location.href = 'Comandero/menu.html';
    } else {
        message = 'Operacion cancelada';
        AlertMessage(message);
    }
}

function PagoTarjeta() {
    message = 'La operación se ha realizado con éxito';
    redirection = '../../Salas_/sala1.html';
    AlertMessage(message,redirection);
    //al llegar a salas el localStorage se borra automaticamente
    // const mesaId = localStorage.getItem('mesaSeleccionada');
    // localStorage.removeItem(`pedido_mesa_${mesaId}`);
    // window.location.href = 'salas1.html';
}

function PagoEfectivo() {
    let total = totalTicket(); // Obtener el total desde la función totalTicket()
    let recibido = parseFloat(prompt('Ingrese la cantidad recibida:'));
    let cambio = recibido - total;

    if (cambio === 0) {
        message = 'Importe Exacto';
        redirection = '../../Salas_/sala1.html';
        //al llegar a salas se borra todo automaticamente
        // const mesaId = localStorage.getItem('mesaSeleccionada');
        // localStorage.removeItem(`pedido_mesa_${mesaId}`);

        AlertMessage(message,redirection);
        
        window.location.href = 'salas1.html';
    } else if (cambio > 0) {
        message = `Pago realizado con éxito. Su cambio es: €${cambio.toFixed(2)}`;
        redirection = '../../Salas_/sala1.html';
        
        //al llegar a salas se borra todo automaticamente
        // const mesaId = localStorage.getItem('mesaSeleccionada');
        // localStorage.removeItem(`pedido_mesa_${mesaId}`);
        // window.location.href = 'salas1.html';

        AlertMessage(message,redirection);
     
    }
}