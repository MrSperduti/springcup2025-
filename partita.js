
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria");
  const index = parseInt(params.get("id"));

  const res = await fetch("dati.json");
  const dati = await res.json();
  const partite = dati[categoria]?.partite;

  if (!partite || !partite[index]) {
    document.getElementById("riepilogo").innerHTML = "<p>Partita non trovata.</p>";
    return;
  }

  const p = partite[index];

  document.getElementById("titolo").textContent = `${p.squadraA} - ${p.squadraB}`;
  document.getElementById("data").textContent = p.data;
  document.getElementById("orario").textContent = p.orario;
  document.getElementById("campo").textContent = p.campo;
  document.getElementById("categoria").textContent = categoria;
  document.getElementById("girone").textContent = p.girone || "";
  document.getElementById("risultato").textContent = (p.golA != null && p.golB != null) ? `${p.golA} - ${p.golB}` : "";

  // Marcatori
  const marcatori = p.marcatori || [];
  function normalize(s) {
    return (s || "").trim().toLowerCase();
  }
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

  // Miglior portiere e miglior giocatore
  document.getElementById("giocatore").textContent = p.giocatore || "";
  document.getElementById("squadraGiocatore").textContent = p.squadraGiocatore || "";
  document.getElementById("portiere").textContent = p.portiere || "";
  document.getElementById("squadraPortiere").textContent = p.squadraPortiere || "";
});
