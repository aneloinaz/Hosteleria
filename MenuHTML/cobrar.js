// funcion que trae los datos del pedido generados en la pagina anterior
//funcion que tien que hacer yahir
function resumenTicket() {
    
}
// 
function cancelarPago() {
    if (confirm('¿Estás seguro de cancelar la operació?')) {
        // Confirmar antes de vaciar el carrito
        localStorage.removeItem('pedido');  // Eliminar carrito del localStorage
        resumenTicket();  // Actualizar la vista del carrito 
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
let total = totalTicket(); // Obtener el total desde la función totalTicket()
let recibido = parseFloat(prompt('Ingrese la cantidad recibida:'));
let cambio = recibido - total;

if (cambio === 0) {
    alert('Importe exacto.');
} else if (cambio > 0) {
    alert(`Pago realizado con éxito. Su cambio es: €${cambio.toFixed(2)}`);
} 
}