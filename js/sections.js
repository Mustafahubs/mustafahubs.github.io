;(function () {
  'use strict';

  const D = window.PORTFOLIO_DATA || {};
  const PF = window.PF || {};
  const gsap = PF.gsap || window.gsap;
  const ScrollTrigger = PF.ScrollTrigger || window.ScrollTrigger;
  const lenis = PF.lenis;
  const isTouch = PF.isTouch ?? false;
  const reduced = PF.reduced ?? false;

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const arr = (k) => (Array.isArray(D[k]) ? D[k] : []);
  const getProjects = () => arr('projects');
  const getPillars = () => arr('pillars');
  const getSkills = () => arr('skills');
  const getMarquees = () => arr('marquees');
  const getTimeline = () => arr('timeline');
  const getServices = () => arr('services');
  const getLinks = () => arr('links');

  // 1. ABOUT PILLARS
  function renderPillars() {
    const container = document.getElementById('aboutPillars');
    if (!container) return;
    const pillars = getPillars();
    container.innerHTML = pillars.map((p, i) => `
      <div class="pillar-item" data-reveal>
        <div class="pillar-item__title">${esc(p.title)}</div>
        <div class="pillar-item__desc">${esc(p.text)}</div>
      </div>
    `).join('');
  }

  // GENERATIVE SVG ARTWORK FOR PROJECT IMAGE FALLBACK
  function getGenerativeSvg(category) {
    let pat = '';
    const cat = (category || '').toLowerCase();
    if (cat.includes('automation')) {
      pat = `<line x1="0" y1="100" x2="1200" y2="700" stroke="var(--accent)" stroke-width="3" opacity="0.4"/><line x1="0" y1="300" x2="1200" y2="900" stroke="var(--accent2)" stroke-width="2" opacity="0.4"/><line x1="0" y1="500" x2="1200" y2="1100" stroke="var(--muted)" stroke-width="1" opacity="0.3"/>`;
    } else if (cat.includes('bot')) {
      pat = `<rect x="150" y="200" width="300" height="150" rx="20" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><rect x="600" y="350" width="400" height="180" rx="20" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><circle cx="220" cy="275" r="10" fill="var(--accent)"/><circle cx="680" cy="440" r="10" fill="var(--accent2)"/>`;
    } else if (cat.includes('ticket')) {
      pat = `<path d="M100 400 H1100 V500 H100 Z" fill="none" stroke="var(--accent)" stroke-width="3" stroke-dasharray="20 15"/><circle cx="100" cy="450" r="30" fill="var(--bg)" stroke="var(--accent)" stroke-width="2"/><circle cx="1100" cy="450" r="30" fill="var(--bg)" stroke="var(--accent)" stroke-width="2"/>`;
    } else if (cat.includes('health')) {
      pat = `<path d="M100 400 H450 L520 250 L600 550 L670 350 L720 450 H1100" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="600" cy="450" r="120" fill="none" stroke="var(--accent2)" stroke-width="1.5" opacity="0.5"/>`;
    } else if (cat.includes('mobile')) {
      pat = `<rect x="420" y="100" width="360" height="600" rx="40" fill="var(--surface)" stroke="var(--accent)" stroke-width="3"/><rect x="470" y="180" width="260" height="420" rx="10" fill="var(--bg)"/><rect x="540" y="130" width="120" height="15" rx="7" fill="var(--muted)"/>`;
    } else if (cat.includes('devops')) {
      pat = `<rect x="200" y="150" width="800" height="120" rx="8" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><rect x="200" y="340" width="800" height="120" rx="8" fill="var(--surface)" stroke="var(--accent2)" stroke-width="2"/><line x1="250" y1="210" x2="350" y2="210" stroke="var(--accent)" stroke-width="4"/><circle cx="930" cy="210" r="8" fill="var(--accent)"/>`;
    } else if (cat.includes('educat')) {
      pat = `<path d="M600 200 L950 350 L600 500 L250 350 Z" fill="none" stroke="var(--accent)" stroke-width="3"/><path d="M380 410 V550 C380 620 820 620 820 550 V410" fill="none" stroke="var(--accent2)" stroke-width="2"/>`;
    } else {
      pat = `<rect x="250" y="200" width="700" height="400" rx="12" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><line x1="250" y1="280" x2="950" y2="280" stroke="var(--border-strong)" stroke-width="2"/><circle cx="290" cy="240" r="6" fill="var(--accent2)"/><circle cx="315" cy="240" r="6" fill="var(--accent)"/>`;
    }
    return `<svg class="project-card__svg-fallback" viewBox="0 0 1200 800" width="1200" height="800" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="1200" height="800" fill="var(--bg)"/>${pat}</svg>`;
  }

  // 2. PROJECTS
  let currentFilter = 'All';
  let projectST = null;

  function renderProjects() {
    const filtersEl = document.getElementById('projectFilters');
    const trackEl = document.getElementById('projectsTrack');
    const totalEl = document.getElementById('projectIndexTotal');
    if (!filtersEl || !trackEl) return;

    const categories = D.categories || ['All'];
    filtersEl.innerHTML = categories.map(cat => `
      <button type="button" class="filter-chip ${cat === currentFilter ? 'is-active' : ''}" role="tab" aria-selected="${cat === currentFilter}">${esc(cat)}</button>
    `).join('');

    let projects = getProjects();
    if (currentFilter !== 'All') {
      projects = projects.filter(p => p.category.toLowerCase() === currentFilter.toLowerCase());
    }

    if (totalEl) totalEl.textContent = String(projects.length).padStart(2, '0');

    trackEl.innerHTML = projects.map((p, i) => {
      const idxStr = String(i + 1).padStart(2, '0');
      const fallbackSvg = getGenerativeSvg(p.category);
      const linksHtml = (p.links || []).map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener" class="project-card__link">${esc(l.label)} &nearr;</a>`).join('');
      const techHtml = (p.tech || []).map(t => `<span class="project-card__tech-chip">${esc(t)}</span>`).join('');
      
      return `
        <article class="project-card" tabindex="0" role="button" aria-label="View case study for ${esc(p.title)}" data-slug="${esc(p.slug)}">
          <div class="project-card__media">
            <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" width="1200" height="800" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div style="display:none; width:100%; height:100%;">${fallbackSvg}</div>
          </div>
          <div class="project-card__content">
            <div class="project-card__top">
              <span class="mono project-card__cat">${esc(p.category)}</span>
            </div>
            <h3 class="project-card__title">${esc(p.title)}</h3>
            <p class="project-card__summary">${esc(p.summary)}</p>
            <div class="project-card__tech">${techHtml}</div>
            <div class="project-card__bottom">
              <button type="button" class="btn btn--primary project-card__cta" data-cursor="VIEW">Case Study</button>
              <div class="project-card__links">${linksHtml}</div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    setupProjectsScroll(projects.length);
  }

  function setupProjectsScroll(count) {
    const section = document.getElementById('projects');
    const viewport = document.getElementById('projectsViewport');
    const track = document.getElementById('projectsTrack');
    const currentEl = document.getElementById('projectIndexCurrent');
    const progressFill = document.getElementById('projectsProgressFill');
    if (!section || !viewport || !track) return;

    if (projectST) {
      projectST.kill();
      projectST = null;
    }

    const isDesktop = window.innerWidth >= 960 && !isTouch && !reduced;

    if (isDesktop) {
      section.classList.add('is-horizontal');
      gsap.set(track, { clearProps: 'all' });
      const getScrollAmount = () => -(track.scrollWidth - viewport.clientWidth);
      
      projectST = ScrollTrigger.create({
        trigger: section,
        pin: section,
        start: 'top top',
        end: () => `+=${Math.round(Math.abs(getScrollAmount()) * 0.55)}`,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => {
          const x = getScrollAmount() * self.progress;
          gsap.set(track, { x: x });
          if (progressFill) gsap.set(progressFill, { scaleX: self.progress });
          if (currentEl && count > 0) {
            const idx = Math.min(count, Math.floor(self.progress * count) + 1);
            currentEl.textContent = String(idx).padStart(2, '0');
          }
        }
      });
    } else {
      section.classList.remove('is-horizontal');
      gsap.set(track, { clearProps: 'all' });
      if (progressFill) gsap.set(progressFill, { scaleX: 0 });
    }
  }

  // 3. CASE STUDY MODAL
  function openCaseStudy(slug) {
    const projects = getProjects();
    const p = projects.find(item => item.slug === slug);
    if (!p) return;

    const modal = document.getElementById('caseModal');
    const meta = document.getElementById('caseModalMeta');
    const body = document.getElementById('caseModalBody');
    const closeBtn = document.getElementById('caseModalClose');
    if (!modal || !meta || !body) return;

    meta.textContent = `${esc(p.category).toUpperCase()} // ${esc(p.year || '2025')}`;
    const fallbackSvg = getGenerativeSvg(p.category);
    const techHtml = (p.tech || []).map(t => `<span class="case-modal__tech-chip">${esc(t)}</span>`).join('');
    const linksHtml = (p.links || []).map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener" class="btn btn--primary">${esc(l.label)} &nearr;</a>`).join('');
    const privateNoteHtml = p.privateNote ? `<div class="case-modal__note"><strong>Private Repo Note:</strong> ${esc(p.privateNote)}</div>` : '';

    body.innerHTML = `
      <div class="case-modal__hero-media">
        <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div style="display:none;">${fallbackSvg}</div>
      </div>
      <h2 class="case-modal__title" id="caseModalTitle">${esc(p.title)}</h2>
      <p class="case-modal__summary">${esc(p.summary)}</p>
      <div class="case-modal__tech-wrap">${techHtml}</div>
      <div class="case-modal__blocks">
        <div class="case-modal__block">
          <span class="mono">THE PROBLEM</span>
          <p>${esc(p.problem)}</p>
        </div>
        <div class="case-modal__block">
          <span class="mono">WHAT I BUILT</span>
          <p>${esc(p.built)}</p>
        </div>
        <div class="case-modal__block">
          <span class="mono">OUTCOME</span>
          <p>${esc(p.outcome)}</p>
        </div>
      </div>
      ${privateNoteHtml}
      <div class="case-modal__actions">${linksHtml}</div>
    `;

    modal.hidden = false;
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    if (lenis) lenis.stop();

    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    const sheet = document.getElementById('caseModalSheet');
    if (sheet) gsap.fromTo(sheet, { y: '100%' }, { y: '0%', duration: 0.4, ease: 'power3.out' });

    if (closeBtn) closeBtn.focus();
  }

  function closeCaseStudy() {
    const modal = document.getElementById('caseModal');
    if (!modal || modal.hidden) return;

    gsap.to(modal, { opacity: 0, duration: 0.25, onComplete: () => {
      modal.hidden = true;
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
      if (lenis) lenis.start();
    }});
  }

  // 4. SKILLS & MARQUEES
  function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;
    const skills = getSkills();
    grid.innerHTML = skills.map(g => `
      <div class="skill-group" data-reveal>
        <h3 class="skill-group__title">${esc(g.group)}</h3>
        <div class="skill-group__pills">
          ${(g.items || []).map(item => `<span class="skill-pill">${esc(item)}</span>`).join('')}
        </div>
      </div>
    `).join('');

    // Marquees
    const rows = document.querySelectorAll('.marquee-row');
    const marqueesData = getMarquees();
    rows.forEach((row, i) => {
      const inner = row.querySelector('.marquee-row__inner');
      if (!inner) return;
      const dataArr = marqueesData[i] || marqueesData[0] || ['Automation', 'Python', 'FastAPI'];
      const htmlStr = dataArr.map(s => `<span>${esc(s)} &bull; </span>`).join('');
      inner.innerHTML = htmlStr + htmlStr; // Duplicate 2x for seamless loop

      if (!reduced) {
        const direction = parseInt(row.getAttribute('data-direction') || '1', 10);
        const totalW = inner.scrollWidth / 2;
        gsap.set(inner, { x: 0 });
        gsap.to(inner, {
          x: direction * -totalW,
          duration: 22,
          ease: 'none',
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % totalW)
          }
        });
      }
    });

    if (!reduced && ScrollTrigger) {
      const skewQuick = gsap.quickTo('.marquee-row__inner', 'skewX', { duration: 0.2, ease: 'power3' });
      ScrollTrigger.create({
        onUpdate: self => {
          const vel = self.getVelocity();
          const clamped = gsap.utils.clamp(-8, 8, vel * 0.001);
          skewQuick(clamped);
        }
      });
    }
  }

  // 5. EXPERIENCE TIMELINE
  function renderTimeline() {
    const container = document.getElementById('timelineItems');
    if (!container) return;
    const timeline = getTimeline();
    container.innerHTML = timeline.map((t, i) => `
      <div class="timeline-item ${i % 2 === 0 ? 'is-left' : 'is-right'}" data-reveal>
        <div class="timeline-item__card">
          <span class="mono timeline-item__period">${esc(t.period)}</span>
          <h3 class="timeline-item__role">${esc(t.role)}</h3>
          <span class="mono timeline-item__org">${esc(t.org)}</span>
          <ul class="timeline-item__points">
            ${(t.points || []).map(pt => `<li>${esc(pt)}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');

    const lineFill = document.getElementById('timelineLineFill');
    if (lineFill && ScrollTrigger && !reduced) {
      gsap.set(lineFill, { strokeDasharray: 1000, strokeDashoffset: 1000 });
      ScrollTrigger.create({
        trigger: '#experienceTimeline',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        onUpdate: self => {
          const val = 1000 * (1 - self.progress);
          lineFill.style.strokeDashoffset = String(val);
          
          const items = document.querySelectorAll('.timeline-item');
          items.forEach((item, idx) => {
            const triggerPoint = (idx + 0.5) / items.length;
            if (self.progress >= triggerPoint) {
              item.classList.add('is-active');
            } else {
              item.classList.remove('is-active');
            }
          });
        }
      });
    }
  }

  // 6. SERVICES
  function renderServices() {
    const list = document.getElementById('servicesList');
    if (!list) return;
    const services = getServices();
    list.innerHTML = services.map((s, i) => `
      <div class="service-row ${i === 0 ? 'is-open' : ''}">
        <button type="button" class="service-row__header" aria-expanded="${i === 0 ? 'true' : 'false'}">
          <span class="service-row__title">${esc(s.title)}</span>
          <span class="service-row__arrow" aria-hidden="true">&darr;</span>
        </button>
        <div class="service-row__panel" style="display: ${i === 0 ? 'block' : 'none'};">
          <p class="service-row__desc">${esc(s.desc)}</p>
        </div>
      </div>
    `).join('');

    const rows = list.querySelectorAll('.service-row');
    const animate = !reduced && !!window.gsap;

    const closeRow = (r) => {
      const p = r.querySelector('.service-row__panel');
      const b = r.querySelector('.service-row__header');
      r.classList.remove('is-open');
      if (b) b.setAttribute('aria-expanded', 'false');
      if (!p) return;
      if (animate) {
        gsap.killTweensOf(p);
        gsap.to(p, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut',
          onComplete: () => { if (!r.classList.contains('is-open')) p.style.display = 'none'; } });
      } else { p.style.display = 'none'; }
    };

    const openRow = (r) => {
      const p = r.querySelector('.service-row__panel');
      const b = r.querySelector('.service-row__header');
      r.classList.add('is-open');
      if (b) b.setAttribute('aria-expanded', 'true');
      if (!p) return;
      p.style.display = 'block';
      if (animate) {
        gsap.killTweensOf(p);
        gsap.fromTo(p, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out',
          onComplete: () => { p.style.height = 'auto'; if (window.ScrollTrigger) ScrollTrigger.refresh(); } });
      } else { p.style.height = 'auto'; p.style.opacity = 1; }
    };

    rows.forEach(row => {
      const btn = row.querySelector('.service-row__header');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const wasOpen = row.classList.contains('is-open');
        rows.forEach(r => { if (r !== row && r.classList.contains('is-open')) closeRow(r); });
        if (wasOpen) closeRow(row); else openRow(row);
      });
    });
  }

  // 7. CONTACT LINKS
  function renderLinks() {
    const container = document.getElementById('contactLinks');
    if (!container) return;
    const links = getLinks().filter(l => l.type !== 'email');
    container.innerHTML = links.map(l => `
      <a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer" class="contact-pill magnetic" data-cursor="LINK">
        <span>${esc(l.label)}</span>
        <span aria-hidden="true">&nearr;</span>
      </a>
    `).join('');
  }

  // 8. TEXT REVEALS
  function initReveals() {
    if (reduced) return;
    const headings = document.querySelectorAll('section h2');
    headings.forEach(h2 => {
      // keep existing markup (italic accent words); pipeline headlines are handled in main.js
      if (h2.closest('.pipeline-stage') || h2.querySelector('.line-inner')) return;
      h2.innerHTML = '<span class="line-mask"><span class="line-inner">' + h2.innerHTML + '</span></span>';
    });

    if (ScrollTrigger) {
      gsap.utils.toArray('.line-mask .line-inner').forEach(el => {
        gsap.fromTo(el, { y: '110%' }, {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.closest('section') || el,
            start: 'top 85%',
            once: true
          }
        });
      });
    }
  }

  // EVENT LISTENERS & INIT
  document.addEventListener('DOMContentLoaded', () => {
    renderPillars();
    renderProjects();
    renderSkills();
    renderTimeline();
    renderServices();
    renderLinks();
    initReveals();

    // Filter clicks
    const filtersEl = document.getElementById('projectFilters');
    if (filtersEl) {
      filtersEl.addEventListener('click', e => {
        const btn = e.target.closest('.filter-chip');
        if (!btn) return;
        currentFilter = btn.textContent.trim();
        renderProjects();
        if (PF.refresh) PF.refresh();
      });
    }

    // Project card clicks / keyboard
    const trackEl = document.getElementById('projectsTrack');
    if (trackEl) {
      trackEl.addEventListener('click', e => {
        const card = e.target.closest('.project-card');
        if (!card) return;
        const slug = card.getAttribute('data-slug');
        openCaseStudy(slug);
      });
      trackEl.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          const card = e.target.closest('.project-card');
          if (card) {
            e.preventDefault();
            openCaseStudy(card.getAttribute('data-slug'));
          }
        }
      });
    }

    // Modal close events
    const closeBtn = document.getElementById('caseModalClose');
    const backdrop = document.getElementById('caseModalBackdrop');
    if (closeBtn) closeBtn.addEventListener('click', closeCaseStudy);
    if (backdrop) backdrop.addEventListener('click', closeCaseStudy);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeCaseStudy();
    });

    // Resize debounce for projects horizontal scroll
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupProjectsScroll(getProjects().length);
      }, 250);
    });
  });
})();