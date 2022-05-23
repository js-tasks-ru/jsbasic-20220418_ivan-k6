function initCarousel() {
  let container = document.querySelector('.container');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let carouselInner = document.querySelector('.carousel__inner');
  let slideWidth = carouselInner.querySelector('.carousel__slide').offsetWidth;
  let numberOfSlides = carouselInner.querySelectorAll('.carousel__slide').length;
  let currentSlide = 0;

  arrowLeft.style.display = 'none';

  container.addEventListener('click', arrowOnClick);

  // обработка клика
  function arrowOnClick(event) {
  
    if (currentSlide < numberOfSlides - 1) {
      arrowLeft.style.display = '';

      if (event.target.closest('div') === arrowRight) {
        rotateCarousel(slideWidth, 1);        
      }
    }
    if (currentSlide > 0) {
      arrowLeft.style.display = '';

      if (event.target.closest('div') === arrowLeft) {
        rotateCarousel(slideWidth, -1);        
      }
    }
    
    arrowDisplay();

  }
  // прокрутка карусели
  function rotateCarousel(x, inc) {
    currentSlide += inc;
    carouselInner.style.transform = `translateX(${-x * currentSlide}px)`;
  }

  // видимость стрелок
  function arrowDisplay() {

    if (currentSlide >= numberOfSlides - 1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }

    if (currentSlide <= 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }
  }
}
