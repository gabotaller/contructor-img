/**
 * Coordinador y Utilidades Avanzadas de Modelos 3D (Three.js r128)
 * Provee geometrías orgánicas (cápsulas r128, ojos con párpados, manos articuladas con 5 dedos,
 * sombras de contacto), 25 expresiones faciales, 40+ posturas sin objetos y 16 posturas con objetos 3D completos.
 */

function getSubjectMainHexInt(c, fallback) {
  if (!c.chkColorPrincipal) return fallback;
  if (c.principalColor === 'Otro') return hexToInt(c.principalColorHex, fallback);
  if (SUBJECT_COLORS[c.principalColor]) return hexToInt(SUBJECT_COLORS[c.principalColor], fallback);
  return fallback;
}

function shadeHexInt(hexInt, rMul, gMul, bMul) {
  const r = Math.max(0, Math.min(255, Math.round(((hexInt >> 16) & 255) * rMul)));
  const g = Math.max(0, Math.min(255, Math.round(((hexInt >> 8) & 255) * gMul)));
  const b = Math.max(0, Math.min(255, Math.round((hexInt & 255) * bMul)));
  return (r << 16) | (g << 8) | b;
}

function createCapsuleLimb(rTop, rBot, len, mat, segs = 14) {
  const grp = new THREE.Group();
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, len, segs), mat);
  cyl.position.y = -len * 0.5;
  const topCap = new THREE.Mesh(new THREE.SphereGeometry(rTop, segs, 10), mat);
  topCap.position.y = 0;
  const botCap = new THREE.Mesh(new THREE.SphereGeometry(rBot, segs, 10), mat);
  botCap.position.y = -len;
  grp.add(cyl, topCap, botCap);
  return grp;
}

/**
 * Mano articulada con palma esculpida + pulgar oponible + 4 dedos (índice, medio, anular, meñique).
 * Soporta gestos: 'open', 'fist', 'point', 'thumbsUp', 'peace', 'grip'.
 */
function createArticulatedHand(side, skinMat, gesture = 'open', scale = 1) {
  const handGrp = new THREE.Group();
  const s = scale;

  // Palma esculpida (forma ovalada plana con ligero volumen en la base del pulgar)
  const palm = new THREE.Mesh(new THREE.SphereGeometry(0.052 * s, 14, 12), skinMat);
  palm.scale.set(0.95, 1.02, 0.50);
  palm.position.set(0, -0.028 * s, 0);
  handGrp.add(palm);

  const wrist = new THREE.Mesh(new THREE.CylinderGeometry(0.033 * s, 0.038 * s, 0.034 * s, 10), skinMat);
  wrist.position.set(0, 0.004 * s, 0);
  handGrp.add(wrist);

  // Definición de los 4 dedos (índice, medio, anular, meñique)
  // side = -1 (mano izquierda, pulgar hacia +X interno) | side = +1 (mano derecha, pulgar hacia -X interno)
  const fingerDefs = [
    { name: 'index',  x: -side * 0.033, len1: 0.044, len2: 0.032, r: 0.0115, spread: -side * 0.08 },
    { name: 'middle', x: -side * 0.011, len1: 0.049, len2: 0.035, r: 0.0118, spread: -side * 0.02 },
    { name: 'ring',   x:  side * 0.012, len1: 0.044, len2: 0.031, r: 0.0110, spread:  side * 0.04 },
    { name: 'pinky',  x:  side * 0.032, len1: 0.034, len2: 0.024, r: 0.0095, spread:  side * 0.11 }
  ];

  fingerDefs.forEach(f => {
    const fRoot = new THREE.Group();
    fRoot.position.set(f.x * s, -0.068 * s, 0.003 * s);

    let curl1 = 0.22; // flexión base hacia +Z (palma interior)
    let curl2 = 0.28;
    let spreadZ = f.spread;

    if (gesture === 'fist' || gesture === 'thumbsUp') {
      curl1 = 1.48;
      curl2 = 1.38;
      spreadZ *= 0.3;
    } else if (gesture === 'grip') {
      curl1 = 0.92;
      curl2 = 0.98;
      spreadZ *= 0.4;
    } else if (gesture === 'point') {
      if (f.name === 'index') {
        curl1 = -0.05;
        curl2 = 0.04;
        spreadZ = 0;
      } else {
        curl1 = 1.45;
        curl2 = 1.35;
        spreadZ *= 0.25;
      }
    } else if (gesture === 'peace') {
      if (f.name === 'index') {
        curl1 = -0.04;
        curl2 = 0.04;
        spreadZ = -side * 0.24;
      } else if (f.name === 'middle') {
        curl1 = -0.04;
        curl2 = 0.04;
        spreadZ = side * 0.20;
      } else {
        curl1 = 1.48;
        curl2 = 1.38;
        spreadZ *= 0.2;
      }
    }

    fRoot.rotation.set(-curl1, 0, spreadZ);
    const prox = createCapsuleLimb(f.r * s, f.r * 0.90 * s, f.len1 * s, skinMat, 8);
    fRoot.add(prox);

    const tipGrp = new THREE.Group();
    tipGrp.position.set(0, -f.len1 * s, 0);
    tipGrp.rotation.x = -curl2;
    const dist = createCapsuleLimb(f.r * 0.88 * s, f.r * 0.72 * s, f.len2 * s, skinMat, 8);
    tipGrp.add(dist);

    fRoot.add(tipGrp);
    handGrp.add(fRoot);
  });

  // Pulgar oponible (2 segmentos)
  const thumbRoot = new THREE.Group();
  thumbRoot.position.set(-side * 0.044 * s, -0.022 * s, 0.015 * s);
  if (gesture === 'thumbsUp') {
    thumbRoot.rotation.set(0.12, 0, -side * 2.55);
  } else if (gesture === 'fist' || gesture === 'point' || gesture === 'peace') {
    thumbRoot.rotation.set(-0.95, side * 0.45, side * 0.55);
  } else if (gesture === 'grip') {
    thumbRoot.rotation.set(-0.65, side * 0.32, -side * 0.55);
  } else {
    thumbRoot.rotation.set(-0.22, side * 0.25, -side * 0.68);
  }

  const thProx = createCapsuleLimb(0.0135 * s, 0.012 * s, 0.036 * s, skinMat, 8);
  thumbRoot.add(thProx);
  const thTipGrp = new THREE.Group();
  thTipGrp.position.set(0, -0.036 * s, 0);
  thTipGrp.rotation.x = (gesture === 'thumbsUp') ? 0.08 : -0.35;
  const thDist = createCapsuleLimb(0.0118 * s, 0.0095 * s, 0.028 * s, skinMat, 8);
  thTipGrp.add(thDist);
  thumbRoot.add(thTipGrp);
  handGrp.add(thumbRoot);

  return handGrp;
}

function getHandGesturesForPose(c) {
  const acc = c.accionTipo || '';
  if (acc === 'Haciendo señal de paz (V)') return { left: 'open', right: 'peace' };
  if (acc === 'Haciendo pulgar arriba / OK') return { left: 'open', right: 'thumbsUp' };
  if (acc === 'Señalando hacia un lado' || acc === 'Señalando hacia arriba') return { left: 'open', right: 'point' };
  if (acc === 'Pose de superhéroe' || acc === 'Corriendo' || acc === 'Haciendo sentadillas / Ejercicio') return { left: 'fist', right: 'fist' };
  if (acc === 'Haciendo deporte con pesas' || acc === 'Leyendo' || acc === 'Escribiendo' || acc === 'Pintando / Dibujando' || acc === 'Tomando una foto' || acc === 'Tocando un instrumento' || acc === 'Cocinando / Preparando algo') {
    return { left: 'grip', right: 'grip' };
  }
  if (acc === 'Explorando con lupa' || acc === 'Cantando con micrófono' || acc === 'Regando plantas / Jardinería' || acc === 'Usando teléfono celular' || acc === 'Llevando una taza caliente' || acc === 'Sosteniendo un paraguas' || acc === 'Explicando frente a la clase') {
    return { left: 'open', right: 'grip' };
  }
  if (c.chkObjetoMano && !isNoneVal(c.objetoManoItem)) return { left: 'open', right: 'grip' };
  return { left: 'open', right: 'open' };
}

const POSTURE_OBJECT_SET = new Set([
  'Leyendo', 'Escribiendo', 'Sentado estudiando', 'Trabajando en laptop',
  'Explicando frente a la clase', 'Explorando con lupa', 'Pintando / Dibujando',
  'Tomando una foto', 'Tocando un instrumento', 'Cantando con micrófono',
  'Cocinando / Preparando algo', 'Regando plantas / Jardinería',
  'Haciendo deporte con pesas', 'Usando teléfono celular',
  'Llevando una taza caliente', 'Sosteniendo un paraguas'
]);

function isPostureWithObject(accionTipo) {
  return POSTURE_OBJECT_SET.has(accionTipo || '');
}

let _contactShadowTex = null;
function createContactShadow(radius = 0.62) {
  if (!_contactShadowTex && typeof document !== 'undefined') {
    const cv = document.createElement('canvas');
    cv.width = 128; cv.height = 128;
    const ctx = cv.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 6, 64, 64, 62);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.28)');
    grad.addColorStop(0.55, 'rgba(15, 23, 42, 0.12)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    _contactShadowTex = new THREE.CanvasTexture(cv);
  }
  const mat = new THREE.MeshBasicMaterial({
    map: _contactShadowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0.85
  });
  const mesh = new THREE.Mesh(new THREE.CircleGeometry(radius, 28), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.008;
  return mesh;
}

/**
 * Esculpe proceduralmente una cabeza anatómica estilizada (tipo Pixar/Blender):
 * - Cuencas oculares sutiles (recesos orbitales) para que los ojos encajen con profundidad real.
 * - Arco superciliar (frente/cejas), pómulos modelados y mandíbula/mentón integrados en una sola malla suave.
 * - Zona bucal y surco nasolabial delicados para que los labios y expresiones cobren vida con la luz PBR.
 */
