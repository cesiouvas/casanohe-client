import { carritoPerfil } from '../cart/js/cart.js'

let header = document.getElementsByTagName('header')
let createHeader = document.getElementById('header')

let sidebarCarrito = document.getElementById('sidebarCarrito')

// token de sesión
let tokenusu = sessionStorage.getItem('tokenusu')
console.log(tokenusu)

let srcLog = [
    'profile/login.html',
    'profile/profile.html'
]

let src

// fadein
function fadeIn(element, duration) {
    var start = performance.now();
    requestAnimationFrame(function fadeInStep(timestamp) {
        var progress = (timestamp - start) / duration;
        element.style.opacity = Math.min(progress, 1);
        if (progress < 1) {
            requestAnimationFrame(fadeInStep);
        }
    });
}
// crear header
window.addEventListener('load', function () {
    // fadein
    document.body.style.opacity = 0;
    fadeIn(document.body, 100);

    // añadir todos los links y estilos a las páginas
    linksYEstilos()

    // pintar header
    printHEader()

    if (tokenusu == null) {
        document.getElementById('profile').href = src + srcLog[0]
        sidebarCarrito.innerHTML = `
        <div>
            <button id="cerrarCarrito" class="ps-4 btnCarrito"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg></button>
            <h2 class="text-center">TU CARRITO</h2>    
        </div>
        <div class="text-center">
            <h2>Tu carrito está vacío</h2>
            <h3>Inicia sesión para poder añadir productos al carrito</h3>
        </div>`
    } else {
        document.getElementById('profile').href = src + srcLog[1]
        llenarCarrito()
    }

    // abrir y cerrar carrito
    $('#openCart').on('click', function () {
        toggleSidebar()
    })

    // cerrar el carrito
    $('#cerrarCarrito').on('click', function () {
        toggleSidebar()
    })
})

function printHEader() {
    if (createHeader == 1) {
        src = "./" // estás en index
    } else {
        src = "../" // estás en cualquier otra página
    }
    header[0].innerHTML = `
    <div class="logo-container z-n1">
        <div class="text-center">
            <a href="${src}index.html"><img src="../../img/logo.png" alt="logo" width="100px"></a>
            <h1>CASANOHE</h1>
        </div>
    </div>
    <div class="container d-flex justify-content-center w-50 z-3">
        <div class="d-flex justify-content-evenly w-75">
            <p class="nav-menu text-center"><a href="${src}index.html"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#CED93C" d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"/></svg>
                    Tienda</a>
            </p>
            <p class="nav-menu text-center"><a href="${src}faq/faq.html"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 16"><path fill="#CED93C" d="M7.5 0C11.642 0 15 2.717 15 6.069s-3.358 6.069-7.5 6.069a9.16 9.16 0 0 1-1.169-.074C4.72 13.669 2.86 13.956 1 13.999v-.393c1.004-.49 1.813-1.382 1.813-2.402c0-.142-.011-.282-.032-.419C1.085 9.672 0 7.973 0 6.068C0 2.716 3.358-.001 7.5-.001zm8.063 13.604c0 .874.567 1.639 1.438 2.059V16c-1.611-.036-3.09-.283-4.487-1.658c-.33.041-.669.063-1.013.063c-1.492 0-2.866-.402-3.963-1.079c2.261-.008 4.395-.732 6.013-2.042a7.346 7.346 0 0 0 1.913-2.302a6.23 6.23 0 0 0 .704-3.4C17.302 6.518 18 7.795 18 9.202c0 1.633-.94 3.089-2.41 4.043a2.361 2.361 0 0 0-.027.359"/></svg>
                    Dudas</a>
            </p>
            <p class="nav-menu text-center"><a href="${src}about/about.html"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#CED93C" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m.6-3h16.8M3.6 15h16.8"/><path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 0 18"/></g></svg>
                    Sobre mí</a>
            </p>
        </div>
    </div>
    <!-- Segundo div alineado a la derecha -->
    <div class="aligned-menu d-flex justify-content-end">
        <button class="rounded-circle menu-buttons pb-1">
            <a id="profile" href="${src}profile/login.html"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="#ffffff" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8"/></svg></a>
        </button>
        <button id="openCart" class="rounded-circle menu-buttons ms-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25c0-.05.01-.09.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"/></svg>
        </button>
    </div>

`
}

