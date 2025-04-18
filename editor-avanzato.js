
document.addEventListener("DOMContentLoaded", () => {
  const categoriaSelect = document.getElementById("selectCategoria");

  categoriaSelect.addEventListener("change", () => {
    aggiornaPreview();
    aggiornaGironi();
    aggiornaPartite();
    aggiornaFinali();
  });

  window.aggiornaPreview = function aggiornaPreview() {
    const categoria = categoriaSelect.value;
    document.getElementById("previewDati").textContent = JSON.stringify(dati[categoria], null, 2);
  };

  function creaInput(val = "", placeholder = "") {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    input.value = val;
    return input;
  }

  function creaTextarea(val = "", placeholder = "") {
    const ta = document.createElement("textarea");
    ta.placeholder = placeholder;
    ta.value = val;
    return ta;
  }

  function creaBottone(label, onclick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = onclick;
    return btn;
  }

  window.aggiornaGironi = function aggiornaGironi() {
    const container = document.getElementById("listaGironi") || creaSezione("Gironi", "listaGironi", aggiungiGirone);
    const categoria = categoriaSelect.value;
    container.innerHTML = "";
    const gironi = dati[categoria].gironi || {};
    Object.entries(gironi).forEach(([nome, squadre]) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `<h4>Girone ${nome}</h4>`;
      const inputNome = creaInput(nome, "Nome Girone");
      const inputSquadre = creaTextarea(squadre.join(", "), "Squadre separate da virgola");
      div.appendChild(inputNome);
      div.appendChild(inputSquadre);
      const actions = document.createElement("div");
      actions.className = "actions";
      actions.appendChild(creaBottone("💾 Salva", () => {
        delete dati[categoria].gironi[nome];
        dati[categoria].gironi[inputNome.value] = inputSquadre.value.split(",").map(s => s.trim()).filter(Boolean);
        aggiornaGironi();
        aggiornaPreview();
      }));
      actions.appendChild(creaBottone("🗑️ Cancella", () => {
        delete dati[categoria].gironi[nome];
        aggiornaGironi();
        aggiornaPreview();
      }));
      div.appendChild(actions);
      container.appendChild(div);
    });
  }

  function aggiungiGirone() {
    const categoria = categoriaSelect.value;
    dati[categoria].gironi["Nuovo"] = [];
    aggiornaGironi();
    aggiornaPreview();
  }

  window.aggiornaPartite = function aggiornaPartite() {
    const container = document.getElementById("listaPartite") || creaSezione("Partite", "listaPartite", aggiungiPartita);
    const categoria = categoriaSelect.value;
    const partite = dati[categoria].partite || [];
    container.innerHTML = "";

    const giornate = {};
    partite.forEach((p, i) => {
      const g = p.giornata || 0;
      if (!giornate[g]) giornate[g] = [];
      giornate[g].push({ partita: p, index: i });
    });

    Object.keys(giornate).sort((a, b) => parseInt(a) - parseInt(b)).forEach(g => {
      const titolo = document.createElement("h4");
      titolo.textContent = "Giornata " + g;
      container.appendChild(titolo);

      giornate[g].forEach(({ partita: p, index }) => {
        const div = document.createElement("div");
        div.className = "item";
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
          marcatori: creaTextarea((p.marcatori || []).map(m => `${m.nome}:${m.gol}`).join(", "), "Marcatori")
        };
        Object.values(inputs).forEach(i => div.appendChild(i));
        const actions = document.createElement("div");
        actions.className = "actions";
        actions.appendChild(creaBottone("💾 Salva", () => {
          partite[index] = {
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
          aggiornaPartite();
          aggiornaPreview();
        }));
        actions.appendChild(creaBottone("🗑️ Cancella", () => {
          partite.splice(index, 1);
          aggiornaPartite();
          aggiornaPreview();
        }));
        div.appendChild(actions);
        container.appendChild(div);
      });
    });
  }

  function aggiungiPartita() {
    const categoria = categoriaSelect.value;
    dati[categoria].partite.push({});
    aggiornaPartite();
    aggiornaPreview();
  }

  window.aggiornaFinali = function aggiornaFinali() {
    const container = document.getElementById("listaFinali") || creaSezione("Finali", "listaFinali", aggiungiFinale);
    const categoria = categoriaSelect.value;
    const finali = dati[categoria].finali || [];
    container.innerHTML = "";

    finali.forEach((f, index) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `<h4>${f.fase || 'Finale'} (${index + 1})</h4>`;
      const inputs = {
        fase: creaInput(f.fase, "Fase"),
        squadraA: creaInput(f.squadraA, "Squadra A"),
        squadraB: creaInput(f.squadraB, "Squadra B"),
        data: creaInput(f.data, "Data"),
        orario: creaInput(f.orario, "Orario"),
        campo: creaInput(f.campo, "Campo"),
        portiere: creaInput(f.portiere, "Miglior Portiere"),
        giocatore: creaInput(f.giocatore, "Miglior Giocatore"),
        marcatori: creaTextarea((f.marcatori || []).map(m => `${m.nome}:${m.gol}`).join(", "), "Marcatori")
      };
      Object.values(inputs).forEach(i => div.appendChild(i));
      const actions = document.createElement("div");
      actions.className = "actions";
      actions.appendChild(creaBottone("💾 Salva", () => {
        finali[index] = {
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
        aggiornaFinali();
        aggiornaPreview();
      }));
      actions.appendChild(creaBottone("🗑️ Cancella", () => {
        finali.splice(index, 1);
        aggiornaFinali();
        aggiornaPreview();
      }));
      div.appendChild(actions);
      container.appendChild(div);
    });
  }

  function aggiungiFinale() {
    const categoria = categoriaSelect.value;
    dati[categoria].finali.push({});
    aggiornaFinali();
    aggiornaPreview();
  }

  function creaSezione(titolo, id, aggiungiFunzione) {
    const container = document.createElement("div");
    container.className = "section";
    container.innerHTML = `<h3>${titolo}</h3><div id="${id}"></div>`;
    const btn = creaBottone("➕ Aggiungi " + titolo.slice(0, -1), aggiungiFunzione);
    container.appendChild(btn);
    document.querySelector(".container").appendChild(container);
    return document.getElementById(id);
  }
});
