let tableData = [];
let editingIndex = -1;

const form = document.getElementById('crud-form');
const tableBody = document.querySelector('#data-table tbody');
const searchInput = document.getElementById('search');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const values = [...form.elements].filter(el => el.tagName === 'INPUT').map(el => el.value.trim());

  // Validáció
  if (values.some(val => val === '' || val.length < 2 || val.length > 30)) {
    alert('Minden mezőt ki kell tölteni 2-30 karakter között!');
    return;
  }

  if (editingIndex === -1) {
    tableData.push(values);
  } else {
    tableData[editingIndex] = values;
    editingIndex = -1;
  }

  form.reset();
  renderTable();
});

function renderTable(filter = '') {
  tableBody.innerHTML = '';
  tableData
    .filter(row => row.some(cell => cell.toLowerCase().includes(filter.toLowerCase())))
    .forEach((row, index) => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });

      const actions = document.createElement('td');
      actions.innerHTML = `
        <button onclick="editRow(${index})">Szerkeszt</button>
        <button onclick="deleteRow(${index})">Töröl</button>
      `;
      tr.appendChild(actions);
      tableBody.appendChild(tr);
    });
}

function editRow(index) {
  const row = tableData[index];
  [...form.elements]
    .filter(el => el.tagName === 'INPUT')
    .forEach((input, i) => input.value = row[i]);
  editingIndex = index;
}

function deleteRow(index) {
  if (confirm('Biztosan törlöd ezt a sort?')) {
    tableData.splice(index, 1);
    renderTable();
  }
}

searchInput.addEventListener('input', () => {
  renderTable(searchInput.value);
});

document.querySelectorAll('th.sortable').forEach((th, colIndex) => {
  th.addEventListener('click', () => {
    tableData.sort((a, b) => a[colIndex].localeCompare(b[colIndex]));
    renderTable(searchInput.value);
  });
});
