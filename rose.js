document.addEventListener("DOMContentLoaded", function() {
  // Carichiamo i dati dei giocatori da dati.json
  const giocatori = {
    "ACADEMY": [
      { "cognome": "CAVAGNOLI", "nome": "CIRO", "nascita": "04.05.2008" },
      { "cognome": "GOBBI", "nome": "ALESSANDRO", "nascita": "21.08.2008" },
      { "cognome": "IANCU", "nome": "CRISTIAN", "nascita": "09.05.2008" },
      { "cognome": "MEROLA", "nome": "MATTEO", "nascita": "18.03.2008" },
      { "cognome": "PASSARO", "nome": "SIMONE", "nascita": "29.02.2008" },
      { "cognome": "MELIADO'", "nome": "GIOVANNI", "nascita": "14.11.2009" },
      { "cognome": "COLICINO", "nome": "LUCIANO", "nascita": "10.02.2009" },
      { "cognome": "LUPO", "nome": "DIEGO", "nascita": "23.06.2009" },
      { "cognome": "TABACILA", "nome": "VALENTIN DAVIDE", "nascita": "21.11.2009" },
      { "cognome": "TURCO", "nome": "GIUSEPPE", "nascita": "28.03.2008" },
      { "cognome": "SUSIN", "nome": "FRANCESCO", "nascita": "30.07.2009" },
      { "cognome": "COCHI", "nome": "MASSIMO", "nascita": "05.07.2008" },
      { "cognome": "CRISPI", "nome": "CHRISTIAN", "nascita": "03.04.2011" },
      { "cognome": "MIRRA", "nome": "ALESSANDRO", "nascita": "22.03.2011" }
    ],
    "NEW TEAM": [
      { "cognome": "ROSSETTI", "nome": "LUCA", "nascita": "11.03.2007" }
    ],
    "FORTITUDO": [
      { "cognome": "VERBENI", "nome": "DAVIDE", "nascita": "29.04.2007" }
    ]
  };

  const squadreButtonsDiv = document.getElementById("squadreButtons");

  // Creazione dei pulsanti per le squadre in `rose.html`
  Object.keys(giocatori).forEach(squadra => {
    const button = document.createElement("button");
    button.textContent = squadra;
    button.onclick = function() {
      // Mostra i giocatori della squadra selezionata
      mostraGiocatori(squadra);
    };
    squadreButtonsDiv.appendChild(button);
  });

  // Funzione per mostrare i giocatori della squadra selezionata
  function mostraGiocatori(squadra) {
    const squadraGiocatori = giocatori[squadra];

    // Nascondi prima l'elenco precedente
    document.getElementById("giocatoriContainer").innerHTML = "";

    // Crea la tabella dei giocatori per la squadra selezionata
    const table = document.createElement("table");
    table.innerHTML = "<tr><th>Cognome</th><th>Nome</th><th>Data di Nascita</th></tr>";

    squadraGiocatori.forEach(player => {
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
