function saveToStorage() {
    const input = document.getElementById('storageInput').value;
    localStorage.setItem('html5data', input);
    document.getElementById('storageOutput').textContent = 'Mentve: ' + input;
  }
  
  let worker;
  function startWorker() {
    if (typeof Worker !== "undefined") {
      if (!worker) {
        worker = new Worker("worker.js");
        worker.onmessage = function (event) {
          document.getElementById("workerOutput").textContent = 'Számítás eredménye: ' + event.data;
        };
      }
      worker.postMessage('start');
    } else {
      document.getElementById("workerOutput").textContent = "A böngésződ nem támogatja a Web Workert.";
    }
  }
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        document.getElementById("geoOutput").textContent =
          "Szélesség: " + position.coords.latitude +
          ", Hosszúság: " + position.coords.longitude;
      });
    } else {
      document.getElementById("geoOutput").textContent = "A Geolocation nem támogatott.";
    }
  }
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  
  // Canvas rajzolás
  window.onload = function () {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "red";
    ctx.fillRect(20, 20, 150, 50);
  };
  