/**
 * Configuración y Prompts para Escenario (Paso 4), Cámara (Paso 5),
 * Iluminación con Imágenes (Paso 6) y Texto con Globos de Conversación (Paso 8)
 */

const FONDO_SOLIDO_COLORS = {
  'Fondo blanco puro': '#FFFFFF',
  'Fondo negro sólido': '#0F172A',
  'Fondo pastel neutro limpio': '#E0F2FE',
  'Fondo crema cálido': '#FEF3C7',
  'Fondo menta suave': '#D1FAE5',
  'Fondo lavanda suave': '#EDE9FE',
  'Fondo rosa pastel': '#FFE4E6',
  'Fondo gris estudio': '#E2E8F0'
};

const PLANOS_OPTS = [
  'Ninguno',
  'Plano detalle (macro extremo)',
  'Primerísimo primer plano (ojos y rostro)',
  'Primer plano (rostro y hombros)',
  'Plano medio corto (pecho hacia arriba)',
  'Plano medio (cintura hacia arriba)',
  'Plano medio largo (cadera hacia arriba)',
  'Plano americano (rodillas hacia arriba)',
  'Plano entero (cuerpo completo)',
  'Plano conjunto (varios sujetos)',
  'Plano general (sujeto y entorno)',
  'Gran plano general (paisaje amplio)',
  'Plano panorámico amplio',
  'Plano sobre el hombro (Over the Shoulder)',
  'Plano subjetivo (POV / primera persona)',
  'Plano escorzo (diagonal de conversación)',
  'Plano reflejo (en espejo o agua)'
];

const ANGULOS_OPTS = [
  'Ninguno',
  'Frontal a nivel de ojos',
  'Tres cuartos (perfil diagonal)',
  'Perfil lateral (90°)',
  'Desde atrás (espaldas)',
  'Picado suave (ligeramente desde arriba)',
  'Picado pronunciado (desde arriba)',
  'Cenital (90° vista aérea total)',
  'Vista de pájaro (aérea diagonal)',
  'Contrapicado suave (ligeramente desde abajo)',
  'Contrapicado heroico (desde abajo)',
  'Nadir (90° desde el suelo hacia arriba)',
  'A ras del suelo (ángulo gusano)',
  'Plano holandés / aberrante (inclinado)',
  'Vista isométrica (3/4 elevado)',
  'Perspectiva aérea / dron',
  'Contraplano / ángulo inverso'
];

const ENFOQUES_OPTS = [
  { label: 'Ninguno', short: 'Ninguno', img: '', hint: 'Sin enfoque ni lente fijo' },
  { label: 'Fondo desenfocado suave (bokeh 50mm f/1.8)', short: 'Bokeh 50mm f/1.8', img: './imagenes/enfoque-01-bokeh-50mm.jpg', hint: 'Sujeto nítido y fondo suavemente borroso' },
  { label: 'Bokeh cinematográfico extremo (85mm f/1.2)', short: 'Bokeh 85mm f/1.2', img: './imagenes/enfoque-02-retrato-85mm.jpg', hint: 'Separación cremosa extrema y luces bokeh grandes' },
  { label: 'Gran angular nítido (24mm, todo enfocado)', short: 'Gran angular 24mm', img: './imagenes/enfoque-03-angular-24mm.jpg', hint: 'Campo amplio y gran nitidez del frente al fondo' },
  { label: 'Ultra gran angular (14mm, perspectiva amplia)', short: 'Ultra angular 14mm', img: './imagenes/enfoque-04-ultra-angular-14mm.jpg', hint: 'Perspectiva dramática expansiva de todo el entorno' },
  { label: 'Teleobjetivo comprimido (135mm–200mm)', short: 'Teleobjetivo 200mm', img: './imagenes/enfoque-05-teleobjetivo-200mm.jpg', hint: 'Fondo cercano y comprimido con suave desenfoque' },
  { label: 'Lente macro (detalle microscópico)', short: 'Macro extremo', img: './imagenes/enfoque-06-macro-extremo.jpg', hint: 'Acercamiento extremo con profundidad mínima' },
  { label: 'Ojo de pez creativo (curvatura extrema)', short: 'Ojo de pez', img: './imagenes/enfoque-07-ojo-de-pez.jpg', hint: 'Horizonte curvo panorámico de 180° muy dinámico' },
  { label: 'Enfoque selectivo en primer plano', short: 'Enfoque en frente', img: './imagenes/enfoque-08-enfoque-selectivo-frente.jpg', hint: 'Objeto cercano nítido, el resto del fondo borroso' },
  { label: 'Enfoque profundo (deep focus, todo nítido)', short: 'Deep Focus f/16', img: './imagenes/enfoque-09-enfoque-profundo.jpg', hint: 'Primer plano, plano medio y horizonte 100% nítidos' },
  { label: 'Efecto maqueta (Tilt-Shift)', short: 'Maqueta Tilt-Shift', img: './imagenes/enfoque-10-tilt-shift.jpg', hint: 'Banda central nítida; arriba y abajo muy borrosos' },
  { label: 'Lente anamórfico cinematográfico (destellos)', short: 'Anamórfico Cine', img: './imagenes/enfoque-11-anamorfico-cinematografico.jpg', hint: 'Destellos horizontales azulados y bokeh ovalado' },
  { label: 'Enfoque suave soñador (soft focus)', short: 'Soft Focus', img: './imagenes/enfoque-12-enfoque-suave-soft.jpg', hint: 'Halo luminoso romántico y bordes aterciopelados' },
  { label: 'Desenfoque de movimiento (motion blur)', short: 'Motion Blur', img: './imagenes/enfoque-13-desenfoque-movimiento.jpg', hint: 'Estela veloz de movimiento sobre escena estática' },
  { label: 'Barrido fotográfico (panning)', short: 'Barrido Panning', img: './imagenes/enfoque-14-barrido-panning.jpg', hint: 'Sujeto en movimiento nítido y fondo barrido en líneas' },
  { label: 'Larga exposición (estelas de luz)', short: 'Larga exposición', img: './imagenes/enfoque-15-larga-exposicion.jpg', hint: 'Trazos luminosos continuos y sedosos en el tiempo' },
  { label: 'Enfoque dividido (split diopter)', short: 'Split Diopter', img: './imagenes/enfoque-16-enfoque-dividido.jpg', hint: 'Sujeto muy cercano y sujeto lejano ambos nítidos' }
];

