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



function sliderCreate ({
    mainSlider, 
    autoPlay = false, 
    autoPlayTime, 
    modalka,
    activeSlide
}) {

    const slider = mainSlider;
    const imgItems = slider.querySelectorAll('.slider_item');
    const currentImg = imgItems.length;
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('#modalImg')
    const captionText = modal.querySelector('.caption');
    

    let currentSlide = 0;
    let timerId = null;

    if(autoPlay) {
        autoPlayTimer();
    }

    function autoPlayTimer () {
        if (timerId) {
            clearInterval(timerId);
        }
        timerId = setInterval(() => {
            slideMove(currentSlide + 1);
        }, autoPlayTime)
    }
    createSliderArrow(slider);
    createSliderTrack(slider);

    const sliderSlides = slider.querySelector('.slider_slides');
    const sliderWidth = document.body.clientWidth
    const trackWidth = sliderWidth * currentImg;

    const dots = slider.querySelector('.slider_dots');

    each(imgItems, (elem, index) => {
        sliderSlides.append(elem)
        elem.style.width = sliderWidth + 'px';

        createDots(index);
    })

    

    sliderSlides.style.width = trackWidth + 'px';

    const sliderArrowRight = slider.querySelector('.slider_arrow_right');
    const sliderArrowLeft = slider.querySelector('.slider_arrow_left');


    document.addEventListener('click', e => {
        arrowRightSlider(e),
        arrowLeftSlider(e),
        dotsSlider(e),
        modalWindows(e)
    })

    function dotsSlider(e) {
        const dotsSlide = e.target.closest('.slider_dot');

        if(dotsSlide == null) return;
     
        const dotsTo = Number(dotsSlide.dataset.slideIndex);
        slideMove(dotsTo);
    }

    function arrowRightSlider(e) {
        const arrowRight = e.target.closest('.slider_arrow_right');

        if(arrowRight == null) return;

        const sliderTo = Number(sliderArrowRight.dataset.slideTo);
        slideMove(currentSlide + sliderTo);
    }

    function arrowLeftSlider(e) {
        const arrowLeft = e.target.closest('.slider_arrow_left');

        if(arrowLeft == null) return;

        const sliderTo = Number(sliderArrowLeft.dataset.slideTo);
        slideMove(currentSlide + sliderTo);
    }

    function createSliderArrow (slider) {
        const arrowLeft = document.createElement('a');
        const arrowRight = document.createElement('a');
        const sliderDots = document.createElement('div');

        arrowRight.classList.add('slider_arrow');
        arrowRight.classList.add('slider_arrow_right');
        arrowRight.setAttribute('data-slide-to', 1);
        slider.append(arrowRight);
    
        arrowLeft.classList.add('slider_arrow');
        arrowLeft.classList.add('slider_arrow_left');
        arrowLeft.setAttribute('data-slide-to', -1);
        slider.append(arrowLeft);

        sliderDots.className = 'slider_dots';
        slider.append(sliderDots);
    }
    
    function createSliderTrack (slider) {
        const sliderTrack = document.createElement('div');
        sliderTrack.className = 'slider_slides';
        slider.append(sliderTrack);
    }

    function slideMove (current) {
        if(current < 0) {
            current = currentImg - 1;
        } else if (current >= currentImg) {
            current = 0;
        }
        currentSlide = current;
    
        const translate = current * sliderWidth;
        sliderSlides.style.transform = `translateX(-${translate}px)`;
        updateActiveElement(currentSlide);
        autoPlayTimer();
    }

    function createDots (i) {
        const dot = document.createElement('a');
        dot.setAttribute('data-slide-index', i);
        dot.className = 'slider_dot';
        
        if(!i) {
            dot.classList.add('slider_dot_active');
            dots.append(dot);
        }
        else {
            dots.append(dot);
        }
    }

    function updateActiveElement (active) {

        const dots = slider.querySelector('.slider_dots').children;
        const imgs = slider.querySelector('.slider_slides').children;

    each(imgs, (elem, index) => {
        if (index === active) {
            elem.classList.add('slider_item_active')
        } 
        else {
            elem.classList.remove('slider_item_active')
        }
    })

    each(dots, (elem, index) => {
        if (index === active) {
            elem.classList.add('slider_dot_active')
        } 
        else {
            elem.classList.remove('slider_dot_active')
        }
    })
}

    function modalWindows (e) {
        const img = e.target.closest('.slider_item')
        let activeImg = slider.querySelector('.slider_item_active');
        if(img === null) return

        modal.style.display = 'block';
        if(activeImg) {
            modalImg.setAttribute('src', activeImg.getAttribute('src'));
            captionText.textContent = activeImg.getAttribute('alt');
        }
    }
}

const sliders = document.querySelectorAll('.slider');

each(sliders, function(slider) {
    sliderCreate({
        mainSlider: slider,
        autoPlay: true,
        autoPlayTime: 3000,
        modalka: true,
    })
})

function each (col, fn) {
    for(let i = 0; i < col.length; i++) {
        const arg = col[i]
        fn(arg, i)
    }
}