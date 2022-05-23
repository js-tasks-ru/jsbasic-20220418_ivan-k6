export default class UserTable {
  constructor(rows) {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    table.innerHTML = (
      `<thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>`
    );

    let tbody = document.createElement('tbody');

    for (let row of rows) {
      let tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>[x]</button></td>
      `;

      tbody.append(tr);
    }

    table.append(tbody);

    table.addEventListener('click', rowRemover);

    function rowRemover(event) {
      if (event.target.closest('tr').tagName === 'TR') {
        event.target.closest('tr').remove();
      }
    }
    

    this.elem = table;
  }
}
