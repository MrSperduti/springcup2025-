
document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.querySelector('#pdfTable tbody');

  fetch('https://raw.githubusercontent.com/MrSperduti/springcup2025-/main/regolamentoFiles.json')
    .then(response => response.json())
    .then(data => {
      data.regolamentoFiles.forEach(file => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const downloadCell = document.createElement('td');
        const downloadLink = document.createElement('a');

        nameCell.textContent = file.name;
        downloadLink.href = file.url;
        downloadLink.textContent = 'Download';
        downloadLink.download = file.name;
        downloadCell.appendChild(downloadLink);

        row.appendChild(nameCell);
        row.appendChild(downloadCell);
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Errore durante il caricamento dei file:', error);
    });
});
