(function () {
  var canvas = document.getElementById('galaxy');
  if (!canvas) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx = canvas.getContext('2d');

  var palette = {
    dark: {
      bg: '#262427',
      colors: ['#ff7272', '#bcdf59', '#ffca58', '#49cae4', '#a093e2', '#aee8f4'],
      alphaMin: 0.18,
      alphaRange: 0.30,
      glowInner: 'rgba(160, 147, 226, 0.06)',
      glowMid: 'rgba(73, 202, 228, 0.02)',
      count: 500,
    },
    light: {
      bg: '#FAFAFA',
      colors: ['#D1364E', '#6EA226', '#C08A19', '#2B8DB3', '#7C5EC1', '#2B9DA4'],
      alphaMin: 0.12,
      alphaRange: 0.22,
      glowInner: 'rgba(43, 141, 179, 0.05)',
      glowMid: 'rgba(124, 94, 193, 0.02)',
      count: 400,
    },
  };

  var width = 0;
  var height = 0;
  var centerX = 0;
  var centerY = 0;
  var particles = [];

  function isDark() {
    return document.documentElement.classList.contains('dark');
  }
  function theme() {
    return isDark() ? palette.dark : palette.light;
  }

  function resize() {
    var ratio = window.devicePixelRatio || 1;
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
    var t = theme();
    var count = Math.min(t.count, Math.floor((width + height) / 3));
    particles = [];
    for (var i = 0; i < count; i++) {
      var bright = Math.random() < 0.06;
      particles.push({
        radius: Math.random() * Math.min(width, height) * 0.5 + 10,
        angle: Math.random() * Math.PI * 2,
        speed: 0.0004 + Math.random() * 0.0013,
        size: bright ? 1.6 + Math.random() * 1.8 : 0.7 + Math.random() * 1.5,
        color: t.colors[Math.floor(Math.random() * t.colors.length)],
        baseAlpha: bright
          ? t.alphaMin + t.alphaRange * 0.9
          : t.alphaMin + Math.random() * t.alphaRange,
        drift: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.0006 + Math.random() * 0.0025,
        bright: bright,
      });
    }
  }

  function recolor() {
    var t = theme();
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.color = t.colors[Math.floor(Math.random() * t.colors.length)];
      p.baseAlpha = p.bright
        ? t.alphaMin + t.alphaRange * 0.9
        : t.alphaMin + Math.random() * t.alphaRange;
    }
  }

  function frame(time) {
    var t = theme();

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = t.bg;
    ctx.fillRect(0, 0, width, height);

    /* Nebula core glow */
    var r = Math.min(width, height) * 0.42;
    var grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);
    grad.addColorStop(0, t.glowInner);
    grad.addColorStop(0.5, t.glowMid);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var spiral = p.radius / 85;
      var x = centerX + Math.cos(p.angle + spiral) * p.radius;
      var y = centerY + Math.sin(p.angle + spiral) * p.radius;

      var flicker = Math.sin(time * p.twinkle + p.phase) * 0.06;
      ctx.globalAlpha = Math.max(0.02, p.baseAlpha + flicker);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();

      if (!reduceMotion) {
        p.angle += p.speed;
        p.radius += p.drift * 0.1;
      }
    }

    ctx.globalAlpha = 1;

    if (!reduceMotion) {
      requestAnimationFrame(frame);
    }
  }

  resize();
  makeParticles();

  if (reduceMotion) {
    frame(0);
  } else {
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', function () {
    resize();
    makeParticles();
    if (reduceMotion) frame(0);
  });

  window.addEventListener('themechange', recolor);
})();
