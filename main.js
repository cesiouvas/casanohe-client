let header = document.getElementsByTagName('header')
let createHeader = document.getElementById('header')
let shortViewDibujos = document.getElementById('shortViewDibujos')


let src

// crear header
window.addEventListener('load', function () {
    if (createHeader == 1) {
        src = "./" // estás en index
    } else {
        src = "../" // estás en cualquier otra página
    }
    header[0].innerHTML = `
    <div class="logo-container">
        <div>
            <a href="../index.html"><img src="../../img/logo.png" alt="logo" width="100px"></a>
            <h1>CASANOHE</h1>
        </div>
    </div>
    <div class="menu-buttons-container">
        <button class="rounded-circle menu-buttons">
            <a  href="${src}login/login.html"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="#ffffff" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8"/></svg></a>
        </button>
    </div>`

    getSomeDibujos()
})

function getSomeDibujos() {
    let contRows = 0;
    let cadDibujo = ``;
    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/getSomeDibujos',
        dataType: "json",
        success: function (response) {
            let data = response.data;
            console.log(data);

            data.forEach((dibujo, index) => {
                // Si es el primer elemento de una fila, abrir una nueva fila
                if (contRows % 3 === 0) {
                    cadDibujo += '<div class="row">';
                }

                // Agregar la columna con el dibujo
                cadDibujo += `
                    <div class="col text-center">
                        <img class="card-img" src="./img/${dibujo.image}.png">
                        <h5 class="card-title">${dibujo.name}</h5>
                        <p class="card-text">${dibujo.desc}</p>
                    </div>
                `;

                // Si es el último elemento de una fila, cerrar la fila
                if ((contRows + 1) % 3 === 0 || index === data.length - 1) {
                    cadDibujo += '</div>'; // Cerrar la fila
                }

                // Incrementar el contador de elementos en la fila
                contRows++;
            });
            shortViewDibujos.innerHTML = cadDibujo;
        },
    });
}
