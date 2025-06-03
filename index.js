let btnMenu = document.getElementById('abrir-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', ()=>{
    menu.classList.remove('abrir-menu')
})

// BOTÃO DO E-MAIL

let emailBtn = document.getElementById('email-btn');

emailBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Email',
        text: 'nicoolasbrito24@gmail.com',
        icon: 'info',
        confirmButtonText: 'Fechar',
        confirmButtonColor: '#3085d6'
    });
});

// HEADER

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');

    if (window.scrollY > 50) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Defina offsets específicos para cada seção
            let offset = 70; // padrão

            switch (targetId) {
                case '#A':
                    offset = 100;
                    break;
                case '#B':
                    offset = 100;
                    break;
                case '#C':
                    offset = 90;
                    break;
                case '#D':
                    offset = 90;
                    break;
                case '#E':
                    offset = 65;
                    break;
                // Adicione mais cases conforme necessário
            }

            const targetPosition = targetElement.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});





