/**
 * Lógica de Interfaz, Estado, Escena 3D (Three.js) y Renderizado de los 8 Pasos
 * Estructurador de Imagen — Grupo Entel
 */

// --- 8 Numbered Steps (Personaje separated from Emoción y Postura!) ---
const STEPS = [
  { id: 1, title: 'Tamaño', activeBg: 'bg-indigo-600', badgeText: 'text-indigo-700', hudBg: 'bg-indigo-50 text-indigo-700' },
  { id: 2, title: 'Personaje', activeBg: 'bg-indigo-600', badgeText: 'text-indigo-700', hudBg: 'bg-indigo-50 text-indigo-700' },
  { id: 3, title: 'Emoción y Postura', activeBg: 'bg-cyan-600', badgeText: 'text-cyan-700', hudBg: 'bg-cyan-50 text-cyan-800' },
  { id: 4, title: 'Escenario', activeBg: 'bg-emerald-600', badgeText: 'text-emerald-700', hudBg: 'bg-emerald-50 text-emerald-700' },
  { id: 5, title: 'Cámara', activeBg: 'bg-amber-600', badgeText: 'text-amber-700', hudBg: 'bg-amber-50 text-amber-800' },
  { id: 6, title: 'Iluminación', activeBg: 'bg-orange-600', badgeText: 'text-orange-700', hudBg: 'bg-orange-50 text-orange-700' },
  { id: 7, title: 'Estilos', activeBg: 'bg-violet-600', badgeText: 'text-violet-700', hudBg: 'bg-violet-50 text-violet-700' },
  { id: 8, title: 'Texto', activeBg: 'bg-rose-600', badgeText: 'text-rose-700', hudBg: 'bg-rose-50 text-rose-700' }
];


// --- UNIFIED COLOR SWATCH BAR (Bolitas + Hover Pix/Hex Tooltip + Circle "+" + Cuentagotas) ---
function renderColorSwatchBar({ items, selectedName, customHex, customText, scope, nameKey, hexKey, textKey, micAttr, allowNone = false, noneLabel = 'Sin especificar', placeholder = 'Nombre o descripción del color...' }) {
  const safeHex = (customHex && /^#[0-9a-fA-F]{6}$/i.test(customHex)) ? customHex.toUpperCase() : '#4F46E5';
  const inputId = `cp_${scope}_${hexKey}`;
  const isCustom = selectedName === 'Otro';

  // Determine current active display badge (name + hex)
  let activeHex = null;
  let activeLabel = selectedName || noneLabel;
  if (isCustom) {
    activeHex = safeHex;
    activeLabel = (customText && customText.trim()) ? customText.trim() : hexToSpanishName(safeHex);
  } else if (selectedName && selectedName !== noneLabel) {
    const found = items.find(it => it.name === selectedName);
    if (found) activeHex = found.hex;
  }

  return `
    <div class="space-y-2 mt-1.5" data-swatch-group="${scope}_${nameKey}">
      <div class="flex flex-wrap items-center gap-2 pt-1">
        ${allowNone ? `
          <div class="swatch-wrap relative">
            <button type="button" data-swatch-scope="${scope}" data-swatch-name-key="${nameKey}" data-swatch-val="${esc(noneLabel)}" data-swatch-hex-key="${hexKey}" data-swatch-hex=""
              class="swatch-pick swatch-dot flex items-center justify-center bg-white ${(!selectedName || selectedName === noneLabel) ? 'is-active' : ''}" aria-label="${esc(noneLabel)}">
              <i data-lucide="slash" class="w-3.5 h-3.5 text-slate-400"></i>
            </button>
            <div class="swatch-tooltip bg-slate-900 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1.5">
              <span>${esc(noneLabel)}</span>
            </div>
          </div>
        ` : ''}

        ${items.map(it => {
          const isAct = selectedName === it.name;
          const hexUp = numToHex(it.hex);
          return `
            <div class="swatch-wrap relative">
              <button type="button" data-swatch-scope="${scope}" data-swatch-name-key="${nameKey}" data-swatch-val="${esc(it.name)}" data-swatch-hex-key="${hexKey}" data-swatch-hex="${hexUp}"
                class="swatch-pick swatch-dot ${isAct ? 'is-active' : ''}" style="background:${hexUp};" aria-label="${esc(it.name)} ${hexUp}">
              </button>
              <div class="swatch-tooltip bg-slate-900 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xl flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full border border-white/60 shrink-0" style="background:${hexUp};"></span>
                <span>${esc(it.name)}</span>
                <span class="font-mono text-cyan-300">${hexUp}</span>
              </div>
            </div>
          `;
        }).join('')}

        <!-- Direct Circle "+" Custom Color Trigger -->
        <div class="swatch-wrap relative">
          <button type="button" data-swatch-plus="1" data-target-input="${inputId}" data-swatch-scope="${scope}" data-swatch-name-key="${nameKey}" data-swatch-hex-key="${hexKey}"
            class="swatch-plus-btn swatch-dot flex items-center justify-center border-2 border-dashed ${isCustom ? 'is-active text-white' : 'border-indigo-400 bg-white text-indigo-600 hover:bg-indigo-50'}"
            style="${isCustom ? `background:${safeHex}; border-style:solid;` : ''}" aria-label="Elegir color personalizado">
            <i data-lucide="plus" class="w-4 h-4 ${isCustom ? 'drop-shadow' : ''}"></i>
          </button>
          <div class="swatch-tooltip bg-slate-900 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xl flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full border border-white/60 shrink-0" style="background:${safeHex};"></span>
            <span>Más colores</span>
            <span class="font-mono text-amber-300">${safeHex}</span>
          </div>
        </div>

        <!-- Direct Inline Cuentagotas (EyeDropper) Circle -->
        <div class="swatch-wrap relative">
          <button type="button" data-eyedrop-target="${inputId}" data-color-scope="${scope}" data-color-name-key="${nameKey}" data-color-hex="${hexKey}" data-color-text="${textKey}"
            class="eyedrop-btn swatch-dot flex items-center justify-center bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-500 hover:text-white" aria-label="Usar cuentagotas">
            <i data-lucide="pipette" class="w-3.5 h-3.5"></i>
          </button>
          <div class="swatch-tooltip bg-slate-900 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xl">
            <span>Cuentagotas (capturar píxel)</span>
          </div>
        </div>

        <!-- Hidden/Accessible native color input when not expanded, or visible in custom bar -->
        ${!isCustom ? `<input id="${inputId}" type="color" value="${safeHex}" data-color-scope="${scope}" data-color-name-key="${nameKey}" data-color-hex="${hexKey}" data-color-text="${textKey}" class="sr-only" />` : ''}
      </div>

      <!-- Active Color Pix Pill -->
      <div class="flex items-center justify-between gap-2 text-[11px]">
        <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-stone-200 text-slate-700 font-semibold">
          ${activeHex ? `<span class="w-3 h-3 rounded-full border border-slate-300 shrink-0" style="background:${activeHex};"></span>` : `<i data-lucide="slash" class="w-3 h-3 text-slate-400"></i>`}
          <span>${esc(activeLabel)}</span>
          ${activeHex ? `<span class="font-mono text-[10px] text-indigo-600 font-bold">${activeHex}</span>` : ''}
        </div>
        <span class="text-[10px] text-slate-400 hidden sm:inline">Pasa el cursor sobre las bolitas para ver el código</span>
      </div>

      ${isCustom ? `
        <div class="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-indigo-200 shadow-xs">
          <label class="color-circle-wrap" title="Abrir paleta libre de color">
            <input id="${inputId}" type="color" value="${safeHex}" data-color-scope="${scope}" data-color-name-key="${nameKey}" data-color-hex="${hexKey}" data-color-text="${textKey}" class="color-circle-input" />
          </label>
          <button type="button" data-eyedrop-target="${inputId}" data-color-scope="${scope}" data-color-name-key="${nameKey}" data-color-hex="${hexKey}" data-color-text="${textKey}" title="Capturar color con cuentagotas" class="eyedrop-btn p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-500 hover:text-white transition active:scale-95 shrink-0">
            <i data-lucide="pipette" class="w-4 h-4"></i>
          </button>
          <input type="text" data-${scope === 'char' ? 'cfield' : 'field'}="${textKey}" value="${esc(customText)}" placeholder="${esc(placeholder)}" class="flex-1 min-w-0 px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs" />
          ${micAttr ? micBtn(micAttr) : ''}
        </div>
      ` : ''}
    </div>
  `;
}


function makeCharacter(overrides = {}) {
  return Object.assign({
    id: Date.now() + Math.floor(Math.random() * 1000),
    cat: 'Persona', // Persona | Animal | Objeto | Personalizado
    sub: 'Niño',
    subOtro: '',
    genero: 'Mujer',
    edad: '',
    datoExtra: '',
    modoForma: 'Normal',
    customName: '',
    animalSilueta: 'Cuadrúpedo',
    // Rasgos Persona
    chkCabello: false, cabelloTipo: 'Corto', cabelloOtro: '', cabelloColor: 'Negro', cabelloColorOtro: '', cabelloColorHex: '#1E293B',
    chkBarba: false, barbaTipo: 'Corta cuidada', barbaOtro: '', barbaColor: 'Igual al cabello', barbaColorOtro: '', barbaColorHex: '#1E293B',
    chkComplexion: false, complexionTipo: 'Promedio', complexionOtro: '',
    chkPiel: false, pielTono: 'Trigueño / Medio', pielTonoOtro: '', pielTonoHex: '#D9A066',
    chkOjos: false, ojosColor: 'Oscuros', ojosColorOtro: '', ojosColorHex: '#0F172A',
    otrosRasgos: '',
    // Rasgos opcionales Animal / Objeto / Personalizado (todos desactivados por defecto!)
    chkTextura: false, texturaTipo: 'Ninguno', texturaOtro: '',
    chkColorPrincipal: false, principalColor: 'Dorado / Miel', principalColorOtro: '', principalColorHex: '#D99B58',
    chkOrejasAnimal: false, orejasAnimalTipo: 'Ninguno',
    chkColaAnimal: false, colaAnimalTipo: 'Ninguno',
    chkAlasAnimal: false, alasAnimalTipo: 'Ninguno',
    chkCollarAnimal: false, collarAnimalTipo: 'Ninguno',
    // Ropa por zonas + color + estampado/material/extras + detalles + Objeto sostenido
    ropaZona: 'Cuerpo',
    ropaItem: 'Polo casual',
    ropaOtro: '',
    ropaColor: 'Sin especificar',
    ropaColorOtro: '',
    ropaColorHex: '#4F46E5',
    ropaEstampado: 'Ninguno',
    ropaMaterial: 'Ninguno',
    ropaExtras: [],
    ropaDetalle: '',
    ropaList: [],
    chkObjetoMano: false,
    objetoManoItem: 'Un libro abierto',
    objetoManoOtro: '',
    // Emociones, Acción, Posición y Tamaño (ahora Paso 3 dedicado!)
    emocion: 'Sonriente',
    emocionOtro: '',
    accionTipo: 'De pie mirando al frente',
    accionOtro: '',
    activarPosicion: false,
    activarTamano: false,
    x: 50,
    y: 55,
    escala: 100
  }, overrides);
}

const DEFAULT_STATE = {
  step: 1,
  aspecto: '16:9',
  charTab: 'tipo',
  rasgosTab: 'rostro',
  step3Tab: 'emocion',
  lightStageMode: 'photo',
  activeCharIdx: 0,
  characters: [makeCharacter()],
  escenarioModo: 'Fondo sólido',
  fondoSolido: 'Fondo blanco puro',
  fondoSolidoOtro: '',
  fondoSolidoHex: '#DBEAFE',
  ubicacion: '',
  elementos: '',
  chkPlano: true,
  plano: 'Plano medio (cintura hacia arriba)',
  chkAngulo: true,
  angulo: 'Frontal a nivel de ojos',
  chkEnfoque: true,
  enfoque: 'Fondo desenfocado suave (bokeh 50mm f/1.8)',
  chkLuzTipo: true,
  luzTipo: 'Luz natural del día',
  luzTipos: ['Luz natural del día'],
  chkLuzTemp: true,
  luzTemp: 'Neutra equilibrada',
  chkAtmosfera: true,
  atmosfera: 'Despejado y luminoso',
  atmosferas: ['Despejado y luminoso'],
  accionObjMode: 'sin',
  accionFilter: 'Todas',
  estiloId: 0,
  estiloFilter: 'Todos',
  estiloSearch: '',
  incluirTexto: false,
  texts: [],
  newText: '',
  newTextFont: 'Letras grandes en negrita',
  newTextContainer: 'Sin globo (texto libre)',
  newTextBubbleTail: 'Automática hacia el personaje',
  newTextActivarPos: true,
  newTextX: 50,
  newTextY: 18,
  activeTextIdx: -1
};

const state = JSON.parse(JSON.stringify(DEFAULT_STATE));
let styleDropdownOpen = false;
let openLightDropdown = null;
try {
  const sv = JSON.parse(localStorage.getItem('entel_img_v8') || localStorage.getItem('entel_img_v7') || 'null');
  if (sv && Array.isArray(sv.characters) && sv.characters.length) {
    Object.assign(state, sv);
    if (state.charTab === 'emocion') state.charTab = 'tipo';
    state.step = Math.max(1, Math.min(8, Number(state.step) || 1));
    if (!Array.isArray(state.luzTipos) || !state.luzTipos.length) {
      state.luzTipos = (!isNoneVal(state.luzTipo)) ? [state.luzTipo] : [];
    }
    if (!Array.isArray(state.atmosferas) || !state.atmosferas.length) {
      state.atmosferas = (!isNoneVal(state.atmosfera)) ? [state.atmosfera] : [];
    }
    if (state.accionObjMode !== 'sin' && state.accionObjMode !== 'con') state.accionObjMode = 'sin';
    state.characters = state.characters.map(ch => {
      const merged = makeCharacter(ch);
      // Migración: eliminar Niña, Docente y género Neutro/Ninguno; barba solo en Hombre
      if (merged.sub === 'Niña') { merged.sub = 'Niño'; merged.genero = 'Mujer'; }
      if (merged.sub === 'Docente') { merged.sub = 'Adulto'; }
      if (merged.genero !== 'Hombre' && merged.genero !== 'Mujer') merged.genero = 'Mujer';
      if (merged.genero !== 'Hombre') merged.chkBarba = false;
      if (merged.accionTipo === 'Haciendo deporte / Ejercicio') merged.accionTipo = 'Haciendo deporte con pesas';
      merged.animalSilueta = normalizeAnimalSilueta(merged.animalSilueta);
      if (!Array.isArray(merged.ropaExtras)) merged.ropaExtras = [];
      return merged;
    });
  }
} catch (e) {}

function getActiveLuzTipos() {
  if (state.chkLuzTipo === false) return [];
  const arr = Array.isArray(state.luzTipos) ? state.luzTipos.filter(v => !isNoneVal(v)) : [];
  if (arr.length) return arr;
  return !isNoneVal(state.luzTipo) ? [state.luzTipo] : [];
}

function getActiveAtmosferas() {
  if (state.chkAtmosfera === false) return [];
  const arr = Array.isArray(state.atmosferas) ? state.atmosferas.filter(v => !isNoneVal(v)) : [];
  if (arr.length) return arr;
  return !isNoneVal(state.atmosfera) ? [state.atmosfera] : [];
}

function saveState() {
  try { localStorage.setItem('entel_img_v8', JSON.stringify(state)); } catch (e) {}
}

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.remove('opacity-0', '-translate-y-3');
  clearTimeout(showToast._tm);
  showToast._tm = setTimeout(() => t.classList.add('opacity-0', '-translate-y-3'), 2000);
}

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


// --- Three.js Enhanced 3D Models (Persona, 4 Normal Animals incl. Insect, Anthropomorphic Animal, Object) ---
let threeReady = false;
let scene, camera, renderer, dirLight, ambLight, fillLight, neonLight2, lightOrb, envGroup, charsGroup, floorMesh;
let targetCamPos = new THREE.Vector3(0, 1.35, 5.2);
let targetLookAt = new THREE.Vector3(0, 1.05, 0);
let targetRoll = 0;
let currentCharSig = '';


function initThree() {
  const container = document.getElementById('threeContainer');
  if (!container || threeReady || typeof THREE === 'undefined') return;
  const w = container.clientWidth || 380;
  const h = container.clientHeight || 220;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFFFFF);
  camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
  camera.position.copy(targetCamPos);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); });
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  ambLight = new THREE.AmbientLight(0xffffff, 0.52); scene.add(ambLight);
  const hemiLight = new THREE.HemisphereLight(0xf8fafc, 0xcbd5e1, 0.48); scene.add(hemiLight);
  dirLight = new THREE.DirectionalLight(0xffffff, 1.08); dirLight.position.set(4, 6, 4.5); scene.add(dirLight);
  const rimLight = new THREE.DirectionalLight(0xe0f2fe, 0.42); rimLight.position.set(-3.5, 4.2, -4.5); scene.add(rimLight);
  fillLight = new THREE.PointLight(0x38bdf8, 0.28, 22); fillLight.position.set(-4, 3, 2); scene.add(fillLight);
  neonLight2 = new THREE.PointLight(0xe879f9, 0.0, 22); neonLight2.position.set(4, 3, 2); scene.add(neonLight2);

  lightOrb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xFDE047 }));
  lightOrb.visible = false; scene.add(lightOrb);

  floorMesh = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 4.6, 0.2, 36), new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.75 }));
  floorMesh.position.y = -0.1; scene.add(floorMesh);

  charsGroup = new THREE.Group(); scene.add(charsGroup);

  envGroup = new THREE.Group();
  const board = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.5, 0.1), new THREE.MeshStandardMaterial({ color: 0x065F46 })); board.position.set(0, 1.55, -2.0);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.9, 12), new THREE.MeshStandardMaterial({ color: 0x92400E })); trunk.position.set(-2.2, 0.45, -1.2);
  const foliage = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.4, 16), new THREE.MeshStandardMaterial({ color: 0x10B981 })); foliage.position.set(-2.2, 1.45, -1.2);
  const desk = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.65, 0.6), new THREE.MeshStandardMaterial({ color: 0xD97706 })); desk.position.set(2.1, 0.325, -1.0);
  envGroup.add(board, trunk, foliage, desk); envGroup.visible = false; scene.add(envGroup);

  const shell = document.getElementById('aspectShell');
  shell.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.drag-node')) return;
    const cur = state.characters[state.activeCharIdx];
    if (!cur || !cur.activarPosicion || state.step < 2) return;
    const rect = shell.getBoundingClientRect();
    const moveChar = (ev) => {
      cur.x = Math.max(8, Math.min(92, Math.round(((ev.clientX - rect.left) / rect.width) * 100)));
      cur.y = Math.max(10, Math.min(90, Math.round(((ev.clientY - rect.top) / rect.height) * 100)));
      syncPosPadUI(cur); saveState(); renderPromptHTML();
    };
    moveChar(e);
    const onUp = () => { window.removeEventListener('pointermove', moveChar); window.removeEventListener('pointerup', onUp); };
    window.addEventListener('pointermove', moveChar); window.addEventListener('pointerup', onUp);
  });

  threeReady = true;
  syncStage();

  function animate() {
    requestAnimationFrame(animate);
    const now = Date.now() * 0.001;
    camera.position.lerp(targetCamPos, 0.09);
    camera.lookAt(targetLookAt);
    camera.rotation.z += (targetRoll - camera.rotation.z) * 0.1;

    charsGroup.children.forEach((mesh, idx) => {
      const c = state.characters[idx];
      if (!c) return;
      const tx = c.activarPosicion ? ((c.x - 50) / 50) * 1.95 : (idx - (state.characters.length - 1) / 2) * 1.35;
      const ty = c.activarPosicion ? ((55 - c.y) / 50) * 0.72 : 0;
      const tz = c.activarPosicion ? ((c.y - 55) / 50) * 0.45 : 0;
      const sc = c.activarTamano ? (c.escala / 100) : 0.86;
      mesh.position.x += (tx - mesh.position.x) * 0.16;
      mesh.position.z += (tz - mesh.position.z) * 0.16;
      mesh.scale.setScalar(mesh.scale.x + (sc - mesh.scale.x) * 0.16);
      mesh.position.y = ty + Math.sin(now * 2.2 + idx) * 0.025;
    });

    const activeLights = getActiveLuzTipos();
    if (state.step >= 6 && activeLights.length) {
      lightOrb.visible = state.step === 6;
      const lt = activeLights[0] || '';
      const lt2 = activeLights[1] || '';
      if (lt.includes('natural') || lt.includes('Amanecer')) {
        const ang = Math.sin(now * 0.8) * 1.1;
        dirLight.position.set(Math.sin(ang) * 4.5, 3.2 + Math.cos(ang) * 2.2, 3.2);
        dirLight.intensity = 1.15;
        lightOrb.material.color.setHex(lt.includes('Amanecer') ? 0xFDBA74 : 0xFDE047);
        lightOrb.position.set(Math.sin(ang) * 2.2, 2.0 + Math.cos(ang) * 0.6, 1.3);
      } else if (lt.includes('dorada')) {
        dirLight.color.setHex(0xFB923C); dirLight.intensity = 1.45;
        dirLight.position.set(3.8, 1.6 + Math.sin(now * 0.6) * 0.3, 2.2);
        lightOrb.material.color.setHex(0xF97316); lightOrb.position.set(2.0, 1.1, 1.2);
      } else if (lt.includes('azul') || lt.includes('luna')) {
        dirLight.color.setHex(0x60A5FA); dirLight.intensity = 0.85;
        dirLight.position.set(-2.5, 4.2, 2.2);
        lightOrb.material.color.setHex(0x93C5FD); lightOrb.position.set(-1.5, 2.1, 1.1);
      } else if (lt.includes('velas') || lt.includes('fogata')) {
        dirLight.intensity = 1.15 + Math.sin(now * 14) * 0.25 + Math.cos(now * 23) * 0.18;
        dirLight.color.setHex(0xFB923C); dirLight.position.set(1.5, 1.4, 2.5);
        lightOrb.material.color.setHex(0xF97316); lightOrb.position.set(1.1, 0.85 + Math.sin(now * 10) * 0.06, 1.4);
      } else if (lt.includes('neón') || lt.includes('Bioluminiscencia')) {
        fillLight.color.setHex(lt.includes('Bioluminiscencia') ? 0x10B981 : 0x22D3EE); fillLight.intensity = 1.6;
        neonLight2.color.setHex(lt.includes('Bioluminiscencia') ? 0x38BDF8 : 0xE879F9); neonLight2.intensity = 1.6;
        fillLight.position.set(Math.cos(now * 1.8) * 3.5, 2.2, Math.sin(now * 1.8) * 3.5);
        neonLight2.position.set(Math.cos(now * 1.8 + Math.PI) * 3.5, 2.2, Math.sin(now * 1.8 + Math.PI) * 3.5);
        lightOrb.material.color.setHex(lt.includes('Bioluminiscencia') ? 0x34D399 : 0xE879F9);
        lightOrb.position.set(Math.cos(now * 1.8) * 2.0, 1.7, Math.sin(now * 1.8) * 2.0);
      } else if (lt.includes('Contraluz') || lt.includes('volumétrica')) {
        const sway = Math.sin(now * 1.2) * 1.6;
        dirLight.position.set(sway, 2.8, -4.5); dirLight.intensity = 2.0;
        lightOrb.material.color.setHex(0xFEF08A); lightOrb.position.set(sway * 0.7, 1.8, -1.7);
      } else if (lt.includes('Tormenta')) {
        dirLight.intensity = (Math.sin(now * 5.2) > 0.94) ? 2.8 : 0.45;
        dirLight.color.setHex(0x93C5FD); dirLight.position.set(-2.5, 5.5, 2.0);
        lightOrb.material.color.setHex(0x60A5FA); lightOrb.position.set(-1.4, 2.3, 0.8);
      } else if (lt.includes('Rembrandt') || lt.includes('lateral') || lt.includes('ventana')) {
        dirLight.intensity = 1.35; dirLight.position.set(4.6, 2.8, 1.6);
        lightOrb.material.color.setHex(0xFEF3C7); lightOrb.position.set(2.1, 1.7, 0.9);
      } else if (lt.includes('cenital') || lt.includes('spotlight')) {
        dirLight.intensity = 1.8; dirLight.position.set(0, 6.0, 0.6);
        lightOrb.material.color.setHex(0xFFFFFF); lightOrb.position.set(0, 2.5, 0.3);
      } else {
        dirLight.intensity = 1.05 + Math.sin(now * 2.0) * 0.12;
        dirLight.position.set(Math.cos(now * 0.7) * 2.5, 5.0, 3.5);
        lightOrb.material.color.setHex(0xFFFFFF); lightOrb.position.set(Math.cos(now * 0.7) * 1.5, 2.3, 1.3);
      }

      // Segunda fuente de luz combinada en el visor 3D
      if (lt2) {
        if (lt2.includes('neón')) { neonLight2.color.setHex(0xE879F9); neonLight2.intensity = 1.4; }
        else if (lt2.includes('dorada') || lt2.includes('velas') || lt2.includes('Amanecer')) { neonLight2.color.setHex(0xFB923C); neonLight2.intensity = 1.15; }
        else if (lt2.includes('azul') || lt2.includes('luna') || lt2.includes('Tormenta')) { neonLight2.color.setHex(0x38BDF8); neonLight2.intensity = 1.1; }
        else if (lt2.includes('Bioluminiscencia')) { neonLight2.color.setHex(0x34D399); neonLight2.intensity = 1.3; }
        else { neonLight2.color.setHex(0xFEF08A); neonLight2.intensity = 0.9; }
        neonLight2.position.set(-3.2, 2.4, -2.2);
      }
    } else {
      lightOrb.visible = false; neonLight2.intensity = 0;
    }
    renderer.render(scene, camera);
  }
  animate();
  window.addEventListener('resize', resizeThree);
}

