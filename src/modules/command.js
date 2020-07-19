const command = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');

    commandPhoto.forEach(element => { // работа с data атрибутом!
        //const photo = element.src; // если объявить тут,то меняются фото только один раз
        element.addEventListener('mouseenter', event => { // при наведении мыши меняем на data атрибут
            const photo = element.src;
            event.target.src = event.target.dataset.img;
            event.target.dataset.img = photo;
        });

        element.addEventListener('mouseleave', event => { // при убирании курсора убираем атрибут
            const photo = element.src;
            event.target.src = event.target.dataset.img;
            event.target.dataset.img = photo;
            // event.target.src = event.target.dataremove.img; // если remove, то наводим-меняем фотки,
            //event.target.dataremove.img = photo;// убираем-новое остаётся, наводим-появл старое фото
        });
    });
};

export default command;