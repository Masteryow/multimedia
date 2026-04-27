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

/* ── Scroll Up / Down buttons ── */
(function () {
  // Inject the two buttons into the page
  const btns = document.createElement('div');
  btns.className = 'scroll-btns';
  btns.setAttribute('aria-label', 'Page scroll shortcuts');
  btns.innerHTML = `
    <button class="scroll-btn" id="scroll-down-btn" title="Scroll to bottom" aria-label="Scroll to bottom">&#8595;</button>
    <button class="scroll-btn" id="scroll-up-btn"   title="Scroll to top"    aria-label="Scroll to top">&#8593;</button>
  `;
  document.body.appendChild(btns);

  const upBtn   = document.getElementById('scroll-up-btn');
  const downBtn = document.getElementById('scroll-down-btn');

  function updateButtons() {
    const scrollY      = window.scrollY;
    const maxScroll    = document.documentElement.scrollHeight - window.innerHeight;
    const nearBottom   = maxScroll - scrollY < 100;
    const scrolledDown = scrollY > 300;

    // Up button: show when scrolled down enough
    upBtn.classList.toggle('visible', scrolledDown);

    // Down button: show when NOT near the bottom and page is scrollable
    downBtn.classList.toggle('visible', !nearBottom && maxScroll > 100);
  }

  window.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons, { passive: true });
  updateButtons(); // run once on load

  upBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  downBtn.addEventListener('click', () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  });
})();
