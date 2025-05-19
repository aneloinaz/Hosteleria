  function mostrarPedidoEnCobrar() {
      const pedidoGuardado = localStorage.getItem("pedido");
      const lista = document.getElementById("listaCobro");
      lista.innerHTML = "";

      if (!pedidoGuardado) {
        lista.innerHTML = "<li>No hay productos en el pedido.</li>";
        return;
      }

      const pedido = JSON.parse(pedidoGuardado);
      pedido.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} x${item.cantidad} - ${(item.precio * item.cantidad).toFixed(2)} €`;
        lista.appendChild(li);
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
    if (confirm('¿Estás seguro de cancelar la operació?')) {
        localStorage.removeItem('pedido'); 
        resumenTicket();    
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
    } else if (cambio > 0) {
        alert(`Pago realizado con éxito. Su cambio es: €${cambio.toFixed(2)}`);
        window.location.href = 'factura.html';
    }
  }