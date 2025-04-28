document.addEventListener("DOMContentLoaded", function() {
  const gallery = document.getElementById('gallery');

  fetch('https://raw.githubusercontent.com/MrSperduti/springcup2025-/main/videoFiles.json')
    .then(response => response.json())
    .then(data => {
      data.videoFiles.forEach(file => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');

        const video = document.createElement('video');
        video.src = file.url;
        video.controls = true;

        const desc = document.createElement('p');
        desc.classList.add('description');
        desc.textContent = file.description || '';

        item.appendChild(video);
        item.appendChild(desc);
        gallery.appendChild(item);
      });
    })
    .catch(error => {
      console.error('Errore durante il caricamento dei video:', error);
    });
});
