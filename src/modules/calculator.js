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

export default calculator;