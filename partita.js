
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  fetch("dati.json")
    .then((res) => res.json())
    .then((dati) => {
      const [categoria, indexStr] = id.split("-");
      const index = parseInt(indexStr);
      const partite = dati[categoria]?.partite;

      if (!partite || isNaN(index) || !partite[index]) return;

      const p = partite[index];
      const contenitore = document.getElementById("dettagliPartita");
      if (!contenitore) return;

      const squadraA = p.squadraA || "";
      const squadraB = p.squadraB || "";
      const golA = p.golA ?? "-";
      const golB = p.golB ?? "-";
      const data = p.data || "";
      const orario = p.orario || "";
      const campo = p.campo || "";
      const marcatori = p.marcatori || [];
      const migliorGiocatore = p.migliorGiocatore;
      const migliorPortiere = p.migliorPortiere;

      let marcatoriHTML = "";
      const marcatoriA = marcatori.filter(m => m.squadra === squadraA);
      const marcatoriB = marcatori.filter(m => m.squadra === squadraB);

      if (marcatoriA.length || marcatoriB.length) {
        marcatoriHTML += `<h3>Marcatori</h3><div class="marcatori"><div><strong>${squadraA}</strong><ul>` +
          marcatoriA.map(m => `<li>${m.nome} (${m.gol})</li>`).join("") +
          `</ul></div><div><strong>${squadraB}</strong><ul>` +
          marcatoriB.map(m => `<li>${m.nome} (${m.gol})</li>`).join("") +
          `</ul></div></div>`;
      }

      let miglioriHTML = "";
      if (migliorGiocatore) {
        miglioriHTML += `<p><strong>Miglior Giocatore:</strong> ${migliorGiocatore.nome} (${migliorGiocatore.squadra})</p>`;
      }
      if (migliorPortiere) {
        miglioriHTML += `<p><strong>Miglior Portiere:</strong> ${migliorPortiere.nome} (${migliorPortiere.squadra})</p>`;
      }

      contenitore.innerHTML = `
        <h2>${squadraA} ${golA} - ${golB} ${squadraB}</h2>
        <p><strong>Data:</strong> ${data}</p>
        <p><strong>Orario:</strong> ${orario}</p>
        <p><strong>Campo:</strong> ${campo}</p>
        ${marcatoriHTML}
        ${miglioriHTML}
      `;
    });
});