function resizeThree() {
  if (!threeReady || !renderer || !camera) return;
  const c = document.getElementById('threeContainer');
  if (!c || c.clientWidth === 0 || c.clientHeight === 0) return;
  camera.aspect = c.clientWidth / c.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(c.clientWidth, c.clientHeight);
}

function syncLightingPhotoStage() {
  const stage = document.getElementById('lightingPhotoStage');
  const img = document.getElementById('lightingBaseImg');
  const lightStack = document.getElementById('lpLightStack');
  const tempOv = document.getElementById('lpTempOverlay');
  const atmStack = document.getElementById('lpAtmStack');
  const partOv = document.getElementById('lpParticlesOverlay');
  const vigOv = document.getElementById('lpVignetteOverlay');
  const sumEl = document.getElementById('lpActiveSummary');
  if (!stage || !img) return;

  const lights = getActiveLuzTipos();
  const tmp = (state.chkLuzTemp !== false && !isNoneVal(state.luzTemp)) ? state.luzTemp : '';
  const atms = getActiveAtmosferas();

  let bright = 1.0, contrast = 1.0, sat = 1.0, sepia = 0, hue = 0, blurPx = 0;
  let tempBg = 'none', tempBlend = 'soft-light';
  const lightLayers = [];
  const atmLayers = [];
  const vigLayers = [];
  let particlesHtml = '';

  const layerAlpha = lights.length > 1 ? (lights.length === 2 ? 0.84 : 0.72) : 1.0;

  // 1. Capas superpuestas de Tipos de Iluminación (hasta 3 combinables)
  lights.forEach((lt, idx) => {
    const w = idx === 0 ? 1.0 : 0.65;
    let bg = '', blend = 'normal', cls = '';
    if (lt.includes('natural')) {
      bright *= (1 + 0.05 * w); contrast *= (1 + 0.04 * w); sat *= (1 + 0.05 * w);
      bg = 'radial-gradient(circle at 22% 12%, rgba(255,253,235,0.36), transparent 62%)';
      blend = 'screen';
    } else if (lt.includes('Hora dorada')) {
      bright *= (1 + 0.02 * w); contrast *= (1 + 0.12 * w); sat *= (1 + 0.22 * w); sepia += 0.14 * w;
      bg = 'linear-gradient(125deg, rgba(251,146,60,0.52) 0%, rgba(253,186,116,0.28) 42%, rgba(30,27,75,0.20) 100%)';
      blend = 'soft-light';
      vigLayers.push('radial-gradient(circle at 82% 28%, rgba(254,215,170,0.42), transparent 52%)');
    } else if (lt.includes('Hora azul')) {
      bright *= (1 - 0.24 * w); contrast *= (1 + 0.12 * w); sat *= (1 + 0.08 * w); hue -= Math.round(10 * w);
      bg = 'linear-gradient(180deg, rgba(30,58,138,0.66) 0%, rgba(37,99,235,0.36) 52%, rgba(15,23,42,0.54) 100%)';
      blend = 'multiply';
    } else if (lt.includes('Amanecer')) {
      bright *= (1 + 0.06 * w); sat *= (1 + 0.14 * w);
      bg = 'linear-gradient(135deg, rgba(253,164,175,0.40) 0%, rgba(253,224,71,0.26) 48%, rgba(186,230,253,0.24) 100%)';
      blend = 'screen';
    } else if (lt.includes('estudio suave')) {
      bright *= (1 + 0.09 * w); contrast *= (1 - 0.05 * w);
      bg = 'radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.32), rgba(241,245,249,0.08) 65%, rgba(15,23,42,0.14) 100%)';
      blend = 'soft-light';
    } else if (lt.includes('Rembrandt')) {
      bright *= (1 - 0.18 * w); contrast *= (1 + 0.34 * w);
      bg = 'linear-gradient(112deg, rgba(254,243,199,0.34) 0%, rgba(15,23,42,0.05) 38%, rgba(2,6,23,0.78) 86%)';
      blend = 'multiply';
      vigLayers.push('radial-gradient(circle at 26% 32%, rgba(253,230,138,0.34), transparent 44%)');
    } else if (lt.includes('lateral dramática')) {
      bright *= (1 - 0.16 * w); contrast *= (1 + 0.40 * w);
      bg = 'linear-gradient(90deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.06) 46%, rgba(2,6,23,0.82) 54%, rgba(2,6,23,0.88) 100%)';
      blend = 'multiply';
    } else if (lt.includes('Contraluz')) {
      bright *= (1 - 0.16 * w); contrast *= (1 + 0.28 * w);
      bg = 'radial-gradient(circle at 52% 24%, rgba(255,251,235,0.90) 0%, rgba(254,240,138,0.44) 28%, rgba(15,23,42,0.42) 78%)';
      blend = 'hard-light';
      vigLayers.push('radial-gradient(circle at 52% 24%, rgba(255,255,255,0.44), transparent 42%)');
    } else if (lt.includes('volumétrica')) {
      bright *= (1 + 0.04 * w); contrast *= (1 + 0.10 * w); sat *= (1 + 0.10 * w);
      bg = 'repeating-linear-gradient(122deg, rgba(254,249,195,0.48) 0px, rgba(254,249,195,0.48) 24px, transparent 24px, transparent 58px)';
      blend = 'screen';
    } else if (lt.includes('velas') || lt.includes('fogata')) {
      bright *= (1 - 0.22 * w); contrast *= (1 + 0.22 * w); sat *= (1 + 0.24 * w); sepia += 0.20 * w;
      bg = 'radial-gradient(circle at 32% 78%, rgba(251,146,60,0.80) 0%, rgba(234,88,12,0.40) 38%, rgba(15,23,42,0.74) 86%)';
      blend = 'hard-light';
      cls = 'lp-candle-pulse';
    } else if (lt.includes('neón')) {
      bright *= (1 - 0.16 * w); contrast *= (1 + 0.28 * w); sat *= (1 + 0.45 * w);
      bg = 'linear-gradient(100deg, rgba(6,182,212,0.62) 0%, rgba(15,23,42,0.18) 48%, rgba(217,70,239,0.65) 100%)';
      blend = 'color';
      vigLayers.push('linear-gradient(100deg, rgba(34,211,238,0.34), transparent 45%, rgba(232,121,249,0.36))');
    } else if (lt.includes('luna')) {
      bright *= (1 - 0.36 * w); contrast *= (1 + 0.18 * w); sat *= (1 - 0.32 * w); hue -= Math.round(8 * w);
      bg = 'radial-gradient(circle at 76% 14%, rgba(224,242,254,0.62) 0%, rgba(59,130,246,0.32) 35%, rgba(2,6,23,0.76) 92%)';
      blend = 'multiply';
    } else if (lt.includes('Bioluminiscencia')) {
      bright *= (1 - 0.22 * w); contrast *= (1 + 0.20 * w); sat *= (1 + 0.38 * w);
      bg = 'radial-gradient(circle at 50% 62%, rgba(16,185,129,0.60) 0%, rgba(14,165,233,0.40) 42%, rgba(2,6,23,0.74) 92%)';
      blend = 'hard-light';
      particlesHtml += Array.from({ length: 16 }, (_, i) => {
        const lx = (i * 29 + 7) % 92 + 4;
        const ly = (i * 41 + 13) % 80 + 10;
        const sz = 4 + (i % 4) * 2;
        const dur = (2.2 + (i % 4) * 0.7).toFixed(1);
        return `<span class="lp-mote" style="left:${lx}%;top:${ly}%;width:${sz}px;height:${sz}px;background:#34D399;box-shadow:0 0 10px #2DD4BF;animation-duration:${dur}s;animation-delay:-${(i * 0.3).toFixed(1)}s;"></span>`;
      }).join('');
    } else if (lt.includes('ventana')) {
      bright *= (1 - 0.08 * w); contrast *= (1 + 0.24 * w);
      bg = 'repeating-linear-gradient(118deg, rgba(255,255,255,0.22) 0px, rgba(255,255,255,0.22) 22px, rgba(15,23,42,0.56) 22px, rgba(15,23,42,0.56) 44px)';
      blend = 'multiply';
    } else if (lt.includes('Tormenta')) {
      bright *= (1 - 0.28 * w); contrast *= (1 + 0.30 * w); sat *= (1 - 0.20 * w);
      bg = 'linear-gradient(180deg, rgba(15,23,42,0.68) 0%, rgba(30,41,59,0.40) 55%, rgba(2,6,23,0.62) 100%)';
      blend = 'multiply';
      particlesHtml += '<div class="lp-lightning-flash"></div>';
    } else if (lt.includes('cenital') || lt.includes('spotlight')) {
      bright *= (1 - 0.18 * w); contrast *= (1 + 0.30 * w);
      bg = 'radial-gradient(ellipse 36% 68% at 50% 48%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.06) 45%, rgba(2,6,23,0.82) 84%)';
      blend = 'multiply';
      vigLayers.push('radial-gradient(ellipse 34% 62% at 50% 35%, rgba(255,255,255,0.24), transparent 65%)');
    }
    if (bg) {
      lightLayers.push(`<div class="pointer-events-none absolute inset-0 transition-all duration-500 ${cls}" style="background:${bg};mix-blend-mode:${blend};opacity:${layerAlpha};"></div>`);
    }
  });

  // 2. Temperatura y tono de luz (color grading)
  if (tmp.includes('Cálida')) {
    sat *= 1.14; sepia += 0.14;
    tempBg = 'linear-gradient(135deg, rgba(251,191,36,0.36), rgba(249,115,22,0.28))';
    tempBlend = 'soft-light';
  } else if (tmp.includes('Ámbar')) {
    sat *= 1.28; sepia += 0.34;
    tempBg = 'linear-gradient(135deg, rgba(245,158,11,0.52), rgba(217,119,6,0.44))';
    tempBlend = 'overlay';
  } else if (tmp.includes('Pastel')) {
    bright *= 1.12; contrast *= 0.86; sat *= 0.88;
    tempBg = 'linear-gradient(135deg, rgba(251,207,232,0.40), rgba(186,230,253,0.36))';
    tempBlend = 'screen';
  } else if (tmp.includes('Fría')) {
    sat *= 0.92; hue -= 10;
    tempBg = 'linear-gradient(180deg, rgba(59,130,246,0.42), rgba(14,165,233,0.30))';
    tempBlend = 'color';
  } else if (tmp.includes('Tecnológica') || tmp.includes('cian')) {
    contrast *= 1.14; sat *= 1.20;
    tempBg = 'linear-gradient(135deg, rgba(6,182,212,0.48), rgba(37,99,235,0.38))';
    tempBlend = 'color';
  } else if (tmp.includes('Nocturna')) {
    bright *= 0.65; contrast *= 1.22; sat *= 0.80;
    tempBg = 'linear-gradient(180deg, rgba(15,23,42,0.68), rgba(30,27,75,0.52))';
    tempBlend = 'multiply';
  } else if (tmp.includes('Dramática')) {
    contrast *= 1.44; bright *= 0.90; sat *= 0.86;
    tempBg = 'radial-gradient(circle, transparent 42%, rgba(2,6,23,0.64) 100%)';
    tempBlend = 'multiply';
  } else if (tmp.includes('neón')) {
    contrast *= 1.20; sat *= 1.55;
    tempBg = 'linear-gradient(120deg, rgba(236,72,153,0.44), rgba(34,211,238,0.44))';
    tempBlend = 'overlay';
  } else if (tmp.includes('sepia') || tmp.includes('Monocromática')) {
    sat *= 0.18; sepia = 0.82; contrast *= 1.12;
    tempBg = 'rgba(120,53,15,0.22)';
    tempBlend = 'color';
  }

  // 3. Capas superpuestas de Atmósfera y Clima (hasta 3 combinables)
  const atmAlpha = atms.length > 1 ? (atms.length === 2 ? 0.85 : 0.72) : 1.0;
  atms.forEach((atm, idx) => {
    const w = idx === 0 ? 1.0 : 0.65;
    let bg = '', blend = 'normal';
    if (atm.includes('Soleado')) {
      bright *= (1 + 0.09 * w); sat *= (1 + 0.12 * w);
      bg = 'radial-gradient(circle at 84% 12%, rgba(254,249,195,0.78) 0%, rgba(253,224,71,0.28) 26%, transparent 62%)';
      blend = 'screen';
    } else if (atm.includes('Nublado')) {
      bright *= (1 - 0.08 * w); contrast *= (1 - 0.12 * w); sat *= (1 - 0.18 * w);
      bg = 'linear-gradient(180deg, rgba(148,163,184,0.48) 0%, rgba(203,213,225,0.24) 55%, rgba(148,163,184,0.12) 100%)';
    } else if (atm.includes('Bruma')) {
      contrast *= (1 - 0.12 * w); bright *= (1 + 0.04 * w);
      particlesHtml += '<div class="lp-fog-sheet" style="opacity:0.56;"></div>';
    } else if (atm.includes('Niebla')) {
      contrast *= (1 - 0.18 * w); sat *= (1 - 0.22 * w); blurPx = Math.max(blurPx, 0.55);
      particlesHtml += '<div class="lp-fog-sheet" style="opacity:0.84;"></div>';
    } else if (atm.includes('Lluvia')) {
      bright *= (1 - 0.16 * w); contrast *= (1 + 0.08 * w); sat *= (1 - 0.14 * w);
      bg = 'linear-gradient(180deg, rgba(30,58,138,0.34), rgba(15,23,42,0.28))';
      particlesHtml += '<div class="lp-rain-layer"></div>';
    } else if (atm.includes('Tormenta')) {
      bright *= (1 - 0.26 * w); contrast *= (1 + 0.24 * w); sat *= (1 - 0.22 * w);
      bg = 'linear-gradient(180deg, rgba(15,23,42,0.58), rgba(30,41,59,0.40))';
      particlesHtml += '<div class="lp-rain-layer is-storm"></div><div class="lp-lightning-flash"></div>';
    } else if (atm.includes('Nieve')) {
      bright *= (1 + 0.02 * w); sat *= (1 - 0.12 * w);
      bg = 'linear-gradient(180deg, rgba(224,242,254,0.26), rgba(241,245,249,0.18))';
      particlesHtml += Array.from({ length: 24 }, (_, i) => {
        const lx = (i * 19 + 5) % 96 + 2;
        const sz = 3 + (i % 4) * 1.5;
        const dur = (2.6 + (i % 5) * 0.65).toFixed(1);
        const del = ((i * 0.27) % 3.2).toFixed(2);
        return `<span class="lp-snow-flake" style="left:${lx}%;top:-8%;width:${sz}px;height:${sz}px;opacity:${(0.55 + (i % 4) * 0.12).toFixed(2)};animation-duration:${dur}s;animation-delay:-${del}s;"></span>`;
      }).join('');
    } else if (atm.includes('Viento') || atm.includes('hojas')) {
      const colors = ['#F97316', '#EAB308', '#FB7185', '#22C55E', '#F472B6'];
      particlesHtml += Array.from({ length: 14 }, (_, i) => {
        const ly = (i * 23 + 6) % 78;
        const col = colors[i % colors.length];
        const dur = (3.0 + (i % 4) * 0.7).toFixed(1);
        return `<span class="lp-leaf" style="left:-10%;top:${ly}%;width:10px;height:6px;background:${col};animation-duration:${dur}s;animation-delay:-${(i * 0.42).toFixed(2)}s;"></span>`;
      }).join('');
    } else if (atm.includes('Polvo')) {
      bg = 'repeating-linear-gradient(124deg, rgba(254,243,199,0.32) 0px, rgba(254,243,199,0.32) 20px, transparent 20px, transparent 52px)';
      blend = 'screen';
      particlesHtml += Array.from({ length: 20 }, (_, i) => {
        const lx = (i * 23 + 9) % 90 + 5;
        const ly = (i * 31 + 11) % 82 + 8;
        const sz = 2.5 + (i % 3) * 1.2;
        return `<span class="lp-mote" style="left:${lx}%;top:${ly}%;width:${sz}px;height:${sz}px;background:#FEF08A;box-shadow:0 0 6px #FDE047;animation-duration:${(2.5 + (i % 4) * 0.6).toFixed(1)}s;animation-delay:-${(i * 0.25).toFixed(2)}s;"></span>`;
      }).join('');
    } else if (atm.includes('Partículas mágicas')) {
      const mCols = ['#FDE047', '#38BDF8', '#E879F9', '#34D399'];
      particlesHtml += Array.from({ length: 22 }, (_, i) => {
        const lx = (i * 17 + 8) % 92 + 4;
        const ly = (i * 29 + 10) % 84 + 8;
        const sz = 4 + (i % 4) * 1.8;
        const col = mCols[i % mCols.length];
        return `<span class="lp-mote" style="left:${lx}%;top:${ly}%;width:${sz}px;height:${sz}px;background:${col};box-shadow:0 0 12px ${col};animation-duration:${(1.8 + (i % 4) * 0.5).toFixed(1)}s;animation-delay:-${(i * 0.22).toFixed(2)}s;"></span>`;
      }).join('');
    } else if (atm.includes('Humo')) {
      contrast *= (1 - 0.10 * w);
      bg = 'radial-gradient(ellipse at 50% 88%, rgba(203,213,225,0.66) 0%, rgba(148,163,184,0.34) 46%, transparent 82%)';
    } else if (atm.includes('estrellado')) {
      bright *= (1 - 0.34 * w); contrast *= (1 + 0.16 * w); sat *= (1 - 0.14 * w);
      bg = 'linear-gradient(180deg, rgba(15,23,42,0.74) 0%, rgba(30,27,75,0.42) 48%, rgba(15,23,42,0.20) 100%)';
      particlesHtml += Array.from({ length: 26 }, (_, i) => {
        const lx = (i * 37 + 5) % 94 + 3;
        const ly = (i * 19 + 4) % 44 + 3;
        const sz = (i % 3 === 0) ? 3 : 2;
        return `<span class="lp-mote" style="left:${lx}%;top:${ly}%;width:${sz}px;height:${sz}px;background:#FFFFFF;box-shadow:0 0 6px #E0F2FE;animation-duration:${(2 + (i % 3)).toFixed(1)}s;animation-delay:-${(i * 0.3).toFixed(1)}s;"></span>`;
      }).join('');
    } else if (atm.includes('Aurora')) {
      bright *= (1 - 0.26 * w); contrast *= (1 + 0.16 * w);
      bg = 'linear-gradient(180deg, rgba(15,23,42,0.62) 0%, rgba(15,23,42,0.20) 60%, transparent 100%)';
      particlesHtml += '<div class="lp-aurora-band"></div>';
    } else if (atm.includes('nubes doradas')) {
      sat *= (1 + 0.18 * w);
      bg = 'linear-gradient(180deg, rgba(251,146,60,0.52) 0%, rgba(253,186,116,0.36) 42%, rgba(244,63,94,0.16) 72%, transparent 100%)';
      blend = 'soft-light';
    }
    if (bg) {
      atmLayers.push(`<div class="pointer-events-none absolute inset-0 transition-all duration-500" style="background:${bg};mix-blend-mode:${blend};opacity:${atmAlpha};"></div>`);
    }
  });

  bright = Math.max(0.45, Math.min(1.36, bright));
  contrast = Math.max(0.76, Math.min(1.68, contrast));
  sat = Math.max(0.18, Math.min(1.88, sat));

  img.style.filter = `brightness(${bright.toFixed(2)}) contrast(${contrast.toFixed(2)}) saturate(${sat.toFixed(2)}) sepia(${Math.min(1, sepia).toFixed(2)}) hue-rotate(${hue}deg)${blurPx ? ` blur(${blurPx}px)` : ''}`;

  if (lightStack) lightStack.innerHTML = lightLayers.join('');
  if (tempOv) { tempOv.style.background = tempBg; tempOv.style.mixBlendMode = tempBlend; }
  if (atmStack) atmStack.innerHTML = atmLayers.join('');
  if (vigOv) vigOv.style.background = vigLayers.length ? vigLayers.join(', ') : 'none';
  if (partOv) partOv.innerHTML = particlesHtml;

  if (sumEl) {
    const badges = [
      ...lights.map(t => `<span class="px-2 py-0.5 rounded-md bg-orange-600/85 text-white text-[10px] font-bold backdrop-blur-xs border border-white/20 truncate max-w-[165px]">☀ ${esc(t)}</span>`),
      ...(tmp ? [`<span class="px-2 py-0.5 rounded-md bg-amber-700/85 text-white text-[10px] font-bold backdrop-blur-xs border border-white/20 truncate max-w-[155px]">🌡 ${esc(tmp)}</span>`] : []),
      ...atms.map(t => `<span class="px-2 py-0.5 rounded-md bg-sky-700/85 text-white text-[10px] font-bold backdrop-blur-xs border border-white/20 truncate max-w-[155px]">☁ ${esc(t)}</span>`)
    ];
    sumEl.innerHTML = badges.length
      ? badges.join('')
      : '<span class="px-2 py-0.5 rounded-md bg-slate-950/65 text-slate-200 text-[10px] font-bold">Imagen base neutra (sin efectos activos)</span>';
  }
}

