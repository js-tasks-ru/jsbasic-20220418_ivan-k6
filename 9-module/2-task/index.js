import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carousel = new Carousel(slides);
    let dataCaruselHolder = document.querySelector('*[data-carousel-holder]');
    dataCaruselHolder.append(carousel.elem);

    let ribbonMenu = new RibbonMenu(categories);
    let dataRibbonHolder = document.querySelector('*[data-ribbon-holder]');
    dataRibbonHolder.append(ribbonMenu.elem);

    let stepSlider = new StepSlider({steps: 5, value: 3});
    let dataSliderHolder = document.querySelector('*[data-slider-holder]');
    dataSliderHolder.append(stepSlider.elem);

    let cartIcon = new CartIcon();
    let dataCartIconHolder = document.querySelector('*[data-cart-icon-holder]');
    dataCartIconHolder.append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    let response = await fetch('products.json');
    let products = await response.json();
    let productsGrid = new ProductsGrid(products);
    let dataProductsGridHolder = document.querySelector('*[data-products-grid-holder]');
    dataProductsGridHolder.innerHTML = '';
    dataProductsGridHolder.append(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });

    let body = document.querySelector('body');
    
    body.addEventListener('product-add', function(event) {
      for (let product of products) {
        if (product.id === event.detail) {
          cart.addProduct(product);
          return;
        }
      }
    });

    stepSlider.elem.addEventListener('slider-change', function(event) {
      productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    ribbonMenu.elem.addEventListener('ribbon-select', function(event) {
      productsGrid.updateFilter({
        category: event.detail
      });
    });

    let nutsCheckbox = document.getElementById('nuts-checkbox');

    nutsCheckbox.addEventListener('change', function(event) {
      productsGrid.updateFilter({
        noNuts: nutsCheckbox.checked
      });
    });

    let vegeterianCheckbox = document.getElementById('vegeterian-checkbox');

    vegeterianCheckbox.addEventListener('change', function(event) {
      productsGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked
      });
    });
  }
}
