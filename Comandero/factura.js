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
    window.location.href = 'menu.html';
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
function calcularMediaxComensal() {
    const total = parseFloat(document.getElementById('total').textContent);
    const numComensales = parseInt(localStorage.getItem('numComensales'), 10) || 1; 
    const mediaxComensal = total / numComensales;
    document.getElementById('mediaxComensal').textContent = mediaxComensal.toFixed(2);
}

function mostrarQR() {
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
}