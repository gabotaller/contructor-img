/**
 * Modelo 3D Mejorado: Persona
 * Modelos diferenciados: Bebé, Niño (Hombre/Mujer), Adolescente, Adulto, Adulto mayor y Otro.
 * - Solo género Hombre / Mujer (sin neutro), progresión clara de estatura.
 * - Bebé y Niño inician SIN cabello por defecto (solo cambia la vestimenta según género).
 * - Cabeza esculpida proceduralmente (cuencas oculares, pómulos, arco superciliar, mandíbula y mentón),
 *   nariz 3D con fosas nasales, orejas con hélice y concha, ojos con párpados dinámicos, 25 expresiones 3D,
 *   manos articuladas de 5 dedos y sistema de barba/bigote 3D exclusivo para Hombre.
 */

function buildBeard3D(headGrp, c, beardMat, headR, eyeScale, isMale, isElder) {
  if (!isMale) return;

  const hasExplicitBeard = !!(c.chkBarba && !isNoneVal(c.barbaTipo));
  // Bigote plateado clásico solo para Adulto mayor Hombre cuando no se eligió barba explícita
  if (!hasExplicitBeard) {
    if (isElder) {
      const stachePtsL = [
        new THREE.Vector3(0.0, -0.064 * eyeScale, headR * 0.968),
        new THREE.Vector3(-0.034 * eyeScale, -0.066 * eyeScale, headR * 0.955),
        new THREE.Vector3(-0.068 * eyeScale, -0.078 * eyeScale, headR * 0.912)
      ];
      const stachePtsR = [
        new THREE.Vector3(0.0, -0.064 * eyeScale, headR * 0.968),
        new THREE.Vector3(0.034 * eyeScale, -0.066 * eyeScale, headR * 0.955),
        new THREE.Vector3(0.068 * eyeScale, -0.078 * eyeScale, headR * 0.912)
      ];
      [stachePtsL, stachePtsR].forEach(pts => {
        const m = new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 0.014 * eyeScale, 8, false),
          beardMat
        );
        headGrp.add(m);
      });
    }
    return;
  }

  const tipo = c.barbaTipo || 'Corta cuidada';
  const bGrp = new THREE.Group();

  // Helper de bigote 3D esculpido (dos arcos simétricos que respetan nariz y boca)
  const addMustache = (thick = 0.0155, spread = 0.074, droop = 0.016) => {
    [-1, 1].forEach(s => {
      const pts = [
        new THREE.Vector3(0, -0.062 * eyeScale, headR * 0.972),
        new THREE.Vector3(s * spread * 0.48 * eyeScale, -0.064 * eyeScale, headR * 0.958),
        new THREE.Vector3(s * spread * eyeScale, (-0.066 - droop) * eyeScale, headR * 0.905)
      ];
      const arc = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 14, thick * eyeScale, 8, false),
        beardMat
      );
      bGrp.add(arc);
      const tip = new THREE.Mesh(new THREE.SphereGeometry(thick * 0.72 * eyeScale, 8, 8), beardMat);
      tip.position.copy(pts[2]);
      bGrp.add(tip);
    });
  };

  // Helper de patillas y contorno mandibular esculpido
  const addJawSideburns = (thickness = 0.032, cheekDrop = 0.0) => {
    [-1, 1].forEach(s => {
      const jawPts = [
        new THREE.Vector3(s * headR * 0.89, headR * 0.05, headR * 0.16),
        new THREE.Vector3(s * headR * 0.80, -headR * (0.28 + cheekDrop), headR * 0.42),
        new THREE.Vector3(s * headR * 0.56, -headR * 0.62, headR * 0.66),
        new THREE.Vector3(s * headR * 0.18, -headR * 0.82, headR * 0.72)
      ];
      const jawMesh = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(jawPts), 16, thickness * eyeScale, 10, false),
        beardMat
      );
      bGrp.add(jawMesh);
    });
  };

  if (tipo === 'Barba de 3 días') {
    const stubbleMat = beardMat.clone();
    stubbleMat.transparent = true;
    stubbleMat.opacity = 0.44;
    stubbleMat.roughness = 0.92;

    // Sombra uniforme en mandíbula y mejillas bajas sin tapar la boca
    [-1, 1].forEach(s => {
      const cheekStubble = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.36, 14, 12), stubbleMat);
      cheekStubble.scale.set(0.68, 0.92, 0.82);
      cheekStubble.position.set(s * headR * 0.56, -headR * 0.42, headR * 0.54);
      bGrp.add(cheekStubble);
    });
    const chinStubble = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.40, 16, 12), stubbleMat);
    chinStubble.scale.set(1.12, 0.72, 0.78);
    chinStubble.position.set(0, -headR * 0.76, headR * 0.56);
    bGrp.add(chinStubble);

    // Sombra fina sobre el labio superior
    const upperStubble = new THREE.Mesh(new THREE.SphereGeometry(0.056 * eyeScale, 10, 8), stubbleMat);
    upperStubble.scale.set(1.38, 0.24, 0.35);
    upperStubble.position.set(0, -0.064 * eyeScale, headR * 0.955);
    bGrp.add(upperStubble);
  } else if (tipo === 'Solo bigote') {
    addMustache(0.0185, 0.084, 0.018);
  } else if (tipo === 'Candado / Perilla') {
    addMustache(0.016, 0.072, 0.018);
    // Conectores laterales alrededor de las comisuras (dejan libre el centro de la boca)
    [-1, 1].forEach(s => {
      const sidePts = [
        new THREE.Vector3(s * 0.066 * eyeScale, -0.076 * eyeScale, headR * 0.918),
        new THREE.Vector3(s * 0.072 * eyeScale, -0.128 * eyeScale, headR * 0.885),
        new THREE.Vector3(s * 0.044 * eyeScale, -0.184 * eyeScale, headR * 0.835)
      ];
      const conn = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(sidePts), 12, 0.0145 * eyeScale, 8, false),
        beardMat
      );
      bGrp.add(conn);
    });
    // Perilla esculpida en el mentón + mosca bajo el labio inferior
    const soulPatch = new THREE.Mesh(new THREE.SphereGeometry(0.020 * eyeScale, 10, 8), beardMat);
    soulPatch.scale.set(0.95, 1.1, 0.55);
    soulPatch.position.set(0, -0.158 * eyeScale, headR * 0.905);
    const goatee = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.30, 16, 14), beardMat);
    goatee.scale.set(0.92, 1.05, 0.82);
    goatee.position.set(0, -headR * 0.82, headR * 0.64);
    bGrp.add(soulPatch, goatee);
  } else if (tipo === 'Completa poblada') {
    addMustache(0.0185, 0.080, 0.020);
    addJawSideburns(0.046, 0.02);
    // Volumen de mejillas bajas y mentón tupido
    [-1, 1].forEach(s => {
      const cheekFull = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.36, 14, 12), beardMat);
      cheekFull.scale.set(0.76, 1.02, 0.84);
      cheekFull.position.set(s * headR * 0.54, -headR * 0.50, headR * 0.54);
      bGrp.add(cheekFull);
    });
    const fullChin = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.48, 18, 14), beardMat);
    fullChin.scale.set(1.06, 0.98, 0.86);
    fullChin.position.set(0, -headR * 0.84, headR * 0.54);
    const underJaw = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.44, 16, 12), beardMat);
    underJaw.scale.set(1.16, 0.70, 0.88);
    underJaw.position.set(0, -headR * 0.90, headR * 0.34);
    bGrp.add(fullChin, underJaw);
  } else if (tipo === 'Larga de leñador') {
    addMustache(0.021, 0.088, 0.026);
    addJawSideburns(0.052, 0.04);
    [-1, 1].forEach(s => {
      const cheekL = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.38, 14, 12), beardMat);
      cheekL.scale.set(0.80, 1.12, 0.86);
      cheekL.position.set(s * headR * 0.54, -headR * 0.52, headR * 0.54);
      bGrp.add(cheekL);
    });
    const upperBeard = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.50, 18, 14), beardMat);
    upperBeard.scale.set(1.08, 1.05, 0.86);
    upperBeard.position.set(0, -headR * 0.88, headR * 0.52);
    const longCasc = new THREE.Mesh(new THREE.ConeGeometry(headR * 0.48, headR * 1.18, 18), beardMat);
    longCasc.rotation.z = Math.PI;
    longCasc.scale.set(1.02, 1.0, 0.72);
    longCasc.position.set(0, -headR * 1.44, headR * 0.48);
    const tipRound = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.24, 14, 12), beardMat);
    tipRound.scale.set(1.08, 0.95, 0.72);
    tipRound.position.set(0, -headR * 1.82, headR * 0.46);
    bGrp.add(upperBeard, longCasc, tipRound);
  } else {
    // 'Corta cuidada' o 'Otro'
    addMustache(0.0155, 0.074, 0.015);
    addJawSideburns(0.032, 0.0);
    const shortChin = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.39, 16, 14), beardMat);
    shortChin.scale.set(1.08, 0.74, 0.80);
    shortChin.position.set(0, -headR * 0.80, headR * 0.56);
    const underTrim = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.38, 14, 12), beardMat);
    underTrim.scale.set(1.12, 0.54, 0.84);
    underTrim.position.set(0, -headR * 0.84, headR * 0.34);
    bGrp.add(shortChin, underTrim);
  }

  headGrp.add(bGrp);
}


