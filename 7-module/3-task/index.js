import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor(config) {
    let steps = config.steps;
    let value = 0;
    if (config.value) {
      value = config.value;
    }
    this.elem = createElement(`
      <!--Корневой элемент слайдера-->
      <div class="slider">
    
        <div class="slider__thumb">
          <span class="slider__value">${value}</span>
        </div>
    
        <div class="slider__progress"></div>
    
        <div class="slider__steps">
        </div>
      </div>
    `);

    let sliderSteps = this.elem.querySelector('.slider__steps');

    for (let i = 0; i < steps; i++) {
      let step = document.createElement('span');
      if (i === value) {step.classList.add('slider__step-active');}

      sliderSteps.append(step);
    }

    let stepsArr = this.elem.querySelectorAll('span');
    let sliderValue = this.elem.querySelector('.slider__value');
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    

    function setStepValue(value) {
      if (sliderValue.textContent != value) {
        sliderValue.textContent = value;// 1

        sliderValue.dispatchEvent(new CustomEvent('slider-change', {detail: value, bubbles: true}));
      }
 
      for (let step of stepsArr) {
        if (step.classList.contains('slider__step-active')) {
          step.classList.remove('slider__step-active');
        }
      }

      stepsArr[value + 1].classList.add('slider__step-active');
    }


    function setThumbPosition(valuePercents) {
      sliderThumb.style.left = `${valuePercents}%`;

      sliderProgress.style.width = `${valuePercents}%`;
    }


    function selectClk(event) {
      let left = event.clientX - this.getBoundingClientRect().left;
      let leftRelative = left / this.offsetWidth;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;

      setStepValue(value);
      setThumbPosition(valuePercents);      
    }
    
    this.elem.addEventListener('click', selectClk); 
  }
}

