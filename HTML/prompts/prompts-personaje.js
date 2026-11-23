/**
 * Configuración, Catálogos y Prompts para Personaje, Rasgos, Ropa y Objetos (Paso 2)
 */

const PERSONA_SUBS = ['Ninguno', 'Bebé', 'Niño', 'Adolescente', 'Adulto', 'Adulto mayor', 'Otro'];
const PERSONA_MODEL_CARDS = [
  { id: 'Bebé', label: 'Bebé', sub: '0–2 años', icon: 'baby' },
  { id: 'Niño', label: 'Niño / Niña', sub: 'Infantil', icon: 'smile' },
  { id: 'Adolescente', label: 'Adolescente', sub: 'Juvenil', icon: 'headphones' },
  { id: 'Adulto', label: 'Adulto', sub: 'Joven / Adulto', icon: 'user' },
  { id: 'Adulto mayor', label: 'Adulto mayor', sub: 'Senior', icon: 'glasses' },
  { id: 'Otro', label: 'Otro', sub: 'Polera / Libre', icon: 'shirt' },
  { id: 'Ninguno', label: 'Ninguno', sub: 'Sin modelo fijo', icon: 'ban' }
];
const GENERO_OPTS = ['Hombre', 'Mujer'];

function isNoneVal(v) {
  return !v || v === 'Ninguno' || v === 'Sin especificar' || v === 'No especificar' || v === 'Ninguno (tipografía libre)';
}

const ROPA_CATS = {
  'Cabeza': ['Sombrero', 'Sombrero andino / chullo', 'Gorra', 'Casco', 'Boina', 'Diadema / vincha', 'Pañuelo / bandana', 'Gorro de lana', 'Corona / tiara', 'Lazo / moño', 'Otro'],
  'Rostro': ['Lentes', 'Anteojos de sol', 'Aretes', 'Mascarilla', 'Bufanda / pañuelo al cuello', 'Otro'],
  'Cuerpo': ['Polo casual', 'Camiseta manga larga', 'Camisa', 'Blusa', 'Chompa / Suéter', 'Polera con capucha', 'Casaca / Chaqueta', 'Chaleco', 'Poncho', 'Bata de laboratorio', 'Delantal / Mandil', 'Pantalón', 'Jeans', 'Short / Bermudas', 'Falda', 'Otro'],
  'Entero': ['Uniforme escolar completo', 'Vestido', 'Terno / Traje formal', 'Traje típico', 'Overol', 'Buzo deportivo', 'Túnica / Capa', 'Otro'],
  'Zapatos': ['Zapatillas', 'Zapatos escolares', 'Botas', 'Botines', 'Sandalias', 'Ojotas', 'Tacones', 'Otro']
};

const ROPA_COLORS = {
  'Rojo': '#DC2626',
  'Azul': '#2563EB',
  'Celeste': '#38BDF8',
  'Verde': '#16A34A',
  'Amarillo': '#EAB308',
  'Naranja': '#EA580C',
  'Morado': '#7C3AED',
  'Rosado': '#EC4899',
  'Marrón': '#78350F',
  'Negro': '#1E293B',
  'Blanco': '#F8FAFC',
  'Gris': '#64748B',
  'Dorado': '#D97706',
  'Turquesa': '#0D9488'
};

const ROPA_ESTAMPADOS = ['Ninguno', 'Liso', 'A rayas', 'A cuadros', 'Con lunares', 'Estampado floral', 'Bordado andino', 'Con escudo / logotipo', 'Deportivo'];
const ROPA_MATERIALES = ['Ninguno', 'Algodón', 'Lana / Tejido', 'Jean / Denim', 'Cuero', 'Impermeable', 'Seda / Brillante', 'Tela gruesa'];
const ROPA_EXTRAS_CHIPS = ['Con bolsillos', 'Con botones', 'Con cierre', 'Con capucha', 'Manga larga', 'Manga corta', 'Holgado', 'Ajustado', 'Nuevo / impecable', 'Desgastado / vintage'];

