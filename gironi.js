document.addEventListener("DOMContentLoaded", function() {
  // Recupera la categoria dalla query string dell'URL (se presente)
  const urlParams = new URLSearchParams(window.location.search);
  const categoriaSelezionata = urlParams.get("categoria") || "Under 17"; // Default a Under 17 se non presente
  
  // Dati dei gironi separati per categoria (caricati dal file dati.json)
  const gironiData = {
    "Under 17": {
      "GIRONE A": ["ACADEMY", "NEW TEAM", "ARDEA"],
      "GIRONE B": ["FORTITUDO", "CIRCOLO MASTER", "ECOCITY"]
    },
    "Under 15": {
      "GIRONE A": ["ACADEMY", "S.PETRO E PAOLO", "NEW TEAM", "VELLETRI"],
      "GIRONE B": ["LAZIO", "TORINO", "LECCE"]
    },
    "Under 13": {
      "Girone A": ["ACADEMY", "ANZIO", "FORTITUDO"]
    },
    "Under 15 femminile": {
      "GIRONE A": ["ACADEMY", "BASIC", "SAN GIOVANNI"]
    }
  };

  const gironiContainer = document.getElementById("gironiContainer");

  // Salvo nel localStorage la categoria selezionata
  localStorage.setItem("categoriaSelezionata", categoriaSelezionata);

  // Funzione per visualizzare i gironi e le squadre in base alla categoria selezionata
  function renderGironi() {
    const gironi = gironiData[categoriaSelezionata];

    // Verifica se ci sono gironi per la categoria selezionata
    if (!gironi || Object.keys(gironi).length === 0) {
      gironiContainer.innerHTML = "<p>Nessun girone disponibile per questa categoria.</p>";
      return;
    }

    gironiContainer.innerHTML = ""; // Pulisce il contenitore dei gironi

    Object.keys(gironi).forEach(girone => {
      const tableDiv = document.createElement("div");
      const table = document.createElement("table");
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `<th colspan="2">${girone}</th>`;
      table.appendChild(headerRow);

      gironi[ girone ].forEach(squadra => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${squadra}</td>`;  // Visualizza solo i nomi delle squadre
        table.appendChild(row);
      });

      gironiContainer.appendChild(tableDiv);
      tableDiv.appendChild(table);
    });
  }

  // Avvio del rendering dei gironi
  renderGironi();
});
