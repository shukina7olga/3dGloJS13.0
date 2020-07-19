const countTimer = deadline => {
    'use strict';
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
        const dateStop = new Date(deadline).getTime(), // мс от даты дедлайна
            dateNow = new Date().getTime(), // мс от даты текущей
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
        console.log(`секунды ${seconds}    минуты ${minutes}   часы ${hours} `);
        return { timeRemaining, hours, minutes, seconds };
    };

    let count = 0;
    const updateClock = () => {
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
    };

    setInterval(() => {
        if (timerHours.textContent === '00' &&
            timerMinutes.textContent === '00' &&
            timerSeconds.textContent === '00') {
            return;
        }
        updateClock();
    }, 1000);
};

export default countTimer;