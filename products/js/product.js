let paramURL = new URLSearchParams(window.location.search)
let product_id = paramURL.get('idProd')

// token de sesión
let tokenusu = sessionStorage.getItem('tokenusu')

let img = document.getElementById('img')
let content = document.getElementById('content')

$(window).on('load', function () {
    getProductDetails()
})

function getProductDetails() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/getProductDetails',
        dataType: "json",
        data: {
            product_id: product_id,
        },
        success: function (response) {
            let data = response.data;

            img.innerHTML = `<img class="w-100" src="../img/${data.image}.png" alt="imagen ${data.image}">`

            content.innerHTML += `<p>${data.name}</p>
                <p>${data.desc}</p>
                <p>${data.price} €</p>
                <div class="quantity-selector">
                    <button id="decrease"><i class="fas fa-minus">-</i></button>
                    <input type="number" id="quantity" value="0" min="0">
                    <button id="increase"><i class="fas fa-plus">+</i></button>
                </div>
                <button id="addProduct" class="btn btn-primary">Añadir a la cesta</button>`

            createQuantityButton()

            addProduct();
        },
    })
}

// crear el botón de selector de cantidad en la vista de producto
function createQuantityButton() {
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    const quantityInput = document.getElementById('quantity');

    decreaseBtn.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 0) { // no posible menor que 0
            quantityInput.value = currentValue - 1;
        }
    });

    increaseBtn.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
}

// añadir product a la cesta
function addProduct() {
    $('#addProduct').on('click', function () {
        let quantity = $('#quantity').val()

        $.ajax({
            type: "POST",
            url: 'http://localhost:8000/api/addProductToCart',
            dataType: "json",
            headers: {
                Authorization: 'Bearer ' + tokenusu
            },
            data: {
                quantity: quantity,
                product_id: product_id
            },
            success: function (response) {
               console.log("ano");
            },
        })
    })
}