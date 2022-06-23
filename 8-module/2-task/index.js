import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;    
    this.filters = {};
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);

    let productGridInner = this.elem.querySelector('.products-grid__inner');
    
    for (let product of products) {
      let productCard = new ProductCard(product);

      productGridInner.append(productCard.elem);
    }
  }

  updateFilter(filters) {
    filters = Object.assign(this.filters, filters);

    let filteredArr = Array.from(this.products);

    if (filters.noNuts === true) {
      let tempArr = filteredArr.filter((product) => !product.nuts === filters.noNuts);
      filteredArr = tempArr;
    }

    
    if (filters.vegeterianOnly) {
      let tempArr = filteredArr.filter((product) => product.vegeterian === true);
      filteredArr = tempArr;
    }


    if (filters.maxSpiciness >= 0) {
      let tempArr = filteredArr.filter((product) => product.spiciness <= filters.maxSpiciness);
      filteredArr = tempArr;
    }

    if (filters.category) {
      let tempArr = filteredArr.filter((product) => product.category === filters.category);
      filteredArr = tempArr;
    }

    let productGridInner = this.elem.querySelector('.products-grid__inner');
    productGridInner.innerHTML = '';

    for (let product of filteredArr) {
      let productCard = new ProductCard(product);

      productGridInner.append(productCard.elem);
    }
  }
}
