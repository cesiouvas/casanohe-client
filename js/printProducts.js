// ruta conexión api
import { route } from '../../js/main.js'

let shortViewDibujos = document.getElementById('shortViewDibujos')
let shortViewCroche = document.getElementById('shortViewCroche')
let shortViewAll = document.getElementById('shortViewAll')

let ids = []

window.addEventListener('load', () => {
    //getDibujos()
    //getCroche()
    getAll(1, 'allDibujos')
    getAll(2, 'allCroche')
})
/*
//? productos dibujos
function getDibujos() {
    let contRows = 0;
    let cadDibujo = ``;
    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/getAllProducts',
        dataType: "json",
        data: {
            some: 1,
            type: 1
        },
        success: function (response) {
            let data = response.data;

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
                        <p class="card-text">${dibujo.price} €</p>
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

//? productos croche
function getCroche() {
    let contRows = 0;
    let cadCroche = ``;
    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/getAllProducts',
        dataType: "json",
        data: {
            some: 1,
            type: 2
        },
        success: function (response) {
            let data = response.data;

            data.forEach((croche, index) => {
                // Si es el primer elemento de una fila, abrir una nueva fila
                if (contRows % 3 === 0) {
                    cadCroche += '<div class="row">';
                }

                // Agregar la columna con el Croche
                cadCroche += `
                    <div class="col text-center">
                        <img class="card-img" src="./img/${croche.image}.png">
                        <h5 class="card-title">${croche.name}</h5>
                        <p class="card-text">${croche.price} €</p>
                    </div>
                `;

                // Si es el último elemento de una fila, cerrar la fila
                if ((contRows + 1) % 3 === 0 || index === data.length - 1) {
                    cadCroche += '</div>'; // Cerrar la fila
                }

                // Incrementar el contador de elementos en la fila
                contRows++;
            });
            shortViewCroche.innerHTML = cadCroche;
        },
    });
}
*/
// todos
function getAll(type, emptyContainer) {
    let contRows = 0
    let cadAll = ``
    let container = $('#' + emptyContainer)

    $.ajax({
        type: "GET",
        url: route + 'getAllProducts',
        dataType: "json",
        data: {
            type: type
        },
        success: function (response) {
            let data = response.data;

            data.forEach((allProds, index) => {
                ids.push(allProds.id)

                // Si es el primer elemento de una fila, abrir una nueva fila
                if (contRows % 3 === 0) {
                    cadAll += `<div class="row">`
                }

                // Agregar la columna con el Croche
                cadAll += `
                    <div id="allProd${allProds.id}" class="col text-center">
                        <img class="card-img" src="./img/${allProds.image}.png">
                        <h5 class="card-title">${allProds.name}</h5>
                        <p class="card-text">${allProds.price} €</p>
                    </div>`

                // Si es el último elemento de una fila, cerrar la fila
                if ((contRows + 1) % 3 === 0 || index === data.length - 1) {
                    cadAll += '</div>'; // Cerrar la fila
                }

                // Incrementar el contador de elementos en la fila
                contRows++
            })
            container.html(cadAll)

            //* función crear eventos
            events()
        }, 
    })
}

//? asignar eventos a los productos
function events() {
    ids.forEach(product => {
        document.getElementById('allProd' + product).addEventListener('click', () => {
            window.location.replace('./products/product.html?idProd=' + product)
        })
    })
    ids = []
}
