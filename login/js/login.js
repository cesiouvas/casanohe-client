let bntLogin = document.getElementById('login')
let tokenusu = sessionStorage.getItem('tokenusu')

console.log(tokenusu);

bntLogin.addEventListener('click', (event) => {
    // Evitar el envío del formulario
    event.preventDefault()

    if (tokenusu == null) {
        login()
    } else {
        window.location.replace('../profile/profile.html')
    }
});

// login de usuario
function login() {
    // recoger valores
    let email = $('#email').val()
    let password = $('#password').val()

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/api/login',
        dataType: 'json',
        data: {
            email: email,
            password: password
        },
        success: function(response) {
            if ($.trim(response) === '') {
                location.reload()
            } else {
                // creación del token para el usuario
                sessionStorage.setItem('tokenusu', response.accessToken)

                window.location.replace('../index.html');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud AJAX:', status, error)
            // Manejar el error aquí según sea necesario
        }
    });
}