import { llenarCarrito } from '../../js/main.js'
// ruta conexión api
import { route } from '../../js/main.js'

let comproCarrito = []

let tokenusu = sessionStorage.getItem('tokenusu')

let cad = ``
let totalPrice = 0

let userData

window.addEventListener('load', function () {
    // obtener datos de usuario
    if (tokenusu) {
        getUserData()
    }

    $('#confirmarPedido').on('click', function () {
        if (comproCarrito.length === 0) { // carrito vacío
            $("#errorCarritoVacio").removeAttr("hidden");
            setTimeout(() => {
                $("#errorCarritoVacio").attr("hidden", true);
            }, 5000);
        } else {
            // no está definido dni o dirección
            if (!userData.dni || !userData.address || !userData.city || !userData.country) {
                $("#errorPedido").removeAttr("hidden");
                setTimeout(() => {
                    $("#errorPedido").attr("hidden", true);
                }, 5000);
            } else {
                // completar pedido
                procesarPedido()
            }
        }
    })
})

// datos de usuario
function getUserData() {
    $.ajax({
        type: "GET",
        url: route + 'getUserData',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        success: function (response) {
            userData = response.data
        },
    })
}

export function carritoPerfil(carrito) {
    let cartIds = []
    comproCarrito = carrito
    cad = ``
    totalPrice = 0

    // si el carrito está vacío
    if (carrito.length == 0) {
        cad = `<h1>El carrito está vacío</h1>
        <h3>Navega por nuestros productos!</h3>`
    } else {
        carrito.forEach(product => {
            // id de linea del carrito
            cartIds.push(product.scid)

            // sumar al coste total el coste de cada línea parseando a float
            totalPrice += parseFloat(product.price * product.line_quantity)

            cad += `<div class="row justify-content-center pb-4" style="height: 150px">
                <div id="img" class="col-3 d-flex justify-content-center align-items-center text-center">
                    <img class="cartImage" src="../img/${product.image}.png" alt="${product.image}">
                </div>
                <div id="content" class="col-4 d-flex justify-content-center align-items-center text-center">
                    <p>${product.name} | ${product.type} x ${product.line_quantity}</p>
                </div>
                <div id="content" class="col-1 d-flex justify-content-center align-items-center text-center">
                    <p>${product.price * product.line_quantity}€</p>
                </div>
                <div id="content" class="col-3 d-flex justify-content-center align-items-center text-center">
                    <div class="quantity-selector">
                        <button id="decreaseInProfile${product.scid}"><i class="fas fa-minus">-</i></button>
                        <input type="number" id="quantityInProfile${product.scid}" value="${product.line_quantity}" min="0" readonly>
                        <button id="increaseInProfile${product.scid}"><i class="fas fa-plus">+</i></button>
                    </div>
                </div>
                <div class="col-1 d-flex justify-content-center align-items-center text-center">
                    <button class="btnCarrito" id="deleteLineInProfile${product.scid}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"/></svg>
                    </button>
                </div>
            </div>`
        });

        $('#contentCarrito').html(cad)
        $('#contentCarrito-movil').html(cad)
    }

    cad = `<div class="d-flex justify-content-between">
            <h4 class="mr-auto">SUBTOTAL</h4>
            <h4 class="ml-auto">${totalPrice} €</h4>
        </div>
        <div class="d-flex justify-content-between">
            <h4 class="mr-auto">Envío</h4>
            <p class="ml-auto">Gratis</p>
        </div>`

    $('#totalPrices').html(cad)
    $('#totalPrices-movil').html(cad)

    // eliminar línea del carrito
    deleteCartLine(cartIds)

    createQuantityButtons(carrito, cartIds)
}

// crear los botones de cantidad con sus funcionalidades
function createQuantityButtons(data, cartIds) {
    data.forEach(button => {
        // sumar cantidad
        $('#decreaseInProfile' + button.scid).on('click', function () {
            let currentValue = parseInt($('#quantityInProfile' + button.scid).val())
            if (currentValue > 0) { // no posible menor que 0
                $('#quantityInProfile' + button.scid).val(currentValue - 1)
                actualizarCarrito(cartIds)
            }
        })

        // restar cantidad
        $('#increaseInProfile' + button.scid).on('click', function () {
            let currentValue = parseInt($('#quantityInProfile' + button.scid).val())
            if (currentValue < button.quantity) { // la cantidad no podrá ser mayor que el stock
                $('#quantityInProfile' + button.scid).val(currentValue + 1)
                actualizarCarrito(cartIds)
            }
        })
    })
}

// actualizar lineas de carrito
function actualizarCarrito(cartIds) {
    let quantities = []

    // almacenar las cantidades de cada línea
    for (let i = 0; i < cartIds.length; i++) {
        quantities.push(parseInt($('#quantityInProfile' + cartIds[i]).val()))
    }

    $.ajax({
        type: "PUT",
        url: route + 'actualizarCarrito',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        data: {
            quantityLines: quantities,
            cartIds: cartIds,
        },
        success: function (response) {
            console.log("carrito actualizado");
        },
    })
}

// eliminar linea del carrito
function deleteCartLine(cartIds) {
    cartIds.forEach(cartLine => {
        // asignarle el evento a cada botón
        $('#deleteLineInProfile' + cartLine).on('click', function () {
            // si se confirma se elimina
            if (confirm('De verdad quieres eliminar estos productos?')) {
                // ajax para eliminar la línea
                $.ajax({
                    type: "DELETE",
                    url: route + 'deleteCartLine',
                    dataType: "json",
                    headers: {
                        Authorization: 'Bearer ' + tokenusu
                    },
                    data: {
                        line: cartLine
                    },
                    success: function (response) {
                        // recargar carrito
                        llenarCarrito()
                    },
                })
            }
        })
    });
}

function procesarPedido() {
    $.ajax({
        type: "POST",
        url: route + 'crearPedido',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        data: {
            totalPrice: totalPrice
        },
        success: function (response) {
            // cerrar modal
            $(function () {
                $('#modalConfirmPedido').modal('toggle');
            });

            // recargar carrito
            llenarCarrito()
        },
        error: function (xhr, status, error) {
            console.error("Error al hacer el pedido:", error);
        }
    })
}
