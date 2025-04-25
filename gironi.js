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