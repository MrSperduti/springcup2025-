
async function caricaDatiPartita() {
  const params = new URLSearchParams(window.location.search);
  const rawId = params.get('id');
  if (!rawId) return;

  const [categoria, indexStr] = rawId.split("-");
  const index = parseInt(indexStr);

  const res = await fetch('dati.json');
  const dati = await res.json();

  const partite = dati[categoria]?.partite || [];
  const giornate = {};

  // Raggruppa partite per giornata, come fa calendario.js
  partite.forEach(p => {
    const g = p.giornata || 0;
    if (!giornate[g]) giornate[g] = [];
    giornate[g].push(p);
  });

  // Ricostruisce l'array ordinato
  const partiteOrdinato = [];
  Object.keys(giornate).sort((a, b) => {
    const n1 = parseInt(a.match(/\d+/)) || 0;
    const n2 = parseInt(b.match(/\d+/)) || 0;
    return n1 - n2;
  }).forEach(g => {
    giornate[g].forEach(p => partiteOrdinato.push(p));
  });

  if (index >= 0 && index < partiteOrdinato.length) {
    mostraPartita(partiteOrdinato[index]);
  }
}

function mostraPartita(p) {
  const contenitore = document.getElementById("dettagli-partita");

  const titolo = document.createElement("h2");
  titolo.textContent = `${p.squadraA} ${p.golA} - ${p.golB} ${p.squadraB}`;
  contenitore.appendChild(titolo);

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "space-around";
  wrapper.style.marginTop = "20px";

  const colA = document.createElement("div");
  const colB = document.createElement("div");

  const squadraATitolo = document.createElement("h3");
  squadraATitolo.textContent = p.squadraA;
  colA.appendChild(squadraATitolo);

  const squadraBTitolo = document.createElement("h3");
  squadraBTitolo.textContent = p.squadraB;
  colB.appendChild(squadraBTitolo);

  const marcatoriA = p.marcatori?.filter(m => m.squadra === p.squadraA) || [];
  const marcatoriB = p.marcatori?.filter(m => m.squadra === p.squadraB) || [];

  marcatoriA.forEach(m => {
    const el = document.createElement("div");
    el.textContent = `${m.nome} (${m.gol})`;
    colA.appendChild(el);
  });

  marcatoriB.forEach(m => {
    const el = document.createElement("div");
    el.textContent = `${m.nome} (${m.gol})`;
    colB.appendChild(el);
  });

  wrapper.appendChild(colA);
  wrapper.appendChild(colB);
  contenitore.appendChild(wrapper);
}

window.onload = caricaDatiPartita;
