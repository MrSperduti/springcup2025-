document.addEventListener("DOMContentLoaded", function() {
  const squadre = JSON.parse(localStorage.getItem('squadre')) || [];
  const buttonsDiv = document.getElementById("squadreButtons");

  squadre.forEach(squadra => {
    const button = document.createElement("button");
    button.textContent = squadra;
    button.onclick = function() {
      mostraGiocatori(squadra);
    };
    buttonsDiv.appendChild(button);
  });

  function mostraGiocatori(squadra) {
    const giocatori = {
      "ACADEMY": [
        { "cognome": "CAVAGNOLI", "nome": "CIRO", "nascita": "04.05.2008" },
        { "cognome": "GOBBI", "nome": "ALESSANDRO", "nascita": "21.08.2008" },
        { "cognome": "IANCU", "nome": "CRISTIAN", "nascita": "09.05.2008" }
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
