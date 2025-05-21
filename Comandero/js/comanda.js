// datos de la cabecera de la comanda
document.addEventListener("DOMContentLoaded", () => {
    const sala = localStorage.getItem("sala") || "SALA DESCONOCIDA";
    const comensales = localStorage.getItem("comensales") || "0";
    const pedidoJSON = localStorage.getItem("pedido");

    // Mostrar sala y comensales
    document.querySelector(".empresa").textContent = sala;
    document.querySelector(".datosEmpresa").textContent = `COMENSALES: ${comensales}`;

    // Mostrar pedido
    const listaCobro = document.getElementById("listaCobro");
    if (pedidoJSON) {
        const pedido = JSON.parse(pedidoJSON);
        pedido.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.cantidad} x ${item.nombre}`;
            listaCobro.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "No hay productos en el pedido.";
        listaCobro.appendChild(li);
    }
});

function imprimirTicket() {
    const idComanda = localStorage.getItem("idComanda");
    const sala = localStorage.getItem("sala") || "SALA DESCONOCIDA";
    const comensales = localStorage.getItem("comensales") || "0";
    const pedido = JSON.parse(localStorage.getItem("pedido") || "[]");

    if (!idComanda) {
        alert("No se encontró el ID de la comanda.");
        return;
    }

    fetch("https://apiostalaritza.lhusurbil.eus/PutCerrarComanda", {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idComanda: idComanda,
            sala: sala,
            comensales: comensales,
            pedido: pedido
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(JSON.stringify(error.errors || error));
            });
        }
        // Imprime el ticket si todo va bien
        window.print();
    })
    .catch(error => {
        alert("No se pudo cerrar la comanda:\n");
    });
}