function createSculptedHeadGeometry(headR, opts = {}) {
  const isBaby = !!opts.isBaby;
  const isChild = !!opts.isChild;
  const isFemale = !!opts.isFemale;
  const isElder = !!opts.isElder;

  const geo = new THREE.SphereGeometry(headR, 42, 32);
  const pos = geo.attributes.position;
  if (!pos || typeof pos.getX !== 'function') return geo;

  const sxBase = isBaby ? 1.04 : (isChild ? 0.99 : (isFemale ? 0.93 : 0.98));
  const syBase = isBaby ? 1.00 : (isChild ? 1.03 : 1.08);
  const szBase = isBaby ? 0.98 : 0.96;

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    const len = Math.sqrt(x * x + y * y + z * z) || 1;
    const nx = x / len;
    const ny = y / len;
    const nz = z / len;

    // 1. Proporción craneal base
    x *= sxBase;
    y *= syBase;
    z *= szBase;

    // 2. Afinamiento de mandíbula y forma del rostro inferior (ny < 0)
    if (ny < 0) {
      const low = -ny;
      if (isBaby) {
        // Mejillas regordetas de bebé
        const chub = Math.exp(-Math.pow((ny + 0.25) / 0.28, 2)) * Math.max(0, nz + 0.3);
        x *= 1 + 0.085 * chub;
        z += headR * 0.03 * chub;
      } else {
        const taperAmt = isFemale ? 0.25 : (isChild ? 0.16 : 0.13);
        const jawTaper = 1 - taperAmt * Math.pow(low, 1.35);
        x *= jawTaper;
        // Ángulo mandibular suave en hombres adultos
        if (!isFemale && !isChild && nz > -0.15 && nz < 0.55) {
          const jawAngle = Math.exp(-Math.pow((ny + 0.48) / 0.22, 2)) * Math.exp(-Math.pow((Math.abs(nx) - 0.66) / 0.24, 2));
          x += Math.sign(nx) * headR * 0.042 * jawAngle;
        }
      }
    }

    // 3. Cuencas oculares (orbital sockets) en la parte frontal
    if (nz > 0.32) {
      const eyeSocketL = Math.exp(-(Math.pow((nx + 0.35) / 0.20, 2) + Math.pow((ny - 0.14) / 0.16, 2) + Math.pow((nz - 0.88) / 0.28, 2)));
      const eyeSocketR = Math.exp(-(Math.pow((nx - 0.35) / 0.20, 2) + Math.pow((ny - 0.14) / 0.16, 2) + Math.pow((nz - 0.88) / 0.28, 2)));
      const socket = Math.min(1, eyeSocketL + eyeSocketR);
      z -= headR * (isBaby ? 0.036 : 0.062) * socket;

      // 4. Arco superciliar (brow ridge) suave sobre los ojos
      const browRidge = Math.exp(-(Math.pow((ny - 0.36) / 0.13, 2) + Math.pow(nx / 0.54, 2))) * Math.max(0, (nz - 0.55) / 0.45);
      z += headR * (isBaby ? 0.014 : (isFemale ? 0.022 : 0.040)) * browRidge;

      // 5. Pómulos esculpidos (malar eminences)
      const cheekL = Math.exp(-(Math.pow((nx + 0.46) / 0.24, 2) + Math.pow((ny + 0.11) / 0.20, 2)));
      const cheekR = Math.exp(-(Math.pow((nx - 0.46) / 0.24, 2) + Math.pow((ny + 0.11) / 0.20, 2)));
      const cheeks = Math.min(1, cheekL + cheekR) * Math.max(0, (nz - 0.32) / 0.68);
      const cheekAmt = isBaby ? 0.065 : (isChild ? 0.055 : (isFemale ? 0.052 : 0.042));
      z += headR * cheekAmt * cheeks;
      x += Math.sign(nx) * headR * (cheekAmt * 0.48) * cheeks;

      // 6. Volumen sutil del área bucal (oral barrel) + filtrum bajo la nariz
      const muzzle = Math.exp(-(Math.pow(nx / 0.32, 2) + Math.pow((ny + 0.36) / 0.20, 2))) * Math.max(0, (nz - 0.55) / 0.45);
      z += headR * (isBaby ? 0.018 : 0.032) * muzzle;

      const philtrum = Math.exp(-(Math.pow(nx / 0.07, 2) + Math.pow((ny + 0.22) / 0.09, 2))) * Math.max(0, (nz - 0.72) / 0.28);
      z -= headR * 0.014 * philtrum;

      // 7. Mentón esculpido integrado a la malla facial
      if (!isBaby) {
        const chin = Math.exp(-(Math.pow(nx / (isFemale ? 0.24 : 0.30), 2) + Math.pow((ny + 0.72) / 0.20, 2))) * Math.max(0, (nz - 0.25) / 0.75);
        z += headR * (isChild ? 0.035 : (isFemale ? 0.048 : 0.064)) * chin;
        y -= headR * (isChild ? 0.038 : (isFemale ? 0.068 : 0.075)) * chin;
      }

      // 8. Sutil hundimiento bajo los pómulos en Adulto Mayor para mayor carácter
      if (isElder) {
        const hollow = (Math.exp(-(Math.pow((nx + 0.50) / 0.18, 2) + Math.pow((ny + 0.30) / 0.16, 2)))
          + Math.exp(-(Math.pow((nx - 0.50) / 0.18, 2) + Math.pow((ny + 0.30) / 0.16, 2)))) * Math.max(0, (nz - 0.4) / 0.6);
        z -= headR * 0.025 * hollow;
      }
    }

    pos.setXYZ(i, x, y, z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

function createStylizedEye(eyeMat, whiteMat, darkMat, skinMat, radius = 0.056, em = 'Sonriente', side = 1, opts = {}) {
  const grp = new THREE.Group();
  const e = em || 'Sonriente';
  const skinHex = opts.skinHex || 0xE8C7AD;
  const isFemale = !!opts.isFemale;
  const isBaby = !!opts.isBaby;

  const lidShadeMat = new THREE.MeshStandardMaterial({
    color: shadeHexInt(skinHex, 0.90, 0.83, 0.80),
    roughness: 0.54
  });
  const creaseMat = new THREE.MeshStandardMaterial({
    color: shadeHexInt(skinHex, 0.76, 0.66, 0.62),
    roughness: 0.60
  });
  const scleraMat = new THREE.MeshStandardMaterial({
    color: 0xFFFDFB,
    roughness: 0.14,
    metalness: 0.02
  });

  // Ojos cerrados felices / relajados / guiño travieso (con párpado 3D real + pliegue expresivo)
  if (e === 'Riéndose a carcajadas' || e === 'Relajado / En paz' || (e === 'Travieso / Pícaro' && side === 1)) {
    // Base suave de párpado cerrado
    const closedLid = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.95, 16, 12), skinMat);
    closedLid.scale.set(1.05, 0.90, 0.55);
    grp.add(closedLid);

    const isRelaxed = e === 'Relajado / En paz';
    const curvePts = isRelaxed
      ? [
          new THREE.Vector3(-radius * 0.88, radius * 0.06, radius * 0.42),
          new THREE.Vector3(-radius * 0.34, -radius * 0.24, radius * 0.56),
          new THREE.Vector3(radius * 0.34, -radius * 0.24, radius * 0.56),
          new THREE.Vector3(radius * 0.88, radius * 0.06, radius * 0.42)
        ]
      : [
          new THREE.Vector3(-radius * 0.88, -radius * 0.14, radius * 0.42),
          new THREE.Vector3(-radius * 0.32, radius * 0.30, radius * 0.58),
          new THREE.Vector3(radius * 0.32, radius * 0.30, radius * 0.58),
          new THREE.Vector3(radius * 0.88, -radius * 0.14, radius * 0.42)
        ];
    const lashLine = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(curvePts), 16, radius * 0.16, 8, false),
      darkMat
    );
    grp.add(lashLine);

    // Arruguitas alegres (patas de gallo) al costado externo al reír o guiñar
    if (!isRelaxed) {
      [-0.18, 0.14].forEach(dy => {
        const crinkle = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.055, radius * 0.04, radius * 0.42, 6), creaseMat);
        crinkle.position.set(side * radius * 1.12, dy * radius, radius * 0.30);
        crinkle.rotation.z = Math.PI / 2 - side * (dy > 0 ? 0.35 : -0.25);
        grp.add(crinkle);
      });
    }
    return grp;
  }

  // Ojos de corazón 3D esculpidos para Enamorado / Tierno
  if (e === 'Enamorado / Tierno') {
    const heartMat = new THREE.MeshPhysicalMaterial({ color: 0xF43F5E, roughness: 0.18, metalness: 0.06, clearcoat: 0.9 });
    const lL = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.58, 14, 12), heartMat);
    lL.position.set(-radius * 0.36, radius * 0.24, radius * 0.36);
    const lR = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.58, 14, 12), heartMat);
    lR.position.set(radius * 0.36, radius * 0.24, radius * 0.36);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(radius * 0.80, radius * 1.18, 14), heartMat);
    tip.rotation.z = Math.PI;
    tip.scale.set(1.0, 1.0, 0.55);
    tip.position.set(0, -radius * 0.34, radius * 0.36);
    const shine = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.16, 8, 8), whiteMat);
    shine.position.set(-radius * 0.32, radius * 0.38, radius * 0.86);
    grp.add(lL, lR, tip, shine);
    return grp;
  }

  // Escala del globo ocular según emoción
  const isWide = (e === 'Sorprendido' || e === 'Asombrado' || e === 'Asustado');
  const sclScale = isWide ? 1.16 : 1.02;

  // Sombra sutil de la cuenca alrededor del ojo
  const socketRim = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 1.06 * sclScale, radius * 0.14, 8, 22),
    lidShadeMat
  );
  socketRim.scale.set(1.06, 0.98, 0.45);
  socketRim.position.z = radius * 0.18;
  grp.add(socketRim);

  // Esclerótica
  const sclera = new THREE.Mesh(new THREE.SphereGeometry(radius * sclScale, 20, 16), scleraMat);
  sclera.scale.set(1.02, 1.04, 0.74);
  grp.add(sclera);

  // Dirección de mirada expresiva
  const lookShiftX = (e === 'Pensativo' || e === 'Dudoso') ? 0.015
    : (e === 'Avergonzado / Tímido' ? -0.012 : (e === 'Curioso' ? 0.010 : 0));
  const lookShiftY = (e === 'Inspirado' || e === 'Soñador') ? 0.014
    : (e === 'Triste' || e === 'Llorando' || e === 'Avergonzado / Tímido' ? -0.011 : 0);

  // Iris multicapa: anillo limbal oscuro + iris principal + anillo interior luminoso + pupila
  const irisR = radius * ((e === 'Asustado') ? 0.42 : (e === 'Inspirado' || e === 'Entusiasmado' ? 0.76 : 0.66));
  const limbalMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.2 });
  const limbal = new THREE.Mesh(new THREE.SphereGeometry(irisR * 1.07, 16, 12), limbalMat);
  limbal.scale.set(1, 1, 0.36);
  limbal.position.set(lookShiftX, lookShiftY, radius * 0.52 * sclScale);
  grp.add(limbal);

  const iris = new THREE.Mesh(new THREE.SphereGeometry(irisR * 0.96, 16, 12), eyeMat);
  iris.scale.set(1, 1, 0.38);
  iris.position.set(lookShiftX, lookShiftY, radius * 0.56 * sclScale);
  grp.add(iris);

  const eyeBaseHex = (eyeMat && eyeMat.color && typeof eyeMat.color.getHex === 'function') ? eyeMat.color.getHex() : 0x3B82F6;
  const innerIrisMat = new THREE.MeshStandardMaterial({
    color: shadeHexInt(eyeBaseHex, 1.38, 1.38, 1.38),
    roughness: 0.22
  });
  const innerIris = new THREE.Mesh(new THREE.SphereGeometry(irisR * 0.68, 14, 10), innerIrisMat);
  innerIris.scale.set(1, 1, 0.35);
  innerIris.position.set(lookShiftX, lookShiftY - radius * 0.04, radius * 0.62 * sclScale);
  grp.add(innerIris);

  const pupilR = irisR * (e === 'Asustado' ? 0.42 : (e === 'Entusiasmado' || e === 'Inspirado' ? 0.58 : 0.52));
  const pupil = new THREE.Mesh(new THREE.SphereGeometry(pupilR, 14, 12), darkMat);
  pupil.scale.set(1, 1, 0.36);
  pupil.position.set(lookShiftX, lookShiftY, radius * 0.69 * sclScale);
  grp.add(pupil);

  // Brillos especulares de la córnea (o destello estrella en Entusiasmado / Inspirado)
  if (e === 'Entusiasmado' || e === 'Inspirado') {
    const starMat = new THREE.MeshStandardMaterial({ color: 0xFEF08A, emissive: 0xFACC15, emissiveIntensity: 0.55, roughness: 0.15 });
    const starA = new THREE.Mesh(new THREE.OctahedronGeometry(radius * 0.28, 0), starMat);
    starA.scale.set(0.45, 1.25, 0.25);
    starA.position.set(lookShiftX + radius * 0.16, lookShiftY + radius * 0.16, radius * 0.85 * sclScale);
    const starB = new THREE.Mesh(new THREE.OctahedronGeometry(radius * 0.28, 0), starMat);
    starB.scale.set(1.25, 0.45, 0.25);
    starB.position.copy(starA.position);
    grp.add(starA, starB);
  } else {
    const glint1 = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.21, 10, 10), whiteMat);
    glint1.position.set(lookShiftX + radius * 0.24, lookShiftY + radius * 0.24, radius * 0.84 * sclScale);
    const glint2 = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.10, 8, 8), whiteMat);
    glint2.position.set(lookShiftX - radius * 0.18, lookShiftY - radius * 0.16, radius * 0.82 * sclScale);
    grp.add(glint1, glint2);
  }

  // Párpado superior esculpido + pliegue de párpado dinámico según emoción
  const upperLidGrp = new THREE.Group();
  const lidDome = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.09 * sclScale, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.50),
    skinMat
  );
  lidDome.scale.set(1.04, 1.05, 0.80);
  upperLidGrp.add(lidDome);

  // Pliegue/borde superior del párpado
  const lidRim = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 1.04 * sclScale, radius * 0.12, 8, 18, Math.PI * 0.92),
    lidShadeMat
  );
  lidRim.rotation.z = Math.PI * 0.04;
  lidRim.position.set(0, radius * 0.04, radius * 0.44 * sclScale);
  upperLidGrp.add(lidRim);

  // Línea de pestañas superiores esculpida (más marcada y alada en Mujer)
  const lashThick = (isFemale && !isBaby) ? radius * 0.145 : radius * 0.105;
  const upperLashArc = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 1.00 * sclScale, lashThick, 8, 18, Math.PI * 0.88),
    darkMat
  );
  upperLashArc.rotation.z = Math.PI * 0.06;
  upperLashArc.position.set(0, radius * 0.02, radius * 0.50 * sclScale);
  upperLidGrp.add(upperLashArc);

  if (isFemale && !isBaby) {
    // Pestañas exteriores curvadas delicadas
    for (let k = 0; k < 2; k++) {
      const wing = new THREE.Mesh(new THREE.ConeGeometry(radius * 0.09, radius * (0.48 - k * 0.10), 6), darkMat);
      wing.position.set(side * radius * (0.98 - k * 0.14) * sclScale, radius * (0.28 + k * 0.24) * sclScale, radius * 0.54 * sclScale);
      wing.rotation.z = -side * (0.92 - k * 0.22);
      upperLidGrp.add(wing);
    }
  }

  // Ángulo del párpado superior por emoción
  if (e === 'Cansado / Aburrido') {
    upperLidGrp.rotation.x = 0.58;
  } else if (e === 'Orgulloso' || e === 'Confiado' || e === 'Soñador') {
    upperLidGrp.rotation.x = 0.36;
  } else if (e === 'Enojado' || e === 'Frustrado') {
    upperLidGrp.rotation.x = 0.34;
    upperLidGrp.rotation.z = side * 0.32;
  } else if (e === 'Determinado' || e === 'Concentrado') {
    upperLidGrp.rotation.x = 0.26;
    upperLidGrp.rotation.z = side * 0.22;
  } else if (e === 'Triste' || e === 'Llorando' || e === 'Preocupado') {
    upperLidGrp.rotation.x = 0.22;
    upperLidGrp.rotation.z = -side * 0.30;
  } else if (isWide) {
    upperLidGrp.rotation.x = -0.58;
  } else if (e === 'Confundido' || e === 'Curioso') {
    upperLidGrp.rotation.x = side === 1 ? -0.38 : 0.18;
  } else {
    upperLidGrp.rotation.x = -0.26;
  }
  grp.add(upperLidGrp);

  // Párpado inferior esculpido dinámico (elevación de mejilla Duchenne en sonrisas, tensión en enojo, humedad en tristeza)
  const lowerLidGrp = new THREE.Group();
  const isDuchenneHappy = (e === 'Sonriente' || e === 'Alegre' || e === 'Entusiasmado' || e === 'Inspirado' || e === 'Orgulloso' || e === 'Confiado' || e === 'Avergonzado / Tímido');
  const isTense = (e === 'Enojado' || e === 'Frustrado' || e === 'Determinado' || e === 'Concentrado');
  const lowerArc = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 0.98 * sclScale, radius * (isDuchenneHappy ? 0.17 : 0.11), 8, 16, Math.PI * 0.80),
    lidShadeMat
  );
  lowerArc.rotation.z = Math.PI + Math.PI * 0.10;
  lowerArc.position.set(0, -radius * 0.08, radius * 0.45 * sclScale);
  lowerLidGrp.add(lowerArc);

  if (isDuchenneHappy) {
    // Mejilla inferior elevada formando sonrisa genuina en los ojos
    lowerLidGrp.position.y = radius * 0.22;
    lowerLidGrp.scale.set(1.02, 0.72, 1.05);
  } else if (isTense) {
    lowerLidGrp.position.y = radius * 0.14;
    lowerLidGrp.rotation.z = -side * 0.10;
  } else if (isWide) {
    lowerLidGrp.position.y = -radius * 0.16;
  } else if (e === 'Cansado / Aburrido') {
    // Ojera sutil de cansancio
    const bag = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.88, radius * 0.11, 6, 14, Math.PI * 0.75), creaseMat);
    bag.rotation.z = Math.PI + Math.PI * 0.125;
    bag.position.set(0, -radius * 0.28, radius * 0.42);
    lowerLidGrp.add(bag);
  } else if (e === 'Triste' || e === 'Llorando' || e === 'Preocupado') {
    // Línea lagrimal brillante en el borde del párpado inferior
    const waterMat = new THREE.MeshPhysicalMaterial({ color: 0xBAE6FD, roughness: 0.05, clearcoat: 1.0, transparent: true, opacity: 0.82 });
    const waterLine = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.90, radius * 0.08, 6, 14, Math.PI * 0.75), waterMat);
    waterLine.rotation.z = Math.PI + Math.PI * 0.125;
    waterLine.position.set(0, -radius * 0.05, radius * 0.56);
    lowerLidGrp.add(waterLine);
  }
  grp.add(lowerLidGrp);

  return grp;
}

