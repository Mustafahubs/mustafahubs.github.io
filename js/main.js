(function () {
  'use strict';

  const THEMES = {
    'bone-acid': { bg: '#0D0D0B', accent: '#C8FF2E' },
    'paper-vermilion': { bg: '#F2EDE3', accent: '#FF4A1C' },
    'deep-sea-peach': { bg: '#0A1224', accent: '#FF9E7A' },
    'forest-brass': { bg: '#0C1F19', accent: '#E2B54B' },
    'gallery-cobalt': { bg: '#FAFAFA', accent: '#2F3BFF' }
  };

  // Real business chores, grouped by where they land in the pipeline (first 5 of each are used on phones)
  const LANE_CHIPS = [
    // COMES IN - work that arrives
    ['new order email', 'customer message', 'booking request', 'new lead form', 'invoice PDF', 'spreadsheet row', 'support ticket', 'listing alert', 'payment notice'],
    // YOUR TOOLS - talking to the sites and software you already use
    ['log in', 'read inbox', 'pull report', 'check prices', 'fetch orders', 'export CSV', 'handle 2FA code', 'download invoice', 'fetch listings'],
    // THE RULES - decisions
    ['remove duplicates', 'match records', 'apply price rule', 'validate fields', 'flag exceptions', 'calculate totals', 'check stock', 'score the lead', 'match event names'],
    // DONE FOR YOU - results
    ['update sheet', 'send reply', 'post listing', 'alert on Discord', 'create invoice', 'file the report', 'sync inventory', 'notify team', 'log the result']
  ];

  const html = document.documentElement;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Saved theme restoration before boot
  try {
    const savedTheme = localStorage.getItem('pf-theme');
    if (savedTheme && THEMES[savedTheme]) {
      html.setAttribute('data-theme', savedTheme);
    }
  } catch (e) {}

  // Progressive enhancement & try/catch wrapper
  try {
    html.classList.add('js-ready');

    if (!window.gsap || !window.ScrollTrigger || !window.Lenis) {
      throw new Error('Required libraries missing');
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // Lenis Setup
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      infinite: false,
      autoResize: true
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    if (reduced) {
      lenis.stop();
    } else {
      lenis.stop(); // Stopped until preloader finishes
    }

    // 2. Preloader Logic
    const preloader = document.getElementById('preloader');
    const preloaderLines = document.querySelectorAll('.preloader__line');
    const preloaderBarFill = document.getElementById('preloaderBarFill');
    const preloaderCounter = document.getElementById('preloaderCounter');

    let tlPreload = gsap.timeline({
      onComplete: () => {
        if (preloader) {
          preloader.classList.add('is-done');
        }
        if (!reduced) lenis.start();
        playHeroIntro();
      }
    });

    // Animate terminal lines sequentially
    preloaderLines.forEach((line, i) => {
      tlPreload.to(line, { opacity: 1, duration: 0.15, onStart: () => line.classList.add('is-active') }, i * 0.4);
      if (i > 0) {
        tlPreload.set(preloaderLines[i - 1], { className: 'preloader__line is-complete' }, i * 0.4);
      }
    });

    // Counter & Bar fill
    const counterObj = { val: 0 };
    tlPreload.to(counterObj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        const currentVal = Math.floor(counterObj.val);
        if (preloaderCounter) {
          preloaderCounter.textContent = String(currentVal).padStart(3, '0');
        }
        if (preloaderBarFill) {
          preloaderBarFill.style.width = currentVal + '%';
        }
      }
    }, 0);

    if (reduced && preloader) {
      preloader.style.display = 'none';
      html.classList.add('is-done');
      lenis.start();
    }

    // 3. Hero Intro & Dot Canvas
    function playHeroIntro() {
      if (reduced) {
        gsap.set('.hero .line-inner', { y: 0 });
        return;
      }
      gsap.to('.hero .line-inner', {
        y: '0%',
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.out'
      });
    }

    // Hero Role typing/deleting effect
    const roles = window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.profile && window.PORTFOLIO_DATA.profile.roles 
      ? window.PORTFOLIO_DATA.profile.roles 
      : ['Python Automation Engineer', 'API Reverse-Engineer', 'Backend Systems Architect'];
    
    let roleIdx = 0;
    const roleTextEl = document.getElementById('heroRoleText');
    if (roleTextEl && roles.length > 0) {
      let currentText = '';
      let isDeleting = false;
      let charIdx = 0;
      let typingSpeed = 100;

      function typeRole() {
        const fullText = roles[roleIdx];
        if (isDeleting) {
          currentText = fullText.substring(0, charIdx--);
          typingSpeed = 50;
        } else {
          currentText = fullText.substring(0, charIdx++);
          typingSpeed = 100;
        }

        roleTextEl.textContent = currentText;

        if (!isDeleting && currentText === fullText) {
          typingSpeed = 2000; // Pause at end
          isDeleting = true;
        } else if (isDeleting && currentText === '') {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          typingSpeed = 500;
        }
        setTimeout(typeRole, typingSpeed);
      }
      setTimeout(typeRole, 1500);
    }

    // Canvas Dot Grid
    const canvas = document.getElementById('heroDotCanvas');
    if (canvas && !reduced) {
      const ctx = canvas.getContext('2d');
      let width, height;
      let dots = [];
      const spacing = 28;
      let mouse = { x: -9999, y: -9999, active: false };

      function resizeCanvas() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        initDots();
      }

      function initDots() {
        dots = [];
        for (let x = spacing / 2; x < width; x += spacing) {
          for (let y = spacing / 2; y < height; y += spacing) {
            dots.push({ ox: x, oy: y, x: x, y: y, vx: 0, vy: 0 });
          }
        }
      }

      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      const heroEl = document.getElementById('hero');
      let isHeroVisible = true;
      const observer = new IntersectionObserver(([entry]) => {
        isHeroVisible = entry.isIntersecting;
      }, { threshold: 0.05 });
      if (heroEl) observer.observe(heroEl);

      window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      });

      window.addEventListener('mouseleave', () => {
        mouse.active = false;
      });

      let dotColor = '#8B887C';
      let frameCount = 0;

      function renderCanvas() {
        if (isHeroVisible) {
          ctx.clearRect(0, 0, width, height);
          frameCount++;
          if (frameCount % 30 === 0) {
            const computed = getComputedStyle(document.documentElement);
            dotColor = computed.getPropertyValue('--muted').trim() || '#8B887C';
          }

          ctx.fillStyle = dotColor;
          const time = Date.now() * 0.002;

          for (let i = 0; i < dots.length; i++) {
            let d = dots[i];
            if (isTouch) {
              // Slow sine drift on touch
              d.x = d.ox + Math.sin(time + d.ox) * 4;
              d.y = d.oy + Math.cos(time + d.oy) * 4;
            } else {
              let dx = mouse.x - d.x;
              let dy = mouse.y - d.y;
              let dist = Math.sqrt(dx * dx + dy * dy);
              let maxDist = 90;

              if (mouse.active && dist < maxDist) {
                let force = (1 - dist / maxDist) * -18;
                d.vx += (dx / dist) * force;
                d.vy += (dy / dist) * force;
              }

              // Spring back
              let fx = (d.ox - d.x) * 0.1;
              let fy = (d.oy - d.y) * 0.1;
              d.vx = (d.vx + fx) * 0.8;
              d.vy = (d.vy + fy) * 0.8;

              d.x += d.vx;
              d.y += d.vy;
            }

            ctx.beginPath();
            ctx.arc(d.x, d.y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        requestAnimationFrame(renderCanvas);
      }
      requestAnimationFrame(renderCanvas);
    }

    // 4. Nav Hide/Show on Scroll & Scramble & Mobile Menu & Anchors
    const nav = document.getElementById('siteNav');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      let currentScroll = window.pageYOffset;
      if (currentScroll > 120) {
        if (currentScroll > lastScroll) {
          nav.classList.add('is-hidden');
        } else {
          nav.classList.remove('is-hidden');
        }
      } else {
        nav.classList.remove('is-hidden');
      }
      lastScroll = currentScroll;
    });

    // Scramble effect
    const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    document.querySelectorAll('[data-scramble]').forEach(el => {
      const originalText = el.textContent;
      el.addEventListener('mouseenter', () => {
        let iteration = 0;
        clearInterval(el.interval);
        el.interval = setInterval(() => {
          el.textContent = originalText.split('').map((char, index) => {
            if (index < iteration) return originalText[index];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }).join('');
          if (iteration >= originalText.length) clearInterval(el.interval);
          iteration += 1 / 3;
        }, 30);
      });
      el.addEventListener('mouseleave', () => {
        clearInterval(el.interval);
        el.textContent = originalText;
      });
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        if (isOpen) lenis.stop();
        else lenis.start();
      });
      mobileDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('is-open');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          lenis.start();
        });
      });
    }

    // Lenis Smooth Scroll Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -60, duration: 1.2 });
        }
      });
    });

    // 5. Custom Cursor
    if (!isTouch && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      html.classList.add('has-custom-cursor');
      const cursor = document.getElementById('customCursor');
      const cursorDot = document.getElementById('cursorDot');
      const cursorRing = document.getElementById('cursorRing');
      const cursorLabel = document.getElementById('cursorLabel');

      if (cursor && cursorDot && cursorRing) {
        const setXDot = gsap.quickTo(cursorDot, 'x', { duration: 0.1, ease: 'power3' });
        const setYDot = gsap.quickTo(cursorDot, 'y', { duration: 0.1, ease: 'power3' });
        const setXRing = gsap.quickTo(cursorRing, 'x', { duration: 0.25, ease: 'power3' });
        const setYRing = gsap.quickTo(cursorRing, 'y', { duration: 0.25, ease: 'power3' });

        window.addEventListener('mousemove', (e) => {
          setXDot(e.clientX);
          setYDot(e.clientY);
          setXRing(e.clientX);
          setYRing(e.clientY);
        });

        // Event delegation for cursor labels & hovers
        document.addEventListener('mouseover', (e) => {
          const target = e.target.closest('[data-cursor], a, button');
          if (!target) return;
          if (target.getAttribute('data-cursor')) {
            cursorLabel.textContent = target.getAttribute('data-cursor');
            cursor.classList.add('is-labeled');
          } else {
            cursor.classList.add('is-hover');
          }
        });

        document.addEventListener('mouseout', (e) => {
          const target = e.target.closest('[data-cursor], a, button');
          if (!target) return;
          cursor.classList.remove('is-labeled', 'is-hover');
          cursorLabel.textContent = '';
        });
      }
    }

    // 6. Magnetic Elements
    if (!isTouch) {
      document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);
          gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        });
      });
    }

    // 7. Scroll Progress
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    if (scrollProgressBar) {
      gsap.to(scrollProgressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });
    }

    // 8. Background Tone Morph (CSS-variable driven so palettes always apply)
    document.querySelectorAll('[data-bg-tone]').forEach(section => {
      const tone = section.getAttribute('data-bg-tone');
      ScrollTrigger.create({
        trigger: section, start: 'top center', end: 'bottom center',
        onEnter: () => { document.body.dataset.tone = tone; },
        onEnterBack: () => { document.body.dataset.tone = tone; }
      });
    });

    // 9. Chaos -> Pipeline (fully scrubbed + reversible, headline morphs letter by letter)
    const pipelineStage = document.getElementById('pipeline');
    const pipelineChipsLayer = document.getElementById('pipelineChipsLayer');
    const slotLanes = document.querySelectorAll('[data-slot-lane]');
    const chipCount = window.innerWidth < 700 ? 20 : 36;

    const splitChars = (el) => {
      const label = el.textContent.trim().replace(/\s+/g, ' ');
      const chars = [];
      const tmp = document.createElement('div');
      const walk = (node, parent) => {
        node.childNodes.forEach(n => {
          if (n.nodeType === 3) {
            n.textContent.split(/(\s+)/).forEach(part => {
              if (!part) return;
              if (/^\s+$/.test(part)) { parent.appendChild(document.createTextNode(' ')); return; }
              const w = document.createElement('span');
              w.className = 'hl-word';
              w.setAttribute('aria-hidden', 'true');
              [...part].forEach(ch => {
                const s = document.createElement('span');
                s.className = 'hl-char';
                s.textContent = ch;
                w.appendChild(s);
                chars.push(s);
              });
              parent.appendChild(w);
            });
          } else if (n.nodeType === 1) {
            const c = n.cloneNode(false);
            parent.appendChild(c);
            walk(n, c);
          }
        });
      };
      walk(el, tmp);
      el.setAttribute('aria-label', label);
      el.textContent = '';
      while (tmp.firstChild) el.appendChild(tmp.firstChild);
      return chars;
    };

    if (pipelineStage && pipelineChipsLayer) {
      const sticky = document.getElementById('pipelineSticky');
      const stateLabel = document.getElementById('pipelineStateLabel');
      const lanes = document.querySelectorAll('.pipeline-lane');
      const slotsPerLane = Math.ceil(chipCount / 4);
      const rnd = gsap.utils.random;

      slotLanes.forEach(slotContainer => {
        slotContainer.innerHTML = '';
        for (let i = 0; i < slotsPerLane; i++) {
          const slot = document.createElement('div');
          slot.className = 'pipeline-slot';
          slotContainer.appendChild(slot);
        }
      });

      pipelineChipsLayer.innerHTML = '';
      const chips = [];
      const plan = [];
      LANE_CHIPS.forEach((labels, lane) => labels.slice(0, slotsPerLane).forEach((label, slot) => plan.push({ label, lane, slot })));
      plan.sort(() => Math.random() - 0.5);
      plan.forEach(p => {
        const el = document.createElement('div');
        el.className = 'chaos-chip';
        el.innerHTML = '<span class="chaos-chip__box"><span class="chaos-chip__dot"></span><span>' + p.label + '</span></span>';
        el.style.setProperty('--jx', ((Math.random() - 0.5) * 26).toFixed(1) + 'px');
        el.style.setProperty('--jy', ((Math.random() - 0.5) * 26).toFixed(1) + 'px');
        el.style.setProperty('--jr', ((Math.random() - 0.5) * 10).toFixed(1) + 'deg');
        el.style.setProperty('--jd', (1.4 + Math.random() * 1.2).toFixed(2) + 's');
        pipelineChipsLayer.appendChild(el);
        chips.push({ el, lane: p.lane, slot: p.slot, rx: Math.random(), ry: Math.random(), rot: (Math.random() - 0.5) * 60, delay: Math.random() });
      });

      const layerRect = () => pipelineChipsLayer.getBoundingClientRect();
      const chaosPos = (c) => {
        const r = layerRect();
        return { x: c.rx * Math.max(10, r.width - (c.el.offsetWidth || 120)), y: c.ry * Math.max(10, r.height - (c.el.offsetHeight || 28)) };
      };
      const slotPos = (c) => {
        const slot = slotLanes[c.lane].querySelectorAll('.pipeline-slot')[c.slot];
        const sr = slot.getBoundingClientRect();
        const lr = layerRect();
        return { x: sr.left - lr.left, y: sr.top - lr.top };
      };

      // headline letters: "Manual chaos." (distressed) -> "One pipeline." (clean)
      const chaosEl = document.getElementById('chaosHeadline');
      const cleanEl = document.getElementById('cleanHeadline');
      const chaosChars = chaosEl ? splitChars(chaosEl) : [];
      const cleanChars = cleanEl ? splitChars(cleanEl) : [];
      if (cleanEl) gsap.set(cleanEl, { opacity: 1 });
      gsap.set(cleanChars, { opacity: 0, x: () => rnd(-90, 90), y: () => rnd(-70, 70), rotation: () => rnd(-60, 60) });

      let last = { ordered: null, aligned: null, locked: null };
      const apply = (p) => {
        const ordered = p > 0.42, aligned = p > 0.5, locked = p > 0.64;
        if (ordered !== last.ordered) {
          last.ordered = ordered;
          sticky.classList.toggle('is-ordered', ordered);
          if (stateLabel) stateLabel.textContent = ordered ? 'STATE: PIPELINE_ACTIVE' : 'STATE: UNSTRUCTURED_INPUT';
        }
        if (aligned !== last.aligned) {
          last.aligned = aligned;
          chips.forEach(c => c.el.classList.toggle('is-aligned', aligned));
        }
        if (locked !== last.locked) {
          last.locked = locked;
          lanes.forEach(l => l.classList.toggle('is-locked', locked));
        }
      };

      const pipelineTl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#pipeline',
          start: 'top top',
          end: '+=220%',
          pin: '#pipelineSticky',
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => apply(self.progress)
        }
      });

      chips.forEach(c => {
        pipelineTl.fromTo(c.el,
          { x: () => chaosPos(c).x, y: () => chaosPos(c).y, rotation: c.rot },
          { x: () => slotPos(c).x, y: () => slotPos(c).y, rotation: 0, duration: 0.3, ease: 'power3.inOut' },
          0.12 + c.delay * 0.22);
      });

      pipelineTl
        .to(chaosChars, { opacity: 0, x: () => rnd(-120, 120), y: () => rnd(-90, 90), rotation: () => rnd(-70, 70), duration: 0.16, ease: 'power2.in', stagger: { each: 0.012, from: 'random' } }, 0.28)
        .to(cleanChars, { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.2, ease: 'power3.out', stagger: { each: 0.014, from: 'random' } }, 0.4)
        .fromTo('#pipelineBeam', { scaleX: 0 }, { scaleX: 1, duration: 0.2 }, 0.64)
        .fromTo('#pipelineTerminalOut', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.12 }, 0.86)
        .to({}, { duration: 0.02 }, 0.98);

      apply(0);
    }

    // 10. Stats Counter & Marquee
    const statNums = document.querySelectorAll('.stat-card__num[data-count]');
    statNums.forEach(numEl => {
      const target = parseFloat(numEl.getAttribute('data-count'));
      const decimals = parseInt(numEl.getAttribute('data-decimals')) || 0;
      const suffix = numEl.getAttribute('data-suffix') || '';

      ScrollTrigger.create({
        trigger: numEl,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              numEl.textContent = obj.val.toFixed(decimals) + suffix;
            }
          });
        }
      });
    });

    const statsBgWord = document.getElementById('statsBgWord');
    if (statsBgWord) {
      gsap.to(statsBgWord, {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // 11. Palette Dock Swatches
    const paletteSwatches = document.getElementById('paletteSwatches');
    if (paletteSwatches) {
      paletteSwatches.innerHTML = '';
      Object.keys(THEMES).forEach(themeKey => {
        const tData = THEMES[themeKey];
        const btn = document.createElement('button');
        btn.className = `palette-swatch ${html.getAttribute('data-theme') === themeKey ? 'is-active' : ''}`;
        btn.setAttribute('aria-label', themeKey);
        btn.setAttribute('data-tooltip', themeKey);
        btn.style.setProperty('--swatch-bg', tData.bg);
        btn.style.setProperty('--swatch-accent', tData.accent);

        btn.addEventListener('click', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          document.documentElement.style.setProperty('--vt-x', x + 'px');
          document.documentElement.style.setProperty('--vt-y', y + 'px');

          const updateTheme = () => {
            html.setAttribute('data-theme', themeKey);
            try { localStorage.setItem('pf-theme', themeKey); } catch (e) {}
            document.querySelectorAll('.palette-swatch').forEach(s => s.classList.remove('is-active'));
            btn.classList.add('is-active');
            document.dispatchEvent(new CustomEvent('themechange'));
            ScrollTrigger.refresh();
          };

          if (document.startViewTransition) {
            document.startViewTransition(updateTheme);
          } else {
            updateTheme();
          }
        });

        paletteSwatches.appendChild(btn);
      });
    }

    // 12. Contact & Footer Utilities
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyEmailLabel = document.getElementById('copyEmailLabel');
    if (copyEmailBtn && copyEmailLabel) {
      copyEmailBtn.addEventListener('click', () => {
        const email = copyEmailBtn.getAttribute('data-email');
        navigator.clipboard.writeText(email).then(() => {
          copyEmailLabel.textContent = 'Copied!';
          window.PF.toast('Email address copied to clipboard');
          setTimeout(() => {
            copyEmailLabel.textContent = 'Copy Email Address';
          }, 1800);
        });
      });
    }

    const liveClock = document.getElementById('liveClock');
    if (liveClock) {
      function updateClock() {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        liveClock.textContent = `Bahawalnagar · ${formatter.format(new Date())} PKT`;
      }
      updateClock();
      setInterval(updateClock, 20000);
    }

    const footerYear = document.getElementById('footerYear');
    if (footerYear) {
      footerYear.textContent = new Date().getFullYear();
    }

    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        lenis.scrollTo(0, { duration: 1.6 });
      });
    }

    // 13. Expose Global Window.PF
    const toastEl = document.getElementById('toast');
    window.PF = {
      gsap,
      ScrollTrigger,
      lenis,
      toast(msg) {
        if (!toastEl) return;
        toastEl.textContent = msg;
        toastEl.classList.add('is-open');
        setTimeout(() => {
          toastEl.classList.remove('is-open');
        }, 2200);
      },
      refresh() {
        ScrollTrigger.refresh();
      },
      isTouch,
      reduced
    };

    // 14. Window Load & Fonts Ready Refresh
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

  } catch (err) {
    console.error('Portfolio Core Engine Error:', err);
    html.classList.add('js-ready');
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
  }

})();