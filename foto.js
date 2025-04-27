document.addEventListener("DOMContentLoaded", function() {
  const gallery = document.getElementById('gallery');

  fetch('https://raw.githubusercontent.com/MrSperduti/springcup2025-/main/fotoFiles.json')
    .then(response => response.json())
    .then(data => {
      data.fotoFiles.forEach(file => {
        const img = document.createElement('img');
        img.src = file.url;
        img.alt = file.name;
        img.onclick = function() {
          if (img.requestFullscreen) {
            img.requestFullscreen();
          } else if (img.webkitRequestFullscreen) { /* Safari */
            img.webkitRequestFullscreen();
          } else if (img.msRequestFullscreen) { /* IE11 */
            img.msRequestFullscreen();
          }
        };
        gallery.appendChild(img);
      });
    })
    .catch(error => {
      console.error('Errore durante il caricamento delle foto:', error);
    });
});
