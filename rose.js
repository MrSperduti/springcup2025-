document.addEventListener("DOMContentLoaded", function() {
  const gironiData = {
    "GIRONE A": ["ACADEMY", "NEW TEAM", "ARDEA"],
    "GIRONE B": ["FORTITUDO", "CIRCOLO MASTER", "ECOCITY"]
  };

  const squadreButtonsDiv = document.getElementById("squadreButtons");

  // Creazione dei pulsanti per le squadre in `rose.html`
  Object.keys(gironiData).forEach(girone => {
    gironiData[ girone ].forEach(squadra => {
      const button = document.createElement("button");
      button.textContent = squadra;
      button.onclick = function() {
        // Salvo il nome della squadra in localStorage e reindirizzo alla pagina squadra.html
        localStorage.setItem("squadraName", squadra);
        window.location.href = "squadra.html";
      };
      squadreButtonsDiv.appendChild(button);
    });
  });
});
