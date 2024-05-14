let sidebarCarrito = document.getElementById('sidebarCarrito')
let myOrders = document.getElementById('myOrders')

// meses
let nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// token de sesión
let tokenusu = sessionStorage.getItem('tokenusu')

window.addEventListener('load', () => {
    if (tokenusu) {
        getPedidos()
    }
})

function getPedidos() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/getPedidosUsuario',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        success: function (response) {
            pintaPedidos(response.data)
        },
    })
}

function pintaPedidos(pedidos) {
    let estado
    let cad = ``
    pedidos.forEach(pedido => {
        // parsear fecha
        let fecha = new Date(pedido.created_at);
        let dia = fecha.getDate();
        let mesNumero = fecha.getMonth();
        let any = fecha.getFullYear();

        // Obtener el nombre del mes
        let mes = nombresMeses[mesNumero];

        // estado del pedido
        switch (pedido.order_status) {
            case 0:
                estado = 'Recibido'
                break
            case 1:
                estado = 'Admitido'
                break
            case 2:
                estado = 'En preparación'
                break
            case 3:
                estado = 'En reparto'
                break
            case 4:
                estado = 'Entregado'
                break
        }

        cad += `<tr>
            <td>#${pedido.id}</td>
            <td>${dia} ${mes} ${any}</td>
            <td>${estado}</td>
            <td>${pedido.totalPrice}€</td>
            <td>
                <button class="btn btn-primary">Ver en detalle</button>
            </td>
        </tr>`
    });

    myOrders.innerHTML += cad
}