const OBJETOS_MANO = ['Ninguno', 'Un libro abierto', 'Una lupa', 'Una planta en maceta', 'Una tablet educativa', 'Un lápiz o pincel', 'Una mochila', 'Otro'];

const HAIR_COLORS = {
  'Negro': 0x1E293B,
  'Castaño oscuro': 0x451A03,
  'Castaño': 0x78350F,
  'Castaño claro': 0xA16207,
  'Rubio': 0xEAB308,
  'Pelirrojo': 0xC2410C,
  'Canoso / Blanco': 0xE2E8F0,
  'Azul': 0x2563EB,
  'Morado': 0x7C3AED,
  'Rosado': 0xEC4899
};

const BARBA_TIPOS = [
  { id: 'Barba de 3 días', short: '3 días', sub: 'Sombra ligera' },
  { id: 'Corta cuidada', short: 'Corta', sub: 'Perfilada' },
  { id: 'Completa poblada', short: 'Completa', sub: 'Tupida' },
  { id: 'Candado / Perilla', short: 'Candado', sub: 'Perilla + bigote' },
  { id: 'Solo bigote', short: 'Bigote', sub: 'Clásico' },
  { id: 'Larga de leñador', short: 'Larga', sub: 'Voluminosa' },
  { id: 'Otro', short: 'Otro', sub: 'Libre' }
];

const BARBA_COLORS = {
  'Negro': 0x1E293B,
  'Castaño oscuro': 0x451A03,
  'Castaño': 0x78350F,
  'Castaño claro': 0xA16207,
  'Rubio': 0xD97706,
  'Pelirrojo': 0xB45309,
  'Entrecano / Sal y pimienta': 0x64748B,
  'Canoso / Blanco': 0xE2E8F0
};

const EYE_COLORS = {
  'Oscuros': 0x0F172A,
  'Castaños': 0x78350F,
  'Avellana': 0x92400E,
  'Miel': 0xB45309,
  'Verdes': 0x15803D,
  'Azules': 0x1D4ED8,
  'Celestes': 0x38BDF8,
  'Grises': 0x64748B,
  'Violeta': 0x7C3AED
};

const SKIN_TONES = {
  'Neutro (maniquí)': 0x94A3B8,
  'Muy claro / Porcelana': 0xFFF1E6,
  'Claro rosado': 0xFDE2D2,
  'Claro': 0xFDE6C4,
  'Claro cálido': 0xF3CFA4,
  'Trigueño claro': 0xE5B887,
  'Trigueño / Medio': 0xD9A066,
  'Aceitunado / Dorado': 0xC68E53,
  'Canela / Bronceado': 0xB07342,
  'Moreno': 0x8D5524,
  'Moreno oscuro': 0x6E3F1D,
  'Oscuro': 0x5C3A21,
  'Ébano / Muy oscuro': 0x3E2414
};

const SUBJECT_COLORS = {
  'Marrón cálido': '#B45309',
  'Dorado / Miel': '#D99B58',
  'Blanco': '#F8FAFC',
  'Negro': '#1E293B',
  'Gris': '#64748B',
  'Naranja zorro': '#EA580C',
  'Azul cielo': '#0EA5E9',
  'Verde esmeralda': '#16A34A',
  'Rojo carmesí': '#DC2626',
  'Amarillo': '#EAB308',
  'Morado': '#7C3AED',
  'Rosado': '#EC4899'
};

const HAIR_IMGS = {
  'Corto': './imagenes/cabello-corto.jpg',
  'Largo': './imagenes/cabello-largo.jpg',
  'Rizado': './imagenes/cabello-rizado.jpg',
  'Trenzas': './imagenes/cabello-trenzas.jpg'
};

