
async function loadPortieri() {
  const cat = new URLSearchParams(location.search).get('categoria');
  const res = await fetch('dati.json');
  const dati = await res.json();
  const div = document.getElementById('portieri');
  const count = {};

  (dati[cat]?.partite || []).forEach(p => {
    const nome = p.portiere;
    const squadra = p.squadraB || "-";
    if (nome) {
      if (!count[nome]) count[nome] = { voti: 0, squadra: squadra };
      count[nome].voti += 1;
    }
  });

  const table = document.createElement('table');
  table.innerHTML = '<tr><th>Portiere</th><th>Squadra</th><th>Voti</th></tr>';
  Object.entries(count)
    .sort((a, b) => b[1].voti - a[1].voti)
    .forEach(([nome, info]) => {
      table.innerHTML += `<tr><td>${nome}</td><td>${info.squadra}</td><td>${info.voti}</td></tr>`;
    });
  div.appendChild(table);
}
document.addEventListener('DOMContentLoaded', loadPortieri);
