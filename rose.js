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
        // Mostra i giocatori della squadra selezionata
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

    // Nascondi prima l'elenco precedente
    document.getElementById("giocatoriContainer").innerHTML = "";

    // Crea la tabella dei giocatori per la squadra selezionata
    const table = document.createElement("table");
    table.innerHTML = "<tr><th>Cognome</th><th>Nome</th><th>Data di Nascita</th></tr>";

    giocatori[squadra].forEach(player => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${player.cognome}</td><td>${player.nome}</td><td>${player.nascita}</td>`;
      table.appendChild(row);
    });

    // Aggiungi la tabella al contenitore
    const giocatoriContainer = document.getElementById("giocatoriContainer");
    giocatoriContainer.appendChild(table);

    // Aggiungi il pulsante per chiudere l'elenco
    const closeButton = document.createElement("button");
    closeButton.textContent = "❌ Chiudi";
    closeButton.onclick = function() {
      giocatoriContainer.innerHTML = ""; // Rimuove la tabella
    };
    giocatoriContainer.appendChild(closeButton);
  }
});
