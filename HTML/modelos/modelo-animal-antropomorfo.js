/**
 * Modelo 3D Mejorado: Animal Antropomorfo (estilizado tipo personaje animado)
 * Incluye cabeza esculpida con hocico/mejillas, orejas con interior, ojos con párpados,
 * cola esponjosa curva, alas emplumadas opcionales, ropa, objeto en mano y posturas de cuerpo entero.
 */

function buildAnimalAntropomorfo3D(g, c, ctx) {
  const { eyeMat, darkMat, whiteMat, ropaAll, findRopaColor } = ctx;
  const furHex = getSubjectMainHexInt(c, 0xEA580C);
  const furMat = new THREE.MeshStandardMaterial({ color: furHex, roughness: 0.65 });
  const creamMat = new THREE.MeshStandardMaterial({ color: 0xFEF3C7, roughness: 0.72 });
  const innerEarMat = new THREE.MeshStandardMaterial({ color: 0xFDA4AF, roughness: 0.65 });
  const noseMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.22, metalness: 0.1 });

  const hasClothes = ropaAll.length > 0;
  const topHex = findRopaColor(
    ['polo', 'camiseta', 'camisa', 'blusa', 'chompa', 'polera', 'casaca', 'chaqueta', 'chaleco', 'poncho', 'uniforme', 'vestido', 'terno', 'traje', 'overol', 'buzo', 'túnica'],
    0x2563EB
  );
  const topMat = new THREE.MeshStandardMaterial({ color: topHex, roughness: 0.56 });
  const pantsHex = findRopaColor(['pantalón', 'jeans', 'short', 'falda', 'uniforme', 'overol'], furHex);
  const pantsMat = hasClothes && (ropaAll.includes('pantalón') || ropaAll.includes('jeans') || ropaAll.includes('short') || ropaAll.includes('uniforme') || ropaAll.includes('overol'))
    ? new THREE.MeshStandardMaterial({ color: pantsHex, roughness: 0.62 })
    : furMat;
  const shoeHex = findRopaColor(['zapatilla', 'zapato', 'bota', 'botin'], 0x78350F);
  const hasShoes = ropaAll.includes('zapatilla') || ropaAll.includes('zapato') || ropaAll.includes('bota');
  const shoeMat = new THREE.MeshStandardMaterial({ color: shoeHex, roughness: 0.42 });

  const root = new THREE.Group();
  g.add(root);

  const legUpperLen = 0.30;
  const legLowerLen = 0.28;
  const hipY = legUpperLen + legLowerLen + 0.08;
  const torsoH = 0.70;

  // --- Pelvis & Articulated Legs with Paws or Boots ---
  const pelvis = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 12), pantsMat);
  pelvis.scale.set(1.04, 0.68, 0.85);
  pelvis.position.y = hipY;
  root.add(pelvis);

  const makeLeg = (side) => {
    const hipGrp = new THREE.Group();
    hipGrp.position.set(side * 0.135, hipY - 0.02, 0);
    const thigh = createCapsuleLimb(0.092, 0.072, legUpperLen, pantsMat, 14);
    hipGrp.add(thigh);

    const shinGrp = new THREE.Group();
    shinGrp.position.set(0, -legUpperLen, 0);
    const shin = createCapsuleLimb(0.068, 0.056, legLowerLen, hasShoes ? shoeMat : furMat, 14);
    shinGrp.add(shin);

    const pawGrp = new THREE.Group();
    pawGrp.position.set(0, -legLowerLen - 0.03, 0.055);
    if (hasShoes) {
      const boot = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 10), shoeMat);
      boot.scale.set(0.85, 0.68, 1.42);
      const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.075, 0.05, 14), new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.5 }));
      cuff.position.set(0, 0.09, -0.05);
      pawGrp.add(boot, cuff);
    } else {
      const paw = new THREE.Mesh(new THREE.SphereGeometry(0.082, 14, 10), darkMat);
      paw.scale.set(0.92, 0.58, 1.32);
      pawGrp.add(paw);
      for (let t = -1; t <= 1; t++) {
        const toe = new THREE.Mesh(new THREE.SphereGeometry(0.026, 8, 8), darkMat);
        toe.position.set(t * 0.036, -0.015, 0.082);
        pawGrp.add(toe);
      }
    }
    shinGrp.add(pawGrp);
    hipGrp.add(shinGrp);
    hipGrp.userData.shin = shinGrp;
    return hipGrp;
  };
  const legL = makeLeg(-1);
  const legR = makeLeg(1);
  root.add(legL, legR);

  // --- Sculpted Torso ---
  const torsoGrp = new THREE.Group();
  torsoGrp.position.set(0, hipY, 0);
  root.add(torsoGrp);

  const torsoPts = [
    new THREE.Vector2(0.02, 0),
    new THREE.Vector2(0.23, 0.04),
    new THREE.Vector2(0.21, torsoH * 0.32),
    new THREE.Vector2(0.255, torsoH * 0.72),
    new THREE.Vector2(0.21, torsoH * 0.94),
    new THREE.Vector2(0.11, torsoH)
  ];
  const bodyMesh = new THREE.Mesh(new THREE.LatheGeometry(torsoPts, 24), hasClothes ? topMat : furMat);
  bodyMesh.scale.set(1.0, 1.0, 0.84);
  torsoGrp.add(bodyMesh);

  if (!hasClothes) {
    // Fluffy cream chest & belly fur patch
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.20, 16, 14), creamMat);
    belly.scale.set(0.84, 1.38, 0.42);
    belly.position.set(0, torsoH * 0.48, 0.16);
    torsoGrp.add(belly);
  } else if (ropaAll.includes('vestido') || ropaAll.includes('falda')) {
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.36, 0.36, 20), topMat);
    skirt.position.y = -0.08;
    torsoGrp.add(skirt);
  } else if (ropaAll.includes('poncho')) {
    const poncho = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.58, 18), topMat);
    poncho.position.y = torsoH * 0.52;
    torsoGrp.add(poncho);
  }

  // Optional Collar / Bandana
  if (c.chkCollarAnimal && !isNoneVal(c.collarAnimalTipo)) {
    const colMat = new THREE.MeshStandardMaterial({ color: 0xEF4444, roughness: 0.45 });
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.135, 0.028, 10, 22), colMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, torsoH - 0.01, 0.01);
    torsoGrp.add(collar);
    if (c.collarAnimalTipo.includes('Pañuelo')) {
      const kerchief = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.2, 4), colMat);
      kerchief.rotation.z = Math.PI;
      kerchief.scale.set(1.1, 1, 0.3);
      kerchief.position.set(0, torsoH - 0.12, 0.17);
      torsoGrp.add(kerchief);
    } else {
      const tag = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.014, 14), new THREE.MeshStandardMaterial({ color: 0xFACC15, metalness: 0.7, roughness: 0.25 }));
      tag.rotation.x = Math.PI / 2;
      tag.position.set(0, torsoH - 0.055, 0.165);
      torsoGrp.add(tag);
    }
  }

  // --- Curved Fluffy Tail ---
  if (!c.chkColaAnimal || !isNoneVal(c.colaAnimalTipo)) {
    const tailGrp = new THREE.Group();
    tailGrp.position.set(0, 0.08, -0.18);
    if (c.chkColaAnimal && (c.colaAnimalTipo || '').includes('Corta')) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 12), creamMat);
      puff.position.set(0, 0.04, -0.1);
      tailGrp.add(puff);
    } else {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.08, 0.05, -0.28),
        new THREE.Vector3(0.18, 0.24, -0.44),
        new THREE.Vector3(0.14, 0.44, -0.38)
      ]);
      const tailTube = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.095, 12, false), furMat);
      const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.108, 14, 12), creamMat);
      tailTip.scale.set(0.95, 1.32, 0.95);
      tailTip.position.set(0.14, 0.47, -0.37);
      tailGrp.add(tailTube, tailTip);
    }
    torsoGrp.add(tailGrp);
  }

  // --- Optional Layered Wings ---
  if (c.chkAlasAnimal && !isNoneVal(c.alasAnimalTipo)) {
    const isTranslucent = (c.alasAnimalTipo || '').includes('translúcidas');
    const isFolded = (c.alasAnimalTipo || '').includes('plegadas');
    const wingMat = isTranslucent
      ? new THREE.MeshPhysicalMaterial({ color: 0xBAE6FD, transparent: true, opacity: 0.65, roughness: 0.12, side: THREE.DoubleSide })
      : new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.55 });

    [-1, 1].forEach(s => {
      const wGrp = new THREE.Group();
      wGrp.position.set(s * 0.16, torsoH * 0.72, -0.2);
      wGrp.rotation.y = s * (isFolded ? -0.95 : -0.32);
      for (let f = 0; f < 4; f++) {
        const feather = new THREE.Mesh(new THREE.SphereGeometry(0.16 - f * 0.018, 12, 10), wingMat);
        feather.scale.set(2.2 - f * 0.25, 0.46, 0.16);
        feather.position.set(s * (0.28 - f * 0.04), 0.08 - f * 0.11, -0.02 * f);
        feather.rotation.z = s * (0.28 - f * 0.2);
        wGrp.add(feather);
      }
      torsoGrp.add(wGrp);
    });
  }

  // --- Articulated Arms with Paws ---
  const armUpperLen = 0.25;
  const armLowerLen = 0.23;
  const makeArm = (side) => {
    const shGrp = new THREE.Group();
    shGrp.position.set(side * 0.29, torsoH * 0.84, 0);
    const upper = createCapsuleLimb(0.068, 0.058, armUpperLen, hasClothes ? topMat : furMat, 12);
    shGrp.add(upper);

    const foreGrp = new THREE.Group();
    foreGrp.position.set(0, -armUpperLen, 0);
    const fore = createCapsuleLimb(0.056, 0.046, armLowerLen, furMat, 12);
    foreGrp.add(fore);

    const pawGrp = new THREE.Group();
    pawGrp.position.set(0, -armLowerLen - 0.03, 0);
    const paw = new THREE.Mesh(new THREE.SphereGeometry(0.064, 12, 10), darkMat);
    paw.scale.set(0.92, 1.05, 0.82);
    pawGrp.add(paw);
    if (side === 1) addDetailedHandProp(pawGrp, c, darkMat, whiteMat);
    foreGrp.add(pawGrp);
    shGrp.add(foreGrp);
    shGrp.userData.forearm = foreGrp;
    shGrp.userData.hand = pawGrp;
    return shGrp;
  };
  const armL = makeArm(-1);
  const armR = makeArm(1);
  torsoGrp.add(armL, armR);

  // --- Sculpted Expressive Animal Head ---
  const headGrp = new THREE.Group();
  headGrp.position.set(0, torsoH + 0.34, 0.02);
  torsoGrp.add(headGrp);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.305, 26, 22), furMat);
  head.scale.set(1.06, 0.96, 0.98);
  headGrp.add(head);

  // Fluffy cheek tufts (gives that charming fox/cat silhouette)
  [-1, 1].forEach(s => {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.145, 14, 12), creamMat);
    cheek.scale.set(1.18, 0.72, 0.82);
    cheek.position.set(s * 0.2, -0.075, 0.14);
    cheek.rotation.z = s * -0.25;
    headGrp.add(cheek);
  });

  // Tapered muzzle & glossy nose
  const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.135, 16, 14), creamMat);
  muzzle.scale.set(1.05, 0.78, 1.38);
  muzzle.position.set(0, -0.065, 0.27);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.044, 12, 10), noseMat);
  nose.scale.set(1.15, 0.82, 0.85);
  nose.position.set(0, -0.035, 0.435);
  headGrp.add(muzzle, nose);

  // Expressive Dual-Tone Ears (outer fur + inner pink/cream)
  const earType = (c.chkOrejasAnimal && !isNoneVal(c.orejasAnimalTipo)) ? c.orejasAnimalTipo : 'Puntiagudas';
  [-1, 1].forEach(s => {
    const eGrp = new THREE.Group();
    if (earType.includes('Redondas')) {
      const outer = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 12), furMat);
      outer.scale.set(1, 1, 0.45);
      const inner = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 10), innerEarMat);
      inner.scale.set(1, 1, 0.35);
      inner.position.z = 0.028;
      eGrp.add(outer, inner);
      eGrp.position.set(s * 0.24, 0.26, -0.02);
    } else if (earType.includes('Caídas')) {
      const outer = createCapsuleLimb(0.085, 0.065, 0.28, furMat, 12);
      const inner = createCapsuleLimb(0.05, 0.04, 0.2, innerEarMat, 10);
      inner.position.set(0, -0.03, 0.038);
      eGrp.add(outer, inner);
      eGrp.position.set(s * 0.28, 0.16, 0.01);
      eGrp.rotation.z = s * 0.34;
    } else {
      const hScale = earType.includes('Grandes') ? 1.35 : 1.05;
      const outer = new THREE.Mesh(new THREE.ConeGeometry(0.115, 0.30 * hScale, 14), furMat);
      outer.scale.set(1.0, 1.0, 0.62);
      const inner = new THREE.Mesh(new THREE.ConeGeometry(0.068, 0.21 * hScale, 12), innerEarMat);
      inner.scale.set(1.0, 1.0, 0.45);
      inner.position.set(0, -0.02, 0.04);
      eGrp.add(outer, inner);
      eGrp.position.set(s * 0.21, 0.30 + (hScale - 1) * 0.08, -0.02);
      eGrp.rotation.z = s * -0.28;
    }
    headGrp.add(eGrp);
  });

  // Layered stylized eyes
  const eL = createStylizedEye(eyeMat, whiteMat, darkMat, furMat, 0.064, c.emocion, -1);
  const eR = createStylizedEye(eyeMat, whiteMat, darkMat, furMat, 0.064, c.emocion, 1);
  eL.position.set(-0.112, 0.065, 0.265);
  eR.position.set(0.112, 0.065, 0.265);
  headGrp.add(eL, eR);

  applyBrowsAndMouth(headGrp, 0.02, 0.105, c.emocion, darkMat, darkMat, 1.02);

  // Glasses / Hat compatibility
  if (ropaAll.includes('lentes') || ropaAll.includes('anteojos')) {
    const fMat = new THREE.MeshStandardMaterial({ color: findRopaColor(['lentes', 'anteojos'], 0x0F172A), roughness: 0.3, metalness: 0.4 });
    const gL = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.012, 8, 20), fMat);
    const gR = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.012, 8, 20), fMat);
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.012, 0.012), fMat);
    gL.position.set(-0.112, 0.065, 0.31); gR.position.set(0.112, 0.065, 0.31); br.position.set(0, 0.065, 0.31);
    headGrp.add(gL, gR, br);
  }
  if (ropaAll.includes('sombrero') || ropaAll.includes('gorra') || ropaAll.includes('corona')) {
    const hatMat = new THREE.MeshStandardMaterial({ color: findRopaColor(['sombrero', 'gorra', 'corona'], 0x92400E), roughness: 0.55 });
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.036, 22), hatMat);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.27, 0.2, 18), hatMat);
    brim.position.y = 0.28; crown.position.y = 0.39;
    headGrp.add(brim, crown);
  }

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
    sh: 1.0,
    hipY,
    torsoH,
    baseY: 0
  }, c, darkMat, whiteMat);
}
