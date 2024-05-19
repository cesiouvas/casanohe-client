import { llenarCarrito } from '../../js/main.js'
// ruta conexión api
import { route } from '../../js/main.js'

let paramURL = new URLSearchParams(window.location.search)
let product_id = paramURL.get('idProd')
let comprobarStock

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
            let color
            let stock

            comprobarStock = data.quantity

            img.innerHTML = `<img class="w-100" src="../img/${data.image}.png" alt="imagen ${data.image}">`

            let cad = `<h4>${data.name}</h4>
                <p>${data.desc}</p>`
            // cambiar colores según cantidades
            switch (true) {
                case (data.quantity > 5):
                    color = '#CED93C'
                    stock = data.quantity
                    break;
                case (data.quantity < 5):
                    color = '#FFB536'
                    stock = data.quantity
                    break;
                case (data.quantity == 0):
                    color = 'red'
                    stock = 'Nou hay stock'
                    break;
            }

            cad += `<p><b>Stock: </b><b style="color: ${color};">${stock}</b></p>
                <h5 class="text-end">${data.price} €</h5>
                <div class="quantity-selector text-center">
                    <button id="decrease"><i class="fas fa-minus">-</i></button>
                    <input type="number" id="quantity" value="0" min="0">
                    <button id="increase"><i class="fas fa-plus">+</i></button>
                </div>`

            $('#content').append(cad)

            // asignar funciones de añadir y restar cantidad
            createQuantityButton()

            if (!tokenusu) {
                // cambio texto del botón y funcionalidad
                $('#addProduct').text('Iniciar sesión')
                $('#addProduct').on('click', function () {
                    window.location.replace('../profile/login.html')
                })
            } else {
                // aparece personalizar
                $('#createCustom').attr('hidden', false)
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

    $('#quantity').attr('max', comprobarStock);

    decreaseBtn.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value)
        if (currentValue > 0) { // no posible menor que 0
            quantityInput.value = currentValue - 1
        }
    });

    increaseBtn.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value)
        if (currentValue < comprobarStock) { // la cantidad no podrá ser mayor que el stock
            quantityInput.value = currentValue + 1
        }
    });
}

// añadir product a la cesta
function addProduct() {
    $('#addProduct').on('click', function () {
        let quantity = $('#quantity').val()

        if (quantity >= 1 && quantity <= comprobarStock) {
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
                    $("#productoAnyadido").removeAttr("hidden");
                    setTimeout(() => {
                        $("#productoAnyadido").attr("hidden", true);
                    }, 5000);
                },
            })
        } else if (quantity == 0) {
            $("#errorCantidad").removeAttr("hidden");
            setTimeout(() => {
                $("#errorCantidad").attr("hidden", true);
            }, 5000);
        } else {
            $("#errorCantidadMax").removeAttr("hidden");
            setTimeout(() => {
                $("#errorCantidadMax").attr("hidden", true);
            }, 5000);
        }
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