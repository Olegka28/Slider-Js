'use strict';

//++ 1 Должен содержать стрелочки влево/вправо по клику на которые показываем предыдущий/следующий слайд соответственно.
//++ 2 Должен содержать пагинацию (точки или цифры по нажатию на которые изменяется текущий слайд). Пагинация генерируется с помощью js, в зависимости от количества слайдов.
//++ 3 Переход должен анимироваться fadeIn/fadeOut или slide.

// Сделать минимум 2-3 дополнительных задания на выбор. Звездочка обозначает сложность задания.

//  (*) Вместо fadeIn/Out сделать анимацию slideIn/slideOut
// (*) Несколько слайдеров на странице должны работать вместе корректно.
//++ (*) Реализовать возможность автоматической смены слайдов по таймауту. Учесть что таймер нужно обнулять после пользовательского выбора слайда.
//++ (*) Организовать слайдер как функцию, которая принимает html элемент слайдера и список параметров (показывать ли стрелки, пагинацию, скорость анимации...).
//++ (**) По клику на слайд должна открываться модалка с содержимым слайда.
//++ (**) Реализовать возможно бесконечной смены слайдов (если мы дошли до конца слайдера следующий клик на правую стрелочку покажет первый слайд) и тоже самое если нажимаем на левую стрелку когда находимся на первом элементе должны прыгнуть в конец слайдера.
// (***) Слайдер внутри слайдера должен работать корректно.

createElementDotsAndArrow();

let slideIndex = 1;
// Для поиск элементов модального окна
// const closeModal = document.querySelectorAll('.close')[0];
const modal = document.querySelector('#myModal');


// Функция которая создает стрелочки и точки 
function createElementDotsAndArrow () {
    const images = document.querySelectorAll(".slider-slides img");
    const slider = document.querySelector('.slider');
    let arrowLeft = document.createElement('a');
    let arrowRight = document.createElement('a');

    let dots = document.createElement('div');
    dots.classList.add('slider-dots');
    slider.append(dots);

    arrowRight.classList.add('slider-arrow');
    arrowRight.classList.add('slider-arrow-right');
    arrowRight.textContent = '>';
    slider.after(arrowRight);

    arrowLeft.classList.add('slider-arrow');
    arrowLeft.classList.add('slider-arrow-left');
    arrowLeft.textContent = '<';
    slider.before(arrowLeft);

    for (let i = 0; i < images.length; i++){
        let link = document.createElement('a');
        link.classList.add('slider-dot');
        dots.append(link);
    }
}


showSlides(slideIndex);

// Функция которая показывает слайдер
function showSlides(number) {
    const images = document.querySelectorAll(".slider-slides img");
    const dots = document.querySelectorAll('.slider-dot');

    if (number < 1) {
        slideIndex = images.length;
    } 
    else if (number > images.length) {
        slideIndex = 1;
    }

    for (let i = 0; i < images.length; i++) {
        images[i].classList.add('hide');
        dots[i].classList.remove('active');
    }

    images[slideIndex - 1].classList.remove('hide');
    dots[slideIndex - 1].classList.add('active');
} 

// Функция которая двигает слайдер
function moveSlides(number) {
    showSlides(slideIndex += number);
}

// Функция для сдвига вправо
function handleArrowRight (event) { 
    const slider = event.target.closest('.slider-arrow-right');

    if (slider === null) return;

    moveSlides(1);
}
// Функция для сдвига влево
function handleArrowLeft(event) {
    const slider = event.target.closest('.slider-arrow-left');

    if (slider === null) return;

    moveSlides(-1);
}

// Функия для проверки с точками
function currentSlide(number) {
    showSlides(slideIndex = number)
}

// Функция для пагинации
function handleDotsSlider(event) {
    const slider = event.target.closest('.slider-dots');
    const dots = document.querySelectorAll('.slider-dot');

    if (slider === null) return;

    for (let i = 0; i < dots.length + 1; i++) {
        if (event.target.classList.contains('slider-dot') && event.target === dots[i - 1]) {
            currentSlide(i);
        }
    }
}

// Функция для открия модалки
function showModalWindows (event) {
    const slider = event.target.closest('.slider-slides img');
    const images = document.querySelectorAll(".slider-slides img");
    const modalImg = document.querySelector('#modalImg');
    const captionText = document.querySelector('.caption')

    if (slider === null) return;

    modal.style.display = 'block';
    
    for(let i = 0; i < images.length; i++) {
        if(slideIndex === i + 1) {
            modalImg.setAttribute('src', images[i].getAttribute('src'));
            captionText.textContent = images[i].getAttribute('alt');
        }
    }
}


document.addEventListener('click', event => {
    handleArrowRight(event);
    handleArrowLeft(event);
    handleDotsSlider(event);
    showModalWindows (event);
});

// Запуск функции по загрузке страницы и отмена по нажатию
const intervalId = setInterval(() => moveSlides(1), 4000);
addEventListener('DOMContentLoaded', () => {
    intervalId;
});
addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId;
});

// setInterval(moveSlides, 4000, 1);
