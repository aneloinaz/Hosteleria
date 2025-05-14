document.addEventListener('DOMContentLoaded', async () => {
    // Recuperar datos del local storage al cargar la página
    const pedidoGuardado = localStorage.getItem('pedido');
    if (pedidoGuardado) {
        const pedido = JSON.parse(pedidoGuardado);
        pedido.forEach(item => {
            agregarProductoAlPedido(item.nombre, item.precio, item.cantidad, item.id);
        });
    }
    const categorias = await fetchCategorias();
    
    if (categorias.length > 0) {
        const primeraId = categorias[0].id;

        const subcategorias = await fetchSubCategorias(primeraId);

        //mostrar lista de categorias al cargar
        mostrarCategorias(categorias);
        mostrarSubCategorias(subcategorias);
    }
    // Event listener de categorias para que muestren Subcategorias
    document.querySelectorAll('#containerCategorias li').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const id = e.currentTarget.dataset.categoria;

            // Llamamos a fetchSubCategorias con el id de la categoría seleccionada
            const subcategorias = await fetchSubCategorias(id);
            mostrarSubCategorias(subcategorias);
        });
    });
});

function mostrarProductos(productos) {
    const container = document.getElementById('containerListadoDatos');
    container.innerHTML = ''; // Limpiar resultados previos

    if (productos.length === 0) {
        container.innerHTML = 'No se encontraron productos.';    
        return;
    }
    const containerHTML = productos.map(producto => {
        return `
            <div class="productos" data-producto="${producto.id}">
                <p>${producto.nombre}</p>
                <span>${producto.precio}€</span>
            </div>
            `;
        }).join('');   

    container.innerHTML = containerHTML;

    document.querySelectorAll('.productos').forEach(productoEl => {
        productoEl.addEventListener('click', () => {
            const id = productoEl.dataset.producto;
            const nombre = productoEl.querySelector('p').textContent;
            const precio = productoEl.querySelector('span').textContent.replace('€', '');
            agregarProductoAlPedido(nombre, precio,1, id);
        });
    });
}


function agregarProductoAlPedido(nombre, precio, cantidad = 1, id) {
    const pedidoLista = document.querySelector('.pedido ul');
    const totalSpan = document.querySelector('.total span');

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

    li.innerHTML = `
        ${nombre} <span class="cantidad">x${cantidad}</span> - 
        <span class="precio-total">${(precio * cantidad).toFixed(2)}€</span>
    `;

    // Crear desplegable al hacer click
    li.addEventListener('click', () => {
        // Evitar múltiples desplegables
        if (li.querySelector('.editor')) return;

        const editor = document.createElement('div');
        editor.classList.add('editor');
        editor.innerHTML = `
            <input type="number" min="1" value="${li.dataset.cantidad}" />
            <button class="guardar">Guardar</button>
            <button class="eliminar">Eliminar</button>
        `;

        // Guardar cambios
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

function guardarPedidoEnLocalStorage() {
    const pedidoLista = document.querySelector('.pedido ul');
    const pedido = [...pedidoLista.children].map(li => {
        return {
            id: li.dataset.id,
            nombre: li.dataset.nombre,
            precio: parseFloat(li.dataset.precioUnitario),
            cantidad: parseInt(li.dataset.cantidad)
        };
    });
    localStorage.setItem('pedido', JSON.stringify(pedido));
}


// Funciones que realizan fetch de tipo GET

async function fetchCategorias() {
    try {
        const res = await fetch('http://192.168.24.96:3000/categorias');
        return await res.json();
    } catch (e) {
        console.error('Error cargando categorías');
        return [];
    }
}

// Cambié la URL para incluir el parametro categoria_id
async function fetchSubCategorias(idCategoria) {
    try {
        // Aquí se ajusta la URL para cada categoria_id
        const res = await fetch(`http://192.168.24.96:3000/subcategorias?categoria_id=${idCategoria}`);
        return await res.json();
    } catch (e) {
        console.error('Error cargando subcategorías');
        return [];
    }
}

async function fetchProductos(idSubCategoria) {
    try {
        // Cambié el parámetro de URL para obtener productos según subcategoría
        const res = await fetch(`http://192.168.24.96:3000/productos?subcategoria_id=${idSubCategoria}`);
        return await res.json();
    } catch (e) {
        console.error('Error cargando productos');
        return [];
    }
}

//GENERADORES, PARA QUE SEA DINAMICO

//GENERA LA LISTA DE CATEGORIAS
const mostrarCategorias = (categorias)=>{
    const container = document.getElementById("containerCategorias");
    const categoriasHTML = categorias.map(cat => {
        return `
            <li href="#" data-categoria="${cat.id}">${cat.nombre}</li>
        `;
    }).join('');
    container.innerHTML = categoriasHTML;
}

//GENERADORES PARA LISTAR PRODUCTOS

// Funciones para mostrar los resultados en el DOM
function mostrarSubCategorias(subcategorias) {
    const container = document.getElementById('containerListadoDatos');
    container.innerHTML = ''; // Limpiar resultados previos

    if (subcategorias.length === 0) {
        container.innerHTML = 'No se encontraron subcategorías.';
        return;
    }
    const containerHTML = subcategorias.map(subcategoria => {
        return `
            <div class="subCategoria" data-subcategoria="${subcategoria.id}">
                <img src="https://as2.ftcdn.net/v2/jpg/00/19/81/87/1000_F_19818729_Jo5Q24Kdc1Sx9GE4m3z1QGhX6qRNLoTV.jpg" alt="${subcategoria.nombre}"/>
                <span>${subcategoria.nombre}</span>
            </div>
        `;
    }).join('');

    container.innerHTML = containerHTML;


    // Event listener de Subcategorias para que muestren productos
    Array.from(document.getElementsByClassName('subCategoria')).forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const id = e.currentTarget.dataset.subcategoria;

            // Llamamos a fetchSubCategorias con el id de la categoría seleccionada
            const productos = await fetchProductos(id);
            console.log('productos:', productos);
            mostrarProductos(productos);
        });
    });
    
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
