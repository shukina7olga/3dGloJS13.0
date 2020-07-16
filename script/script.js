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
            if (i === 0) {
                dot.className = 'dot-active';
            }
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

    //Command
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
    command();

    //Сalculator
    const calculator = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = Math.ceil(total);
        };

        calcBlock.addEventListener('input', event => {
            const target = event.target;
            if (target.closest('.calc-square') || target.closest('.calc-count') || target.closest('.calc-day')) {
                event.target.value = event.target.value.replace(/[^0-9]/gi, '');
            }
        });

        calcBlock.addEventListener('change', event => {
            const target = event.target;
            //if (target.matches('.calc-type') || target.matches('.calc-square') ||
            //    target.matches('.calc-count') || target.matches('.calc-day')) {
            //}

            //if (target === calcType || target === calcSquare ||
            //    target === calcCount || target === calcDay) {
            //}
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });


    };
    calculator(100);

    // send_ajax_form
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо, мы скоро с Вами свяжемся!';

        const form1 = document.getElementById('form1'),
            form2 = document.getElementById('form2'),
            form3 = document.getElementById('form3'),
            userName = document.getElementsByName('user_name'),
            userEmail = document.getElementsByName('user_email'),
            userPhone = document.getElementsByName('user_phone'),
            userMessage = document.getElementsByName('user_message');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font=size: 2rem;';

        userName.forEach(element => {
            element.addEventListener('input', function() {
                this.value = this.value.replace(/([^А-ЯЁa-яё\s])|([A-Za-z])/gi, '');
            });
        });

        userPhone.forEach(element => {
            element.addEventListener('input', function() {
                this.value = this.value.replace(/[^\+\d]/g, '');
            });
        });

        userMessage.forEach(element => {
            element.addEventListener('input', function() {
                this.value = this.value.replace(/([^А-ЯЁa-яё\s])|([A-Za-z])/gi, '');
            });
        });

        form1.addEventListener('submit', event => {
            event.preventDefault(); // чтобы не было перезагрузки стр
            form1.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            // получ данные с формы
            const formData = new FormData(form1);
            const body = {};
            for (const val of formData.entries()) {
                body[val[0]] = val[1];
            }
            // eslint-disable-next-line no-use-before-define
            postData(body, () => {
                statusMessage.textContent = successMessage;
            }, () => {
                statusMessage.textContent = errorMessage;
            });
        });

        form2.addEventListener('submit', event => {
            event.preventDefault();
            form2.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form2);
            const body = {};
            for (const val of formData.entries()) {
                body[val[0]] = val[1];
            }
            // eslint-disable-next-line no-use-before-define
            postData(body, () => {
                statusMessage.textContent = successMessage;
            }, () => {
                statusMessage.textContent = errorMessage;
            });
        });

        form3.addEventListener('submit', event => {
            statusMessage.style.cssText = 'color: white;';
            event.preventDefault();
            form3.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form3);
            const body = {};
            for (const val of formData.entries()) {
                body[val[0]] = val[1];
            }
            // eslint-disable-next-line no-use-before-define
            postData(body, () => {
                statusMessage.textContent = successMessage;
            }, () => {
                statusMessage.textContent = errorMessage;
            });
        });



        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    outputData();
                    userName.value = '';
                    userEmail.value = '';
                    userPhone.value = '';
                    userMessage.value = '';
                } else {
                    errorData(request.status);
                }
            });

            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');

            request.send(JSON.stringify(body));
        };
    };
    sendForm();
});

