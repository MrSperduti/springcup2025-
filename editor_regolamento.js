
document.addEventListener("DOMContentLoaded", function() {
  const pdfInput = document.getElementById("pdfInput");
  const uploadFileButton = document.getElementById("uploadFileButton");
  const generateJsonButton = document.getElementById("generateJsonButton");
  let fileDetails = null;

  // Funzione per caricare il file e aggiungere alla tabella
  uploadFileButton.addEventListener('click', function() {
    const file = pdfInput.files[0];
    if (file) {
      const fileName = file.name;
      const fileURL = URL.createObjectURL(file);
      
      // Crea un oggetto JSON con i dettagli del file
      fileDetails = {
        name: fileName,
        url: fileURL,
        type: file.type,
        size: file.size
      };
      
      // Mostra il bottone per generare il JSON
      generateJsonButton.style.display = 'inline-block';
    } else {
      alert('Seleziona un file da caricare');
    }
  });

  // Funzione per generare il JSON e scaricarlo
  generateJsonButton.addEventListener('click', function() {
    if (fileDetails) {
      const jsonBlob = new Blob([JSON.stringify({regolamentoFiles: [fileDetails]})], {type: 'application/json'});
      const jsonURL = URL.createObjectURL(jsonBlob);
      
      // Crea un link per scaricare il JSON
      const downloadLink = document.createElement('a');
      downloadLink.href = jsonURL;
      downloadLink.download = 'regolamentoFiles.json';
      downloadLink.textContent = 'Scarica il JSON generato';
      
      // Aggiungi il link al body o dove vuoi
      document.body.appendChild(downloadLink);
    } else {
      alert('Nessun file caricato per generare il JSON');
    }
  });
});
