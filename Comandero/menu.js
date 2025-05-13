document.addEventListener('DOMContentLoaded', async () => {
    const categorias = await fetchCategorias();
    
    if (categorias.length > 0) {
        const primeraId = categorias[0].id;

        const subcategorias = await fetchSubCategorias(primeraId);

        //mostrar lista de categorias al cargar
        mostrarCategorias(categorias);
        mostrarSubCategorias(subcategorias);
        //depurar
        console.log('Subcategorías de la primera categoría:', subcategorias);
    }
    // Event listener de categorias para que muestren Subcategorias
    document.querySelectorAll('[categiria-datos]').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const id = e.target.dataset.categoriaId;

            // Llamamos a fetchSubCategorias con el id de la categoría seleccionada
            const subcategorias = await fetchSubCategorias(id);
            console.log('Subcategorías:', subcategorias);
            mostrarSubcategorias(subcategorias);
        });
    });

    // Event listener para cuando se hace clic en una subcategoría
    document.addEventListener('click', async (e) => {
        if (e.target.matches('[data-subcategoria-id]')) {
            const id = e.target.dataset.subcategoriaId;
            const productos = await fetchProductos(id);
            console.log('Productos:', productos);
            mostrarProductos(productos);
        }
    });
});



function mostrarProductos(productos) {
    const container = document.getElementById('resultados');
    container.innerHTML = ''; // Limpiar resultados previos

    if (productos.length === 0) {
        container.innerHTML = 'No se encontraron productos.';
        return;
    }

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.textContent = `${producto.nombre} - ${producto.precio}€`;
        container.appendChild(div);
    });
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
            <li href="#" categoria-datos="${cat.id}">${cat.nombre}</li>
        `;
    }).join('');
    container.innerHTML = categoriasHTML;
}

//GENERADORES PARA LISTAR PRODUCTOS

// Funciones para mostrar los resultados en el DOM
function mostrarSubCategorias(subcategorias) {
    const container = document.getElementById('containerSubCategorias');
    container.innerHTML = ''; // Limpiar resultados previos

    if (subcategorias.length === 0) {
        container.innerHTML = 'No se encontraron subcategorías.';
        return;
    }

    const containerHTML = subcategorias.map(subcategoria => {
        return `
            <div class="subCategoria">
                <img src="https://as2.ftcdn.net/v2/jpg/00/19/81/87/1000_F_19818729_Jo5Q24Kdc1Sx9GE4m3z1QGhX6qRNLoTV.jpg" alt="${subcategoria.nombre}"/>
                <span>${subcategoria.nombre}</span>
            </div>
        `;
    }).join('');

    container.innerHTML = containerHTML;
    
}