function applyBrowsAndMouth(headGrp, yOff, zOff, em, browMat, darkMat, scale = 1, hideMouth = false, opts = {}) {
  const e = em || 'Sonriente';
  const skinHex = opts.skinHex || 0xE8C7AD;
  const isFemale = !!opts.isFemale;
  const isBaby = !!opts.isBaby;

  // Materiales faciales naturales derivados del tono de piel
  const lipColor = isFemale
    ? shadeHexInt(skinHex, 0.98, 0.54, 0.58)
    : (isBaby ? shadeHexInt(skinHex, 0.99, 0.64, 0.66) : shadeHexInt(skinHex, 0.88, 0.64, 0.60));
  const lipMat = new THREE.MeshStandardMaterial({ color: lipColor, roughness: isFemale ? 0.34 : 0.48, metalness: 0.02 });
  const innerMouthMat = new THREE.MeshStandardMaterial({ color: 0x6B121A, roughness: 0.65 });
  const tongueMat = new THREE.MeshStandardMaterial({ color: 0xFB7185, roughness: 0.42 });
  const teethMat = new THREE.MeshStandardMaterial({ color: 0xFFFDF8, roughness: 0.18 });
  const creaseMat = new THREE.MeshStandardMaterial({ color: shadeHexInt(skinHex, 0.78, 0.68, 0.64), roughness: 0.62 });

  // Helper para construir una ceja curva 3D esculpida que abraza la curvatura de la frente
  const buildCurvedBrow = (side, innerY, midY, outerY, innerShiftX = 0, thickness = 0.0155) => {
    const s = side; // -1 = izquierda, +1 = derecha
    const bGrp = new THREE.Group();
    const baseZ = zOff + 0.258 * scale;
    const pts = [
      new THREE.Vector3(s * (0.046 + innerShiftX) * scale, yOff + (0.120 + innerY) * scale, baseZ + 0.016 * scale),
      new THREE.Vector3(s * 0.098 * scale, yOff + (0.138 + midY) * scale, baseZ + 0.012 * scale),
      new THREE.Vector3(s * 0.146 * scale, yOff + (0.122 + outerY) * scale, baseZ - 0.014 * scale)
    ];
    const r = thickness * scale * (isFemale ? 0.84 : 1.06);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 14, r, 8, false), browMat);
    const capA = new THREE.Mesh(new THREE.SphereGeometry(r * 0.96, 8, 8), browMat);
    capA.position.copy(pts[0]);
    const capB = new THREE.Mesh(new THREE.SphereGeometry(r * 0.76, 8, 8), browMat);
    capB.position.copy(pts[2]);
    bGrp.add(tube, capA, capB);
    return bGrp;
  };

  // Helper para arcos labiales curvos 3D que siguen la curvatura del rostro
  const makeLipTube = (pts, r, mat = lipMat) => {
    const grp = new THREE.Group();
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 18, r, 8, false), mat);
    const c1 = new THREE.Mesh(new THREE.SphereGeometry(r * 0.88, 8, 8), mat);
    c1.position.copy(pts[0]);
    const c2 = new THREE.Mesh(new THREE.SphereGeometry(r * 0.88, 8, 8), mat);
    c2.position.copy(pts[pts.length - 1]);
    grp.add(tube, c1, c2);
    return grp;
  };

  // Rubor y hoyuelos expresivos
  const addBlush = (intensity = 0.45, withDimples = false) => {
    const cheekMat = new THREE.MeshStandardMaterial({ color: 0xFB7185, roughness: 0.72, transparent: true, opacity: intensity });
    [-1, 1].forEach(s => {
      const ck = new THREE.Mesh(new THREE.SphereGeometry(0.048 * scale, 12, 10), cheekMat);
      ck.scale.set(1.25, 0.72, 0.30);
      ck.position.set(s * 0.148 * scale, yOff - 0.024 * scale, zOff + 0.228 * scale);
      headGrp.add(ck);
      if (withDimples) {
        const dmp = new THREE.Mesh(new THREE.SphereGeometry(0.011 * scale, 8, 8), creaseMat);
        dmp.scale.set(0.7, 1.4, 0.35);
        dmp.position.set(s * 0.105 * scale, yOff - 0.092 * scale, zOff + 0.244 * scale);
        headGrp.add(dmp);
      }
    });
  };

  // Arrugas de entrecejo (enojo / frustración / determinación)
  const addGlabellaFurrow = () => {
    [-1, 1].forEach(s => {
      const f = new THREE.Mesh(new THREE.CylinderGeometry(0.0045 * scale, 0.0045 * scale, 0.036 * scale, 6), creaseMat);
      f.position.set(s * 0.018 * scale, yOff + 0.114 * scale, zOff + 0.272 * scale);
      f.rotation.z = s * 0.16;
      headGrp.add(f);
    });
  };

  // Arrugas horizontales en la frente (sorpresa / preocupación / susto)
  const addForeheadLines = (count = 2) => {
    for (let i = 0; i < count; i++) {
      const ly = yOff + (0.175 + i * 0.024) * scale;
      const pts = [
        new THREE.Vector3(-0.072 * scale, ly - 0.004 * scale, zOff + 0.242 * scale),
        new THREE.Vector3(0, ly + 0.004 * scale, zOff + 0.258 * scale),
        new THREE.Vector3(0.072 * scale, ly - 0.004 * scale, zOff + 0.242 * scale)
      ];
      headGrp.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 0.0038 * scale, 6, false), creaseMat));
    }
  };

  // Lágrimas 3D brillantes
  const addTear = (side = 1, stream = false) => {
    const tearMat = new THREE.MeshPhysicalMaterial({ color: 0x38BDF8, roughness: 0.06, metalness: 0.04, clearcoat: 1.0, transparent: true, opacity: 0.88 });
    const drop = new THREE.Mesh(new THREE.SphereGeometry((stream ? 0.023 : 0.018) * scale, 12, 10), tearMat);
    drop.scale.set(0.82, 1.40, 0.72);
    drop.position.set(side * 0.112 * scale, yOff - 0.026 * scale, zOff + 0.258 * scale);
    headGrp.add(drop);
    if (stream) {
      const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.010 * scale, 0.015 * scale, 0.095 * scale, 8), tearMat);
      tr.position.set(side * 0.106 * scale, yOff - 0.056 * scale, zOff + 0.252 * scale);
      tr.rotation.z = side * 0.08;
      headGrp.add(tr);
    }
  };

  // --- 1. CEJAS EXPRESIVAS CURVAS SEGÚN LAS 25 EMOCIONES ---
  let browL, browR;
  if (e === 'Sorprendido' || e === 'Asombrado') {
    browL = buildCurvedBrow(-1, 0.036, 0.054, 0.026);
    browR = buildCurvedBrow(1, 0.036, 0.054, 0.026);
    addForeheadLines(2);
  } else if (e === 'Asustado') {
    browL = buildCurvedBrow(-1, 0.048, 0.030, -0.008, -0.006);
    browR = buildCurvedBrow(1, 0.048, 0.030, -0.008, -0.006);
    addForeheadLines(2);
  } else if (e === 'Enojado' || e === 'Frustrado') {
    browL = buildCurvedBrow(-1, -0.036, -0.008, 0.024, -0.012, 0.018);
    browR = buildCurvedBrow(1, -0.036, -0.008, 0.024, -0.012, 0.018);
    addGlabellaFurrow();
  } else if (e === 'Concentrado' || e === 'Determinado') {
    browL = buildCurvedBrow(-1, -0.022, -0.004, 0.012, -0.008, 0.017);
    browR = buildCurvedBrow(1, -0.022, -0.004, 0.012, -0.008, 0.017);
    addGlabellaFurrow();
  } else if (e === 'Triste' || e === 'Llorando' || e === 'Preocupado') {
    browL = buildCurvedBrow(-1, 0.032, 0.010, -0.022, -0.004);
    browR = buildCurvedBrow(1, 0.032, 0.010, -0.022, -0.004);
    if (e === 'Preocupado') addForeheadLines(1);
    if (e === 'Triste') addTear(1, false);
    if (e === 'Llorando') { addTear(-1, true); addTear(1, true); }
  } else if (e === 'Curioso' || e === 'Confundido' || e === 'Dudoso') {
    browL = buildCurvedBrow(-1, e === 'Confundido' ? -0.018 : 0.002, 0.008, 0.004);
    browR = buildCurvedBrow(1, 0.026, 0.048, 0.022);
  } else if (e === 'Pensativo') {
    browL = buildCurvedBrow(-1, -0.010, 0.002, 0.004);
    browR = buildCurvedBrow(1, 0.020, 0.032, 0.012);
  } else if (e === 'Nervioso') {
    browL = buildCurvedBrow(-1, 0.030, 0.014, -0.014);
    browR = buildCurvedBrow(1, 0.030, 0.014, -0.014);
    const swMat = new THREE.MeshPhysicalMaterial({ color: 0x38BDF8, roughness: 0.08, clearcoat: 1.0 });
    const sw = new THREE.Mesh(new THREE.SphereGeometry(0.021 * scale, 10, 10), swMat);
    sw.scale.set(0.78, 1.38, 0.65);
    sw.position.set(0.185 * scale, yOff + 0.135 * scale, zOff + 0.20 * scale);
    headGrp.add(sw);
  } else if (e === 'Avergonzado / Tímido') {
    browL = buildCurvedBrow(-1, 0.024, 0.012, -0.010);
    browR = buildCurvedBrow(1, 0.024, 0.012, -0.010);
  } else if (e === 'Cansado / Aburrido') {
    browL = buildCurvedBrow(-1, -0.012, -0.010, -0.018);
    browR = buildCurvedBrow(1, -0.012, -0.010, -0.018);
  } else if (e === 'Travieso / Pícaro' || e === 'Orgulloso' || e === 'Confiado') {
    browL = buildCurvedBrow(-1, -0.010, 0.008, 0.014);
    browR = buildCurvedBrow(1, 0.016, 0.038, 0.020);
  } else if (e === 'Alegre' || e === 'Entusiasmado' || e === 'Riéndose a carcajadas' || e === 'Inspirado') {
    browL = buildCurvedBrow(-1, 0.020, 0.038, 0.018);
    browR = buildCurvedBrow(1, 0.020, 0.038, 0.018);
  } else {
    browL = buildCurvedBrow(-1, 0.008, 0.020, 0.008);
    browR = buildCurvedBrow(1, 0.008, 0.020, 0.008);
  }
  headGrp.add(browL, browR);

  if (hideMouth) return;

  // --- 2. BOCA Y LABIOS 3D ESCULPIDOS (CON DIENTES, LENGUA Y COMISURAS) ---
  const mGrp = new THREE.Group();
  const mY = yOff - 0.106 * scale;
  const mZ = zOff + 0.258 * scale;

  if (e === 'Sorprendido' || e === 'Asombrado' || e === 'Asustado') {
    const rx = (e === 'Asustado' ? 0.056 : (e === 'Asombrado' ? 0.050 : 0.042)) * scale;
    const ry = (e === 'Asustado' ? 0.044 : (e === 'Asombrado' ? 0.062 : 0.052)) * scale;
    const cav = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 14), innerMouthMat);
    cav.scale.set(rx * 0.92, ry * 0.92, 0.016 * scale);
    cav.position.set(0, mY - 0.004 * scale, mZ - 0.006 * scale);
    const lipRing = new THREE.Mesh(new THREE.TorusGeometry(1, 0.24, 10, 24), lipMat);
    lipRing.scale.set(rx, ry, 0.048 * scale);
    lipRing.position.set(0, mY - 0.004 * scale, mZ + 0.004 * scale);
    // Dientes superiores + lengua sutil visibles dentro del gesto de asombro/susto
    const tRow = new THREE.Mesh(new THREE.BoxGeometry(rx * 1.15, 0.016 * scale, 0.012 * scale), teethMat);
    tRow.position.set(0, mY + ry * 0.56, mZ + 0.001 * scale);
    const tng = new THREE.Mesh(new THREE.SphereGeometry(rx * 0.52, 10, 8), tongueMat);
    tng.scale.set(1.0, 0.55, 0.45);
    tng.position.set(0, mY - ry * 0.52, mZ + 0.001 * scale);
    mGrp.add(cav, lipRing, tRow, tng);
  } else if (e === 'Enojado') {
    // Dientes apretados feroces con labios retraídos en tensión
    const cav = new THREE.Mesh(new THREE.BoxGeometry(0.118 * scale, 0.046 * scale, 0.016 * scale), innerMouthMat);
    cav.position.set(0, mY - 0.010 * scale, mZ - 0.004 * scale);
    const upperTeeth = new THREE.Mesh(new THREE.BoxGeometry(0.106 * scale, 0.018 * scale, 0.018 * scale), teethMat);
    upperTeeth.position.set(0, mY - 0.001 * scale, mZ + 0.002 * scale);
    const lowerTeeth = new THREE.Mesh(new THREE.BoxGeometry(0.100 * scale, 0.016 * scale, 0.018 * scale), teethMat);
    lowerTeeth.position.set(0, mY - 0.020 * scale, mZ + 0.001 * scale);
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.108 * scale, 0.004 * scale, 0.021 * scale), darkMat);
    seam.position.set(0, mY - 0.010 * scale, mZ + 0.003 * scale);
    const uLip = makeLipTube([
      new THREE.Vector3(-0.068 * scale, mY - 0.026 * scale, mZ - 0.014 * scale),
      new THREE.Vector3(-0.024 * scale, mY + 0.012 * scale, mZ + 0.010 * scale),
      new THREE.Vector3(0.024 * scale, mY + 0.012 * scale, mZ + 0.010 * scale),
      new THREE.Vector3(0.068 * scale, mY - 0.026 * scale, mZ - 0.014 * scale)
    ], 0.012 * scale);
    const lLip = makeLipTube([
      new THREE.Vector3(-0.066 * scale, mY - 0.028 * scale, mZ - 0.014 * scale),
      new THREE.Vector3(0, mY - 0.034 * scale, mZ + 0.009 * scale),
      new THREE.Vector3(0.066 * scale, mY - 0.028 * scale, mZ - 0.014 * scale)
    ], 0.013 * scale);
    mGrp.add(cav, upperTeeth, lowerTeeth, seam, uLip, lLip);
  } else if (e === 'Frustrado' || e === 'Triste' || e === 'Preocupado') {
    const drop = e === 'Preocupado' ? 0.018 : 0.032;
    const uLip = makeLipTube([
      new THREE.Vector3(-0.062 * scale, mY - drop * scale, mZ - 0.014 * scale),
      new THREE.Vector3(-0.018 * scale, mY + 0.008 * scale, mZ + 0.010 * scale),
      new THREE.Vector3(0.018 * scale, mY + 0.008 * scale, mZ + 0.010 * scale),
      new THREE.Vector3(0.062 * scale, mY - drop * scale, mZ - 0.014 * scale)
    ], 0.0125 * scale);
    const lLip = makeLipTube([
      new THREE.Vector3(-0.056 * scale, mY - (drop + 0.008) * scale, mZ - 0.012 * scale),
      new THREE.Vector3(0, mY - 0.010 * scale, mZ + 0.011 * scale),
      new THREE.Vector3(0.056 * scale, mY - (drop + 0.008) * scale, mZ - 0.012 * scale)
    ], 0.014 * scale);
    const line = makeLipTube([
      new THREE.Vector3(-0.060 * scale, mY - (drop + 0.003) * scale, mZ - 0.009 * scale),
      new THREE.Vector3(0, mY - 0.001 * scale, mZ + 0.013 * scale),
      new THREE.Vector3(0.060 * scale, mY - (drop + 0.003) * scale, mZ - 0.009 * scale)
    ], 0.0055 * scale, darkMat);
    mGrp.add(uLip, lLip, line);
  } else if (e === 'Llorando') {
    // Boca abierta de llanto con labio inferior tembloroso y lengua
    const cav = new THREE.Mesh(new THREE.SphereGeometry(0.054 * scale, 16, 14), innerMouthMat);
    cav.scale.set(1.25, 0.92, 0.35);
    cav.position.set(0, mY - 0.014 * scale, mZ - 0.004 * scale);
    const tng = new THREE.Mesh(new THREE.SphereGeometry(0.032 * scale, 10, 8), tongueMat);
    tng.scale.set(1.2, 0.55, 0.45);
    tng.position.set(0, mY - 0.036 * scale, mZ + 0.004 * scale);
    const uLip = makeLipTube([
      new THREE.Vector3(-0.068 * scale, mY - 0.028 * scale, mZ - 0.014 * scale),
      new THREE.Vector3(-0.020 * scale, mY + 0.016 * scale, mZ + 0.012 * scale),
      new THREE.Vector3(0.020 * scale, mY + 0.016 * scale, mZ + 0.012 * scale),
      new THREE.Vector3(0.068 * scale, mY - 0.028 * scale, mZ - 0.014 * scale)
    ], 0.012 * scale);
    const lLip = makeLipTube([
      new THREE.Vector3(-0.065 * scale, mY - 0.030 * scale, mZ - 0.014 * scale),
      new THREE.Vector3(0, mY - 0.056 * scale, mZ + 0.010 * scale),
      new THREE.Vector3(0.065 * scale, mY - 0.030 * scale, mZ - 0.014 * scale)
    ], 0.0135 * scale);
    mGrp.add(cav, tng, uLip, lLip);
  } else if (e === 'Alegre' || e === 'Entusiasmado' || e === 'Riéndose a carcajadas' || e === 'Inspirado') {
    const big = e === 'Riéndose a carcajadas' ? 1.18 : 1.04;
    addBlush(0.42, true);
    const w = 0.076 * big * scale;
    const h = 0.066 * big * scale;
    const cavity = new THREE.Mesh(
      new THREE.CylinderGeometry(w, w, 0.022 * scale, 18, 1, false, 0, Math.PI),
      innerMouthMat
    );
    cavity.rotation.x = Math.PI / 2; cavity.rotation.y = Math.PI;
    cavity.scale.set(1.0, 0.85, 1.0);
    cavity.position.set(0, mY + 0.012 * scale, mZ - 0.004 * scale);
    // Dientes superiores curvos (sonrisa radiante)
    const teeth = makeLipTube([
      new THREE.Vector3(-w * 0.78, mY + 0.003 * scale, mZ - 0.004 * scale),
      new THREE.Vector3(0, mY - 0.004 * scale, mZ + 0.010 * scale),
      new THREE.Vector3(w * 0.78, mY + 0.003 * scale, mZ - 0.004 * scale)
    ], 0.0125 * scale, teethMat);
    const tongue = new THREE.Mesh(new THREE.SphereGeometry(0.036 * big * scale, 12, 10), tongueMat);
    tongue.scale.set(1.25, 0.60, 0.45);
    tongue.position.set(0, mY - h * 0.62, mZ + 0.006 * scale);
    // Labio superior e inferior esculpidos abrazando la carcajada
    const uLip = makeLipTube([
      new THREE.Vector3(-w * 1.04, mY + 0.016 * scale, mZ - 0.016 * scale),
      new THREE.Vector3(-w * 0.30, mY + 0.024 * scale, mZ + 0.012 * scale),
      new THREE.Vector3(0, mY + 0.017 * scale, mZ + 0.015 * scale),
      new THREE.Vector3(w * 0.30, mY + 0.024 * scale, mZ + 0.012 * scale),
      new THREE.Vector3(w * 1.04, mY + 0.016 * scale, mZ - 0.016 * scale)
    ], 0.0115 * scale);
    const lLip = makeLipTube([
      new THREE.Vector3(-w * 1.02, mY + 0.012 * scale, mZ - 0.016 * scale),
      new THREE.Vector3(-w * 0.50, mY - h * 0.76, mZ + 0.004 * scale),
      new THREE.Vector3(0, mY - h * 0.96, mZ + 0.012 * scale),
      new THREE.Vector3(w * 0.50, mY - h * 0.76, mZ + 0.004 * scale),
      new THREE.Vector3(w * 1.02, mY + 0.012 * scale, mZ - 0.016 * scale)
    ], 0.0135 * scale);
    mGrp.add(cavity, teeth, tongue, uLip, lLip);
  } else if (e === 'Travieso / Pícaro') {
    addBlush(0.32, true);
    const uLip = makeLipTube([
      new THREE.Vector3(-0.064 * scale, mY + 0.002 * scale, mZ - 0.014 * scale),
      new THREE.Vector3(0, mY - 0.004 * scale, mZ + 0.013 * scale),
      new THREE.Vector3(0.072 * scale, mY + 0.026 * scale, mZ - 0.012 * scale)
    ], 0.012 * scale);
    const seam = makeLipTube([
      new THREE.Vector3(-0.062 * scale, mY - 0.003 * scale, mZ - 0.010 * scale),
      new THREE.Vector3(0, mY - 0.012 * scale, mZ + 0.016 * scale),
      new THREE.Vector3(0.070 * scale, mY + 0.020 * scale, mZ - 0.008 * scale)
    ], 0.0055 * scale, darkMat);
    // Lengüita pícara asomándose por un costado
    const tongue = new THREE.Mesh(new THREE.SphereGeometry(0.028 * scale, 12, 10), tongueMat);
    tongue.scale.set(0.95, 1.35, 0.55);
    tongue.position.set(0.026 * scale, mY - 0.026 * scale, mZ + 0.018 * scale);
    tongue.rotation.z = 0.25;
    tongue.rotation.x = -0.35;
    mGrp.add(uLip, seam, tongue);
  } else if (e === 'Orgulloso' || e === 'Confiado') {
    // Media sonrisa segura y elegante (smirk)
    const uLip = makeLipTube([
      new THREE.Vector3(-0.056 * scale, mY - 0.004 * scale, mZ - 0.012 * scale),
      new THREE.Vector3(0, mY - 0.002 * scale, mZ + 0.013 * scale),
      new THREE.Vector3(0.072 * scale, mY + 0.024 * scale, mZ - 0.012 * scale)
    ], 0.012 * scale);
    const lLip = makeLipTube([
      new THREE.Vector3(-0.046 * scale, mY - 0.014 * scale, mZ - 0.008 * scale),
      new THREE.Vector3(0.008 * scale, mY - 0.018 * scale, mZ + 0.012 * scale),
      new THREE.Vector3(0.064 * scale, mY + 0.014 * scale, mZ - 0.010 * scale)
    ], 0.014 * scale);
    const seam = makeLipTube([
      new THREE.Vector3(-0.054 * scale, mY - 0.008 * scale, mZ - 0.008 * scale),
      new THREE.Vector3(0.004 * scale, mY - 0.009 * scale, mZ + 0.016 * scale),
      new THREE.Vector3(0.070 * scale, mY + 0.020 * scale, mZ - 0.008 * scale)
    ], 0.005 * scale, darkMat);
    mGrp.add(uLip, lLip, seam);
  } else if (e === 'Nervioso') {
    const pts = [
      new THREE.Vector3(-0.064 * scale, mY - 0.006 * scale, mZ - 0.012 * scale),
      new THREE.Vector3(-0.032 * scale, mY + 0.008 * scale, mZ + 0.008 * scale),
      new THREE.Vector3(0, mY - 0.010 * scale, mZ + 0.014 * scale),
      new THREE.Vector3(0.032 * scale, mY + 0.008 * scale, mZ + 0.008 * scale),
      new THREE.Vector3(0.064 * scale, mY - 0.006 * scale, mZ - 0.012 * scale)
    ];
    mGrp.add(makeLipTube(pts, 0.0115 * scale, lipMat));
    mGrp.add(makeLipTube(pts.map(p => new THREE.Vector3(p.x, p.y - 0.002 * scale, p.z + 0.005 * scale)), 0.005 * scale, darkMat));
  } else if (e === 'Curioso' || e === 'Confundido' || e === 'Dudoso') {
    const tilt = e === 'Confundido' ? -0.020 : 0.014;
    const uLip = makeLipTube([
      new THREE.Vector3(-0.050 * scale, mY - tilt * scale, mZ - 0.010 * scale),
      new THREE.Vector3(0, mY + 0.004 * scale, mZ + 0.013 * scale),
      new THREE.Vector3(0.056 * scale, mY + tilt * scale, mZ - 0.010 * scale)
    ], 0.012 * scale);
    const lLip = makeLipTube([
      new THREE.Vector3(-0.044 * scale, mY - (tilt + 0.012) * scale, mZ - 0.008 * scale),
      new THREE.Vector3(0, mY - 0.014 * scale, mZ + 0.012 * scale),
      new THREE.Vector3(0.048 * scale, mY + (tilt - 0.010) * scale, mZ - 0.008 * scale)
    ], 0.0135 * scale);
    const seam = makeLipTube([
      new THREE.Vector3(-0.048 * scale, mY - (tilt + 0.005) * scale, mZ - 0.006 * scale),
      new THREE.Vector3(0, mY - 0.004 * scale, mZ + 0.015 * scale),
      new THREE.Vector3(0.054 * scale, mY + (tilt - 0.004) * scale, mZ - 0.006 * scale)
    ], 0.005 * scale, darkMat);
    mGrp.add(uLip, lLip, seam);
  } else if (e === 'Serio' || e === 'Concentrado' || e === 'Pensativo' || e === 'Determinado' || e === 'Cansado / Aburrido') {
    const xShift = e === 'Pensativo' ? 0.014 * scale : 0;
    const w = (e === 'Pensativo' ? 0.046 : 0.058) * scale;
    const droop = e === 'Cansado / Aburrido' ? -0.008 * scale : 0;
    const uLip = makeLipTube([
      new THREE.Vector3(xShift - w, mY + droop, mZ - 0.012 * scale),
      new THREE.Vector3(xShift - w * 0.35, mY + 0.008 * scale, mZ + 0.012 * scale),
      new THREE.Vector3(xShift, mY + 0.003 * scale, mZ + 0.015 * scale),
      new THREE.Vector3(xShift + w * 0.35, mY + 0.008 * scale, mZ + 0.012 * scale),
      new THREE.Vector3(xShift + w, mY + droop, mZ - 0.012 * scale)
    ], 0.0115 * scale);
    const lLip = makeLipTube([
      new THREE.Vector3(xShift - w * 0.88, mY - 0.010 * scale + droop, mZ - 0.008 * scale),
      new THREE.Vector3(xShift, mY - 0.016 * scale, mZ + 0.014 * scale),
      new THREE.Vector3(xShift + w * 0.88, mY - 0.010 * scale + droop, mZ - 0.008 * scale)
    ], 0.014 * scale);
    const seam = makeLipTube([
      new THREE.Vector3(xShift - w * 0.96, mY - 0.004 * scale + droop, mZ - 0.008 * scale),
      new THREE.Vector3(xShift, mY - 0.005 * scale, mZ + 0.016 * scale),
      new THREE.Vector3(xShift + w * 0.96, mY - 0.004 * scale + droop, mZ - 0.008 * scale)
    ], 0.005 * scale, darkMat);
    mGrp.add(uLip, lLip, seam);
  } else if (e === 'Avergonzado / Tímido') {
    addBlush(0.72, false);
    const uLip = makeLipTube([
      new THREE.Vector3(-0.042 * scale, mY + 0.008 * scale, mZ - 0.006 * scale),
      new THREE.Vector3(0, mY - 0.004 * scale, mZ + 0.014 * scale),
      new THREE.Vector3(0.042 * scale, mY + 0.008 * scale, mZ - 0.006 * scale)
    ], 0.0115 * scale);
    const lLip = makeLipTube([
      new THREE.Vector3(-0.034 * scale, mY - 0.002 * scale, mZ - 0.004 * scale),
      new THREE.Vector3(0, mY - 0.016 * scale, mZ + 0.013 * scale),
      new THREE.Vector3(0.034 * scale, mY - 0.002 * scale, mZ - 0.004 * scale)
    ], 0.013 * scale);
    const seam = makeLipTube([
      new THREE.Vector3(-0.040 * scale, mY + 0.003 * scale, mZ - 0.002 * scale),
      new THREE.Vector3(0, mY - 0.008 * scale, mZ + 0.016 * scale),
      new THREE.Vector3(0.040 * scale, mY + 0.003 * scale, mZ - 0.002 * scale)
    ], 0.0048 * scale, darkMat);
    mGrp.add(uLip, lLip, seam);
  } else {
    // Sonriente / Enamorado / Relajado / Soñador: sonrisa natural cálida con arco de Cupido, labio inferior lleno y hoyuelos
    addBlush(e === 'Enamorado / Tierno' ? 0.65 : 0.30, e === 'Sonriente');
    const w = 0.072 * scale;
    const lift = e === 'Relajado / En paz' ? 0.014 : 0.022;
    const uLip = makeLipTube([
      new THREE.Vector3(-w, mY + lift * scale, mZ - 0.016 * scale),
      new THREE.Vector3(-w * 0.34, mY + 0.004 * scale, mZ + 0.012 * scale),
      new THREE.Vector3(0, mY - 0.002 * scale, mZ + 0.015 * scale),
      new THREE.Vector3(w * 0.34, mY + 0.004 * scale, mZ + 0.012 * scale),
      new THREE.Vector3(w, mY + lift * scale, mZ - 0.016 * scale)
    ], 0.0115 * scale);
    const lLip = makeLipTube([
      new THREE.Vector3(-w * 0.90, mY + (lift - 0.010) * scale, mZ - 0.012 * scale),
      new THREE.Vector3(0, mY - 0.026 * scale, mZ + 0.013 * scale),
      new THREE.Vector3(w * 0.90, mY + (lift - 0.010) * scale, mZ - 0.012 * scale)
    ], 0.0145 * scale);
    const seam = makeLipTube([
      new THREE.Vector3(-w * 0.96, mY + (lift - 0.004) * scale, mZ - 0.011 * scale),
      new THREE.Vector3(0, mY - 0.014 * scale, mZ + 0.017 * scale),
      new THREE.Vector3(w * 0.96, mY + (lift - 0.004) * scale, mZ - 0.011 * scale)
    ], 0.0052 * scale, darkMat);
    mGrp.add(uLip, lLip, seam);
  }

  headGrp.add(mGrp);
}

