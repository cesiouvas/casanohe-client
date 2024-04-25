let header = document.getElementsByTagName('header')
let createHeader = document.getElementById('header')

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
        <button class="rounded-circle menu-buttons">
            <a id="profile" href="${src}profile/login.html"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="#ffffff" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8"/></svg></a>
        </button>
    </div>`
}
