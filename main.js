

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll(".menu__item");
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const url = this.getAttribute('data-value');
            fetchPage(url);
        });
    });
});


// REDIRECCIONAR A HOME
const currentUrl = window.location.pathname;
if (currentUrl === '/' || currentUrl === '/index') {
        fetchPage('home');
}

// FUNCIÓN DEL DESPLIEGUE DEL MENÚ
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('show-menu');
}

function fetchPage(url) {
    fetch(`pages/${url}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
            document.title = url;
            
            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.src) {
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    document.head.appendChild(newScript);
                } else {
                    
                    eval(script.innerText);
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener la página:', error)
        });       
    }