function getPostureRigConfig(c) {
  const acc = c.accionTipo || '';
  const em = c.emocion || '';
  const cfg = {
    bodyY: 0, torsoRx: 0, torsoRy: 0, torsoRz: 0,
    headRx: 0, headRy: 0, headRz: 0,
    armL: { rx: 0, ry: 0, rz: -0.14, elbowRx: -0.12 },
    armR: { rx: 0, ry: 0, rz: 0.14, elbowRx: -0.12 },
    legL: { rx: 0, rz: -0.04, kneeRx: 0 },
    legR: { rx: 0, rz: 0.04, kneeRx: 0 }
  };

  if (acc === 'Saludando con la mano') {
    cfg.headRz = -0.08;
    cfg.armR = { rx: -0.25, ry: 0, rz: 2.35, elbowRx: -0.45 };
    cfg.armL = { rx: 0.08, ry: 0, rz: -0.18, elbowRx: -0.15 };
  } else if (acc === 'Saludando con ambas manos') {
    cfg.headRx = -0.06;
    cfg.armL = { rx: -0.22, ry: 0, rz: -2.35, elbowRx: -0.42 };
    cfg.armR = { rx: -0.22, ry: 0, rz: 2.35, elbowRx: -0.42 };
  } else if (acc === 'Haciendo señal de paz (V)') {
    cfg.headRz = -0.10;
    cfg.armR = { rx: -1.15, ry: -0.18, rz: 0.65, elbowRx: -1.05 };
    cfg.armL = { rx: 0.08, ry: 0, rz: -0.22, elbowRx: -0.18 };
  } else if (acc === 'Levantando la mano') {
    cfg.armR = { rx: -0.1, ry: 0, rz: 2.95, elbowRx: -0.08 };
  } else if (acc === 'Señalando hacia un lado') {
    cfg.torsoRy = 0.18; cfg.headRy = 0.25;
    cfg.armR = { rx: -0.05, ry: 0, rz: 1.52, elbowRx: -0.05 };
  } else if (acc === 'Señalando hacia arriba') {
    cfg.headRx = -0.22;
    cfg.armR = { rx: -0.2, ry: 0, rz: 2.8, elbowRx: -0.1 };
  } else if (acc === 'Explicando frente a la clase') {
    cfg.torsoRy = 0.22; cfg.headRy = -0.18;
    cfg.armR = { rx: -0.62, ry: 0, rz: 1.12, elbowRx: -0.28 };
    cfg.armL = { rx: -0.32, ry: 0, rz: -0.32, elbowRx: -0.45 };
  } else if (acc === 'Celebrando con ambos brazos arriba') {
    cfg.headRx = -0.12;
    cfg.armL = { rx: -0.15, ry: 0, rz: -2.6, elbowRx: -0.22 };
    cfg.armR = { rx: -0.15, ry: 0, rz: 2.6, elbowRx: -0.22 };
    cfg.legL = { rx: 0, rz: -0.14, kneeRx: 0 };
    cfg.legR = { rx: 0, rz: 0.14, kneeRx: 0 };
  } else if (acc === 'Corazón con los brazos arriba') {
    cfg.headRz = -0.05;
    cfg.armL = { rx: -0.15, ry: 0.2, rz: -2.42, elbowRx: -1.18 };
    cfg.armR = { rx: -0.15, ry: -0.2, rz: 2.42, elbowRx: -1.18 };
  } else if (acc === 'Manos en el pecho (agradecido)') {
    cfg.headRx = 0.08;
    cfg.armL = { rx: -0.85, ry: 0.52, rz: 0.42, elbowRx: -1.25 };
    cfg.armR = { rx: -0.85, ry: -0.52, rz: -0.42, elbowRx: -1.25 };
  } else if (acc === 'Manos detrás de la espalda') {
    cfg.torsoRx = -0.04;
    cfg.armL = { rx: 0.46, ry: -0.38, rz: -0.14, elbowRx: -0.85 };
    cfg.armR = { rx: 0.46, ry: 0.38, rz: 0.14, elbowRx: -0.85 };
  } else if (acc === 'Manos en la cabeza (asombrado)') {
    cfg.headRx = -0.08;
    cfg.armL = { rx: -0.42, ry: 0.35, rz: -2.18, elbowRx: -1.35 };
    cfg.armR = { rx: -0.42, ry: -0.35, rz: 2.18, elbowRx: -1.35 };
  } else if (acc === 'Cubriéndose la boca') {
    cfg.headRx = 0.04;
    cfg.armL = { rx: -1.42, ry: 0.44, rz: 0.18, elbowRx: -1.28 };
    cfg.armR = { rx: -1.42, ry: -0.44, rz: -0.18, elbowRx: -1.28 };
  } else if (acc === 'Encogiéndose de hombros') {
    cfg.headRz = 0.14;
    cfg.armL = { rx: -0.32, ry: -0.35, rz: -0.82, elbowRx: -0.95 };
    cfg.armR = { rx: -0.32, ry: 0.35, rz: 0.82, elbowRx: -0.95 };
  } else if (acc === 'Saltando alegre') {
    cfg.bodyY = 0.34; cfg.torsoRx = -0.06;
    cfg.armL = { rx: -0.2, ry: 0, rz: -2.55, elbowRx: -0.25 };
    cfg.armR = { rx: -0.2, ry: 0, rz: 2.55, elbowRx: -0.25 };
    cfg.legL = { rx: -0.55, rz: -0.28, kneeRx: 0.85 };
    cfg.legR = { rx: -0.55, rz: 0.28, kneeRx: 0.85 };
  } else if (acc === 'Brazos cruzados') {
    cfg.headRy = -0.08;
    cfg.armL = { rx: -0.82, ry: 0.4, rz: 0.52, elbowRx: -1.1 };
    cfg.armR = { rx: -0.82, ry: -0.4, rz: -0.52, elbowRx: -1.1 };
  } else if (acc === 'Manos en la cintura') {
    cfg.headRz = 0.06;
    cfg.armL = { rx: -0.15, ry: 0, rz: -0.78, elbowRx: -1.25 };
    cfg.armR = { rx: -0.15, ry: 0, rz: 0.78, elbowRx: -1.25 };
    cfg.legL = { rx: 0, rz: -0.12, kneeRx: 0 };
    cfg.legR = { rx: 0, rz: 0.12, kneeRx: 0 };
  } else if (acc === 'Aplaudiendo') {
    cfg.armL = { rx: -0.85, ry: 0.35, rz: 0.38, elbowRx: -0.85 };
    cfg.armR = { rx: -0.85, ry: -0.35, rz: -0.38, elbowRx: -0.85 };
  } else if (acc === 'Pensando con la mano en el mentón') {
    cfg.headRz = 0.14; cfg.headRx = 0.08;
    cfg.armR = { rx: -1.45, ry: -0.35, rz: -0.25, elbowRx: -1.35 };
    cfg.armL = { rx: -0.45, ry: 0.2, rz: 0.25, elbowRx: -0.95 };
  } else if (acc === 'Caminando') {
    cfg.torsoRx = 0.08;
    cfg.armL = { rx: -0.45, ry: 0, rz: -0.12, elbowRx: -0.35 };
    cfg.armR = { rx: 0.45, ry: 0, rz: 0.12, elbowRx: -0.22 };
    cfg.legL = { rx: 0.42, rz: -0.04, kneeRx: 0.25 };
    cfg.legR = { rx: -0.42, rz: 0.04, kneeRx: 0.18 };
  } else if (acc === 'De perfil caminando') {
    cfg.torsoRy = 0.92; cfg.torsoRx = 0.08; cfg.headRy = -0.14;
    cfg.armL = { rx: -0.52, ry: 0, rz: -0.10, elbowRx: -0.35 };
    cfg.armR = { rx: 0.52, ry: 0, rz: 0.10, elbowRx: -0.25 };
    cfg.legL = { rx: 0.48, rz: -0.03, kneeRx: 0.28 };
    cfg.legR = { rx: -0.48, rz: 0.03, kneeRx: 0.20 };
  } else if (acc === 'Corriendo') {
    cfg.bodyY = 0.08; cfg.torsoRx = 0.26; cfg.headRx = -0.16;
    cfg.armL = { rx: -0.95, ry: 0, rz: -0.15, elbowRx: -1.1 };
    cfg.armR = { rx: 0.85, ry: 0, rz: 0.15, elbowRx: -0.95 };
    cfg.legL = { rx: 0.78, rz: -0.05, kneeRx: 0.95 };
    cfg.legR = { rx: -0.82, rz: 0.05, kneeRx: 0.45 };
  } else if (acc === 'De puntillas alcanzando algo') {
    cfg.bodyY = 0.12; cfg.torsoRx = -0.06; cfg.headRx = -0.26;
    cfg.armR = { rx: -0.18, ry: 0, rz: 2.95, elbowRx: -0.05 };
    cfg.armL = { rx: 0.12, ry: 0, rz: -0.28, elbowRx: -0.22 };
    cfg.legL = { rx: 0.08, rz: -0.05, kneeRx: 0.04 };
    cfg.legR = { rx: 0.08, rz: 0.05, kneeRx: 0.04 };
  } else if (acc === 'Equilibrio en un pie') {
    cfg.torsoRz = -0.06;
    cfg.armL = { rx: -0.05, ry: 0, rz: -1.48, elbowRx: -0.08 };
    cfg.armR = { rx: -0.05, ry: 0, rz: 1.48, elbowRx: -0.08 };
    cfg.legL = { rx: 0, rz: -0.03, kneeRx: 0 };
    cfg.legR = { rx: -1.15, rz: 0.18, kneeRx: 1.48 };
  } else if (acc === 'Pose de yoga (árbol)') {
    cfg.headRx = -0.04;
    cfg.armL = { rx: -0.15, ry: 0.2, rz: -2.65, elbowRx: -0.65 };
    cfg.armR = { rx: -0.15, ry: -0.2, rz: 2.65, elbowRx: -0.65 };
    cfg.legL = { rx: 0, rz: -0.02, kneeRx: 0 };
    cfg.legR = { rx: -0.78, rz: 0.62, kneeRx: 1.65 };
  } else if (acc === 'Sentado' || acc === 'Sentado estudiando' || acc === 'Trabajando en laptop') {
    cfg.bodyY = -0.26;
    cfg.torsoRx = acc === 'Sentado' ? 0.04 : 0.14;
    cfg.headRx = acc === 'Sentado' ? 0 : 0.22;
    cfg.legL = { rx: -1.42, rz: -0.08, kneeRx: 1.42 };
    cfg.legR = { rx: -1.42, rz: 0.08, kneeRx: 1.42 };
    if (acc === 'Sentado') {
      cfg.armL = { rx: -0.45, ry: 0, rz: -0.14, elbowRx: -0.6 };
      cfg.armR = { rx: -0.45, ry: 0, rz: 0.14, elbowRx: -0.6 };
    } else {
      cfg.armL = { rx: -0.82, ry: 0.18, rz: -0.10, elbowRx: -0.78 };
      cfg.armR = { rx: -0.82, ry: -0.18, rz: 0.10, elbowRx: -0.78 };
    }
  } else if (acc === 'Sentado en el suelo / Meditando') {
    cfg.bodyY = -0.46; cfg.headRx = 0.05;
    cfg.legL = { rx: -1.35, rz: -0.78, kneeRx: 1.7 };
    cfg.legR = { rx: -1.35, rz: 0.78, kneeRx: 1.7 };
    cfg.armL = { rx: -0.38, ry: 0, rz: -0.42, elbowRx: -0.65 };
    cfg.armR = { rx: -0.38, ry: 0, rz: 0.42, elbowRx: -0.65 };
  } else if (acc === 'Arrodillado') {
    cfg.bodyY = -0.32; cfg.torsoRx = 0.08;
    cfg.legL = { rx: -1.2, rz: -0.1, kneeRx: 1.45 };
    cfg.legR = { rx: 0.2, rz: 0.1, kneeRx: 1.45 };
    cfg.armL = { rx: -0.3, ry: 0, rz: -0.16, elbowRx: -0.35 };
    cfg.armR = { rx: -0.3, ry: 0, rz: 0.16, elbowRx: -0.35 };
  } else if (acc === 'Agachado observando') {
    cfg.bodyY = -0.32; cfg.torsoRx = 0.45; cfg.headRx = -0.15;
    cfg.legL = { rx: -1.15, rz: -0.14, kneeRx: 1.65 };
    cfg.legR = { rx: -1.15, rz: 0.14, kneeRx: 1.65 };
    cfg.armL = { rx: -0.55, ry: 0, rz: -0.2, elbowRx: -0.45 };
    cfg.armR = { rx: -0.95, ry: 0, rz: 0.15, elbowRx: -0.35 };
  } else if (acc === 'Leyendo' || acc === 'Sosteniendo un libro / cuaderno') {
    cfg.headRx = 0.25;
    cfg.armL = { rx: -0.78, ry: 0.24, rz: 0.14, elbowRx: -0.82 };
    cfg.armR = { rx: -0.78, ry: -0.24, rz: -0.14, elbowRx: -0.82 };
  } else if (acc === 'Escribiendo') {
    cfg.torsoRx = 0.14; cfg.headRx = 0.24;
    cfg.armR = { rx: -0.92, ry: -0.22, rz: 0.06, elbowRx: -0.88 };
    cfg.armL = { rx: -0.76, ry: 0.26, rz: -0.06, elbowRx: -0.82 };
  } else if (acc === 'Pintando / Dibujando') {
    cfg.torsoRy = -0.18; cfg.headRy = 0.18;
    cfg.armR = { rx: -1.15, ry: -0.15, rz: 0.42, elbowRx: -0.62 };
    cfg.armL = { rx: -0.72, ry: 0.18, rz: -0.24, elbowRx: -0.85 };
  } else if (acc === 'Bailando') {
    cfg.torsoRz = 0.12; cfg.headRz = -0.14;
    cfg.armL = { rx: -0.35, ry: 0, rz: -2.25, elbowRx: -0.45 };
    cfg.armR = { rx: -0.2, ry: 0, rz: 1.15, elbowRx: -0.65 };
    cfg.legL = { rx: -0.2, rz: -0.18, kneeRx: 0.35 };
    cfg.legR = { rx: 0.25, rz: 0.22, kneeRx: 0.45 };
  } else if (acc === 'Abrazando' || acc === 'Brazos abiertos') {
    cfg.armL = { rx: -0.65, ry: -0.3, rz: -1.15, elbowRx: -0.35 };
    cfg.armR = { rx: -0.65, ry: 0.3, rz: 1.15, elbowRx: -0.35 };
  } else if (acc === 'Estirándose') {
    cfg.bodyY = 0.05; cfg.torsoRx = -0.1; cfg.headRx = -0.18;
    cfg.armL = { rx: -0.2, ry: 0, rz: -2.85, elbowRx: -0.12 };
    cfg.armR = { rx: -0.2, ry: 0, rz: 2.85, elbowRx: -0.12 };
  } else if (acc === 'Pose de superhéroe') {
    cfg.torsoRx = -0.06; cfg.headRy = -0.12;
    cfg.armL = { rx: -0.12, ry: 0, rz: -0.82, elbowRx: -1.25 };
    cfg.armR = { rx: -0.12, ry: 0, rz: 0.82, elbowRx: -1.25 };
    cfg.legL = { rx: -0.05, rz: -0.24, kneeRx: 0.05 };
    cfg.legR = { rx: 0.05, rz: 0.24, kneeRx: 0.05 };
  } else if (acc === 'Haciendo sentadillas / Ejercicio') {
    cfg.bodyY = -0.22; cfg.torsoRx = 0.20;
    cfg.armL = { rx: -1.42, ry: 0, rz: -0.12, elbowRx: -0.08 };
    cfg.armR = { rx: -1.42, ry: 0, rz: 0.12, elbowRx: -0.08 };
    cfg.legL = { rx: -0.82, rz: -0.22, kneeRx: 1.15 };
    cfg.legR = { rx: -0.82, rz: 0.22, kneeRx: 1.15 };
  } else if (acc === 'Haciendo deporte con pesas' || acc === 'Haciendo deporte / Ejercicio') {
    cfg.bodyY = -0.10; cfg.torsoRx = 0.08;
    cfg.armL = { rx: -0.55, ry: 0, rz: -0.45, elbowRx: -1.45 };
    cfg.armR = { rx: -0.55, ry: 0, rz: 0.45, elbowRx: -1.45 };
    cfg.legL = { rx: -0.35, rz: -0.22, kneeRx: 0.55 };
    cfg.legR = { rx: -0.35, rz: 0.22, kneeRx: 0.55 };
  } else if (acc === 'Tocando un instrumento') {
    cfg.headRz = 0.08;
    cfg.armL = { rx: -0.95, ry: 0.15, rz: -0.42, elbowRx: -0.68 };
    cfg.armR = { rx: -0.78, ry: -0.35, rz: -0.15, elbowRx: -0.95 };
  } else if (acc === 'Cantando con micrófono') {
    cfg.headRz = 0.08; cfg.headRx = -0.06;
    cfg.armR = { rx: -1.28, ry: -0.25, rz: 0.12, elbowRx: -1.15 };
    cfg.armL = { rx: -0.28, ry: 0, rz: -0.45, elbowRx: -0.42 };
  } else if (acc === 'Tomando una foto') {
    cfg.headRz = 0.06;
    cfg.armL = { rx: -1.35, ry: 0.36, rz: 0.16, elbowRx: -1.18 };
    cfg.armR = { rx: -1.35, ry: -0.36, rz: -0.16, elbowRx: -1.18 };
  } else if (acc === 'Usando teléfono celular') {
    cfg.headRx = 0.28;
    cfg.armR = { rx: -0.95, ry: -0.24, rz: 0.08, elbowRx: -0.98 };
    cfg.armL = { rx: -0.25, ry: 0, rz: -0.18, elbowRx: -0.35 };
  } else if (acc === 'Llevando una taza caliente') {
    cfg.headRx = 0.06;
    cfg.armR = { rx: -0.88, ry: -0.12, rz: 0.16, elbowRx: -0.88 };
    cfg.armL = { rx: 0.05, ry: 0, rz: -0.16, elbowRx: -0.18 };
  } else if (acc === 'Sosteniendo un paraguas') {
    cfg.headRz = -0.05;
    cfg.armR = { rx: -0.92, ry: 0, rz: 0.24, elbowRx: -0.78 };
    cfg.armL = { rx: 0.08, ry: 0, rz: -0.18, elbowRx: -0.18 };
  } else if (acc === 'Mirando hacia arriba / Soñando') {
    cfg.headRx = -0.38; cfg.torsoRx = -0.06;
    cfg.armL = { rx: 0.1, ry: 0, rz: -0.22, elbowRx: -0.2 };
    cfg.armR = { rx: 0.1, ry: 0, rz: 0.22, elbowRx: -0.2 };
  } else if (acc === 'Mirando por encima del hombro') {
    cfg.torsoRy = 0.65; cfg.headRy = -0.68;
    cfg.armL = { rx: 0.1, ry: 0, rz: -0.18, elbowRx: -0.15 };
    cfg.armR = { rx: -0.15, ry: 0, rz: 0.22, elbowRx: -0.25 };
  } else if (acc === 'Haciendo pulgar arriba / OK') {
    cfg.armR = { rx: -1.05, ry: 0, rz: 0.35, elbowRx: -0.85 };
  } else if (acc === 'Haciendo reverencia / Saludando con respeto') {
    cfg.torsoRx = 0.55; cfg.headRx = 0.22;
    cfg.armL = { rx: -0.15, ry: 0, rz: -0.08, elbowRx: -0.2 };
    cfg.armR = { rx: -0.15, ry: 0, rz: 0.08, elbowRx: -0.2 };
  } else if (acc === 'Cocinando / Preparando algo') {
    cfg.torsoRx = 0.14; cfg.headRx = 0.18;
    cfg.armL = { rx: -0.78, ry: 0.15, rz: -0.16, elbowRx: -0.72 };
    cfg.armR = { rx: -0.92, ry: -0.15, rz: 0.18, elbowRx: -0.75 };
  } else if (acc === 'Regando plantas / Jardinería') {
    cfg.torsoRx = 0.22; cfg.headRx = 0.22;
    cfg.armL = { rx: -0.25, ry: 0, rz: -0.25, elbowRx: -0.35 };
    cfg.armR = { rx: -0.95, ry: -0.12, rz: 0.18, elbowRx: -0.45 };
  } else if (acc === 'Explorando con lupa') {
    cfg.torsoRx = 0.18; cfg.headRx = 0.12;
    cfg.armR = { rx: -1.32, ry: -0.22, rz: 0.10, elbowRx: -0.92 };
    cfg.armL = { rx: 0.22, ry: 0, rz: -0.24, elbowRx: -0.35 };
  } else if (acc === 'Acostado descansando') {
    cfg.bodyY = -0.55; cfg.torsoRx = -1.25; cfg.headRx = 0.45;
    cfg.armL = { rx: -0.2, ry: 0, rz: -0.5, elbowRx: -0.4 };
    cfg.armR = { rx: -0.2, ry: 0, rz: 0.5, elbowRx: -0.4 };
    cfg.legL = { rx: 0.15, rz: -0.12, kneeRx: 0.25 };
    cfg.legR = { rx: -0.1, rz: 0.12, kneeRx: 0.5 };
  } else if (acc === 'Volando / Flotando') {
    cfg.bodyY = 0.42; cfg.torsoRx = 0.35; cfg.headRx = -0.25;
    cfg.armL = { rx: -0.3, ry: 0, rz: -1.45, elbowRx: -0.15 };
    cfg.armR = { rx: -0.3, ry: 0, rz: 1.45, elbowRx: -0.15 };
    cfg.legL = { rx: 0.32, rz: -0.12, kneeRx: 0.35 };
    cfg.legR = { rx: 0.12, rz: 0.12, kneeRx: 0.55 };
  } else if (c.chkObjetoMano) {
    cfg.armR = { rx: -0.75, ry: 0, rz: 0.22, elbowRx: -0.55 };
  } else if (em === 'Alegre' || em === 'Entusiasmado') {
    cfg.armL = { rx: -0.25, ry: 0, rz: -0.52, elbowRx: -0.3 };
    cfg.armR = { rx: -0.25, ry: 0, rz: 0.52, elbowRx: -0.3 };
  } else if (em === 'Sorprendido' || em === 'Asustado') {
    cfg.armL = { rx: -0.65, ry: 0, rz: -0.42, elbowRx: -0.65 };
    cfg.armR = { rx: -0.65, ry: 0, rz: 0.42, elbowRx: -0.65 };
  } else if (em === 'Triste' || em === 'Llorando') {
    cfg.headRx = 0.2; cfg.torsoRx = 0.1;
  }

  return cfg;
}

