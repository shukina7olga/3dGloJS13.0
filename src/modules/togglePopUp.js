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

export default togglePopUp;