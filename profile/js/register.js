import { fadeIn } from '../../js/main.js'
// ruta conexión api
import { route } from '../../js/main.js'

let btnRegister = document.getElementById('btnRegister')

window.addEventListener('load', () => {
    // fadein
    document.body.style.opacity = 0;
    fadeIn(document.body, 100);
})

btnRegister.addEventListener('click', (event) => {
    event.preventDefault()

    // recoger valores
    let name = $('#name').val();
    let surname = $('#surname').val();
    let email = $('#email').val();
    let passwd = $('#passwd').val();
    let passwd_confirm = $('#passwd_confirm').val(); // send passwd confirmation

    $.ajax({
        type: 'POST',
        url: route + 'register',
        dataType: 'json',
        data: {
            name: name,
            surname: surname,
            email: email,
            passwd: passwd,
            passwd_confirmation: passwd_confirm // send passwd confirmation
        },
        success: function (response) {
            if ($.trim(response) !== '') {
                window.location.replace('./login.html');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud AJAX:', status, error);
        }
    });
});

// ! comprobación de los datos email passwd etc..