function syncStage() {
  const shell = document.getElementById('aspectShell');
  const rLbl = document.getElementById('ratioLabel');
  const badge = document.getElementById('hudBadge');
  const hint = document.getElementById('dragHintText');
  const emptyHint = document.getElementById('emptyCanvasHint');
  const emptyRatioText = document.getElementById('emptyRatioText');
  const stageTitle = document.getElementById('stageTitleLabel');
  const lightModeSw = document.getElementById('lightStageModeSwitch');
  const lightPhotoStage = document.getElementById('lightingPhotoStage');
  const threeBox = document.getElementById('threeContainer');
  const curChar = state.characters[state.activeCharIdx];
  const stepObj = STEPS[state.step - 1] || STEPS[0];
  const isLightPhotoMode = state.step === 6 && state.lightStageMode !== '3d';

  if (rLbl) rLbl.textContent = state.aspecto;
  if (emptyRatioText) emptyRatioText.textContent = state.aspecto;
  if (shell) {
    if (state.aspecto === '1:1') { shell.style.aspectRatio = '1 / 1'; shell.style.width = '270px'; }
    else if (state.aspecto === '9:16') { shell.style.aspectRatio = '9 / 16'; shell.style.width = '165px'; }
    else if (state.aspecto === '4:3') { shell.style.aspectRatio = '4 / 3'; shell.style.width = '340px'; }
    else if (state.aspecto === '3:2') { shell.style.aspectRatio = '3 / 2'; shell.style.width = '370px'; }
    else { shell.style.aspectRatio = '16 / 9'; shell.style.width = '100%'; }
    shell.style.cursor = (!isLightPhotoMode && curChar && curChar.activarPosicion && state.step >= 2) ? 'grab' : 'default';
    setTimeout(resizeThree, 60);
  }

  // Toggle between Real Photo Lighting Simulator (Step 6) and 3D Stage
  if (lightModeSw) {
    lightModeSw.classList.toggle('hidden', state.step !== 6);
    lightModeSw.classList.toggle('flex', state.step === 6);
    lightModeSw.querySelectorAll('.light-stage-mode-btn').forEach(b => {
      const m = b.getAttribute('data-light-stage-mode');
      const active = (state.lightStageMode || 'photo') === m;
      b.className = `light-stage-mode-btn px-2 py-0.5 rounded-md text-[10px] font-extrabold transition ${active ? 'bg-white text-orange-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`;
    });
  }
  if (stageTitle) stageTitle.textContent = isLightPhotoMode ? 'Simulador de Iluminación (Imagen)' : 'Simulador Visual 3D';
  if (lightPhotoStage) lightPhotoStage.classList.toggle('hidden', !isLightPhotoMode);
  if (threeBox) threeBox.classList.toggle('hidden', isLightPhotoMode);
  if (isLightPhotoMode) syncLightingPhotoStage();

  if (emptyHint) emptyHint.classList.toggle('hidden', state.step !== 1);
  const isRasgosFaceZoom = state.step === 2 && state.charTab === 'rasgos' && (state.rasgosTab || 'rostro') === 'rostro' && curChar && curChar.cat === 'Persona';
  const isEmotionFaceZoom = state.step === 3 && (state.step3Tab || 'emocion') === 'emocion' && curChar && !(curChar.cat === 'Objeto' && curChar.modoForma === 'Normal');
  const isFaceZoom = isRasgosFaceZoom || isEmotionFaceZoom;

  if (badge) {
    badge.className = `px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${stepObj.hudBg}`;
    if (isRasgosFaceZoom) badge.textContent = 'Paso 2 · Rostro y Cabello';
    else if (state.step === 2 && state.charTab === 'rasgos' && state.rasgosTab === 'cuerpo') badge.textContent = 'Paso 2 · Cuerpo y Piel';
    else if (isEmotionFaceZoom) badge.textContent = 'Paso 3 · Emoción (Rostro)';
    else if (state.step === 3 && state.step3Tab === 'postura') badge.textContent = 'Paso 3 · Postura';
    else if (isLightPhotoMode) badge.textContent = 'Paso 6 · Efectos en Vivo';
    else badge.textContent = `Paso ${state.step} · ${stepObj.title}`;
  }
  const hairOv = document.getElementById('hairPreviewOverlay');
  if (hairOv) {
    const showHairImg = isRasgosFaceZoom && curChar.chkCabello && HAIR_IMGS[curChar.cabelloTipo];
    hairOv.classList.toggle('hidden', !showHairImg);
    if (showHairImg) {
      const hImg = document.getElementById('hairPreviewImg');
      const hLbl = document.getElementById('hairPreviewLabel');
      if (hImg) hImg.src = HAIR_IMGS[curChar.cabelloTipo];
      if (hLbl) hLbl.textContent = curChar.cabelloTipo;
    }
  }
  if (hint) {
    if (state.step === 1) hint.textContent = 'Solo recuadro de proporción (sin personaje todavía)';
    else if (isRasgosFaceZoom) hint.textContent = 'Vista cercana de rostro y cabello · Cambia a "Cuerpo y Piel" para ver complexión';
    else if (isEmotionFaceZoom) hint.textContent = 'Vista cercana de expresión facial · Cambia a "Postura" para cuerpo completo';
    else if (isLightPhotoMode) hint.textContent = 'Puedes combinar hasta 3 luces y 3 atmósferas superpuestas en vivo sobre la imagen';
    else if (curChar && curChar.activarPosicion) hint.textContent = 'Arrastra en el visor o haz clic en el recuadro de posición';
    else if (state.step === 6) hint.textContent = `Combinación 3D activa: ${getActiveLuzTipos().join(' + ') || 'Sin luz fija'}`;
    else if (state.step === 8 && state.incluirTexto && state.texts.length) hint.textContent = 'Arrastra las etiquetas de texto en el recuadro';
    else hint.textContent = 'Simulación en tiempo real';
  }

  renderTextDragOverlay();
  if (!threeReady) return;

  charsGroup.visible = state.step >= 2;
  const sig = state.characters.map(c => [
    c.cat, c.sub, c.subOtro, c.genero, c.modoForma, c.animalSilueta, c.chkCabello, c.cabelloTipo, c.cabelloColor, c.cabelloColorHex,
    c.chkBarba, c.barbaTipo, c.barbaColor, c.barbaColorHex,
    c.chkComplexion, c.complexionTipo, c.chkPiel, c.pielTono, c.pielTonoHex, c.chkOjos, c.ojosColor, c.ojosColorHex,
    c.chkColorPrincipal, c.principalColor, c.principalColorHex,
    c.chkOrejasAnimal, c.orejasAnimalTipo, c.chkColaAnimal, c.chkCollarAnimal, c.chkManchasPanda,
    c.chkAlasAve, c.alasAveTipo, c.chkPicoAve, c.picoAveTipo, c.chkCrestaAve,
    c.chkAntenas, c.chkAlasInsecto, c.chkCaparazon, c.chkAlasAnimal,
    JSON.stringify(c.ropaList || []), c.chkObjetoMano, c.objetoManoItem, c.emocion, c.accionTipo
  ].join(':')).join('|');

  if (sig !== currentCharSig) {
    currentCharSig = sig;
    while (charsGroup.children.length) charsGroup.remove(charsGroup.children[0]);
    state.characters.forEach(c => charsGroup.add(buildGeneric3D(c)));
  }

  if (state.step <= 3 || state.escenarioModo === 'Fondo sólido') {
    envGroup.visible = false; floorMesh.visible = false;
    if (state.step <= 3) scene.background = new THREE.Color(0xFFFFFF);
    else if (state.fondoSolido === 'Otro') scene.background = new THREE.Color(hexToInt(state.fondoSolidoHex, 0xDBEAFE));
    else if (FONDO_SOLIDO_COLORS[state.fondoSolido]) scene.background = new THREE.Color(hexToInt(FONDO_SOLIDO_COLORS[state.fondoSolido], 0xFFFFFF));
    else scene.background = new THREE.Color(0xFFFFFF);
  } else {
    envGroup.visible = true; floorMesh.visible = true;
    scene.background = new THREE.Color(0xDBEAFE);
  }

  targetRoll = 0;
  if (isFaceZoom) {
    const sub = curChar.sub || 'Adulto';
    const isBaby = sub === 'Bebé';
    const isChild = sub === 'Niño' || sub === 'Niña';
    const isTeen = sub === 'Adolescente';
    const isElder = sub === 'Adulto mayor';
    const isOtro = sub === 'Otro';
    const sh = isBaby ? 0.56 : (isChild ? 0.76 : (isTeen ? 0.98 : (isElder ? 1.08 : (isOtro ? 1.10 : 1.16))));
    const legH = (isBaby ? 0.44 : 0.66) * sh + 0.08;
    const torsoH = (isBaby ? 0.60 : 0.72) * sh;
    const headR = isBaby ? 0.345 : (isChild ? 0.310 : (isTeen ? 0.292 : 0.285));
    const sc = curChar.activarTamano ? (curChar.escala / 100) : 0.86;
    const ty = curChar.activarPosicion ? ((55 - curChar.y) / 50) * 0.72 : 0;
    const headY = curChar.cat === 'Persona'
      ? ty + (legH + torsoH + headR + (isBaby ? 0.03 : 0.06)) * sc
      : ty + 1.45 * sc;
    const cx = curChar.activarPosicion ? ((curChar.x - 50) / 50) * 1.95 : (state.activeCharIdx - (state.characters.length - 1) / 2) * 1.35;
    const cz = curChar.activarPosicion ? ((curChar.y - 55) / 50) * 0.45 : 0;
    targetLookAt.set(cx, headY, cz);
    targetCamPos.set(cx, headY + 0.02, cz + (isEmotionFaceZoom ? 1.42 : 1.38));
  } else if (state.step < 5) {
    targetLookAt.set(0, 1.0, 0); targetCamPos.set(0, 1.35, 5.2);
  } else {
    let dist = 5.0, lookY = 1.05;
    const pl = (state.chkPlano !== false && !isNoneVal(state.plano)) ? state.plano : '';
    if (pl.includes('detalle') || pl.includes('Primerísimo')) { dist = 1.95; lookY = 1.5; }
    else if (pl.includes('Primer plano')) { dist = 2.75; lookY = 1.4; }
    else if (pl.includes('medio corto') || pl.includes('sobre el hombro')) { dist = 3.5; lookY = 1.25; }
    else if (pl.includes('Plano medio largo')) { dist = 4.9; lookY = 1.05; }
    else if (pl.includes('Plano medio')) { dist = 4.4; lookY = 1.1; }
    else if (pl.includes('americano') || pl.includes('escorzo')) { dist = 5.4; lookY = 1.0; }
    else if (pl.includes('entero') || pl.includes('conjunto')) { dist = 6.4; lookY = 0.95; }
    else if (pl.includes('Gran plano') || pl.includes('panorámico')) { dist = 9.6; lookY = 1.05; }
    else if (pl.includes('Plano general')) { dist = 8.0; lookY = 1.0; }

    targetLookAt.set(0, lookY, 0);
    const ag = (state.chkAngulo !== false && !isNoneVal(state.angulo)) ? state.angulo : '';
    if (ag.includes('Picado suave')) targetCamPos.set(0.25, lookY + dist * 0.45, dist * 0.88);
    else if (ag.includes('Picado') || ag.includes('pájaro') || ag.includes('dron')) targetCamPos.set(0.35, lookY + dist * 0.78, dist * 0.68);
    else if (ag.includes('Contrapicado suave')) targetCamPos.set(0.2, Math.max(0.45, lookY - dist * 0.25), dist * 0.94);
    else if (ag.includes('Contrapicado')) targetCamPos.set(0.25, Math.max(0.25, lookY - dist * 0.45), dist * 0.85);
    else if (ag.includes('Cenital')) targetCamPos.set(0, lookY + dist * 1.1, 0.35);
    else if (ag.includes('Nadir') || ag.includes('gusano')) targetCamPos.set(0, 0.15, dist * 0.65);
    else if (ag.includes('Perfil lateral')) targetCamPos.set(dist * 0.98, lookY + 0.15, 0.2);
    else if (ag.includes('Desde atrás') || ag.includes('espaldas')) targetCamPos.set(0, lookY + 0.2, -dist);
    else if (ag.includes('Tres cuartos')) targetCamPos.set(dist * 0.65, lookY + 0.25, dist * 0.76);
    else if (ag.includes('holandés')) { targetCamPos.set(0, lookY + 0.15, dist); targetRoll = 0.26; }
    else if (ag.includes('isométrica')) targetCamPos.set(dist * 0.68, lookY + dist * 0.58, dist * 0.68);
    else targetCamPos.set(0, lookY + 0.15, dist);
  }

  if (state.step < 6 || (state.chkLuzTemp === false && state.chkLuzTipo === false)) {
    dirLight.color.setHex(0xFFFFFF); dirLight.intensity = 1.05; ambLight.intensity = 0.78;
    fillLight.color.setHex(0x38BDF8); fillLight.intensity = 0.3; neonLight2.intensity = 0;
  } else {
    neonLight2.intensity = 0;
    const tmp = (state.chkLuzTemp !== false && !isNoneVal(state.luzTemp)) ? state.luzTemp : '';
    if (tmp.includes('Cálida') || tmp.includes('Ámbar')) { dirLight.color.setHex(0xFDBA74); ambLight.intensity = 0.55; }
    else if (tmp.includes('Fría') || tmp.includes('Tecnológica') || tmp.includes('Nocturna')) { dirLight.color.setHex(0x93C5FD); ambLight.intensity = tmp.includes('Nocturna') ? 0.25 : 0.45; }
    else if (tmp.includes('Dramática')) { dirLight.color.setHex(0xFFFFFF); ambLight.intensity = 0.18; }
    else if (tmp.includes('Pastel')) { dirLight.color.setHex(0xFDE68A); ambLight.intensity = 0.82; }
    else if (tmp.includes('neón')) { dirLight.color.setHex(0xE879F9); ambLight.intensity = 0.38; }
    else { dirLight.color.setHex(0xFFFFFF); ambLight.intensity = 0.68; }
  }
}

function getTextPreviewClass(font, container, bubbleTail) {
  const f = (font || '').toLowerCase();
  const c = (container || 'Sin globo (texto libre)');

  let fontStyle = 'font-black';
  if (f.includes('manuscrita')) fontStyle = 'italic font-serif font-bold';
  else if (f.includes('infantil')) fontStyle = 'font-black tracking-wide';
  else if (f.includes('luminoso') || f.includes('neón')) fontStyle = 'font-black uppercase tracking-widest';
  else if (f.includes('cinematográfica')) fontStyle = 'font-extrabold uppercase tracking-[0.16em]';
  else if (f.includes('cómic')) fontStyle = 'font-black uppercase tracking-wide';
  else if (f.includes('minimalista')) fontStyle = 'font-semibold tracking-wide';

  let tailClass = '';
  if (bubbleTail === 'Apuntando abajo a la derecha') tailClass = 'tail-right';
  else if (bubbleTail === 'Apuntando hacia arriba') tailClass = 'tail-top';
  else if (bubbleTail === 'Sin cola') tailClass = 'tail-none';

  if (c === 'Globo de diálogo clásico') {
    return `${fontStyle} bubble-speech ${tailClass} bg-white text-slate-900 border-slate-800`;
  }
  if (c === 'Globo de pensamiento (nube)') {
    return `${fontStyle} bubble-thought ${tailClass} bg-white text-slate-800 border-slate-700`;
  }
  if (c === 'Globo de grito / exclamación (cómic)') {
    return `${fontStyle} bubble-shout bg-yellow-300 text-slate-950 border-slate-950`;
  }
  if (c === 'Globo de susurro (borde punteado)') {
    return `${fontStyle} bubble-whisper bg-white/95 text-slate-700 border-slate-500`;
  }
  if (c === 'Cartel / pancarta') {
    return `${fontStyle} bg-amber-50 text-slate-900 border-amber-700 rounded-md px-3 py-1.5`;
  }
  if (c === 'Cinta / banner decorativo') {
    return `${fontStyle} bubble-banner bg-rose-600 text-white border-rose-800`;
  }
  if (c === 'Caja de narrador / subtítulo') {
    return `${fontStyle} bubble-narrator`;
  }
  if (c === 'Letrero de madera') {
    return `${fontStyle} bubble-wood`;
  }
  if (c === 'Letrero luminoso neón') {
    return `${fontStyle} bg-slate-950/95 text-cyan-300 border-fuchsia-400 shadow-[0_0_14px_rgba(34,211,238,0.85)] rounded-lg px-3 py-1`;
  }

  // Sin globo (texto libre): styling depends on font without conversation bubble chrome
  if (f.includes('luminoso') || f.includes('neón')) return `${fontStyle} bg-slate-950/85 text-cyan-300 border-fuchsia-400 shadow-[0_0_14px_rgba(34,211,238,0.8)] rounded-lg px-2.5 py-1`;
  if (f.includes('infantil')) return `${fontStyle} bubble-free text-rose-600 text-sm`;
  if (f.includes('cinematográfica')) return `${fontStyle} bubble-free text-amber-700 text-sm`;
  if (f.includes('cómic')) return `${fontStyle} bubble-free text-yellow-500 text-sm`;
  return `${fontStyle} bubble-free text-slate-900 text-sm`;
}

function renderTextDragOverlay() {
  const layer = document.getElementById('dragLayer');
  if (!layer) return;
  if (state.step === 1 || !state.incluirTexto) { layer.innerHTML = ''; return; }
  const nodes = state.texts.map((t, idx) => `
    <div data-drag-idx="${idx}" class="drag-node pointer-events-auto cursor-grab active:cursor-grabbing absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs shadow-lg border-2 whitespace-nowrap ${getTextPreviewClass(t.font, t.container, t.bubbleTail)} ${state.activeTextIdx === idx ? 'ring-2 ring-rose-400 scale-105' : ''}" style="left:${t.x}%; top:${t.y}%;">
      ${esc(t.text)}
    </div>
  `);
  if (state.newText && state.newText.trim()) {
    const dx = state.newTextX ?? 50;
    const dy = state.newTextY ?? 18;
    nodes.push(`
      <div data-drag-idx="draft" class="drag-node pointer-events-auto cursor-grab active:cursor-grabbing absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs shadow-lg border-2 whitespace-nowrap ${getTextPreviewClass(state.newTextFont, state.newTextContainer, state.newTextBubbleTail)} ${state.activeTextIdx === -1 ? 'ring-2 ring-rose-400' : ''}" style="left:${dx}%; top:${dy}%;">
        ${esc(state.newText.trim())}
      </div>
    `);
  }
  layer.innerHTML = nodes.join('');

  layer.querySelectorAll('.drag-node').forEach(el => {
    el.addEventListener('pointerdown', (e) => {
      e.preventDefault(); e.stopPropagation();
      el.setPointerCapture(e.pointerId);
      const rawIdx = el.getAttribute('data-drag-idx');
      const isDraft = rawIdx === 'draft';
      const idx = isDraft ? -1 : Number(rawIdx);
      state.activeTextIdx = idx;
      const rect = document.getElementById('aspectShell').getBoundingClientRect();
      const onMove = (ev) => {
        const nx = Math.max(8, Math.min(92, Math.round(((ev.clientX - rect.left) / rect.width) * 100)));
        const ny = Math.max(10, Math.min(90, Math.round(((ev.clientY - rect.top) / rect.height) * 100)));
        el.style.left = `${nx}%`; el.style.top = `${ny}%`;
        if (isDraft) {
          state.newTextX = nx; state.newTextY = ny;
          syncTextPosPadUI(nx, ny);
        } else if (state.texts[idx]) {
          state.texts[idx].x = nx; state.texts[idx].y = ny;
          syncTextPosPadUI(nx, ny);
        }
        saveState(); renderPromptHTML();
      };
      const onUp = () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerup', onUp); };
      el.addEventListener('pointermove', onMove); el.addEventListener('pointerup', onUp);
    });
  });
}

// --- Dictation ---
let activeRec = null;
function startDictation(cb, btnEl) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showToast('Usa Chrome o Edge para dictado por voz'); return; }
  if (activeRec) { activeRec.stop(); activeRec = null; return; }
  const rec = new SR(); rec.lang = 'es-PE'; rec.interimResults = false; activeRec = rec;
  btnEl.classList.add('mic-active'); showToast('Escuchando...');
  rec.onresult = (e) => cb(e.results[0][0].transcript);
  rec.onerror = () => showToast('No se detectó audio');
  rec.onend = () => { btnEl.classList.remove('mic-active'); activeRec = null; };
  rec.start();
}

function micBtn(attr) {
  return `<button type="button" ${attr} title="Dictar por voz" class="mic-btn p-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white transition active:scale-95 shrink-0"><i data-lucide="mic" class="w-4 h-4"></i></button>`;
}

// --- Step Renderers ---
function renderStepper() {
  const nav = document.getElementById('stepperNav');
  nav.innerHTML = STEPS.map((s, idx) => {
    const active = s.id === state.step;
    const done = s.id < state.step;
    return `
      <button type="button" data-go-step="${s.id}" class="step-pill flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition active:scale-95 shrink-0 ${active ? `${s.activeBg} text-white shadow-sm` : 'hover:bg-stone-100 text-slate-600'}">
        <span class="w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${active ? `bg-white ${s.badgeText}` : (done ? 'bg-emerald-500 text-white' : 'bg-stone-200 text-slate-700')}">
          ${done ? '<i data-lucide="check" class="w-3 h-3"></i>' : s.id}
        </span>
        <span class="text-xs font-bold whitespace-nowrap">${s.title}</span>
      </button>
      ${idx < STEPS.length - 1 ? `<div class="hidden xl:block flex-1 h-0.5 rounded-full ${done ? 'bg-emerald-500' : 'bg-stone-200'}"></div>` : ''}
    `;
  }).join('');
  nav.querySelectorAll('.step-pill').forEach(b => b.addEventListener('click', () => goStep(Number(b.getAttribute('data-go-step')))));
}

