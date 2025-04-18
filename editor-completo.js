
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
  renderGironi();
  renderPartite();
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

function creaTextarea(val = "", ph = "") {
  const ta = document.createElement("textarea");
  ta.placeholder = ph;
  ta.value = val;
  return ta;
}

function creaBottone(label, fn) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.onclick = fn;
  return btn;
}

function renderGironi() {
  const div = document.getElementById("listaGironi");
  div.innerHTML = "";
  const gironi = dati[categoriaSelezionata].gironi || {};
  Object.entries(gironi).forEach(([nome, squadre]) => {
    const d = document.createElement("div");
    d.className = "item";
    const iNome = creaInput(nome, "Nome girone");
    const iSquadre = creaTextarea(squadre.join(", "), "Squadre separate da virgola");
    d.appendChild(iNome);
    d.appendChild(iSquadre);
    const azioni = document.createElement("div");
    azioni.className = "actions";
    azioni.appendChild(creaBottone("💾 Salva", () => {
      delete gironi[nome];
      gironi[iNome.value] = iSquadre.value.split(",").map(s => s.trim()).filter(Boolean);
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
  dati[categoriaSelezionata].gironi["Nuovo"] = [];
  aggiornaVista();
}

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
        portiere: creaInput(p.portiere, "Miglior Portiere"),
        giocatore: creaInput(p.giocatore, "Miglior Giocatore"),
        marcatori: creaTextarea((p.marcatori || []).map(m => m.nome + ":" + m.gol).join(", "), "Marcatori")
      };
      Object.values(inputs).forEach(el => d.appendChild(el));
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
          portiere: inputs.portiere.value,
          giocatore: inputs.giocatore.value,
          marcatori: inputs.marcatori.value.split(",").map(m => {
            const [nome, gol] = m.trim().split(":");
            return { nome, gol: parseInt(gol) };
          }).filter(m => m.nome && !isNaN(m.gol))
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

function renderFinali() {
  const div = document.getElementById("listaFinali");
  div.innerHTML = "";
  const finali = dati[categoriaSelezionata].finali || [];
  finali.forEach((f, i) => {
    const d = document.createElement("div");
    d.className = "item";
    const inputs = {
      fase: creaInput(f.fase, "Fase"),
      squadraA: creaInput(f.squadraA, "Squadra A"),
      squadraB: creaInput(f.squadraB, "Squadra B"),
      data: creaInput(f.data, "Data"),
      orario: creaInput(f.orario, "Orario"),
      campo: creaInput(f.campo, "Campo"),
      portiere: creaInput(f.portiere, "Miglior Portiere"),
      giocatore: creaInput(f.giocatore, "Miglior Giocatore"),
      marcatori: creaTextarea((f.marcatori || []).map(m => m.nome + ":" + m.gol).join(", "), "Marcatori")
    };
    Object.values(inputs).forEach(el => d.appendChild(el));
    const azioni = document.createElement("div");
    azioni.className = "actions";
    azioni.appendChild(creaBottone("💾 Salva", () => {
      finali[i] = {
        fase: inputs.fase.value,
        squadraA: inputs.squadraA.value,
        squadraB: inputs.squadraB.value,
        data: inputs.data.value,
        orario: inputs.orario.value,
        campo: inputs.campo.value,
        portiere: inputs.portiere.value,
        giocatore: inputs.giocatore.value,
        marcatori: inputs.marcatori.value.split(",").map(m => {
          const [nome, gol] = m.trim().split(":");
          return { nome, gol: parseInt(gol) };
        }).filter(m => m.nome && !isNaN(m.gol))
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
