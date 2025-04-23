
// LOGICA COMPLETA CORRETTA - editor-completo.js

let dati = {};
let categoriaSelezionata = "";

document.getElementById("fileInput").addEventListener("change", e => {
  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      dati = JSON.parse(event.target.result);
    } catch {
      dati = {
        "Under 17": { "partite": [], "gironi": {}, "finali": [] },
        "Under 15": { "partite": [], "gironi": {}, "finali": [] },
        "Under 13": { "partite": [], "gironi": {}, "finali": [] },
        "2014/15": { "partite": [], "gironi": {}, "finali": [] },
        "2016/17": { "partite": [], "gironi": {}, "finali": [] },
        "Under 15 femminile": { "partite": [], "gironi": {}, "finali": [] },
        "Under 13 femminile": { "partite": [], "gironi": {}, "finali": [] }
      };
    }
    
    aggiornaCategorie();
    aggiornaVista();
    
  };
  reader.readAsText(e.target.files[0]);
});

function aggiornaCategorie() {
  const select = document.getElementById("selectCategoria");
  select.innerHTML = "";
  Object.keys(dati).forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
  if (select.options.length > 0) {
    categoriaSelezionata = select.value;
    aggiornaVista();
  }
  select.onchange = () => {
    categoriaSelezionata = select.value;
    aggiornaVista();
  };
}

function aggiornaVista() {
  aggiornaPreview();
  renderPartite();
  renderGironi();
  renderFinali();
}

function aggiornaPreview() {
  document.getElementById("previewDati").textContent = JSON.stringify(dati[categoriaSelezionata], null, 2);
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

function creaSelect(options, selectedValue = "") {
  const select = document.createElement("select");
  options.forEach(opt => {
    const o = document.createElement("option");
    o.value = opt;
    o.textContent = opt;
    if (opt === selectedValue) o.selected = true;
    select.appendChild(o);
  });
  return select;
}

function creaBottone(label, fn) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.onclick = fn;
  return btn;
}

// GESTIONE PARTITE
function renderPartite() {
  const div = document.getElementById("listaPartite");
  div.innerHTML = "";
  const partite = dati[categoriaSelezionata].partite || [];

  const giornate = {};
  partite.forEach((p, i) => {
    const g = p.giornata || 0;
    if (!giornate[g]) giornate[g] = [];
    giornate[g].push({ p, i });
  });

  Object.keys(giornate).sort((a, b) => parseInt(a) - parseInt(b)).forEach(g => {
    const h = document.createElement("h4");
    h.textContent = "Giornata " + g;
    div.appendChild(h);
    giornate[g].forEach(({ p, i }) => {
      const d = document.createElement("div");
      d.className = "item";

      const inputs = {
        giornata: creaInput(p.giornata, "Giornata"),
        squadraA: creaInput(p.squadraA, "Squadra A"),
        squadraB: creaInput(p.squadraB, "Squadra B"),
        data: creaInput(p.data, "Data"),
        orario: creaInput(p.orario, "Orario"),
        campo: creaInput(p.campo, "Campo"),
        girone: creaInput(p.girone, "Girone"),
        golA: creaNumber(p.golA || 0, "Gol squadra A"),
        golB: creaNumber(p.golB || 0, "Gol squadra B"),
        portiere: creaInput(p.portiere, "Miglior Portiere"),
        squadraPortiere: creaInput(p.squadraPortiere || "", "Squadra Portiere"),
        giocatore: creaInput(p.giocatore, "Miglior Giocatore"),
        squadraGiocatore: creaInput(p.squadraGiocatore || "", "Squadra Giocatore")
      };

      const marcatoriDiv = document.createElement("div");
      marcatoriDiv.className = "marcatori";
      const listaMarcatori = (p.marcatori || []).map(m => ({ nome: m.nome, gol: m.gol, squadra: m.squadra || "" }));

      function aggiornaMarcatoriView() {
        marcatoriDiv.innerHTML = "<h5>Marcatori</h5>";
        listaMarcatori.forEach((m, idx) => {
          const riga = document.createElement("div");
          const nome = creaInput(m.nome, "Nome");
          const gol = creaNumber(m.gol, "Gol");
          const squadra = creaInput(m.squadra, "Squadra");
          riga.appendChild(nome);
          riga.appendChild(gol);
          riga.appendChild(squadra);
          const btnRimuovi = creaBottone("❌", () => {
            listaMarcatori.splice(idx, 1);
            aggiornaMarcatoriView();
          });
          riga.appendChild(btnRimuovi);
          nome.oninput = () => listaMarcatori[idx].nome = nome.value;
          gol.oninput = () => listaMarcatori[idx].gol = parseInt(gol.value);
          squadra.oninput = () => listaMarcatori[idx].squadra = squadra.value;
        });
        const btnAggiungi = creaBottone("➕ Aggiungi Marcatore", () => {
          listaMarcatori.push({ nome: "", gol: 1, squadra: "" });
          aggiornaMarcatoriView();
        });
        marcatoriDiv.appendChild(btnAggiungi);
      }

      aggiornaMarcatoriView();

      Object.values(inputs).forEach(el => d.appendChild(el));
      d.appendChild(marcatoriDiv);

      const azioni = document.createElement("div");
      azioni.className = "actions";
      azioni.appendChild(creaBottone("💾 Salva", () => {
        partite[i] = {
          giornata: parseInt(inputs.giornata.value),
          squadraA: inputs.squadraA.value,
          squadraB: inputs.squadraB.value,
          data: inputs.data.value,
          orario: inputs.orario.value,
          campo: inputs.campo.value,
          girone: inputs.girone.value,
          golA: parseInt(inputs.golA.value),
          golB: parseInt(inputs.golB.value),
          portiere: inputs.portiere.value,
          squadraPortiere: inputs.squadraPortiere.value,
          giocatore: inputs.giocatore.value,
          squadraGiocatore: inputs.squadraGiocatore.value,
          marcatori: listaMarcatori.filter(m => m.nome && !isNaN(m.gol))
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
  });
}

function aggiungiPartita() {
  dati[categoriaSelezionata].partite.push({});
  aggiornaVista();
}

// GESTIONE GIRONI
function renderGironi() {
  const div = document.getElementById("listaGironi");
  div.innerHTML = "";
  const gironi = dati[categoriaSelezionata].gironi || {};
  Object.keys(gironi).forEach(nome => {
    const d = document.createElement("div");
    d.className = "item";
    const inputNome = creaInput(nome, "Nome Girone");
    const inputSquadre = creaInput(gironi[nome].join(", "), "Squadre separate da virgola");
    d.appendChild(inputNome);
    d.appendChild(inputSquadre);
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
  dati[categoriaSelezionata].gironi["Nuovo Girone"] = [];
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
