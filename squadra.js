document.addEventListener("DOMContentLoaded", function() {
  const squadraName = localStorage.getItem("squadraName");
  const giocatori = {
    "ACADEMY": [
      { "cognome": "CAVAGNOLI", "nome": "CIRO", "nascita": "04.05.2008" },
      { "cognome": "GOBBI", "nome": "ALESSANDRO", "nascita": "21.08.2008" },
      { "cognome": "IANCU", "nome": "CRISTIAN", "nascita": "09.05.2008" },
      { "cognome": "MEROLA", "nome": "MATTEO", "nascita": "18.03.2008" },
      { "cognome": "PASSARO", "nome": "SIMONE", "nascita": "29.02.2008" }
    ],
    "NEW TEAM": [
      { "cognome": "ROSSETTI", "nome": "LUCA", "nascita": "11.03.2007" }
    ]
  };

  const squadra = giocatori[squadraName];
  document.getElementById("squadraName").textContent = squadraName;

  const table = document.createElement("table");
  table.innerHTML = "<tr><th>Cognome</th><th>Nome</th><th>Data di Nascita</th></tr>";
  
  squadra.forEach(player => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${player.cognome}</td><td>${player.nome}</td><td>${player.nascita}</td>`;
    table.appendChild(row);
  });

  document.getElementById("giocatoriTable").appendChild(table);
});
