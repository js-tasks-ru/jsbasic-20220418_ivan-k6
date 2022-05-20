function toggleText() {
  let button = document.querySelector('.toggle-text-button');

  button.addEventListener('click', () => text.hidden = !text.hidden);
}
