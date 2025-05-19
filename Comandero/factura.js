// Función para calcular el total 
function calcularMediaxComensal() {
    const total = parseFloat(document.getElementById('total').textContent);
    const numComensales = parseInt(localStorage.getItem('numComensales'), 10) || 1; 
    const mediaxComensal = total / numComensales;
    document.getElementById('mediaxComensal').textContent = mediaxComensal.toFixed(2);
}

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

}

 function calcularIVA() {
    const total = parseFloat(document.getElementById('total').textContent);
    const IVA = total * 0.10;
    document.getElementById('base-iva').textContent = IVA.toFixed(2);
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


// Función para imprimir el ticket
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
    window.location.href = './Comandero/menu.html';
}
document.addEventListener('DOMContentLoaded', () => {
    mostrarPedidoEnCobrar();
    mostrarTotalEnCobrar();
});


/*function mostrarQR() {
    // Puedes personalizar el texto del QR 
    const total = document.getElementById('total').textContent;
    const textoQR = `Total factura: ${total} €`;

    // Construye la URL de la API de goQR
    const urlQR = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(textoQR)}&size=150x150`;

    // Crea o actualiza la imagen del QR en el HTML
    let imgQR = document.getElementById('imgQR');
    if (!imgQR) {
        imgQR = document.createElement('img');
        imgQR.id = 'imgQR';
        document.body.appendChild(imgQR); // O en el contenedor que prefieras
    }
    imgQR.src = urlQR;
}*/