const ANIMAL_SILUETAS = [
  { id: 'Cuadrúpedo', label: 'Cuadrúpedo', sub: 'Ref. 4 patas', icon: 'dog' },
  { id: 'Bípedo', label: 'Bípedo', sub: 'Ref. 2 patas', icon: 'paw-print' },
  { id: 'Con alas', label: 'Con alas', sub: 'Ref. alado', icon: 'bird' },
  { id: 'Insecto', label: 'Insecto', sub: 'Ref. insecto', icon: 'bug' },
  { id: 'Ninguno', label: 'Ninguno', sub: 'Sin referente', icon: 'ban' }
];

function normalizeAnimalSilueta(sil) {
  if (!sil || sil === 'Ninguno') return 'Ninguno';
  if (sil.includes('Panda') || sil.includes('Oso') || sil.includes('Canguro') || sil.includes('Bípedo')) return 'Bípedo';
  if (sil.includes('Ave') || sil.includes('alas')) return 'Con alas';
  if (sil.includes('Insecto')) return 'Insecto';
  return 'Cuadrúpedo';
}

function numToHex(n) {
  if (typeof n === 'string') return n.startsWith('#') ? n.toUpperCase() : '#' + n.toUpperCase();
  return '#' + (n >>> 0).toString(16).padStart(6, '0').toUpperCase();
}

function hexToInt(hex, fallback = 0x4F46E5) {
  if (!hex || typeof hex !== 'string') return fallback;
  const clean = hex.replace('#', '').trim();
  if (/^[0-9a-fA-F]{6}$/.test(clean)) return parseInt(clean, 16);
  return fallback;
}

function hexToSpanishName(hex) {
  const n = hexToInt(hex, 0);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 510;
  const d = max - min;
  const s = d === 0 ? 0 : d / (255 - Math.abs(max + min - 255));
  if (l < 0.14) return `negro (${hex.toUpperCase()})`;
  if (l > 0.92 && s < 0.2) return `blanco (${hex.toUpperCase()})`;
  if (s < 0.14) return l > 0.6 ? `gris claro (${hex.toUpperCase()})` : `gris (${hex.toUpperCase()})`;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  let base = 'color personalizado';
  if (h < 15 || h >= 345) base = l > 0.68 ? 'rosado' : (l < 0.32 ? 'rojo oscuro' : 'rojo');
  else if (h < 42) base = l < 0.42 ? 'marrón' : (l > 0.72 ? 'durazno claro' : 'naranja');
  else if (h < 68) base = l > 0.75 ? 'amarillo pastel' : (l < 0.4 ? 'mostaza oscuro' : 'amarillo');
  else if (h < 160) base = l > 0.68 ? 'verde claro' : (l < 0.32 ? 'verde oscuro' : 'verde');
  else if (h < 205) base = l > 0.65 ? 'celeste' : 'turquesa';
  else if (h < 255) base = l > 0.68 ? 'azul claro' : (l < 0.32 ? 'azul marino' : 'azul');
  else if (h < 295) base = l > 0.68 ? 'lila' : 'morado';
  else base = l > 0.68 ? 'rosa claro' : 'fucsia';
  return `${base} (${hex.toUpperCase()})`;
}

function mapObjToSwatches(obj, excludeKeys = []) {
  return Object.entries(obj)
    .filter(([k]) => !excludeKeys.includes(k))
    .map(([name, val]) => ({ name, hex: numToHex(val) }));
}

function formatRopaItemText(item) {
  if (typeof item === 'string') return item;
  if (!item || !item.name) return '';
  let txt = item.name;
  if (!isNoneVal(item.colorName)) {
    txt += ` de color ${item.colorName.toLowerCase()}`;
  }
  const specs = [];
  if (!isNoneVal(item.material)) specs.push(`de ${item.material.toLowerCase()}`);
  if (!isNoneVal(item.estampado)) specs.push(item.estampado.toLowerCase());
  if (Array.isArray(item.extras) && item.extras.length) specs.push(item.extras.map(x => x.toLowerCase()).join(', '));
  if (specs.length) txt += `, ${specs.join(', ')}`;
  if (item.detalle && item.detalle.trim()) {
    txt += ` (${item.detalle.trim()})`;
  }
  return txt;
}