// --- PASO 6: ILUMINACIÓN CON IMÁGENES DE REFERENCIA ---
const LUCES_OPTS = [
  { label: 'Ninguno', icon: 'ban', img: '' },
  { label: 'Luz natural del día', icon: 'sun', img: './imagenes/luz-tipo-01-natural.jpg' },
  { label: 'Hora dorada (atardecer cálido)', icon: 'sunset', img: './imagenes/luz-tipo-02-hora-dorada.jpg' },
  { label: 'Hora azul (crepúsculo)', icon: 'moon-star', img: './imagenes/luz-tipo-03-hora-azul.jpg' },
  { label: 'Amanecer suave', icon: 'sunrise', img: './imagenes/luz-tipo-04-amanecer.jpg' },
  { label: 'Luz de estudio suave (softbox)', icon: 'lamp-desk', img: './imagenes/luz-tipo-05-estudio.jpg' },
  { label: 'Iluminación Rembrandt (claroscuro)', icon: 'contrast', img: './imagenes/luz-tipo-06-rembrandt.jpg' },
  { label: 'Luz lateral dramática (split)', icon: 'split', img: './imagenes/luz-tipo-07-lateral-split.jpg' },
  { label: 'Contraluz cinematográfico (rim light)', icon: 'sparkles', img: './imagenes/luz-tipo-08-contraluz.jpg' },
  { label: 'Luz volumétrica (rayos de sol)', icon: 'sun-dim', img: './imagenes/luz-tipo-09-volumetrica.jpg' },
  { label: 'Luz de velas o fogata cálida', icon: 'flame', img: './imagenes/luz-tipo-10-velas.jpg' },
  { label: 'Iluminación neón cyberpunk', icon: 'zap', img: './imagenes/luz-tipo-11-neon.jpg' },
  { label: 'Luz de luna nocturna', icon: 'moon', img: './imagenes/luz-tipo-12-luna.jpg' },
  { label: 'Bioluminiscencia mágica', icon: 'wand-2', img: './imagenes/luz-tipo-13-bioluminiscencia.jpg' },
  { label: 'Luz de ventana lateral natural', icon: 'blinds', img: './imagenes/luz-tipo-14-ventana.jpg' },
  { label: 'Tormenta con relámpagos dramáticos', icon: 'cloud-lightning', img: './imagenes/luz-tipo-15-tormenta.jpg' },
  { label: 'Iluminación cenital teatral (spotlight)', icon: 'flashlight', img: './imagenes/luz-tipo-16-cenital.jpg' }
];

