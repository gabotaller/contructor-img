/**
 * Modelos 3D Mejorados: Animales Normales (Cuadrúpedo, Bípedo, Con alas, Insecto y Ninguno)
 * Todos construidos con formas orgánicas esculpidas (LatheGeometry, TubeGeometry, cápsulas r128),
 * ojos con párpados y reacciones a emociones y posturas.
 */

function buildAnimalNormal3D(g, c, ctx) {
  const { eyeMat, darkMat, whiteMat, ropaAll, findRopaColor } = ctx;
  const sil = normalizeAnimalSilueta(c.animalSilueta);
  const acc = c.accionTipo || '';

  // --- 1. NINGUNO (Elegante emblema cristalino flotante sobre pedestal arquitectónico) ---
  if (sil === 'Ninguno') {
    const colHex = getSubjectMainHexInt(c, 0x6366F1);
    const gemMat = new THREE.MeshPhysicalMaterial({ color: colHex, roughness: 0.16, metalness: 0.15, clearcoat: 1.0 });
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, roughness: 0.3, metalness: 0.72 });
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.12, 28), ringMat);
    ped.position.y = 0.06;
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.46, 0), gemMat);
    gem.position.y = 0.92;
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.024, 12, 36), ringMat);
    orbit.position.y = 0.92; orbit.rotation.x = 1.15; orbit.rotation.y = 0.4;
    g.add(ped, gem, orbit);
    return;
  }

  // --- 2. BÍPEDO (Oso / Panda estilizado esculpido) ---
  if (sil === 'Bípedo') {
    const baseHex = getSubjectMainHexInt(c, 0xF8FAFC);
    const isPanda = !c.chkColorPrincipal || baseHex === 0xF8FAFC;
    const furMat = new THREE.MeshStandardMaterial({ color: baseHex, roughness: 0.68 });
    const accentMat = new THREE.MeshStandardMaterial({ color: isPanda ? 0x1E293B : 0x78350F, roughness: 0.65 });
    const bellyMat = new THREE.MeshStandardMaterial({ color: isPanda ? 0xFFFFFF : 0xFEF3C7, roughness: 0.72 });

    const root = new THREE.Group();
    g.add(root);

    const hipY = 0.46;
    const torsoGrp = new THREE.Group();
    torsoGrp.position.y = hipY;
    root.add(torsoGrp);

    // Sculpted pear-shaped bear torso
    const pts = [
      new THREE.Vector2(0.02, -0.08),
      new THREE.Vector2(0.32, 0.02),
      new THREE.Vector2(0.38, 0.24),
      new THREE.Vector2(0.34, 0.56),
      new THREE.Vector2(0.24, 0.78),
      new THREE.Vector2(0.08, 0.84)
    ];
    const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 24), furMat);
    body.scale.set(1.0, 1.0, 0.88);
    torsoGrp.add(body);

    // Belly & shoulder mantle
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 14), bellyMat);
    belly.scale.set(0.92, 1.12, 0.46);
    belly.position.set(0, 0.34, 0.22);
    const mantle = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.085, 12, 24), accentMat);
    mantle.rotation.x = Math.PI / 2;
    mantle.position.set(0, 0.68, 0);
    torsoGrp.add(belly, mantle);

    // Cute round fluffy tail
    const tail = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), accentMat);
    tail.position.set(0, 0.14, -0.34);
    torsoGrp.add(tail);

    // Articulated chunky legs with paw pads
    const makeBearLeg = (side) => {
      const legGrp = new THREE.Group();
      legGrp.position.set(side * 0.2, hipY + 0.02, 0);
      const limb = createCapsuleLimb(0.125, 0.105, 0.38, accentMat, 14);
      const paw = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 10), accentMat);
      paw.scale.set(0.95, 0.58, 1.32);
      paw.position.set(0, -0.4, 0.06);
      const pad = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), new THREE.MeshStandardMaterial({ color: 0xFDA4AF, roughness: 0.7 }));
      pad.scale.set(1, 0.3, 1);
      pad.position.set(0, -0.44, 0.09);
      legGrp.add(limb, paw, pad);
      return legGrp;
    };
    const legL = makeBearLeg(-1);
    const legR = makeBearLeg(1);
    root.add(legL, legR);

    // Articulated arms
    const makeBearArm = (side) => {
      const aGrp = new THREE.Group();
      aGrp.position.set(side * 0.34, 0.68, 0.02);
      const upper = createCapsuleLimb(0.10, 0.088, 0.28, accentMat, 14);
      const foreGrp = new THREE.Group();
      foreGrp.position.set(0, -0.28, 0);
      const fore = createCapsuleLimb(0.085, 0.075, 0.22, accentMat, 12);
      if (side === 1) addDetailedHandProp(foreGrp, c, darkMat, whiteMat);
      foreGrp.add(fore);
      aGrp.add(upper, foreGrp);
      aGrp.userData.forearm = foreGrp;
      return aGrp;
    };
    const armL = makeBearArm(-1);
    const armR = makeBearArm(1);
    torsoGrp.add(armL, armR);

    // Sculpted Head
    const headGrp = new THREE.Group();
    headGrp.position.set(0, 1.08, 0.05);
    torsoGrp.add(headGrp);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 24, 20), furMat);
    head.scale.set(1.08, 0.96, 0.96);
    const snout = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 12), bellyMat);
    snout.scale.set(1.15, 0.82, 1.0);
    snout.position.set(0, -0.07, 0.29);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.048, 12, 10), darkMat);
    nose.scale.set(1.25, 0.85, 0.8);
    nose.position.set(0, -0.03, 0.415);
    headGrp.add(head, snout, nose);

    // Round ears & eye patches
    [-1, 1].forEach(s => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.125, 14, 12), accentMat);
      ear.scale.set(1, 1, 0.55);
      ear.position.set(s * 0.27, 0.28, -0.02);
      headGrp.add(ear);
      if (isPanda) {
        const patch = new THREE.Mesh(new THREE.SphereGeometry(0.105, 12, 10), accentMat);
        patch.scale.set(0.95, 1.15, 0.35);
        patch.position.set(s * 0.125, 0.055, 0.305);
        patch.rotation.z = s * -0.22;
        headGrp.add(patch);
      }
      const eye = createStylizedEye(eyeMat, whiteMat, darkMat, furMat, 0.056, c.emocion, s);
      eye.position.set(s * 0.125, 0.055, 0.325);
      headGrp.add(eye);
    });

    applyBrowsAndMouth(headGrp, 0.02, 0.11, c.emocion, darkMat, darkMat, 1.0);
    applyBodyRigPose({ root, torso: torsoGrp, head: headGrp, armL, armR, legL, legR, baseY: 0 }, c);
    return;
  }

  // --- 3. CON ALAS (Ave estilizada con plumaje en capas y pico esculpido) ---
  if (sil === 'Con alas') {
    const birdHex = getSubjectMainHexInt(c, 0x0EA5E9);
    const bodyMat = new THREE.MeshStandardMaterial({ color: birdHex, roughness: 0.48 });
    const breastMat = new THREE.MeshStandardMaterial({ color: 0xFEF3C7, roughness: 0.6 });
    const beakMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.35 });
    const wingTipMat = new THREE.MeshStandardMaterial({ color: 0x0369A1, roughness: 0.5 });

    const root = new THREE.Group();
    const isFlying = acc === 'Volando / Flotando' || acc === 'Saltando alegre';
    root.position.y = isFlying ? 0.45 : 0;
    g.add(root);

    // Aerodynamic LatheGeometry body
    const pts = [
      new THREE.Vector2(0.01, -0.52),
      new THREE.Vector2(0.24, -0.36),
      new THREE.Vector2(0.36, -0.05),
      new THREE.Vector2(0.32, 0.3),
      new THREE.Vector2(0.16, 0.52),
      new THREE.Vector2(0.01, 0.58)
    ];
    const torso = new THREE.Mesh(new THREE.LatheGeometry(pts, 24), bodyMat);
    torso.scale.set(0.92, 1.0, 1.08);
    torso.rotation.x = isFlying ? 0.72 : 0.36;
    torso.position.set(0, 0.88, -0.04);
    root.add(torso);

    const breast = new THREE.Mesh(new THREE.SphereGeometry(0.27, 16, 14), breastMat);
    breast.scale.set(0.85, 1.15, 0.65);
    breast.position.set(0, 0.82, 0.16);
    root.add(breast);

    // Layered tail fan
    const tailGrp = new THREE.Group();
    tailGrp.position.set(0, 0.52, -0.38);
    tailGrp.rotation.x = -0.55;
    for (let i = -2; i <= 2; i++) {
      const tf = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), i % 2 === 0 ? bodyMat : wingTipMat);
      tf.scale.set(0.68, 2.4, 0.18);
      tf.position.set(i * 0.075, -0.18, -Math.abs(i) * 0.02);
      tf.rotation.z = -i * 0.16;
      tailGrp.add(tf);
    }
    root.add(tailGrp);

    // Layered multi-feather wings
    const wingOpen = isFlying || !(c.chkAlasAnimal && (c.alasAnimalTipo || '').includes('plegadas'));
    [-1, 1].forEach(s => {
      const wGrp = new THREE.Group();
      wGrp.position.set(s * 0.28, 1.0, -0.04);
      wGrp.rotation.set(isFlying ? -0.15 : 0.12, s * (wingOpen ? -0.22 : -1.15), s * (wingOpen ? 0.28 : -1.1));
      for (let f = 0; f < 5; f++) {
        const fe = new THREE.Mesh(new THREE.SphereGeometry(0.14 - f * 0.014, 12, 10), f < 2 ? bodyMat : wingTipMat);
        fe.scale.set(2.5 - f * 0.24, 0.44, 0.14);
        fe.position.set(s * (0.32 - f * 0.04), 0.08 - f * 0.09, -f * 0.018);
        fe.rotation.z = s * (0.24 - f * 0.16);
        wGrp.add(fe);
      }
      root.add(wGrp);
    });

    // Sculpted Bird Head + 2-Part Beak + Crest
    const headGrp = new THREE.Group();
    headGrp.position.set(0, 1.46, 0.18);
    root.add(headGrp);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.255, 22, 18), bodyMat);
    headGrp.add(head);

    const upperBeak = new THREE.Mesh(new THREE.ConeGeometry(0.088, 0.24, 12), beakMat);
    upperBeak.rotation.x = Math.PI / 2 + 0.12;
    upperBeak.scale.set(0.95, 1.0, 0.68);
    upperBeak.position.set(0, -0.015, 0.30);
    const lowerBeak = new THREE.Mesh(new THREE.ConeGeometry(0.068, 0.17, 10), beakMat);
    lowerBeak.rotation.x = Math.PI / 2 - 0.1;
    lowerBeak.scale.set(0.85, 1.0, 0.55);
    lowerBeak.position.set(0, -0.065, 0.26);
    headGrp.add(upperBeak, lowerBeak);

    // Crown plumage crest
    for (let k = 0; k < 3; k++) {
      const cr = new THREE.Mesh(new THREE.ConeGeometry(0.042, 0.18 - k * 0.03, 8), k === 0 ? beakMat : wingTipMat);
      cr.position.set(0, 0.27 - k * 0.03, 0.02 - k * 0.07);
      cr.rotation.x = -0.35 - k * 0.22;
      headGrp.add(cr);
    }

    [-1, 1].forEach(s => {
      const eye = createStylizedEye(eyeMat, whiteMat, darkMat, bodyMat, 0.056, c.emocion, s);
      eye.position.set(s * 0.11, 0.05, 0.21);
      eye.rotation.y = s * 0.25;
      headGrp.add(eye);
    });
    applyBrowsAndMouth(headGrp, 0.015, 0.01, c.emocion, darkMat, darkMat, 0.85, true);

    // Legs & 3-toed talons
    [-0.14, 0.14].forEach(x => {
      const leg = createCapsuleLimb(0.032, 0.024, 0.42, beakMat, 10);
      leg.position.set(x, 0.46, 0.02);
      if (isFlying) leg.rotation.x = 0.75;
      root.add(leg);
      for (let t = -1; t <= 1; t++) {
        const toe = createCapsuleLimb(0.018, 0.012, 0.12, beakMat, 8);
        toe.position.set(x, isFlying ? 0.18 : 0.04, isFlying ? -0.18 : 0.04);
        toe.rotation.x = -Math.PI / 2;
        toe.rotation.z = t * 0.45;
        root.add(toe);
      }
    });
    return;
  }

  // --- 4. INSECTO (Escarabajo / Abeja / Mariposa estilizado con brillo iridiscente) ---
  if (sil === 'Insecto') {
    const insHex = getSubjectMainHexInt(c, 0x10B981);
    const shellMat = new THREE.MeshPhysicalMaterial({ color: insHex, roughness: 0.18, metalness: 0.25, clearcoat: 1.0, clearcoatRoughness: 0.08 });
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.35 });
    const wingMat = new THREE.MeshPhysicalMaterial({
      color: 0xE0F2FE, transparent: true, opacity: 0.62, roughness: 0.1, metalness: 0.05, side: THREE.DoubleSide
    });

    const root = new THREE.Group();
    root.position.y = (acc === 'Volando / Flotando') ? 0.48 : 0.12;
    g.add(root);

    // Ribbed tapered abdomen
    const abd = new THREE.Mesh(new THREE.SphereGeometry(0.32, 22, 18), shellMat);
    abd.scale.set(0.92, 0.82, 1.55);
    abd.position.set(0, 0.56, -0.44);
    root.add(abd);
    for (let r = 0; r < 3; r++) {
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.28 - r * 0.03, 0.022, 8, 20), stripeMat);
      band.position.set(0, 0.56, -0.28 - r * 0.18);
      band.scale.set(1.0, 0.88, 1);
      root.add(band);
    }

    // Thorax
    const thorax = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 16), shellMat);
    thorax.scale.set(0.98, 0.94, 1.12);
    thorax.position.set(0, 0.64, 0.12);
    root.add(thorax);

    // Head + compound eyes + curved TubeGeometry antennae
    const headGrp = new THREE.Group();
    headGrp.position.set(0, 0.68, 0.52);
    root.add(headGrp);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 18, 16), shellMat);
    headGrp.add(head);

    [-1, 1].forEach(s => {
      const eye = createStylizedEye(eyeMat, whiteMat, darkMat, shellMat, 0.068, c.emocion, s);
      eye.position.set(s * 0.115, 0.04, 0.175);
      eye.rotation.y = s * 0.3;
      headGrp.add(eye);

      const antCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(s * 0.07, 0.16, 0.08),
        new THREE.Vector3(s * 0.16, 0.36, 0.18),
        new THREE.Vector3(s * 0.25, 0.44, 0.28)
      ]);
      const ant = new THREE.Mesh(new THREE.TubeGeometry(antCurve, 12, 0.014, 8, false), stripeMat);
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 8), stripeMat);
      tip.position.set(s * 0.25, 0.44, 0.28);
      headGrp.add(ant, tip);
    });
    applyBrowsAndMouth(headGrp, -0.02, -0.03, c.emocion, darkMat, darkMat, 0.82);

    // Double translucent veined wings (forewing + hindwing)
    if (!c.chkAlasAnimal || !isNoneVal(c.alasAnimalTipo)) {
      [-1, 1].forEach(s => {
        const foreW = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), wingMat);
        foreW.scale.set(1.75, 0.08, 0.82);
        foreW.position.set(s * 0.56, 0.96, 0.04);
        foreW.rotation.set(0.18, s * -0.18, s * 0.35);
        const hindW = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 10), wingMat);
        hindW.scale.set(1.5, 0.08, 0.72);
        hindW.position.set(s * 0.44, 0.86, -0.22);
        hindW.rotation.set(0.22, s * -0.4, s * 0.22);
        root.add(foreW, hindW);
      });
    }

    // 6 jointed 2-segment legs
    [-0.14, 0.1, 0.32].forEach((z, idx) => {
      [-1, 1].forEach(s => {
        const legPivot = new THREE.Group();
        legPivot.position.set(s * 0.21, 0.5, z);
        const femur = createCapsuleLimb(0.026, 0.02, 0.28, stripeMat, 8);
        femur.rotation.z = s * 0.85;
        femur.rotation.x = (idx - 1) * 0.25;
        const tibia = createCapsuleLimb(0.02, 0.012, 0.34, stripeMat, 8);
        tibia.position.set(s * 0.21, -0.18, (idx - 1) * 0.08);
        tibia.rotation.z = s * 0.22;
        legPivot.add(femur, tibia);
        root.add(legPivot);
      });
    });
    return;
  }

  // --- 5. CUADRÚPEDO (Zorrito / Perro / Gato estilizado 100% orgánico — cero cajas) ---
  const furHex = getSubjectMainHexInt(c, 0xEA580C);
  const furMat = new THREE.MeshStandardMaterial({ color: furHex, roughness: 0.64 });
  const creamMat = new THREE.MeshStandardMaterial({ color: 0xFEF3C7, roughness: 0.72 });
  const innerEarMat = new THREE.MeshStandardMaterial({ color: 0xFDA4AF, roughness: 0.65 });
  const pawMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.55 });

  const isSitting = acc === 'Sentado' || acc === 'Sentado en el suelo / Meditando';
  const isRunning = acc === 'Corriendo' || acc === 'Saltando alegre';
  const isLying = acc === 'Acostado descansando';

  const root = new THREE.Group();
  root.position.y = acc === 'Saltando alegre' ? 0.32 : (isLying ? -0.26 : 0);
  g.add(root);

  const bodyGrp = new THREE.Group();
  bodyGrp.position.set(0, isSitting ? 0.68 : 0.62, 0);
  bodyGrp.rotation.x = isSitting ? -0.58 : (isRunning ? 0.12 : 0);
  root.add(bodyGrp);

  // Organic contoured torso (chest + waist + rounded haunches)
  const chest = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 16), furMat);
  chest.scale.set(0.95, 1.0, 1.15);
  chest.position.set(0, 0.04, 0.28);
  const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.25, 0.58, 18), furMat);
  mid.rotation.x = Math.PI / 2;
  mid.scale.set(0.95, 1.0, 0.92);
  const haunch = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 16), furMat);
  haunch.scale.set(0.94, 0.98, 1.12);
  haunch.position.set(0, 0.01, -0.28);
  const chestFluff = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 14), creamMat);
  chestFluff.scale.set(0.95, 1.15, 0.78);
  chestFluff.position.set(0, -0.02, 0.44);
  bodyGrp.add(chest, mid, haunch, chestFluff);

  // Angled neck
  const neck = createCapsuleLimb(0.15, 0.18, 0.3, furMat, 14);
  neck.position.set(0, 0.36, 0.46);
  neck.rotation.x = isSitting ? 0.5 : 0.32;
  bodyGrp.add(neck);

  // Expressive Head
  const headGrp = new THREE.Group();
  headGrp.position.set(0, 0.48, 0.56);
  headGrp.rotation.x = isSitting ? 0.55 : 0;
  bodyGrp.add(headGrp);

  const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.285, 24, 20), furMat);
  cranium.scale.set(1.06, 0.96, 1.0);
  const snout = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), creamMat);
  snout.scale.set(1.02, 0.78, 1.48);
  snout.position.set(0, -0.065, 0.26);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.044, 12, 10), pawMat);
  nose.scale.set(1.12, 0.85, 0.85);
  nose.position.set(0, -0.032, 0.43);
  headGrp.add(cranium, snout, nose);

  [-1, 1].forEach(s => {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), creamMat);
    cheek.scale.set(1.2, 0.72, 0.8);
    cheek.position.set(s * 0.185, -0.075, 0.13);
    headGrp.add(cheek);

    const earType = (c.chkOrejasAnimal && !isNoneVal(c.orejasAnimalTipo)) ? c.orejasAnimalTipo : 'Puntiagudas';
    const eGrp = new THREE.Group();
    if (earType.includes('Caídas')) {
      const oE = createCapsuleLimb(0.075, 0.058, 0.24, furMat, 12);
      eGrp.add(oE);
      eGrp.position.set(s * 0.26, 0.14, 0.0); eGrp.rotation.z = s * 0.34;
    } else if (earType.includes('Redondas')) {
      const oE = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), furMat);
      oE.scale.set(1, 1, 0.5);
      eGrp.add(oE);
      eGrp.position.set(s * 0.22, 0.24, -0.02);
    } else {
      const oE = new THREE.Mesh(new THREE.ConeGeometry(0.105, 0.28, 14), furMat);
      oE.scale.set(1, 1, 0.6);
      const iE = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.19, 12), innerEarMat);
      iE.scale.set(1, 1, 0.42); iE.position.set(0, -0.02, 0.038);
      eGrp.add(oE, iE);
      eGrp.position.set(s * 0.19, 0.27, -0.02); eGrp.rotation.z = s * -0.26;
    }
    headGrp.add(eGrp);

    const eye = createStylizedEye(eyeMat, whiteMat, darkMat, furMat, 0.058, c.emocion, s);
    eye.position.set(s * 0.105, 0.06, 0.245);
    headGrp.add(eye);
  });
  applyBrowsAndMouth(headGrp, 0.02, 0.095, c.emocion, darkMat, darkMat, 0.96);

  // 4 Articulated Legs with Paws
  const legSpecs = [
    { x: -0.17, z: 0.32, isFront: true },
    { x: 0.17, z: 0.32, isFront: true },
    { x: -0.18, z: -0.32, isFront: false },
    { x: 0.18, z: -0.32, isFront: false }
  ];
  legSpecs.forEach(({ x, z, isFront }) => {
    const legGrp = new THREE.Group();
    legGrp.position.set(x, isSitting ? (isFront ? 0.62 : 0.34) : 0.52, isSitting ? (isFront ? 0.26 : -0.26) : z);
    const upper = createCapsuleLimb(0.075, 0.058, 0.25, furMat, 12);
    const lower = createCapsuleLimb(0.056, 0.044, 0.22, pawMat, 12);
    lower.position.y = -0.24;
    const paw = new THREE.Mesh(new THREE.SphereGeometry(0.062, 12, 10), pawMat);
    paw.scale.set(0.95, 0.62, 1.32);
    paw.position.set(0, -0.47, 0.035);
    legGrp.add(upper, lower, paw);

    if (isSitting && !isFront) {
      legGrp.rotation.x = -1.35;
      legGrp.position.y = 0.22;
    } else if (isLying) {
      legGrp.rotation.x = isFront ? -1.4 : 1.35;
      legGrp.position.y = 0.36;
    } else if (isRunning) {
      legGrp.rotation.x = isFront ? -0.55 : 0.55;
    } else if (acc === 'Saludando con la mano' && isFront && x > 0) {
      legGrp.rotation.x = -1.25;
    }
    root.add(legGrp);
  });

  // Curved Fluffy Tail
  if (!c.chkColaAnimal || !isNoneVal(c.colaAnimalTipo)) {
    const tailCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.08, -0.42),
      new THREE.Vector3(0.06, 0.16, -0.68),
      new THREE.Vector3(0.14, 0.36, -0.82),
      new THREE.Vector3(0.1, 0.56, -0.74)
    ]);
    const tail = new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 18, 0.098, 12, false), furMat);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 12), creamMat);
    tip.scale.set(0.95, 1.35, 0.95);
    tip.position.set(0.1, 0.59, -0.73);
    bodyGrp.add(tail, tip);
  }

  // Optional Collar & Tag
  if (c.chkCollarAnimal && !isNoneVal(c.collarAnimalTipo)) {
    const colMat = new THREE.MeshStandardMaterial({ color: 0xEF4444, roughness: 0.45 });
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.028, 10, 22), colMat);
    collar.position.set(0, 0.24, 0.44);
    collar.rotation.x = 1.25;
    const tag = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.015, 14), new THREE.MeshStandardMaterial({ color: 0xFACC15, metalness: 0.72, roughness: 0.25 }));
    tag.rotation.x = Math.PI / 2;
    tag.position.set(0, 0.14, 0.61);
    bodyGrp.add(collar, tag);
  }

  // Optional Wings on Quadruped
  if (c.chkAlasAnimal && !isNoneVal(c.alasAnimalTipo)) {
    const wMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.5 });
    [-1, 1].forEach(s => {
      const wGrp = new THREE.Group();
      wGrp.position.set(s * 0.22, 0.2, 0.12);
      for (let f = 0; f < 4; f++) {
        const fe = new THREE.Mesh(new THREE.SphereGeometry(0.14 - f * 0.015, 10, 8), wMat);
        fe.scale.set(2.1 - f * 0.22, 0.42, 0.14);
        fe.position.set(s * (0.26 - f * 0.04), 0.14 - f * 0.08, -f * 0.06);
        fe.rotation.z = s * (0.45 - f * 0.15);
        wGrp.add(fe);
      }
      bodyGrp.add(wGrp);
    });
  }
}
