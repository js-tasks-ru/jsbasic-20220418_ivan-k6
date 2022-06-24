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
      if (i === value) {
        step.classList.add('slider__step-active');
      }
      sliderSteps.append(step);
    }
    
    let stepsArr = this.elem.querySelectorAll('span');
    let sliderValue = this.elem.querySelector('.slider__value');
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let slider = this.elem;

    sliderThumb.ondragstart = () => false;
    sliderThumb.onpointerdown = () => false;
    sliderThumb.onpointermove = () => false;
    
    setStepValue(value);
    setThumbPosition(value / (steps - 1) * 100);
    
    this.elem.addEventListener('click', selectClk);

    function selectClk(event) {
      let left = event.clientX - this.getBoundingClientRect().left;
      let leftRelative = left / this.offsetWidth;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let selectedValue = Math.round(approximateValue);
      let valuePercents = selectedValue / segments * 100;

      setStepValue(selectedValue);
      setThumbPosition(valuePercents);
    }


    function setStepValue(value) {
      console.log(sliderValue);
      if (sliderValue.textContent !== value) {
        sliderValue.textContent = value;
        slider.dispatchEvent(new CustomEvent('slider-change', {detail: value, bubbles: true}));
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

    
    sliderThumb.onpointerdown = function(event) {
      slider.classList.add('slider_dragging');

      let segments = steps - 1;
      let selectedValue = 0;
      let valuePercents = 0;

      document.addEventListener('pointermove', onpointermove);
    
      function onpointermove(event) {
        let left = event.clientX - slider.getBoundingClientRect().left;
        let leftRelative = left / slider.offsetWidth;
        let segments = steps - 1;
        let approximateValue = leftRelative * segments;
        selectedValue = Math.round(approximateValue);

        if (leftRelative < 0) {
          valuePercents = 0;
          selectedValue = 0;
        } else if (leftRelative > 1) {
          valuePercents = 100;
          selectedValue = segments;
        } else {
          valuePercents = leftRelative * 100;
        }
        
        setStepValue(selectedValue);
        setThumbPosition(valuePercents);
      }
    
   
      document.onpointerup = function() {
        document.removeEventListener('pointermove', onpointermove);
        slider.classList.remove('slider_dragging');
        
        setStepValue(selectedValue);
        setThumbPosition(selectedValue / segments * 100);

        sliderThumb.onpointerup = null;
      };
    };
  }
}