export function llenarCarrito() {
    let cad = ``
    let totalPrice = 0.00
    let cartIds = []
    sidebarCarrito.innerHTML = ""

    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/getProductsCarrito',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        success: function (response) {

            let data = response.data

            // llenar el perfil con carrito
            if ($('#pag').val() == 1) {
                carritoPerfil(data)
            }

            cad += `<div class="pb-3">
                    <button id="cerrarCarrito" class="ps-4 btnCarrito"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000000" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg></button>
                    <h2 class="text-center">TU CARRITO</h2>    
                </div>`

            data.forEach(product => {
                // id de linea del carrito
                cartIds.push(product.scid)

                // sumar al coste total el coste de cada línea parseando a float
                totalPrice += parseFloat(product.line_price)
                cad += `<div class="row justify-content-center pb-4" style="height: 150px">
                    <div id="img" class="col-4" >
                        <img class="cartImage" src="${src}img/${product.image}.png" alt="${product.image}">
                    </div>
                    <div id="content" class="col-5">
                        <p>${product.name}</p>
                        <p>${product.price * product.line_quantity}€</p>
                        <div class="quantity-selector">
                            <button id="decrease${product.scid}"><i class="fas fa-minus">-</i></button>
                            <input type="number" id="quantity${product.scid}" value="${product.line_quantity}" min="0">
                            <button id="increase${product.scid}"><i class="fas fa-plus">+</i></button>
                        </div>
                    </div>
                    <div class="col-1">
                        <button class="btnCarrito" id="deleteLine${product.scid}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#000000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"/></svg>
                        </button>
                    </div>
                </div>`
            });

            cad += `<footer class="">
                        <div class="d-flex justify-content-end align-items-center pe-4 p-3">
                            <h4>Precio total: ${totalPrice} €</h4>
                        </div>
                        <div class="d-flex justify-content-center align-items-center p-3">
                            <button class="btn btn-secondary" id="verCarrito">Ver carrito</button>
                        </div>
                    </footer>`

            sidebarCarrito.innerHTML = cad

            // cerrar el carrito
            $('#cerrarCarrito').on('click', function () {
                toggleSidebar()
                actualizarCarrito(cartIds)
            })

            // selectores de cantidad
            createQuantityButtons(data)

            // eliminar línea del carrito
            deleteCartLine(cartIds)

            $('#verCarrito').on('click', function () {
                window.location.replace('../cart/cart.html')
            })
        },
    })
}

// mostrar y cerrar carrito
function toggleSidebar() {
    var sidebar = document.getElementById("sidebarCarrito");
    if (sidebar.style.width === "23%") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "23%";
    }
}

// crear el botón de selector de cantidad en la vista de producto
function createQuantityButtons(data) {
    data.forEach(button => {
        // sumar cantidad
        $('#decrease' + button.scid).on('click', function () {
            let currentValue = parseInt($('#quantity' + button.scid).val())
            if (currentValue > 0) { // no posible menor que 0
                $('#quantity' + button.scid).val(currentValue - 1)
            }
        })

        // restar cantidad
        $('#increase' + button.scid).on('click', function () {
            let currentValue = parseInt($('#quantity' + button.scid).val())
            $('#quantity' + button.scid).val(currentValue + 1)
        })
    })
}

// actualizar lineas de carrito
function actualizarCarrito(cartIds) {
    let quantities = []

    // almacenar las cantidades de cada línea
    for (let i = 0; i < cartIds.length; i++) {
        quantities.push(parseInt($('#quantity' + cartIds[i]).val()))
    }

    $.ajax({
        type: "PUT",
        url: 'http://localhost:8000/api/actualizarCarrito',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        data: {
            quantityLines: quantities,
            cartIds: cartIds,
        },
        success: function (response) {
            // actualizar el carrito
            llenarCarrito()
        },
    })
}

// eliminar linea del carrito
function deleteCartLine(cartIds) {
    cartIds.forEach(cartLine => {
        // asignarle el evento a cada botón
        $('#deleteLine' + cartLine).on('click', function () {
            // si se confirma se elimina
            if (confirm('De verdad quieres eliminar estos productos?')) {
                // ajax para eliminar la línea
                $.ajax({
                    type: "DELETE",
                    url: 'http://localhost:8000/api/deleteCartLine',
                    dataType: "json",
                    headers: {
                        Authorization: 'Bearer ' + tokenusu
                    },
                    data: {
                        line: cartLine
                    },
                    success: function (response) {
                        // actualizar carrito
                        llenarCarrito()
                    },
                })
            }
        })
    });
}

// añadir todos los links y estilos a todas las páginas
function linksYEstilos() {
    //document.getElementsByTagName('head')[0].innerHTML += ``
}