function renderStep1Ratio() {
  const ratios = [
    ['16:9', 'Horizontal', 'Diapositivas y videos', 'monitor', 'w-9 h-5'],
    ['1:1', 'Cuadrado', 'Fichas, iconos y redes', 'square', 'w-6 h-6'],
    ['4:3', 'Clásico', 'Láminas impresas', 'tablet', 'w-8 h-6'],
    ['9:16', 'Vertical', 'Celulares e infografías', 'smartphone', 'w-5 h-8'],
    ['3:2', 'Fotográfico', 'Carteles y portadas', 'image', 'w-9 h-6']
  ];
  return `
    <div class="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
      <div class="flex items-center gap-3 pb-3 border-b border-stone-100">
        <div class="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">1</div>
        <div><h2 class="text-lg sm:text-xl font-extrabold">Tamaño y Relación de Aspecto</h2><p class="text-xs text-slate-500">Define primero la proporción del lienzo</p></div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        ${ratios.map(([r, name, desc, icon, box]) => `
          <button type="button" data-ratio="${r}" class="ratio-btn text-left p-4 rounded-2xl border-2 transition active:scale-95 ${state.aspecto === r ? 'border-indigo-600 bg-indigo-50/70 shadow-sm' : 'border-stone-200 bg-stone-50 hover:border-indigo-300'}">
            <div class="flex items-center justify-between gap-2 mb-2">
              <div class="w-8 h-8 rounded-xl flex items-center justify-center ${state.aspecto === r ? 'bg-indigo-600 text-white' : 'bg-white border border-stone-200 text-indigo-600'}">
                <i data-lucide="${icon}" class="w-4 h-4"></i>
              </div>
              <div class="${box} rounded border-2 ${state.aspecto === r ? 'border-indigo-500 bg-indigo-100/70' : 'border-stone-300 bg-white'}"></div>
            </div>
            <div class="text-base font-black text-indigo-700">${r}</div>
            <div class="text-xs font-bold text-slate-800">${name}</div>
            <div class="text-[11px] text-slate-500 mt-0.5">${desc}</div>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderDynamicAnimalRasgos(c) {
  const sil = normalizeAnimalSilueta(c.animalSilueta);
  const isAnthro = c.modoForma === 'Antropomorfo';
  const texOpts = ['Ninguno', 'Pelaje suave', 'Pelaje esponjoso', 'Pelaje corto', 'Plumas coloridas', 'Plumaje suave', 'Escamas brillantes', 'Piel lisa', 'Caparazón / exoesqueleto', 'Textura de felpa', 'Otro'];

  const chkCard = (chkKey, label, fieldKey, options) => `
    <div class="p-3 rounded-2xl border ${c[chkKey] ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" data-cchk="${chkKey}" class="w-4 h-4 accent-indigo-600" ${c[chkKey] ? 'checked' : ''} />
        <span class="text-xs font-bold text-slate-800">${label}</span>
      </label>
      ${c[chkKey] ? `
        <select data-cfield="${fieldKey}" class="w-full mt-2 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs">
          ${options.map(o => `<option value="${o}" ${c[fieldKey] === o ? 'selected' : ''}>${o}</option>`).join('')}
        </select>
      ` : ''}
    </div>
  `;

  return `
    <div class="space-y-2.5">
      <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-[11px] font-semibold text-indigo-800">
        <i data-lucide="info" class="w-4 h-4 shrink-0 text-indigo-600"></i>
        <span>La silueta 3D (<strong>${isAnthro ? 'Antropomorfo' : sil}</strong>) es solo una referencia visual. Activa únicamente los rasgos que desees incluir en el prompt.</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div class="p-3 rounded-2xl border ${c.chkTextura ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" data-cchk="chkTextura" class="w-4 h-4 accent-indigo-600" ${c.chkTextura ? 'checked' : ''} />
            <span class="text-xs font-bold text-slate-800">Pelaje, plumas o textura</span>
          </label>
          ${c.chkTextura ? `
            <div class="mt-2 space-y-1.5">
              <select data-cfield="texturaTipo" class="w-full px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs">
                ${texOpts.map(o => `<option value="${o}" ${c.texturaTipo === o ? 'selected' : ''}>${o}</option>`).join('')}
              </select>
              ${c.texturaTipo === 'Otro' ? `<div class="flex gap-1.5"><input type="text" data-cfield="texturaOtro" value="${esc(c.texturaOtro)}" placeholder="Describe textura..." class="flex-1 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs" />${micBtn('data-cmic="texturaOtro"')}</div>` : ''}
            </div>
          ` : ''}
        </div>

        ${chkCard('chkOrejasAnimal', 'Orejas (opcional)', 'orejasAnimalTipo', ['Ninguno', 'Puntiagudas / erguidas', 'Caídas / largas', 'Redondas pequeñas', 'Grandes expresivas'])}
        ${chkCard('chkColaAnimal', 'Cola (opcional)', 'colaAnimalTipo', ['Ninguno', 'Larga y peluda', 'Corta y redonda', 'Delgada y curva', 'Plumosa elegante'])}
        ${chkCard('chkAlasAnimal', 'Alas (opcional)', 'alasAnimalTipo', ['Ninguno', 'Alas extendidas', 'Alas plegadas', 'Alas emplumadas coloridas', 'Alas translúcidas'])}
        ${chkCard('chkCollarAnimal', 'Collar o accesorio (opcional)', 'collarAnimalTipo', ['Ninguno', 'Collar con placa', 'Pañuelo al cuello', 'Arnés deportivo', 'Lazo decorativo'])}

        <div class="sm:col-span-2 p-3 rounded-2xl border ${c.chkColorPrincipal ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" data-cchk="chkColorPrincipal" class="w-4 h-4 accent-indigo-600" ${c.chkColorPrincipal ? 'checked' : ''} />
            <span class="text-xs font-bold text-slate-800">Color principal del animal</span>
          </label>
          ${c.chkColorPrincipal ? renderColorSwatchBar({
            items: mapObjToSwatches(SUBJECT_COLORS),
            selectedName: c.principalColor,
            customHex: c.principalColorHex,
            customText: c.principalColorOtro,
            scope: 'char', nameKey: 'principalColor', hexKey: 'principalColorHex', textKey: 'principalColorOtro',
            micAttr: 'data-cmic="principalColorOtro"',
            placeholder: 'Color personalizado del animal...'
          }) : ''}
        </div>

        <div class="sm:col-span-2 p-3 rounded-2xl border ${c.otrosRasgos && c.otrosRasgos.trim() ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
          <label class="block text-xs font-bold text-slate-800 mb-1.5">Otros rasgos adicionales</label>
          <div class="flex gap-1.5">
            <input type="text" data-cfield="otrosRasgos" value="${esc(c.otrosRasgos)}" placeholder="Ej. ojos grandes expresivos, rayas en el lomo, pico curvo, antenas..." class="flex-1 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs" />
            ${micBtn('data-cmic="otrosRasgos"')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStep2Character() {
  const c = state.characters[state.activeCharIdx] || state.characters[0];
  const tabs = [['tipo', 'Tipo', 'user'], ['rasgos', 'Rasgos', 'scan-face'], ['ropa', 'Ropa y Objeto', 'shirt']];

  let inner = '';
  if (state.charTab === 'tipo') {
    inner = `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        ${[['Persona','user-round'],['Animal','paw-print'],['Objeto','box'],['Personalizado','wand-2']].map(([cat, ic]) => `
          <button type="button" data-char-cat="${cat}" class="char-cat-btn flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border-2 text-xs font-bold transition active:scale-95 ${c.cat === cat ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs' : 'border-stone-200 bg-stone-50 text-slate-600 hover:border-indigo-300'}"><i data-lucide="${ic}" class="w-4 h-4 shrink-0"></i><span>${cat}</span></button>
        `).join('')}
      </div>
      ${c.cat === 'Persona' ? `
        <div class="space-y-3.5">
          <!-- Selector visual de modelos de Persona (7 opciones claras) -->
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">Modelo de persona</label>
            <div class="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
              ${PERSONA_MODEL_CARDS.map(m => {
                const active = c.sub === m.id;
                return `
                  <button type="button" data-persona-sub="${m.id}" class="persona-sub-btn flex flex-col items-center justify-center gap-0.5 py-2 px-1.5 rounded-xl border-2 text-center transition active:scale-95 ${active ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs' : 'border-stone-200 bg-stone-50 text-slate-600 hover:border-indigo-300'}">
                    <i data-lucide="${m.icon}" class="w-4 h-4"></i>
                    <span class="text-[11px] font-extrabold leading-tight">${m.label}</span>
                    <span class="text-[9px] font-semibold opacity-70 leading-tight">${m.sub}</span>
                  </button>
                `;
              }).join('')}
            </div>
            ${c.sub === 'Otro' ? `
              <div class="mt-2 flex gap-2">
                <input type="text" data-cfield="subOtro" value="${esc(c.subOtro)}" placeholder="Describe otro tipo de persona (ej. astronauta, médico, deportista, chef...)" class="flex-1 px-3 py-2 rounded-xl bg-white border border-indigo-300 text-xs sm:text-sm" />
                ${micBtn('data-cmic="subOtro"')}
              </div>
            ` : ''}
          </div>

          <!-- Género estrictamente binario: Hombre / Mujer (sin neutro) -->
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div class="sm:col-span-7">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">Género (cambia ropa y silueta del modelo 3D)</label>
              <div class="grid grid-cols-2 gap-2">
                ${[
                  ['Hombre', 'Hombre', 'user'],
                  ['Mujer', 'Mujer', 'user-round']
                ].map(([val, lbl, ic]) => {
                  const effGen = c.genero === 'Hombre' ? 'Hombre' : 'Mujer';
                  const active = effGen === val;
                  return `
                    <button type="button" data-persona-gen="${val}" class="persona-gen-btn flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border-2 text-xs font-bold transition active:scale-95 ${active ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs' : 'border-stone-200 bg-stone-50 text-slate-600 hover:border-indigo-300'}">
                      <i data-lucide="${ic}" class="w-3.5 h-3.5 shrink-0"></i>
                      <span>${lbl}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
            <div class="sm:col-span-5">
              <label class="block text-xs font-bold text-slate-700 mb-1">Edad (opcional)</label>
              <input type="text" data-cfield="edad" value="${esc(c.edad)}" placeholder="Ej. 8 años, 35 años..." class="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm" />
            </div>
          </div>
          ${(c.sub === 'Bebé' || c.sub === 'Niño') ? `
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-[11px] font-semibold text-indigo-800">
              <i data-lucide="info" class="w-3.5 h-3.5 shrink-0 text-indigo-600"></i>
              <span>${c.sub === 'Bebé' ? 'Bebé' : 'Niño/Niña'} inicia sin cabello (solo cambia su ropita según género). Puedes activar cabello en la pestaña <strong>Rasgos</strong>.</span>
            </div>
          ` : ''}

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Dato adicional libre (opcional)</label>
            <div class="flex gap-2">
              <input type="text" data-cfield="datoExtra" value="${esc(c.datoExtra)}" placeholder="Ej. profesor de matemáticas, estudiante de primaria..." class="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm" />
              ${micBtn('data-cmic="datoExtra"')}
            </div>
          </div>
        </div>
      ` : `
        <div class="space-y-3">
          ${c.cat !== 'Personalizado' ? `
            <div class="grid grid-cols-2 gap-2">
              ${['Normal', 'Antropomorfo'].map(m => `
                <button type="button" data-cmodo="${m}" class="cmodo-btn py-2 rounded-xl border-2 text-xs font-bold transition ${c.modoForma === m ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs' : 'border-stone-200 bg-stone-50 text-slate-600 hover:border-indigo-300'}">${c.cat} ${m.toLowerCase()}</button>
              `).join('')}
            </div>
          ` : ''}
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Describe tu ${c.cat.toLowerCase()}</label>
            <div class="flex gap-2">
              <input type="text" data-cfield="customName" value="${esc(c.customName)}" placeholder="${c.cat === 'Animal' ? 'Ej. zorro, perro pastor, panda, colibrí, mariposa...' : (c.cat === 'Objeto' ? 'Ej. libro parlante, microscopio, pelota...' : 'Escribe cualquier sujeto o criatura...')}" class="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm" />
              ${micBtn('data-cmic="customName"')}
            </div>
          </div>
          ${c.cat === 'Animal' && c.modoForma === 'Normal' ? `
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">Referencia de silueta 3D (cuadrúpedo, bípedo, con alas, insecto o ninguno)</label>
              <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                ${ANIMAL_SILUETAS.map(s => {
                  const active = normalizeAnimalSilueta(c.animalSilueta) === s.id;
                  return `
                    <button type="button" data-animal-sil="${s.id}" class="animal-sil-btn flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 text-center transition active:scale-95 ${active ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs' : 'border-stone-200 bg-stone-50 text-slate-600 hover:border-indigo-300'}">
                      <i data-lucide="${s.icon}" class="w-5 h-5"></i>
                      <span class="text-xs font-extrabold leading-tight">${s.label}</span>
                      <span class="text-[10px] font-semibold opacity-75">${s.sub}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}
          ${c.cat === 'Animal' && c.modoForma === 'Antropomorfo' ? `
            <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-800">
              <i data-lucide="user-check" class="w-4 h-4 shrink-0 text-indigo-600"></i>
              <span>Modelo 3D antropomorfo activo: cuerpo erguido compatible con ropa, objetos en mano, emociones y posturas.</span>
            </div>
          ` : ''}
        </div>
      `}
    `;
  } else if (state.charTab === 'rasgos') {
    if (c.cat === 'Persona') {
      const rTab = state.rasgosTab || 'rostro';
      inner = `
        <!-- Rasgos divididos en 2 subpestañas: Parte superior (Rostro y Cabello) y Cuerpo (Complexión, Piel y Otros) -->
        <div class="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-indigo-50/70 border border-indigo-100 mb-3">
          <button type="button" data-rasgos-tab="rostro" class="rasgos-subtab-btn flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition ${rTab === 'rostro' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-indigo-700'}">
            <i data-lucide="scan-face" class="w-3.5 h-3.5 shrink-0"></i>
            <span>${c.genero === 'Hombre' ? 'Parte superior (Cabello, Barba y Ojos)' : 'Parte superior (Cabello y Ojos)'}</span>
          </button>
          <button type="button" data-rasgos-tab="cuerpo" class="rasgos-subtab-btn flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition ${rTab === 'cuerpo' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-indigo-700'}">
            <i data-lucide="accessibility" class="w-3.5 h-3.5 shrink-0"></i>
            <span>Complexión, Piel y Otros</span>
          </button>
        </div>

        ${rTab === 'rostro' ? `
          <div class="space-y-3">
            <!-- Cabello (imágenes de referencia + bolitas de color) -->
            <div class="p-3.5 rounded-2xl border ${c.chkCabello ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" data-cchk="chkCabello" class="w-4 h-4 accent-indigo-600" ${c.chkCabello ? 'checked' : ''} />
                <span class="text-xs font-bold text-slate-800">Cabello (estilo y color)</span>
              </label>
              ${c.chkCabello ? `
                <div class="space-y-2.5 mt-2.5">
                  <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    ${['Corto', 'Largo', 'Rizado', 'Trenzas'].map(o => `
                      <button type="button" data-hair-pick="${o}" class="hair-pick-btn group flex flex-col items-center p-1.5 rounded-xl border-2 bg-white transition active:scale-95 ${c.cabelloTipo === o ? 'border-indigo-600 ring-2 ring-indigo-200 shadow-xs' : 'border-stone-200 hover:border-indigo-300'}">
                        <img src="${HAIR_IMGS[o]}" alt="Cabello ${o}" class="w-full aspect-square object-cover rounded-lg bg-stone-100" />
                        <span class="text-[11px] font-bold mt-1 ${c.cabelloTipo === o ? 'text-indigo-700' : 'text-slate-700'}">${o}</span>
                      </button>
                    `).join('')}
                    <button type="button" data-hair-pick="Otro" class="hair-pick-btn flex flex-col items-center justify-center p-2 rounded-xl border-2 bg-white transition active:scale-95 min-h-[92px] ${c.cabelloTipo === 'Otro' ? 'border-indigo-600 ring-2 ring-indigo-200 text-indigo-700 shadow-xs' : 'border-stone-200 text-slate-600 hover:border-indigo-300'}">
                      <i data-lucide="pen-line" class="w-5 h-5 mb-1"></i>
                      <span class="text-[11px] font-bold">Otro</span>
                    </button>
                  </div>
                  ${c.cabelloTipo === 'Otro' ? `<div class="flex gap-1.5"><input type="text" data-cfield="cabelloOtro" value="${esc(c.cabelloOtro)}" placeholder="Describe el estilo de cabello..." class="flex-1 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs" />${micBtn('data-cmic="cabelloOtro"')}</div>` : ''}
                  <div>
                    <span class="block text-[11px] font-bold text-slate-600 mb-1">Color de cabello</span>
                    ${renderColorSwatchBar({
                      items: mapObjToSwatches(HAIR_COLORS),
                      selectedName: c.cabelloColor,
                      customHex: c.cabelloColorHex,
                      customText: c.cabelloColorOtro,
                      scope: 'char', nameKey: 'cabelloColor', hexKey: 'cabelloColorHex', textKey: 'cabelloColorOtro',
                      micAttr: 'data-cmic="cabelloColorOtro"',
                      placeholder: 'Color de cabello personalizado...'
                    })}
                  </div>
                </div>
              ` : '<p class="text-[11px] text-slate-400 mt-1.5 pl-6">Actívalo para elegir el peinado y color de cabello en 3D.</p>'}
            </div>

            ${c.genero === 'Hombre' ? `
              <!-- Barba y bigote (EXCLUSIVO PARA HOMBRE: estilo + bolitas de color + paleta libre + cuentagotas) -->
              <div class="p-3.5 rounded-2xl border ${c.chkBarba ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
                <div class="flex items-center justify-between gap-2">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" data-cchk="chkBarba" class="w-4 h-4 accent-indigo-600" ${c.chkBarba ? 'checked' : ''} />
                    <span class="text-xs font-bold text-slate-800">Barba y bigote (estilo y color)</span>
                  </label>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">Solo Hombre</span>
                </div>
                ${c.chkBarba ? `
                  <div class="space-y-2.5 mt-2.5">
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      ${BARBA_TIPOS.map(bt => `
                        <button type="button" data-beard-pick="${esc(bt.id)}" class="beard-pick-btn flex flex-col items-start px-2.5 py-2 rounded-xl border-2 text-left transition active:scale-95 ${c.barbaTipo === bt.id ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs' : 'border-stone-200 bg-white text-slate-700 hover:border-indigo-300'}">
                          <span class="text-[11px] font-bold leading-tight">${esc(bt.short)}</span>
                          <span class="text-[9.5px] leading-tight mt-0.5 ${c.barbaTipo === bt.id ? 'text-indigo-100' : 'text-slate-400'}">${esc(bt.sub)}</span>
                        </button>
                      `).join('')}
                    </div>
                    ${c.barbaTipo === 'Otro' ? `<div class="flex gap-1.5"><input type="text" data-cfield="barbaOtro" value="${esc(c.barbaOtro)}" placeholder="Ej: barba estilo vikingo, bigote fino..." class="flex-1 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs" />${micBtn('data-cmic="barbaOtro"')}</div>` : ''}
                    <div>
                      <span class="block text-[11px] font-bold text-slate-600 mb-1">Color de barba</span>
                      ${renderColorSwatchBar({
                        items: mapObjToSwatches(BARBA_COLORS),
                        selectedName: c.barbaColor,
                        customHex: c.barbaColorHex,
                        customText: c.barbaColorOtro,
                        scope: 'char', nameKey: 'barbaColor', hexKey: 'barbaColorHex', textKey: 'barbaColorOtro',
                        micAttr: 'data-cmic="barbaColorOtro"',
                        allowNone: true,
                        noneLabel: 'Igual al cabello',
                        placeholder: 'Color de barba personalizado...'
                      })}
                    </div>
                  </div>
                ` : '<p class="text-[11px] text-slate-400 mt-1.5 pl-6">Actívalo para añadir barba o bigote en 3D y elegir su color.</p>'}
              </div>
            ` : ''}

            <!-- Color de ojos (ícono dinámico + bolitas con pix + "+" + cuentagotas) -->
            <div class="p-3.5 rounded-2xl border ${c.chkOjos ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
              <div class="flex items-center justify-between gap-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" data-cchk="chkOjos" class="w-4 h-4 accent-indigo-600" ${c.chkOjos ? 'checked' : ''} />
                  <span class="text-xs font-bold text-slate-800">Color de ojos</span>
                </label>
                <div id="dynamicEyePreview" class="flex items-center gap-1.5">
                  ${renderEyeIconSVG(c.ojosColor === 'Otro' ? (c.ojosColorHex || '#2563EB') : numToHex(EYE_COLORS[c.ojosColor] || 0x0F172A))}
                </div>
              </div>
              ${c.chkOjos ? renderColorSwatchBar({
                items: mapObjToSwatches(EYE_COLORS),
                selectedName: c.ojosColor,
                customHex: c.ojosColorHex,
                customText: c.ojosColorOtro,
                scope: 'char', nameKey: 'ojosColor', hexKey: 'ojosColorHex', textKey: 'ojosColorOtro',
                micAttr: 'data-cmic="ojosColorOtro"',
                placeholder: 'Color de ojos personalizado...'
              }) : '<p class="text-[11px] text-slate-400 mt-1.5 pl-6">Actívalo para definir el color de los ojos.</p>'}
            </div>
          </div>
        ` : `
          <div class="space-y-3">
            <!-- Complexión física (con vista de cuerpo completo en el 3D) -->
            <div class="p-3.5 rounded-2xl border ${c.chkComplexion ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" data-cchk="chkComplexion" class="w-4 h-4 accent-indigo-600" ${c.chkComplexion ? 'checked' : ''} />
                <span class="text-xs font-bold text-slate-800">Complexión física</span>
              </label>
              ${c.chkComplexion ? `
                <div class="space-y-2 mt-2.5">
                  <div class="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    ${['Ninguno', 'Delgado', 'Promedio', 'Atlético', 'Robusto', 'Otro'].map(o => `
                      <button type="button" data-complexion-pick="${o}" class="complexion-pick-btn py-1.5 px-2 rounded-xl border-2 text-[11px] font-bold transition active:scale-95 ${c.complexionTipo === o ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs' : 'border-stone-200 bg-white text-slate-600 hover:border-indigo-300'}">${o}</button>
                    `).join('')}
                  </div>
                  ${c.complexionTipo === 'Otro' ? `<div class="flex gap-1.5"><input type="text" data-cfield="complexionOtro" value="${esc(c.complexionOtro)}" placeholder="Describe la complexión física..." class="flex-1 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs" />${micBtn('data-cmic="complexionOtro"')}</div>` : ''}
                </div>
              ` : '<p class="text-[11px] text-slate-400 mt-1.5 pl-6">Actívalo para ajustar la contextura del cuerpo en tiempo real.</p>'}
            </div>

            <!-- Tono de piel (bolitas con pix + "+" + cuentagotas) -->
            <div class="p-3.5 rounded-2xl border ${c.chkPiel ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" data-cchk="chkPiel" class="w-4 h-4 accent-indigo-600" ${c.chkPiel ? 'checked' : ''} />
                <span class="text-xs font-bold text-slate-800">Tono de piel</span>
              </label>
              ${c.chkPiel ? renderColorSwatchBar({
                items: mapObjToSwatches(SKIN_TONES, ['Neutro (maniquí)']),
                selectedName: c.pielTono,
                customHex: c.pielTonoHex,
                customText: c.pielTonoOtro,
                scope: 'char', nameKey: 'pielTono', hexKey: 'pielTonoHex', textKey: 'pielTonoOtro',
                micAttr: 'data-cmic="pielTonoOtro"',
                placeholder: 'Describe o elige un tono de piel...'
              }) : '<p class="text-[11px] text-slate-400 mt-1.5 pl-6">Actívalo para seleccionar el tono de piel.</p>'}
            </div>

            <!-- Otros rasgos adicionales -->
            <div class="p-3.5 rounded-2xl border ${c.otrosRasgos && c.otrosRasgos.trim() ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
              <label class="block text-xs font-bold text-slate-800 mb-1.5">Otros rasgos físicos o detalles</label>
              <div class="flex gap-1.5">
                <input type="text" data-cfield="otrosRasgos" value="${esc(c.otrosRasgos)}" placeholder="Ej. pecas, hoyuelos, barba, bigote, lunar, estatura alta..." class="flex-1 px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs" />
                ${micBtn('data-cmic="otrosRasgos"')}
              </div>
            </div>
          </div>
        `}
      `;
    } else if (c.cat === 'Animal') {
      inner = renderDynamicAnimalRasgos(c);
    } else {
      const opts = c.cat === 'Objeto' ? ['Ninguno', 'De madera', 'Metálico', 'De plástico colorido', 'De vidrio', 'De papel / cartón', 'Otro'] : ['Ninguno', 'Pelaje suave', 'Plumas coloridas', 'Escamas brillantes', 'Textura de felpa', 'Metálico', 'Otro'];
      inner = `
        <div class="space-y-2.5">
          <div class="p-3.5 rounded-2xl border ${c.chkTextura ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
            <label class="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" data-cchk="chkTextura" class="w-4 h-4 accent-indigo-600" ${c.chkTextura ? 'checked' : ''} />
              <span class="text-xs font-bold text-slate-800">${c.cat === 'Objeto' ? 'Material y acabado' : 'Textura o acabado'}</span>
            </label>
            ${c.chkTextura ? `
              <div class="mt-2 space-y-2">
                <select data-cfield="texturaTipo" class="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs">
                  ${opts.map(o => `<option value="${o}" ${c.texturaTipo === o ? 'selected' : ''}>${o}</option>`).join('')}
                </select>
                ${c.texturaTipo === 'Otro' ? `<div class="flex gap-1.5"><input type="text" data-cfield="texturaOtro" value="${esc(c.texturaOtro)}" placeholder="Describe textura o material..." class="flex-1 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs" />${micBtn('data-cmic="texturaOtro"')}</div>` : ''}
              </div>
            ` : ''}
          </div>

          <div class="p-3.5 rounded-2xl border ${c.chkColorPrincipal ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
            <label class="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" data-cchk="chkColorPrincipal" class="w-4 h-4 accent-indigo-600" ${c.chkColorPrincipal ? 'checked' : ''} />
              <span class="text-xs font-bold text-slate-800">Color principal</span>
            </label>
            ${c.chkColorPrincipal ? renderColorSwatchBar({
              items: mapObjToSwatches(SUBJECT_COLORS),
              selectedName: c.principalColor,
              customHex: c.principalColorHex,
              customText: c.principalColorOtro,
              scope: 'char', nameKey: 'principalColor', hexKey: 'principalColorHex', textKey: 'principalColorOtro',
              micAttr: 'data-cmic="principalColorOtro"',
              placeholder: 'Color personalizado...'
            }) : ''}
          </div>

          <div class="p-3.5 rounded-2xl border ${c.otrosRasgos && c.otrosRasgos.trim() ? 'border-indigo-300 bg-indigo-50/40' : 'border-stone-200 bg-stone-50/60'}">
            <label class="block text-xs font-bold text-slate-800 mb-1.5">Otros rasgos adicionales</label>
            <div class="flex gap-1.5">
              <input type="text" data-cfield="otrosRasgos" value="${esc(c.otrosRasgos)}" placeholder="Detalles visuales adicionales..." class="flex-1 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs" />
              ${micBtn('data-cmic="otrosRasgos"')}
            </div>
          </div>
        </div>
      `;
    }
  } else {
    // Ropa y Objeto (with unified color swatches + pattern + material + detail chips + free text!)
    const items = ROPA_CATS[c.ropaZona] || ROPA_CATS['Cuerpo'];
    const activeExtras = Array.isArray(c.ropaExtras) ? c.ropaExtras : [];
    inner = `
      <div class="space-y-3">
        <div class="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
          ${[['Cabeza','crown'],['Rostro','glasses'],['Cuerpo','shirt'],['Entero','user-check'],['Zapatos','footprints']].map(([z, ic]) => `<button type="button" data-rzona="${z}" class="rzona-btn flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl text-xs font-bold border transition active:scale-95 ${c.ropaZona === z ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' : 'bg-stone-50 text-slate-600 border-stone-200 hover:border-indigo-300'}"><i data-lucide="${ic}" class="w-3.5 h-3.5 shrink-0"></i><span>${z}</span></button>`).join('')}
        </div>

        <div class="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
            <div class="${c.ropaItem === 'Otro' ? 'sm:col-span-5' : 'sm:col-span-12'}">
              <label class="block text-xs font-bold text-slate-700 mb-1">Prenda en ${c.ropaZona}</label>
              <select data-cfield="ropaItem" class="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm">
                ${items.map(it => `<option value="${it}" ${c.ropaItem === it ? 'selected' : ''}>${it}</option>`).join('')}
              </select>
            </div>
            ${c.ropaItem === 'Otro' ? `
              <div class="sm:col-span-7">
                <label class="block text-xs font-bold text-slate-700 mb-1">Nombre de la prenda</label>
                <div class="flex gap-1.5">
                  <input type="text" data-cfield="ropaOtro" value="${esc(c.ropaOtro)}" placeholder="Ej. boina andina, capa, chalina..." class="flex-1 px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs" />
                  ${micBtn('data-cmic="ropaOtro"')}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Unified Color Swatches for Garment -->
          <div>
            <label class="block text-xs font-bold text-slate-700">Color de la prenda (opcional)</label>
            ${renderColorSwatchBar({
              items: mapObjToSwatches(ROPA_COLORS),
              selectedName: c.ropaColor,
              customHex: c.ropaColorHex,
              customText: c.ropaColorOtro,
              scope: 'char', nameKey: 'ropaColor', hexKey: 'ropaColorHex', textKey: 'ropaColorOtro',
              micAttr: 'data-cmic="ropaColorOtro"',
              allowNone: true, noneLabel: 'Sin especificar',
              placeholder: 'Ej. verde oliva, guinda, turquesa...'
            })}
          </div>

          <!-- Additional Clothing Details: Estampado + Material + Quick Chips -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label class="block text-[11px] font-bold text-slate-700 mb-1">Diseño / Estampado</label>
              <select data-cfield="ropaEstampado" class="w-full px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs">
                ${ROPA_ESTAMPADOS.map(o => `<option value="${o}" ${c.ropaEstampado === o ? 'selected' : ''}>${o}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-700 mb-1">Material / Tela</label>
              <select data-cfield="ropaMaterial" class="w-full px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs">
                ${ROPA_MATERIALES.map(o => `<option value="${o}" ${c.ropaMaterial === o ? 'selected' : ''}>${o}</option>`).join('')}
              </select>
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-bold text-slate-700 mb-1.5">Detalles rápidos de la prenda (clic para activar)</label>
            <div class="flex flex-wrap gap-1.5">
              ${ROPA_EXTRAS_CHIPS.map(chip => {
                const on = activeExtras.includes(chip);
                return `<button type="button" data-ropa-extra="${esc(chip)}" class="ropa-extra-btn px-2.5 py-1 rounded-full text-[11px] font-bold border transition active:scale-95 ${on ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' : 'bg-white text-slate-600 border-stone-200 hover:border-indigo-300'}">${chip}</button>`;
              }).join('')}
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
            <div class="sm:col-span-9">
              <label class="block text-xs font-bold text-slate-700 mb-1">Detalle libre adicional (opcional)</label>
              <div class="flex gap-1.5">
                <input type="text" data-cfield="ropaDetalle" value="${esc(c.ropaDetalle)}" placeholder="${c.ropaZona === 'Cabeza' ? 'Ej. con cinta roja, ala ancha, bordado andino...' : 'Ej. con cuello blanco, botones dorados, insignia escolar...'}" class="flex-1 px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs" />
                ${micBtn('data-cmic="ropaDetalle"')}
              </div>
            </div>
            <div class="sm:col-span-3">
              <button id="btnAddRopa" type="button" class="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs active:scale-95 transition">+ Añadir prenda</button>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-1.5">
          ${c.ropaList.length ? c.ropaList.map((item, idx) => {
            const hx = getRopaHex(item);
            const lbl = formatRopaItemText(item);
            return `
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                ${hx ? `<span class="w-3 h-3 rounded-full border border-slate-400/50 shrink-0" style="background:${esc(hx)};"></span>` : ''}
                <span>${esc(lbl)}</span>
                <button type="button" data-del-ropa="${idx}" class="del-ropa text-indigo-400 hover:text-rose-600"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
              </span>
            `;
          }).join('') : '<span class="text-xs text-slate-400 italic">Añade prendas con su color, tela, estampado y detalles para cabeza, rostro, cuerpo, entero o zapatos.</span>'}
        </div>

        <!-- Objeto sostenido con check -->
        <div class="p-3 rounded-2xl border ${c.chkObjetoMano ? 'border-emerald-300 bg-emerald-50/40' : 'border-stone-200 bg-stone-50'}">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" data-cchk="chkObjetoMano" class="w-4 h-4 accent-emerald-600" ${c.chkObjetoMano ? 'checked' : ''} />
            <span class="text-xs font-bold text-slate-800">Sostiene algún objeto en la mano</span>
          </label>
          ${c.chkObjetoMano ? `
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <select data-cfield="objetoManoItem" class="px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs">
                ${OBJETOS_MANO.map(o => `<option value="${o}" ${c.objetoManoItem === o ? 'selected' : ''}>${o}</option>`).join('')}
              </select>
              ${c.objetoManoItem === 'Otro' ? `<div class="flex gap-1"><input type="text" data-cfield="objetoManoOtro" value="${esc(c.objetoManoOtro)}" placeholder="¿Qué objeto sostiene?" class="flex-1 px-2.5 py-1 rounded-lg bg-white border text-xs" />${micBtn('data-cmic="objetoManoOtro"')}</div>` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  return `
    <div class="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">2</div>
          <div><h2 class="text-lg font-extrabold">Personaje(s)</h2><p class="text-xs text-slate-500">Tipo, rasgos físicos, ropa y objeto</p></div>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          ${state.characters.map((ch, i) => `
            <button type="button" data-sel-char="${i}" class="sel-char-btn px-2.5 py-1 rounded-lg text-xs font-bold border ${i === state.activeCharIdx ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-stone-50 text-slate-600 border-stone-200'}">Sujeto ${i + 1}</button>
          `).join('')}
          <button id="btnAddChar" type="button" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100">+ Añadir</button>
          ${state.characters.length > 1 ? `<button id="btnDelChar" type="button" class="p-1.5 rounded-lg text-rose-600 bg-rose-50 hover:bg-rose-100"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>` : ''}
        </div>
      </div>
      <div class="flex flex-wrap gap-1.5 bg-stone-100 p-1 rounded-xl">
        ${tabs.map(([id, lbl, ic]) => `<button type="button" data-char-tab="${id}" class="char-tab-btn flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition ${state.charTab === id ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}"><i data-lucide="${ic}" class="w-3.5 h-3.5 shrink-0"></i><span>${lbl}</span></button>`).join('')}
      </div>
      ${inner}
    </div>
  `;
}

// --- DEDICATED STEP 3: Emoción y Postura en 2 Subpestañas separadas ---
function renderStep3EmocionPostura() {
  const c = state.characters[state.activeCharIdx] || state.characters[0];
  const showEmotion = !(c.cat === 'Objeto' && c.modoForma === 'Normal');
  const s3Tab = showEmotion ? (state.step3Tab || 'emocion') : 'postura';

  return `
    <div class="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-black">3</div>
          <div>
            <h2 class="text-lg font-extrabold text-slate-900">Emoción y Postura</h2>
            <p class="text-xs text-slate-500">Elige la expresión facial y luego la postura o acción corporal</p>
          </div>
        </div>
        ${state.characters.length > 1 ? `
          <div class="flex items-center gap-1.5 flex-wrap">
            ${state.characters.map((ch, i) => `
              <button type="button" data-sel-char="${i}" class="sel-char-btn px-2.5 py-1 rounded-lg text-xs font-bold border ${i === state.activeCharIdx ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-stone-50 text-slate-600 border-stone-200'}">Sujeto ${i + 1}</button>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Subpestañas separadas: Emoción | Postura y Encuadre -->
      <div class="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-cyan-50/70 border border-cyan-100">
        <button type="button" data-step3-tab="emocion" class="step3-subtab-btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition ${s3Tab === 'emocion' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-600 hover:text-cyan-700'} ${!showEmotion ? 'opacity-50' : ''}">
          <i data-lucide="smile" class="w-4 h-4 shrink-0"></i>
          <span>Emoción</span>
          ${showEmotion && !isNoneVal(c.emocion) ? `<span class="hidden sm:inline text-[10px] font-semibold text-cyan-600 truncate max-w-[90px]">· ${esc(c.emocion)}</span>` : ''}
        </button>
        <button type="button" data-step3-tab="postura" class="step3-subtab-btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition ${s3Tab === 'postura' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-600 hover:text-cyan-700'}">
          <i data-lucide="activity" class="w-4 h-4 shrink-0"></i>
          <span>Postura y Posición</span>
        </button>
      </div>

      ${s3Tab === 'emocion' ? `
        <div class="space-y-3">
          ${showEmotion ? `
            <div class="flex flex-wrap items-center justify-between gap-2">
              <label class="flex items-center gap-1.5 text-xs font-bold text-slate-700"><i data-lucide="smile" class="w-3.5 h-3.5 text-cyan-600"></i><span>Emoción (${EMOTION_MASKS.length} máscaras expresivas · actualiza el rostro 3D)</span></label>
              ${!isNoneVal(c.emocion) ? `<span class="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-extrabold border border-cyan-200">${esc(c.emocion)}</span>` : ''}
            </div>
            <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-1.5 max-h-[340px] overflow-y-auto custom-scroll p-1.5 rounded-2xl bg-stone-50/50 border border-stone-100">
              <button type="button" data-emocion="Ninguno" class="emocion-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-2xl border-2 transition active:scale-95 ${isNoneVal(c.emocion) ? 'border-cyan-600 bg-cyan-50/80 text-cyan-800 shadow-sm' : 'border-stone-200 bg-white text-slate-600 hover:border-cyan-300'}">
                <div class="w-9 h-9 rounded-full border-2 border-dashed ${isNoneVal(c.emocion) ? 'border-cyan-500 bg-white text-cyan-600' : 'border-stone-300 bg-stone-50 text-slate-400'} flex items-center justify-center">
                  <i data-lucide="ban" class="w-4 h-4"></i>
                </div>
                <span class="text-[10px] font-extrabold leading-tight">Ninguno</span>
              </button>
              ${EMOTION_MASKS.map(em => `
                <button type="button" data-emocion="${em.id}" title="${em.id}" class="emocion-btn flex flex-col items-center gap-1 p-1.5 rounded-2xl border-2 transition active:scale-95 ${c.emocion === em.id ? 'border-cyan-600 bg-cyan-50/80 shadow-sm' : 'border-stone-200 bg-white hover:border-cyan-300'}">
                  ${em.svg}
                  <span class="text-[10px] font-extrabold ${c.emocion === em.id ? 'text-cyan-800' : 'text-slate-700'} leading-tight text-center truncate w-full">${em.short || em.id}</span>
                </button>
              `).join('')}
              <button type="button" data-emocion="Otro" class="emocion-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-2xl border-2 transition active:scale-95 ${c.emocion === 'Otro' ? 'border-cyan-600 bg-cyan-50/80 text-cyan-800 shadow-sm' : 'border-stone-200 bg-white text-slate-600 hover:border-cyan-300'}">
                <div class="w-9 h-9 rounded-full border-2 border-dashed ${c.emocion === 'Otro' ? 'border-cyan-500 bg-white text-cyan-600' : 'border-stone-300 bg-stone-50 text-slate-500'} flex items-center justify-center">
                  <i data-lucide="pen-line" class="w-4 h-4"></i>
                </div>
                <span class="text-[10px] font-extrabold leading-tight">Otro</span>
              </button>
            </div>
            ${c.emocion === 'Otro' ? `
              <div class="flex gap-1.5">
                <input type="text" data-cfield="emocionOtro" value="${esc(c.emocionOtro)}" placeholder="Escribe la emoción personalizada..." class="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm" />
                ${micBtn('data-cmic="emocionOtro"')}
              </div>
            ` : ''}
          ` : `
            <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-500">
              <i data-lucide="info" class="w-4 h-4 shrink-0 text-slate-400"></i>
              <span>Los objetos normales no llevan emoción facial; usa la subpestaña <strong>Postura y Posición</strong>.</span>
            </div>
          `}
        </div>
      ` : `
        <div class="space-y-4">
          <!-- Posturas separadas claramente en: Sin objetos vs Con objetos (con modelo 3D) -->
          ${(() => {
            const noObjCards = ACCION_CARDS.filter(ac => !ac.hasObj);
            const objCards = ACCION_CARDS.filter(ac => ac.hasObj);
            const mode = state.accionObjMode === 'con' ? 'con' : 'sin';
            const modeCards = mode === 'con' ? objCards : noObjCards;
            const modeCats = mode === 'con' ? ACCION_OBJ_CATS : ACCION_NO_OBJ_CATS;
            const activeCat = modeCats.includes(state.accionFilter) ? state.accionFilter : 'Todas';
            const visibleCards = modeCards.filter(ac => activeCat === 'Todas' || ac.cat === activeCat);
            return `
              <div class="space-y-2.5">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <label class="flex items-center gap-1.5 text-xs font-bold text-slate-700"><i data-lucide="activity" class="w-3.5 h-3.5 text-cyan-600"></i><span>Acción o postura (${ACCION_CARDS.length} posturas 3D articuladas)</span></label>
                  ${!isNoneVal(c.accionTipo) ? `<span class="px-2 py-0.5 rounded-full ${isPostureWithObject(c.accionTipo) ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-cyan-50 text-cyan-700 border-cyan-200'} text-[10px] font-extrabold border truncate max-w-[210px]">${esc(c.accionTipo)}</span>` : ''}
                </div>

                <!-- Selector principal: Sin objetos | Con objetos (Modelo 3D) -->
                <div class="grid grid-cols-2 gap-2">
                  <button type="button" data-accion-mode="sin" class="accion-mode-btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border-2 text-xs font-extrabold transition active:scale-95 ${mode === 'sin' ? 'border-cyan-600 bg-cyan-50 text-cyan-800 shadow-xs' : 'border-stone-200 bg-stone-50 text-slate-600 hover:border-cyan-300'}">
                    <i data-lucide="accessibility" class="w-4 h-4 shrink-0"></i>
                    <span>Sin objetos</span>
                    <span class="px-1.5 py-0.5 rounded-full text-[10px] ${mode === 'sin' ? 'bg-cyan-600 text-white' : 'bg-stone-200 text-slate-600'}">${noObjCards.length}</span>
                  </button>
                  <button type="button" data-accion-mode="con" class="accion-mode-btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border-2 text-xs font-extrabold transition active:scale-95 ${mode === 'con' ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-xs' : 'border-stone-200 bg-stone-50 text-slate-600 hover:border-amber-300'}">
                    <i data-lucide="boxes" class="w-4 h-4 shrink-0"></i>
                    <span>Con objetos (3D)</span>
                    <span class="px-1.5 py-0.5 rounded-full text-[10px] ${mode === 'con' ? 'bg-amber-500 text-white' : 'bg-stone-200 text-slate-600'}">${objCards.length}</span>
                  </button>
                </div>

                ${mode === 'con' ? `
                  <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-800">
                    <i data-lucide="box" class="w-3.5 h-3.5 shrink-0 text-amber-600"></i>
                    <span>Cada postura incluye su objeto o mobiliario completo en el visor 3D (libro, laptop, guitarra, caballete, pizarra, pesas, paraguas...).</span>
                  </div>
                ` : ''}

                <!-- Subcategorías del grupo activo -->
                <div class="flex flex-wrap gap-1.5">
                  ${modeCats.map(cat => `
                    <button type="button" data-accion-cat="${cat}" class="accion-cat-btn px-2.5 py-1 rounded-full text-[11px] font-bold transition active:scale-95 ${activeCat === cat ? (mode === 'con' ? 'bg-amber-600 text-white shadow-xs' : 'bg-cyan-600 text-white shadow-xs') : 'bg-stone-100 text-slate-600 hover:bg-stone-200'}">${cat}</button>
                  `).join('')}
                </div>

                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 max-h-64 overflow-y-auto custom-scroll p-1 rounded-2xl bg-stone-50/50 border border-stone-100">
                  <button type="button" data-accion-pick="Ninguno" title="Sin acción específica" class="accion-pick-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-2xl border-2 transition active:scale-95 ${isNoneVal(c.accionTipo) ? 'border-cyan-600 bg-cyan-50/80 text-cyan-800 shadow-sm' : 'border-stone-200 bg-white text-slate-600 hover:border-cyan-300'}">
                    <div class="w-10 h-10 rounded-xl border-2 border-dashed ${isNoneVal(c.accionTipo) ? 'border-cyan-500 bg-white text-cyan-600' : 'border-stone-300 bg-stone-50 text-slate-400'} flex items-center justify-center">
                      <i data-lucide="ban" class="w-4 h-4"></i>
                    </div>
                    <span class="text-[10px] font-extrabold leading-tight">Ninguno</span>
                  </button>
                  ${visibleCards.map(ac => `
                    <button type="button" data-accion-pick="${ac.id}" title="${ac.id}" class="accion-pick-btn relative flex flex-col items-center gap-1 p-1.5 rounded-2xl border-2 transition active:scale-95 ${c.accionTipo === ac.id ? (ac.hasObj ? 'border-amber-500 bg-amber-50/80 shadow-sm' : 'border-cyan-600 bg-cyan-50/80 shadow-sm') : 'border-stone-200 bg-white hover:border-cyan-300'}">
                      ${ac.hasObj ? `<span class="absolute top-1 right-1 px-1 py-0.2 rounded bg-amber-500 text-white text-[8px] font-black leading-tight">3D</span>` : ''}
                      ${ac.svg}
                      <span class="text-[10px] font-extrabold text-center leading-tight truncate w-full ${c.accionTipo === ac.id ? (ac.hasObj ? 'text-amber-800' : 'text-cyan-800') : 'text-slate-700'}">${ac.short}</span>
                    </button>
                  `).join('')}
                  <button type="button" data-accion-pick="Otro" class="accion-pick-btn flex flex-col items-center justify-center gap-1 p-1.5 rounded-2xl border-2 transition active:scale-95 ${c.accionTipo === 'Otro' ? 'border-cyan-600 bg-cyan-50/80 text-cyan-800 shadow-sm' : 'border-stone-200 bg-white text-slate-600 hover:border-cyan-300'}">
                    <div class="w-10 h-10 rounded-xl border-2 border-dashed ${c.accionTipo === 'Otro' ? 'border-cyan-500 bg-white text-cyan-600' : 'border-stone-300 bg-stone-50 text-slate-500'} flex items-center justify-center">
                      <i data-lucide="pen-line" class="w-4 h-4"></i>
                    </div>
                    <span class="text-[10px] font-extrabold leading-tight">Otro</span>
                  </button>
                </div>
                ${c.accionTipo === 'Otro' ? `
                  <div class="flex gap-2">
                    <input type="text" data-cfield="accionOtro" value="${esc(c.accionOtro)}" placeholder="Describe la acción o postura personalizada..." class="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm" />
                    ${micBtn('data-cmic="accionOtro"')}
                  </div>
                ` : ''}
              </div>
            `;
          })()}

          <!-- Controles SEPARADOS: Tamaño y Posición -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3.5 rounded-2xl border-2 ${c.activarTamano ? 'border-cyan-500 bg-cyan-50/50' : 'border-stone-200 bg-stone-50'}">
              <label class="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" data-cchk="activarTamano" class="w-4 h-4 accent-cyan-600" ${c.activarTamano ? 'checked' : ''} />
                <span class="text-xs sm:text-sm font-bold text-slate-800">Activar tamaño</span>
              </label>
              ${c.activarTamano ? `
                <div class="mt-3 space-y-2.5">
                  <div class="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Escala</span>
                    <span class="text-cyan-700" id="escalaVal">${c.escala}%</span>
                  </div>
                  <input type="range" min="55" max="145" value="${c.escala}" data-cfield="escala" class="w-full accent-cyan-600" />
                  <div class="grid grid-cols-3 gap-1.5">
                    ${[['Pequeño', 70], ['Mediano', 100], ['Grande', 132]].map(([lbl, val]) => `
                      <button type="button" data-set-escala="${val}" class="set-escala-btn py-1 px-2 rounded-lg text-[11px] font-bold border transition active:scale-95 ${Math.abs(c.escala - val) <= 12 ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-slate-600 border-stone-200 hover:border-cyan-300'}">${lbl}</button>
                    `).join('')}
                  </div>
                  <div class="text-[11px] font-semibold text-cyan-800" id="scaleWordVal">${scaleToWord(c.escala)}</div>
                </div>
              ` : '<p class="text-[11px] text-slate-400 mt-1.5">Actívalo para controlar si el sujeto es pequeño, mediano o grande.</p>'}
            </div>

            <div class="p-3.5 rounded-2xl border-2 ${c.activarPosicion ? 'border-emerald-500 bg-emerald-50/40' : 'border-stone-200 bg-stone-50'}">
              <label class="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" data-cchk="activarPosicion" class="w-4 h-4 accent-emerald-600" ${c.activarPosicion ? 'checked' : ''} />
                <span class="text-xs sm:text-sm font-bold text-slate-800">Activar posición</span>
              </label>
              ${c.activarPosicion ? `
                <div class="mt-3 space-y-2.5">
                  <div class="text-[11px] text-slate-600 font-semibold">Haz clic o arrastra en el recuadro para ubicar al personaje:</div>
                  <div id="posInteractivePad" class="pos-pad-box relative w-full h-32 rounded-xl bg-white border-2 border-emerald-300 overflow-hidden cursor-crosshair shadow-inner">
                    <div class="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
                      <div class="border-r border-b border-dashed border-stone-200"></div>
                      <div class="border-r border-b border-dashed border-stone-200 flex items-start justify-center pt-0.5"><span class="text-[9px] font-bold text-slate-400 uppercase">Arriba</span></div>
                      <div class="border-b border-dashed border-stone-200"></div>
                      <div class="border-r border-b border-dashed border-stone-200 flex items-center pl-1"><span class="text-[9px] font-bold text-slate-400 uppercase">Izq</span></div>
                      <div class="border-r border-b border-dashed border-stone-200 flex items-center justify-center"><span class="text-[9px] font-bold text-slate-300 uppercase">Centro</span></div>
                      <div class="border-b border-dashed border-stone-200 flex items-center justify-end pr-1"><span class="text-[9px] font-bold text-slate-400 uppercase">Der</span></div>
                      <div class="border-r border-dashed border-stone-200"></div>
                      <div class="border-r border-dashed border-stone-200 flex items-end justify-center pb-0.5"><span class="text-[9px] font-bold text-slate-400 uppercase">Abajo</span></div>
                      <div></div>
                    </div>
                    <div id="posInteractivePin" class="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-600 text-white border-2 border-white shadow-md flex items-center justify-center transition-[left,top] duration-75" style="left:${c.x}%; top:${c.y}%;">
                      <i data-lucide="user" class="w-3.5 h-3.5"></i>
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-1">
                    ${[['Arriba', 50, 22], ['Abajo', 50, 80], ['Izquierda', 22, 55], ['Centro', 50, 55], ['Derecha', 78, 55]].map(([lbl, px, py]) => `
                      <button type="button" data-pos-preset="${px},${py}" class="pos-preset-btn flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold bg-white border border-stone-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition active:scale-95">${lbl}</button>
                    `).join('')}
                  </div>
                  <div class="text-[11px] font-semibold text-emerald-700">Ubicación: <span id="posZoneVal">${coordsToZone(c.x, c.y)}</span></div>
                </div>
              ` : '<p class="text-[11px] text-slate-400 mt-1.5">Actívalo para ubicar arriba, abajo, izquierda, derecha o en el recuadro.</p>'}
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}

function renderStep4Escenario() {
  const isSolid = state.escenarioModo === 'Fondo sólido';
  return `
    <div class="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
      <div class="flex items-center gap-3 pb-3 border-b border-stone-100">
        <div class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">4</div>
        <div><h2 class="text-lg font-extrabold">Escenario y Fondo</h2><p class="text-xs text-slate-500">Fondo sólido neutro o escenario completo</p></div>
      </div>
      <div class="grid grid-cols-2 gap-2.5">
        <button type="button" data-esc-modo="Fondo sólido" class="esc-modo-btn flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-xs font-bold transition active:scale-95 ${isSolid ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs' : 'border-stone-200 bg-stone-50 text-slate-600 hover:border-emerald-300'}"><i data-lucide="square" class="w-4 h-4"></i><span>Fondo sólido</span></button>
        <button type="button" data-esc-modo="Escenario completo" class="esc-modo-btn flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-xs font-bold transition active:scale-95 ${!isSolid ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs' : 'border-stone-200 bg-stone-50 text-slate-600 hover:border-emerald-300'}"><i data-lucide="trees" class="w-4 h-4"></i><span>Escenario completo</span></button>
      </div>
      ${isSolid ? `
        <div class="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/70">
          <label class="block text-xs font-bold text-slate-700">Color de fondo sólido</label>
          ${renderColorSwatchBar({
            items: mapObjToSwatches(FONDO_SOLIDO_COLORS),
            selectedName: state.fondoSolido,
            customHex: state.fondoSolidoHex,
            customText: state.fondoSolidoOtro,
            scope: 'state', nameKey: 'fondoSolido', hexKey: 'fondoSolidoHex', textKey: 'fondoSolidoOtro',
            micAttr: 'data-fmic="fondoSolidoOtro"',
            placeholder: 'Ej. azul cielo, verde menta, amarillo suave...'
          })}
        </div>
      ` : `
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">Ubicación del escenario</label>
            <div class="flex gap-2">
              <input type="text" data-field="ubicacion" value="${esc(state.ubicacion)}" placeholder="Ej. aula de clases, biohuerto escolar, laboratorio..." class="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm" />
              ${micBtn('data-fmic="ubicacion"')}
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">Elementos de apoyo</label>
            <div class="flex gap-2">
              <input type="text" data-field="elementos" value="${esc(state.elementos)}" placeholder="Ej. pizarra verde, libros, plantas, montañas..." class="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm" />
              ${micBtn('data-fmic="elementos"')}
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}

function renderStep5Camara() {
  const pOn = state.chkPlano !== false;
  const aOn = state.chkAngulo !== false;
  const eOn = state.chkEnfoque !== false;
  const allOn = pOn && aOn && eOn;
  return `
    <div class="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">5</div>
          <div>
            <h2 class="text-lg font-extrabold">Cámara y Encuadre</h2>
            <p class="text-xs text-slate-500">16 planos, 16 ángulos y 16 enfoques · activa o desactiva cada control</p>
          </div>
        </div>
        <button id="btnToggleAllCam" type="button" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition active:scale-95 ${allOn ? 'bg-stone-100 text-slate-700 border-stone-200 hover:bg-stone-200' : 'bg-amber-600 text-white border-amber-600 hover:bg-amber-500'}">
          ${allOn ? 'Desactivar todos' : 'Activar todos'}
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div class="p-3.5 rounded-2xl border-2 transition ${pOn ? 'border-amber-400 bg-amber-50/40' : 'border-stone-200 bg-stone-50/70 opacity-80'}">
          <label class="flex items-center justify-between gap-2 cursor-pointer mb-2">
            <span class="flex items-center gap-1.5 text-xs font-bold text-slate-800"><i data-lucide="camera" class="w-4 h-4 text-amber-600"></i><span>Tipo de plano</span></span>
            <input type="checkbox" data-schk="chkPlano" class="w-4 h-4 accent-amber-600" ${pOn ? 'checked' : ''} />
          </label>
          ${pOn ? `
            <select data-field="plano" class="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm">
              ${PLANOS_OPTS.map(o => `<option value="${o}" ${state.plano === o ? 'selected' : ''}>${o}</option>`).join('')}
            </select>
          ` : '<p class="text-[11px] text-slate-400">Desactivado: no se añadirá tipo de plano al prompt.</p>'}
        </div>

        <div class="p-3.5 rounded-2xl border-2 transition ${aOn ? 'border-amber-400 bg-amber-50/40' : 'border-stone-200 bg-stone-50/70 opacity-80'}">
          <label class="flex items-center justify-between gap-2 cursor-pointer mb-2">
            <span class="flex items-center gap-1.5 text-xs font-bold text-slate-800"><i data-lucide="compass" class="w-4 h-4 text-amber-600"></i><span>Ángulo de cámara</span></span>
            <input type="checkbox" data-schk="chkAngulo" class="w-4 h-4 accent-amber-600" ${aOn ? 'checked' : ''} />
          </label>
          ${aOn ? `
            <select data-field="angulo" class="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm">
              ${ANGULOS_OPTS.map(o => `<option value="${o}" ${state.angulo === o ? 'selected' : ''}>${o}</option>`).join('')}
            </select>
          ` : '<p class="text-[11px] text-slate-400">Desactivado: no se añadirá ángulo de cámara al prompt.</p>'}
        </div>

        <div class="sm:col-span-2 light-dd-root p-3.5 rounded-2xl border-2 transition ${eOn ? 'border-amber-400 bg-amber-50/40' : 'border-stone-200 bg-stone-50/70 opacity-80'}">
          <div class="flex items-center justify-between gap-2 mb-2.5">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" data-schk="chkEnfoque" class="w-4 h-4 accent-amber-600" ${eOn ? 'checked' : ''} />
              <i data-lucide="aperture" class="w-4 h-4 text-amber-600"></i>
              <span class="text-xs font-extrabold text-slate-800">Enfoque, profundidad y lente (con imagen de referencia)</span>
            </label>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${eOn ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-slate-500'}">${eOn ? '16 referencias' : 'Inactivo'}</span>
          </div>
          ${eOn ? (() => {
            const isOpen = openLightDropdown === 'enfoque';
            const activeEnf = ENFOQUES_OPTS.find(o => o.label === state.enfoque) || ENFOQUES_OPTS[1];
            return `
              <div class="space-y-2.5">
                <div class="flex items-center gap-2">
                  <button type="button" data-light-dd-toggle="enfoque" class="light-dd-trigger flex-1 flex items-center justify-between gap-2.5 p-2 rounded-2xl bg-white border-2 transition text-left ${isOpen ? 'border-amber-500 ring-2 ring-amber-100' : 'border-stone-200 hover:border-amber-400'}">
                    <div class="flex items-center gap-2.5 min-w-0">
                      ${activeEnf && activeEnf.img ? `
                        <img src="${activeEnf.img}" alt="${esc(activeEnf.label)}" class="w-20 h-14 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-100" />
                      ` : `
                        <div class="w-20 h-14 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 text-slate-400 flex items-center justify-center shrink-0">
                          <i data-lucide="ban" class="w-4 h-4"></i>
                        </div>
                      `}
                      <div class="min-w-0">
                        <div class="text-[10px] font-bold uppercase tracking-wider text-amber-600">Referencia de profundidad activa</div>
                        <div class="text-xs sm:text-sm font-extrabold text-slate-900 truncate">${esc(activeEnf ? activeEnf.label : state.enfoque)}</div>
                        ${activeEnf && activeEnf.hint ? `<div class="text-[11px] text-slate-500 truncate">${esc(activeEnf.hint)}</div>` : ''}
                      </div>
                    </div>
                    <div class="flex items-center gap-1 pr-1 shrink-0">
                      <span class="text-[10px] font-bold text-slate-400 hidden sm:inline">${isOpen ? 'Ocultar' : 'Ver lentes'}</span>
                      <i data-lucide="${isOpen ? 'chevron-up' : 'chevron-down'}" class="w-4 h-4 text-amber-600"></i>
                    </div>
                  </button>
                  ${activeEnf && activeEnf.img ? `
                    <button type="button" data-light-zoom-img="${activeEnf.img}" data-light-zoom-title="${esc(activeEnf.label)}" data-light-zoom-cat="Enfoque y Profundidad de Lente" title="Ampliar referencia de enfoque" class="light-zoom-btn p-2.5 rounded-2xl bg-white border border-stone-200 text-slate-600 hover:border-amber-400 hover:text-amber-600 transition active:scale-95 shrink-0">
                      <i data-lucide="zoom-in" class="w-4 h-4"></i>
                    </button>
                  ` : ''}
                </div>

                ${isOpen ? `
                  <div class="img-dd-panel p-2.5 rounded-2xl bg-white border-2 border-amber-200 shadow-lg">
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-72 overflow-y-auto custom-scroll pr-1">
                      ${ENFOQUES_OPTS.map(opt => {
                        const isSel = opt.label === state.enfoque;
                        return `
                          <button type="button" data-light-dd-field="enfoque" data-light-dd-val="${esc(opt.label)}" class="light-dd-opt group relative rounded-xl overflow-hidden border-2 text-left transition active:scale-95 ${isSel ? 'border-amber-500 ring-2 ring-amber-200 shadow-md' : 'border-stone-200 bg-stone-50 hover:border-amber-400'}">
                            ${opt.img ? `
                              <div class="relative aspect-square bg-stone-200 overflow-hidden">
                                <img src="${opt.img}" alt="${esc(opt.label)}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                                ${isSel ? `<span class="pointer-events-none absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center shadow border border-white"><i data-lucide="check" class="w-3 h-3"></i></span>` : ''}
                                <div class="pointer-events-none absolute inset-x-0 bottom-0 p-1.5">
                                  <div class="text-[11px] font-extrabold text-white leading-tight truncate">${esc(opt.short || opt.label)}</div>
                                  <div class="text-[9px] text-amber-200 leading-tight line-clamp-2">${esc(opt.hint || '')}</div>
                                </div>
                              </div>
                            ` : `
                              <div class="aspect-square flex flex-col items-center justify-center p-2 text-center bg-stone-50">
                                <i data-lucide="ban" class="w-5 h-5 text-slate-400 mb-1"></i>
                                <span class="text-[11px] font-extrabold text-slate-600">${esc(opt.label)}</span>
                              </div>
                            `}
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>
                ` : ''}
              </div>
            `;
          })() : '<p class="text-[11px] text-slate-400">Desactivado: no se añadirá enfoque ni lente al prompt.</p>'}
        </div>
      </div>
    </div>
  `;
}

function renderImageLightingDropdown({ chkKey, fieldKey, title, subtitle, icon, options, currentVal, selectedList = null, multi = false, maxSelect = 3, isChecked }) {
  const isOpen = openLightDropdown === fieldKey;
  const selArr = multi
    ? (Array.isArray(selectedList) ? selectedList.filter(v => !isNoneVal(v)) : [])
    : (!isNoneVal(currentVal) ? [currentVal] : []);
  const primaryOpt = selArr.length ? (options.find(o => o.label === selArr[0]) || options[0]) : options[0];

  return `
    <div class="light-dd-root p-3.5 rounded-2xl border-2 transition ${isChecked ? 'border-orange-300 bg-orange-50/30' : 'border-stone-200 bg-stone-50/70 opacity-80'}">
      <div class="flex items-center justify-between gap-2 mb-2">
        <label class="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
          <input type="checkbox" data-schk="${chkKey}" class="w-4 h-4 accent-orange-600 shrink-0" ${isChecked ? 'checked' : ''} />
          <i data-lucide="${icon}" class="w-4 h-4 text-orange-600 shrink-0"></i>
          <div class="min-w-0">
            <div class="text-xs font-extrabold text-slate-800 truncate">${title}</div>
            <div class="text-[10px] text-slate-500 truncate">${subtitle}</div>
          </div>
        </label>
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${isChecked ? 'bg-orange-100 text-orange-700' : 'bg-stone-200 text-slate-500'}">
          ${isChecked ? (multi ? `${selArr.length}/${maxSelect} capas` : 'Activo') : 'Inactivo'}
        </span>
      </div>

      ${isChecked ? `
        ${multi && selArr.length ? `
          <div class="flex flex-wrap gap-1.5 mb-2">
            ${selArr.map((val, idx) => `
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-extrabold shadow-xs">
                <span class="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center text-[9px]">${idx + 1}</span>
                <span class="truncate max-w-[170px]">${esc(val)}</span>
                <button type="button" data-light-chip-field="${fieldKey}" data-light-chip-val="${esc(val)}" class="light-chip-remove hover:text-amber-200 ml-0.5"><i data-lucide="x" class="w-3 h-3"></i></button>
              </span>
            `).join('')}
          </div>
        ` : ''}

        <div class="flex items-center gap-2">
          <button type="button" data-light-dd-toggle="${fieldKey}" class="light-dd-trigger flex-1 flex items-center justify-between gap-2.5 p-2 rounded-2xl bg-white border-2 transition text-left ${isOpen ? 'border-orange-500 ring-2 ring-orange-100' : 'border-stone-200 hover:border-orange-400'}">
            <div class="flex items-center gap-2.5 min-w-0">
              ${primaryOpt && primaryOpt.img ? `
                <div class="relative shrink-0">
                  <img src="${primaryOpt.img}" alt="${esc(primaryOpt.label)}" class="w-16 h-11 rounded-xl object-cover border border-stone-200 bg-stone-100" />
                  ${multi && selArr.length > 1 ? `<span class="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-orange-600 text-white text-[9px] font-black shadow border border-white">+${selArr.length - 1}</span>` : ''}
                </div>
              ` : `
                <div class="w-16 h-11 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 text-slate-400 flex items-center justify-center shrink-0">
                  <i data-lucide="ban" class="w-4 h-4"></i>
                </div>
              `}
              <div class="min-w-0">
                <div class="text-[10px] font-bold uppercase tracking-wider text-orange-600">${multi ? (selArr.length > 1 ? `${selArr.length} capas combinadas` : 'Combinable (hasta ' + maxSelect + ')') : 'Seleccionado'}</div>
                <div class="text-xs sm:text-sm font-extrabold text-slate-900 truncate">${esc(selArr.length ? selArr.join(' + ') : 'Ninguno')}</div>
              </div>
            </div>
            <div class="flex items-center gap-1 pr-1 shrink-0">
              <span class="text-[10px] font-bold text-slate-400 hidden sm:inline">${isOpen ? 'Ocultar' : (multi ? 'Combinar' : 'Elegir')}</span>
              <i data-lucide="${isOpen ? 'chevron-up' : 'chevron-down'}" class="w-4 h-4 text-orange-600"></i>
            </div>
          </button>

          ${primaryOpt && primaryOpt.img ? `
            <button type="button" data-light-zoom-img="${primaryOpt.img}" data-light-zoom-title="${esc(primaryOpt.label)}" data-light-zoom-cat="${esc(title)}" title="Ampliar referencia de iluminación" class="light-zoom-btn p-2.5 rounded-2xl bg-white border border-stone-200 text-slate-600 hover:border-orange-400 hover:text-orange-600 transition active:scale-95 shrink-0">
              <i data-lucide="zoom-in" class="w-4 h-4"></i>
            </button>
          ` : ''}
        </div>

        ${isOpen ? `
          <div class="img-dd-panel mt-2.5 p-2.5 rounded-2xl bg-white border-2 border-orange-200 shadow-lg space-y-2">
            ${multi ? `
              <div class="flex items-center justify-between gap-2 px-1">
                <span class="text-[11px] font-bold text-orange-700">Haz clic en hasta ${maxSelect} efectos para superponerlos</span>
                <button type="button" class="light-dd-done px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-extrabold transition">Listo</button>
              </div>
            ` : ''}
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 overflow-y-auto custom-scroll pr-1">
              ${options.map(opt => {
                const selIdx = selArr.indexOf(opt.label);
                const isSel = opt.label === 'Ninguno' ? selArr.length === 0 : selIdx >= 0;
                return `
                  <button type="button" data-light-dd-field="${fieldKey}" data-light-dd-val="${esc(opt.label)}" data-light-dd-multi="${multi ? '1' : '0'}" class="light-dd-opt group relative rounded-xl overflow-hidden border-2 text-left transition active:scale-95 ${isSel ? 'border-orange-500 ring-2 ring-orange-200 shadow-md' : 'border-stone-200 bg-stone-50 hover:border-orange-400'}">
                    ${opt.img ? `
                      <div class="relative aspect-[3/2] bg-stone-200 overflow-hidden">
                        <img src="${opt.img}" alt="${esc(opt.label)}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                        <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent"></div>
                        ${isSel ? `<span class="pointer-events-none absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow border border-white text-[10px] font-black">${multi ? (selIdx + 1) : '<i data-lucide="check" class="w-3 h-3"></i>'}</span>` : ''}
                        <div class="pointer-events-none absolute inset-x-0 bottom-0 p-1.5">
                          <div class="text-[11px] font-extrabold text-white leading-tight line-clamp-2 drop-shadow-xs">${esc(opt.label)}</div>
                        </div>
                      </div>
                    ` : `
                      <div class="aspect-[3/2] flex flex-col items-center justify-center p-2 text-center bg-stone-50">
                        <i data-lucide="ban" class="w-5 h-5 text-slate-400 mb-1"></i>
                        <span class="text-[11px] font-extrabold text-slate-600">${esc(opt.label)}</span>
                      </div>
                    `}
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}
      ` : '<p class="text-[11px] text-slate-400 pl-6">Desactivado: no se incluirá en el prompt.</p>'}
    </div>
  `;
}

function renderStep6Lighting() {
  const lOn = state.chkLuzTipo !== false;
  const tOn = state.chkLuzTemp !== false;
  const atOn = state.chkAtmosfera !== false;
  const allOn = lOn && tOn && atOn;

  const activeLights = getActiveLuzTipos();
  const activeAtms = getActiveAtmosferas();

  const activeThumbCards = [
    ...activeLights.map((lbl, i) => ({ cat: activeLights.length > 1 ? `Luz ${i + 1}` : 'Luz', opt: LUCES_OPTS.find(o => o.label === lbl) })),
    ...(tOn && !isNoneVal(state.luzTemp) ? [{ cat: 'Tono', opt: LUZ_TEMP_OPTS.find(o => o.label === state.luzTemp) }] : []),
    ...activeAtms.map((lbl, i) => ({ cat: activeAtms.length > 1 ? `Clima ${i + 1}` : 'Clima', opt: ATMOSFERA_OPTS.find(o => o.label === lbl) }))
  ].filter(x => x && x.opt && x.opt.img);

  return `
    <div class="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">6</div>
          <div>
            <h2 class="text-lg font-extrabold">Iluminación y Atmósfera Combinables</h2>
            <p class="text-xs text-slate-500">Superpone hasta 3 luces y 3 atmósferas sobre la imagen en vivo</p>
          </div>
        </div>
        <button id="btnToggleAllLight" type="button" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition active:scale-95 ${allOn ? 'bg-stone-100 text-slate-700 border-stone-200 hover:bg-stone-200' : 'bg-orange-600 text-white border-orange-600 hover:bg-orange-500'}">
          ${allOn ? 'Desactivar todos' : 'Activar todos'}
        </button>
      </div>

      <!-- Combinaciones rápidas prearmadas (capas superpuestas) -->
      <div class="p-3 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-2">
        <div class="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-orange-800">
          <i data-lucide="layers" class="w-3.5 h-3.5 text-orange-600"></i>
          <span>Combinaciones rápidas (capas superpuestas)</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          ${LIGHT_COMBO_PRESETS.map((pr, idx) => `
            <button type="button" data-light-preset="${idx}" class="light-preset-btn flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-white border border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-left transition active:scale-95">
              <i data-lucide="${pr.icon}" class="w-3.5 h-3.5 text-orange-600 shrink-0"></i>
              <span class="text-[11px] font-extrabold text-slate-800 leading-tight truncate">${esc(pr.name)}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="space-y-3">
        ${renderImageLightingDropdown({
          chkKey: 'chkLuzTipo',
          fieldKey: 'luzTipos',
          title: 'Tipo de iluminación (combinable)',
          subtitle: 'Combina hasta 3 luces superpuestas (ej. Hora dorada + Contraluz)',
          icon: 'sun',
          options: LUCES_OPTS,
          currentVal: state.luzTipo,
          selectedList: state.luzTipos,
          multi: true,
          maxSelect: 3,
          isChecked: lOn
        })}

        ${renderImageLightingDropdown({
          chkKey: 'chkLuzTemp',
          fieldKey: 'luzTemp',
          title: 'Temperatura y tono de luz',
          subtitle: '10 referencias visuales de calidez, frío y contraste',
          icon: 'thermometer',
          options: LUZ_TEMP_OPTS,
          currentVal: state.luzTemp,
          multi: false,
          isChecked: tOn
        })}

        ${renderImageLightingDropdown({
          chkKey: 'chkAtmosfera',
          fieldKey: 'atmosferas',
          title: 'Atmósfera y clima (combinable)',
          subtitle: 'Combina hasta 3 capas (ej. Lluvia + Niebla + Partículas mágicas)',
          icon: 'cloud-sun',
          options: ATMOSFERA_OPTS,
          currentVal: state.atmosfera,
          selectedList: state.atmosferas,
          multi: true,
          maxSelect: 3,
          isChecked: atOn
        })}
      </div>

      ${activeThumbCards.length ? `
        <div class="pt-2 border-t border-stone-100">
          <div class="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">Capas visuales superpuestas (${activeThumbCards.length})</div>
          <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
            ${activeThumbCards.map(item => `
              <button type="button" data-light-zoom-img="${item.opt.img}" data-light-zoom-title="${esc(item.opt.label)}" data-light-zoom-cat="${esc(item.cat)}" class="light-zoom-btn group relative rounded-xl overflow-hidden border border-stone-200 bg-stone-100 aspect-[3/2] text-left">
                <img src="${item.opt.img}" alt="${esc(item.opt.label)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"></div>
                <span class="pointer-events-none absolute top-1 left-1 px-1.5 py-0.5 rounded bg-slate-900/75 text-[9px] font-bold text-orange-300">${esc(item.cat)}</span>
                <div class="pointer-events-none absolute inset-x-0 bottom-0 p-1.5 text-[10px] font-extrabold text-white truncate">${esc(item.opt.label)}</div>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function renderStep7Styles() {
  const q = (state.estiloSearch || '').toLowerCase().trim();
  const filtered = STYLE_PROMPTS.filter(s => (state.estiloFilter === 'Todos' || s.cat === state.estiloFilter) && (!q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)));
  const selected = STYLE_PROMPTS.find(s => s.id === state.estiloId) || null;
  const previewStyle = selected || filtered[0] || STYLE_PROMPTS[0];
  const selIdx = selected ? STYLE_PROMPTS.findIndex(s => s.id === selected.id) : -1;

  return `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      <!-- Left: Lista de Cuadrados de Estilos -->
      <div class="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-black shrink-0">7</div>
            <div>
              <h2 class="text-lg font-extrabold text-slate-900">Estilos Visuales (Cuadrícula)</h2>
              <p class="text-xs text-slate-500">Pasa el cursor sobre cualquier cuadrado para previsualizar al zorrito y haz clic para elegir</p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 text-[11px] font-extrabold shrink-0">${filtered.length} de ${STYLE_PROMPTS.length}</span>
        </div>

        <!-- Categorías y Buscador -->
        <div class="space-y-2.5">
          <div class="flex flex-wrap items-center gap-1.5">
            ${[['Todos','layout-grid'],['Educativos','book-open'],['Videojuegos y Pop','gamepad-2'],['Artísticos','palette'],['3D y Digital','box'],['Fotografía','camera']].map(([c, ic]) => `<button type="button" data-style-cat="${c}" class="style-cat-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition active:scale-95 ${state.estiloFilter === c ? 'bg-violet-600 text-white shadow-sm' : 'bg-stone-100 text-slate-600 hover:bg-stone-200'}"><i data-lucide="${ic}" class="w-3.5 h-3.5 shrink-0"></i><span>${c}</span></button>`).join('')}
          </div>

          <div class="relative flex items-center">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none"></i>
            <input id="styleSearchInput" type="text" value="${esc(state.estiloSearch)}" placeholder="Buscar estilo (ej. Neón Punk, Cómic Grunge, Noir, Superflat, Risografía, Bauhaus, Chibi...)" class="w-full pl-9 pr-9 py-2 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 focus:bg-white transition" />
            ${state.estiloSearch ? `<button id="btnClearStyleSearch" type="button" title="Limpiar búsqueda" class="absolute right-2.5 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-200"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>` : ''}
          </div>
        </div>

        <!-- Lista de Cuadrados (Grid de Estilos) -->
        <div id="styleSquaresGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[430px] overflow-y-auto custom-scroll p-1">
          <!-- Cuadrado: Ninguno -->
          <button type="button" data-style-id="0" class="style-card group relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-3 text-center transition-all duration-150 active:scale-95 ${state.estiloId === 0 ? 'border-slate-900 bg-slate-900 text-white ring-4 ring-slate-200 shadow-md' : 'border-stone-300 bg-stone-50/80 text-slate-600 hover:border-violet-400 hover:bg-violet-50/30'}">
            <div class="w-10 h-10 rounded-2xl flex items-center justify-center mb-2 ${state.estiloId === 0 ? 'bg-slate-800 text-emerald-400' : 'bg-white border border-stone-200 text-slate-400 group-hover:text-violet-600'}">
              <i data-lucide="ban" class="w-5 h-5"></i>
            </div>
            <span class="text-xs font-extrabold leading-tight">Ninguno</span>
            <span class="text-[10px] mt-0.5 ${state.estiloId === 0 ? 'text-slate-300' : 'text-slate-400'}">Sin estilo fijo</span>
            ${state.estiloId === 0 ? `<span class="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow"><i data-lucide="check" class="w-3 h-3"></i></span>` : ''}
          </button>

          ${filtered.length ? filtered.map(s => {
            const isSel = s.id === state.estiloId;
            return `
              <button type="button" data-style-id="${s.id}" class="style-card group relative aspect-square rounded-2xl overflow-hidden border-2 text-left transition-all duration-150 active:scale-95 ${isSel ? 'border-violet-600 ring-4 ring-violet-200 shadow-lg scale-[1.01]' : 'border-stone-200 bg-stone-100 hover:border-violet-500 hover:shadow-md hover:scale-[1.02]'}">
                <img src="${s.img}" alt="${esc(s.name)}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent"></div>
                <span class="pointer-events-none absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/75 backdrop-blur-xs text-white text-[9px] font-bold tracking-wide truncate max-w-[75%]">${esc(s.cat)}</span>
                ${isSel ? `<span class="pointer-events-none absolute top-2 right-2 w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-md border border-white"><i data-lucide="check" class="w-3.5 h-3.5"></i></span>` : ''}
                <div class="pointer-events-none absolute inset-x-0 bottom-0 p-2.5">
                  <div class="text-xs font-extrabold text-white leading-snug line-clamp-2 drop-shadow-xs">${esc(s.name)}</div>
                </div>
              </button>
            `;
          }).join('') : `
            <div class="col-span-full py-10 text-center text-xs text-slate-400">
              No se encontraron estilos que coincidan con "${esc(state.estiloSearch)}".
            </div>
          `}
        </div>

        <!-- Barra de navegación rápida entre estilos -->
        <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-100">
          <div class="flex items-center gap-1.5">
            <button id="btnPrevStyle" type="button" class="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold active:scale-95 transition">
              <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i><span>Anterior</span>
            </button>
            <button id="btnNextStyle" type="button" class="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-bold active:scale-95 transition">
              <span>Siguiente</span><i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
          <div class="flex items-center gap-2">
            ${selected ? `<span class="text-[11px] font-bold text-violet-700">Seleccionado: ${esc(selected.name)} (${selIdx + 1}/${STYLE_PROMPTS.length})</span>` : '<span class="text-[11px] font-semibold text-slate-400">Ningún estilo fijado aún</span>'}
            ${selected ? `<button type="button" data-style-id="0" class="style-card px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition active:scale-95">Quitar estilo</button>` : ''}
          </div>
        </div>
      </div>

      <!-- Right: Vista Previa Instantánea al Pasar el Cursor (El Zorrito) -->
      <div class="lg:col-span-5 lg:sticky lg:top-4 space-y-4">
        <div class="bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden">
          <div class="px-4 py-2.5 border-b border-stone-100 flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span id="stylePreviewDot" class="w-2.5 h-2.5 rounded-full ${selected ? 'bg-violet-500' : 'bg-amber-400'}"></span>
              <span id="stylePreviewBadgeMode" class="text-xs font-extrabold uppercase tracking-wider text-slate-600">${selected ? 'Estilo Seleccionado' : 'Vista Previa (Pasa el cursor)'}</span>
            </div>
            <span id="stylePreviewCat" class="px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 text-[11px] font-extrabold">${previewStyle ? esc(previewStyle.cat) : 'Sin selección'}</span>
          </div>

          <div class="p-4 bg-stone-100">
            <div class="relative group rounded-2xl overflow-hidden border-2 border-stone-200 bg-white shadow-sm aspect-[3/2]">
              <img id="stylePreviewImg" src="${previewStyle ? previewStyle.img : ''}" alt="${previewStyle ? esc(previewStyle.name) : 'Referencia'}" class="w-full h-full object-cover transition-all duration-200" />
              <button id="btnZoomStyle" type="button" title="Ampliar imagen de referencia" class="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-[11px] font-bold backdrop-blur-sm transition active:scale-95">
                <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i><span>Ampliar</span>
              </button>
            </div>
          </div>

          <div class="px-4 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
            <span id="stylePreviewTitle" class="text-sm font-extrabold text-slate-900 truncate">${previewStyle ? esc(previewStyle.name) : 'Sin estilo'}</span>
            <span class="text-[11px] font-semibold text-violet-600 shrink-0">Referencia · Zorrito</span>
          </div>
        </div>

        <div id="stylePromptBox" class="p-4 rounded-3xl border ${selected ? 'border-violet-200 bg-violet-50/60' : 'border-stone-200 bg-white'} shadow-sm">
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <div class="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-violet-700">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
              <span>Descripción del estilo para el prompt</span>
            </div>
          </div>
          <p id="stylePreviewDesc" class="text-xs text-slate-700 leading-relaxed">${previewStyle ? `"${esc(previewStyle.desc)}"` : 'Pasa el cursor sobre cualquier cuadrado para ver su efecto en el zorrito.'}</p>
        </div>
      </div>
    </div>
  `;
}

function renderStep8Text() {
  const editItem = (state.activeTextIdx >= 0 && state.texts[state.activeTextIdx]) ? state.texts[state.activeTextIdx] : null;
  const curActPos = editItem ? (editItem.activarPos !== false) : (state.newTextActivarPos !== false);
  const curX = editItem ? editItem.x : (state.newTextX ?? 50);
  const curY = editItem ? editItem.y : (state.newTextY ?? 18);
  const curContainer = editItem ? (editItem.container || 'Sin globo (texto libre)') : (state.newTextContainer || 'Sin globo (texto libre)');
  const curTail = editItem ? (editItem.bubbleTail || 'Automática hacia el personaje') : (state.newTextBubbleTail || 'Automática hacia el personaje');
  const contMeta = TEXT_CONTAINER_OPTS.find(c => c.id === curContainer) || TEXT_CONTAINER_OPTS[0];
  const targetLabel = editItem ? `texto "${esc(editItem.text)}"` : (state.newText.trim() ? `vista previa "${esc(state.newText.trim())}"` : 'texto nuevo');

  return `
    <div class="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
      <div class="flex items-center gap-3 pb-3 border-b border-stone-100">
        <div class="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-black">8</div>
        <div><h2 class="text-lg font-extrabold">Textos, Globos de Conversación y Posición</h2><p class="text-xs text-slate-500">Elige texto libre o dentro de globos de diálogo, pensamiento, grito, carteles o cintas</p></div>
      </div>
      <label class="flex items-center gap-3 p-3.5 rounded-2xl border-2 cursor-pointer ${state.incluirTexto ? 'border-rose-500 bg-rose-50/60' : 'border-stone-200 bg-stone-50'}">
        <input id="chkIncluirTexto" type="checkbox" class="w-5 h-5 accent-rose-600" ${state.incluirTexto ? 'checked' : ''} />
        <span class="text-sm font-bold text-slate-800">Incluir texto dentro de la imagen</span>
      </label>
      ${state.incluirTexto ? `
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
          <div class="sm:col-span-6">
            <label class="block text-xs font-bold text-slate-700 mb-1">Texto (se previsualiza mientras escribes)</label>
            <div class="flex gap-1.5">
              <input type="text" data-field="newText" value="${esc(state.newText)}" placeholder="Ej. ¡Hola! Bienvenidos al laboratorio" class="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm" />
              ${micBtn('data-fmic="newText"')}
            </div>
          </div>
          <div class="sm:col-span-4">
            <label class="block text-xs font-bold text-slate-700 mb-1">Tipografía</label>
            <select data-field="newTextFont" class="w-full px-2.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm">
              ${TEXT_FONT_OPTS.map(o => `<option value="${o}" ${state.newTextFont === o ? 'selected' : ''}>${o}</option>`).join('')}
            </select>
          </div>
          <div class="sm:col-span-2">
            <button id="btnAddText" type="button" class="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs active:scale-95 transition">+ Fijar</button>
          </div>
        </div>

        <!-- Selector de Globo de Conversación o Texto Libre (Fuera de globo) -->
        <div class="p-3.5 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-2.5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <label class="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <i data-lucide="message-square-text" class="w-4 h-4 text-rose-600"></i>
              <span>Formato del contenedor para ${targetLabel}</span>
            </label>
            <span class="px-2 py-0.5 rounded-full bg-white border border-rose-200 text-[10px] font-extrabold text-rose-700">${esc(contMeta.short)}</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            ${TEXT_CONTAINER_OPTS.map(opt => {
              const isAct = curContainer === opt.id;
              return `
                <button type="button" data-text-container="${esc(opt.id)}" title="${esc(opt.id)}" class="text-container-btn flex flex-col items-center justify-center gap-1 p-2 rounded-xl border-2 text-center transition active:scale-95 ${isAct ? 'border-rose-600 bg-rose-600 text-white shadow-sm' : 'border-stone-200 bg-white text-slate-700 hover:border-rose-300'}">
                  <i data-lucide="${opt.icon}" class="w-4 h-4 shrink-0 ${isAct ? 'text-white' : 'text-rose-500'}"></i>
                  <span class="text-[10px] font-extrabold leading-tight">${esc(opt.short)}</span>
                </button>
              `;
            }).join('')}
          </div>
          ${contMeta.hasTail ? `
            <div class="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
              <label for="selTextBubbleTail" class="text-[11px] font-bold text-slate-700 shrink-0">Dirección de la cola del globo:</label>
              <select id="selTextBubbleTail" class="flex-1 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-xs">
                ${TEXT_BUBBLE_TAIL_OPTS.map(o => `<option value="${esc(o)}" ${curTail === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}
              </select>
            </div>
          ` : ''}
        </div>

        <!-- Control de posición interactivo (igual al del personaje) -->
        <div class="p-3.5 rounded-2xl border-2 ${curActPos ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200 bg-stone-50'}">
          <div class="flex items-center justify-between gap-2">
            <label class="flex items-center gap-2.5 cursor-pointer">
              <input id="chkTextActivarPos" type="checkbox" class="w-4 h-4 accent-rose-600" ${curActPos ? 'checked' : ''} />
              <span class="text-xs sm:text-sm font-bold text-slate-800">Activar posición para ${targetLabel}</span>
            </label>
            ${editItem ? `<button id="btnSelectDraftText" type="button" class="text-[11px] font-bold text-rose-600 hover:underline">Volver a texto nuevo</button>` : ''}
          </div>
          ${curActPos ? `
            <div class="mt-3 space-y-2.5">
              <div class="text-[11px] text-slate-600 font-semibold">Haz clic o arrastra en el recuadro (o directamente sobre el visor derecho):</div>
              <div id="textPosInteractivePad" class="pos-pad-box relative w-full h-32 rounded-xl bg-white border-2 border-rose-300 overflow-hidden cursor-crosshair shadow-inner">
                <div class="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
                  <div class="border-r border-b border-dashed border-stone-200"></div>
                  <div class="border-r border-b border-dashed border-stone-200 flex items-start justify-center pt-0.5"><span class="text-[9px] font-bold text-slate-400 uppercase">Arriba</span></div>
                  <div class="border-b border-dashed border-stone-200"></div>
                  <div class="border-r border-b border-dashed border-stone-200 flex items-center pl-1"><span class="text-[9px] font-bold text-slate-400 uppercase">Izq</span></div>
                  <div class="border-r border-b border-dashed border-stone-200 flex items-center justify-center"><span class="text-[9px] font-bold text-slate-300 uppercase">Centro</span></div>
                  <div class="border-b border-dashed border-stone-200 flex items-center justify-end pr-1"><span class="text-[9px] font-bold text-slate-400 uppercase">Der</span></div>
                  <div class="border-r border-dashed border-stone-200"></div>
                  <div class="border-r border-dashed border-stone-200 flex items-end justify-center pb-0.5"><span class="text-[9px] font-bold text-slate-400 uppercase">Abajo</span></div>
                  <div></div>
                </div>
                <div id="textPosInteractivePin" class="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black border-2 border-white shadow-md flex items-center gap-1 transition-[left,top] duration-75" style="left:${curX}%; top:${curY}%;">
                  <i data-lucide="type" class="w-3 h-3"></i>
                </div>
              </div>
              <div class="flex flex-wrap gap-1">
                ${[['Arriba', 50, 18], ['Abajo', 50, 82], ['Izquierda', 22, 50], ['Centro', 50, 50], ['Derecha', 78, 50]].map(([lbl, px, py]) => `
                  <button type="button" data-text-pos-preset="${px},${py}" class="text-pos-preset-btn flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold bg-white border border-stone-200 text-slate-700 hover:border-rose-500 hover:text-rose-700 transition active:scale-95">${lbl}</button>
                `).join('')}
              </div>
              <div class="text-[11px] font-semibold text-rose-700">Ubicación: <span id="textPosZoneVal">${coordsToZone(curX, curY)}</span></div>
            </div>
          ` : '<p class="text-[11px] text-slate-400 mt-1.5">Desactivado: el texto se añadirá al prompt sin posición fija.</p>'}
        </div>

        <div class="space-y-2">
          ${state.texts.length ? state.texts.map((t, i) => {
            const cObj = TEXT_CONTAINER_OPTS.find(c => c.id === t.container) || TEXT_CONTAINER_OPTS[0];
            return `
              <div class="flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-xs transition ${state.activeTextIdx === i ? 'bg-rose-100 border-rose-400 shadow-xs' : 'bg-rose-50 border-rose-200'}">
                <button type="button" data-select-text="${i}" class="select-text-btn flex-1 text-left font-bold text-rose-900 truncate">
                  "${esc(t.text)}" <span class="px-1.5 py-0.5 rounded bg-white/80 text-[10px] text-rose-700 border border-rose-200 ml-1">${esc(cObj.short)}</span> <span class="font-normal text-rose-600">· ${t.activarPos !== false ? coordsToZone(t.x, t.y) : 'posición libre'}</span>
                </button>
                <button type="button" data-del-text="${i}" class="del-text text-rose-500 hover:text-rose-700"><i data-lucide="x" class="w-4 h-4"></i></button>
              </div>
            `;
          }).join('') : '<div class="text-xs text-slate-400 italic">Escribe un texto arriba para previsualizarlo al instante en el visor; pulsa "+ Fijar" si deseas añadir varios textos.</div>'}
        </div>
      ` : ''}
    </div>
  `;
}

function renderAll() {
  renderStepper();
  const sec = document.getElementById('builderSection');
  const aside = document.getElementById('studioAside');
  const fullWidth = state.step === 7; // Step 7 Styles full width; Step 8 Text needs 3D stage!

  aside.classList.toggle('hidden', fullWidth);
  sec.className = fullWidth ? 'lg:col-span-12 space-y-4' : 'lg:col-span-7 space-y-4';

  if (state.step === 1) sec.innerHTML = renderStep1Ratio();
  else if (state.step === 2) sec.innerHTML = renderStep2Character();
  else if (state.step === 3) sec.innerHTML = renderStep3EmocionPostura();
  else if (state.step === 4) sec.innerHTML = renderStep4Escenario();
  else if (state.step === 5) sec.innerHTML = renderStep5Camara();
  else if (state.step === 6) sec.innerHTML = renderStep6Lighting();
  else if (state.step === 7) sec.innerHTML = renderStep7Styles();
  else sec.innerHTML = renderStep8Text();

  if (typeof lucide !== 'undefined') lucide.createIcons();
  if (typeof gsap !== 'undefined') gsap.fromTo(sec, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, ease: 'power2.out' });

  if (!fullWidth) { initThree(); setTimeout(resizeThree, 40); }
  bindListeners();
  updatePromptPreview();
}

function bindListeners() {
  const sec = document.getElementById('builderSection');
  const curChar = state.characters[state.activeCharIdx] || state.characters[0];

  sec.querySelectorAll('.ratio-btn').forEach(b => b.addEventListener('click', () => { state.aspecto = b.getAttribute('data-ratio'); saveState(); renderAll(); }));
  sec.querySelectorAll('.char-tab-btn').forEach(b => b.addEventListener('click', () => { state.charTab = b.getAttribute('data-char-tab'); saveState(); renderAll(); }));
  sec.querySelectorAll('.rasgos-subtab-btn').forEach(b => b.addEventListener('click', () => { state.rasgosTab = b.getAttribute('data-rasgos-tab'); saveState(); renderAll(); }));
  sec.querySelectorAll('.step3-subtab-btn').forEach(b => b.addEventListener('click', () => { state.step3Tab = b.getAttribute('data-step3-tab'); saveState(); renderAll(); }));
  sec.querySelectorAll('.sel-char-btn').forEach(b => b.addEventListener('click', () => { state.activeCharIdx = Number(b.getAttribute('data-sel-char')); saveState(); renderAll(); }));
  sec.querySelectorAll('.char-cat-btn').forEach(b => b.addEventListener('click', () => { curChar.cat = b.getAttribute('data-char-cat'); saveState(); renderAll(); }));
  sec.querySelectorAll('.persona-sub-btn').forEach(b => b.addEventListener('click', () => {
    curChar.sub = b.getAttribute('data-persona-sub');
    if (curChar.genero !== 'Hombre' && curChar.genero !== 'Mujer') curChar.genero = 'Mujer';
    saveState(); renderAll();
  }));
  sec.querySelectorAll('.persona-gen-btn').forEach(b => b.addEventListener('click', () => {
    curChar.genero = b.getAttribute('data-persona-gen') === 'Hombre' ? 'Hombre' : 'Mujer';
    if (curChar.genero !== 'Hombre') curChar.chkBarba = false;
    saveState(); renderAll();
  }));
  sec.querySelectorAll('.complexion-pick-btn').forEach(b => b.addEventListener('click', () => {
    curChar.complexionTipo = b.getAttribute('data-complexion-pick');
    saveState(); renderAll();
  }));
  sec.querySelectorAll('.cmodo-btn').forEach(b => b.addEventListener('click', () => { curChar.modoForma = b.getAttribute('data-cmodo'); saveState(); renderAll(); }));
  sec.querySelectorAll('.rzona-btn').forEach(b => b.addEventListener('click', () => {
    curChar.ropaZona = b.getAttribute('data-rzona');
    curChar.ropaItem = ROPA_CATS[curChar.ropaZona][0];
    saveState(); renderAll();
  }));
  sec.querySelectorAll('.animal-sil-btn').forEach(b => b.addEventListener('click', () => {
    curChar.animalSilueta = b.getAttribute('data-animal-sil');
    saveState(); renderAll();
  }));
  sec.querySelectorAll('.emocion-btn').forEach(b => b.addEventListener('click', () => {
    curChar.emocion = b.getAttribute('data-emocion');
    saveState(); renderAll();
  }));

  // Clothing quick extra chips
  sec.querySelectorAll('.ropa-extra-btn').forEach(b => b.addEventListener('click', () => {
    const val = b.getAttribute('data-ropa-extra');
    if (!Array.isArray(curChar.ropaExtras)) curChar.ropaExtras = [];
    const idx = curChar.ropaExtras.indexOf(val);
    if (idx >= 0) curChar.ropaExtras.splice(idx, 1);
    else curChar.ropaExtras.push(val);
    saveState(); renderAll();
  }));

  // Unified Color Swatches (bolitas) click
  sec.querySelectorAll('.swatch-pick').forEach(btn => {
    btn.addEventListener('click', () => {
      const scope = btn.getAttribute('data-swatch-scope');
      const nameKey = btn.getAttribute('data-swatch-name-key');
      const val = btn.getAttribute('data-swatch-val');
      const hexKey = btn.getAttribute('data-swatch-hex-key');
      const hexVal = btn.getAttribute('data-swatch-hex');
      const target = scope === 'char' ? curChar : state;
      target[nameKey] = val;
      if (hexKey && hexVal) target[hexKey] = hexVal;
      saveState(); renderAll();
    });
  });

  // Circle "+" Custom Color Trigger
  sec.querySelectorAll('.swatch-plus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const scope = btn.getAttribute('data-swatch-scope');
      const nameKey = btn.getAttribute('data-swatch-name-key');
      const targetInputId = btn.getAttribute('data-target-input');
      const target = scope === 'char' ? curChar : state;
      const wasCustom = target[nameKey] === 'Otro';
      target[nameKey] = 'Otro';
      saveState();
      renderAll();
      if (!wasCustom) {
        setTimeout(() => {
          const inp = document.getElementById(targetInputId);
          if (inp) inp.click();
        }, 30);
      } else {
        const inp = document.getElementById(targetInputId);
        if (inp) inp.click();
      }
    });
  });

  const bAddC = document.getElementById('btnAddChar');
  if (bAddC) bAddC.addEventListener('click', () => {
    state.characters.push(makeCharacter({ cat: 'Persona', sub: 'Niño', activarPosicion: true, x: 72, y: 55 }));
    state.activeCharIdx = state.characters.length - 1;
    saveState(); showToast('Nuevo sujeto añadido'); renderAll();
  });

  const bDelC = document.getElementById('btnDelChar');
  if (bDelC) bDelC.addEventListener('click', () => {
    if (state.characters.length <= 1) return;
    state.characters.splice(state.activeCharIdx, 1);
    state.activeCharIdx = Math.max(0, state.activeCharIdx - 1);
    saveState(); renderAll();
  });

  sec.querySelectorAll('[data-cfield]').forEach(el => {
    const key = el.getAttribute('data-cfield');
    const evt = (el.tagName === 'SELECT') ? 'change' : 'input';
    el.addEventListener(evt, () => {
      curChar[key] = el.type === 'range' ? Number(el.value) : el.value;
      saveState();
      if (key === 'escala') {
        const ev = document.getElementById('escalaVal');
        const sw = document.getElementById('scaleWordVal');
        if (ev) ev.textContent = curChar.escala + '%';
        if (sw) sw.textContent = scaleToWord(curChar.escala);
        updatePromptPreview();
      } else if (['sub','genero','animalSilueta','cabelloTipo','barbaTipo','complexionTipo','texturaTipo','ropaItem','ropaEstampado','ropaMaterial','objetoManoItem','emocion','accionTipo','orejasAnimalTipo','colaAnimalTipo','collarAnimalTipo','manchasPandaTipo','alasAveTipo','picoAveTipo','crestaAveTipo','antenasTipo','alasInsectoTipo','caparazonTipo','alasAnimalTipo'].includes(key)) {
        renderAll();
      } else {
        updatePromptPreview();
      }
    });
  });

  sec.querySelectorAll('[data-cchk]').forEach(chk => {
    const key = chk.getAttribute('data-cchk');
    chk.addEventListener('change', () => { curChar[key] = chk.checked; saveState(); renderAll(); });
  });

  sec.querySelectorAll('.hair-pick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      curChar.cabelloTipo = btn.getAttribute('data-hair-pick');
      saveState(); renderAll();
    });
  });

  sec.querySelectorAll('.beard-pick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      curChar.barbaTipo = btn.getAttribute('data-beard-pick');
      saveState(); renderAll();
    });
  });

  const bAddR = document.getElementById('btnAddRopa');
  if (bAddR) bAddR.addEventListener('click', () => {
    const val = curChar.ropaItem === 'Otro' ? (curChar.ropaOtro || '').trim() : curChar.ropaItem;
    if (!val) { showToast('Escribe el nombre de la prenda'); return; }
    let colorName = curChar.ropaColor || 'Sin especificar';
    let colorHex = null;
    if (colorName === 'Otro') {
      colorHex = curChar.ropaColorHex || '#4F46E5';
      colorName = (curChar.ropaColorOtro || '').trim() || hexToSpanishName(colorHex);
    } else if (colorName !== 'Sin especificar' && ROPA_COLORS[colorName]) {
      colorHex = ROPA_COLORS[colorName];
    }
    curChar.ropaList.push({
      name: val,
      zona: curChar.ropaZona,
      colorName,
      colorHex,
      estampado: curChar.ropaEstampado || 'Sin especificar',
      material: curChar.ropaMaterial || 'Sin especificar',
      extras: Array.isArray(curChar.ropaExtras) ? [...curChar.ropaExtras] : [],
      detalle: (curChar.ropaDetalle || '').trim()
    });
    curChar.ropaOtro = '';
    curChar.ropaDetalle = '';
    curChar.ropaExtras = [];
    saveState(); showToast('Prenda añadida'); renderAll();
  });

  sec.querySelectorAll('.accion-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.accionObjMode = btn.getAttribute('data-accion-mode') === 'con' ? 'con' : 'sin';
      state.accionFilter = 'Todas';
      saveState(); renderAll();
    });
  });

  sec.querySelectorAll('.accion-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.accionFilter = btn.getAttribute('data-accion-cat');
      saveState(); renderAll();
    });
  });

  sec.querySelectorAll('.accion-pick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      curChar.accionTipo = btn.getAttribute('data-accion-pick');
      saveState(); renderAll();
    });
  });

  sec.querySelectorAll('.set-escala-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      curChar.escala = Number(btn.getAttribute('data-set-escala'));
      saveState(); renderAll();
    });
  });

  sec.querySelectorAll('.pos-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const [px, py] = btn.getAttribute('data-pos-preset').split(',').map(Number);
      curChar.x = px; curChar.y = py;
      syncPosPadUI(curChar);
      saveState(); updatePromptPreview();
    });
  });

  const posPad = document.getElementById('posInteractivePad');
  if (posPad) {
    const applyPadCoords = (ev) => {
      const rect = posPad.getBoundingClientRect();
      curChar.x = Math.max(8, Math.min(92, Math.round(((ev.clientX - rect.left) / rect.width) * 100)));
      curChar.y = Math.max(10, Math.min(90, Math.round(((ev.clientY - rect.top) / rect.height) * 100)));
      syncPosPadUI(curChar); saveState(); renderPromptHTML();
    };
    posPad.addEventListener('pointerdown', (e) => {
      e.preventDefault(); posPad.setPointerCapture(e.pointerId); applyPadCoords(e);
      const onMove = (ev) => applyPadCoords(ev);
      const onUp = () => { posPad.removeEventListener('pointermove', onMove); posPad.removeEventListener('pointerup', onUp); };
      posPad.addEventListener('pointermove', onMove); posPad.addEventListener('pointerup', onUp);
    });
  }

  // Reusable Custom Color Picker & EyeDropper (Cuentagotas)
  const applyPickedHex = (scope, nameKey, hexKey, textKey, hex, doRerender = false) => {
    const target = scope === 'char' ? curChar : state;
    if (nameKey) target[nameKey] = 'Otro';
    target[hexKey] = hex.toUpperCase();
    target[textKey] = hexToSpanishName(hex);
    const textInp = sec.querySelector(`[data-${scope === 'char' ? 'cfield' : 'field'}="${textKey}"]`);
    if (textInp) textInp.value = target[textKey];
    if (hexKey === 'ojosColorHex') {
      const eyeBox = document.getElementById('dynamicEyePreview');
      if (eyeBox) eyeBox.innerHTML = renderEyeIconSVG(hex);
    }
    saveState();
    if (doRerender) renderAll();
    else updatePromptPreview();
  };

  sec.querySelectorAll('input[data-color-hex]').forEach(inp => {
    inp.addEventListener('input', () => {
      applyPickedHex(inp.getAttribute('data-color-scope'), inp.getAttribute('data-color-name-key'), inp.getAttribute('data-color-hex'), inp.getAttribute('data-color-text'), inp.value, false);
    });
    inp.addEventListener('change', () => {
      applyPickedHex(inp.getAttribute('data-color-scope'), inp.getAttribute('data-color-name-key'), inp.getAttribute('data-color-hex'), inp.getAttribute('data-color-text'), inp.value, true);
    });
  });

  sec.querySelectorAll('.eyedrop-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-eyedrop-target');
      const scope = btn.getAttribute('data-color-scope');
      const nameKey = btn.getAttribute('data-color-name-key');
      const hexKey = btn.getAttribute('data-color-hex');
      const textKey = btn.getAttribute('data-color-text');
      const colorInp = document.getElementById(targetId);
      if (window.EyeDropper) {
        try {
          const ed = new window.EyeDropper();
          const res = await ed.open();
          if (res && res.sRGBHex) {
            if (colorInp) colorInp.value = res.sRGBHex;
            applyPickedHex(scope, nameKey, hexKey, textKey, res.sRGBHex, true);
            showToast(`Color capturado: ${res.sRGBHex.toUpperCase()}`);
          }
        } catch (e) {}
      } else {
        const target = scope === 'char' ? curChar : state;
        if (nameKey) target[nameKey] = 'Otro';
        saveState(); renderAll();
        setTimeout(() => {
          const freshInp = document.getElementById(targetId);
          if (freshInp) freshInp.click();
        }, 30);
        showToast('Selecciona el color en la paleta libre');
      }
    });
  });

  sec.querySelectorAll('.del-ropa').forEach(b => b.addEventListener('click', () => {
    curChar.ropaList.splice(Number(b.getAttribute('data-del-ropa')), 1);
    saveState(); renderAll();
  }));

  sec.querySelectorAll('[data-cmic]').forEach(btn => {
    const key = btn.getAttribute('data-cmic');
    btn.addEventListener('click', () => startDictation(txt => { curChar[key] = curChar[key] ? `${curChar[key]} ${txt}` : txt; saveState(); renderAll(); }, btn));
  });
  sec.querySelectorAll('[data-fmic]').forEach(btn => {
    const key = btn.getAttribute('data-fmic');
    btn.addEventListener('click', () => startDictation(txt => { state[key] = state[key] ? `${state[key]} ${txt}` : txt; saveState(); renderAll(); }, btn));
  });

  sec.querySelectorAll('[data-schk]').forEach(chk => {
    const key = chk.getAttribute('data-schk');
    chk.addEventListener('change', () => { state[key] = chk.checked; saveState(); renderAll(); });
  });

  const bToggleCam = document.getElementById('btnToggleAllCam');
  if (bToggleCam) bToggleCam.addEventListener('click', () => {
    const next = !(state.chkPlano !== false && state.chkAngulo !== false && state.chkEnfoque !== false);
    state.chkPlano = next; state.chkAngulo = next; state.chkEnfoque = next;
    saveState(); renderAll();
  });

  const bToggleLight = document.getElementById('btnToggleAllLight');
  if (bToggleLight) bToggleLight.addEventListener('click', () => {
    const next = !(state.chkLuzTipo !== false && state.chkLuzTemp !== false && state.chkAtmosfera !== false);
    state.chkLuzTipo = next; state.chkLuzTemp = next; state.chkAtmosfera = next;
    saveState(); renderAll();
  });

  sec.querySelectorAll('[data-field]').forEach(el => {
    const key = el.getAttribute('data-field');
    const evt = el.tagName === 'SELECT' ? 'change' : 'input';
    el.addEventListener(evt, () => {
      state[key] = el.value; saveState();
      if (key === 'fondoSolido') renderAll();
      else updatePromptPreview();
    });
  });

  sec.querySelectorAll('.esc-modo-btn').forEach(b => b.addEventListener('click', () => { state.escenarioModo = b.getAttribute('data-esc-modo'); saveState(); renderAll(); }));
  sec.querySelectorAll('.light-btn').forEach(b => b.addEventListener('click', () => { state.luzTipo = b.getAttribute('data-light'); saveState(); renderAll(); }));

  // Step 5 (Enfoque) & Step 6 (Iluminación combinable): Image Dropdowns & Presets
  sec.querySelectorAll('.light-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-light-preset'));
      const pr = LIGHT_COMBO_PRESETS[idx];
      if (!pr) return;
      state.chkLuzTipo = true;
      state.chkLuzTemp = true;
      state.chkAtmosfera = true;
      state.luzTipos = [...pr.luzTipos];
      state.luzTipo = pr.luzTipos[0] || 'Ninguno';
      state.luzTemp = pr.luzTemp;
      state.atmosferas = [...pr.atmosferas];
      state.atmosfera = pr.atmosferas[0] || 'Ninguno';
      openLightDropdown = null;
      saveState();
      showToast(`Combinación aplicada: ${pr.name}`);
      renderAll();
    });
  });

  sec.querySelectorAll('.light-chip-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const field = btn.getAttribute('data-light-chip-field');
      const val = btn.getAttribute('data-light-chip-val');
      if (Array.isArray(state[field])) {
        state[field] = state[field].filter(x => x !== val);
        if (field === 'luzTipos') state.luzTipo = state.luzTipos[0] || 'Ninguno';
        if (field === 'atmosferas') state.atmosfera = state.atmosferas[0] || 'Ninguno';
      }
      saveState(); renderAll();
    });
  });

  sec.querySelectorAll('.light-dd-done').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightDropdown = null;
      renderAll();
    });
  });

  sec.querySelectorAll('.light-dd-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.getAttribute('data-light-dd-toggle');
      openLightDropdown = (openLightDropdown === key) ? null : key;
      renderAll();
    });
  });

  sec.querySelectorAll('.light-dd-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const field = btn.getAttribute('data-light-dd-field');
      const val = btn.getAttribute('data-light-dd-val');
      const isMulti = btn.getAttribute('data-light-dd-multi') === '1';

      if (isMulti) {
        if (!Array.isArray(state[field])) state[field] = [];
        if (val === 'Ninguno') {
          state[field] = [];
          openLightDropdown = null;
        } else {
          const i = state[field].indexOf(val);
          if (i >= 0) {
            state[field].splice(i, 1);
          } else {
            if (state[field].length >= 3) {
              state[field].shift();
              showToast('Máximo 3 capas combinadas (se reemplazó la más antigua)');
            }
            state[field].push(val);
          }
        }
        if (field === 'luzTipos') state.luzTipo = state.luzTipos[0] || 'Ninguno';
        if (field === 'atmosferas') state.atmosfera = state.atmosferas[0] || 'Ninguno';
      } else {
        state[field] = val;
        openLightDropdown = null;
      }
      saveState();
      renderAll();
    });
  });

  sec.querySelectorAll('.light-zoom-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = btn.getAttribute('data-light-zoom-img');
      const title = btn.getAttribute('data-light-zoom-title');
      const cat = btn.getAttribute('data-light-zoom-cat');
      if (!img) return;
      document.getElementById('lightboxTitle').textContent = title || 'Referencia visual';
      document.getElementById('lightboxCat').textContent = cat || 'Referencia';
      document.getElementById('lightboxImg').src = img;
      document.getElementById('lightboxDesc').textContent = `Referencia visual aplicada al prompt: "${title}"`;
      document.getElementById('styleLightbox').classList.remove('hidden');
    });
  });

  // Step 8: Text Containers / Speech Bubbles & Tail Direction
  sec.querySelectorAll('.text-container-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-text-container');
      if (state.activeTextIdx >= 0 && state.texts[state.activeTextIdx]) {
        state.texts[state.activeTextIdx].container = val;
      } else {
        state.newTextContainer = val;
      }
      saveState(); renderAll();
    });
  });

  const selTail = document.getElementById('selTextBubbleTail');
  if (selTail) {
    selTail.addEventListener('change', () => {
      if (state.activeTextIdx >= 0 && state.texts[state.activeTextIdx]) {
        state.texts[state.activeTextIdx].bubbleTail = selTail.value;
      } else {
        state.newTextBubbleTail = selTail.value;
      }
      saveState(); updatePromptPreview();
    });
  }

  const chkT = document.getElementById('chkIncluirTexto');
  if (chkT) chkT.addEventListener('change', () => { state.incluirTexto = chkT.checked; saveState(); renderAll(); });

  const chkTPos = document.getElementById('chkTextActivarPos');
  if (chkTPos) chkTPos.addEventListener('change', () => {
    if (state.activeTextIdx >= 0 && state.texts[state.activeTextIdx]) {
      state.texts[state.activeTextIdx].activarPos = chkTPos.checked;
    } else {
      state.newTextActivarPos = chkTPos.checked;
    }
    saveState(); renderAll();
  });

  const bSelDraft = document.getElementById('btnSelectDraftText');
  if (bSelDraft) bSelDraft.addEventListener('click', () => {
    state.activeTextIdx = -1; saveState(); renderAll();
  });

  sec.querySelectorAll('.select-text-btn').forEach(b => b.addEventListener('click', () => {
    state.activeTextIdx = Number(b.getAttribute('data-select-text'));
    saveState(); renderAll();
  }));

  sec.querySelectorAll('.text-pos-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const [px, py] = btn.getAttribute('data-text-pos-preset').split(',').map(Number);
      if (state.activeTextIdx >= 0 && state.texts[state.activeTextIdx]) {
        state.texts[state.activeTextIdx].x = px; state.texts[state.activeTextIdx].y = py;
      } else {
        state.newTextX = px; state.newTextY = py;
      }
      syncTextPosPadUI(px, py);
      saveState(); updatePromptPreview();
    });
  });

  const tPosPad = document.getElementById('textPosInteractivePad');
  if (tPosPad) {
    const applyTPad = (ev) => {
      const rect = tPosPad.getBoundingClientRect();
      const nx = Math.max(8, Math.min(92, Math.round(((ev.clientX - rect.left) / rect.width) * 100)));
      const ny = Math.max(10, Math.min(90, Math.round(((ev.clientY - rect.top) / rect.height) * 100)));
      if (state.activeTextIdx >= 0 && state.texts[state.activeTextIdx]) {
        state.texts[state.activeTextIdx].x = nx; state.texts[state.activeTextIdx].y = ny;
      } else {
        state.newTextX = nx; state.newTextY = ny;
      }
      syncTextPosPadUI(nx, ny);
      saveState(); updatePromptPreview();
    };
    tPosPad.addEventListener('pointerdown', (e) => {
      e.preventDefault(); tPosPad.setPointerCapture(e.pointerId); applyTPad(e);
      const onMove = (ev) => applyTPad(ev);
      const onUp = () => { tPosPad.removeEventListener('pointermove', onMove); tPosPad.removeEventListener('pointerup', onUp); };
      tPosPad.addEventListener('pointermove', onMove); tPosPad.addEventListener('pointerup', onUp);
    });
  }

  const bAddT = document.getElementById('btnAddText');
  if (bAddT) bAddT.addEventListener('click', () => {
    if (!state.newText.trim()) return;
    state.texts.push({
      text: state.newText.trim(),
      font: state.newTextFont,
      container: state.newTextContainer || 'Sin globo (texto libre)',
      bubbleTail: state.newTextBubbleTail || 'Automática hacia el personaje',
      activarPos: state.newTextActivarPos !== false,
      x: state.newTextX ?? 50,
      y: state.newTextY ?? 18
    });
    state.newText = '';
    state.newTextY = Math.min(82, (state.newTextY ?? 18) + 22);
    state.activeTextIdx = -1;
    saveState(); showToast('Texto fijado: puedes añadir otro o moverlo en el visor'); renderAll();
  });

  sec.querySelectorAll('.del-text').forEach(b => b.addEventListener('click', () => {
    const idx = Number(b.getAttribute('data-del-text'));
    state.texts.splice(idx, 1);
    if (state.activeTextIdx === idx) state.activeTextIdx = -1;
    else if (state.activeTextIdx > idx) state.activeTextIdx -= 1;
    saveState(); renderAll();
  }));

  sec.querySelectorAll('.style-cat-btn').forEach(b => b.addEventListener('click', () => {
    state.estiloFilter = b.getAttribute('data-style-cat'); saveState(); renderAll();
  }));

  const sInp = document.getElementById('styleSearchInput');
  if (sInp) {
    sInp.addEventListener('click', (e) => e.stopPropagation());
    sInp.addEventListener('input', () => {
      state.estiloSearch = sInp.value; renderAll();
      const a = document.getElementById('styleSearchInput');
      if (a) { a.focus(); a.setSelectionRange(a.value.length, a.value.length); }
    });
  }

  const btnClearSearch = document.getElementById('btnClearStyleSearch');
  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', (e) => {
      e.stopPropagation(); state.estiloSearch = ''; renderAll();
      const a = document.getElementById('styleSearchInput'); if (a) a.focus();
    });
  }

  let currentPreviewStyle = STYLE_PROMPTS.find(s => s.id === state.estiloId) || STYLE_PROMPTS[0];
  const updateStylePreviewPanel = (styleObj, isHover = false) => {
    if (!styleObj) return;
    currentPreviewStyle = styleObj;
    const imgEl = document.getElementById('stylePreviewImg');
    const titleEl = document.getElementById('stylePreviewTitle');
    const catEl = document.getElementById('stylePreviewCat');
    const descEl = document.getElementById('stylePreviewDesc');
    const modeEl = document.getElementById('stylePreviewBadgeMode');
    const dotEl = document.getElementById('stylePreviewDot');
    if (imgEl) { imgEl.src = styleObj.img; imgEl.alt = styleObj.name; }
    if (titleEl) titleEl.textContent = styleObj.name;
    if (catEl) catEl.textContent = styleObj.cat;
    if (descEl) descEl.textContent = `"${styleObj.desc}"`;
    if (modeEl) {
      const isSelected = styleObj.id === state.estiloId;
      modeEl.textContent = isSelected ? 'Estilo Seleccionado' : (isHover ? 'Vista Previa (Cursor)' : 'Vista Previa');
    }
    if (dotEl) {
      const isSelected = styleObj.id === state.estiloId;
      dotEl.className = `w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-violet-500' : 'bg-amber-400'}`;
    }
  };

  sec.querySelectorAll('.style-card').forEach(c => {
    const sid = Number(c.getAttribute('data-style-id'));
    c.addEventListener('mouseenter', () => {
      if (sid > 0) {
        const st = STYLE_PROMPTS.find(s => s.id === sid);
        if (st) updateStylePreviewPanel(st, true);
      }
    });
    c.addEventListener('mouseleave', () => {
      const sel = STYLE_PROMPTS.find(s => s.id === state.estiloId);
      if (sel) updateStylePreviewPanel(sel, false);
    });
    c.addEventListener('click', (e) => {
      e.stopPropagation();
      state.estiloId = sid;
      styleDropdownOpen = false;
      saveState();
      renderAll();
    });
  });

  const btnPrevStyle = document.getElementById('btnPrevStyle');
  if (btnPrevStyle) {
    btnPrevStyle.addEventListener('click', () => {
      const idx = STYLE_PROMPTS.findIndex(s => s.id === state.estiloId);
      state.estiloId = STYLE_PROMPTS[idx <= 0 ? STYLE_PROMPTS.length - 1 : idx - 1].id;
      styleDropdownOpen = false; saveState(); renderAll();
    });
  }

  const btnNextStyle = document.getElementById('btnNextStyle');
  if (btnNextStyle) {
    btnNextStyle.addEventListener('click', () => {
      const idx = STYLE_PROMPTS.findIndex(s => s.id === state.estiloId);
      state.estiloId = STYLE_PROMPTS[idx < 0 || idx >= STYLE_PROMPTS.length - 1 ? 0 : idx + 1].id;
      styleDropdownOpen = false; saveState(); renderAll();
    });
  }

  const btnZoomStyle = document.getElementById('btnZoomStyle');
  if (btnZoomStyle) {
    btnZoomStyle.addEventListener('click', () => {
      const sel = currentPreviewStyle || STYLE_PROMPTS.find(s => s.id === state.estiloId) || STYLE_PROMPTS[0];
      if (!sel) return;
      document.getElementById('lightboxTitle').textContent = sel.name;
      document.getElementById('lightboxCat').textContent = sel.cat;
      document.getElementById('lightboxImg').src = sel.img;
      document.getElementById('lightboxDesc').textContent = '"' + sel.desc + '"';
      document.getElementById('styleLightbox').classList.remove('hidden');
    });
  }
}

