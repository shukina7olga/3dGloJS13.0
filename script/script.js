window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';
    //Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(), // мс от даты дедлайна
                dateNow = new Date().getTime(), // мс от даты текущей
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
                //days = Math.floor(timeRemaining / 60 / 60 / 24);
            //console.log(`секунды ${seconds}    минуты ${minutes}   часы ${hours}  дни ${days}`);
            return { timeRemaining, hours, minutes, seconds };
        }

        let count = 0;
        function updateClock() {
            const timer = getTimeRemaining();
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;
            count++;
            console.log(count);

            if (timer.seconds < 10) {
                timerSeconds.textContent = '0' + timer.seconds;
            }
            if (timer.minutes < 10) {
                timerMinutes.textContent = '0' + timer.minutes;
            }
            if (timer.hours < 10) {
                timerHours.textContent = '0' + timer.hours;
            }
            if (timer.timeRemaining < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        setInterval(() => {
            if (timerHours.textContent === '00' &&
                timerMinutes.textContent === '00' &&
                timerSeconds.textContent === '00') {
                return;
            }
            updateClock();
        }, 1000);

    }
    countTimer('04 july 2020');

    //Burger-menu
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
    toggleMenu();

    //Popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                //Animation popup
                const start = Date.now();

                const topAnimate = (timeAnimate => {
                    popupContent.style.top = timeAnimate / 8 + 'px';
                });

                const timer = setInterval(() => {
                    const timeAnimate = Date.now() - start;
                    if (timeAnimate >= 500 || document.documentElement.clientWidth < 769) {
                        clearInterval(timer); // закончить анимацию через 2,5 секунды
                        return;
                    }
                    topAnimate(timeAnimate);
                }, 10); //изменять положение каждые 20ms

            });
        });

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                console.log(target);
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };
    togglePopUp();

    //Tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => { //меняет контент.перед инд табаперебирает табы, наход соответст,осталь скрыв
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
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
    tabs();

    // Slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            portfolioDots = document.querySelector('.portfolio-dots');

        let currentSlide = 0, // порядок слайда
            interval;


        for (let i = 0; i < slide.length; i++) {
            const dot = document.createElement('li');
            dot.className = 'dot';
            portfolioDots.append(dot);
        }
        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => { // самопререлистывание с интервалом времени
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);

        };

        const stoptSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault(); //(от заглушки)при нажатии не перем на начало стр

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stoptSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);

    };
    slider();
});

