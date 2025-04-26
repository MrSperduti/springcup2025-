document.addEventListener("DOMContentLoaded", function() {
  const pdfInput = document.getElementById("pdfInput");
  const tableBody = document.querySelector('#pdfTable tbody');
  
  // Caricamento del file PDF e aggiunta alla tabella
  pdfInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const fileName = file.name;
    const fileURL = URL.createObjectURL(file);
    
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const downloadCell = document.createElement('td');
    const downloadLink = document.createElement('a');
    
    nameCell.textContent = fileName;
    downloadLink.href = fileURL;
    downloadLink.textContent = 'Download';
    downloadLink.download = fileName;
    downloadCell.appendChild(downloadLink);
    
    row.appendChild(nameCell);
    row.appendChild(downloadCell);
    tableBody.appendChild(row);
  });
});