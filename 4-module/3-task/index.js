function highlight(table) {
  let teachers = table.tBodies[0].rows;

  for (let teacher of teachers) {
    let cells = teacher.cells;

    if (!cells[3].dataset.available) {
      teacher.setAttribute('hidden', 'true');
    } else if (cells[3].dataset.available === 'true') {
      teacher.classList.add('available');
    } else {
      teacher.classList.add('unavailable');
    }

    if (cells[2].textContent === 'm') {
      teacher.classList.add('male');
    } else {
      teacher.classList.add('female');
    }

    if (cells[1].textContent < 18) {
      teacher.style.textDecoration = 'line-through';
    }
  }// ваш код...
}
