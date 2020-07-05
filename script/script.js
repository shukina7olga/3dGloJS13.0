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
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    //Popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                //Animation popup
                const start = Date.now();

                const topAnimate = (timeAnimate => {
                    popupContent.style.top = timeAnimate / 17 + 'px';
                });

                const timer = setInterval(() => {
                    const timeAnimate = Date.now() - start;
                    if (timeAnimate >= 2500 || document.documentElement.clientWidth < 769) {
                        clearInterval(timer); // закончить анимацию через 2,5 секунды
                        return;
                    }
                    topAnimate(timeAnimate);
                }, 20); //изменять положение каждые 20ms

            });
        });

        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });


    };
    togglePopUp();
});
/*
           if (count === 1) {
                popupContent.style.transform = 'skewX(10deg)';
            } else if (count === 2) {
                popupContent.style.transform = 'skewX(-10deg)';
            }
*/
