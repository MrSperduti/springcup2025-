document.addEventListener("DOMContentLoaded", function() {
  const gironiData = {
    "GIRONE A": ["ACADEMY", "NEW TEAM", "ARDEA"],
    "GIRONE B": ["FORTITUDO", "CIRCOLO MASTER", "ECOCITY"]
  };

  const tableBody = document.getElementById("gironiBody");

  Object.keys(gironiData).forEach(girone => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${girone}</td><td>${gironiData[girone].join(", ")}</td>`;
    tableBody.appendChild(row);
  });
});
