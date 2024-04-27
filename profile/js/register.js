let btnRegister = document.getElementById('btnRegister')

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
        url: 'http://127.0.0.1:8000/api/register',
        dataType: 'json',
        data: {
            name: name,
            surname: surname,
            email: email,
            passwd: passwd,
            passwd_confirmation: passwd_confirm // send passwd confirmation
        },
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud AJAX:', status, error);
        }
    });
});