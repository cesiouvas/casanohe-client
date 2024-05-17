// ruta conexión api
import { route } from '../../js/main.js'

let sidebarCarrito = document.getElementById('sidebarCarrito')

// token de sesión
let tokenusu = sessionStorage.getItem('tokenusu')

window.addEventListener('load', () => {
    if (tokenusu) {
        getUserData()
    }

    $('#btnUpdateData').on('click', function() {
        updateDatos()
    })
})

// datos de usuario
function getUserData() {
    $.ajax({
        type: "GET",
        url: route + 'getUserData',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        success: function (response) {
            printDatos(response.data)
        },
    })
}

// print de todos los datos por los inputs
function printDatos(datos) {
    // email no editable
    $('#email').text(datos.email)

    // recorrer las tags == id input
    for (let clave in datos) {
        $('#' + clave).val(datos[clave])
    }
}

function updateDatos() {
    $.ajax({
        type: "POST",
        url: route + 'updateUserData',
        dataType: "json",
        headers: {
            Authorization: 'Bearer ' + tokenusu
        },
        data: {
            name: $('#name').val(),
            surname: $('#surname').val(),
            dni: $('#dni').val(),
            telephone: $('#telephone').val(),
            country: $('#country').val(),
            city: $('#city').val(),
            address: $('#address').val(),
            cp: $('#cp').val(),
        },
        success: function (response) {
            console.log(response.msg);
        },
    })
}