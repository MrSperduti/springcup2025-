
document.addEventListener("DOMContentLoaded", async () => {
  const categoria = new URLSearchParams(window.location.search).get("categoria");
  const response = await fetch("dati.json");
  const dati = await response.json();
  const calendario = document.getElementById("calendario");

  if (!dati[categoria] || !dati[categoria].partite) {
    calendario.innerHTML = "<p>Nessuna partita trovata per questa categoria.</p>";
    return;
  }

  const partite = dati[categoria].partite;

  // Ordina le partite per giornata e poi per data e orario
  const giornate = {};
  partite.forEach(p => {
    const g = p.giornata || "0";
    if (!giornate[g]) giornate[g] = [];
    giornate[g].push(p);
  });

  const numeriche = Object.keys(giornate).filter(g => !isNaN(parseInt(g))).sort((a, b) => a - b);
  const nonNumeriche = Object.keys(giornate).filter(g => isNaN(parseInt(g))).sort();

  const giornateOrdinate = [...numeriche, ...nonNumeriche];

  giornateOrdinate.forEach(g => {
    const sezione = document.createElement("div");
    sezione.className = "giornata-section";

    const titolo = document.createElement("h3");
    titolo.textContent = "Giornata " + g;
    sezione.appendChild(titolo);

    const table = document.createElement("table");
    table.innerHTML = "<tr><th>Data</th><th>Ora</th><th>Squadra A</th><th></th><th>Squadra B</th><th>Campo</th><th>Risultato</th></tr>";

    giornate[g].sort((a, b) => {
      const dA = new Date("1970/01/01 " + (a.orario || "00:00"));
      const dB = new Date("1970/01/01 " + (b.orario || "00:00"));
      return dA - dB;
    }).forEach((p) => {
      const row = document.createElement("tr");

      const partitaLink = document.createElement("a");
      partitaLink.href = `partita.html?categoria=${encodeURIComponent(categoria)}&giornata=${encodeURIComponent(p.giornata)}&squadraA=${encodeURIComponent(p.squadraA)}&squadraB=${encodeURIComponent(p.squadraB)}&data=${encodeURIComponent(p.data)}`;
      partitaLink.textContent = (p.golA != null && p.golB != null) ? `${p.golA} - ${p.golB}` : "";

      row.innerHTML = `
        <td>${p.data}</td>
        <td>${p.orario}</td>
        <td>${p.squadraA}</td>
        <td>-</td>
        <td>${p.squadraB}</td>
        <td>${p.campo}</td>
        <td></td>
      `;
      if (partitaLink.textContent) row.cells[6].appendChild(partitaLink);
      table.appendChild(row);
    });

    sezione.appendChild(table);
    calendario.appendChild(sezione);
  });
});
