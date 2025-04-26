
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

      // Genera l'URL corretto per il file caricato nella root del repository GitHub
      const fileURL = `https://raw.githubusercontent.com/MrSperduti/springcup2025-/main/${fileName}`;
      
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
      // Caricare il file JSON esistente dal localStorage o crearne uno nuovo
      let existingFiles = [];
      if (localStorage.getItem('regolamentoFiles')) {
        existingFiles = JSON.parse(localStorage.getItem('regolamentoFiles'));
      }

      // Aggiungi il nuovo file alla lista esistente
      existingFiles.push(fileDetails);

      // Salva la lista aggiornata dei file nel localStorage
      localStorage.setItem('regolamentoFiles', JSON.stringify(existingFiles));

      // Crea un file JSON con i dettagli dei file
      const jsonBlob = new Blob([JSON.stringify({regolamentoFiles: existingFiles})], {type: 'application/json'});
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