function buildHair3D(headGrp, c, hairMat, headR, opts = {}) {
  const tipo = opts.forceTipo || (c.chkCabello && !isNoneVal(c.cabelloTipo) ? c.cabelloTipo : null);
  if (!tipo) return;

  const hGrp = new THREE.Group();

  // 1. Casquete superior estrictamente sobre la corona y línea alta de la frente (NUNCA cubre cara ni ojos)
  const topCap = new THREE.Mesh(
    new THREE.SphereGeometry(headR * 1.055, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.36),
    hairMat
  );
  topCap.rotation.x = -0.34;
  topCap.position.set(0, headR * 0.05, -headR * 0.04);
  hGrp.add(topCap);

  // 2. Cobertura trasera estrictamente en el hemisferio posterior (z <= -0.22*headR)
  const backCap = new THREE.Mesh(
    new THREE.SphereGeometry(headR * 1.06, 22, 16, Math.PI * 1.08, Math.PI * 0.84, Math.PI * 0.12, Math.PI * 0.68),
    hairMat
  );
  backCap.position.set(0, headR * 0.02, -headR * 0.02);
  hGrp.add(backCap);

  if (tipo === 'Corto') {
    const crestCoords = [
      [-0.46, 0.82, 0.36, 0.28, 0.9, 0.52, 0.72],
      [-0.16, 0.90, 0.40, 0.30, 1.0, 0.54, 0.74],
      [0.16, 0.90, 0.40, 0.30, 1.0, 0.54, 0.74],
      [0.46, 0.82, 0.36, 0.28, 0.9, 0.52, 0.72]
    ];
    crestCoords.forEach(([x, y, z, r, sx, sy, sz]) => {
      const tuft = new THREE.Mesh(new THREE.SphereGeometry(headR * r, 12, 10), hairMat);
      tuft.scale.set(sx, sy, sz);
      tuft.position.set(x * headR, y * headR, z * headR);
      hGrp.add(tuft);
    });
    [-1, 1].forEach(s => {
      const side = createCapsuleLimb(headR * 0.14, headR * 0.09, headR * 0.55, hairMat, 10);
      side.position.set(s * headR * 0.96, headR * 0.34, -headR * 0.08);
      hGrp.add(side);
    });
  } else if (tipo === 'Largo') {
    const backStrands = [
      { x: 0, z: -0.78, topR: 0.44, botR: 0.36, len: 2.15 },
      { x: -0.46, z: -0.66, topR: 0.36, botR: 0.28, len: 2.05 },
      { x: 0.46, z: -0.66, topR: 0.36, botR: 0.28, len: 2.05 },
      { x: -0.82, z: -0.36, topR: 0.28, botR: 0.21, len: 1.92 },
      { x: 0.82, z: -0.36, topR: 0.28, botR: 0.21, len: 1.92 }
    ];
    backStrands.forEach(st => {
      const strand = createCapsuleLimb(headR * st.topR, headR * st.botR, headR * st.len, hairMat, 14);
      strand.position.set(st.x * headR, headR * 0.32, st.z * headR);
      hGrp.add(strand);
    });
    [-1, 1].forEach(s => {
      const sideLock = createCapsuleLimb(headR * 0.20, headR * 0.13, headR * 1.65, hairMat, 12);
      sideLock.position.set(s * headR * 0.98, headR * 0.36, -headR * 0.04);
      sideLock.rotation.z = s * 0.06;
      hGrp.add(sideLock);
    });
    [-1, 1].forEach(s => {
      const crownWave = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.40, 12, 10), hairMat);
      crownWave.scale.set(1.05, 0.56, 0.82);
      crownWave.position.set(s * headR * 0.46, headR * 0.82, headR * 0.26);
      crownWave.rotation.z = -s * 0.26;
      hGrp.add(crownWave);
    });
  } else if (tipo === 'Rizado') {
    const curlCoords = [
      [0, 1.04, 0.14, 0.38], [-0.46, 0.96, 0.16, 0.36], [0.46, 0.96, 0.16, 0.36],
      [-0.82, 0.74, 0.02, 0.36], [0.82, 0.74, 0.02, 0.36],
      [-1.06, 0.26, -0.10, 0.36], [1.06, 0.26, -0.10, 0.36],
      [-1.02, -0.22, -0.18, 0.34], [1.02, -0.22, -0.18, 0.34],
      [-0.58, 0.76, -0.64, 0.42], [0.58, 0.76, -0.64, 0.42], [0, 0.92, -0.58, 0.44],
      [-0.56, 0.16, -0.82, 0.42], [0.56, 0.16, -0.82, 0.42], [0, 0.26, -0.90, 0.44],
      [-0.48, -0.38, -0.74, 0.38], [0.48, -0.38, -0.74, 0.38], [0, -0.40, -0.82, 0.40]
    ];
    curlCoords.forEach(([x, y, z, r]) => {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(headR * r, 12, 10), hairMat);
      puff.position.set(x * headR, y * headR, z * headR);
      hGrp.add(puff);
    });
  } else if (tipo === 'Trenzas') {
    const tieMat = new THREE.MeshStandardMaterial({ color: 0xEC4899, roughness: 0.4 });
    [-1, 1].forEach(s => {
      const crownSide = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.46, 12, 10), hairMat);
      crownSide.scale.set(0.95, 0.62, 0.96);
      crownSide.position.set(s * headR * 0.50, headR * 0.80, headR * 0.04);
      hGrp.add(crownSide);
      for (let i = 0; i < 6; i++) {
        const seg = new THREE.Mesh(new THREE.SphereGeometry(headR * (0.24 - i * 0.015), 10, 10), hairMat);
        seg.scale.set(1.02, 0.88, 0.92);
        seg.position.set(
          s * (headR * 1.02 + (i % 2 ? 0.014 : -0.014)),
          headR * 0.12 - i * headR * 0.34,
          -headR * 0.18
        );
        hGrp.add(seg);
      }
      const tie = new THREE.Mesh(new THREE.TorusGeometry(headR * 0.15, 0.022, 8, 14), tieMat);
      tie.rotation.x = Math.PI / 2;
      tie.position.set(s * headR * 1.02, -headR * 1.84, -headR * 0.18);
      const tassel = new THREE.Mesh(new THREE.ConeGeometry(headR * 0.15, headR * 0.34, 10), hairMat);
      tassel.rotation.z = Math.PI;
      tassel.position.set(s * headR * 1.02, -headR * 2.04, -headR * 0.18);
      hGrp.add(tie, tassel);
    });
  } else if (tipo === 'MonioAlto') {
    const bun = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.42, 14, 12), hairMat);
    bun.position.set(0, headR * 0.52, -headR * 0.94);
    const pin = new THREE.Mesh(new THREE.TorusGeometry(headR * 0.32, 0.022, 8, 16), new THREE.MeshStandardMaterial({ color: 0x6366F1, roughness: 0.4 }));
    pin.position.set(0, headR * 0.50, -headR * 0.78);
    hGrp.add(bun, pin);
  } else {
    const wave = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.52, 14, 12), hairMat);
    wave.scale.set(1.22, 0.54, 0.86);
    wave.position.set(0.03, headR * 0.94, headR * 0.20);
    wave.rotation.z = -0.12;
    hGrp.add(wave);
  }

  headGrp.add(hGrp);
}

