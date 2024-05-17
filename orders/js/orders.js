// ruta conexión api
import { route } from '../../js/main.js'

let sidebarCarrito = document.getElementById('sidebarCarrito')

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
        getCustomPedidos()
    }
})

// solicitud ajax pedidos
function getPedidos() {
    $.ajax({
        type: "GET",
        url: route + 'getPedidosUsuario',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        success: function (response) {
            pintaPedidos(response.data)
        },
    })
}

// solicitud ajax pedidos personalizados
function getCustomPedidos() {
    $.ajax({
        type: "GET",
        url: route + 'getCustomPedidosUsuario',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        success: function (response) {
            pintaPedidosPersonalizados(response.data)
        },
    })
}

// set estaado según lo que se reciba
function setEstado(status) {
    let estado

    // estado del pedido
    switch (status) {
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
    return estado
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

        estado = setEstado(pedido.order_status)

        cad += `<tr>
            <td>#${pedido.id}</td>
            <td>${dia} ${mes} ${any}</td>
            <td>${estado}</td>
            <td>${pedido.totalPrice}€</td>
            <td>
                <button id="verPedido${pedido.id}" class="btn btn-primary">Ver en detalle</button>
            </td>
        </tr>`
    });

    $('#myOrders').append(cad)

    // asignar evento a cada botón para ver la vista detallada
    pedidos.forEach(btn => {
        $('#verPedido' + btn.id).on('click', function () {
            window.location.replace('./order.html?order_id=' + btn.id)
        })
    });
}

// print pedido personalizado
function pintaPedidosPersonalizados(custom) {
    let estado
    let cad = ``

    custom.forEach(pedido => {
        // parsear fecha
        let fecha = new Date(pedido.created_at);
        let dia = fecha.getDate();
        let mesNumero = fecha.getMonth();
        let any = fecha.getFullYear();

        // Obtener el nombre del mes
        let mes = nombresMeses[mesNumero];

        estado = setEstado(pedido.status)

        cad += `<tr>
            <td>#${pedido.id}</td>
            <td>${dia} ${mes} ${any}</td>
            <td>${estado}</td>`
            
        if (pedido.price == 0) {
            cad += `<td>No definido</td>`
        } else {
            cad += `<td>${pedido.price}€</td>`
        }

        cad += `<td>
                <button id="verPedido${pedido.id}" class="btn btn-primary">Ver en detalle</button>
            </td>
        </tr>`

        $('#myCustomOrders').append(cad)
    })
}