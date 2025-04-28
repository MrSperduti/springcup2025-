document.addEventListener("DOMContentLoaded", function() {
  const gironiData = {
    "GIRONE A": ["ACADEMY", "NEW TEAM", "ARDEA"],
    "GIRONE B": ["FORTITUDO", "CIRCOLO MASTER", "ECOCITY"]
  };

  const tableBody = document.getElementById("gironiBody");

  Object.keys(gironiData).forEach(girone => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${girone}</td><td>${gironiData[girone].join(", ")}</td>
    <td><button onclick="aggiungiSquadra('${girone}')">Aggiungi Squadra</button></td>`;
    tableBody.appendChild(row);
  });

  // Aggiunge una squadra alla rosa e la rende visibile nella pagina rose
  window.aggiungiSquadra = function(girone) {
    if (!localStorage.getItem('squadre')) {
      localStorage.setItem('squadre', JSON.stringify([]));
    }
    const squadre = JSON.parse(localStorage.getItem('squadre'));
    if (!squadre.includes(girone)) {
      squadre.push(girone);
      localStorage.setItem('squadre', JSON.stringify(squadre));
      alert('Squadra aggiunta alla rosa!');
    }
  };
});