function buildPersona3D(g, c, ctx) {
  const { skinHex, skinMat, eyeMat, darkMat, whiteMat, ropaAll, findRopaColor } = ctx;
  const sub = c.sub || 'Adulto';

  const isBaby = sub === 'Bebé';
  const isChild = sub === 'Niño' || sub === 'Niña';
  const isTeen = sub === 'Adolescente';
  const isElder = sub === 'Adulto mayor';
  const isOtro = sub === 'Otro';

  // Género estrictamente binario: Mujer / Hombre (sin neutro)
  const isFemale = c.genero === 'Mujer';
  const isMale = !isFemale;

  // Progresión clara de estatura: Bebé (0.56) < Niño (0.76) < Adolescente (0.98) < Adulto (1.16)
  let sx = isBaby ? 1.06 : (isChild ? 0.88 : (isTeen ? 0.93 : (isElder ? 0.96 : (isOtro ? 1.00 : 1.02))));
  let sh = isBaby ? 0.56 : (isChild ? 0.76 : (isTeen ? 0.98 : (isElder ? 1.08 : (isOtro ? 1.10 : 1.16))));
  if (c.chkComplexion && c.complexionTipo === 'Delgado') sx *= 0.82;
  else if (c.chkComplexion && c.complexionTipo === 'Robusto') sx *= 1.24;
  else if (c.chkComplexion && c.complexionTipo === 'Atlético') sx *= 1.11;

  const hasUniform = ropaAll.includes('uniforme') || ropaAll.includes('terno') || ropaAll.includes('traje');
  const hasPoncho = ropaAll.includes('poncho') || ropaAll.includes('típico');
  const hasBata = ropaAll.includes('bata') || ropaAll.includes('delantal');
  const hasDress = ropaAll.includes('vestido') || ropaAll.includes('falda') || ropaAll.includes('túnica');
  const hasJacket = ropaAll.includes('casaca') || ropaAll.includes('chaqueta') || ropaAll.includes('polera') || ropaAll.includes('chaleco');
  const hasPants = ropaAll.includes('pantalón') || ropaAll.includes('jeans') || ropaAll.includes('short') || ropaAll.includes('bermudas') || ropaAll.includes('buzo') || ropaAll.includes('overol');

  // Colores representativos por etapa y género (Otro lleva su polera color naranja/ámbar o turquesa)
  let defaultTop = 0x2563EB;
  if (hasUniform) defaultTop = 0x1D4ED8;
  else if (hasPoncho) defaultTop = 0xB91C1C;
  else if (hasBata) defaultTop = 0xF8FAFC;
  else if (hasDress) defaultTop = 0xEC4899;
  else if (isBaby) defaultTop = isFemale ? 0xF472B6 : 0x38BDF8;
  else if (isChild) defaultTop = isFemale ? 0xEC4899 : 0x0EA5E9;
  else if (isTeen) defaultTop = isFemale ? 0xA855F7 : 0x10B981;
  else if (isElder) defaultTop = isFemale ? 0x8B5CF6 : 0x92400E;
  else if (isOtro) defaultTop = isFemale ? 0xEA580C : 0x0D9488;
  else defaultTop = isFemale ? 0xE11D48 : 0x2563EB;

  const topHex = findRopaColor(
    ['polo', 'camiseta', 'camisa', 'blusa', 'chompa', 'suéter', 'polera', 'casaca', 'chaqueta', 'chaleco', 'poncho', 'bata', 'delantal', 'uniforme', 'vestido', 'terno', 'traje', 'overol', 'buzo', 'túnica'],
    defaultTop
  );
  const pantsHex = findRopaColor(
    ['pantalón', 'jeans', 'short', 'bermudas', 'falda', 'uniforme', 'terno', 'overol', 'buzo'],
    isBaby ? defaultTop : (isElder ? 0x475569 : (isOtro ? 0x334155 : 0x1E293B))
  );
  const shoeHex = findRopaColor(['zapatilla', 'zapato', 'bota', 'botin', 'sandalia', 'ojota', 'tacón'], isBaby ? 0xF8FAFC : 0x1E293B);

  const topMat = new THREE.MeshStandardMaterial({ color: topHex, roughness: 0.56 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: pantsHex, roughness: 0.66 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: shoeHex, roughness: 0.40 });

  // Tono más cálido/definido para nariz, interior de orejas y contornos faciales
  const noseMat = new THREE.MeshStandardMaterial({
    color: shadeHexInt(skinHex, 0.93, 0.86, 0.83),
    roughness: 0.48,
    metalness: 0.02
  });
  const innerEarMat = new THREE.MeshStandardMaterial({
    color: shadeHexInt(skinHex, 0.88, 0.78, 0.74),
    roughness: 0.58
  });

  const hairHex = (c.chkCabello)
    ? (c.cabelloColor === 'Otro' ? hexToInt(c.cabelloColorHex, 0x1E293B) : (HAIR_COLORS[c.cabelloColor] || 0x1E293B))
    : (isElder ? 0xCBD5E1 : 0x334155);
  const hairMat = new THREE.MeshStandardMaterial({ color: hairHex, roughness: 0.56 });

  const beardHex = (c.chkBarba && isMale)
    ? (c.barbaColor === 'Otro'
        ? hexToInt(c.barbaColorHex, hairHex)
        : (c.barbaColor && typeof BARBA_COLORS !== 'undefined' && BARBA_COLORS[c.barbaColor] ? BARBA_COLORS[c.barbaColor] : hairHex))
    : hairHex;
  const beardMat = new THREE.MeshStandardMaterial({ color: beardHex, roughness: 0.64 });

  const root = new THREE.Group();
  g.add(root);

  const legUpperLen = (isBaby ? 0.23 : 0.34) * sh;
  const legLowerLen = (isBaby ? 0.21 : 0.32) * sh;
  const hipY = legUpperLen + legLowerLen + 0.08;
  const torsoH = (isBaby ? 0.60 : 0.72) * sh;

  // --- Pelvis y Piernas Articuladas ---
  const hipWidth = isFemale && !isBaby ? 1.14 : (isBaby ? 1.12 : 1.02);
  const pelvis = new THREE.Mesh(new THREE.SphereGeometry(0.24 * sx, 18, 12), pantsMat);
  pelvis.scale.set(hipWidth, isBaby ? 0.76 : 0.62, isBaby ? 0.88 : 0.76);
  pelvis.position.y = hipY;
  root.add(pelvis);

  const makeLeg = (side) => {
    const hipGrp = new THREE.Group();
    hipGrp.position.set(side * (isFemale && !isBaby ? 0.145 : 0.135) * sx, hipY - 0.02, 0);
    const thigh = createCapsuleLimb((isBaby ? 0.105 : 0.092) * sx, (isBaby ? 0.086 : 0.075) * sx, legUpperLen, pantsMat, 14);
    hipGrp.add(thigh);

    const shinGrp = new THREE.Group();
    shinGrp.position.set(0, -legUpperLen, 0);
    const showBareShin = (hasDress || (isChild && isFemale && !hasPants)) && !isBaby;
    const shin = createCapsuleLimb((isBaby ? 0.082 : 0.070) * sx, (isBaby ? 0.064 : 0.054) * sx, legLowerLen, showBareShin ? skinMat : pantsMat, 14);
    shinGrp.add(shin);

    // Calzado esculpido
    const shoeGrp = new THREE.Group();
    shoeGrp.position.set(0, -legLowerLen - 0.03, 0.042);
    const shoeScale = isBaby ? 0.84 : (isChild ? 0.92 : 1.0);
    const upper = new THREE.Mesh(new THREE.SphereGeometry(0.088 * shoeScale, 14, 10), shoeMat);
    upper.scale.set(0.82, 0.62, 1.38);
    const sole = new THREE.Mesh(new THREE.CylinderGeometry(0.075 * shoeScale, 0.078 * shoeScale, 0.028, 14), whiteMat);
    sole.scale.set(0.92, 1, 1.48);
    sole.position.y = -0.042 * shoeScale;
    shoeGrp.add(upper, sole);
    shinGrp.add(shoeGrp);

    hipGrp.add(shinGrp);
    hipGrp.userData.shin = shinGrp;
    return hipGrp;
  };
  const legL = makeLeg(-1);
  const legR = makeLeg(1);
  root.add(legL, legR);

  // --- Torso Esculpido Diferenciado por Género y Edad ---
  const torsoGrp = new THREE.Group();
  torsoGrp.position.set(0, hipY, 0);
  root.add(torsoGrp);

  const waistW = isBaby ? 0.25 * sx : (isFemale ? 0.168 * sx : 0.228 * sx);
  const chestW = isBaby ? 0.24 * sx : (isFemale ? 0.238 * sx : 0.305 * sx);
  const hipBaseW = isBaby ? 0.26 * sx : (isFemale ? 0.255 * sx : 0.22 * sx);
  const torsoPts = [
    new THREE.Vector2(0.02, 0),
    new THREE.Vector2(hipBaseW, 0.04),
    new THREE.Vector2(waistW, torsoH * 0.30),
    new THREE.Vector2(chestW, torsoH * 0.72),
    new THREE.Vector2(chestW * 0.90, torsoH * 0.94),
    new THREE.Vector2(0.11 * sx, torsoH)
  ];
  const torsoMesh = new THREE.Mesh(new THREE.LatheGeometry(torsoPts, 24), topMat);
  torsoMesh.scale.set(1.0, 1.0, isBaby ? 0.88 : (isFemale ? 0.72 : 0.76));
  torsoGrp.add(torsoMesh);

  // Detalle de cuello
  const collarRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.105 * sx, 0.024, 10, 20),
    hasUniform || hasBata || isBaby ? whiteMat : new THREE.MeshStandardMaterial({ color: topHex, roughness: 0.5 })
  );
  collarRing.rotation.x = Math.PI / 2;
  collarRing.position.set(0, torsoH - 0.01, 0.01);
  torsoGrp.add(collarRing);

  // Babero tierno para Bebé
  if (isBaby && !hasPoncho && !hasUniform) {
    const bib = new THREE.Mesh(new THREE.SphereGeometry(0.13 * sx, 14, 12), whiteMat);
    bib.scale.set(1.15, 0.95, 0.28);
    bib.position.set(0, torsoH * 0.68, 0.20 * sx);
    torsoGrp.add(bib);
  }

  // Polera / Capucha estilizada para Adolescente y Otro
  if ((isTeen || isOtro) && !hasUniform && !hasPoncho && !hasBata) {
    const hood = new THREE.Mesh(new THREE.TorusGeometry(0.145 * sx, 0.045, 10, 18), topMat);
    hood.rotation.x = Math.PI * 0.44;
    hood.position.set(0, torsoH - 0.03, -0.08);
    torsoGrp.add(hood);
    if (isOtro) {
      // Bolsillo canguro frontal y cordones de la polera para "Otro"
      const pocketMat = new THREE.MeshStandardMaterial({ color: shadeHexInt(topHex, 0.84, 0.84, 0.84), roughness: 0.6 });
      const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.24 * sx, 0.14 * sh, 0.04), pocketMat);
      pocket.position.set(0, torsoH * 0.26, chestW * 0.68);
      torsoGrp.add(pocket);
      [-0.04, 0.04].forEach(dx => {
        const str = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.18 * sh, 6), whiteMat);
        str.position.set(dx * sx, torsoH * 0.78, chestW * 0.72);
        torsoGrp.add(str);
      });
    }
  }

  if (hasUniform) {
    const tieMat = new THREE.MeshStandardMaterial({ color: 0xDC2626, roughness: 0.42 });
    const tie = new THREE.Mesh(new THREE.ConeGeometry(0.036, 0.29 * sh, 6), tieMat);
    tie.rotation.z = Math.PI;
    tie.scale.set(1, 1, 0.35);
    tie.position.set(0, torsoH * 0.62, chestW * 0.74);
    torsoGrp.add(tie);
  }

  // Botones de cárdigan para Adulto Mayor
  if (isElder && !hasPoncho && !hasUniform) {
    const btnMat = new THREE.MeshStandardMaterial({ color: 0xFEF3C7, roughness: 0.4 });
    for (let i = 0; i < 3; i++) {
      const btn = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), btnMat);
      btn.position.set(0, torsoH * (0.28 + i * 0.2), chestW * 0.73);
      torsoGrp.add(btn);
    }
  }

  if (hasJacket) {
    const zip = new THREE.Mesh(new THREE.BoxGeometry(0.022, torsoH * 0.88, 0.02), whiteMat);
    zip.position.set(0, torsoH * 0.48, chestW * 0.74);
    torsoGrp.add(zip);
  }

  // Falda / Vestido (explícito o ropa femenina predeterminada para Niño+Mujer sin pantalones)
  if (hasDress || (isChild && isFemale && !hasPants && !hasUniform)) {
    const skirtPts = [
      new THREE.Vector2(0.35 * sx, -0.32 * sh),
      new THREE.Vector2(0.28 * sx, -0.14 * sh),
      new THREE.Vector2(waistW * 1.12, 0.12 * sh)
    ];
    const skirt = new THREE.Mesh(new THREE.LatheGeometry(skirtPts, 24), topMat);
    skirt.scale.set(1, 1, 0.82);
    torsoGrp.add(skirt);
  }

  if (hasPoncho) {
    const pMat = new THREE.MeshStandardMaterial({ color: topHex, roughness: 0.68 });
    const poncho = new THREE.Mesh(new THREE.ConeGeometry(0.46 * sx, 0.62 * sh, 20), pMat);
    poncho.position.y = torsoH * 0.52;
    const trim = new THREE.Mesh(new THREE.TorusGeometry(0.42 * sx, 0.022, 8, 24), new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.5 }));
    trim.rotation.x = Math.PI / 2;
    trim.position.y = torsoH * 0.14;
    torsoGrp.add(poncho, trim);
  }

  if (ropaAll.includes('mochila') || (c.chkObjetoMano && (c.objetoManoItem || '').toLowerCase().includes('mochila'))) {
    const bpMat = new THREE.MeshStandardMaterial({ color: 0x0EA5E9, roughness: 0.55 });
    const bp = new THREE.Mesh(new THREE.BoxGeometry(0.34 * sx, 0.44 * sh, 0.17), bpMat);
    bp.position.set(0, torsoH * 0.5, -0.23 * sx);
    const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.26 * sx, 0.2 * sh, 0.06), new THREE.MeshStandardMaterial({ color: 0x0284C7, roughness: 0.5 }));
    pocket.position.set(0, torsoH * 0.36, -0.32 * sx);
    torsoGrp.add(bp, pocket);
  }

  // --- Brazos Articulados con Manos de 5 Dedos ---
  const armUpperLen = (isBaby ? 0.21 : 0.26) * sh;
  const armLowerLen = (isBaby ? 0.19 : 0.24) * sh;
  const gestures = getHandGesturesForPose(c);
  const handScale = isBaby ? 0.80 : (isChild ? 0.90 : 1.0);
  const hasPostureObj = isPostureWithObject(c.accionTipo);

  const makeArm = (side) => {
    const shGrp = new THREE.Group();
    shGrp.position.set(side * (chestW + 0.05), torsoH * 0.84, 0);

    const sleeveMat = ropaAll.includes('manga corta') ? skinMat : topMat;
    const upperArm = createCapsuleLimb((isFemale ? 0.064 : 0.074) * sx, (isFemale ? 0.055 : 0.064) * sx, armUpperLen, topMat, 12);
    shGrp.add(upperArm);

    const foreGrp = new THREE.Group();
    foreGrp.position.set(0, -armUpperLen, 0);
    const forearm = createCapsuleLimb((isFemale ? 0.052 : 0.060) * sx, (isFemale ? 0.044 : 0.050) * sx, armLowerLen, sleeveMat, 12);
    foreGrp.add(forearm);

    const gesture = side === -1 ? gestures.left : gestures.right;
    const handGrp = createArticulatedHand(side, skinMat, gesture, handScale);
    handGrp.position.set(0, -armLowerLen - 0.015, 0);

    if (side === 1) {
      if (c.chkObjetoMano && !isNoneVal(c.objetoManoItem)) {
        addDetailedHandProp(handGrp, c, darkMat, whiteMat);
      } else if (isElder && !hasPostureObj) {
        const caneMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.55 });
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.014, 0.82, 10), caneMat);
        shaft.position.set(0.04, -0.36, 0.05);
        const hook = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.016, 8, 14, Math.PI), caneMat);
        hook.position.set(0.04, 0.05, 0.0);
        hook.rotation.y = Math.PI / 2;
        handGrp.add(shaft, hook);
      }
    }
    foreGrp.add(handGrp);
    shGrp.add(foreGrp);
    shGrp.userData.forearm = foreGrp;
    shGrp.userData.hand = handGrp;
    return shGrp;
  };
  const armL = makeArm(-1);
  const armR = makeArm(1);
  torsoGrp.add(armL, armR);

  // --- Cuello y Cabeza Esculpida con Rostro Detallado ---
  const neck = createCapsuleLimb(0.072, 0.084, isBaby ? 0.09 : 0.14, skinMat, 14);
  neck.position.set(0, torsoH + (isBaby ? 0.08 : 0.12), 0);
  torsoGrp.add(neck);

  const headR = isBaby ? 0.345 : (isChild ? 0.310 : (isTeen ? 0.292 : 0.285));
  const headGrp = new THREE.Group();
  headGrp.position.set(0, torsoH + headR + (isBaby ? 0.03 : 0.06), 0.01);
  torsoGrp.add(headGrp);

  // Cráneo y rostro esculpidos proceduralmente (cuencas oculares, pómulos, arco superciliar, mandíbula y mentón)
  const craniumGeo = typeof createSculptedHeadGeometry === 'function'
    ? createSculptedHeadGeometry(headR, { isBaby, isChild, isFemale, isElder })
    : new THREE.SphereGeometry(headR, 32, 24);
  const cranium = new THREE.Mesh(craniumGeo, skinMat);
  headGrp.add(cranium);

  // Orejas esculpidas con hélice externa, concha interna y arete delicado opcional para Mujer
  const hasAretes = ropaAll.includes('arete') || (isFemale && !isBaby && !isChild && (hasDress || hasUniform));
  const studMat = hasAretes ? new THREE.MeshStandardMaterial({ color: 0xFDE68A, roughness: 0.2, metalness: 0.75 }) : null;
  [-1, 1].forEach(s => {
    const earGrp = new THREE.Group();
    earGrp.position.set(s * headR * 0.93, -0.018, -0.015);
    const outer = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.205, 16, 12), skinMat);
    outer.scale.set(0.44, 1.06, 0.72);
    const helix = new THREE.Mesh(new THREE.TorusGeometry(headR * 0.145, headR * 0.036, 8, 16, Math.PI * 1.45), skinMat);
    helix.rotation.y = s * Math.PI * 0.48;
    helix.rotation.z = s * 0.28;
    helix.position.set(s * 0.008, 0.008, -0.004);
    const inner = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.118, 10, 10), innerEarMat);
    inner.scale.set(0.38, 0.84, 0.52);
    inner.position.set(s * 0.012, -0.006, 0.012);
    earGrp.add(outer, helix, inner);
    if (studMat) {
      const stud = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.048, 10, 8), studMat);
      stud.position.set(s * 0.014, -headR * 0.19, 0.018);
      earGrp.add(stud);
    }
    headGrp.add(earGrp);
  });

  // Rubor suave de base en Bebé y Niño
  if (isBaby || isChild) {
    const cheekMat = new THREE.MeshStandardMaterial({ color: 0xFDA4AF, roughness: 0.7, transparent: true, opacity: isBaby ? 0.42 : 0.20 });
    [-1, 1].forEach(s => {
      const ck = new THREE.Mesh(new THREE.SphereGeometry(0.046, 10, 8), cheekMat);
      ck.scale.set(1.25, 0.68, 0.35);
      ck.position.set(s * headR * 0.55, -0.055, headR * 0.82);
      headGrp.add(ck);
    });
  }

  // --- Nariz 3D Esculpida y Anatómica (Glabela + Puente + Punta + Aletas + Fosas nasales sutiles) ---
  const eyeScale = headR / 0.295;
  const noseGrp = new THREE.Group();
  const noseScale = isBaby ? 0.76 : (isChild ? 0.88 : (isFemale ? 0.94 : 1.08));
  const nostrilMat = new THREE.MeshStandardMaterial({ color: shadeHexInt(skinHex, 0.54, 0.42, 0.38), roughness: 0.72 });

  const bridge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.013 * noseScale * eyeScale, 0.021 * noseScale * eyeScale, 0.094 * noseScale * eyeScale, 14),
    noseMat
  );
  bridge.position.set(0, 0.014 * eyeScale, headR * 0.935);
  bridge.rotation.x = -0.35;

  const noseTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.027 * noseScale * eyeScale, 16, 14),
    noseMat
  );
  noseTip.scale.set(1.06, 0.86, 1.20);
  noseTip.position.set(0, -0.026 * eyeScale, headR * 1.008);

  [-1, 1].forEach(s => {
    const ala = new THREE.Mesh(new THREE.SphereGeometry(0.0165 * noseScale * eyeScale, 12, 10), noseMat);
    ala.scale.set(1.04, 0.78, 0.94);
    ala.position.set(s * 0.022 * noseScale * eyeScale, -0.035 * eyeScale, headR * 0.964);
    const nostril = new THREE.Mesh(new THREE.SphereGeometry(0.0075 * noseScale * eyeScale, 8, 8), nostrilMat);
    nostril.scale.set(1.15, 0.48, 0.85);
    nostril.position.set(s * 0.014 * noseScale * eyeScale, -0.044 * eyeScale, headR * 0.974);
    noseGrp.add(ala, nostril);
  });
  noseGrp.add(bridge, noseTip);
  headGrp.add(noseGrp);

  // Ojos multicapa con párpados superiores/inferiores dinámicos y pestañas esculpidas
  const faceOpts = { skinHex, isFemale, isBaby };
  const eL = createStylizedEye(eyeMat, whiteMat, darkMat, skinMat, (isBaby ? 0.062 : 0.056) * eyeScale, c.emocion, -1, faceOpts);
  const eR = createStylizedEye(eyeMat, whiteMat, darkMat, skinMat, (isBaby ? 0.062 : 0.056) * eyeScale, c.emocion, 1, faceOpts);
  eL.position.set(-0.098 * eyeScale, 0.044 * eyeScale, headR * 0.855);
  eR.position.set(0.098 * eyeScale, 0.044 * eyeScale, headR * 0.855);
  headGrp.add(eL, eR);

  // Cejas 3D curvas, arrugas expresivas, mejillas/lágrimas y labios esculpidos (25 emociones)
  applyBrowsAndMouth(headGrp, 0.015 * eyeScale, (headR - 0.270), c.emocion, hairMat, darkMat, eyeScale, false, faceOpts);

  // Barba y bigote 3D (EXCLUSIVAMENTE para Hombre)
  buildBeard3D(headGrp, c, beardMat, headR, eyeScale, isMale, isElder);

  // Cabello 3D:
  // - Bebé y Niño NO llevan cabello por defecto (solo si el usuario activa chkCabello).
  // - Adolescente, Adulto, Adulto mayor y Otro llevan cabello limpio que NUNCA tapa la cara ni ojos.
  if (c.chkCabello && !isNoneVal(c.cabelloTipo)) {
    buildHair3D(headGrp, c, hairMat, headR);
  } else if (!isBaby && !isChild && !isNoneVal(sub)) {
    if (isElder && isFemale) {
      buildHair3D(headGrp, c, hairMat, headR, { forceTipo: 'MonioAlto' });
    } else if (isFemale) {
      buildHair3D(headGrp, c, hairMat, headR, { forceTipo: 'Largo' });
    } else {
      buildHair3D(headGrp, c, hairMat, headR, { forceTipo: 'Corto' });
    }
  }

  // Lentes (explícitos o sutiles en Adulto mayor)
  const hasExplicitGlasses = ropaAll.includes('lentes') || ropaAll.includes('anteojos');
  if (hasExplicitGlasses || isElder) {
    const frameHex = hasExplicitGlasses ? findRopaColor(['lentes', 'anteojos'], 0x0F172A) : 0x94A3B8;
    const frameMat = new THREE.MeshStandardMaterial({ color: frameHex, roughness: 0.3, metalness: 0.45 });
    const gL = new THREE.Mesh(new THREE.TorusGeometry(0.072 * eyeScale, 0.011, 8, 20), frameMat);
    const gR = new THREE.Mesh(new THREE.TorusGeometry(0.072 * eyeScale, 0.011, 8, 20), frameMat);
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.052 * eyeScale, 0.011, 0.014), frameMat);
    gL.position.set(-0.098 * eyeScale, 0.044 * eyeScale, headR * 0.98);
    gR.position.set(0.098 * eyeScale, 0.044 * eyeScale, headR * 0.98);
    br.position.set(0, 0.048 * eyeScale, headR * 0.98);
    if (ropaAll.includes('sol')) {
      const tintMat = new THREE.MeshPhysicalMaterial({ color: 0x0F172A, transparent: true, opacity: 0.72, roughness: 0.1 });
      const l1 = new THREE.Mesh(new THREE.CircleGeometry(0.066 * eyeScale, 16), tintMat);
      const l2 = l1.clone();
      l1.position.copy(gL.position); l2.position.copy(gR.position);
      headGrp.add(l1, l2);
    }
    headGrp.add(gL, gR, br);
  }

  // Sombreros, Gorras y Corona (elevados sobre la coronilla sin tapar ojos)
  if (ropaAll.includes('sombrero') || ropaAll.includes('gorra') || ropaAll.includes('casco') || ropaAll.includes('chullo') || ropaAll.includes('boina') || ropaAll.includes('corona')) {
    const hatHex = findRopaColor(['sombrero', 'gorra', 'casco', 'chullo', 'boina', 'corona'], 0x92400E);
    const hatMat = new THREE.MeshStandardMaterial({ color: hatHex, roughness: 0.55 });
    if (ropaAll.includes('corona')) {
      const crownMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.25, metalness: 0.75 });
      const band = new THREE.Mesh(new THREE.CylinderGeometry(headR * 0.78, headR * 0.72, 0.12, 16), crownMat);
      band.position.y = headR * 1.02;
      headGrp.add(band);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const sp = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.12, 6), crownMat);
        sp.position.set(Math.cos(a) * headR * 0.72, headR * 1.22, Math.sin(a) * headR * 0.72);
        headGrp.add(sp);
      }
    } else if (ropaAll.includes('gorra')) {
      const dome = new THREE.Mesh(new THREE.SphereGeometry(headR * 1.09, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.42), hatMat);
      dome.position.y = headR * 0.24;
      const visor = new THREE.Mesh(new THREE.CylinderGeometry(headR * 0.95, headR * 0.95, 0.026, 18, 1, false, -0.65, 1.3), hatMat);
      visor.position.set(0, headR * 0.48, headR * 0.34);
      headGrp.add(dome, visor);
    } else {
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(headR * 1.55, headR * 1.55, 0.042, 24), hatMat);
      const crown = new THREE.Mesh(new THREE.CylinderGeometry(headR * 0.84, headR * 0.98, 0.24, 20), hatMat);
      const ribbon = new THREE.Mesh(new THREE.CylinderGeometry(headR * 0.99, headR * 1.0, 0.05, 20), new THREE.MeshStandardMaterial({ color: 0xDC2626, roughness: 0.5 }));
      brim.position.y = headR * 0.88;
      crown.position.y = headR * 1.10;
      ribbon.position.y = headR * 0.96;
      headGrp.add(brim, crown, ribbon);
    }
  }

  // Postura articulada completa + accesorios 3D automáticos en posturas con objetos
  applyBodyRigPose({
    root,
    sceneRoot: g,
    torso: torsoGrp,
    head: headGrp,
    armL,
    armR,
    legL,
    legR,
    handL: armL.userData.hand,
    handR: armR.userData.hand,
    sh,
    hipY,
    torsoH,
    baseY: 0
  }, c, darkMat, whiteMat);
}
