
document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.querySelector('#pdfTable tbody');

  // Carica i file JSON dal repository
  fetch('https://raw.githubusercontent.com/MrSperduti/springcup2025-/main/regolamentoFiles.json')
    .then(response => response.json())
    .then(data => {
      // Aggiungi i file alla tabella
      data.regolamentoFiles.forEach(file => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const downloadCell = document.createElement('td');
        const removeCell = document.createElement('td');
        const downloadLink = document.createElement('a');
        const removeButton = document.createElement('button');

        nameCell.textContent = file.name;
        downloadLink.href = file.url;
        downloadLink.textContent = 'Download';
        downloadLink.download = file.name;
        removeButton.textContent = 'Rimuovi';
        removeButton.classList.add('remove-button');
        removeButton.onclick = function() {
          // Rimuove il file dalla tabella
          row.remove();
          
          // Rimuove anche dal localStorage
          let existingFiles = JSON.parse(localStorage.getItem('regolamentoFiles'));
          existingFiles = existingFiles.filter(f => f.name !== file.name);
          localStorage.setItem('regolamentoFiles', JSON.stringify(existingFiles));

          // Rimuove anche dal file JSON su GitHub (opzionale, ma consigliato)
          fetch('https://raw.githubusercontent.com/MrSperduti/springcup2025-/main/regolamentoFiles.json', {
            method: 'PUT',
            body: JSON.stringify({regolamentoFiles: existingFiles}),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => response.json())
          .then(() => console.log('File rimosso dal JSON su GitHub.'));
        };

        removeCell.appendChild(removeButton);
        downloadCell.appendChild(downloadLink);
        row.appendChild(nameCell);
        row.appendChild(downloadCell);
        row.appendChild(removeCell);
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Errore durante il caricamento dei file:', error);
    });
});
