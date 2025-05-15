document.addEventListener('DOMContentLoaded',async function(){
    console.log("Cargado el DOM en peidido.js");
    

    // Recuperar datos del local storage al cargar la página
    const pedidoGuardado = localStorage.getItem('pedido');

    if (pedidoGuardado) {
        const pedido = JSON.parse(pedidoGuardado);
        pedido.forEach(item => {
            agregarProductoAlPedido(item.nombre, item.precio, item.cantidad, item.id, item.numOrden);
        });
    }

    let contMarchas = 1;
    const btnMarchar = document.getElementById('marchar');
    btnMarchar.innerText = `Marchar Nº ${contMarchas} `;

    // Event listener para marchar comanda
    btnMarchar.addEventListener('click', () => { 
        marcharComanda();
    });
});

export function handlerProductos(){
    document.querySelectorAll('.productos').forEach(productoEl => {
        productoEl.addEventListener('click', () => {
            const id = productoEl.dataset.producto;
            const nombre = productoEl.querySelector('p').textContent;
            const precio = productoEl.querySelector('span').textContent.replace('€', '');
            const numOrden = productoEl.dataset.numOrden;
            agregarProductoAlPedido(nombre, precio,1, id, numOrden);
        });
    });
}


export function agregarProductoAlPedido(nombre, precio, cantidad = 1, id) {
    const pedidoLista = document.querySelector('.pedido ul');

    // Verifica si el producto ya está en la lista
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

    // Crear nuevo producto
    const li = document.createElement('li');
    li.dataset.id = id;
    li.dataset.nombre = nombre;
    li.dataset.precioUnitario = precio;
    li.dataset.cantidad = cantidad;
    li.dataset.orden = 1;
    li.dataset.estado = false;

    li.innerHTML = `
        ${nombre} <span class="cantidad">x${cantidad}</span> - 
        <span class="precio-total">${(precio * cantidad).toFixed(2)}€</span>
    `;

    // Crear desplegable al hacer click
    li.addEventListener('click', (e) => {
        // Evitar múltiples desplegables
        if (li.querySelector('.editor')) {
            return;
        }

        const editor = document.createElement('div');
        editor.classList.add('editor');
        editor.innerHTML = `
            <input type="number" min="1" value="${li.dataset.cantidad}" />
            <button class="guardar">Guardar</button>
            <button class="eliminar">Eliminar</button>
        `;

        // Evitar que el editor desaparezca al hacer clic dentro de él
        editor.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Guardar cambios
        editor.querySelector('.guardar').addEventListener('click', () => {
            const nuevaCantidad = parseInt(editor.querySelector('input').value);
            if (nuevaCantidad < 1) return;
            li.dataset.cantidad = nuevaCantidad;
            li.querySelector('.cantidad').textContent = `x${nuevaCantidad}`;
            li.querySelector('.precio-total').textContent = `${(nuevaCantidad * precio).toFixed(2)}€`;
            editor.remove(); // Eliminar el editor al guardar
            actualizarTotal();
            guardarPedidoEnLocalStorage();
        });

        // Eliminar producto
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
    let total = 0;

    [...pedidoLista.children].forEach(li => {
        const cantidad = parseInt(li.dataset.cantidad);
        const precio = parseFloat(li.dataset.precioUnitario);
        total += cantidad * precio;
    });

    totalSpan.textContent = `${total.toFixed(2)}€`;
}


function guardarPedidoEnLocalStorage() {
    const pedidoLista = document.querySelector('.pedido ul');
    const pedido = [...pedidoLista.children].map(li => {
        return {
            id: li.dataset.id,
            nombre: li.dataset.nombre,
            precio: parseFloat(li.dataset.precioUnitario),
            cantidad: parseInt(li.dataset.cantidad),
            orden: parseInt(li.dataset.orden),
            estado: li.dataset.estado
        };
    });
    localStorage.setItem('pedido', JSON.stringify(pedido));
}

//marchar comanda
function marcharComanda() {
    const pedidoLista = JSON.parse(localStorage.getItem('pedido'));
    if (!pedidoLista) return;

    const marchar = pedidoLista.filter(item => 
        item.orden == 1 && item.estado == 'false'
    ).map(item => {
        return {
            id: item.id,
            nombre: item.nombre,
            cantidad: parseInt(item.cantidad),
            };
         });
    // Aquí puedes realizar alguna acción con los elementos filtrados
    console.log('Productos marchados:', marchar);
    const listaMarchas = JSON.parse(localStorage.getItem('marchas'));
    listaMarchas.marchados.push(marchar);
    localStorage.setItem('marchas', JSON.stringify(listaMarchas));
    return marchar;
}