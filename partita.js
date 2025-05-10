async function caricaDatiPartita() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  const [categoria, indexStr] = id.split("-");
  const index = parseInt(indexStr, 10);
  if (!categoria || isNaN(index)) return;

  const response = await fetch('dati.json');
  const dati = await response.json();

  const partite = dati[categoria]?.partite;
  if (partite && partite[index]) {
    mostraPartita(partite[index], categoria);
  }
}

function mostraPartita(p, categoria) {
  const contenitore = document.getElementById("dettagli-partita");

  const titolo = document.createElement("h2");
  titolo.textContent = `${p.squadraA} ${p.golA ?? ''} - ${p.golB ?? ''} ${p.squadraB}`;
  contenitore.appendChild(titolo);

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "space-around";
  wrapper.style.flexWrap = "wrap";
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

  if (p.giocatore) {
    const divG = document.createElement("div");
    divG.style.marginTop = "20px";
    divG.innerHTML = `<strong>Miglior Giocatore:</strong> ${p.giocatore} (${p.squadraGiocatore || ''})`;
    contenitore.appendChild(divG);
  }

  if (p.portiere) {
    const divP = document.createElement("div");
    divP.innerHTML = `<strong>Miglior Portiere:</strong> ${p.portiere} (${p.squadraPortiere || ''})`;
    contenitore.appendChild(divP);
  }
}

window.onload = caricaDatiPartita;
