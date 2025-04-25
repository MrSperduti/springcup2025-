
let dati = {};
let categoriaSelezionata = "";

document.getElementById("fileInput").addEventListener("change", e => {
  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      dati = JSON.parse(event.target.result);
    } catch {
      dati = {};
    }
    aggiornaCategorie();
    aggiornaVista();
  };
  reader.readAsText(e.target.files[0]);
});

function aggiornaCategorie() {
  const select = document.getElementById("selectCategoria");
  select.innerHTML = "";
  const categorie = Object.keys(dati);
  if (categorie.length === 0) return;

  categorie.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });

  categoriaSelezionata = categorie[0];
  select.value = categoriaSelezionata;

  select.onchange = () => {
    categoriaSelezionata = select.value;
    aggiornaVista();
  };
}

function aggiornaVista() {
  aggiornaPreview();
  renderGironi();
  renderPartite();
  renderFinali();
}

function aggiornaPreview() {
  const preview = document.getElementById("previewDati");
  if (categoriaSelezionata && dati[categoriaSelezionata]) {
    preview.textContent = JSON.stringify(dati[categoriaSelezionata], null, 2);
  } else {
    preview.textContent = "⚠️ Nessun dato disponibile per la categoria selezionata.";
  }
}

function creaInput(val = "", ph = "") {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = ph;
  input.value = val;
  return input;
}

function creaNumber(val = 0, ph = "") {
  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = ph;
  input.value = val;
  return input;
}

function creaBottone(label, fn) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.onclick = fn;
  return btn;
}

// GESTIONE GIRONI
function renderGironi() {
  const div = document.getElementById("listaGironi");
  div.innerHTML = "";
  const gironi = dati[categoriaSelezionata]?.gironi || {};
  Object.keys(gironi).forEach(nome => {
    const d = document.createElement("div");
    d.className = "item";
    const inputNome = creaInput(nome, "Nome Girone");
    const inputSquadre = creaInput(gironi[nome].join(", "), "Squadre separate da virgola");
    d.appendChild(inputNome);
    d.appendChild(inputSquadre);
    
    const marcatoriBox = document.createElement("div");
    marcatoriBox.className = "marcatori";
    creaMarcatoriEditor(partite[i], marcatoriBox, i);
    d.appendChild(marcatoriBox);

    const azioni = document.createElement("div");
    
    azioni.className = "actions";
    azioni.appendChild(creaBottone("💾 Salva", () => {
      delete gironi[nome];
      gironi[inputNome.value] = inputSquadre.value.split(",").map(s => s.trim());
      aggiornaVista();
    }));
    azioni.appendChild(creaBottone("🗑️ Cancella", () => {
      delete gironi[nome];
      aggiornaVista();
    }));
    d.appendChild(azioni);
    div.appendChild(d);
  });
}

function aggiungiGirone() {
  if (!dati[categoriaSelezionata].gironi) dati[categoriaSelezionata].gironi = {};
  dati[categoriaSelezionata].gironi["Nuovo Girone"] = [];
  aggiornaVista();
}

