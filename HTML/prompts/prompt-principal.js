/**
 * Ensamblador del Prompt Principal Inferior (Barra de Colores y Copiado)
 * Une Personaje, Emoción/Postura, Escenario, Cámara, Iluminación, Estilo Visual, Texto (con globos) y Tamaño.
 */

function getPromptParts() {
  const p1 = state.step >= 2 ? state.characters.map(describeCharacterIdentity).join(' y ') : '';
  const p1b = state.step >= 3
    ? state.characters.map((c, i) => {
        const ep = describeCharacterEmotionPosture(c);
        return state.characters.length > 1 && ep ? `sujeto ${i + 1}: ${ep}` : ep;
      }).filter(Boolean).join('; ')
    : '';
  const fondoTxt = state.fondoSolido === 'Otro'
    ? ('fondo ' + ((state.fondoSolidoOtro || '').trim() || hexToSpanishName(state.fondoSolidoHex || '#DBEAFE')))
    : state.fondoSolido.toLowerCase();
  const p2 = state.step >= 2
    ? (state.escenarioModo === 'Fondo sólido' ? fondoTxt : ([state.ubicacion, state.elementos].filter(Boolean).join(', ') || 'escenario detallado'))
    : '';
  const camItems = [];
  if (state.chkPlano !== false && !isNoneVal(state.plano)) camItems.push(state.plano);
  if (state.chkAngulo !== false && !isNoneVal(state.angulo)) camItems.push(state.angulo);
  if (state.chkEnfoque !== false && !isNoneVal(state.enfoque)) camItems.push(state.enfoque);
  const p3 = state.step >= 5 ? camItems.join(', ') : '';

  const lightItems = [];
  const activeLights = Array.isArray(state.luzTipos) && state.luzTipos.length
    ? state.luzTipos.filter(v => !isNoneVal(v))
    : (!isNoneVal(state.luzTipo) ? [state.luzTipo] : []);
  if (state.chkLuzTipo !== false && activeLights.length) {
    lightItems.push(activeLights.length > 1 ? `combinación de ${activeLights.join(' + ')}` : activeLights[0]);
  }
  if (state.chkLuzTemp !== false && !isNoneVal(state.luzTemp)) lightItems.push(state.luzTemp);
  const activeAtms = Array.isArray(state.atmosferas) && state.atmosferas.length
    ? state.atmosferas.filter(v => !isNoneVal(v))
    : (!isNoneVal(state.atmosfera) ? [state.atmosfera] : []);
  if (state.chkAtmosfera !== false && activeAtms.length) {
    lightItems.push(activeAtms.join(' + '));
  }
  const p4 = state.step >= 6 ? lightItems.join(', ') : '';

  const stObj = STYLE_PROMPTS.find(s => s.id === state.estiloId);
  const p5 = stObj ? stObj.desc : '';

  const allTextsForPrompt = [...state.texts];
  if (state.incluirTexto && state.newText && state.newText.trim()) {
    allTextsForPrompt.push({
      text: state.newText.trim(),
      font: state.newTextFont,
      container: state.newTextContainer || 'Sin globo (texto libre)',
      bubbleTail: state.newTextBubbleTail || 'Automática hacia el personaje',
      activarPos: state.newTextActivarPos !== false,
      x: state.newTextX ?? 50,
      y: state.newTextY ?? 18
    });
  }
  const p6 = (state.incluirTexto && allTextsForPrompt.length)
    ? allTextsForPrompt.map(formatSingleTextPrompt).join('; ')
    : '';
  return { p1, p1b, p2, p3, p4, p5, p6 };
}

function getPlainPrompt() {
  const { p1, p1b, p2, p3, p4, p5, p6 } = getPromptParts();
  const chunks = [];
  if (p1 && p1b) chunks.push(`${p1}, ${p1b}`);
  else if (p1) chunks.push(p1);
  if (p2) chunks.push(`sobre ${p2}`);
  if (p3) chunks.push(p3);
  if (p4) chunks.push(`iluminación y atmósfera: ${p4}`);
  if (p5) chunks.push(`estilo visual: ${p5}`);
  if (p6) chunks.push(`con ${p6}`);
  return chunks.join('. ') + `. Relación de aspecto ${state.aspecto}.`;
}

function renderPromptHTML() {
  const { p1, p1b, p2, p3, p4, p5, p6 } = getPromptParts();
  const spans = [];
  if (p1) spans.push(`<span class="inline px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-900 font-medium">${esc(p1)}</span>`);
  if (p1b) spans.push(`<span class="inline px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-900 font-medium">${esc(p1b)}</span>`);
  if (p2) spans.push(`<span class="inline px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-medium">sobre ${esc(p2)}</span>`);
  if (p3) spans.push(`<span class="inline px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-medium">${esc(p3)}</span>`);
  if (p4) spans.push(`<span class="inline px-1.5 py-0.5 rounded bg-orange-100 text-orange-900 font-medium">${esc(p4)}</span>`);
  if (p5) spans.push(`<span class="inline px-1.5 py-0.5 rounded bg-violet-100 text-violet-900 font-medium">${esc(p5)}</span>`);
  if (p6) spans.push(`<span class="inline px-1.5 py-0.5 rounded bg-rose-100 text-rose-900 font-medium">${esc(p6)}</span>`);
  document.getElementById('promptPreview').innerHTML = spans.length
    ? spans.join(' <span class="text-slate-400">·</span> ') + ` <span class="text-[11px] font-bold text-slate-400 ml-1">[${state.aspecto}]</span>`
    : `<span class="text-slate-400">Lienzo seleccionado: <strong>${state.aspecto}</strong>. Avanza al Paso 2 para definir el personaje.</span>`;
}

function updatePromptPreview() {
  renderPromptHTML();
  syncStage();
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta); cb();
}
