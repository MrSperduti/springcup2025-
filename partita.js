
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoria = decodeURIComponent(urlParams.get("categoria"));
  const giornata = decodeURIComponent(urlParams.get("giornata"));
  const squadraA = decodeURIComponent(urlParams.get("squadraA"));
  const squadraB = decodeURIComponent(urlParams.get("squadraB"));
  const data = decodeURIComponent(urlParams.get("data"));

  const res = await fetch("dati.json");
  const dati = await res.json();

  const partite = dati[categoria]?.partite || [];

  const normalize = (s) => (s || "").trim().toLowerCase();

  const partita = partite.find(p =>
    normalize(p.giornata) === normalize(giornata) &&
    normalize(p.squadraA) === normalize(squadraA) &&
    normalize(p.squadraB) === normalize(squadraB) &&
    normalize(p.data) === normalize(data)
  );

  if (!partita) {
    document.getElementById("riepilogo").innerHTML = "<p>Partita non trovata.</p>";
    return;
  }

  const p = partita;
  document.getElementById("titolo").textContent = `${p.squadraA} - ${p.squadraB}`;
  document.getElementById("data").textContent = p.data || "";
  document.getElementById("orario").textContent = p.orario || "";
  document.getElementById("campo").textContent = p.campo || "";
  document.getElementById("categoria").textContent = categoria;
  document.getElementById("girone").textContent = p.girone || "";
  document.getElementById("risultato").textContent = (p.golA != null && p.golB != null) ? `${p.golA} - ${p.golB}` : "";

  // Miglior giocatore e portiere
  document.getElementById("giocatore").textContent = p.giocatore || "";
  document.getElementById("squadraGiocatore").textContent = p.squadraGiocatore || "";
  document.getElementById("portiere").textContent = p.portiere || "";
  document.getElementById("squadraPortiere").textContent = p.squadraPortiere || "";

  // Marcatori
  const marcatori = p.marcatori || [];
  const marcatoriA = marcatori.filter(m => normalize(m.squadra) === normalize(p.squadraA));
  const marcatoriB = marcatori.filter(m => normalize(m.squadra) === normalize(p.squadraB));

  const listaA = document.getElementById("marcatoriA");
  const listaB = document.getElementById("marcatoriB");
  listaA.innerHTML = "";
  listaB.innerHTML = "";

  marcatoriA.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.nome} (${m.gol})`;
    listaA.appendChild(li);
  });
  marcatoriB.forEach(m => {
    const li = document.createElement("li");
    li.textContent = `${m.nome} (${m.gol})`;
    listaB.appendChild(li);
  });
});
