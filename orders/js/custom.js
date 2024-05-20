import { route } from '../../js/main.js'

let paramURL = new URLSearchParams(window.location.search)
let custom_id = paramURL.get('custom_id')

// meses
let nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// token de sesión
let tokenusu = sessionStorage.getItem('tokenusu')

window.addEventListener('load', () => {
    cargarPedido()
})

function cargarPedido() {
    $.ajax({
        type: "GET",
        url: route + 'getDetalleCustom',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        data: {
            custom_id: custom_id
        },
        success: function (response) {
            cargarDetallePedido(response.data)
        },
    })
}

function cargarDetallePedido(order) {
    let estado
    let cad = ``

    // parsear fecha
    let fecha = new Date(order.created_at);
    let dia = fecha.getDate();
    let mesNumero = fecha.getMonth();
    let any = fecha.getFullYear();

    // Obtener el nombre del mes
    let mes = nombresMeses[mesNumero];

    cad += `<p class="order-info ps-4">El pedido <b>#${order.id}</b> se realizó el ${dia} de ${mes} de ${any} y su estado es:`

    // set del estado del pedido
    switch (order.status) {
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
    // concatenar estado de pedido
    cad += ` <b>${estado}</b></p>`

    $('#infoFechaPedido').html(cad)

    $('#comments').val(order.comments)
}