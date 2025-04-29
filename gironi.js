document.addEventListener("DOMContentLoaded", function() {
  const gironiData = {
    "Under 17": {
      "GIRONE A": ["ACADEMY", "NEW TEAM", "ARDEA"],
      "GIRONE B": ["FORTITUDO", "CIRCOLO MASTER", "ECOCITY"]
    },
    "Under 15": {
      "GIRONE A": ["SQUADRA1", "SQUADRA2"],
      "GIRONE B": ["SQUADRA3", "SQUADRA4"]
    }
  };

  const giocatori = {
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
      "SQUADRA1": [
        { "cognome": "ROSI", "nome": "MATTEO", "nascita": "12.06.2005" }
      ],
      "SQUADRA2": [
        { "cognome": "FERRARI", "nome": "LUCA", "nascita": "22.09.2006" }
      ]
    }
  };

  const selectCategoria = document.getElementById("selectCategoria");
  let categoriaSelezionata = selectCategoria.value || "Under 17";

  const gironiContainer = document.getElementById("gironiContainer");

  // Salva i dati nel localStorage per la categoria selezionata
  localStorage.setItem("giocatoriData", JSON.stringify(giocatori));

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

  // Selezione della categoria
  selectCategoria.onchange = function() {
    categoriaSelezionata = selectCategoria.value;
    renderGironi();
  };

  // Avvio del rendering dei gironi
  renderGironi();
});