function syncPosPadUI(c) {
  const pz = document.getElementById('posZoneVal');
  if (pz) pz.textContent = coordsToZone(c.x, c.y);
  const pin = document.getElementById('posInteractivePin');
  if (pin) { pin.style.left = `${c.x}%`; pin.style.top = `${c.y}%`; }
}

function syncTextPosPadUI(x, y) {
  const pz = document.getElementById('textPosZoneVal');
  if (pz) pz.textContent = coordsToZone(x, y);
  const pin = document.getElementById('textPosInteractivePin');
  if (pin) { pin.style.left = `${x}%`; pin.style.top = `${y}%`; }
}

function goStep(n) {
  styleDropdownOpen = false;
  openLightDropdown = null;
  state.step = Math.max(1, Math.min(8, n));
  saveState(); renderAll();
}

document.addEventListener('click', (e) => {
  if (styleDropdownOpen && !e.target.closest('#styleDropdownRoot')) {
    styleDropdownOpen = false; renderAll();
  }
  if (openLightDropdown && !e.target.closest('.light-dd-root')) {
    openLightDropdown = null; renderAll();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lb = document.getElementById('styleLightbox');
    if (lb && !lb.classList.contains('hidden')) lb.classList.add('hidden');
    else if (styleDropdownOpen || openLightDropdown) { styleDropdownOpen = false; openLightDropdown = null; renderAll(); }
  }
});

