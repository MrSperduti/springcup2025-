document.addEventListener("DOMContentLoaded", function() {
  const gironiData = {
    "GIRONE A": ["ACADEMY", "NEW TEAM", "ARDEA"],
    "GIRONE B": ["FORTITUDO", "CIRCOLO MASTER", "ECOCITY"]
  };

  const tableContainer = document.getElementById("gironiBody");

  // Creazione di una tabella per ogni girone
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

    tableDiv.appendChild(table);
    tableContainer.appendChild(tableDiv);
  });

  // Funzione per aggiungere una squadra alla rosa e salvarla nella localStorage
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
