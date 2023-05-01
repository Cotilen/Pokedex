'use strict'
//Função para fazer um carrosel de imagens
function carousel_img() {
    const imgs = document.getElementById('img')
    const img = document.querySelectorAll('#img img')

    let idx = 0

    function carrosel() {
        idx++

        if (idx > img.length - 1) {
            idx = 0
        }

        imgs.style.transform = `translateX(${-idx*500}px)`
    }
    setInterval(carrosel, 3000)
}
//Função para fazer um carrossel de textos
function carousel_text() {
    const carouselSlide = document.querySelector('.carrossel-slide');
    const carouselItems = document.querySelectorAll('.carrosel-about');
    const prevButton = document.querySelector('.carousel-button-prev');
    const nextButton = document.querySelector('.carousel-button-next');
    let counter = 0;
    const width = carouselItems[0].clientWidth + 20;

    carouselSlide.style.transform = `translateX(${-width * counter}px)`;

    nextButton.addEventListener('click', () => {
        if (counter >= carouselItems.length - 1) return;
        counter++;
        carouselSlide.style.transition = 'transform 0.4s ease-in-out';
        carouselSlide.style.transform = `translateX(${-width * counter}px)`;
    });

    prevButton.addEventListener('click', () => {
        if (counter <= 0) return;
        counter--;
        carouselSlide.style.transition = 'transform 0.4s ease-in-out';
        carouselSlide.style.transform = `translateX(${-width * counter}px)`;
    });

    carouselSlide.addEventListener('transitionend', () => {
        if (carouselItems[counter].id === 'last-clone') {
            carouselSlide.style.transition = 'none';
            counter = carouselItems.length - 2;
            carouselSlide.style.transform = `translateX(${-width * counter}px)`;
        }
        if (carouselItems[counter].id === 'first-clone') {
            carouselSlide.style.transition = 'none';
            counter = carouselItems.length - counter;
            carouselSlide.style.transform = `translateX(${-width * counter}px)`;
        }
    });

}
carousel_img()