/**
 * Crea automáticamente modelos 3D completos para TODAS las 16 posturas "Con objetos".
 */
function addPostureSceneProps(rig, c, darkMat, whiteMat) {
  const acc = c.accionTipo || '';
  if (!isPostureWithObject(acc)) return;

  const dMat = darkMat || new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.35 });
  const wMat = whiteMat || new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.22 });
  const woodMat = new THREE.MeshStandardMaterial({ color: 0xB45309, roughness: 0.62 });
  const woodDarkMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.65 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, roughness: 0.25, metalness: 0.72 });

  const sceneRoot = rig.sceneRoot || rig.root;
  const torso = rig.torso || rig.root;
  const handL = rig.handL || (rig.armL && rig.armL.userData && rig.armL.userData.hand);
  const handR = rig.handR || (rig.armR && rig.armR.userData && rig.armR.userData.hand);
  const sh = rig.sh || 1.0;
  const hipY = rig.hipY || 0.72;
  const torsoH = rig.torsoH || 0.70;

  const makeChairAndDesk = (withLaptop) => {
    const furn = new THREE.Group();
    const seatY = Math.max(0.24, hipY - 0.30);
    // Silla de madera debajo del personaje
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.06, 0.50), woodMat);
    seat.position.set(0, seatY, -0.06);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.48 * sh, 0.055), woodMat);
    back.position.set(0, seatY + 0.26 * sh, -0.29);
    furn.add(seat, back);
    [[-0.23, -0.26], [0.23, -0.26], [-0.23, 0.15], [0.23, 0.15]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.022, seatY, 10), woodDarkMat);
      leg.position.set(lx, seatY * 0.5, lz);
      furn.add(leg);
    });

    // Escritorio frente al personaje
    const deskY = seatY + 0.24 * sh;
    const deskZ = 0.62;
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.065, 0.58), woodMat);
    top.position.set(0, deskY, deskZ);
    furn.add(top);
    [[-0.48, deskZ - 0.22], [0.48, deskZ - 0.22], [-0.48, deskZ + 0.22], [0.48, deskZ + 0.22]].forEach(([dx, dz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.026, deskY, 10), woodDarkMat);
      leg.position.set(dx, deskY * 0.5, dz);
      furn.add(leg);
    });

    if (withLaptop) {
      const lap = new THREE.Group();
      lap.position.set(0, deskY + 0.045, deskZ - 0.02);
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.024, 0.28), metalMat);
      const keys = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.027, 0.18), dMat);
      keys.position.set(0, 0.002, -0.02);
      const lidGrp = new THREE.Group();
      lidGrp.position.set(0, 0.012, 0.13);
      lidGrp.rotation.x = 0.26;
      const lid = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.02), metalMat);
      lid.position.set(0, 0.14, 0);
      const screen = new THREE.Mesh(
        new THREE.BoxGeometry(0.37, 0.23, 0.023),
        new THREE.MeshStandardMaterial({ color: 0x38BDF8, emissive: 0x0284C7, emissiveIntensity: 0.45, roughness: 0.18 })
      );
      screen.position.set(0, 0.14, -0.002);
      lidGrp.add(lid, screen);
      lap.add(base, keys, lidGrp);
      furn.add(lap);
    } else {
      // Libro abierto + lápiz sobre el escritorio
      const bookGrp = new THREE.Group();
      bookGrp.position.set(-0.04, deskY + 0.045, deskZ - 0.02);
      const covMat = new THREE.MeshStandardMaterial({ color: 0x2563EB, roughness: 0.45 });
      const covL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.022, 0.28), covMat);
      covL.position.x = -0.11; covL.rotation.z = -0.08;
      const covR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.022, 0.28), covMat);
      covR.position.x = 0.11; covR.rotation.z = 0.08;
      const pagL = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.022, 0.25), wMat);
      pagL.position.set(-0.105, 0.012, 0); pagL.rotation.z = -0.08;
      const pagR = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.022, 0.25), wMat);
      pagR.position.set(0.105, 0.012, 0); pagR.rotation.z = 0.08;
      bookGrp.add(covL, covR, pagL, pagR);

      const pencil = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.26, 8), new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.4 }));
      pencil.rotation.z = Math.PI / 2; pencil.rotation.y = 0.35;
      pencil.position.set(0.28, deskY + 0.045, deskZ - 0.02);
      furn.add(bookGrp, pencil);
    }
    sceneRoot.add(furn);
  };

  if (acc === 'Sentado estudiando') {
    makeChairAndDesk(false);
  } else if (acc === 'Trabajando en laptop') {
    makeChairAndDesk(true);
  } else if (acc === 'Leyendo') {
    const book = new THREE.Group();
    book.position.set(0, torsoH * 0.52, 0.40);
    book.rotation.x = -0.45;
    const covMat = new THREE.MeshStandardMaterial({ color: 0x2563EB, roughness: 0.45 });
    const covL = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.27, 0.022), covMat);
    covL.position.set(-0.098, 0, 0); covL.rotation.y = 0.36;
    const covR = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.27, 0.022), covMat);
    covR.position.set(0.098, 0, 0); covR.rotation.y = -0.36;
    const pagL = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.24, 0.02), wMat);
    pagL.position.set(-0.092, 0, 0.014); pagL.rotation.y = 0.36;
    const pagR = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.24, 0.02), wMat);
    pagR.position.set(0.092, 0, 0.014); pagR.rotation.y = -0.36;
    book.add(covL, covR, pagL, pagR);
    torso.add(book);
  } else if (acc === 'Escribiendo') {
    const nb = new THREE.Group();
    nb.position.set(-0.06, torsoH * 0.44, 0.40);
    nb.rotation.set(-0.72, 0.16, 0);
    const cover = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.34, 0.024), new THREE.MeshStandardMaterial({ color: 0x0EA5E9, roughness: 0.48 }));
    const paper = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.30, 0.028), wMat);
    nb.add(cover, paper);
    torso.add(nb);
    if (handR) {
      const pGrp = new THREE.Group();
      pGrp.position.set(0, -0.06, 0.06);
      pGrp.rotation.set(0.6, 0, -0.4);
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.28, 8), new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.4 }));
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.045, 8), dMat);
      tip.position.y = -0.16; tip.rotation.x = Math.PI;
      const eraser = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.032, 8), new THREE.MeshStandardMaterial({ color: 0xFB7185 }));
      eraser.position.y = 0.15;
      pGrp.add(shaft, tip, eraser);
      handR.add(pGrp);
    }
  } else if (acc === 'Explicando frente a la clase') {
    // Pizarra escolar verde grande con marco de madera + puntero en la mano derecha
    const boardGrp = new THREE.Group();
    boardGrp.position.set(-0.62, 0, -0.68);
    boardGrp.rotation.y = 0.26;
    const frameW = 1.45, frameH = 0.96;
    const boardY = Math.max(1.05, hipY + torsoH * 0.72);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(frameW + 0.10, frameH + 0.10, 0.06), woodMat);
    frame.position.y = boardY;
    const slate = new THREE.Mesh(new THREE.BoxGeometry(frameW, frameH, 0.072), new THREE.MeshStandardMaterial({ color: 0x065F46, roughness: 0.78 }));
    slate.position.y = boardY;
    const ledge = new THREE.Mesh(new THREE.BoxGeometry(frameW + 0.08, 0.04, 0.12), woodDarkMat);
    ledge.position.set(0, boardY - frameH * 0.5 - 0.04, 0.05);
    const chalk = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.10, 8), wMat);
    chalk.rotation.z = Math.PI / 2;
    chalk.position.set(-0.22, boardY - frameH * 0.5 - 0.01, 0.07);
    const line1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.022, 0.008), wMat);
    line1.position.set(-0.18, boardY + 0.22, 0.04);
    const line2 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.022, 0.008), wMat);
    line2.position.set(-0.28, boardY + 0.08, 0.04);
    const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, boardY + 0.1, 10), woodDarkMat);
    legL.position.set(-frameW * 0.42, (boardY + 0.1) * 0.5, 0);
    const legR = legL.clone();
    legR.position.x = frameW * 0.42;
    boardGrp.add(frame, slate, ledge, chalk, line1, line2, legL, legR);
    sceneRoot.add(boardGrp);

    if (handR) {
      const ptr = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.014, 0.64, 8), woodMat);
      ptr.position.set(0, -0.32, 0.04);
      handR.add(ptr);
    }
  } else if (acc === 'Explorando con lupa') {
    if (handR) {
      const lupa = new THREE.Group();
      lupa.position.set(0, -0.06, 0.12);
      lupa.rotation.x = -0.35;
      const rimMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.25, metalness: 0.72 });
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.024, 0.22, 10), dMat);
      handle.position.y = -0.10;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.020, 10, 24), rimMat);
      ring.position.y = 0.11;
      const glass = new THREE.Mesh(
        new THREE.CylinderGeometry(0.105, 0.105, 0.016, 20),
        new THREE.MeshPhysicalMaterial({ color: 0xBAE6FD, transparent: true, opacity: 0.52, roughness: 0.05 })
      );
      glass.rotation.x = Math.PI / 2; glass.position.y = 0.11;
      lupa.add(handle, ring, glass);
      handR.add(lupa);
    }
  } else if (acc === 'Pintando / Dibujando') {
    // Caballete de artista con lienzo pintado + paleta en mano izq + pincel en mano der
    const easel = new THREE.Group();
    easel.position.set(0.66, 0, 0.42);
    easel.rotation.y = -0.52;
    const h = Math.max(1.15, hipY + torsoH * 0.85);
    const legF1 = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, h * 1.15, 8), woodMat);
    legF1.position.set(-0.24, h * 0.55, 0.06); legF1.rotation.z = -0.12;
    const legF2 = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, h * 1.15, 8), woodMat);
    legF2.position.set(0.24, h * 0.55, 0.06); legF2.rotation.z = 0.12;
    const legB = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, h * 1.15, 8), woodDarkMat);
    legB.position.set(0, h * 0.55, -0.26); legB.rotation.x = -0.28;
    const canvas = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.74, 0.036), wMat);
    canvas.position.set(0, h * 0.68, 0.10); canvas.rotation.x = -0.10;
    const skyP = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.30, 0.040), new THREE.MeshStandardMaterial({ color: 0x38BDF8, roughness: 0.6 }));
    skyP.position.set(0, h * 0.68 + 0.16, 0.102); skyP.rotation.x = -0.10;
    const hillP = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.24, 0.040), new THREE.MeshStandardMaterial({ color: 0x22C55E, roughness: 0.6 }));
    hillP.position.set(0, h * 0.68 - 0.14, 0.102); hillP.rotation.x = -0.10;
    const sunP = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 10), new THREE.MeshStandardMaterial({ color: 0xFACC15, roughness: 0.4 }));
    sunP.scale.set(1, 1, 0.25); sunP.position.set(0.14, h * 0.68 + 0.18, 0.12);
    easel.add(legF1, legF2, legB, canvas, skyP, hillP, sunP);
    sceneRoot.add(easel);

    if (handL) {
      const pal = new THREE.Group();
      pal.position.set(0, -0.05, 0.08);
      const board = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.018, 18), woodMat);
      board.scale.set(1.15, 1, 0.85);
      pal.add(board);
      [0xEF4444, 0x3B82F6, 0xFACC15, 0x22C55E].forEach((col, i) => {
        const a = (i / 4) * Math.PI * 1.4 - 0.5;
        const dab = new THREE.Mesh(new THREE.SphereGeometry(0.026, 8, 8), new THREE.MeshStandardMaterial({ color: col, roughness: 0.35 }));
        dab.scale.set(1, 0.45, 1);
        dab.position.set(Math.cos(a) * 0.095, 0.014, Math.sin(a) * 0.075);
        pal.add(dab);
      });
      handL.add(pal);
    }
    if (handR) {
      const brush = new THREE.Group();
      brush.position.set(0, -0.06, 0.08);
      brush.rotation.x = Math.PI * 0.42;
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.015, 0.30, 8), new THREE.MeshStandardMaterial({ color: 0xDC2626, roughness: 0.4 }));
      const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.012, 0.04, 8), metalMat);
      ferrule.position.y = 0.16;
      const bristle = new THREE.Mesh(new THREE.ConeGeometry(0.018, 0.055, 8), new THREE.MeshStandardMaterial({ color: 0x2563EB, roughness: 0.5 }));
      bristle.position.y = 0.205;
      brush.add(stick, ferrule, bristle);
      handR.add(brush);
    }
  } else if (acc === 'Tomando una foto') {
    const cam = new THREE.Group();
    cam.position.set(0, torsoH + 0.26 * sh, 0.38);
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.17, 0.12), dMat);
    const prism = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.05, 0.10), dMat);
    prism.position.y = 0.105;
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.062, 0.068, 0.12, 18), new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.25, metalness: 0.5 }));
    lens.rotation.x = Math.PI / 2; lens.position.z = 0.095;
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.050, 0.050, 0.02, 16), new THREE.MeshPhysicalMaterial({ color: 0x38BDF8, roughness: 0.05, metalness: 0.2 }));
    glass.rotation.x = Math.PI / 2; glass.position.z = 0.15;
    const flash = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.028, 0.02), wMat);
    flash.position.set(0.09, 0.05, 0.065);
    cam.add(body, prism, lens, glass, flash);
    torso.add(cam);
  } else if (acc === 'Tocando un instrumento') {
    // Guitarra acústica 3D completa cruzada frente al torso
    const guitar = new THREE.Group();
    guitar.position.set(0.04, torsoH * 0.42, 0.26);
    guitar.rotation.set(0.08, 0.12, 0.52);
    const gBodyMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.42 });
    const boutBot = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.08, 20), gBodyMat);
    boutBot.rotation.x = Math.PI / 2; boutBot.position.y = -0.10;
    const boutTop = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.08, 20), gBodyMat);
    boutTop.rotation.x = Math.PI / 2; boutTop.position.y = 0.10;
    const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.058, 0.086, 16), dMat);
    hole.rotation.x = Math.PI / 2; hole.position.y = 0.04;
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.025, 0.09), woodDarkMat);
    bridge.position.y = -0.10;
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.54, 0.032), woodDarkMat);
    neck.position.set(0, 0.44, 0.01);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.082, 0.13, 0.032), woodDarkMat);
    head.position.set(0, 0.74, 0.01);
    guitar.add(boutBot, boutTop, hole, bridge, neck, head);
    torso.add(guitar);
  } else if (acc === 'Cantando con micrófono') {
    if (handR) {
      const mic = new THREE.Group();
      mic.position.set(0, -0.05, 0.08);
      mic.rotation.x = 0.35;
      const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.018, 0.22, 12), dMat);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.032, 0.008, 8, 16), new THREE.MeshStandardMaterial({ color: 0x38BDF8, roughness: 0.25 }));
      ring.rotation.x = Math.PI / 2; ring.position.y = 0.125;
      const meshBall = new THREE.Mesh(new THREE.SphereGeometry(0.052, 14, 12), metalMat);
      meshBall.position.y = 0.165;
      mic.add(grip, ring, meshBall);
      handR.add(mic);
    }
  } else if (acc === 'Cocinando / Preparando algo') {
    if (handL) {
      const pan = new THREE.Group();
      pan.position.set(0, -0.05, 0.22);
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.020, 0.24, 10), dMat);
      handle.rotation.x = Math.PI / 2; handle.position.z = -0.10;
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.15, 0.055, 20), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.35, metalness: 0.55 }));
      body.position.z = 0.14;
      const eggW = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.015, 14), wMat);
      eggW.position.set(0, 0.03, 0.14);
      const yolk = new THREE.Mesh(new THREE.SphereGeometry(0.034, 10, 10), new THREE.MeshStandardMaterial({ color: 0xFACC15, roughness: 0.25 }));
      yolk.scale.set(1, 0.55, 1); yolk.position.set(0, 0.042, 0.14);
      pan.add(handle, body, eggW, yolk);
      handL.add(pan);
    }
    if (handR) {
      const spoon = new THREE.Group();
      spoon.position.set(0, -0.05, 0.08);
      spoon.rotation.x = 0.45;
      const st = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.28, 8), woodMat);
      const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.042, 10, 8), woodMat);
      bowl.scale.set(0.85, 1.35, 0.35); bowl.position.y = 0.16;
      spoon.add(st, bowl);
      handR.add(spoon);
    }
  } else if (acc === 'Regando plantas / Jardinería') {
    if (handR) {
      const can = new THREE.Group();
      can.position.set(0, -0.08, 0.14);
      can.rotation.x = 0.35;
      const canMat = new THREE.MeshStandardMaterial({ color: 0x06B6D4, roughness: 0.38 });
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.115, 0.18, 16), canMat);
      const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.028, 0.24, 10), canMat);
      spout.position.set(0, 0.02, 0.16); spout.rotation.x = 1.05;
      const rose = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.018, 0.04, 12), metalMat);
      rose.position.set(0, 0.075, 0.26); rose.rotation.x = 1.05;
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.015, 8, 14, Math.PI * 1.25), canMat);
      handle.position.set(0, 0.05, -0.08); handle.rotation.y = Math.PI / 2;
      can.add(tank, spout, rose, handle);
      handR.add(can);
    }
    // Maceta con flor sobre el suelo frente al personaje
    const potGrp = new THREE.Group();
    potGrp.position.set(0.32, 0, 0.62);
    const potMat = new THREE.MeshStandardMaterial({ color: 0xC2410C, roughness: 0.72 });
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.11, 0.22, 16), potMat);
    pot.position.y = 0.11;
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.155, 0.04, 16), potMat);
    rim.position.y = 0.22;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.018, 0.26, 8), new THREE.MeshStandardMaterial({ color: 0x16A34A, roughness: 0.5 }));
    stem.position.y = 0.34;
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x22C55E, roughness: 0.45 });
    [-1, 1].forEach(s => {
      const lf = new THREE.Mesh(new THREE.SphereGeometry(0.068, 10, 8), leafMat);
      lf.scale.set(1.3, 0.45, 0.65); lf.position.set(s * 0.07, 0.32, 0); lf.rotation.z = s * 0.45;
      potGrp.add(lf);
    });
    const center = new THREE.Mesh(new THREE.SphereGeometry(0.042, 10, 10), new THREE.MeshStandardMaterial({ color: 0xFACC15, roughness: 0.3 }));
    center.position.y = 0.48;
    const petalMat = new THREE.MeshStandardMaterial({ color: 0xEC4899, roughness: 0.4 });
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const pet = new THREE.Mesh(new THREE.SphereGeometry(0.036, 8, 8), petalMat);
      pet.position.set(Math.cos(a) * 0.055, 0.48, Math.sin(a) * 0.055);
      potGrp.add(pet);
    }
    potGrp.add(pot, rim, stem, center);
    sceneRoot.add(potGrp);
  } else if (acc === 'Haciendo deporte con pesas') {
    const makeDumbbell = () => {
      const db = new THREE.Group();
      db.position.set(0, -0.05, 0.03);
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.34, 10), metalMat);
      bar.rotation.z = Math.PI / 2;
      const plateMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.35, metalness: 0.45 });
      [-0.13, -0.095, 0.095, 0.13].forEach((px, idx) => {
        const r = (idx === 0 || idx === 3) ? 0.068 : 0.082;
        const pl = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.026, 16), plateMat);
        pl.rotation.z = Math.PI / 2; pl.position.x = px;
        db.add(pl);
      });
      db.add(bar);
      return db;
    };
    if (handL) handL.add(makeDumbbell());
    if (handR) handR.add(makeDumbbell());
  } else if (acc === 'Usando teléfono celular') {
    if (handR) {
      const phone = new THREE.Group();
      phone.position.set(-0.02, -0.05, 0.07);
      phone.rotation.set(-0.45, -0.25, 0);
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.20, 0.016), dMat);
      const screen = new THREE.Mesh(
        new THREE.BoxGeometry(0.095, 0.175, 0.019),
        new THREE.MeshStandardMaterial({ color: 0x38BDF8, emissive: 0x0EA5E9, emissiveIntensity: 0.45, roughness: 0.15 })
      );
      phone.add(body, screen);
      handR.add(phone);
    }
  } else if (acc === 'Llevando una taza caliente') {
    if (handR) {
      const mug = new THREE.Group();
      mug.position.set(0, -0.04, 0.09);
      mug.rotation.x = 0.72;
      const mugMat = new THREE.MeshStandardMaterial({ color: 0xF43F5E, roughness: 0.32 });
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.058, 0.13, 16), mugMat);
      const coffee = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.056, 0.01, 14), woodDarkMat);
      coffee.position.y = 0.058;
      const hdl = new THREE.Mesh(new THREE.TorusGeometry(0.040, 0.011, 8, 14), mugMat);
      hdl.position.set(0.068, 0, 0);
      const steamMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.65, roughness: 0.8 });
      for (let i = 0; i < 3; i++) {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(0.020 + i * 0.006, 8, 8), steamMat);
        puff.position.set((i % 2 ? 0.015 : -0.015), 0.11 + i * 0.048, 0);
        mug.add(puff);
      }
      mug.add(cup, coffee, hdl);
      handR.add(mug);
    }
  } else if (acc === 'Sosteniendo un paraguas') {
    if (handR) {
      const umb = new THREE.Group();
      umb.position.set(0, -0.04, 0.05);
      umb.rotation.x = 1.55;
      const shaftLen = 1.15 * sh;
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, shaftLen, 10), metalMat);
      shaft.position.y = shaftLen * 0.5;
      const hook = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.014, 8, 14, Math.PI), woodDarkMat);
      hook.rotation.z = Math.PI; hook.position.set(0.045, -0.01, 0);
      const canopyMat = new THREE.MeshStandardMaterial({ color: 0x4F46E5, roughness: 0.42, side: THREE.DoubleSide });
      const canopy = new THREE.Mesh(
        new THREE.SphereGeometry(0.72, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.46),
        canopyMat
      );
      canopy.scale.set(1, 0.56, 1);
      canopy.position.y = shaftLen - 0.18;
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.10, 10), metalMat);
      tip.position.y = shaftLen + 0.24;
      umb.add(shaft, hook, canopy, tip);
      handR.add(umb);
    }
  }
}

