
function generaIdPartita(p, categoria) {
  const clean = (s) => (s || '').toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return `${clean(categoria)}_${clean(p.giornata)}_${clean(p.squadraA)}_${clean(p.squadraB)}_${clean(p.data)}_${clean(p.orario)}`;
}
    

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

  Object.keys(giornate).sort((a, b) => parseInt(a) - parseInt(b)).forEach(g => {
    const section = document.createElement('div');
    const titolo = document.createElement('h3');
    titolo.textContent = "Giornata " + g;
    section.appendChild(titolo);

    const table = document.createElement('table');
    table.innerHTML = '<tr><th>Squadra A</th><th>Squadra B</th><th>Data</th><th>Ora</th><th>Campo</th><th>Risultato</th><th>Girone</th></tr>';

    giornate[g].sort((a, b) => {
  function parseDate(p) {
    if (!p.data || !p.orario) return new Date(8640000000000000); // Max date
    const [day, month, year] = p.data.split('-').map(Number);
    const [hour, minute] = p.orario.split('.').map(Number);
    return new Date(year, month - 1, day, hour, minute);
  }

  return parseDate(a) - parseDate(b);
}).forEach(p => {
  
  const idPartita = generaIdPartita(p, cat);
  const haRisultato = p.golA !== null && p.golB !== null && p.golA !== undefined && p.golB !== undefined;
  const risultato = haRisultato
    ? `<div>${p.golA} - ${p.golB}</div><div style='text-align:center; margin-top: 5px;'><button onclick="location.href='partita.html?id=${idPartita}'">📋 Riepilogo</button></div>`
    : "-";
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${p.squadraA || ''}</td>
    <td>${p.squadraB || ''}</td>
    <td>${p.data || ''}</td>
    <td>${p.orario || ''}</td>
    <td>${p.campo || ''}</td>
    <td>${risultato}</td>
    <td>${p.girone || ''}</td>
  `;
  table.appendChild(row);

    <td>${p.squadraB || ''}</td>
    <td>${p.data || ''}</td>
    <td>${p.orario || ''}</td>
    <td>${p.campo || ''}</td>
    <td>${(p.golA || p.golB) ? p.golA + ' - ' + p.golB : ''}</td>
    <td>${p.girone || ''}</td>
  `;
  table.appendChild(row);
});

    section.appendChild(table);
    div.appendChild(section);
  });
}

document.addEventListener('DOMContentLoaded', loadCalendar);
