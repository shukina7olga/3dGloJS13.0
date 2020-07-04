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
            //if (timer.timeRemaining > 0) {
            //    setTimeout(updateClock, 1000); //вызвает функцию один раз через определённый интервал
            //}

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
        //const setIntr = setInterval(() => { updateClock(); }, 1000);  
        setInterval(() => {
            if (timerHours.textContent === '00' && timerMinutes.textContent === '00' && timerSeconds.textContent === '00') {
                //clearInterval(setIntr);
                return;
            }
            updateClock();
        }, 1000);

        /*
        let count = 0;
        const myFunc = () => {
            count++;
            console.log(count);
        };

        setInterval(() => {
            myFunc();
        }, 1000);
        */
        //updateClock();
    }
    countTimer('06 july 2020');
});
