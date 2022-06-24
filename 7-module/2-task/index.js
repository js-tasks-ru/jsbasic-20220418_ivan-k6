import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(`
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>
  
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
  
            <h3 class="modal__title">
            </h3>
          </div>
  
          <div class="modal__body">
          </div>
        </div>
      </div>
    `);

    let modalCloseButton = this.elem.querySelector('.modal__close');

    modalCloseButton.onclick = () => this.close();

  }

  open() {

    document.body.append(this.elem);

    if (document.body.classList.contains('is-modal-open')) {return;}

    document.body.classList.add('is-modal-open');

    let ths = this;

    function keyClose(event) {
      if (event.code === 'Escape') {
        console.log(this);
        ths.close();
      }
      document.removeEventListener('keydown', keyClose);
    }

    document.addEventListener('keydown', keyClose);
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  close() {
    let modal = document.querySelector('.modal');

    if (document.contains(modal)) {
      modal.remove();
    }

    if (document.body.classList.contains('is-modal-open')) {
      document.body.classList.remove('is-modal-open');
    }
  }
}