function getRopaHex(item) {
  if (typeof item === 'object' && item && item.colorHex) return item.colorHex;
  return null;
}

function describeCharacterIdentity(c) {
  let base = '';
  const edadTxt = (c.edad || '').trim();
  if (c.cat === 'Persona') {
    const isMujer = c.genero === 'Mujer';
    const genWord = isMujer ? 'mujer' : 'hombre';
    if (isNoneVal(c.sub)) {
      base = (isMujer ? 'una mujer' : 'un hombre') + (edadTxt ? ` de ${edadTxt}` : '');
    } else if (c.sub === 'Otro') {
      const customSub = (c.subOtro || '').trim();
      base = (customSub ? `${customSub} (${genWord})` : (isMujer ? 'una persona mujer' : 'una persona hombre')) + (edadTxt ? ` de ${edadTxt}` : '');
    } else if (c.sub === 'Niño' || c.sub === 'Niña') {
      base = (isMujer ? 'una niña' : 'un niño') + (edadTxt ? ` de ${edadTxt}` : '');
    } else if (c.sub === 'Bebé') {
      base = (isMujer ? 'una bebé niña' : 'un bebé niño') + (edadTxt ? ` de ${edadTxt}` : '');
    } else if (c.sub === 'Adolescente') {
      base = (isMujer ? 'una adolescente mujer' : 'un adolescente hombre') + (edadTxt ? ` de ${edadTxt}` : '');
    } else if (c.sub === 'Adulto') {
      base = (isMujer ? 'una mujer adulta' : 'un hombre adulto') + (edadTxt ? ` de ${edadTxt}` : '');
    } else if (c.sub === 'Adulto mayor') {
      base = (isMujer ? 'una adulta mayor' : 'un adulto mayor') + (edadTxt ? ` de ${edadTxt}` : '');
    } else {
      const art = isMujer ? 'una ' : 'un ';
      base = `${art}${c.sub.toLowerCase()} ${genWord}` + (edadTxt ? ` de ${edadTxt}` : '');
    }
  } else if (c.cat === 'Personalizado') {
    base = c.customName.trim() || 'un sujeto personalizado';
  } else {
    const sil = normalizeAnimalSilueta(c.animalSilueta);
    const defaultName = c.cat === 'Animal'
      ? (c.modoForma === 'Antropomorfo' ? 'animal antropomorfo'
        : (sil === 'Ninguno' ? 'animal'
          : (sil === 'Bípedo' ? 'animal bípedo'
            : (sil === 'Con alas' ? 'animal con alas'
              : (sil === 'Insecto' ? 'insecto' : 'animal cuadrúpedo')))))
      : (c.modoForma === 'Antropomorfo' ? 'objeto antropomorfo' : 'objeto');
    base = c.customName.trim()
      ? (c.modoForma === 'Antropomorfo' ? `${c.customName.trim()} antropomorfo` : c.customName.trim())
      : `un ${defaultName}`;
  }

  const parts = [base];
  if (c.datoExtra && c.datoExtra.trim()) parts.push(c.datoExtra.trim());

  if (c.cat === 'Persona') {
    if (c.chkCabello && !isNoneVal(c.cabelloTipo)) {
      const ct = c.cabelloTipo === 'Otro' ? (c.cabelloOtro || '').trim() : c.cabelloTipo.toLowerCase();
      const cc = c.cabelloColor === 'Otro'
        ? ((c.cabelloColorOtro || '').trim() || hexToSpanishName(c.cabelloColorHex || '#1E293B'))
        : (!isNoneVal(c.cabelloColor) ? c.cabelloColor.toLowerCase() : '');
      if (ct && cc) parts.push(`cabello ${ct} color ${cc}`);
      else if (ct) parts.push(`cabello ${ct}`);
    }
    if (c.genero === 'Hombre' && c.chkBarba && !isNoneVal(c.barbaTipo)) {
      const bt = c.barbaTipo === 'Otro' ? (c.barbaOtro || '').trim() : c.barbaTipo.toLowerCase();
      const bc = c.barbaColor === 'Otro'
        ? ((c.barbaColorOtro || '').trim() || hexToSpanishName(c.barbaColorHex || '#1E293B'))
        : (!isNoneVal(c.barbaColor) && c.barbaColor !== 'Igual al cabello' ? c.barbaColor.toLowerCase() : '');
      if (bt) {
        const prefix = (bt.startsWith('barba') || bt.startsWith('solo bigote') || bt.startsWith('bigote')) ? bt : `barba ${bt}`;
        parts.push(bc ? `${prefix} color ${bc}` : prefix);
      }
    }
    if (c.chkComplexion && !isNoneVal(c.complexionTipo)) {
      const cx = c.complexionTipo === 'Otro' ? (c.complexionOtro || '').trim() : c.complexionTipo.toLowerCase();
      if (cx) parts.push(`complexión ${cx}`);
    }
    if (c.chkPiel && !isNoneVal(c.pielTono)) {
      const pt = c.pielTono === 'Otro'
        ? ((c.pielTonoOtro || '').trim() || hexToSpanishName(c.pielTonoHex || '#D9A066'))
        : c.pielTono.toLowerCase();
      if (pt) parts.push(`tono de piel ${pt}`);
    }
    if (c.chkOjos && !isNoneVal(c.ojosColor)) {
      const oc = c.ojosColor === 'Otro'
        ? ((c.ojosColorOtro || '').trim() || hexToSpanishName(c.ojosColorHex || '#0F172A'))
        : c.ojosColor.toLowerCase();
      if (oc) parts.push(`ojos ${oc}`);
    }
  } else {
    if (c.chkTextura && !isNoneVal(c.texturaTipo)) {
      const tx = c.texturaTipo === 'Otro' ? (c.texturaOtro || '').trim() : c.texturaTipo.toLowerCase();
      if (tx) parts.push(tx);
    }
    if (c.chkColorPrincipal && !isNoneVal(c.principalColor)) {
      const pc = c.principalColor === 'Otro'
        ? ((c.principalColorOtro || '').trim() || hexToSpanishName(c.principalColorHex || '#D99B58'))
        : c.principalColor.toLowerCase();
      if (pc) parts.push(`color principal ${pc}`);
    }
    if (c.cat === 'Animal') {
      if (c.chkOrejasAnimal && !isNoneVal(c.orejasAnimalTipo)) parts.push(`orejas ${c.orejasAnimalTipo.toLowerCase()}`);
      if (c.chkColaAnimal && !isNoneVal(c.colaAnimalTipo)) parts.push(`cola ${c.colaAnimalTipo.toLowerCase()}`);
      if (c.chkAlasAnimal && !isNoneVal(c.alasAnimalTipo)) parts.push(c.alasAnimalTipo.toLowerCase());
      if (c.chkCollarAnimal && !isNoneVal(c.collarAnimalTipo)) parts.push(`con ${c.collarAnimalTipo.toLowerCase()}`);
    }
  }

  if (c.otrosRasgos && c.otrosRasgos.trim()) parts.push(c.otrosRasgos.trim());

  if (c.ropaList && c.ropaList.length) {
    const rTexts = c.ropaList.map(formatRopaItemText).filter(Boolean);
    if (rTexts.length) parts.push(`vestido con ${rTexts.join(', ')}`);
  }
  if (c.chkObjetoMano && !isNoneVal(c.objetoManoItem)) {
    const obj = c.objetoManoItem === 'Otro' ? (c.objetoManoOtro || '').trim() : c.objetoManoItem.toLowerCase();
    if (obj) parts.push(`sosteniendo ${obj}`);
  }
  return parts.join(', ');
}
