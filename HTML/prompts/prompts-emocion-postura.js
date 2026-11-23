/**
 * Configuración y Prompts para Emoción, Postura, Posición y Tamaño del Sujeto (Paso 3)
 */

function coordsToZone(x, y) {
  const v = y < 34 ? 'parte superior' : (y > 66 ? 'parte inferior' : 'zona central');
  const h = x < 34 ? 'izquierda' : (x > 66 ? 'derecha' : 'centro');
  if (v === 'zona central' && h === 'centro') return 'en el centro del encuadre';
  if (h === 'centro') return `en la ${v} central`;
  return `en la ${v} ${h}`;
}

function scaleToWord(s) {
  if (s < 80) return 'tamaño pequeño en el encuadre';
  if (s > 120) return 'tamaño grande destacado';
  return 'tamaño mediano equilibrado';
}

function describeCharacterEmotionPosture(c) {
  const parts = [];
  const hasEmotion = c.cat === 'Persona' || c.cat === 'Animal' || c.cat === 'Personalizado' || (c.cat === 'Objeto' && c.modoForma === 'Antropomorfo');
  if (c.emocion && !isNoneVal(c.emocion) && hasEmotion) {
    const emTxt = c.emocion === 'Otro' ? (c.emocionOtro || '').trim() : c.emocion.toLowerCase();
    if (emTxt) parts.push(`expresión ${emTxt}`);
  }
  if (c.accionTipo && !isNoneVal(c.accionTipo)) {
    const acc = c.accionTipo === 'Otro' ? (c.accionOtro || '').trim() : c.accionTipo.toLowerCase();
    if (acc) parts.push(acc);
  }
  if (c.activarPosicion) parts.push(`ubicado ${coordsToZone(c.x, c.y)}`);
  if (c.activarTamano) parts.push(scaleToWord(c.escala));
  return parts.join(', ');
}
