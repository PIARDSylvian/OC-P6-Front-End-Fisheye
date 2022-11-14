/**
 * Create base of carousel
 * 
 * @returns {object} dom element
 */
 function addCarouselBase() { // eslint-disable-line
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
    carousel.dataset.idx = 0;

    const buttonPrev = document.createElement('button');
    buttonPrev.setAttribute("aria-label","Media precedent")
    buttonPrev.innerText = "<";
    const buttonNext = document.createElement('button');
    buttonNext.setAttribute("aria-label","Media suivant")
    buttonNext.innerText = ">";
    const carouselContent = document.createElement('div');
    carouselContent.classList.add('carousel__content');

    carousel.append(buttonPrev, carouselContent, buttonNext);

    carousel.addEventListener('keydown', function(e){
        if (e.key === 'ArrowRight') {
            buttonNext.click();
        } else if (e.key === 'ArrowLeft'){
            buttonPrev.click();
        }
    })

    buttonPrev.addEventListener('click', () => {
        const elements = carouselContent.querySelectorAll('.carousel__content>*');
        const newIndex = +carousel.dataset.idx - 1;

        if(newIndex < 0) {
            carousel.dataset.idx = (elements.length - 1);
        } else {
            carousel.dataset.idx = newIndex;
        }

        elements.forEach((element) => {
            if(element.dataset.order === carousel.dataset.idx) element.setAttribute('aria-hidden', false);
            else element.setAttribute('aria-hidden', true);
        });
    });
    buttonNext.addEventListener('click', () => {
        const elements = carouselContent.querySelectorAll('.carousel__content>*');
        const newIndex = +carousel.dataset.idx + 1;

        if(newIndex > (elements.length - 1)) {
            carousel.dataset.idx = 0;
        } else {
            carousel.dataset.idx = newIndex;
        }

        elements.forEach((element) => {
            if(element.dataset.order === carousel.dataset.idx) element.setAttribute('aria-hidden', false);
            else element.setAttribute('aria-hidden', true);
        });
    });
    return carousel;
}