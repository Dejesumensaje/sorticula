/* Sortícula — interactive behaviour
 * Ported from the Claude Design component (Sorticula.dc.html) to dependency-free
 * vanilla JS. Renders the dynamic sections (oficio, experiencias, reserva) and
 * wires the custom cursor + reservation flow that the original DCLogic handled.
 */
(function () {
  'use strict';

  var BRAND = '#D9461C';

  /* ---------- data ---------- */
  var steps = [
    { n:'01', t:'Materia', d:'Eliges el metal y, si quieres, una piedra. Cada material guarda su propia luz.', img:null },
    { n:'02', t:'Fuego',   d:'El soplete transforma el metal: lo fundes, lo doblas y lo haces tuyo.', img:'img/fuego.jpeg' },
    { n:'03', t:'Manos',   d:'Cortas, limas y pules. La precisión que solo tus manos dan, las guía el experto.', img:'img/manos.jpeg' },
    { n:'04', t:'Tiempo',  d:'Una sesión, una historia. El detalle es lento; por eso queda para siempre.', img:null },
    { n:'05', t:'Forma',   d:'La pieza nace. Sales con tu joya puesta y con el orgullo de haberla hecho tú.', img:null }
  ];

  var experiences = [
    { t:'In Love',          who:'Para parejas · 5 horas', desc:'Bajo la energía de Los Amantes, forjen juntos sus argollas en plata ley 925. Dos manos, un mismo metal, el símbolo de su unión.', price:'$1.500.000', sub:'pareja',  accent:'#D9461C', tag:'Más reservada', img:'img/pareja.jpeg' },
    { t:'Tu Fuego Propio',  who:'Individual · 5 horas',  desc:'Crea desde cero un anillo, unos aretes o un dije. El nuevo lujo: tiempo, pausa y amor propio, guiada por La Sacerdotisa.', price:'$600.000',   sub:'persona', accent:'#15110E', tag:'A tu ritmo',    img:null },
    { t:'El Vínculo',       who:'En grupo · 6 horas',    desc:'Creen con su grupo favorito en cuatro estaciones del oficio: fundir, laminar, armar y pulir. Un recuerdo tangible de la amistad.', price:'desde $350.000', sub:'persona', accent:'#A8381A', tag:'Para grupos', img:null }
  ];

  /* ---------- tiny DOM helper ---------- */
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'style') n.style.cssText = attrs[k];
      else if (k === 'class') n.className = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k.indexOf('on') === 0 && typeof attrs[k] === 'function') n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) {
      if (c == null) return;
      n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return n;
  }

  /* A photo slot: striped placeholder underneath, real image layered on top.
     If the image is absent/broken it simply hides, leaving the placeholder. */
  function photoSlot(src, label, theme) {
    var kids = [
      el('div', { class: 'ph-label' + (theme === 'light' ? ' light' : '') }, ['[ foto · ' + label + ' ]'])
    ];
    if (src) {
      kids.unshift(el('img', {
        src: src, alt: label,
        class: 'photo ' + (theme === 'light' ? 'exp-img' : 'of-img'),
        style: 'transition:transform ' + (theme === 'light' ? '.6s' : '.7s') + ' cubic-bezier(.7,0,.2,1);',
        onerror: function () { this.style.display = 'none'; }
      }, []));
    }
    return kids;
  }

  /* ---------- EL OFICIO ---------- */
  function renderOficio() {
    var wrap = document.getElementById('oficio-cards');
    steps.forEach(function (s) {
      var imgBox = el('div', {
        class: (s.img ? '' : 'ph-dark') + ' of-img-box',
        style: 'position:relative; overflow:hidden; aspect-ratio:3/4; border-radius:7px; margin-bottom:20px; background:#241d18;' + (s.img ? '' : '')
      }, photoSlot(s.img, s.t.toLowerCase(), 'dark'));
      // when no image, the box itself carries the stripe + transform on hover
      if (!s.img) imgBox.classList.add('of-img', 'ph-dark');

      wrap.appendChild(el('div', { class: 'oficio rv', style: 'display:flex; flex-direction:column;' }, [
        imgBox,
        el('div', { style: 'display:flex; justify-content:space-between; align-items:baseline; border-top:1px solid rgba(244,244,242,.2); padding-top:14px; margin-bottom:12px;' }, [
          el('span', { class: 'of-n', style: "font-family:'Space Mono',monospace; font-size:12px; color:#F4F4F2; transition:color .3s;" }, [s.n]),
          el('span', { style: "font-family:'Space Mono',monospace; font-size:9.5px; letter-spacing:.16em; text-transform:uppercase; color:#6f665b;" }, ['Etapa'])
        ]),
        el('h3', { style: "font-family:'Instrument Serif',serif; font-weight:400; font-size:27px; margin:0 0 9px; line-height:1;" }, [s.t]),
        el('p', { style: 'margin:0; color:#a99f93; font-size:13.5px; line-height:1.5;' }, [s.d])
      ]));
    });
  }

  /* ---------- EXPERIENCIAS ---------- */
  function renderExperiences() {
    var wrap = document.getElementById('exp-cards');
    experiences.forEach(function (e, i) {
      var imgBox = el('div', {
        class: e.img ? '' : 'ph-light exp-img',
        style: 'position:relative; overflow:hidden; aspect-ratio:4/5;'
      }, photoSlot(e.img, e.t, 'light').concat([
        el('span', { style: "position:absolute; top:14px; left:14px; font-family:'Space Mono',monospace; font-size:10px; letter-spacing:.1em; text-transform:uppercase; background:" + e.accent + "; color:#F7F5F1; padding:6px 11px; border-radius:100px;" }, [e.tag])
      ]));

      wrap.appendChild(el('a', {
        href: '#reserva', class: 'exp rv',
        style: 'text-decoration:none; color:#15110E; display:flex; flex-direction:column; background:#fff; border-radius:10px; overflow:hidden; border:1px solid rgba(21,17,14,.1);',
        onclick: function () { selectExperience(i); }
      }, [
        imgBox,
        el('div', { style: 'padding:24px; flex:1; display:flex; flex-direction:column;' }, [
          el('div', { style: "font-family:'Space Mono',monospace; font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; color:#9a9388; margin-bottom:8px;" }, [e.who]),
          el('h3', { style: "font-family:'Instrument Serif',serif; font-weight:400; font-size:34px; margin:0 0 12px; line-height:1;" }, [e.t]),
          el('p', { style: 'margin:0 0 22px; color:#3a342d; font-size:15px; line-height:1.5; flex:1;' }, [e.desc]),
          el('div', { style: 'display:flex; align-items:center; justify-content:space-between;' }, [
            el('div', { style: 'display:flex; align-items:baseline; gap:10px;' }, [
              el('span', { style: 'font-weight:600; font-size:19px;' }, [e.price])
            ]),
            el('span', { class: 'exp-go', style: 'width:42px; height:42px; border-radius:50%; border:1.5px solid #15110E; display:flex; align-items:center; justify-content:center; font-size:18px; transition:transform .35s cubic-bezier(.7,0,.2,1), background .3s, color .3s, border-color .3s;' }, ['↗'])
          ])
        ])
      ]));
    });
  }

  /* ---------- RESERVA ---------- */
  var state = { selected: 0, sent: false };

  function selectExperience(i) {
    state.selected = i;
    state.sent = false;
    renderReserva();
  }

  function renderReserva() {
    var host = document.getElementById('reserva-ui');
    host.innerHTML = '';
    var sel = state.selected;

    if (state.sent) {
      host.appendChild(el('div', { style: 'background:rgba(244,244,242,.05); border:1px solid rgba(244,244,242,.2); border-radius:14px; padding:58px 40px; text-align:center;' }, [
        el('div', { style: 'font-size:38px; margin-bottom:16px; color:' + BRAND + ';' }, ['✦']),
        el('h3', { style: "font-family:'Instrument Serif',serif; font-weight:400; font-size:40px; margin:0 0 12px;" }, ['¡Tu lugar está apartado!']),
        el('p', { style: 'color:#a99f93; margin:0 0 26px; font-size:16px;' }, ['Te escribiremos por WhatsApp para confirmar fecha y hora de tu experiencia ' + experiences[sel].t + '.']),
        el('button', { class: 'btn', style: btnStyle(), onclick: function () { state.sent = false; renderReserva(); } }, ['Reservar otra'])
      ]));
      return;
    }

    // tabs
    var tabs = el('div', { style: 'display:flex; gap:10px; flex-wrap:wrap; margin-bottom:32px;' },
      experiences.map(function (e, i) {
        var active = i === sel;
        return el('button', {
          class: 'seltab', onclick: function () { state.selected = i; renderReserva(); },
          style: "cursor:pointer; font-family:'Space Grotesk',sans-serif; font-size:14px; letter-spacing:.04em; padding:13px 22px; border-radius:100px; border:1.5px solid " +
            (active ? BRAND : 'rgba(244,244,242,.32)') + '; background:' + (active ? BRAND : 'transparent') +
            '; color:' + (active ? '#F7F5F1' : '#F4F4F2') + '; font-weight:' + (active ? 600 : 400) + ';'
        }, [e.t]);
      })
    );

    function input(ph, type) {
      return el('input', {
        type: type || 'text', placeholder: ph,
        style: "width:100%; box-sizing:border-box; background:transparent; border:none; border-bottom:1.5px solid rgba(244,244,242,.32); color:#F4F4F2; font-family:'Space Grotesk',sans-serif; font-size:17px; padding:14px 2px; outline:none;"
      }, []);
    }

    var form = el('div', null, [
      tabs,
      el('div', { style: 'display:grid; grid-template-columns:1fr 1fr; gap:26px 36px; margin-bottom:36px;', class: 'reserva-grid' }, [
        input('Tu nombre'), input('Tu correo', 'email'),
        input('WhatsApp', 'tel'), input('¿Cuántas personas?')
      ]),
      el('div', { style: 'display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px; border-top:1px solid rgba(244,244,242,.18); padding-top:28px;' }, [
        el('div', null, [
          el('div', { style: "font-family:'Space Mono',monospace; font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:" + BRAND + "; margin-bottom:6px;" }, ['Experiencia ' + experiences[sel].t]),
          el('div', { style: 'font-weight:600; font-size:22px;' }, [experiences[sel].price + ' / ' + experiences[sel].sub])
        ]),
        el('button', { class: 'btn', style: btnStyle(true), onclick: function () { state.sent = true; renderReserva(); } }, ['Confirmar reserva'])
      ])
    ]);
    host.appendChild(form);
  }

  function btnStyle(big) {
    return 'cursor:pointer; font-family:\'Space Grotesk\',sans-serif; font-size:' + (big ? '14px' : '13px') +
      '; letter-spacing:.1em; text-transform:uppercase; background:' + BRAND + '; color:#F7F5F1; border:none; padding:' +
      (big ? '17px 38px' : '14px 28px') + '; border-radius:100px;';
  }

  /* ---------- custom cursor (pointer:fine only) ---------- */
  function initCursor() {
    if (!(window.matchMedia && window.matchMedia('(pointer:fine)').matches)) return;
    var dot = document.createElement('div');
    dot.style.cssText = 'position:fixed; left:0; top:0; width:30px; height:30px; border:1.5px solid ' + BRAND + '; border-radius:50%; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); transition:width .25s,height .25s,background .25s; mix-blend-mode:difference;';
    var core = document.createElement('div');
    core.style.cssText = 'position:fixed; left:0; top:0; width:6px; height:6px; border-radius:50%; background:' + BRAND + '; pointer-events:none; z-index:9999; transform:translate(-50%,-50%);';
    document.body.appendChild(dot); document.body.appendChild(core);

    var x = innerWidth / 2, y = innerHeight / 2, dx = x, dy = y;
    addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; core.style.left = x + 'px'; core.style.top = y + 'px'; });
    (function raf() { dx += (x - dx) * 0.18; dy += (y - dy) * 0.18; dot.style.left = dx + 'px'; dot.style.top = dy + 'px'; requestAnimationFrame(raf); })();
    addEventListener('mouseover', function (e) {
      var t = e.target;
      if (t.closest && t.closest('a,button,.exp,.oficio,.seltab')) { dot.style.width = '52px'; dot.style.height = '52px'; dot.style.background = 'rgba(217,70,28,.18)'; }
      else { dot.style.width = '30px'; dot.style.height = '30px'; dot.style.background = 'transparent'; }
    });
  }

  /* ---------- scroll-reveal fallback for browsers without animation-timeline:view() ---------- */
  function initReveals() {
    var supportsVTL = CSS && CSS.supports && CSS.supports('animation-timeline: view()');
    if (supportsVTL) return;
    document.documentElement.classList.add('no-vtl');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('seen'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.rv, .rvc, .rvs').forEach(function (n) { io.observe(n); });
  }

  /* ---------- boot ---------- */
  function init() {
    renderOficio();
    renderExperiences();
    renderReserva();
    initCursor();
    initReveals();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