function applyArmPose(armGrp, side, c) {
  const cfg = getPostureRigConfig(c);
  const a = side === -1 ? cfg.armL : cfg.armR;
  armGrp.rotation.set(a.rx, a.ry, a.rz);
  if (armGrp.userData && armGrp.userData.forearm) {
    armGrp.userData.forearm.rotation.x = a.elbowRx;
  }
}

function applyBodyRigPose(rig, c, darkMat, whiteMat) {
  const cfg = getPostureRigConfig(c);
  if (rig.root) rig.root.position.y = (rig.baseY || 0) + cfg.bodyY;
  if (rig.torso) rig.torso.rotation.set(cfg.torsoRx, cfg.torsoRy, cfg.torsoRz);
  if (rig.head) rig.head.rotation.set(cfg.headRx, cfg.headRy, cfg.headRz);
  if (rig.armL) {
    rig.armL.rotation.set(cfg.armL.rx, cfg.armL.ry, cfg.armL.rz);
    if (rig.armL.userData && rig.armL.userData.forearm) rig.armL.userData.forearm.rotation.x = cfg.armL.elbowRx;
  }
  if (rig.armR) {
    rig.armR.rotation.set(cfg.armR.rx, cfg.armR.ry, cfg.armR.rz);
    if (rig.armR.userData && rig.armR.userData.forearm) rig.armR.userData.forearm.rotation.x = cfg.armR.elbowRx;
  }
  if (rig.legL) {
    rig.legL.rotation.set(cfg.legL.rx, 0, cfg.legL.rz);
    if (rig.legL.userData && rig.legL.userData.shin) rig.legL.userData.shin.rotation.x = cfg.legL.kneeRx;
  }
  if (rig.legR) {
    rig.legR.rotation.set(cfg.legR.rx, 0, cfg.legR.rz);
    if (rig.legR.userData && rig.legR.userData.shin) rig.legR.userData.shin.rotation.x = cfg.legR.kneeRx;
  }
  addPostureSceneProps(rig, c, darkMat, whiteMat);
}

