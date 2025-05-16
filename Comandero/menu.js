import { handlerProductos } from "./pedido.js";

document.addEventListener('DOMContentLoaded', async () => {
    // meter manualmente la mesa
    const mesa = 1;
    const comensales = 4;
    const hora = new Date().toLocaleTimeString();
    const fecha = new Date().toLocaleDateString();
    // Guardar datos de la mesa en el local storage
    localStorage.setItem('datosMesa', JSON.stringify({ mesa, comensales, hora, fecha }));




    const datosMesa = JSON.parse(localStorage.getItem('datosMesa'));


    if (!datosMesa) {
        alert('No se han encontrado datos de la mesa. Por favor, vuelve a la página anterior.');
        window.location.href = 'index.html';
    }

    //

    const categoriasJson = await fetchCategorias();

    if (categoriasJson.categorias.length > 0) {
        const primeraId = categoriasJson.categorias[0].id;

        const subcategoriasJson = await fetchSubCategorias(primeraId);

        //mostrar lista de categorias al cargar
        mostrarCategorias(categoriasJson.categorias);
        mostrarSubCategorias(subcategoriasJson.categorias);
    }
    // Event listener de categorias para que muestren Subcategorias
    document.querySelectorAll('#containerCategorias li').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const id = e.currentTarget.dataset.categoria;

            // Llamamos a fetchSubCategorias con el id de la categoría seleccionada
            const subcategorias = await fetchSubCategorias(id);
            mostrarSubCategorias(subcategorias.categorias);
        });
    });

    const btnEnviar = document.getElementById('boton-esperar');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', async () => {
            // Recupera el id de la mesa seleccionada
            const mesaId = localStorage.getItem('mesaSeleccionada');
            if (!mesaId) {
                alert('No se ha seleccionado ninguna mesa.');
                return;
            }

            // Recupera el pedido de la mesa
            const pedidoGuardado = localStorage.getItem(`pedido_mesa_${mesaId}`);
            if (!pedidoGuardado) {
                alert('No hay productos en el pedido.');
                return;
            }
            const pedido = JSON.parse(pedidoGuardado);

            // 1. Crear la comanda
            const idMesa = localStorage.getItem('mesaSeleccionada');
            console.log('idMesa que se envía:', idMesa);
            const url = `https://apiostalaritza.lhusurbil.eus/PostCrearComanda?idMesa=${idMesa}`;
            const res = await fetch(url, { method: 'POST' });
            const data = await res.json();
            console.log('Respuesta JSON de PostCrearComanda:', data); // <-- Pega aquí el resultado
            const idComanda = data.idComanda || data.IdComanda || data.id || data.comandaId;
            console.log('ID Comanda:', idComanda);
            if (!idComanda) {
                alert('No se pudo crear la comanda.');
                return;
            }

            console.log('Respuesta JSON de PostCrearComanda:', data);

            // 2. Insertar detalles de la comanda
            for (const producto of pedido) {
                console.log('Insertando detalle:', {
                    idComanda,
                    idProducto: producto.id,
                    cantidad: producto.cantidad
                });
                const urlDetalle = `https://apiostalaritza.lhusurbil.eus/PostInsertDetalleComanda?idComanda=${encodeURIComponent(idComanda)}&idProducto=${encodeURIComponent(producto.id)}&cantidad=${encodeURIComponent(producto.cantidad)}`;
                const resDetalle = await fetch(urlDetalle, {
                    method: 'POST'
                });
                const dataDetalle = await resDetalle.json();
                console.log('Respuesta detalle:', dataDetalle);
                if (!resDetalle.ok || dataDetalle.ok === false) {
                    alert('Error al insertar detalle de comanda: ' + (dataDetalle.status || ''));
                    return;
                }
            }

            alert('Comanda enviada correctamente');
            // Limpia el pedido y vuelve a la sala
            localStorage.removeItem(`pedido_mesa_${mesaId}`);
            if (mesaId === '1' || mesaId === '2') {
                window.location.href = 'salas1.html';
            } else {
                window.location.href = 'salas2.html';
            }
        });
    }
});

// Funciones que realizan fetch de tipo GET

async function fetchCategorias() {
    try {
        const res = await fetch('https://apiostalaritza.lhusurbil.eus/GetCategorias');
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
        const res = await fetch(`https://apiostalaritza.lhusurbil.eus/GetSubCategorias?idCategoria=${idCategoria}`);
        return await res.json();
    } catch (e) {
        console.error('Error cargando subcategorías');
        return [];
    }
}

async function fetchProductos(idSubCategoria) {
    try {
        // Cambié el parámetro de URL para obtener productos según subcategoría
        const res = await fetch(`https://apiostalaritza.lhusurbil.eus/GetProductos?idCategoria=${idSubCategoria}`);
        return await res.json();
    } catch (e) {
        console.error('Error cargando productos');
        return [];
    }
}

//GENERADORES, PARA QUE SEA DINAMICO

//GENERA LA LISTA DE CATEGORIAS
function mostrarCategorias(categorias) {
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
                <img src="https://www.euskoguide.com/images/san-sebastian/san-sebastian-pintxos.jpg" alt="${subcategoria.nombre}"/>
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
            const productosJson = await fetchProductos(id);
            console.log('productos:', productosJson);
            mostrarProductos(productosJson.productos);
        });
    });

}

function mostrarProductos(productos) {
    const container = document.getElementById('containerListadoDatos');
    container.innerHTML = ''; // Limpiar resultados previos

    if (productos.length === 0) {
        container.innerHTML = 'No se encontraron productos.';
        return;
    }
    const containerHTML = productos.map(producto => {
        return `
            <div class="productos" data-producto="${producto.id} data-numOrden=${producto.numOrden}">
                <p>${producto.nombre}</p>
                <span>${producto.precio}€</span>
            </div>
                <p>${producto.nombre}</p>
                <span>${producto.precio}€</span>
            </div>
            `;
    }).join('');

    container.innerHTML = containerHTML;
    handlerProductos();
}