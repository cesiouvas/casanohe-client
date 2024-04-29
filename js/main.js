let header = document.getElementsByTagName('header')
let createHeader = document.getElementById('header')

let sidebarCarrito = document.getElementById('sidebarCarrito')

// token de sesión
let tokenusu = sessionStorage.getItem('tokenusu')
console.log(tokenusu);

let srcLog = [
    'profile/login.html',
    'profile/profile.html'
]

let src

// crear header
window.addEventListener('load', function () {
    // pintar header
    printHEader()

    if (tokenusu == null) {
        document.getElementById('profile').href = src + srcLog[0]
    } else {
        document.getElementById('profile').href = src + srcLog[1]
    }

    // abrir y cerrar carrito
    $('#openCart').on('click', function () {
        toggleSidebar()
    })

    llenarCarrito()
})

function printHEader() {
    if (createHeader == 1) {
        src = "./" // estás en index
    } else {
        src = "../" // estás en cualquier otra página
    }
    header[0].innerHTML = `
    <div class="logo-container">
        <div class="text-center">
            <a href="${src}index.html"><img src="../../img/logo.png" alt="logo" width="100px"></a>
            <h1>CASANOHE</h1>
        </div>
    </div>
    <div class="d-flex justify-content-between">
        <p style="color:white"> a</p>
        <div class="nav-menu d-flex justify-content-between pt-3">
            <p class="nav-menu"><a href="${src}index.html">Tienda</a></p>
            <p class="nav-menu"><a href="${src}faq/faq.html">Dudas</a></p>
            <p class="nav-menu"><a href="${src}about/about.html">Sobre mí</a></p>
        </div>
        <div>
            <button class="rounded-circle menu-buttons">
                <a id="profile" href="${src}profile/login.html"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="#ffffff" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8"/></svg></a>
            </button>
            <button id="openCart" class="rounded-circle menu-buttons">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25c0-.05.01-.09.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"/></svg>
            </button>
        </div>
    </div>`
}

function llenarCarrito() {
    let cad = ``

    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/getProductsCarrito',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        success: function (response) {
            let data = response.data;
            console.log(data);
            data.forEach(product => {
                cad += `<p>${product.name} x ${product.quantity_line} ${product.price}€</p>`
            });
           

            sidebarCarrito.innerHTML = cad
        }, 
    })
}

// mostrar y cerrar carrito
function toggleSidebar() {
    var sidebar = document.getElementById("sidebarCarrito");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}