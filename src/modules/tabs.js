const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
        tab = tabHeader.querySelectorAll('.service-header-tab'),
        tabContent = document.querySelectorAll('.service-tab');

    tabContent[1].style.display = 'none';
    tabContent[2].style.display = 'none';

    const toggleTabContent = index => { //меняет контент.перед инд табаперебирает табы, наход соответст,осталь скрыв
        for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
                tab[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
                tabContent[i].style.display = 'inline-flex';
            }  else {
                tab[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
            }
        }
    };

    tabHeader.addEventListener('click', event => {
        let target = event.target; // получили элемент, на который кликнули
        target = target.closest('.service-header-tab');
        if (target) { // действительно кликнули по нашему табу? ИМЕЕТСЯ ЛИ У TARGET КЛАСС service-header-tab
            // eslint-disable-next-line no-loop-func
            tab.forEach((item, i) => { // проверка на какой  таб клик был
                if (item === target) {
                    toggleTabContent(i);
                }
            });
        }
    });
};

export default tabs;