const LUZ_TEMP_OPTS = [
  { label: 'Ninguno', icon: 'ban', img: '' },
  { label: 'Neutra equilibrada', icon: 'circle-dot', img: './imagenes/luz-temp-01-neutra.jpg' },
  { label: 'Cálida dorada', icon: 'sun', img: './imagenes/luz-temp-02-calida.jpg' },
  { label: 'Ámbar intensa', icon: 'flame', img: './imagenes/luz-temp-03-ambar.jpg' },
  { label: 'Pastel suave', icon: 'cloud', img: './imagenes/luz-temp-04-pastel.jpg' },
  { label: 'Fría azulada', icon: 'snowflake', img: './imagenes/luz-temp-05-fria.jpg' },
  { label: 'Tecnológica / cian', icon: 'cpu', img: './imagenes/luz-temp-06-cian.jpg' },
  { label: 'Nocturna profunda', icon: 'moon', img: './imagenes/luz-temp-07-nocturna.jpg' },
  { label: 'Dramática alto contraste (chiaroscuro)', icon: 'contrast', img: './imagenes/luz-temp-08-contraste.jpg' },
  { label: 'Tonos neón vibrantes', icon: 'zap', img: './imagenes/luz-temp-09-neon.jpg' },
  { label: 'Monocromática / sepia', icon: 'palette', img: './imagenes/luz-temp-10-sepia.jpg' }
];

const ATMOSFERA_OPTS = [
  { label: 'Ninguno', icon: 'ban', img: '' },
  { label: 'Despejado y luminoso', icon: 'sun', img: './imagenes/luz-atm-01-despejado.jpg' },
  { label: 'Soleado radiante', icon: 'sparkles', img: './imagenes/luz-atm-02-soleado.jpg' },
  { label: 'Nublado suave', icon: 'cloud', img: './imagenes/luz-atm-03-nublado.jpg' },
  { label: 'Bruma / neblina matinal', icon: 'cloud-fog', img: './imagenes/luz-atm-04-bruma.jpg' },
  { label: 'Niebla misteriosa', icon: 'wind', img: './imagenes/luz-atm-05-niebla.jpg' },
  { label: 'Lluvia ligera con reflejos', icon: 'cloud-rain', img: './imagenes/luz-atm-06-lluvia.jpg' },
  { label: 'Tormenta intensa', icon: 'cloud-lightning', img: './imagenes/luz-atm-07-tormenta.jpg' },
  { label: 'Nieve cayendo', icon: 'snowflake', img: './imagenes/luz-atm-08-nieve.jpg' },
  { label: 'Viento con hojas o pétalos', icon: 'leaf', img: './imagenes/luz-atm-09-viento.jpg' },
  { label: 'Polvo flotante en rayos de luz', icon: 'sun-dim', img: './imagenes/luz-atm-10-polvo.jpg' },
  { label: 'Partículas mágicas brillantes', icon: 'wand-2', img: './imagenes/luz-atm-11-particulas.jpg' },
  { label: 'Humo atmosférico suave', icon: 'flame', img: './imagenes/luz-atm-12-humo.jpg' },
  { label: 'Cielo estrellado nocturno', icon: 'moon-star', img: './imagenes/luz-atm-13-estrellas.jpg' },
  { label: 'Aurora boreal', icon: 'rainbow', img: './imagenes/luz-atm-14-aurora.jpg' },
  { label: 'Atardecer con nubes doradas', icon: 'sunset', img: './imagenes/luz-atm-15-nubes-doradas.jpg' }
];

const LIGHT_COMBO_PRESETS = [
  {
    id: 'atardecer-cine',
    label: 'Atardecer cinematográfico',
    luces: ['Hora dorada (atardecer cálido)', 'Contraluz cinematográfico (rim light)'],
    temp: 'Cálida dorada',
    atmosferas: ['Atardecer con nubes doradas', 'Polvo flotante en rayos de luz']
  },
  {
    id: 'neon-lluvia',
    label: 'Noche neón lluviosa',
    luces: ['Iluminación neón cyberpunk', 'Contraluz cinematográfico (rim light)'],
    temp: 'Tonos neón vibrantes',
    atmosferas: ['Lluvia ligera con reflejos', 'Niebla misteriosa']
  },
  {
    id: 'bosque-magico',
    label: 'Bosque mágico',
    luces: ['Luz volumétrica (rayos de sol)', 'Bioluminiscencia mágica'],
    temp: 'Pastel suave',
    atmosferas: ['Bruma / neblina matinal', 'Partículas mágicas brillantes']
  },
  {
    id: 'teatro-dramatico',
    label: 'Teatro claroscuro',
    luces: ['Iluminación Rembrandt (claroscuro)', 'Iluminación cenital teatral (spotlight)'],
    temp: 'Dramática alto contraste (chiaroscuro)',
    atmosferas: ['Humo atmosférico suave']
  },
  {
    id: 'fogata-estrellas',
    label: 'Fogata bajo estrellas',
    luces: ['Luz de velas o fogata cálida', 'Luz de luna nocturna'],
    temp: 'Ámbar intensa',
    atmosferas: ['Cielo estrellado nocturno', 'Partículas mágicas brillantes']
  },
  {
    id: 'tormenta-aurora',
    label: 'Noche ártica nevada',
    luces: ['Hora azul (crepúsculo)', 'Luz de luna nocturna'],
    temp: 'Fría azulada',
    atmosferas: ['Aurora boreal', 'Nieve cayendo']
  }
];

