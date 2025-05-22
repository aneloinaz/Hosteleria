import { pintarPedidoUlConEstado } from "./menu.js";

// Asegura que solo se añada una vez el listener al evento DOMContentLoaded
if (!window.domReadyListenerAdded) {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente cargado");
  });
  window.domReadyListenerAdded = true;
}

document.addEventListener('DOMContentLoaded', async function () {
    console.log("Cargado el DOM en pedido.js");

    // Recuperar datos del local storage al cargar la página
    const mesaId = localStorage.getItem('mesaSeleccionada');
    if (!mesaId) return;
    const pedidoGuardado = localStorage.getItem(`pedido_mesa_${mesaId}`);
    if (pedidoGuardado) {
        const pedido = JSON.parse(pedidoGuardado);
        pedido.forEach(item => {
            // Fuerza el precio a número válido
            const precio = parseFloat(item.precio);
            agregarProductoAlPedido(item.nombre, isNaN(precio) ? 0 : precio, item.cantidad, item.id, item.numOrden);
        });
    }
});

export function handlerProductos() {
    document.querySelectorAll('.productos').forEach(productoEl => {
        productoEl.addEventListener('click', () => {
            const id = productoEl.dataset.producto;
            const nombre = productoEl.querySelector('p').textContent;
            const precio = parseFloat(productoEl.dataset.precio); // Siempre float
            const numOrden = productoEl.dataset.numorden || 1;
            agregarProductoAlPedido(nombre, precio, 1, id, numOrden);
        });
    });
}

export function agregarProductoAlPedido(nombre, precio, cantidad = 1, id, numOrden) {
    precio = parseFloat(precio);
    if (isNaN(precio)) precio = 0;

    const pedidoLista = document.querySelector('.pedido ul');

    let itemExistente = [...pedidoLista.children].find(li => li.dataset.id === id);

    if (itemExistente) {
        let nuevaCantidad = parseInt(itemExistente.dataset.cantidad) + cantidad;
        itemExistente.dataset.cantidad = nuevaCantidad;
        itemExistente.querySelector('.cantidad').textContent = `x${nuevaCantidad}`;
        itemExistente.querySelector('.precio-total').textContent = `${(precio * nuevaCantidad).toFixed(2)}€`;
        actualizarTotal();
        guardarPedidoEnLocalStorage();
        return;
    }

    const li = document.createElement('li');
    li.dataset.id = id;
    li.dataset.nombre = nombre;
    li.dataset.precioUnitario = precio; // Siempre float
    li.dataset.cantidad = cantidad;
    li.dataset.orden = numOrden || 1;
    li.dataset.estado = false;

    li.innerHTML = `
        ${nombre} <span class="cantidad">x${cantidad}</span> - 
        <span class="precio-total">${(precio * cantidad).toFixed(2)}€</span>
    `;

    li.addEventListener('click', (e) => {
        if (li.querySelector('.editor')) return;

        const editor = document.createElement('div');
        editor.classList.add('editor');
        editor.innerHTML = `
            <input type="number" min="1" value="${li.dataset.cantidad}" />
            <button class="guardar">Guardar</button>
            <button class="eliminar">Eliminar</button>
        `;

        editor.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        editor.querySelector('.guardar').addEventListener('click', () => {
            const nuevaCantidad = parseInt(editor.querySelector('input').value);
            if (nuevaCantidad < 1) return;
            li.dataset.cantidad = nuevaCantidad;
            li.querySelector('.cantidad').textContent = `x${nuevaCantidad}`;
            li.querySelector('.precio-total').textContent = `${(nuevaCantidad * precio).toFixed(2)}€`;
            editor.remove();
            actualizarTotal();
            guardarPedidoEnLocalStorage();
        });

        editor.querySelector('.eliminar').addEventListener('click', () => {
            li.remove();
            actualizarTotal();
            guardarPedidoEnLocalStorage();
        });

        li.appendChild(editor);
    });

    pedidoLista.appendChild(li);
    actualizarTotal();
    guardarPedidoEnLocalStorage();
}

function actualizarTotal() {
    const totalSpan = document.querySelector('.total span');
    const pedidoLista = document.querySelector('.pedido ul');
    let totalPendientes = 0;

    [...pedidoLista.children].forEach(li => {
        const cantidad = parseInt(li.dataset.cantidad) || 0;
        const precio = parseFloat(li.dataset.precioUnitario) || 0;
        totalPendientes += cantidad * precio;
    });

    // Suma el total de productos ya enviados (de la comanda)
    const totalEnviados = window.totalEnviadosComanda || 0;
    const total = totalPendientes + totalEnviados;

    totalSpan.textContent = `${total.toFixed(2)}€`;
}

function guardarPedidoEnLocalStorage() {
    const mesaId = localStorage.getItem('mesaSeleccionada');
    if (!mesaId) return;
    const pedidoLista = document.querySelector('.pedido ul');
    const pedido = [...pedidoLista.children].map(li => {
        return {
            id: li.dataset.id,
            nombre: li.dataset.nombre,
            precio: parseFloat(li.dataset.precioUnitario) || 0, // <-- SIEMPRE FLOAT Y NUNCA NaN
            cantidad: parseInt(li.dataset.cantidad) || 0,
            numOrden: parseInt(li.dataset.orden) || 1,
            estado: li.dataset.estado
        };
    });
    localStorage.setItem(`pedido_mesa_${mesaId}`, JSON.stringify(pedido));
}
