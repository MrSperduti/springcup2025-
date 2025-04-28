document.addEventListener("DOMContentLoaded", function() {
  const gironiData = {
    "GIRONE A": ["ACADEMY", "NEW TEAM", "ARDEA"],
    "GIRONE B": ["FORTITUDO", "CIRCOLO MASTER", "ECOCITY"]
  };

  const squadreButtonsDiv = document.getElementById("squadreButtons");

  // Creazione dei pulsanti per le squadre in `rose.html`
  Object.keys(gironiData).forEach(girone => {
    gironiData[ girone ].forEach(squadra => {
      const button = document.createElement("button");
      button.textContent = squadra;
      button.onclick = function() {
        mostraGiocatori(squadra);
      };
      squadreButtonsDiv.appendChild(button);
    });
  });

  // Funzione per mostrare i giocatori della squadra selezionata
  function mostraGiocatori(squadra) {
    const giocatori = {
      "ACADEMY": [
        { "cognome": "CAVAGNOLI", "nome": "CIRO", "nascita": "04.05.2008" },
        { "cognome": "GOBBI", "nome": "ALESSANDRO", "nascita": "21.08.2008" },
        { "cognome": "IANCU", "nome": "CRISTIAN", "nascita": "09.05.2008" }
      ],
      "NEW TEAM": [
        { "cognome": "ROSSETTI", "nome": "LUCA", "nascita": "11.03.2007" }
      ]
    };

    const table = document.createElement("table");
    table.innerHTML = "<tr><th>Nome</th><th>Cognome</th><th>Data di Nascita</th></tr>";
    
    giocatori[squadra].forEach(player => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${player.nome}</td><td>${player.cognome}</td><td>${player.nascita}</td>`;
      table.appendChild(row);
    });

    document.body.appendChild(table);
  }
});
