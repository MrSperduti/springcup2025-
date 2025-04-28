document.addEventListener("DOMContentLoaded", function() {
  const gironiData = {
    "GIRONE A": ["ACADEMY", "NEW TEAM", "ARDEA"],
    "GIRONE B": ["FORTITUDO", "CIRCOLO MASTER", "ECOCITY"]
  };

  const giocatori = {
    "ACADEMY": [
      { "cognome": "CAVAGNOLI", "nome": "CIRO", "nascita": "04.05.2008" },
      { "cognome": "GOBBI", "nome": "ALESSANDRO", "nascita": "21.08.2008" },
      { "cognome": "IANCU", "nome": "CRISTIAN", "nascita": "09.05.2008" },
      { "cognome": "MEROLA", "nome": "MATTEO", "nascita": "18.03.2008" },
      { "cognome": "PASSARO", "nome": "SIMONE", "nascita": "29.02.2008" }
    ],
    "FORTITUDO": [
      { "cognome": "VERBENI", "nome": "DAVIDE", "nascita": "29.04.2007" }
    ],
    "NEW TEAM": [
      { "cognome": "ROSSETTI", "nome": "LUCA", "nascita": "11.03.2007" }
    ]
  };

  const gironiContainer = document.getElementById("gironiContainer");

  // Salvo i dati dei giocatori nel localStorage
  localStorage.setItem("giocatoriData", JSON.stringify(giocatori));

  // Creazione delle tabelle per ogni girone
  Object.keys(gironiData).forEach(girone => {
    const tableDiv = document.createElement("div");
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `<th colspan="2">${girone}</th>`;
    table.appendChild(headerRow);

    gironiData[ girone ].forEach(squadra => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${squadra}</td><td><button onclick="aggiungiSquadra('${squadra}')">Aggiungi alla rosa</button></td>`;
      table.appendChild(row);
    });

    gironiContainer.appendChild(tableDiv);
    tableDiv.appendChild(table);
  });

  // Funzione per aggiungere una squadra alla rosa e generare il pulsante in `rose.html`
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
});
