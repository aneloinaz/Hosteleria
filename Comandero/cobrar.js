// funcion que trae los datos del pedido generados en la pagina anterior
//funcion que tien que hacer yahir
function resumenTicket() {
    
}
// 
function cancelarPago() {
    if (confirm('¿Estás seguro de cancelar la operació?')) {
        
        localStorage.removeItem('pedido'); // Eliminar el pedido del localStorage
        resumenTicket();  // Actualizar la vista del ticket 
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