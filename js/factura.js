function imprimirTicket() {
    const ticket = document.getElementById('ticket');
    const ventanaImpresion = window.open('', '', 'width=600,height=400');
    ventanaImpresion.document.write('<html ><head><title>Ticket de compra</title></head><body>');
    ventanaImpresion.document.write(ticket.innerHTML);
    ventanaImpresion.document.write('<style>body{font-family: Arial, sans-serif;}</style>');
    ventanaImpresion.document.close();
    ventanaImpresion.print();
    ventanaImpresion.close();
    alert('El ticket se ha impreso correctamente');
}

/*const metodoPago = prompt("¿Pago con tarjeta o efectivo? (Escribe 'tarjeta' o 'efectivo')").toLowerCase();
let mensajePago = '';
if (metodoPago === 'tarjeta') {
    PagoTarjeta();
    mensajePago = 'Pago realizado con tarjeta';
} else if (metodoPago === 'efectivo') {
    alert('Pago realizado en efectivo');
    mensajePago = 'Pago realizado en efectivo';
} else {
    alert('Método de pago no válido');
    mensajePago = 'Método de pago no válido';
}
document.getElementById('total').textContent = calcularTotal();
const metodoPagoDiv = document.createElement('div');
metodoPagoDiv.textContent = mensajePago;
document.getElementById('ticket').appendChild(metodoPagoDiv);*/

document.addEventListener('DOMContentLoaded', async () => {
    const mesaId = localStorage.getItem('mesaSeleccionada');
    if (!mesaId) return;

    // Obtener productos de la comanda (enviados)
    let productosEnviados = [];
    const resComandas = await fetch(`https://apiostalaritza.lhusurbil.eus/GetComandasMesaAbiertas?idMesa=${mesaId}`);
    const dataComandas = await resComandas.json();
    const comandas = Array.isArray(dataComandas.comandas) ? dataComandas.comandas : [];
    for (const comanda of comandas) {
        const idComanda = comanda.idComanda;
        if (!idComanda) continue;
        const detalleRes = await fetch(`https://apiostalaritza.lhusurbil.eus/GetDetalleComanda?idComanda=${idComanda}`);
        const detalleData = await detalleRes.json();
        if (detalleData.detalleComandas && Array.isArray(detalleData.detalleComandas)) {
            productosEnviados = productosEnviados.concat(detalleData.detalleComandas);
        }
    }

    // Agrupa productos enviados por idProducto
    const enviadosAgrupados = {};
    productosEnviados.forEach(prod => {
        if (!enviadosAgrupados[prod.idProducto]) {
            enviadosAgrupados[prod.idProducto] = {
                nombre: prod.nombre,
                cantidad: Number(prod.cantidad) || 0,
                precio: Number(prod.precio) || 0
            };
        } else {
            enviadosAgrupados[prod.idProducto].cantidad += Number(prod.cantidad) || 0;
        }
    });

    // Productos del pedido local (no enviados)
    const pedidoGuardado = localStorage.getItem(`pedido_mesa_${mesaId}`);
    const pedido = pedidoGuardado ? JSON.parse(pedidoGuardado) : [];

    // Mostrar productos en el ticket
    const section = document.querySelector('#ticket .section');
    let total = 0;

    // Productos enviados
    Object.values(enviadosAgrupados).forEach(prod => {
        const cantidad = Number(prod.cantidad) || 0;
        const precio = Number(prod.precio) || 0;
        const subtotal = cantidad * precio;
        const div = document.createElement('div');
        div.textContent = `${prod.nombre} x${cantidad} - ${subtotal.toFixed(2)}€`;
        section.appendChild(div);
        total += subtotal;
    });

    // Productos pendientes
    pedido.forEach(producto => {
        const cantidad = Number(producto.cantidad) || 0;
        const precio = Number(producto.precio) || 0;
        const subtotal = cantidad * precio;
        const div = document.createElement('div');
        div.textContent = `${producto.nombre} x${cantidad} - ${subtotal.toFixed(2)}€`;
        section.appendChild(div);
        total += subtotal;
    });

    // Mostrar total
    document.getElementById('total').textContent = `${total.toFixed(2)}€`;
});