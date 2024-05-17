import { llenarCarrito } from '../../js/main.js'
// ruta conexión api
import { route } from '../../js/main.js'

let paramURL = new URLSearchParams(window.location.search)
let product_id = paramURL.get('idProd')

// token de sesión
let tokenusu = sessionStorage.getItem('tokenusu')

let img = document.getElementById('img')

$(window).on('load', function () {
    getProductDetails()

    cargarModalCustom()
})

function getProductDetails() {
    $.ajax({
        type: "GET",
        url: route + 'getProductDetails',
        dataType: "json",
        data: {
            product_id: product_id,
        },
        success: function (response) {
            let data = response.data;

            img.innerHTML = `<img class="w-100" src="../img/${data.image}.png" alt="imagen ${data.image}">`

            let cad = `<p>${data.name}</p>
                <p>${data.desc}</p>
                <p>${data.price} €</p>
                <div class="quantity-selector">
                    <button id="decrease"><i class="fas fa-minus">-</i></button>
                    <input type="number" id="quantity" value="0" min="0">
                    <button id="increase"><i class="fas fa-plus">+</i></button>
                </div>
                <button id="addProduct" class="btn btn-primary w-100 rounded-pill m-3">Añadir a la cesta</button>`

            $('#content').prepend(cad)

            createQuantityButton()

            if (!tokenusu) {
                // cambio texto del botón y funcionalidad
                $('#addProduct').text('Iniciar sesión')
                $('#addProduct').on('click', function () {
                    window.location.replace('../profile/login.html')
                })
            } else {
                addProduct()
            }
        },
    })
}

// crear el botón de selector de cantidad en la vista de producto
function createQuantityButton() {
    const decreaseBtn = document.getElementById('decrease')
    const increaseBtn = document.getElementById('increase')
    const quantityInput = document.getElementById('quantity')

    decreaseBtn.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value)
        if (currentValue > 0) { // no posible menor que 0
            quantityInput.value = currentValue - 1
        }
    });

    increaseBtn.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value)
        quantityInput.value = currentValue + 1
    });
}

// añadir product a la cesta
function addProduct() {
    $('#addProduct').on('click', function () {
        let quantity = $('#quantity').val()

        $.ajax({
            type: "POST",
            url: route + 'addProductToCart',
            dataType: "json",
            headers: {
                Authorization: 'Bearer ' + tokenusu
            },
            data: {
                quantity: quantity,
                product_id: product_id
            },
            success: function (response) {
                // recargar carrito
                llenarCarrito()
            },
        })
    })
}

function cargarModalCustom() {
    $('#product_id').val(product_id)


    $('#confirmarCustom').on('click', function () {

        let comments = $('#comments').val()
        let quantityCustom = $('#quantityCustom').val()

        $.ajax({
            type: "POST",
            url: route + 'createCustomOrder',
            dataType: "json",
            headers: {
                Authorization: 'Bearer ' + tokenusu
            },
            data: {
                product_id: product_id,
                quantity: quantityCustom,
                comments: comments
            },
            success: function (response) {
                // cerrar modal
                $(function () {
                    $('#modalCustomProduct').modal('toggle');
                });
            },
        })
    })
}