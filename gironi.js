document.addEventListener("DOMContentLoaded", async () => {
  const categoria = new URLSearchParams(location.search).get("categoria");
  const response = await fetch("dati.json");
  const dati = await response.json();
  const container = document.getElementById("gironi");

  if (!dati[categoria] || !dati[categoria].gironi) {
    container.innerHTML = "<p class='empty'>Nessun girone disponibile.</p>";
    return;
  }

  const gironi = dati[categoria].gironi;
  Object.entries(gironi).forEach(([nome, squadre]) => {
    const section = document.createElement("div");
    section.className = "girone-section";
    section.innerHTML = `<h3 class="titolo-girone">Girone ${nome}</h3>`;

    const table = document.createElement("table");
    table.className = "tabella-gironi";
    table.innerHTML = "<tr><th>Squadra</th></tr>";

    squadre.forEach(squadra => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${squadra}</td>`;
      table.appendChild(row);
    });

    section.appendChild(table);
    container.appendChild(section);
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const categoria = new URLSearchParams(location.search).get("categoria");
  const response = await fetch("dati.json");
  const dati = await response.json();
  const container = document.getElementById("squadre");

  if (!dati[categoria] || !dati[categoria].rose) {
    container.innerHTML = "<p class='empty'>Nessuna rosa disponibile.</p>";
    return;
  }

  const rose = dati[categoria].rose;

  Object.entries(rose).forEach(([nomeSquadra, giocatori]) => {
    const section = document.createElement("div");
    section.className = "squadra-section";
    const titolo = document.createElement("h3");
    titolo.textContent = nomeSquadra;
    section.appendChild(titolo);

    // Ordinamento per cognome
    const giocatoriOrdinati = giocatori.sort((a, b) => a.cognome.localeCompare(b.cognome));

    const table = document.createElement("table");
    table.innerHTML = "<tr><th>Cognome</th><th>Nome</th><th>Data di Nascita</th></tr>";

    giocatoriOrdinati.forEach(g => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${g.cognome}</td><td>${g.nome}</td><td>${g.nascita}</td>`;
      table.appendChild(row);
    });

    section.appendChild(table);
    container.appendChild(section);
  });
});