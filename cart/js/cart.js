/*
function procesarPedido() {
    $('#hacerPedido').on('click', function () {
        $.ajax({
            type: "POST",
            url: 'http://localhost:8000/api/crearPedido',
            dataType: "json",
            headers: {
                Authorization: 'Bearer ' + tokenusu
            },
            data: {
                totalPrice: totalPrice
            },
            success: function (response) {
                console.log("ojeteeee");
            },
            error: function (xhr, status, error) {
                console.error("Error al hacer el pedido:", error);
            }
        })
    })
}
*/