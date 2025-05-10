
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get("cat");

  fetch("dati.json")
    .then((res) => res.json())
    .then((dati) => {
      if (!dati[cat] || !dati[cat].partite) return;

      const partite = dati[cat].partite;
      const container = document.getElementById("calendario");

      const partitePerGiornata = {};
      partite.forEach((p) => {
        const giornata = p.giornata || "Giornata unica";
        if (!partitePerGiornata[giornata]) partitePerGiornata[giornata] = [];
        partitePerGiornata[giornata].push(p);
      });

      Object.keys(partitePerGiornata).forEach((giornata) => {
        const titolo = document.createElement("h2");
        titolo.textContent = giornata;
        container.appendChild(titolo);

        partitePerGiornata[giornata].forEach((p, i) => {
          const partita = document.createElement("div");
          partita.className = "partita";

          const risultatoHTML = (p.golA !== undefined && p.golB !== undefined)
            ? `${p.golA} - ${p.golB}`
            : "Da giocare";

          const idPartita = `${cat}-${partite.indexOf(p)}`;
          const riepilogoButton = (p.golA !== undefined && p.golB !== undefined)
            ? `<button onclick="location.href='partita.html?id=${idPartita}'" class="riepilogo-btn">📋 Riepilogo</button>`
            : "";

          partita.innerHTML = `
            <div><span class="label">Squadre:</span> ${p.squadraA || ''} vs ${p.squadraB || ''}</div>
            <div><span class="label">Data:</span> ${p.data || ''}</div>
            <div><span class="label">Ora:</span> ${p.orario || ''}</div>
            <div><span class="label">Campo:</span> ${p.campo || ''}</div>
            <div><span class="label">Risultato:</span> ${risultatoHTML}</div>
            <div><span class="label">Girone:</span> ${p.girone || ''}</div>
            ${riepilogoButton}
          `;

          container.appendChild(partita);
        });
      });
    });
});