document.getElementById('btnCloseLightbox').addEventListener('click', () => document.getElementById('styleLightbox').classList.add('hidden'));
document.getElementById('styleLightbox').addEventListener('click', (e) => { if (e.target.id === 'styleLightbox') document.getElementById('styleLightbox').classList.add('hidden'); });
document.getElementById('btnFull').addEventListener('click', () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
  else document.exitFullscreen().catch(() => {});
});
document.getElementById('btnPrevStep').addEventListener('click', () => goStep(state.step - 1));
document.getElementById('btnNextStep').addEventListener('click', () => goStep(state.step + 1));

document.getElementById('btnPreset0').addEventListener('click', () => {
  openLightDropdown = null;
  Object.assign(state, JSON.parse(JSON.stringify(DEFAULT_STATE)), {
    step: 2,
    characters: [makeCharacter({ cat: 'Animal', modoForma: 'Antropomorfo', customName: 'Un gato con botas' })]
  });
  saveState(); showToast('Paso 0 cargado'); renderAll();
});

document.getElementById('btnPresetDoc').addEventListener('click', () => {
  openLightDropdown = null;
  Object.assign(state, JSON.parse(JSON.stringify(DEFAULT_STATE)), {
    step: 3, aspecto: '16:9',
    characters: [makeCharacter({
      cat: 'Persona', sub: 'Niño', genero: 'Mujer', edad: '9 años',
      chkCabello: true, cabelloTipo: 'Trenzas', cabelloColor: 'Negro',
      chkPiel: true, pielTono: 'Trigueño / Medio',
      ropaList: [
        { name: 'Uniforme escolar completo', zona: 'Entero', colorName: 'Azul', colorHex: '#2563EB', estampado: 'Con escudo / logotipo', material: 'Algodón', extras: ['Nuevo / impecable'], detalle: '' },
        { name: 'Sombrero', zona: 'Cabeza', colorName: 'Marrón', colorHex: '#78350F', estampado: 'Bordado andino', material: 'Sin especificar', extras: [], detalle: 'con cinta roja' }
      ],
      chkObjetoMano: true, objetoManoItem: 'Una planta en maceta',
      emocion: 'Entusiasmado', accionTipo: 'Saludando con la mano'
    })],
    escenarioModo: 'Escenario completo', ubicacion: 'biohuerto escolar con montañas al fondo',
    elementos: 'macetas y regadera',
    luzTipo: 'Luz natural del día', luzTipos: ['Luz natural del día', 'Luz volumétrica (rayos de sol)'],
    luzTemp: 'Cálida dorada',
    atmosfera: 'Soleado radiante', atmosferas: ['Soleado radiante'],
    estiloId: 14, incluirTexto: true,
    texts: [{ text: '¡HOLA BIOHUERTO!', font: 'Tipografía infantil colorida', container: 'Globo de diálogo clásico', bubbleTail: 'Automática hacia el personaje', x: 68, y: 20 }]
  });
  saveState(); showToast('Ejemplo cargado'); renderAll();
});

function handleResetAll() {
  styleDropdownOpen = false;
  openLightDropdown = null;
  Object.assign(state, JSON.parse(JSON.stringify(DEFAULT_STATE)));
  saveState(); showToast('Estructurador reiniciado'); renderAll();
}
document.getElementById('btnReset').addEventListener('click', handleResetAll);
const btnResetTop = document.getElementById('btnResetTop');
if (btnResetTop) btnResetTop.addEventListener('click', handleResetAll);

document.getElementById('btnCopyPrompt').addEventListener('click', () => {
  const txt = getPlainPrompt();
  if (!txt) return;
  const done = () => showToast('Prompt copiado para pegar en Google Flow');
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done).catch(() => fallbackCopy(txt, done));
  else fallbackCopy(txt, done);
});

document.querySelectorAll('.light-stage-mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    state.lightStageMode = btn.getAttribute('data-light-stage-mode') || 'photo';
    saveState();
    syncStage();
  });
});

renderAll();
