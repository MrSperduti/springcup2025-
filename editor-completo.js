
let dati = {};
let categoriaSelezionata = "";

const strutturaIniziale = {
  "Under 17": { gironi: {}, partite: [], finali: [], rose: {} },
  "Under 15": { gironi: {}, partite: [], finali: [], rose: {} },
  "Under 13": { gironi: {}, partite: [], finali: [], rose: {} },
  "2014/15": { gironi: {}, partite: [], finali: [], rose: {} },
  "2016/17": { gironi: {}, partite: [], finali: [], rose: {} },
  "Under 15 femminile": { gironi: {}, partite: [], finali: [], rose: {} },
  "Under 13 femminile": { gironi: {}, partite: [], finali: [], rose: {} }
};

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("fileInput").addEventListener("change", e => {
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        dati = JSON.parse(event.target.result);
        if (Object.keys(dati).length === 0) {
          dati = JSON.parse(JSON.stringify(strutturaIniziale));
          alert("✅ File vuoto caricato: struttura base creata!");
        }
        aggiornaCategorie();
        aggiornaVista();
      } catch (error) {
        dati = {};
        alert("⚠️ Errore: il file caricato non è un JSON valido.");
      }
    };
    reader.readAsText(e.target.files[0]);
  });
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
  renderRose();
}

function aggiornaPreview() {
  const preview = document.getElementById("previewDati");
  if (categoriaSelezionata && dati[categoriaSelezionata]) {
    preview.textContent = JSON.stringify(dati[categoriaSelezionata], null, 2);
  } else {
    preview.textContent = "⚠️ Nessun dato disponibile.";
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

function renderPartite() {
  const div = document.getElementById("listaPartite");
  div.innerHTML = "";
  const partite = dati[categoriaSelezionata]?.partite || [];

  partite.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "item";

    const giornata = creaInput(p.giornata || "", "Giornata");
    const girone = creaInput(p.girone || "", "Girone");
    const squadraA = creaInput(p.squadraA || "", "Squadra A");
    const squadraB = creaInput(p.squadraB || "", "Squadra B");
    const campo = creaInput(p.campo || "", "Campo");
    const orario = creaInput(p.orario || "", "Orario");
    const data = creaInput(p.data || "", "Data");
    const golA = creaNumber(p.golA || '', "Gol A");
    const golB = creaNumber(p.golB || '', "Gol B");
    const portiere = creaInput(p.portiere || "", "Miglior Portiere");
    const squadraPortiere = creaInput(p.squadraPortiere || "", "Squadra Portiere");
    const giocatore = creaInput(p.giocatore || "", "Miglior Giocatore");
    const squadraGiocatore = creaInput(p.squadraGiocatore || "", "Squadra Giocatore");

    const marcatoriDiv = document.createElement("div");
    marcatoriDiv.className = "marcatori";
    const marcatori = p.marcatori || [];

    function aggiornaMarcatori() {
      marcatoriDiv.innerHTML = "<h5>Marcatori</h5>";
      marcatori.forEach((m, idx) => {
        const riga = document.createElement("div");
        const nome = creaInput(m.nome, "Nome");
        const gol = creaNumber(m.gol, "Gol");
        const squadra = creaInput(m.squadra, "Squadra");
        nome.oninput = () => m.nome = nome.value;
        gol.oninput = () => m.gol = parseInt(gol.value);
        squadra.oninput = () => m.squadra = squadra.value;
        riga.appendChild(nome);
        riga.appendChild(gol);
        riga.appendChild(squadra);
        const rimuovi = creaBottone("❌", () => {
          marcatori.splice(idx, 1);
          aggiornaMarcatori();
        });
        riga.appendChild(rimuovi);
        marcatoriDiv.appendChild(riga);
      });
      const aggiungi = creaBottone("➕ Aggiungi Marcatore", () => {
        marcatori.push({ nome: "", gol: 1, squadra: "" });
        aggiornaMarcatori();
      });
      marcatoriDiv.appendChild(aggiungi);
    }

    aggiornaMarcatori();

    d.appendChild(giornata);
    d.appendChild(girone);
    d.appendChild(squadraA);
    d.appendChild(squadraB);
    d.appendChild(campo);
    d.appendChild(orario);
    d.appendChild(data);
    d.appendChild(golA);
    d.appendChild(golB);
    d.appendChild(portiere);
    d.appendChild(squadraPortiere);
    d.appendChild(giocatore);
    d.appendChild(squadraGiocatore);
    d.appendChild(marcatoriDiv);

    const azioni = document.createElement("div");
    azioni.className = "actions";
    azioni.appendChild(creaBottone("💾 Salva", () => {
      partite[i] = {
        giornata: giornata.value,
        girone: girone.value,
        squadraA: squadraA.value,
        squadraB: squadraB.value,
        campo: campo.value,
        orario: orario.value,
        data: data.value,
        golA: golA.value !== '' ? parseInt(golA.value) : null,
        golB: golB.value !== '' ? parseInt(golB.value) : null,
        portiere: portiere.value,
        squadraPortiere: squadraPortiere.value,
        giocatore: giocatore.value,
        squadraGiocatore: squadraGiocatore.value,
        marcatori: marcatori
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
  if (!dati[categoriaSelezionata].partite) dati[categoriaSelezionata].partite = [];
  dati[categoriaSelezionata].partite.push({});
  aggiornaVista();
}
