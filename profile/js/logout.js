let btnLogout = $('#btnLogout')

//BOTON QUE REALIZA EL CIERRE DE SESION
btnLogout.addEventListener("click", () => {
    // elimina el token local
    sessionStorage.removeItem("tokenusu");

    $.ajax({
        type: "GET",
        url: 'http://localhost:8000/api/logout',
        dataType: "json",
        headers: {
            Authorization: "Bearer " + tokenusu,
        },
        success: function (response) {
            //console.log(response);

            window.location.replace("../index.html");
        },
    });
});