// --- PASO 8: TEXTO, TIPOGRAFÍA Y GLOBOS DE CONVERSACIÓN ---
const TEXT_FONT_OPTS = [
  'Ninguno',
  'Letras grandes en negrita',
  'Letra manuscrita escolar',
  'Tipografía infantil colorida',
  'Cartel luminoso neón',
  'Tipografía cinematográfica épica',
  'Estilo cómic con borde grueso',
  'Minimalista moderna limpia'
];

const TEXT_CONTAINER_OPTS = [
  {
    id: 'Sin globo (texto libre)',
    short: 'Texto libre',
    icon: 'type',
    hasTail: false,
    promptDesc: 'sin globo de conversación (texto libre)'
  },
  {
    id: 'Globo de diálogo clásico',
    short: 'Diálogo',
    icon: 'message-circle',
    hasTail: true,
    promptDesc: 'dentro de un globo de diálogo clásico de conversación'
  },
  {
    id: 'Globo de pensamiento (nube)',
    short: 'Pensamiento',
    icon: 'cloud',
    hasTail: true,
    promptDesc: 'dentro de un globo de pensamiento en forma de nube'
  },
  {
    id: 'Globo de grito / exclamación (cómic)',
    short: 'Grito / Cómic',
    icon: 'zap',
    hasTail: true,
    promptDesc: 'dentro de un globo de grito o exclamación con puntas estilo cómic'
  },
  {
    id: 'Globo de susurro (borde punteado)',
    short: 'Susurro',
    icon: 'message-circle-dashed',
    hasTail: true,
    promptDesc: 'dentro de un globo de susurro con borde punteado suave'
  },
  {
    id: 'Cartel / pancarta',
    short: 'Cartel',
    icon: 'rectangle-horizontal',
    hasTail: false,
    promptDesc: 'escrito en un cartel o pancarta dentro de la escena'
  },
  {
    id: 'Cinta / banner decorativo',
    short: 'Cinta / Banner',
    icon: 'ribbon',
    hasTail: false,
    promptDesc: 'dentro de una cinta o banner decorativo'
  },
  {
    id: 'Caja de narrador / subtítulo',
    short: 'Narrador',
    icon: 'captions',
    hasTail: false,
    promptDesc: 'dentro de un recuadro de narrador o subtítulo'
  },
  {
    id: 'Letrero de madera',
    short: 'Madera',
    icon: 'signpost',
    hasTail: false,
    promptDesc: 'pintado sobre un letrero de madera'
  },
  {
    id: 'Letrero luminoso neón',
    short: 'Neón',
    icon: 'sparkles',
    hasTail: false,
    promptDesc: 'en un letrero luminoso de neón brillante'
  }
];

const TEXT_BUBBLE_TAIL_OPTS = [
  'Automática hacia el personaje',
  'Apuntando abajo a la izquierda',
  'Apuntando abajo a la derecha',
  'Apuntando hacia arriba',
  'Sin cola'
];

function formatSingleTextPrompt(t) {
  const contObj = TEXT_CONTAINER_OPTS.find(c => c.id === t.container);
  let contPart = '';
  if (contObj) {
    contPart = ` ${contObj.promptDesc}`;
    if (contObj.hasTail && t.bubbleTail && t.bubbleTail !== 'Sin cola') {
      contPart += ` con cola ${t.bubbleTail.toLowerCase()}`;
    }
  }
  const fontPart = !isNoneVal(t.font) ? ` (${t.font.toLowerCase()})` : '';
  const posPart = t.activarPos !== false ? ` ${coordsToZone(t.x, t.y)}` : '';
  return `texto "${t.text}"${contPart}${fontPart}${posPart}`;
}
