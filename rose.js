document.addEventListener("DOMContentLoaded", function() {
  const roseData = {
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
    ]
  };

  const categoria = "Under 17"; // Seleziona la categoria
  const squadra = "ACADEMY"; // Seleziona la squadra
  const tableBody = document.getElementById("roseBody");

  roseData[squadra].forEach(player => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${squadra}</td><td>${player.nome} ${player.cognome}</td><td>${player.cognome}</td><td>${player.nascita}</td>`;
    tableBody.appendChild(row);
  });
});
