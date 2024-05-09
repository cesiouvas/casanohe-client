import { llenarCarrito } from '../../js/main.js'

let contentCarrito = document.getElementById('contentCarrito')
let totalPrices = document.getElementById('totalPrices')

let tokenusu = sessionStorage.getItem('tokenusu')

let cad = ``
let totalPrice = 0

let userData

window.addEventListener('load', function () {
    // obtener datos de usuario
    getUserData()

    $('#confirmarPedido').on('click', function () {
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
    })
})

// datos de usuario
function getUserData() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/getUserData',
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
    totalPrice = 0
    
    // si el carrito está vacío
    if (carrito.length == 0) {
        contentCarrito.innerHTML = `<h1>El carrito está vacío</h1>
        <h3>Navega por nuestros productos!</h3>`
    } else {
        carrito.forEach(product => {
            // sumar al coste total el coste de cada línea parseando a float
            totalPrice += parseFloat(product.line_price)

            cad += `<div class="row justify-content-center pb-4" style="height: 150px">
                <div id="img" class="col-3" >
                    <img class="cartImage" src="../img/${product.image}.png" alt="${product.image}">
                </div>
                <div id="content" class="col-4">
                    <p>${product.name} | ${product.type}</p>
                </div>
                <div id="content" class="col-2 text-center">
                    <p>${product.price * product.line_quantity}€</p>
                </div>
                <div id="content" class="col-2">
                    <div class="quantity-selector">
                        <button id="decreaseInProfile${product.scid}"><i class="fas fa-minus">-</i></button>
                        <input type="number" id="quantityInProfile${product.scid}" value="${product.line_quantity}" min="0">
                        <button id="increaseInProfile${product.scid}"><i class="fas fa-plus">+</i></button>
                    </div>
                </div>
                <div class="col-1">
                    <button class="btnCarrito" id="deleteLineInProfile${product.scid}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"/></svg>
                    </button>
                </div>
            </div>`
        });
        contentCarrito.innerHTML = cad
    }

    cad = `<div class="d-flex justify-content-between">
            <h4 class="mr-auto">SUBTOTAL</h4>
            <h4 class="ml-auto">${totalPrice} €</h4>
        </div>
        <div class="d-flex justify-content-between">
            <h4 class="mr-auto">Envío</h4>
            <p class="ml-auto">Gratis</p>
        </div>`

    totalPrices.innerHTML = cad

    createQuantityButtons(carrito)
}

// crear los botones de cantidad con sus funcionalidades
function createQuantityButtons(data) {
    data.forEach(button => {
        // sumar cantidad
        $('#decreaseInProfile' + button.scid).on('click', function () {
            let currentValue = parseInt($('#quantityInProfile' + button.scid).val())
            if (currentValue > 0) { // no posible menor que 0
                $('#quantityInProfile' + button.scid).val(currentValue - 1)
            }
        })

        // restar cantidad
        $('#increaseInProfile' + button.scid).on('click', function () {
            let currentValue = parseInt($('#quantityInProfile' + button.scid).val())
            $('#quantityInProfile' + button.scid).val(currentValue + 1)
        })
    })
}

function procesarPedido() {
    $.ajax({
        type: "POST",
        url: 'http://localhost:8000/api/crearPedido',
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
