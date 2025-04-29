document.addEventListener("DOMContentLoaded", function() {
  // Recupera la categoria dalla query string dell'URL (se presente)
  const urlParams = new URLSearchParams(window.location.search);
  const categoriaSelezionata = urlParams.get("categoria") || "Under 17"; // Default a Under 17 se non presente
  
  // Dati dei gironi separati per categoria
  const gironiData = {
    "Under 17": {
      "GIRONE A": ["ACADEMY", "NEW TEAM", "ARDEA"],
      "GIRONE B": ["FORTITUDO", "CIRCOLO MASTER", "ECOCITY"]
    },
    "Under 15": {
      "GIRONE A": ["ACADEMY", "S.PETRO E PAOLO", "NEW TEAM", "VELLETRI"]
    }
  };

  // Dati dei giocatori per categoria e squadra
  const giocatoriData = {
    "Under 17": {
      "ACADEMY": [
        { "cognome": "CAVAGNOLI", "nome": "CIRO", "nascita": "04.05.2008" },
        { "cognome": "GOBBI", "nome": "ALESSANDRO", "nascita": "21.08.2008" },
        { "cognome": "IANCU", "nome": "CRISTIAN", "nascita": "09.05.2008" },
        { "cognome": "MEROLA", "nome": "MATTEO", "nascita": "18.03.2008" },
        { "cognome": "PASSARO", "nome": "SIMONE", "nascita": "29.02.2008" }
      ],
      "FORTITUDO": [
        { "cognome": "VERBENI", "nome": "DAVIDE", "nascita": "29.04.2007" }
      ]
    },
    "Under 15": {
      "ACADEMY": [
        { "cognome": "VELAZQUEZ", "nome": "RICARDO", "nascita": "10.10.2011" }
      ],
      "S.PETRO E PAOLO": [
        { "cognome": "VELAZQUEZ", "nome": "RICARDO", "nascita": "10.10.2011" }
      ],
      "NEW TEAM": [
        { "cognome": "ROSSETTI", "nome": "LUCA", "nascita": "11.03.2007" }
      ],
      "VELLETRI": [
        { "cognome": "VELAZQUEZ", "nome": "RICARDO", "nascita": "10.10.2011" }
      ]
    }
  };

  const gironiContainer = document.getElementById("gironiContainer");

  // Salvo nel localStorage la categoria selezionata
  localStorage.setItem("categoriaSelezionata", categoriaSelezionata);

  // Funzione per visualizzare i gironi e le squadre in base alla categoria selezionata
  function renderGironi() {
    const gironi = gironiData[categoriaSelezionata];
    gironiContainer.innerHTML = "";

    Object.keys(gironi).forEach(girone => {
      const tableDiv = document.createElement("div");
      const table = document.createElement("table");
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `<th colspan="2">${girone}</th>`;
      table.appendChild(headerRow);

      gironi[ girone ].forEach(squadra => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${squadra}</td><td><button onclick="aggiungiSquadra('${squadra}')">Aggiungi alla rosa</button></td>`;
        table.appendChild(row);
      });

      gironiContainer.appendChild(tableDiv);
      tableDiv.appendChild(table);
    });
  }

  // Funzione per aggiungere una squadra alla rosa
  window.aggiungiSquadra = function(squadra) {
    if (!localStorage.getItem('squadre')) {
      localStorage.setItem('squadre', JSON.stringify([]));
    }
    const squadre = JSON.parse(localStorage.getItem('squadre'));
    if (!squadre.includes(squadra)) {
      squadre.push(squadra);
      localStorage.setItem('squadre', JSON.stringify(squadre));
      alert(squadra + ' è stata aggiunta alla rosa!');
    }
  };

  // Avvio del rendering dei gironi
  renderGironi();
});
