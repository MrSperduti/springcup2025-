
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

  partite.forEach(p => {
    const g = p.giornata || "0";
    if (!giornate[g]) giornate[g] = [];
    giornate[g].push(p);
  });

  const partiteOrdinato = [];
  const numeriche = Object.keys(giornate).filter(g => !isNaN(parseInt(g))).sort((a, b) => parseInt(a) - parseInt(b));
  const nonNumeriche = Object.keys(giornate).filter(g => isNaN(parseInt(g))).sort(); // es. Semifinale, Finale

  [...numeriche, ...nonNumeriche].forEach(g => {
    giornate[g].forEach(p => partiteOrdinato.push(p));
  });

  if (index >= 0 && index < partiteOrdinato.length) {
    mostraPartita(partiteOrdinato[index]);
  }
}

function mostraPartita(p) {
  const contenitore = document.getElementById("dettagli-partita");

  const titolo = document.createElement("h2");
  if (p.golA !== undefined && p.golB !== undefined && p.golA !== null && p.golB !== null) {
    titolo.textContent = `${p.squadraA} ${p.golA} - ${p.golB} ${p.squadraB}`;
  } else {
    titolo.textContent = `${p.squadraA} vs ${p.squadraB}`;
  }
  contenitore.appendChild(titolo);

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  const colA = document.createElement("div");
  colA.className = "squadra";
  const colB = document.createElement("div");
  colB.className = "squadra";

  const squadraATitolo = document.createElement("h3");
  squadraATitolo.textContent = p.squadraA;
  colA.appendChild(squadraATitolo);

  const squadraBTitolo = document.createElement("h3");
  squadraBTitolo.textContent = p.squadraB;
  colB.appendChild(squadraBTitolo);

  const marcatori = Array.isArray(p.marcatori) ? p.marcatori : [];
  const marcatoriA = marcatori.filter(m => m.squadra === p.squadraA);
  const marcatoriB = marcatori.filter(m => m.squadra === p.squadraB);

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
