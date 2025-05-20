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

}

   function cancelarPago() {
    if (confirm('¿Estás seguro de cancelar la operació?')) {
        localStorage.removeItem('pedido'); 
        resumenTicket(); 
        window.location.href = 'Comandero/menu.html';
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
    let total = totalTicket(); // Obtener el total desde la función totalTicket()
    let recibido = parseFloat(prompt('Ingrese la cantidad recibida:'));
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