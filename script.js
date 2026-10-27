'use strict';

// A build-free portfolio. Hash routes work on GitHub Pages and in subdirectories.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const pages = [...document.querySelectorAll('.page')];
const navLinks = [...document.querySelectorAll('[data-nav]')];
let currentRoute = '';

function route() {
  const hash = window.location.hash.slice(1) || 'home';
  // Leave the skip link as an ordinary in-page anchor.
  if (hash === 'main-content') return;
  const name = hash === 'education' ? 'home' : hash.split('/')[0];
  const validName = ['home', 'experience', 'projects', 'contact'].includes(name) ? name : 'home';
  const isEducation = hash === 'education';
  const samePage = currentRoute === validName;
  pages.forEach(page => { page.hidden = page.id !== `page-${validName}`; });
  navLinks.forEach(link => {
    if (link.dataset.nav === validName) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (validName === 'projects') {
    const project = hash.split('/')[1] === 'bulldog' ? 'bulldog' : 'car';
    document.querySelector('#project-car').hidden = project !== 'car';
    document.querySelector('#project-bulldog').hidden = project !== 'bulldog';
    document.querySelectorAll('[data-project-link]').forEach(link => {
      if (link.dataset.projectLink === project) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    closePopups(false);
  }
  const page = document.querySelector(`#page-${validName}`);
  if (!samePage) {
    page.classList.remove('route-enter');
    requestAnimationFrame(() => page.classList.add('route-enter'));
  }
  document.title = validName === 'home' ? 'Ayan Safe · My little corner of the internet' : `${validName[0].toUpperCase() + validName.slice(1)} · Ayan Safe`;
  currentRoute = validName;
  if (isEducation) {
    requestAnimationFrame(() => document.querySelector('#education').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' }));
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

const carSlides = [
  {
    src: 'assets/car-front.png', alt: 'Front-side view of my autonomous RC car with camera, LiDAR, Raspberry Pi, and steering hardware', file: 'hardware / front-view', caption: 'The hardware. Tap a marker to look a little closer.',
    hotspots: [
      { x: 34, y: 51, label: 'Front camera', title: 'A view of the road ahead.', text: 'The forward-facing camera supplies live video for image processing. Computer vision looks for obstacles and visual cues in the vehicle’s path.', category: '01 / CAMERA VISION', labelX: 25, labelY: 56 },
      { x: 54, y: 22, label: 'LiDAR', title: 'Depth beyond the pixels.', text: 'The LiDAR measures how far surrounding objects are from the car. Its distance readings complement the cameras, adding spatial context around the sides and farther ahead.', category: '02 / DISTANCE SENSING', labelX: 67, labelY: 19 },
      { x: 66, y: 36, label: 'Raspberry Pi', title: 'Where the inputs meet.', text: 'The Raspberry Pi runs the perception software and neural-network processing. Camera information and LiDAR measurements feed a shared picture of the surroundings to help select a maneuver.', category: '03 / ON-BOARD COMPUTING', labelX: 80, labelY: 39 },
      { x: 65, y: 50, label: 'Steering + control', title: 'Turning a decision into motion.', text: 'The steering servo changes wheel angle while motor control changes speed. Together, they turn the software’s chosen response into physical movement.', category: '04 / ACTUATION', labelX: 77, labelY: 56 }
    ]
  },
  {
    src: 'assets/car-rear.jpg', alt: 'Rear-side view of the car showing the rear camera, LiDAR sensor, and Raspberry Pi', file: 'hardware / reverse-angle', caption: 'A different angle. The rear camera fills in the view behind the car.',
    hotspots: [
      { x: 34, y: 19, label: 'Front camera', title: 'Keeping the forward view.', text: 'The forward camera captures the scene in front of the vehicle for the computer-vision pipeline.', category: '01 / CAMERA VISION', labelX: 23, labelY: 12 },
      { x: 65, y: 35, label: 'LiDAR', title: 'Measuring the surroundings.', text: 'Distance sensing helps place nearby objects in space, complementing the visual context from the camera feeds.', category: '02 / DISTANCE SENSING', labelX: 79, labelY: 34 },
      { x: 55, y: 48, label: 'Raspberry Pi', title: 'The on-board computer.', text: 'The Pi brings sensing and control software together on the vehicle, processing inputs before sending steering and motor commands.', category: '03 / ON-BOARD COMPUTING', labelX: 40, labelY: 52 },
      { x: 76, y: 54, label: 'Rear camera', title: 'A second point of view.', text: 'The rear-facing camera adds visibility behind the vehicle. Together, the forward and rear feeds give the software more context than a single camera.', category: '04 / REAR VISIBILITY', labelX: 82, labelY: 61 }
    ]
  },
  {
    src: 'assets/car-dashboard.jpg', alt: 'Car software dashboard with front and rear camera feeds, a top-down distance map, and manual and autopilot controls', file: 'software / perception-dashboard', caption: 'Inside the dashboard: camera feeds, a distance map, and vehicle controls.',
    hotspots: [
      { x: 24, y: 29, label: 'Live cameras', title: 'What the cameras see.', text: 'The front and rear video panels make it possible to inspect the camera inputs while testing the perception system.', category: '01 / VISUAL INPUT', labelX: 24, labelY: 36 },
      { x: 69, y: 32, label: 'Distance map', title: 'A top-down view of space.', text: 'The top-down visualization plots distance readings around the car, helping make nearby objects and gaps easier to understand during testing.', category: '02 / SPATIAL VIEW', labelX: 76, labelY: 20 },
      { x: 72, y: 67, label: 'Control panel', title: 'Test, observe, adjust.', text: 'The interface exposes autopilot and manual controls, so the software’s response can be compared with the live sensor views.', category: '03 / CONTROL INTERFACE', labelX: 77, labelY: 75 }
    ]
  },
  {
    src: 'assets/car-terminal.jpg', alt: 'The car perception software beside a terminal logging repeated emergency stops at short obstacle distances', file: 'software / live-testing', caption: 'Testing in real time. The terminal shows obstacle-distance and emergency-stop messages.',
    hotspots: [
      { x: 43, y: 35, label: 'Perception view', title: 'Making the data visible.', text: 'Camera feeds and a top-down sensor map sit together in the software, helping me see how the perception system interprets the room.', category: '01 / SOFTWARE IN ACTION', labelX: 33, labelY: 42 },
      { x: 82, y: 40, label: 'Live terminal', title: 'The feedback loop.', text: 'The terminal records behavior during live testing. In this photo, repeated emergency-stop messages report objects at short distances — useful feedback for tuning sensing and control.', category: '02 / LIVE DEBUGGING', labelX: 81, labelY: 50 }
    ]
  }
];

const bulldogHotspots = [
  { x: 59, y: 60, label: 'Find your next step', title: 'Start with a question.', text: 'The central search is a starting point for finding programs and opportunities. It puts discovery at the heart of the student hub.', category: '01 / OPPORTUNITY SEARCH', labelX: 59, labelY: 67 },
  { x: 8, y: 29, label: 'College path', title: 'Explore the college path.', text: 'The college section brings together internships, scholarships, AP classes, college programs, and support for finding academic opportunities.', category: '02 / COLLEGE PATH', labelX: 18, labelY: 31 },
  { x: 8, y: 56, label: 'Career path', title: 'There is more than one route.', text: 'Career exploration, job-search skills, and careers and training resources help students think about work alongside their academic plans.', category: '03 / CAREER PATH', labelX: 18, labelY: 58 },
  { x: 8, y: 79, label: 'School resources', title: 'Keep the practical things close.', text: 'Guidance and academic-support links sit in the same hub. An “Anything Missing?” option gives students a way to flag gaps in the resources.', category: '04 / SCHOOL RESOURCES', labelX: 21, labelY: 84 }
];

let activeSlide = 0;
let slideTimer;
let lastHotspot = null;

function makeHotspots(layer, items, popup, stage) {
  layer.replaceChildren();
  items.forEach((item, i) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'hotspot';
    button.textContent = String(i + 1).padStart(2, '0');
    button.style.left = `${item.x}%`; button.style.top = `${item.y}%`;
    button.setAttribute('aria-label', `Explore ${item.label}`);
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', popup.id);
    button.addEventListener('click', () => showHotspot(button, item, popup, stage));
    layer.append(button);
    const label = document.createElement('span'); label.className = 'hotspot-label';
    label.textContent = item.label;
    label.style.left = `${item.labelX}%`; label.style.top = `${item.labelY}%`;
    label.setAttribute('aria-hidden', 'true'); layer.append(label);
  });
}

function closePopups(restoreFocus = false) {
  document.querySelectorAll('.hotspot-popup').forEach(popup => { popup.hidden = true; });
  document.querySelectorAll('.hotspot[aria-expanded=true]').forEach(button => button.setAttribute('aria-expanded', 'false'));
  document.querySelectorAll('[data-tour]').forEach(button => button.setAttribute('aria-pressed', 'false'));
  if (restoreFocus && lastHotspot?.isConnected) lastHotspot.focus({ preventScroll: true });
}

function showHotspot(button, item, popup, stage) {
  const wasOpen = button.getAttribute('aria-expanded') === 'true';
  closePopups(false);
  if (wasOpen) return;
  lastHotspot = button;
  button.setAttribute('aria-expanded', 'true');
  popup.replaceChildren();
  const close = document.createElement('button'); close.type = 'button'; close.className = 'popup-close';
  close.setAttribute('aria-label', 'Close component details'); close.textContent = '×';
  close.addEventListener('click', () => closePopups(true));
  const category = document.createElement('span'); category.className = 'small-label'; category.textContent = item.category;
  const heading = document.createElement('h4'); heading.textContent = item.title;
  const text = document.createElement('p'); text.textContent = item.text;
  popup.append(close, category, heading, text);
  popup.hidden = false;
  popup.classList.remove('popup-left');
  positionPopup(item, popup, stage);
}

function positionPopup(item, popup, stage) {
  const width = stage.clientWidth; const height = stage.clientHeight;
  const boxWidth = popup.offsetWidth; const boxHeight = popup.offsetHeight;
  const x = width * item.x / 100; const y = height * item.y / 100;
  let left; let top;
  if (width < 450) {
    left = Math.max(10, Math.min(width - boxWidth - 10, (width - boxWidth) / 2));
    top = Math.max(8, Math.min(height - boxHeight - 8, y + 22));
  } else {
    const rightFits = x + 27 + boxWidth < width - 10;
    left = rightFits ? x + 27 : x - boxWidth - 27;
    if (!rightFits) popup.classList.add('popup-left');
    left = Math.max(12, Math.min(width - boxWidth - 12, left));
    top = Math.max(12, Math.min(height - boxHeight - 12, y - 24));
  }
  popup.style.left = `${left}px`; popup.style.top = `${top}px`;
}

function setSlide(index, animate = true) {
  activeSlide = (index + carSlides.length) % carSlides.length;
  const slide = carSlides[activeSlide]; const stage = document.querySelector('#car-stage');
  const img = document.querySelector('#car-image');
  closePopups(false); clearTimeout(slideTimer);
  const update = () => {
    img.src = slide.src; img.alt = slide.alt;
    document.querySelector('#gallery-filename').textContent = slide.file;
    document.querySelector('#gallery-counter').textContent = `${String(activeSlide + 1).padStart(2, '0')} / 04`;
    document.querySelector('#gallery-caption').textContent = slide.caption;
    // Keep markers aligned to the photo when portrait images have side margins.
    const imageRatios = [2048 / 1535, 1179 / 1152, 995 / 789, 982 / 777];
    const stageRatio = 4 / 3;
    const scaleX = Math.min(1, imageRatios[activeSlide] / stageRatio);
    const scaleY = Math.min(1, stageRatio / imageRatios[activeSlide]);
    const points = slide.hotspots.map(point => ({ ...point,
      x: 50 + (point.x - 50) * scaleX, y: 50 + (point.y - 50) * scaleY,
      labelX: 50 + (point.labelX - 50) * scaleX, labelY: 50 + (point.labelY - 50) * scaleY
    }));
    makeHotspots(document.querySelector('#car-hotspots'), points, document.querySelector('#car-popup'), stage);
    stage.classList.remove('is-switching');
  };
  document.querySelectorAll('[data-slide]').forEach(button => {
    const active = Number(button.dataset.slide) === activeSlide;
    button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active));
  });
  if (animate && !reducedMotion.matches) { stage.classList.add('is-switching'); slideTimer = setTimeout(update, 160); }
  else update();
}

document.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => setSlide(Number(button.dataset.slide))));
document.querySelector('#gallery-prev').addEventListener('click', () => setSlide(activeSlide - 1));
document.querySelector('#gallery-next').addEventListener('click', () => setSlide(activeSlide + 1));
setSlide(0, false);
makeHotspots(document.querySelector('#bulldog-hotspots'), bulldogHotspots, document.querySelector('#bulldog-popup'), document.querySelector('#bulldog-stage'));
document.querySelectorAll('[data-tour]').forEach(button => button.addEventListener('click', () => {
  const index = Number(button.dataset.tour);
  const hotspot = document.querySelector('#bulldog-hotspots').querySelectorAll('button')[index];
  const wasOpen = hotspot.getAttribute('aria-expanded') === 'true';
  showHotspot(hotspot, bulldogHotspots[index], document.querySelector('#bulldog-popup'), document.querySelector('#bulldog-stage'));
  button.setAttribute('aria-pressed', String(!wasOpen));
}));

document.addEventListener('click', event => {
  if (!event.target.closest('.hotspot,.hotspot-popup,[data-tour]')) closePopups(false);
  const link = event.target.closest('a[href^="#"]');
  if (link && link.hash === window.location.hash && link.hash !== '#main-content') {
    event.preventDefault(); route();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closePopups(true);
  if (currentRoute === 'projects' && !document.querySelector('#project-car').hidden && !document.querySelector('#image-dialog').open) {
    if (event.key === 'ArrowRight' && event.target.closest('.project-viewer,.gallery-thumbs')) { event.preventDefault(); setSlide(activeSlide + 1); }
    if (event.key === 'ArrowLeft' && event.target.closest('.project-viewer,.gallery-thumbs')) { event.preventDefault(); setSlide(activeSlide - 1); }
  }
});
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => closePopups(false), 150); });

const dialog = document.querySelector('#image-dialog');
document.querySelector('#expand-car').addEventListener('click', () => {
  const slide = carSlides[activeSlide];
  document.querySelector('#dialog-image').src = slide.src;
  document.querySelector('#dialog-image').alt = slide.alt;
  document.querySelector('#dialog-caption').textContent = slide.caption;
  dialog.showModal();
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

let toastTimer;
function showToast(message) {
  const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('is-visible');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}
document.querySelector('#copy-email').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('ayansafe0627@gmail.com');
    document.querySelector('#copy-email-label').textContent = 'Copied. Say hello!';
    showToast('Email address copied. See you in the inbox.');
    setTimeout(() => { document.querySelector('#copy-email-label').textContent = 'Copy email address'; }, 3500);
  } catch {
    showToast('Email: ayansafe0627@gmail.com');
    document.querySelector('.email-link').focus();
  }
});

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('js-observe');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.1 });
  document.querySelectorAll('.section-reveal').forEach(section => observer.observe(section));
}
document.querySelector('#copyright-year').textContent = String(new Date().getFullYear());
window.addEventListener('hashchange', route);
route();
