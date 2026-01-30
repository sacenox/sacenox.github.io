(function () {
  const canvas = document.getElementById('galaxy');
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  const colors = [
    '#cc6666',
    '#de935f',
    '#f0c674',
    '#b5bd68',
    '#8abeb7',
    '#81a2be',
    '#b294bb'
  ];

  let width = 0;
  let height = 0;
  let centerX = 0;
  let centerY = 0;
  let particles = [];

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    centerX = width * 0.5;
    centerY = height * 0.5;
  }

  function makeParticles() {
    const count = Math.min(360, Math.floor((width + height) / 4));
    particles = Array.from({ length: count }, () => {
      const radius = Math.random() * Math.min(width, height) * 0.45 + 10;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.0005 + Math.random() * 0.0012;
      return {
        radius,
        angle,
        speed,
        size: 0.8 + Math.random() * 1.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.2 + Math.random() * 0.25,
        drift: (Math.random() - 0.5) * 0.15
      };
    });
  }

  function drawParticle(particle) {
    const spiral = particle.radius / 90;
    const x = centerX + Math.cos(particle.angle + spiral) * particle.radius;
    const y = centerY + Math.sin(particle.angle + spiral) * particle.radius;
    ctx.globalAlpha = particle.alpha;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(x, y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }

  function frame() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#1d1f21';
    ctx.fillRect(0, 0, width, height);

    for (const particle of particles) {
      drawParticle(particle);
      if (!reduceMotion) {
        particle.angle += particle.speed;
        particle.radius += particle.drift * 0.1;
      }
    }

    if (!reduceMotion) {
      requestAnimationFrame(frame);
    }
  }

  resize();
  makeParticles();
  frame();
  window.addEventListener('resize', () => {
    resize();
    makeParticles();
    if (reduceMotion) frame();
  });
})();
