
async function loadMarcatori() {
  const cat = new URLSearchParams(location.search).get('categoria');
  const res = await fetch('dati.json');
  const dati = await res.json();
  const div = document.getElementById('marcatori');
  const marcatori = {};

  (dati[cat]?.partite || []).forEach(p => {
    (p.marcatori || []).forEach(m => {
      const key = m.nome.trim();
      if (!marcatori[key]) {
        marcatori[key] = { gol: 0, squadra: m.squadra || "-" };
      }
      marcatori[key].gol += parseInt(m.gol || 0);
    });
  });

  const table = document.createElement('table');
  table.innerHTML = '<tr><th>Giocatore</th><th>Squadra</th><th>Gol</th></tr>';
  Object.entries(marcatori)
    .sort((a, b) => b[1].gol - a[1].gol)
    .forEach(([nome, info]) => {
      table.innerHTML += `<tr><td>${nome}</td><td>${info.squadra}</td><td>${info.gol}</td></tr>`;
    });
  div.appendChild(table);
}
document.addEventListener('DOMContentLoaded', loadMarcatori);
