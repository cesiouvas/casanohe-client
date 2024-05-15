let paramURL = new URLSearchParams(window.location.search)
let order_id = paramURL.get('order_id')

// variables útiles
let order_lines = []
let order_details = []
let estado

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
        url: 'http://localhost:8000/api/getLineasPedido',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        data: {
            order_id: order_id
        },
        success: function (response) {
            cargarLineasPedido(response.data)
        },
    })

    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/getDetallePedido',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        data: {
            order_id: order_id
        },
        success: function (response) {
            cargarDetallePedido(response.data)
        },
    })
}

function cargarDetallePedido(detalle) {
    let cadDetalle = ``
    console.log(detalle);
    // parsear fecha
    let fecha = new Date(detalle.created_at);
    let dia = fecha.getDate();
    let mesNumero = fecha.getMonth();
    let any = fecha.getFullYear();

    // Obtener el nombre del mes
    let mes = nombresMeses[mesNumero];

    cadDetalle += `<p class="order-info ps-4">El pedido <b>#${detalle.id}</b> se realizó el ${dia} de ${mes} de ${any} y su estado es:`

    // set del estado del pedido
    switch (detalle.order_status) {
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
    cadDetalle += ` <b>${estado}</b></p>`

    $('#infoFechaPedido').html(cadDetalle)
}

function cargarLineasPedido() {

}