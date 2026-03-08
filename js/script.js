document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const celebrateBtn = document.getElementById('celebrateBtn');
    const mainScreen = document.getElementById('mainScreen');
    const resultScreen = document.getElementById('resultScreen');
    const resultTitle = document.getElementById('resultTitle');
    const backBtn = document.getElementById('backBtn');
    const confettiContainer = document.getElementById('confettiContainer');

    let selectedTarget = null;

    // Выбор карточки
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Снимаем активность со всех карточек
            cards.forEach(c => c.classList.remove('active'));
            // Активируем текущую
            card.classList.add('active');
            // Запоминаем выбранного получателя
            selectedTarget = card.getAttribute('data-target');
            // Активируем кнопку
            celebrateBtn.classList.add('active');
            celebrateBtn.disabled = false;
        });
    });

    // Поздравление
    celebrateBtn.addEventListener('click', () => {
        if (!selectedTarget) return;

        // Формируем персональное поздравление
        let name = '';
        switch (selectedTarget) {
            case 'мама': name = 'мамочка'; break;
            case 'бабушка': name = 'бабуля'; break;
            case 'сестра': name = 'сестрёнка'; break;
            case 'тётя': name = 'тётя'; break;
            default: name = 'дорогая';
        }
        resultTitle.textContent = `С 8 марта, ${name}!`;

        // Прячем главный экран, показываем результат
        mainScreen.style.display = 'none';
        resultScreen.style.display = 'block';

        // Запускаем конфетти и цветы
        startConfetti();
    });

    // Кнопка "назад"
    backBtn.addEventListener('click', () => {
        // Возвращаем главный экран
        mainScreen.style.display = 'block';
        resultScreen.style.display = 'none';

        // Сбрасываем выбранную карточку и кнопку
        cards.forEach(c => c.classList.remove('active'));
        celebrateBtn.classList.remove('active');
        celebrateBtn.disabled = true;
        selectedTarget = null;

        // Очищаем конфетти
        confettiContainer.innerHTML = '';
    });

    // Функция запуска конфетти и цветов
    function startConfetti() {
        // Запускаем на 5 секунд
        const duration = 5000;
        const endTime = Date.now() + duration;

        function addElement() {
            if (Date.now() > endTime) return;

            const isFlower = Math.random() > 0.5; // 50% цветок, 50% конфетти
            const el = document.createElement('div');
            el.classList.add(isFlower ? 'flower' : 'confetti');

            if (isFlower) {
                // Эмодзи цветов
                const flowers = ['🌸','🌷','🌺','🌼','🌻','💐','🌹'];
                el.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            } else {
                // Цветные квадратики (цвет через HSL)
                const hue = Math.floor(Math.random() * 360);
                el.style.background = `hsl(${hue}, 80%, 70%)`;
            }

            // Случайное положение по горизонтали
            const left = Math.random() * 100;
            el.style.left = left + '%';
            // Случайная задержка анимации
            const delay = Math.random() * 2;
            el.style.animationDelay = delay + 's';
            // Случайный размер
            const scale = 0.5 + Math.random() * 1.5;
            el.style.transform = `scale(${scale})`;

            confettiContainer.appendChild(el);

            // Удаляем элемент после окончания анимации (4 секунды)
            setTimeout(() => {
                if (el.parentNode) el.remove();
            }, 4000 + delay * 1000);

            // Продолжаем добавлять новые элементы
            setTimeout(addElement, 200);
        }

        // Запускаем генерацию
        addElement();
    }
});
