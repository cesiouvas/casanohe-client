let btnLogout = document.getElementById('btnLogout')

// token de sesión
let tokenusu = sessionStorage.getItem('tokenusu')

//BOTON QUE REALIZA EL CIERRE DE SESION
btnLogout.addEventListener("click", () => {
    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/logout',
        dataType: "json",
        headers: {
            Authorization: "Bearer " + tokenusu,
        },
        success: function (response) {
            // elimina el token local
            sessionStorage.removeItem("tokenusu");
            // redirección
            window.location.replace("../index.html");
        },
    });
});