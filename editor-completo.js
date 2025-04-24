
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
