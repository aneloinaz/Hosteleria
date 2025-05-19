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
            const mesaId = localStorage.getItem('mesaSeleccionada');
            if (!mesaId) {
                alert('No se ha seleccionado ninguna mesa.');
                return;
            }

            const pedidoGuardado = localStorage.getItem(`pedido_mesa_${mesaId}`);
            if (!pedidoGuardado) {
                alert('No hay productos en el pedido.');
                return;
            }
            const pedido = JSON.parse(pedidoGuardado);

            // 1. Crear la comanda
            console.log('mesaId que se envía a crearComanda:', mesaId);
            await crearComanda(mesaId);

            // 2. Esperar y obtener comandas abiertas
            await new Promise(resolve => setTimeout(resolve, 500));
            const comandasAbiertas = await obtenerComandasAbiertas(mesaId);
            console.log('Comandas abiertas:', comandasAbiertas);
            if (comandasAbiertas.length === 0) {
                alert('No se encontraron comandas abiertas.');
                return;
            }

            let idComanda = null;
            let lista = Array.isArray(comandasAbiertas)
                ? comandasAbiertas
                : (comandasAbiertas.comandas || []);
            console.log('Lista de comandas abiertas:', lista);

            if (lista.length > 0) {
                // Busca el campo correcto en el último elemento
                const comandaReciente = lista[lista.length - 1];
                console.log('Comanda reciente:', comandaReciente);

                // Busca el primer campo numérico válido
                idComanda =
                    comandaReciente.idComanda ||
                    comandaReciente.Idcomanda ||
                    comandaReciente.id ||
                    comandaReciente.comandaId ||
                    null;

                // Si sigue sin encontrarse, busca cualquier campo numérico
                if (!idComanda) {
                    for (const key in comandaReciente) {
                        if (
                            typeof comandaReciente[key] === 'number' &&
                            comandaReciente[key] > 0
                        ) {
                            idComanda = comandaReciente[key];
                            break;
                        }
                    }
                }
            }
            console.log('idComanda:', idComanda);

            // Comprobar si el idComanda es válido
            if (!idComanda) {
                alert('No se pudo obtener el id de la comanda.');
                return;
            }
            // Guardar el idComanda en el local storage
            localStorage.setItem('idComanda', idComanda);
            // Mostrar el idComanda en la consola
            console.log('idComanda guardado en local storage:', idComanda);
            console.log('idComanda obtenido:', idComanda);

            // 4. Insertar detalles de la comanda usando array de objetos
            const detalles = pedido.map(producto => {
                console.log('Producto en pedido:', producto); // Depuración
                return {
                    idComanda: Number(idComanda),
                    idProducto: Number(producto.id), // Solo el id limpio
                    cantidad: Number(producto.cantidad)
                    // Si necesitas numOrden, puedes añadirlo aquí: numOrden: producto.numOrden
                };
            });

            console.log('Body que se envía a detalle (prueba):', detalles);

            const urlDetalle = `https://apiostalaritza.lhusurbil.eus/PostInsertDetalleComanda`;
            const resDetalle = await fetch(urlDetalle, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(detalles)
            });

            let dataDetalle = null;
            const textDetalle = await resDetalle.text();
            try {
                dataDetalle = textDetalle ? JSON.parse(textDetalle) : {};
            } catch (e) {
                console.error('Respuesta no es JSON válido:', textDetalle);
                dataDetalle = {};
            }
            console.log('Respuesta detalle:', dataDetalle);

            if (!resDetalle.ok || dataDetalle.ok === false) {
                alert('Error al insertar detalle de comanda: ' + (dataDetalle.status || ''));
                return;
            }

            alert('Comanda enviada correctamente');
            // Limpia el pedido y vuelve a la sala
            localStorage.removeItem(`pedido_mesa_${mesaId}`);
            window.location.href = 'salas1.html';
            
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
    container.innerHTML = '';

    if (productos.length === 0) {
        container.innerHTML = 'No se encontraron productos.';
        return;
    }
    const containerHTML = productos.map(producto => {
        // Si producto.numOrden no existe, pon 1 por defecto
        return `
            <div class="productos" data-producto="${producto.id}">
                <p>${producto.nombre}</p>
                <span>${producto.precio}€</span>
            </div>
        `;
    }).join('');

    container.innerHTML = containerHTML;
    handlerProductos();
}

// Función para crear la comanda
async function crearComanda(idMesa) {
    const url = `https://apiostalaritza.lhusurbil.eus/PostCrearComanda?idMesa=${idMesa}`;
    const res = await fetch(url, { method: 'POST' });
    const data = await res.json();
    console.log('Respuesta JSON de PostCrearComanda:', data);
    return data;
}

// Función para obtener comandas abiertas de una mesa
async function obtenerComandasAbiertas(idMesa) {
    const url = `https://apiostalaritza.lhusurbil.eus/GetComandasMesaAbiertas?idMesa=${idMesa}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log('Comandas abiertas recibidas:', data); // <-- aquí el cambio
    return data;
}

// Función para insertar un detalle de comanda
async function insertarDetalleComanda(idComanda, producto) {
    const urlDetalle = `https://apiostalaritza.lhusurbil.eus/PostInsertDetalleComanda`;
    const comanda = [{
        idComanda: Number(idComanda),
        idProducto: Number(producto.id),
        cantidad: Number(producto.cantidad)
    }];
    console.log('Body que se envía:', comanda);
    const resDetalle = await fetch(urlDetalle, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comanda)
    });

    let dataDetalle = null;
    const textDetalle = await resDetalle.text();
    try {
        dataDetalle = textDetalle ? JSON.parse(textDetalle) : {};
    } catch (e) {
        console.error('Respuesta no es JSON válido:', textDetalle);
        dataDetalle = {};
    }
    console.log('Respuesta detalle:', dataDetalle);

    if (!resDetalle.ok || dataDetalle.ok === false) {
        alert('Error al insertar detalle de comanda: ' + (dataDetalle.status || ''));
        return false;
    }
    return true;
}