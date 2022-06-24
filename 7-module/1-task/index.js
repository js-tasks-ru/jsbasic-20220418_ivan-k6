import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    // Создаём корневой элемент
    this.elem = createElement(`
      <!--Корневой элемент RibbonMenu-->
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
  
        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
        </nav>
  
        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    // Наполняем ленту

    let _ribbonInner = this.elem.querySelector('.ribbon__inner');

    for (let category of categories) {
      let a = createElement(`
      <a href="#" class="ribbon__item ribbon__item_active" data-id="${category.id}">${category.name}</a>
      `);

      _ribbonInner.append(a);
    }

    // Добавляем прокрутку

    let ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');

    ribbonArrowLeft.onclick = function() {
      _ribbonInner.scrollBy(-350, 0);

    };

    ribbonArrowRight.onclick = function() {
      _ribbonInner.scrollBy(350, 0);
      
    };

    // Прячем кнопки прокуртки

    let _rightArrow = this.elem.querySelector('.ribbon__arrow_right');
    let _leftArrow = this.elem.querySelector('.ribbon__arrow_left');

    _ribbonInner.addEventListener('scroll', hideArrow);


    function hideArrow(event) {
      let _scrollLeft = _ribbonInner.scrollLeft;
      let _scrollRight = _ribbonInner.scrollWidth - _ribbonInner.scrollLeft - _ribbonInner.clientWidth;

      if (_scrollLeft > 0 && _scrollRight > 0) {
        _rightArrow.classList.add('ribbon__arrow_visible');
        _leftArrow.classList.add('ribbon__arrow_visible');
      }
      if (_scrollLeft < 1) {
        _leftArrow.classList.remove('ribbon__arrow_visible');
      }
      if (_scrollRight < 1) {
        _rightArrow.classList.remove('ribbon__arrow_visible');
      }
    }

    // Реализуем выбор конкретной категории

    this.elem.addEventListener('click', itemActivation);
  
    function itemActivation(event) {
      if (event.target.tagName !== 'A') {return;}

      event.preventDefault();

      for (let _a of this.querySelectorAll('.ribbon__item')) {
        if (_a.classList.contains('ribbon__item_active')) {
          _a.classList.remove('ribbon__item_active');
        }
      }

      event.target.classList.add('ribbon__item_active');

      event.target.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: `${event.target.dataset.id}`,
        bubbles: true,
      }));
    }
  }
}
