
// Patch per rendere cliccabile il risultato
const idPartita = `${categoria}-${index}`;
const risultatoHTML = (p.golA !== undefined && p.golB !== undefined)
  ? `<a href="partita.html?id=${encodeURIComponent(idPartita)}">${p.golA} - ${p.golB}</a>`
  : "";
