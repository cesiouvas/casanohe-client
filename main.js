let header = document.getElementsByTagName('header')


window.addEventListener('load', function() {
    header[0].innerHTML = `
    <div class="logo-container">
        <div>
            <img src="../../img/logo.png" alt="logo" width="100px">
            <h1>Casanohe</h1>
        </div>
    </div>
    <div class="menu-buttons-container">
        <button class="rounded-circle menu-buttons">
            <a href="./login/login.html"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="#ffffff" d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8"/></svg></a>
        </button>
    </div>`
})