// GESTIONE PARTITE
function renderPartite() {
  const div = document.getElementById("listaPartite");
  div.innerHTML = "";
  const partite = dati[categoriaSelezionata].partite || [];

  partite.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "item";
    const giornata = creaInput(p.giornata || "", "Giornata");
    const squadraA = creaInput(p.squadraA || "", "Squadra A");
    const squadraB = creaInput(p.squadraB || "", "Squadra B");
    const golA = creaNumber(p.golA || 0, "Gol A");
    const golB = creaNumber(p.golB || 0, "Gol B");
    const portiere = creaInput(p.portiere || "", "Miglior Portiere");
    const squadraPortiere = creaInput(p.squadraPortiere || "", "Squadra Portiere");
    const giocatore = creaInput(p.giocatore || "", "Miglior Giocatore");
    const squadraGiocatore = creaInput(p.squadraGiocatore || "", "Squadra Giocatore");

    d.appendChild(giornata);
    d.appendChild(squadraA);
    d.appendChild(squadraB);
    d.appendChild(golA);
    d.appendChild(golB);
    d.appendChild(portiere);
    d.appendChild(squadraPortiere);
    d.appendChild(giocatore);
    d.appendChild(squadraGiocatore);

    
    const marcatoriBox = document.createElement("div");
    marcatoriBox.className = "marcatori";
    creaMarcatoriEditor(partite[i], marcatoriBox, i);
    d.appendChild(marcatoriBox);

    const azioni = document.createElement("div");
    
    azioni.className = "actions";
    azioni.appendChild(creaBottone("💾 Salva", () => {
      partite[i] = {
        giornata: parseInt(giornata.value),
        squadraA: squadraA.value,
        squadraB: squadraB.value,
        golA: parseInt(golA.value),
        golB: parseInt(golB.value),
        portiere: portiere.value,
        squadraPortiere: squadraPortiere.value,
        giocatore: giocatore.value,
        squadraGiocatore: squadraGiocatore.value
      };
      aggiornaVista();
    }));
    azioni.appendChild(creaBottone("🗑️ Cancella", () => {
      partite.splice(i, 1);
      aggiornaVista();
    }));
    d.appendChild(azioni);
    div.appendChild(d);
  });
}

function aggiungiPartita() {
  dati[categoriaSelezionata].partite.push({});
  aggiornaVista();
}

// GESTIONE FINALI
function renderFinali() {
  const div = document.getElementById("listaFinali");
  div.innerHTML = "";
  const finali = dati[categoriaSelezionata].finali || [];

  finali.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "item";
    const squadraA = creaInput(p.squadraA, "Squadra A");
    const squadraB = creaInput(p.squadraB, "Squadra B");
    const campo = creaInput(p.campo, "Campo");
    const orario = creaInput(p.orario, "Orario");
    const data = creaInput(p.data, "Data");
    d.appendChild(squadraA);
    d.appendChild(squadraB);
    d.appendChild(campo);
    d.appendChild(orario);
    d.appendChild(data);
    
    const marcatoriBox = document.createElement("div");
    marcatoriBox.className = "marcatori";
    creaMarcatoriEditor(partite[i], marcatoriBox, i);
    d.appendChild(marcatoriBox);

    const azioni = document.createElement("div");
    
    azioni.className = "actions";
    azioni.appendChild(creaBottone("💾 Salva", () => {
      finali[i] = {
        squadraA: squadraA.value,
        squadraB: squadraB.value,
        campo: campo.value,
        orario: orario.value,
        data: data.value
      };
      aggiornaVista();
    }));
    azioni.appendChild(creaBottone("🗑️ Cancella", () => {
      finali.splice(i, 1);
      aggiornaVista();
    }));
    d.appendChild(azioni);
    div.appendChild(d);
  });
}

function aggiungiFinale() {
  dati[categoriaSelezionata].finali.push({});
  aggiornaVista();
}

function esporta() {
  const blob = new Blob([JSON.stringify(dati, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dati.json";
  a.click();
  URL.revokeObjectURL(url);
}

// MARCATORI: nome, gol, squadra
function creaMarcatoriEditor(partita, container, index) {
  const marcatori = partita.marcatori || [];
  function aggiorna() {
    container.innerHTML = "<h5>Marcatori</h5>";
    marcatori.forEach((m, i) => {
      const riga = document.createElement("div");
      const nome = creaInput(m.nome || "", "Nome");
      const gol = creaNumber(m.gol || 1, "Gol");
      const squadra = creaInput(m.squadra || "", "Squadra");
      nome.oninput = () => m.nome = nome.value;
      gol.oninput = () => m.gol = parseInt(gol.value);
      squadra.oninput = () => m.squadra = squadra.value;
      riga.appendChild(nome);
      riga.appendChild(gol);
      riga.appendChild(squadra);
      const rimuovi = creaBottone("❌", () => {
        marcatori.splice(i, 1);
        aggiorna();
      });
      riga.appendChild(rimuovi);
      container.appendChild(riga);
    });
    const aggiungi = creaBottone("➕ Aggiungi Marcatore", () => {
      marcatori.push({ nome: "", gol: 1, squadra: "" });
      aggiorna();
    });
    container.appendChild(aggiungi);
  }
  aggiorna();
}
