
document.addEventListener("DOMContentLoaded", function() {
  const pdfInput = document.getElementById("pdfInput");
  const uploadFileButton = document.getElementById("uploadFileButton");
  const generateJsonButton = document.getElementById("generateJsonButton");
  const tableBody = document.querySelector('#pdfTable tbody');
  let fileDetails = null;

  // Funzione per caricare il file e aggiungere alla tabella
  uploadFileButton.addEventListener('click', function() {
    const file = pdfInput.files[0];
    if (file) {
      const fileName = file.name;

      // Genera l'URL corretto per il file caricato nella root del repository GitHub
      const fileURL = `https://raw.githubusercontent.com/MrSperduti/springcup2025-/main/${fileName}`;
      
      // Crea un oggetto JSON con i dettagli del file
      fileDetails = {
        name: fileName,
        url: fileURL,
        type: file.type,
        size: file.size
      };

      // Aggiungi il file al JSON esistente nel localStorage
      let existingFiles = [];
      if (localStorage.getItem('regolamentoFiles')) {
        existingFiles = JSON.parse(localStorage.getItem('regolamentoFiles'));
      }
      existingFiles.push(fileDetails);
      localStorage.setItem('regolamentoFiles', JSON.stringify(existingFiles));

      // Aggiungi il file nella tabella della pagina HTML
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const downloadCell = document.createElement('td');
      const removeCell = document.createElement('td');
      const downloadLink = document.createElement('a');
      const removeButton = document.createElement('button');

      nameCell.textContent = fileName;
      downloadLink.href = fileURL;
      downloadLink.textContent = 'Download';
      downloadLink.download = fileName;
      removeButton.textContent = 'Rimuovi';
      removeButton.classList.add('remove-button');
      removeButton.onclick = function() {
        // Rimuove il file dalla tabella e dal JSON
        row.remove();
        existingFiles = existingFiles.filter(f => f.name !== fileName);
        localStorage.setItem('regolamentoFiles', JSON.stringify(existingFiles));
      };

      removeCell.appendChild(removeButton);
      downloadCell.appendChild(downloadLink);
      row.appendChild(nameCell);
      row.appendChild(downloadCell);
      row.appendChild(removeCell);
      tableBody.appendChild(row);

      // Mostra il tasto "Genera JSON"
      generateJsonButton.style.display = 'inline-block';
    } else {
      alert('Seleziona un file da caricare');
    }
  });

  // Funzione per generare il JSON e scaricarlo
  generateJsonButton.addEventListener('click', function() {
    // Crea il file JSON per il download con tutti i file
    const jsonBlob = new Blob([JSON.stringify({regolamentoFiles: JSON.parse(localStorage.getItem('regolamentoFiles'))})], {type: 'application/json'});
    const jsonURL = URL.createObjectURL(jsonBlob);

    // Crea un link per scaricare il JSON
    const downloadLink = document.createElement('a');
    downloadLink.href = jsonURL;
    downloadLink.download = 'regolamentoFiles.json';
    downloadLink.textContent = 'Scarica il JSON generato';

    // Aggiungi il link al body o dove vuoi
    document.body.appendChild(downloadLink);
  });
});
