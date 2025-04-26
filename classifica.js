document.addEventListener("DOMContentLoaded", async () => {
  const categoria = new URLSearchParams(location.search).get("categoria");
  const response = await fetch("dati.json");
  const dati = await response.json();
  const container = document.getElementById("classifica");

  if (!dati[categoria] || !dati[categoria].partite) {
    container.innerHTML = "<p>Nessuna partita disponibile.</p>";
    return;
  }

  const partite = dati[categoria].partite;

  const gironi = {};

  partite.forEach(p => {
    if (!gironi[p.girone]) gironi[p.girone] = {};

    if (!gironi[p.girone][p.squadraA]) gironi[p.girone][p.squadraA] = { punti: 0, vinte: 0, pareggi: 0, perse: 0, gf: 0, gs: 0 };
    if (!gironi[p.girone][p.squadraB]) gironi[p.girone][p.squadraB] = { punti: 0, vinte: 0, pareggi: 0, perse: 0, gf: 0, gs: 0 };

    if (typeof p.golA === "number" && typeof p.golB === "number") {
      gironi[p.girone][p.squadraA].gf += p.golA;
      gironi[p.girone][p.squadraA].gs += p.golB;
      gironi[p.girone][p.squadraB].gf += p.golB;
      gironi[p.girone][p.squadraB].gs += p.golA;

      if (p.golA > p.golB) {
        gironi[p.girone][p.squadraA].punti += 3;
        gironi[p.girone][p.squadraA].vinte++;
        gironi[p.girone][p.squadraB].perse++;
      } else if (p.golA < p.golB) {
        gironi[p.girone][p.squadraB].punti += 3;
        gironi[p.girone][p.squadraB].vinte++;
        gironi[p.girone][p.squadraA].perse++;
      } else {
        gironi[p.girone][p.squadraA].punti += 1;
        gironi[p.girone][p.squadraB].punti += 1;
        gironi[p.girone][p.squadraA].pareggi++;
        gironi[p.girone][p.squadraB].pareggi++;
      }
    }
  });

  const gironiOrdinati = Object.keys(gironi).sort();

  gironiOrdinati.forEach(g => {
    const section = document.createElement("div");
    section.className = "girone-section";

    const titolo = document.createElement("h3");
    titolo.textContent = "Girone " + g;
    titolo.className = "titolo-girone";
    section.appendChild(titolo);

    const table = document.createElement("table");
    table.innerHTML = "<tr><th>Squadra</th><th>Punti</th><th>Vinte</th><th>Pareggi</th><th>Perse</th><th>GF</th><th>GS</th></tr>";

    const squadre = Object.entries(gironi[g]).sort((a, b) => b[1].punti - a[1].punti);

    squadre.forEach(([nome, stats]) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${nome}</td><td>${stats.punti}</td><td>${stats.vinte}</td><td>${stats.pareggi}</td><td>${stats.perse}</td><td>${stats.gf}</td><td>${stats.gs}</td>`;
      table.appendChild(row);
    });

    section.appendChild(table);
    container.appendChild(section);
  });
});