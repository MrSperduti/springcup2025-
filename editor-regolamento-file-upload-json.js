document.addEventListener("DOMContentLoaded", function() {
  const pdfInput = document.getElementById("pdfInput");
  const tableBody = document.querySelector('#pdfTable tbody');
  
  // Array per memorizzare i file caricati
  let uploadedFiles = [];

  // Caricamento del file PDF e aggiunta alla tabella
  pdfInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const fileName = file.name;
    const fileURL = URL.createObjectURL(file);
    
    // Salvataggio del file in formato JSON
    uploadedFiles.push({
      name: fileName,
      url: fileURL
    });
    
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
    downloadCell.appendChild(downloadLink);
    
    removeButton.textContent = "❌";
    removeButton.onclick = () => {
      row.remove();
      uploadedFiles = uploadedFiles.filter(f => f.name !== fileName);
      saveToJSON();
    };
    removeCell.appendChild(removeButton);
    
    row.appendChild(nameCell);
    row.appendChild(downloadCell);
    row.appendChild(removeCell);
    tableBody.appendChild(row);

    // Salviamo i dati in formato JSON
    saveToJSON();
  });

  // Funzione per esportare i file come JSON (simulazione di salvataggio)
  function saveToJSON() {
    const jsonFiles = JSON.stringify(uploadedFiles, null, 2);
    console.log(jsonFiles);
    // Qui puoi simulare il salvataggio in un file JSON o inviarlo al server
  }
});