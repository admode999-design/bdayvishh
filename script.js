/* ═══════════════════════════════════════════════════
   BIRTHDAY CASE FILE v2 — script2.js
   ═══════════════════════════════════════════════════ */

/* ── LOADING SCREEN ─────────────────────────────────
   Fake progress bar. Dramatic. Unnecessary. Perfect.
   ─────────────────────────────────────────────────── */
(function runLoader() {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loaderFill');
  if (!loader || !fill) return;

  let progress = 0;
  const steps = [
    { target: 23, delay: 80  },
    { target: 47, delay: 55  },
    { target: 61, delay: 100 },
    { target: 78, delay: 40  },
    { target: 91, delay: 70  },
    { target: 100, delay: 30 },
  ];

  let stepIndex = 0;

  function runStep() {
    if (stepIndex >= steps.length) {
      // Done — hide loader
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => { loader.style.display = 'none'; }, 700);
      }, 400);
      return;
    }

    const step = steps[stepIndex];
    const increment = (step.target - progress) / 15;
    let current = progress;

    const interval = setInterval(() => {
      current += increment;
      if (current >= step.target) {
        current = step.target;
        clearInterval(interval);
        progress = current;
        stepIndex++;
        setTimeout(runStep, step.delay + Math.random() * 60);
      }
      fill.style.width = current + '%';
    }, 16);
  }

  // Start after a tiny delay
  setTimeout(runStep, 600);
})();


/* ── SCROLL REVEAL ───────────────────────────────────
   Observes .reveal elements and adds .visible on entry.
   ─────────────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach(el => observer.observe(el));
}

initReveal();


/* ── CHAOS BUTTON ────────────────────────────────────
   The button. The moment.
   ─────────────────────────────────────────────────── */

const VERDICT_MESSAGES = [
  "Case closed. She was the most interesting person in the room all along.",
  "The cold: still winning. Her: still iconic.",
  "Filed under: 'People who reply late but mean it when they do.'",
  "Therapist by day. 5am chaos agent by night. Balance.",
  "The compliment has been received. She will not acknowledge this.",
  "Instagram notification: read. Response: coming. Eventually. Warmly.",
  "Birth date confirmed: explains everything. No further questions.",
  "Her movie taste: uncanny. Her sleep schedule: a crime. Her: worth it.",
  "Verdict: she would've replied to this sooner but forgot she'd opened it.",
  "The cold is in year two now. They've merged. It's fine."
];

const COLORS = ['#FDCB6E','#FF7675','#74B9FF','#55EFC4','#A29BFE','#FD79A8','#00CEC9'];

let isChaosActive = false;

function triggerChaos() {
  if (isChaosActive) return;
  isChaosActive = true;

  fireSplash();
  fireConfetti();
  showVerdict();

  setTimeout(() => { isChaosActive = false; }, 3500);
}

function fireSplash() {
  const el = document.getElementById('splashOverlay');
  el.classList.remove('active');
  void el.offsetWidth;
  el.classList.add('active');
  setTimeout(() => el.classList.remove('active'), 900);
}

function fireConfetti() {
  const container = document.getElementById('confettiContainer');
  container.innerHTML = '';

  for (let i = 0; i < 100; i++) {
    const p = document.createElement('div');
    p.classList.add('confetti-piece');

    const color  = COLORS[Math.floor(Math.random() * COLORS.length)];
    const w      = Math.random() * 10 + 5;
    const h      = Math.random() * 14 + 4;
    const left   = Math.random() * 100;
    const delay  = Math.random() * 1.2;
    const dur    = Math.random() * 1.5 + 2;
    const radius = Math.random() > 0.6 ? '50%' : '1px';

    p.style.cssText = `
      left: ${left}%; top: -10px;
      width: ${w}px; height: ${h}px;
      background: ${color};
      border-radius: ${radius};
      animation-delay: ${delay}s;
      animation-duration: ${dur}s;
    `;
    container.appendChild(p);
  }

  setTimeout(() => { container.innerHTML = ''; }, 4500);
}

function showVerdict() {
  const el = document.getElementById('chaosMessage');
  const msg = VERDICT_MESSAGES[Math.floor(Math.random() * VERDICT_MESSAGES.length)];
  el.classList.remove('visible');
  setTimeout(() => {
    el.textContent = msg;
    el.classList.add('visible');
  }, 180);
}


/* ── SMOOTH SCROLL LINKS ─────────────────────────────
   ─────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ── SUBTLE: SECTION TAPE TYPEWRITER ────────────────
   Makes the EXHIBIT labels type-in on scroll.
   ─────────────────────────────────────────────────── */
function initTypeTape() {
  const tapes = document.querySelectorAll('.section-tape');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el   = entry.target;
        const text = el.textContent;
        el.textContent = '';
        el.style.opacity = '1';
        let i = 0;
        const interval = setInterval(() => {
          el.textContent += text[i];
          i++;
          if (i >= text.length) clearInterval(interval);
        }, 45);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  tapes.forEach(t => {
    t.style.opacity = '0';
    obs.observe(t);
  });
}

initTypeTape();


/* ═══════════════════════════════════════════════════
   END OF FILE.
   "She'll read this at 4:58am.
    We have accepted this."
   ═══════════════════════════════════════════════════ */
