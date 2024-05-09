let sidebarCarrito = document.getElementById('sidebarCarrito')

// token de sesión
let tokenusu = sessionStorage.getItem('tokenusu')

window.addEventListener('load', () => {
    getUserData()
})

// datos de usuario
function getUserData() {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/getUserData',
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