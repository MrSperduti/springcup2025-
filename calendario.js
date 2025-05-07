
async function loadCalendar() {
  const cat = new URLSearchParams(location.search).get('categoria');
  const res = await fetch('dati.json');
  const dati = await res.json();
  const div = document.getElementById('calendario');
  div.innerHTML = '';

  const partite = dati[cat]?.partite || [];
  const giornate = {};

  partite.forEach(p => {
    const g = p.giornata || 0;
    if (!giornate[g]) giornate[g] = [];
    giornate[g].push(p);
  });

  Object.keys(giornate).sort((a, b) => {
    const n1 = parseInt(a.match(/\d+/));
    const n2 = parseInt(b.match(/\d+/));
    if (!isNaN(n1) && !isNaN(n2)) return n1 - n2;
    if (!isNaN(n1)) return -1;
    if (!isNaN(n2)) return 1;
    return a.localeCompare(b);
  }).forEach(g => {
    const section = document.createElement('div');
    section.className = 'giornata';
    const titolo = document.createElement('h3');
    titolo.textContent = "Giornata " + g;
    section.appendChild(titolo);

    giornate[g].forEach((p, index) => {
      const partita = document.createElement('div');
      partita.className = 'partita';

      let risultatoHTML = "-";
      if (typeof p.golA === "number" && typeof p.golB === "number") {
        const idPartita = `${cat}-${partite.indexOf(p)}`;
        risultatoHTML = `<a href="partita.html?id=${idPartita}">${p.golA} - ${p.golB}</a>`;
      }

      partita.innerHTML = `
        <div><span class="label">Squadre:</span> ${p.squadraA || ''} vs ${p.squadraB || ''}</div>
        <div><span class="label">Data:</span> ${p.data || ''}</div>
        <div><span class="label">Ora:</span> ${p.orario || ''}</div>
        <div><span class="label">Campo:</span> ${p.campo || ''}</div>
        <div><span class="label">Risultato:</span> ${risultatoHTML}</div>
        <div><span class="label">Girone:</span> ${p.girone || ''}</div>
      `;
      section.appendChild(partita);
    });

    div.appendChild(section);
  });
}

document.addEventListener('DOMContentLoaded', loadCalendar);
