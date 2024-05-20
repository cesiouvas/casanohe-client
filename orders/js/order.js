// ruta conexión api
import { route } from '../../js/main.js'

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
        url: route + 'getDetallePedido',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        data: {
            order_id: order_id
        },
        success: function (response) {
            cargarDetallePedido(response.data)
            order_details = response.data
        },
    })

    $.ajax({
        type: "GET",
        url: route + 'getLineasPedido',
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
}

// detalle del pedido
function cargarDetallePedido(detalle) {
    let cadDetalle = ``
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

// lineas del pedido
function cargarLineasPedido(lineas) {
    console.log(order_details);
    let cadLine = `<table id="tablaDetalle" class="table">
        <tr>
            <th>Producto</th>
            <th>Total</th>
        </tr>`
    console.log(lineas);
    lineas.forEach(line => {
        cadLine += `<tr>
            <td>
                <img class="order-image" src="../img/${line.image}.png">
                <a>${line.name} x ${line.quantity_line}</a>
            </td>
            <td>${line.quantity_line * line.price}.00 €</td>
        </tr>`
    });

    cadLine += `
        <tr>
            <td>Subtotal:</td>
            <td>${order_details.totalPrice} €</td>
        </tr>
        <tr>
            <td>Envío:</td>
            <td>Gratis</td>
        </tr>
        <tr>
            <td>Método de pago:</td>
            <td>Tarjeta de Visa débito</td>
        </tr>
        <tr>
            <td>Total:</td>
            <td>${order_details.totalPrice} €</td>
        </tr>
    </table>`
    
    // tabla con precios totales
    $('#tablaDetalle').append(cadLine)
}