function addDetailedHandProp(handGrp, c, darkMat, whiteMat) {
  if (!c.chkObjetoMano || isNoneVal(c.objetoManoItem)) return;
  const objTxt = (c.objetoManoItem || '').toLowerCase();
  const prop = new THREE.Group();
  prop.position.set(0, -0.04, 0.14);

  if (objTxt.includes('libro')) {
    const covMat = new THREE.MeshStandardMaterial({ color: 0x2563EB, roughness: 0.45 });
    const covL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.21, 0.02), covMat);
    covL.position.set(-0.075, 0, 0); covL.rotation.y = 0.28;
    const covR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.21, 0.02), covMat);
    covR.position.set(0.075, 0, 0); covR.rotation.y = -0.28;
    const pagL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.19, 0.018), whiteMat);
    pagL.position.set(-0.07, 0, 0.014); pagL.rotation.y = 0.28;
    const pagR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.19, 0.018), whiteMat);
    pagR.position.set(0.07, 0, 0.014); pagR.rotation.y = -0.28;
    prop.add(covL, covR, pagL, pagR);
  } else if (objTxt.includes('lupa')) {
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.3, metalness: 0.65 });
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.18, 10), darkMat);
    handle.position.set(0, -0.09, 0);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.088, 0.016, 10, 20), rimMat);
    ring.position.set(0, 0.08, 0);
    const glass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.012, 18),
      new THREE.MeshPhysicalMaterial({ color: 0xBAE6FD, transparent: true, opacity: 0.55, roughness: 0.05 })
    );
    glass.rotation.x = Math.PI / 2; glass.position.set(0, 0.08, 0);
    prop.add(handle, ring, glass);
  } else if (objTxt.includes('planta')) {
    const potMat = new THREE.MeshStandardMaterial({ color: 0xC2410C, roughness: 0.72 });
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.06, 0.12, 14), potMat);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.088, 0.024, 14), potMat);
    rim.position.y = 0.055;
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x16A34A, roughness: 0.45 });
    for (let i = 0; i < 4; i++) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), leafMat);
      leaf.scale.set(0.65, 1.35, 0.25);
      const a = (i / 4) * Math.PI * 2;
      leaf.position.set(Math.cos(a) * 0.04, 0.12, Math.sin(a) * 0.04);
      leaf.rotation.set(0.35, a, 0.35);
      prop.add(leaf);
    }
    const flower = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 10), new THREE.MeshStandardMaterial({ color: 0xFACC15, roughness: 0.3 }));
    flower.position.y = 0.16;
    prop.add(pot, rim, flower);
  } else if (objTxt.includes('tablet')) {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.17, 0.02), darkMat);
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(0.21, 0.14, 0.023),
      new THREE.MeshStandardMaterial({ color: 0x38BDF8, emissive: 0x0284C7, emissiveIntensity: 0.35, roughness: 0.2 })
    );
    prop.add(body, screen);
  } else if (objTxt.includes('lápiz') || objTxt.includes('pincel')) {
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.32, 8), new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.4 }));
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.015, 0.05, 8), new THREE.MeshStandardMaterial({ color: 0x1E293B }));
    tip.position.y = 0.185;
    const eraser = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.03, 8), new THREE.MeshStandardMaterial({ color: 0xFB7185 }));
    eraser.position.y = -0.17;
    prop.add(shaft, tip, eraser);
    prop.rotation.z = -0.35;
  } else {
    const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.08, 1), new THREE.MeshStandardMaterial({ color: 0x6366F1, roughness: 0.28, metalness: 0.25 }));
    prop.add(orb);
  }

  handGrp.add(prop);
}

