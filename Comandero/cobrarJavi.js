document.addEventListener('DOMContentLoaded', () => {
    const btnEfectivo = document.getElementById('boton-efectivo');
    const btnTarjeta = document.getElementById('boton-tarjeta');
    const btnCancelar = document.getElementById('boton-cancelar');
    const resumenLista = document.querySelector('.resumen-listado');
    const totalBarra = document.querySelector('.total-barra');

    const pedidoGuardado = localStorage.getItem('pedido');
    if (pedidoGuardado) {
        const pedido = JSON.parse(pedidoGuardado);
        let total = 0;
        const html = pedido.map(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            return `<p>${item.nombre} x${item.cantidad} - ${subtotal.toFixed(2)}€</p>`;
        }).join('');
        resumenLista.innerHTML = html;
        totalBarra.innerHTML = `Total: ${total.toFixed(2)}€`;
    }

    const finalizarPago = (tipo) => {
        alert(`Cobro con ${tipo} realizado`);
        localStorage.removeItem('pedido');
        window.location.href = 'menu.html';
    };

    if (btnEfectivo) btnEfectivo.addEventListener('click', () => finalizarPago('EFECTIVO'));
    if (btnTarjeta) btnTarjeta.addEventListener('click', () => finalizarPago('TARJETA'));
    if (btnCancelar) btnCancelar.addEventListener('click', () => {
        window.location.href = 'menu.html';
    });
});
