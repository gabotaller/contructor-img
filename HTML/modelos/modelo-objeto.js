/**
 * Modelos 3D Mejorados: Objeto (Normal y Antropomorfo) y Personalizado
 * Reemplaza primitivas simples por modelos escultóricos detallados con ojos expresivos,
 * extremidades articuladas con guantes/zapatillas y soporte completo de ropa y posturas.
 */

function buildObjetoYPersonalizado3D(g, c, ctx) {
  const { bodyMat, eyeMat, darkMat, whiteMat, ropaAll, findRopaColor } = ctx;
  const mainHex = getSubjectMainHexInt(c, c.cat === 'Objeto' ? 0x6366F1 : 0x8B5CF6);
  const accentHex = 0xF59E0B;
  const sculptedMat = new THREE.MeshPhysicalMaterial({
    color: mainHex,
    roughness: 0.28,
    metalness: 0.12,
    clearcoat: 0.65,
    clearcoatRoughness: 0.18
  });
  const brassMat = new THREE.MeshStandardMaterial({ color: accentHex, roughness: 0.28, metalness: 0.72 });

  if (c.cat === 'Objeto' && c.modoForma === 'Antropomorfo') {
    // Charming Pixar-like anthropomorphic mascot object with gloves, sneakers & full poses
    const root = new THREE.Group();
    g.add(root);

    const hipY = 0.52;
    const shoeHex = findRopaColor(['zapatilla', 'zapato', 'bota'], 0xDC2626);
    const shoeMat = new THREE.MeshStandardMaterial({ color: shoeHex, roughness: 0.42 });

    const makeLeg = (side) => {
      const hGrp = new THREE.Group();
      hGrp.position.set(side * 0.18, hipY, 0);
      const thigh = createCapsuleLimb(0.062, 0.054, 0.24, darkMat, 12);
      const shinGrp = new THREE.Group();
      shinGrp.position.set(0, -0.24, 0);
      const shin = createCapsuleLimb(0.052, 0.046, 0.22, darkMat, 12);
      const shoe = new THREE.Mesh(new THREE.SphereGeometry(0.105, 14, 12), shoeMat);
      shoe.scale.set(0.9, 0.62, 1.45);
      shoe.position.set(0, -0.24, 0.06);
      const sole = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.096, 0.03, 14), whiteMat);
      sole.scale.set(0.95, 1, 1.5);
      sole.position.set(0, -0.285, 0.06);
      shinGrp.add(shin, shoe, sole);
      hGrp.add(thigh, shinGrp);
      hGrp.userData.shin = shinGrp;
      return hGrp;
    };
    const legL = makeLeg(-1);
    const legR = makeLeg(1);
    root.add(legL, legR);

    const torsoGrp = new THREE.Group();
    torsoGrp.position.set(0, hipY, 0);
    root.add(torsoGrp);

    // Sculpted rounded-cube / acorn-like mascot body with decorative brass equatorial rim
    const pts = [
      new THREE.Vector2(0.02, -0.02),
      new THREE.Vector2(0.36, 0.05),
      new THREE.Vector2(0.46, 0.34),
      new THREE.Vector2(0.44, 0.68),
      new THREE.Vector2(0.32, 0.90),
      new THREE.Vector2(0.02, 0.96)
    ];
    const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 28), sculptedMat);
    body.scale.set(1.0, 1.0, 0.88);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.032, 12, 32), brassMat);
    rim.rotation.x = Math.PI / 2;
    rim.scale.set(1.0, 0.88, 1);
    rim.position.y = 0.22;
    torsoGrp.add(body, rim);

    // Articulated arms with cartoon white gloves
    const makeArm = (side) => {
      const aGrp = new THREE.Group();
      aGrp.position.set(side * 0.45, 0.56, 0.02);
      const upper = createCapsuleLimb(0.052, 0.048, 0.24, darkMat, 10);
      const foreGrp = new THREE.Group();
      foreGrp.position.set(0, -0.24, 0);
      const fore = createCapsuleLimb(0.048, 0.044, 0.22, darkMat, 10);
      const glove = new THREE.Mesh(new THREE.SphereGeometry(0.088, 14, 12), whiteMat);
      glove.scale.set(1.0, 1.08, 0.86);
      glove.position.set(0, -0.24, 0);
      const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.062, 0.018, 8, 16), whiteMat);
      cuff.rotation.x = Math.PI / 2;
      cuff.position.set(0, -0.17, 0);
      if (side === 1) addDetailedHandProp(foreGrp, c, darkMat, whiteMat);
      foreGrp.add(fore, glove, cuff);
      aGrp.add(upper, foreGrp);
      aGrp.userData.forearm = foreGrp;
      return aGrp;
    };
    const armL = makeArm(-1);
    const armR = makeArm(1);
    torsoGrp.add(armL, armR);

    // Expressive face mounted cleanly on front of body
    const faceGrp = new THREE.Group();
    faceGrp.position.set(0, 0.56, 0.14);
    torsoGrp.add(faceGrp);

    const eL = createStylizedEye(eyeMat, whiteMat, darkMat, sculptedMat, 0.074, c.emocion, -1);
    const eR = createStylizedEye(eyeMat, whiteMat, darkMat, sculptedMat, 0.074, c.emocion, 1);
    eL.position.set(-0.13, 0.05, 0.27);
    eR.position.set(0.13, 0.05, 0.27);
    faceGrp.add(eL, eR);
    applyBrowsAndMouth(faceGrp, 0.02, 0.065, c.emocion, darkMat, darkMat, 1.15);

    // Hat / Glasses compatibility
    if (ropaAll.includes('sombrero') || ropaAll.includes('gorra') || ropaAll.includes('corona')) {
      const hatMat = new THREE.MeshStandardMaterial({ color: findRopaColor(['sombrero', 'gorra', 'corona'], 0x92400E), roughness: 0.5 });
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.04, 24), hatMat);
      const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.32, 0.22, 20), hatMat);
      brim.position.y = 0.94; crown.position.y = 1.06;
      torsoGrp.add(brim, crown);
    }

    applyBodyRigPose({ root, torso: torsoGrp, head: faceGrp, armL, armR, legL, legR, baseY: 0 }, c);
    return;
  }

  if (c.cat === 'Objeto') {
    // Detailed sculptural studio artifact (faceted orb-lantern on pedestal with brass bands)
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.52, 0.14, 28), brassMat);
    base.position.y = 0.07;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.24, 20), darkMat);
    stem.position.y = 0.24;
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.46, 28, 24), sculptedMat);
    core.position.y = 0.86;
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.54, 0.032, 12, 36), brassMat);
    ring1.position.y = 0.86; ring1.rotation.x = Math.PI / 2;
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.024, 12, 36), brassMat);
    ring2.position.y = 0.86; ring2.rotation.set(0.65, 0.45, 0);
    const finial = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.22, 16), brassMat);
    finial.position.y = 1.42;
    g.add(base, stem, core, ring1, ring2, finial);
    return;
  }

  // Personalizado: Stylized sculptural floating figure with expressive face & orbital ring
  const root = new THREE.Group();
  g.add(root);
  const pts = [
    new THREE.Vector2(0.02, 0.12),
    new THREE.Vector2(0.24, 0.25),
    new THREE.Vector2(0.36, 0.65),
    new THREE.Vector2(0.28, 1.02),
    new THREE.Vector2(0.02, 1.12)
  ];
  const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 24), sculptedMat);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.024, 10, 36), brassMat);
  halo.position.y = 0.72; halo.rotation.x = 1.2; halo.rotation.y = 0.35;

  const headGrp = new THREE.Group();
  headGrp.position.set(0, 1.38, 0);
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.30, 2), sculptedMat);
  headGrp.add(head);
  const eL = createStylizedEye(eyeMat, whiteMat, darkMat, sculptedMat, 0.056, c.emocion, -1);
  const eR = createStylizedEye(eyeMat, whiteMat, darkMat, sculptedMat, 0.056, c.emocion, 1);
  eL.position.set(-0.105, 0.04, 0.26);
  eR.position.set(0.105, 0.04, 0.26);
  headGrp.add(eL, eR);
  applyBrowsAndMouth(headGrp, 0.01, 0.03, c.emocion, darkMat, darkMat, 0.95);

  root.add(body, halo, headGrp);
}