function buildGeneric3D(c) {
  const g = new THREE.Group();
  const skinHex = (c.cat === 'Persona' && c.chkPiel)
    ? (c.pielTono === 'Otro' ? hexToInt(c.pielTonoHex, 0xD9A066) : (SKIN_TONES[c.pielTono] || 0xE2C7B0))
    : 0xE8C7AD;
  const bodyMat = new THREE.MeshStandardMaterial({ color: getSubjectMainHexInt(c, 0x94A3B8), roughness: 0.48, metalness: 0.04 });
  const skinMat = new THREE.MeshStandardMaterial({ color: skinHex, roughness: 0.52, metalness: 0.02 });
  const jointMat = new THREE.MeshStandardMaterial({ color: 0x64748B, roughness: 0.55 });
  const eyeCol = (c.cat === 'Persona' && c.chkOjos)
    ? (c.ojosColor === 'Otro' ? hexToInt(c.ojosColorHex, 0x0F172A) : (EYE_COLORS[c.ojosColor] || 0x1E293B))
    : 0x1E293B;
  const eyeMat = new THREE.MeshStandardMaterial({ color: eyeCol, roughness: 0.16, metalness: 0.08 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.35 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2 });
  const ropaItems = c.ropaList || [];
  const ropaAll = ropaItems.map(formatRopaItemText).join(' ').toLowerCase();
  const findRopaColor = (keywords, fallback) => {
    for (let i = ropaItems.length - 1; i >= 0; i--) {
      const it = ropaItems[i];
      const txt = formatRopaItemText(it).toLowerCase();
      if (keywords.some(k => txt.includes(k))) {
        const hx = getRopaHex(it);
        if (hx) return hexToInt(hx, fallback);
      }
    }
    return fallback;
  };

  const ctx = {
    skinHex,
    bodyMat,
    skinMat,
    jointMat,
    eyeCol,
    eyeMat,
    darkMat,
    whiteMat,
    ropaItems,
    ropaAll,
    findRopaColor
  };

  g.add(createContactShadow(c.cat === 'Animal' && c.modoForma !== 'Antropomorfo' ? 0.72 : 0.62));

  if (c.cat === 'Persona') {
    buildPersona3D(g, c, ctx);
  } else if (c.cat === 'Animal' && c.modoForma === 'Antropomorfo') {
    buildAnimalAntropomorfo3D(g, c, ctx);
  } else if (c.cat === 'Animal') {
    buildAnimalNormal3D(g, c, ctx);
  } else {
    buildObjetoYPersonalizado3D(g, c, ctx);
  }

  return g;
}
