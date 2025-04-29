document.addEventListener("DOMContentLoaded", function() {
  // Recupera la categoria dalla query string dell'URL (se presente)
  const urlParams = new URLSearchParams(window.location.search);
  const categoriaSelezionata = urlParams.get("categoria") || "Under 17"; // Default a Under 17 se non presente
  
  // Dati delle squadre e rose separati per categoria (caricati dal file dati.json)
  const roseData = {
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
    },
    "Under 13": {
      "ACADEMY": [
        { "cognome": "VELAZQUEZ", "nome": "RICARDO", "nascita": "10.10.2011" }
      ],
      "ANZIO": [
        { "cognome": "LUPO", "nome": "ANDREA", "nascita": "11.09.2010" }
      ],
      "FORTITUDO": [
        { "cognome": "MELIADO", "nome": "GIOVANNI", "nascita": "14.11.2009" }
      ]
    },
    "Under 15 femminile": {
      "ACADEMY": [
        { "cognome": "GONZALEZ", "nome": "MARIA", "nascita": "01.01.2012" }
      ]
    }
  };

  const squadreButtonsDiv = document.getElementById("squadreButtons");
  
  // Funzione per creare i pulsanti delle squadre in base alla categoria selezionata
  function mostraSquadre() {
    const squadre = roseData[categoriaSelezionata];

    if (!squadre) {
      squadreButtonsDiv.innerHTML = "<p>Nessuna squadra disponibile per questa categoria.</p>";
      return;
    }

    squadreButtonsDiv.innerHTML = ""; // Pulisce il contenitore dei pulsanti

    Object.keys(squadre).forEach(squadra => {
      const button = document.createElement("button");
      button.textContent = squadra;
      button.onclick = function() {
        // Mostra i giocatori della squadra selezionata
        mostraGiocatori(squadra);
      };
      squadreButtonsDiv.appendChild(button);
    });
  }

  // Funzione per mostrare i giocatori della squadra selezionata
  function mostraGiocatori(squadra) {
    const giocatori = roseData[categoriaSelezionata][squadra];

    // Contenitore per i giocatori
    const giocatoriContainer = document.getElementById("giocatoriContainer");
    giocatoriContainer.innerHTML = "";

    const table = document.createElement("table");
    table.innerHTML = "<tr><th>Cognome</th><th>Nome</th><th>Data di Nascita</th></tr>";

    giocatori.forEach(player => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${player.cognome}</td><td>${player.nome}</td><td>${player.nascita}</td>`;
      table.appendChild(row);
    });

    // Aggiungi la tabella al contenitore
    giocatoriContainer.appendChild(table);

    // Aggiungi il pulsante per chiudere l'elenco
    const closeButton = document.createElement("button");
    closeButton.textContent = "❌ Chiudi";
    closeButton.onclick = function() {
      giocatoriContainer.innerHTML = ""; // Rimuove la tabella
    };
    giocatoriContainer.appendChild(closeButton);
  }

  // Inizializzazione
  mostraSquadre();
});
