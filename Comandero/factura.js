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