import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    let _elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
  
        <div class="carousel__inner">
        </div>
      </div>    
    `);

    let carouselInner = _elem.querySelector('.carousel__inner');

    for (let slide of slides) {
      let slideBlock = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>    
      `);
      carouselInner.append(slideBlock);
    }

    function initCarousel() {
      let arrowLeft = _elem.querySelector('.carousel__arrow_left');
      let arrowRight = _elem.querySelector('.carousel__arrow_right');
      let currentSlide = 0;
    
      arrowLeft.style.display = 'none';
    
      _elem.addEventListener('click', arrowOnClick);
    
      // обработка клика
      function arrowOnClick(event) {
        let slideWidth = carouselInner.querySelector('.carousel__slide').offsetWidth;
        let numberOfSlides = carouselInner.querySelectorAll('.carousel__slide').length;
      
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
        let numberOfSlides = carouselInner.querySelectorAll('.carousel__slide').length;
    
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

    // Кнопка
    let carouselButtons = _elem.querySelectorAll('.carousel__button');
    for (let carouselButton of carouselButtons) {
      let id = carouselButton.closest('.carousel__slide').dataset.id;
      carouselButton.addEventListener('click', productAdd);
      function productAdd() {
        this.dispatchEvent(new CustomEvent('product-add', {detail: id, bubbles: true}));
      }
    }    

    initCarousel();

    this.elem = _elem; 
  }
}

