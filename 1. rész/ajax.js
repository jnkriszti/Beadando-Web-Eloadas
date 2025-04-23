const API_URL = 'http://gamf.nhely.hu/ajax2/';
const code = 'DNHDQM'; // IDE a saját kódod!

function readData() {
  fetch(API_URL, {
    method: 'POST',
    body: new URLSearchParams({ op: 'read', code })
  })
    .then(res => res.json())
    .then(data => {
      const list = data.list;
      const dataList = document.getElementById('dataList');
      const stats = document.getElementById('stats');
      dataList.innerHTML = '';
      stats.innerHTML = '';

      if (!list || list.length === 0) {
        dataList.textContent = 'Nincs adat.';
        return;
      }

      list.forEach(item => {
        dataList.innerHTML += `<p>ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}</p>`;
      });

      const heights = list.map(item => parseFloat(item.height)).filter(h => !isNaN(h));
      const sum = heights.reduce((acc, h) => acc + h, 0);
      const avg = (sum / heights.length).toFixed(2);
      const max = Math.max(...heights);

      stats.innerHTML = `<p>Magasság összeg: ${sum}, Átlag magasság: ${avg}, Legnagyobb magasság: ${max}</p>`;
    });
}

function createData() {
  const name = document.getElementById('createName').value.trim();
  const height = document.getElementById('createHeight').value.trim();
  const weight = document.getElementById('createWeight').value.trim();
  const msg = document.getElementById('createMsg');

  if (!name || !height || !weight || name.length > 30) {
    msg.textContent = 'Hibás adat!';
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    body: new URLSearchParams({ op: 'create', name, height, weight, code })
  })
    .then(res => res.json())
    .then(result => {
      msg.textContent = result === 1 ? 'Sikeres hozzáadás!' : 'Sikertelen!';
      readData();
    });
}

function getDataForId() {
  const id = document.getElementById('updateId').value.trim();

  fetch(API_URL, {
    method: 'POST',
    body: new URLSearchParams({ op: 'read', code })
  })
    .then(res => res.json())
    .then(data => {
      const found = data.list.find(item => item.id === id);
      if (found) {
        document.getElementById('updateName').value = found.name;
        document.getElementById('updateHeight').value = found.height;
        document.getElementById('updateWeight').value = found.weight;
      } else {
        alert('Nem található ilyen ID!');
      }
    });
}

function updateData() {
  const id = document.getElementById('updateId').value.trim();
  const name = document.getElementById('updateName').value.trim();
  const height = document.getElementById('updateHeight').value.trim();
  const weight = document.getElementById('updateWeight').value.trim();
  const msg = document.getElementById('updateMsg');

  if (!id || !name || !height || !weight || name.length > 30) {
    msg.textContent = 'Hibás adat!';
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    body: new URLSearchParams({ op: 'update', id, name, height, weight, code })
  })
    .then(res => res.json())
    .then(result => {
      msg.textContent = result === 1 ? 'Sikeres módosítás!' : 'Sikertelen!';
      readData();
    });
}

function deleteData() {
  const id = document.getElementById('deleteId').value.trim();
  const msg = document.getElementById('deleteMsg');

  fetch(API_URL, {
    method: 'POST',
    body: new URLSearchParams({ op: 'delete', id, code })
  })
    .then(res => res.json())
    .then(result => {
      msg.textContent = result === 1 ? 'Sikeres törlés!' : 'Sikertelen!';
      readData();
    });
}
