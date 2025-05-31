
document.addEventListener("DOMContentLoaded", () => {
  const categorie = [
    "PICCOLI AMICI 2019-20",
    "MINIPULCINI 2017-18",
    "PULCINI 2015-16",
    "ESORDIENTI 2013-14",
    "UNDER 15 2011-12",
    "UNDER 13 FEMMINILE"
  ];

  const container = document.getElementById("categorie-container");

  categorie.forEach(categoria => {
    const btn = document.createElement("a");
    btn.href = `categoria.html?categoria=${encodeURIComponent(categoria)}`;
    btn.className = "categoria-button";
    const [nome, anni] = categoria.includes(" ") ? categoria.split(/(?=\d{4})/) : [categoria, ""];
    btn.innerHTML = anni ? `${nome.trim()}<br>${anni.trim()}` : nome.trim();
    container.appendChild(btn);
  });
});
