// funcion que trae los datos del pedido generados en la pagina anterior
//funcion que tien que hacer yahir
function resumenTicket() {
    
}
// 
function cancelarPago() {
    if (confirm('¿Estás seguro de finalizar la compra?')) {
        // Confirmar antes de vaciar el carrito
        localStorage.removeItem('carrito');  // Eliminar carrito del localStorage
        mostrarCarrito();  // Actualizar la vista del carrito 
    } else {
        alert('Compra cancelada');
    }
}