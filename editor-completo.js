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

function esporta() {
  const blob = new Blob([JSON.stringify(dati, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dati.json";
  a.click();
  URL.revokeObjectURL(url);
}


function aggiungiGiocatore() {
  const contenitore = document.getElementById("listaRose");
  const wrapper = document.createElement("div");
  wrapper.className = "item";

  const squadra = creaInput("", "Nome Squadra");
  const cognome = creaInput("", "Cognome");
  const nome = creaInput("", "Nome");
  const nascita = creaInput("", "Data di Nascita");

  wrapper.appendChild(squadra);
  wrapper.appendChild(cognome);
  wrapper.appendChild(nome);
  wrapper.appendChild(nascita);

  const azioni = document.createElement("div");
  azioni.className = "actions";

  azioni.appendChild(creaBottone("💾 Salva", () => {
    if (!dati[categoriaSelezionata].rose) dati[categoriaSelezionata].rose = {};
    if (!dati[categoriaSelezionata].rose[squadra.value]) {
      dati[categoriaSelezionata].rose[squadra.value] = [];
    }
    dati[categoriaSelezionata].rose[squadra.value].push({
      cognome: cognome.value,
      nome: nome.value,
      nascita: nascita.value
    });
    aggiornaVista();
  }));

  azioni.appendChild(creaBottone("🗑️ Cancella", () => {
    wrapper.remove();
  }));

  wrapper.appendChild(azioni);
  contenitore.appendChild(wrapper);
}