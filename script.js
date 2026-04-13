const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const videoPlayer = document.getElementById('video-player');
const videoUrlInput = document.getElementById('video-url');
const videoFileInput = document.getElementById('video-file');
const loadUrlButton = document.getElementById('load-url');
const clearButton = document.getElementById('clear-video');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement && window.innerWidth <= 720) {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (loadUrlButton && videoPlayer && videoUrlInput) {
  loadUrlButton.addEventListener('click', () => {
    const url = videoUrlInput.value.trim();

    if (!url) {
      return;
    }

    videoPlayer.src = url;
    videoPlayer.load();
    videoPlayer.play().catch(() => {});
  });
}

if (videoFileInput && videoPlayer) {
  videoFileInput.addEventListener('change', () => {
    const file = videoFileInput.files && videoFileInput.files[0];

    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    videoPlayer.src = objectUrl;
    videoPlayer.load();
    videoPlayer.play().catch(() => {});
  });
}

if (clearButton && videoPlayer && videoUrlInput && videoFileInput) {
  clearButton.addEventListener('click', () => {
    videoPlayer.pause();
    videoPlayer.removeAttribute('src');
    videoPlayer.load();
    videoUrlInput.value = '';
    videoFileInput.value = '';
  });
}

document.querySelectorAll('[data-video-url]').forEach((button) => {
  button.addEventListener('click', () => {
    const videoUrl = button.getAttribute('data-video-url');

    if (!videoUrl || !videoPlayer) {
      return;
    }

    if (videoUrlInput) {
      videoUrlInput.value = videoUrl;
    }

    videoPlayer.src = videoUrl;
    videoPlayer.load();
    videoPlayer.play().catch(() => {});
  });
});

document.querySelectorAll('.nav a').forEach((link) => {
  if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
    link.classList.add('active');
  }
});
