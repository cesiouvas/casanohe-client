let shortViewDibujos = document.getElementById('shortViewDibujos')
let shortViewCroche = document.getElementById('shortViewCroche')
let shortViewAll = document.getElementById('shortViewAll')

window.addEventListener('load', () => {
    getDibujos()
    getCroche()
    getAll()
})

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

// todos
function getAll() {
    let contRows = 0;
    let cadAll = ``;
    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/getAllProducts',
        dataType: "json",
        data: {
            some: 1,
        },
        success: function (response) {
            let data = response.data;

            data.forEach((allProds, index) => {
                // Si es el primer elemento de una fila, abrir una nueva fila
                if (contRows % 3 === 0) {
                    cadAll += '<div class="row">';
                }

                // Agregar la columna con el Croche
                cadAll += `
                    <div class="col text-center">
                        <img class="card-img" src="./img/${allProds.image}.png">
                        <h5 class="card-title">${allProds.name}</h5>
                        <p class="card-text">${allProds.price} €</p>
                    </div>
                `;

                // Si es el último elemento de una fila, cerrar la fila
                if ((contRows + 1) % 3 === 0 || index === data.length - 1) {
                    cadAll += '</div>'; // Cerrar la fila
                }

                // Incrementar el contador de elementos en la fila
                contRows++;
            });
            shortViewAll.innerHTML = cadAll;
        },
    });
}
