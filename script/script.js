window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';

    function getTime() {
        const goodDay = document.querySelector('h2'),
            today = document.querySelector('span'),
            todayTime = document.querySelector('p'),
            timeNewYear = document.querySelector('h3'),
            dateNow = new Date(),
            dateNewYear = new Date('1 jan 2021');

        function getWeekDay(date) {
            date = new Date();
            const days = ['воскресенье', 'понедельник', 'вторник',
                'среда', 'четверг', 'пятница', 'суббота'];
            return days[date.getDay()];
        }

        function getHours() {
            const hours = dateNow.getHours();
            if (hours <= 4) {
                goodDay.textContent = 'Доброй ночи';
            } else if (4 < hours <= 10) {
                goodDay.textContent = 'Доброго утра';
            } else if (10 < hours <= 17) {
                goodDay.textContent += 'день';
            } else {
                goodDay.textContent = 'Добрый вечер';
            }
        }

        getHours();
        today.textContent += getWeekDay();
        todayTime.textContent += dateNow.toLocaleTimeString('en');
        timeNewYear.textContent +=  Math.floor((dateNewYear - dateNow) / 1000 / 60 / 60 / 24) + ' дней';
    }
    
    getTime();
});


/*
Добрый день (утро, вечер, ночь в зависимости от времени суток)
Сегодня: Понедельник
Текущее время:12:05:15 PM
До нового года осталось 175 дней
*/
