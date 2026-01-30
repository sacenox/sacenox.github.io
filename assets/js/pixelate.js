document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('.profile-pixelated');
  if (!img) return;

  const size = 32;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = size;
  canvas.height = size;
  canvas.className = 'profile-canvas';

  const alt = img.getAttribute('alt');
  if (alt) {
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', alt);
  }

  ctx.imageSmoothingEnabled = false;

  const source = new Image();
  source.crossOrigin = 'anonymous';
  source.onload = () => {
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(source, 0, 0, size, size);
    img.replaceWith(canvas);
  };
  source.onerror = () => {};
  source.src = img.currentSrc || img.src;
});
