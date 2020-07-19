const toggleMenu = () => {
    const menu = document.querySelector('menu'),
        btnMenu = document.querySelector('.menu');


    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    menu.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('.close-btn')) {
            menu.classList.toggle('active-menu');
            handlerMenu();
        } else if (target.classList.contains('menu')) {
            menu.classList.toggle('active-menu');
        } else {
            menu.classList.remove('active-menu');
        }
    });
};

export default toggleMenu;