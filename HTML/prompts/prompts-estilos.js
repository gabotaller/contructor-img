/**
 * Configuración y Prompts de Estilos Visuales (Paso 7)
 * Todas las imágenes están almacenadas en ./imagenes/ y aplicadas al zorrito.
 */

const STYLE_PROMPTS = [
  {
    id: 1,
    name: 'Cuento infantil ilustrado',
    cat: 'Educativos',
    desc: 'ilustración de cuento infantil con colores cálidos, trazos suaves y estética pedagógica amigable',
    img: './imagenes/estilo-01-cuento-infantil-ilustrado.jpg'
  },
  {
    id: 2,
    name: 'Acuarela',
    cat: 'Artísticos',
    desc: 'pintura en acuarela suave sobre papel texturizado con degradados delicados, manchas húmedas artísticas y trazos luminosos',
    img: './imagenes/estilo-02-acuarela.jpg'
  },
  {
    id: 3,
    name: 'Dibujo con crayones',
    cat: 'Educativos',
    desc: 'dibujo hecho con crayones de cera sobre cartulina, textura infantil expresiva y alegre',
    img: './imagenes/estilo-03-dibujo-con-crayones.jpg'
  },
  {
    id: 4,
    name: 'Papel Recortado',
    cat: 'Educativos',
    desc: 'arte en capas de papel recortado artesanal (papercraft) con profundidad sutil, relieves y sombras limpias',
    img: './imagenes/estilo-04-papel-recortado.jpg'
  },
  {
    id: 5,
    name: 'Plastilina (Claymation)',
    cat: 'Educativos',
    desc: 'escena modelada en plastilina artesanal con texturas táctiles suaves estilo stop-motion',
    img: './imagenes/estilo-05-plastilina-claymation.jpg'
  },
  {
    id: 6,
    name: 'Pictograma plano (Flat)',
    cat: 'Educativos',
    desc: 'diseño vectorial plano minimalista con formas geométricas limpias y alto contraste educativo',
    img: './imagenes/estilo-06-pictograma-plano-flat.jpg'
  },
  {
    id: 7,
    name: 'Dibujo para colorear (líneas limpias)',
    cat: 'Educativos',
    desc: 'ilustración lineal limpia en blanco y negro con contornos gruesos lista para colorear, sin relleno de color',
    img: './imagenes/estilo-07-dibujo-para-colorear-lineas-limpias.jpg'
  },
  {
    id: 8,
    name: 'Infografía vectorial',
    cat: 'Educativos',
    desc: 'gráfico vectorial educativo limpio, moderno y ordenado estilo infografía escolar',
    img: './imagenes/estilo-08-infografia-vectorial.jpg'
  },
  {
    id: 9,
    name: 'Lámina botánica clásica',
    cat: 'Educativos',
    desc: 'ilustración científica botánica detallada con trazos de tinta fina y coloración suave',
    img: './imagenes/estilo-09-lamina-botanica-clasica.jpg'
  },
  {
    id: 10,
    name: 'Pintura al óleo',
    cat: 'Artísticos',
    desc: 'pintura al óleo clásica sobre lienzo con pinceladas empastadas ricas, iluminación académica y gran profundidad',
    img: './imagenes/estilo-10-pintura-al-oleo.jpg'
  },
  {
    id: 11,
    name: 'Impresionismo luminoso',
    cat: 'Artísticos',
    desc: 'pintura impresionista con pinceladas cortas vibrantes capturando la luz natural',
    img: './imagenes/estilo-11-impresionismo-luminoso.jpg'
  },
  {
    id: 12,
    name: 'Pop Art',
    cat: 'Artísticos',
    desc: 'estilo Pop Art vibrante con colores primarios saturados, contornos negros marcados y tramas de semitonos',
    img: './imagenes/estilo-12-pop-art.jpg'
  },
  {
    id: 13,
    name: 'Muralismo latinoamericano',
    cat: 'Artísticos',
    desc: 'muralismo latinoamericano monumental con formas expresivas y colores tierra',
    img: './imagenes/estilo-13-muralismo-latinoamericano.jpg'
  },
  {
    id: 14,
    name: 'Icono 3D de Arcilla Mate (Clay Icon)',
    cat: '3D y Digital',
    desc: 'lindo render 3D con superficie mate, estilo icono de arcilla amasada, diseño estilizado simple, proporciones redondeadas, detalles esculpidos suaves, lenguaje corporal juguetón, acentos vibrantes de color, fondo blanco limpio, composición minimalista, iluminación ambiental suave, sombra sutil, diseño de personaje encantador, alta resolución y estética pulida similar a un juguete',
    img: './imagenes/estilo-14-icono-3d-arcilla-mate.jpg'
  },
  {
    id: 15,
    name: 'Diorama isométrico 3D',
    cat: '3D y Digital',
    desc: 'escena 3D en vista isométrica tipo maqueta miniatura con bordes redondeados',
    img: './imagenes/estilo-15-diorama-isometrico-3d.jpg'
  },
  {
    id: 16,
    name: 'Low Poly 3D',
    cat: '3D y Digital',
    desc: 'arte digital Low Poly 3D compuesto por facetas poligonales geométricas limpias y colores vibrantes',
    img: './imagenes/estilo-16-low-poly-3d.jpg'
  },
  {
    id: 17,
    name: 'Minecraft',
    cat: 'Videojuegos y Pop',
    desc: 'mundo 3D estilo Minecraft construido con bloques cúbicos voxel pixelados, iluminación soleada y estética creativa',
    img: './imagenes/estilo-17-minecraft.jpg'
  },
  {
    id: 18,
    name: 'Estilo GTA (ilustración urbana)',
    cat: 'Videojuegos y Pop',
    desc: 'ilustración digital estilo portada de GTA con contornos marcados, sombreado cel-shading vibrante, palmeras y atardecer urbano',
    img: './imagenes/estilo-18-estilo-gta-ilustracion-urbana.jpg'
  },
  {
    id: 19,
    name: 'Cómic clásico',
    cat: 'Videojuegos y Pop',
    desc: 'cómic clásico con entintado dinámico, sombreado dramático y semitonos',
    img: './imagenes/estilo-19-comic-clasico.jpg'
  },
  {
    id: 20,
    name: 'Anime',
    cat: 'Videojuegos y Pop',
    desc: 'ilustración de anime japonés con colores vibrantes, iluminación expresiva y fondos pintados detallados',
    img: './imagenes/estilo-20-anime.jpg'
  },
  {
    id: 21,
    name: 'Pixel Art retro 16-bits',
    cat: 'Videojuegos y Pop',
    desc: 'arte en píxeles nítidos estilo videojuego clásico de 16 bits con paleta vibrante',
    img: './imagenes/estilo-21-pixel-art-retro-16-bits.jpg'
  },
  {
    id: 22,
    name: 'Fotografía documental realista',
    cat: 'Fotografía',
    desc: 'fotografía documental natural y nítida con iluminación real y gran autenticidad',
    img: './imagenes/estilo-22-fotografia-documental-realista.jpg'
  },
  {
    id: 23,
    name: 'Fotografía de estudio limpia',
    cat: 'Fotografía',
    desc: 'fotografía comercial de estudio con luz suave difusa y fondo impecable',
    img: './imagenes/estilo-23-fotografia-de-estudio-limpia.jpg'
  },
  {
    id: 24,
    name: 'Cine hora dorada',
    cat: 'Fotografía',
    desc: 'fotograma cinematográfico con luz cálida de atardecer, reflejos dorados y bokeh',
    img: './imagenes/estilo-24-cine-hora-dorada.jpg'
  },
  {
    id: 25,
    name: 'Neón Punk',
    cat: '3D y Digital',
    desc: 'estética Neón Punk rebelde con luces de neón magenta, cian y verde ácido brillantes en la oscuridad y detalles punk',
    img: './imagenes/estilo-25-neon-punk.jpg'
  },
  {
    id: 26,
    name: 'Cómic Grunge',
    cat: 'Videojuegos y Pop',
    desc: 'ilustración estilo cómic grunge alternativo con entintado desgastado, salpicaduras de tinta, texturas rugosas y paleta ocre oscura',
    img: './imagenes/estilo-26-comic-grunge.jpg'
  },
  {
    id: 27,
    name: 'Noir Gráfico',
    cat: 'Videojuegos y Pop',
    desc: 'novela gráfica estilo Noir en blanco y negro de altísimo contraste con sombras profundas, lluvia dramática y contraluz nítido',
    img: './imagenes/estilo-27-noir-grafico.jpg'
  },
  {
    id: 28,
    name: 'Superflat',
    cat: 'Artísticos',
    desc: 'arte pop japonés estilo Superflat inspirado en Takashi Murakami con colores planos ultrabrillantes, contornos nítidos y flores sonrientes',
    img: './imagenes/estilo-28-superflat.jpg'
  },
  {
    id: 29,
    name: 'Risografía',
    cat: 'Artísticos',
    desc: 'impresión artística en risografía con textura granulada de puntos, superposición de tintas fluorescentes rosa coral, turquesa y mostaza sobre papel',
    img: './imagenes/estilo-29-risografia.jpg'
  },
  {
    id: 30,
    name: 'Neoexpresionismo',
    cat: 'Artísticos',
    desc: 'pintura neoexpresionista intensa con pinceladas crudas y enérgicas, trazos expresivos libres y bloques de color vibrantes',
    img: './imagenes/estilo-30-neoexpresionismo.jpg'
  },
  {
    id: 31,
    name: 'Cartoon Moderno',
    cat: 'Videojuegos y Pop',
    desc: 'ilustración cartoon 2D moderna con contornos limpios definidos, colores planos vibrantes y expresividad de animación actual',
    img: './imagenes/estilo-31-cartoon-moderno.jpg'
  },
  {
    id: 32,
    name: 'Constructivismo',
    cat: 'Artísticos',
    desc: 'cartel gráfico estilo constructivismo con composición geométrica diagonal audaz en rojo, negro y crema de alto impacto visual',
    img: './imagenes/estilo-32-constructivismo.jpg'
  },
  {
    id: 33,
    name: 'Caricatura',
    cat: 'Artísticos',
    desc: 'ilustración de caricatura expresiva con proporciones cómicas exageradas, cabeza grande, gestos muy vivos y líneas dinámicas',
    img: './imagenes/estilo-33-caricatura.jpg'
  },
  {
    id: 34,
    name: 'Art Déco',
    cat: 'Artísticos',
    desc: 'ilustración ornamental estilo Art Déco de los años 20 con simetría geométrica, rayos dorados metálicos y elegancia verde esmeralda y azul marino',
    img: './imagenes/estilo-34-art-deco.jpg'
  },
  {
    id: 35,
    name: 'Bauhaus',
    cat: 'Artísticos',
    desc: 'diseño modernista estilo escuela Bauhaus con formas geométricas puras (círculos, triángulos y líneas) en colores primarios rojo, azul y amarillo',
    img: './imagenes/estilo-35-bauhaus.jpg'
  },
  {
    id: 36,
    name: 'Brutalismo',
    cat: '3D y Digital',
    desc: 'estética brutalista monolítica con volúmenes geométricos esculpidos en hormigón crudo, texturas minerales y fuerte claroscuro arquitectónico',
    img: './imagenes/estilo-36-brutalismo.jpg'
  },
  {
    id: 37,
    name: 'Line Art Minimalista',
    cat: 'Artísticos',
    desc: 'ilustración Line Art minimalista de trazos finos de tinta negra sobre fondo claro con delicados acentos de color pastel',
    img: './imagenes/estilo-37-line-art-minimalista.jpg'
  },
  {
    id: 38,
    name: 'Tinta Japonesa',
    cat: 'Artísticos',
    desc: 'pintura tradicional japonesa Sumi-e en tinta china negra con pinceladas caligráficas expresivas y aguadas suaves sobre papel de arroz',
    img: './imagenes/estilo-38-tinta-japonesa.jpg'
  },
  {
    id: 39,
    name: 'Chibi',
    cat: 'Videojuegos y Pop',
    desc: 'personaje estilo Chibi adorable de cabeza grande y cuerpo pequeño con ojos enormes brillantes y acabado 3D coleccionable',
    img: './imagenes/estilo-39-chibi.jpg'
  },
  {
    id: 40,
    name: 'Estilo Studio Ghibli (anime mágico)',
    cat: 'Videojuegos y Pop',
    desc: 'ilustración pictórica estilo Studio Ghibli con nubes esponjosas pintadas a mano, pradera soleada y atmósfera mágica',
    img: './imagenes/estilo-40-estilo-studio-ghibli-anime-magico.jpg'
  },
  {
    id: 41,
    name: 'Mandala / Lámina para colorear detallada',
    cat: 'Educativos',
    desc: 'ilustración detallada en blanco y negro con patrones mandala y zentangle florales lista para colorear',
    img: './imagenes/estilo-41-mandala-lamina-para-colorear-detallada.jpg'
  },
  {
    id: 42,
    name: 'Boceto a lápiz / grafito',
    cat: 'Educativos',
    desc: 'dibujo a mano alzada en lápiz grafito con trazos de sombreado suave sobre papel blanco con textura',
    img: './imagenes/estilo-42-boceto-a-lapiz-grafito.jpg'
  },
  {
    id: 43,
    name: 'Pizarra con tiza (Chalkboard)',
    cat: 'Educativos',
    desc: 'ilustración educativa dibujada con tizas blancas y de colores pastel sobre pizarra escolar verde oscuro',
    img: './imagenes/estilo-43-pizarra-con-tiza-chalkboard.jpg'
  },
  {
    id: 44,
    name: 'Sticker / Pegatina troquelada',
    cat: 'Educativos',
    desc: 'ilustración tipo sticker o pegatina troquelada con borde blanco grueso, colores vibrantes y sombra suave',
    img: './imagenes/estilo-44-sticker-pegatina-troquelada.jpg'
  },
  {
    id: 45,
    name: 'Estilo LEGO (bloques y minifiguras)',
    cat: 'Videojuegos y Pop',
    desc: 'escena 3D estilo LEGO construida completamente con ladrillos plásticos brillantes con espigas',
    img: './imagenes/estilo-45-estilo-lego-bloques-y-minifiguras.jpg'
  },
  {
    id: 46,
    name: 'Estilo Fortnite / 3D vibrante',
    cat: 'Videojuegos y Pop',
    desc: 'arte 3D estilizado estilo Fortnite con iluminación neón saturada, colores vibrantes y sombreado energético',
    img: './imagenes/estilo-46-estilo-fortnite-3d-vibrante.jpg'
  },
  {
    id: 47,
    name: 'Estilo Roblox (avatares geométricos)',
    cat: 'Videojuegos y Pop',
    desc: 'escena 3D colorida estilo Roblox con bloques geométricos lisos y estética lúdica moderna',
    img: './imagenes/estilo-47-estilo-roblox-avatares-geometricos.jpg'
  },
  {
    id: 48,
    name: 'Manga blanco y negro (entintado)',
    cat: 'Videojuegos y Pop',
    desc: 'ilustración de manga japonés en blanco y negro con líneas cinéticas, tramas de semitonos y entintado expresivo',
    img: './imagenes/estilo-48-manga-blanco-y-negro-entintado.jpg'
  },
  {
    id: 49,
    name: 'Animación 3D tipo Pixar / Disney',
    cat: 'Videojuegos y Pop',
    desc: 'render 3D cinematográfico estilo Pixar y Disney con pelaje detallado, ojos muy expresivos e iluminación cálida',
    img: './imagenes/estilo-49-animacion-3d-tipo-pixar-disney.jpg'
  },
  {
    id: 50,
    name: 'Estilo Los Simpson / animación plana',
    cat: 'Videojuegos y Pop',
    desc: 'ilustración de animación televisiva clásica en 2D con contornos negros limpios, ojos redondos y colores sólidos planos',
    img: './imagenes/estilo-50-estilo-los-simpson-animacion-plana.jpg'
  },
  {
    id: 51,
    name: 'Grafiti / Arte callejero (Street Art)',
    cat: 'Artísticos',
    desc: 'mural de grafiti urbano pintado con aerosol sobre pared de ladrillo, colores neón vibrantes y salpicaduras',
    img: './imagenes/estilo-51-grafiti-arte-callejero-street-art.jpg'
  },
  {
    id: 52,
    name: 'Vitral / Vidriera de colores',
    cat: 'Artísticos',
    desc: 'arte de vitral luminoso compuesto por fragmentos de vidrio translúcido de colores vibrantes unidos por plomo negro',
    img: './imagenes/estilo-52-vitral-vidriera-de-colores.jpg'
  },
  {
    id: 53,
    name: 'Arte Chicha / Cartel peruano vibrante',
    cat: 'Artísticos',
    desc: 'diseño artístico estilo arte chicha peruano con colores fosforescentes vibrantes, motivos florales andinos y alto contraste',
    img: './imagenes/estilo-53-arte-chicha-cartel-peruano-vibrante.jpg'
  },
  {
    id: 54,
    name: 'Origami geométrico',
    cat: 'Artísticos',
    desc: 'escena creada con figuras de papel doblado estilo origami con pliegues geométricos nítidos y sombras suaves de estudio',
    img: './imagenes/estilo-54-origami-geometrico.jpg'
  },
  {
    id: 55,
    name: 'Grabado en madera (Xilografía)',
    cat: 'Artísticos',
    desc: 'ilustración tradicional estilo grabado en madera o xilografía con tallado en tinta negra sobre papel crema',
    img: './imagenes/estilo-55-grabado-en-madera-xilografia.jpg'
  },
  {
    id: 56,
    name: 'Vaporwave / Synthwave retro 80s',
    cat: '3D y Digital',
    desc: 'estética retrofuturista synthwave de los años 80 con sol de neón rayado, cuadrícula láser y paleta magenta-cian',
    img: './imagenes/estilo-56-vaporwave-synthwave-retro-80s.jpg'
  },
  {
    id: 57,
    name: 'Arte Steampunk (bronce y engranajes)',
    cat: '3D y Digital',
    desc: 'ilustración steampunk victoriana con gafas de latón, engranajes de relojería en cobre, tuberías y vapor cálido',
    img: './imagenes/estilo-57-arte-steampunk-bronce-y-engranajes.jpg'
  },
  {
    id: 58,
    name: 'Arte Kawaii tierno pastel',
    cat: '3D y Digital',
    desc: 'ilustración japonesa kawaii adorable con paleta de colores pastel suaves, mejillas sonrojadas y destellos',
    img: './imagenes/estilo-58-arte-kawaii-tierno-pastel.jpg'
  },
  {
    id: 59,
    name: 'Fotografía vintage Polaroid años 80',
    cat: 'Fotografía',
    desc: 'fotografía analógica vintage estilo Polaroid de los años 80 con tonos cálidos nostálgicos y grano suave de película',
    img: './imagenes/estilo-59-fotografia-vintage-polaroid-anos-80.jpg'
  },
  {
    id: 60,
    name: 'Fotografía blanco y negro dramática',
    cat: 'Fotografía',
    desc: 'fotografía artística en blanco y negro de alto contraste con iluminación dramática y sombras profundas',
    img: './imagenes/estilo-60-fotografia-blanco-y-negro-dramatica.jpg'
  },
  {
    id: 61,
    name: 'Solarpunk botánico futurista',
    cat: '3D y Digital',
    desc: 'ilustración ecológica estilo Solarpunk con arquitectura de vidrio soleado, jardines verticales exuberantes, energía limpia y atmósfera luminosa optimista',
    img: './imagenes/estilo-61-solarpunk-botanico.jpg'
  },
  {
    id: 62,
    name: 'Fotografía aérea con dron',
    cat: 'Fotografía',
    desc: 'fotografía aérea cenital capturada desde dron mostrando el claro del bosque desde las alturas con luz natural',
    img: './imagenes/estilo-62-fotografia-aerea-con-dron.jpg'
  },
  {
    id: 63,
    name: 'Pintura Gouache editorial',
    cat: 'Artísticos',
    desc: 'pintura en gouache mate opaco de ilustración editorial moderna con pinceladas aterciopeladas, bordes orgánicos y paleta rica y cálida',
    img: './imagenes/estilo-63-pintura-gouache-editorial.jpg'
  },
  {
    id: 64,
    name: 'Pizarra blanca con plumones',
    cat: 'Educativos',
    desc: 'dibujo educativo colorido trazado con plumones de pizarra blanca, flechas didácticas y esquemas limpios de aula',
    img: './imagenes/estilo-64-pizarra-blanca-plumones.jpg'
  },
  {
    id: 65,
    name: 'Libro de texto ilustrado',
    cat: 'Educativos',
    desc: 'ilustración pedagógica de enciclopedia y libro de texto escolar moderno con contornos nítidos y colores cálidos didácticos',
    img: './imagenes/estilo-65-libro-texto-ilustrado.jpg'
  },
  {
    id: 66,
    name: 'Flashcard / Tarjeta didáctica',
    cat: 'Educativos',
    desc: 'diseño educativo minimalista tipo tarjeta didáctica o flashcard escolar con formas redondeadas limpias, fondo crema y alto contraste',
    img: './imagenes/estilo-66-flashcard-tarjeta-didactica.jpg'
  },
  {
    id: 67,
    name: 'Cuaderno de apuntes (Sketchnote)',
    cat: 'Educativos',
    desc: 'ilustración estilo sketchnote dibujada con bolígrafo negro y resaltadores pastel amarillo y menta sobre hoja cuadriculada de cuaderno',
    img: './imagenes/estilo-67-cuaderno-apuntes-sketchnote.jpg'
  },
  {
    id: 68,
    name: 'Collage de recortes de revistas',
    cat: 'Educativos',
    desc: 'collage artístico artesanal hecho con recortes de papel y revistas pegados a mano, texturas impresas mixtas y sombras sutiles de capas',
    img: './imagenes/estilo-68-collage-revistas-recortadas.jpg'
  },
  {
    id: 69,
    name: 'Fieltro y bordado a mano',
    cat: 'Educativos',
    desc: 'escultura tierna confeccionada en tela de fieltro suave cosida a mano con puntadas visibles de hilo y textura textil acogedora',
    img: './imagenes/estilo-69-fieltro-bordado-mano.jpg'
  },
  {
    id: 70,
    name: 'Tejido Crochet / Amigurumi',
    cat: '3D y Digital',
    desc: 'muñeco artesanal tejido a mano en lana crochet estilo amigurumi con puntos de estambre detallados, fibras suaves y luz de estudio',
    img: './imagenes/estilo-70-tejido-crochet-amigurumi.jpg'
  },
  {
    id: 71,
    name: 'Kirigami / Libro Pop-Up 3D',
    cat: 'Artísticos',
    desc: 'escena tridimensional de papel plegado y troquelado estilo libro pop-up 3D artesanal con cartulinas en capas y sombras delicadas',
    img: './imagenes/estilo-71-kirigami-libro-popup-3d.jpg'
  },
  {
    id: 72,
    name: 'Caricatura retro años 80 (VHS)',
    cat: 'Videojuegos y Pop',
    desc: 'animación televisiva clásica de los años 80 en acetato con sombreado cel-shading cálido saturado, halo suave y grano nostálgico VHS',
    img: './imagenes/estilo-72-caricatura-retro-anos-80-vhs.jpg'
  },
  {
    id: 73,
    name: 'Póster aerógrafo años 80',
    cat: 'Artísticos',
    desc: 'ilustración retro de los años 80 pintada con aerógrafo, destellos estelares cromados, atardecer vibrante y acabado brillante tipo arcade',
    img: './imagenes/estilo-73-poster-aerografo-anos-80.jpg'
  },
  {
    id: 74,
    name: 'Diseño Memphis años 80',
    cat: 'Artísticos',
    desc: 'arte gráfico vibrante estilo Memphis de los años 80 con patrones geométricos juguetones, zigzags, confeti pop y colores turquesa, rosa y amarillo',
    img: './imagenes/estilo-74-diseno-memphis-anos-80.jpg'
  },
  {
    id: 75,
    name: 'Carta coleccionable holográfica (TCG)',
    cat: 'Videojuegos y Pop',
    desc: 'ilustración fantástica estilo carta coleccionable holográfica con marco dorado brillante, destellos prismáticos arcoíris y arte dinámico',
    img: './imagenes/estilo-75-carta-coleccionable-holografica.jpg'
  },
  {
    id: 76,
    name: 'Estilo Animal Crossing (3D tierno)',
    cat: 'Videojuegos y Pop',
    desc: 'escena 3D acogedora y tierna estilo Animal Crossing con proporciones redondeadas, texturas mate pastel, florecitas y luz alegre de día',
    img: './imagenes/estilo-76-estilo-animal-crossing-3d.jpg'
  },
  {
    id: 77,
    name: 'Estilo Cuphead / Rubber Hose años 30',
    cat: 'Videojuegos y Pop',
    desc: 'animación vintage de los años 30 estilo Rubber Hose y Cuphead con ojos clásicos en cuña, guantes blancos, tonos sepia y textura de película antigua',
    img: './imagenes/estilo-77-estilo-cuphead-rubber-hose.jpg'
  },
  {
    id: 78,
    name: 'Arte Huichol en chaquiras',
    cat: 'Artísticos',
    desc: 'arte popular mexicano Huichol recubierto de miles de diminutas cuentas y chaquiras de vidrio formando espirales solares y patrones geométricos vibrantes',
    img: './imagenes/estilo-78-arte-huichol-chaquiras.jpg'
  },
  {
    id: 79,
    name: 'Juego Indie Cel-Shading (Aventura)',
    cat: 'Videojuegos y Pop',
    desc: 'arte 3D pintado a mano estilo videojuego indie cel-shading con contornos delicados, pradera vibrante y nubes pictóricas luminosas',
    img: './imagenes/estilo-79-juego-indie-cel-shading.jpg'
  },
  {
    id: 80,
    name: 'Mosaico de cerámica (Trencadís)',
    cat: 'Artísticos',
    desc: 'mosaico artístico estilo trencadís compuesto por piezas de cerámica brillante esmaltada en colores vivos unidas por juntas claras',
    img: './imagenes/estilo-80-mosaico-ceramica-trencadis.jpg'
  },
  {
    id: 81,
    name: 'Puntillismo artístico',
    cat: 'Artísticos',
    desc: 'pintura neoimpresionista en técnica de puntillismo formada íntegramente por miles de pequeños puntos luminosos de color puro',
    img: './imagenes/estilo-81-puntillismo-artistico.jpg'
  },
  {
    id: 82,
    name: 'Grabado Ukiyo-e japonés',
    cat: 'Artísticos',
    desc: 'estampa tradicional japonesa Ukiyo-e sobre papel washi con contornos fluidos de tinta sumi, olas estilizadas y pigmentos minerales planos',
    img: './imagenes/estilo-82-grabado-ukiyo-e-japones.jpg'
  },
  {
    id: 83,
    name: 'Pastel seco sobre papel oscuro',
    cat: 'Artísticos',
    desc: 'dibujo artístico con tizas pastel secas aterciopeladas sobre cartulina azul noche texturizada, trazos luminosos y difuminado cálido',
    img: './imagenes/estilo-83-pastel-seco-papel-oscuro.jpg'
  },
  {
    id: 84,
    name: 'Juguete de vinilo 3D (Designer Toy)',
    cat: '3D y Digital',
    desc: 'figura coleccionable 3D de vinilo mate estilo designer toy con volúmenes lisos estilizados, acabado impecable e iluminación de estudio',
    img: './imagenes/estilo-84-juguete-vinilo-3d-designer-toy.jpg'
  },
  {
    id: 85,
    name: 'Escultura de cristal / vidrio soplado',
    cat: '3D y Digital',
    desc: 'escultura translúcida en cristal soplado brillante con curvas suaves, cáusticas luminosas y destellos prismáticos arcoíris',
    img: './imagenes/estilo-85-escultura-cristal-vidrio-soplado.jpg'
  },
  {
    id: 86,
    name: 'Fotografía miniatura Tilt-Shift',
    cat: 'Fotografía',
    desc: 'fotografía realista con lente Tilt-Shift de efecto maqueta miniatura, enfoque selectivo extremo y colores vibrantes tipo diorama real',
    img: './imagenes/estilo-86-fotografia-miniatura-tilt-shift.jpg'
  },
  {
    id: 87,
    name: 'Fotografía cinematográfica 35mm',
    cat: 'Fotografía',
    desc: 'fotograma cinematográfico capturado en película analógica de 35mm con grano fílmico orgánico, profundidad natural y bokeh auténtico',
    img: './imagenes/estilo-87-fotografia-cinematografica-35mm.jpg'
  },
  {
    id: 88,
    name: 'Porcelana azul y blanca (Talavera)',
    cat: 'Artísticos',
    desc: 'figurilla artesanal de porcelana blanca esmaltada decorada con intrincados motivos florales pintados a mano en azul cobalto brillante',
    img: './imagenes/estilo-88-porcelana-azul-blanca.jpg'
  },
  {
    id: 89,
    name: 'Cianotipia botánica (Azul de Prusia)',
    cat: 'Fotografía',
    desc: 'impresión fotográfica artesanal en cianotipia de azul de Prusia profundo con siluetas botánicas blancas luminosas y textura de papel algodón',
    img: './imagenes/estilo-89-cianotipia-botanica.jpg'
  },
  {
    id: 90,
    name: 'Bola de nieve / Terrario de cristal',
    cat: '3D y Digital',
    desc: 'escena mágica miniatura encapsulada dentro de una esfera de cristal brillante tipo bola de nieve con base de madera tallada y copos luminosos',
    img: './imagenes/estilo-90-bola-nieve-terrario.jpg'
  },
  {
    id: 91,
    name: 'Peluche Kawaii 3D (Plushie)',
    cat: '3D y Digital',
    desc: 'render 3D ultra suave de muñeco de peluche mullido con textura afelpada de microfibra, costuras delicadas, ojos de botón brillantes e iluminación cálida',
    img: './imagenes/estilo-91-peluche-kawaii-3d.jpg'
  },
  {
    id: 92,
    name: 'Juguete de madera tallada artesanal',
    cat: 'Educativos',
    desc: 'figura tradicional esculpida a mano en madera natural con vetas visibles, pintura ecológica mate y bordes lijados estilo juguete Montessori',
    img: './imagenes/estilo-92-madera-tallada-artesanal.jpg'
  },
  {
    id: 93,
    name: 'Cartografía / Mapa antiguo ilustrado',
    cat: 'Educativos',
    desc: 'ilustración histórica dibujada en tinta sepia sobre pergamino antiguo con rosa de los vientos, líneas topográficas y estética de mapa de exploradores',
    img: './imagenes/estilo-93-cartografia-mapa-antiguo.jpg'
  },
  {
    id: 94,
    name: 'Alebrije oaxaqueño multicolor',
    cat: 'Artísticos',
    desc: 'escultura folclórica mexicana estilo alebrije pintada a mano con patrones psicodélicos finísimos en turquesa, magenta, dorado y amarillo vibrante',
    img: './imagenes/estilo-94-alebrije-oaxaqueno.jpg'
  },
  {
    id: 95,
    name: 'Bordado en punto de cruz (Tapiz)',
    cat: 'Educativos',
    desc: 'arte textil artesanal bordado a mano en punto de cruz con hilos de colores sobre tela de lino crema tensada en bastidor circular de madera',
    img: './imagenes/estilo-95-bordado-punto-cruz.jpg'
  },
  {
    id: 96,
    name: 'Póster psicodélico años 70',
    cat: 'Artísticos',
    desc: 'cartel artístico retro de los años 70 con ondas líquidas psicodélicas, espirales hipnóticas y paleta cálida mostaza, mandarina, magenta y turquesa',
    img: './imagenes/estilo-96-poster-psicodelico-70s.jpg'
  },
  {
    id: 97,
    name: 'Videojuego retro PS1 años 90',
    cat: 'Videojuegos y Pop',
    desc: 'gráficos 3D nostálgicos estilo consola PlayStation 1 de finales de los años 90 con polígonos facetados, texturas pixeladas suaves y encanto clásico',
    img: './imagenes/estilo-97-retro-ps1-90s.jpg'
  },
  {
    id: 98,
    name: 'Estilo Paper Mario 2.5D',
    cat: 'Videojuegos y Pop',
    desc: 'escena 2.5D estilo Paper Mario con personajes planos de cartulina blanca troquelada de pie sobre un diorama teatral colorido de papel doblado',
    img: './imagenes/estilo-98-paper-mario-25d.jpg'
  },
  {
    id: 99,
    name: 'Cuento nórdico de invierno',
    cat: 'Educativos',
    desc: 'ilustración escandinava acogedora de libro de invierno con paleta azul hielo, rojo arándano y ocre, nieve delicada y atmósfera cálida de fábula',
    img: './imagenes/estilo-99-cuento-nordico-invierno.jpg'
  },
  {
    id: 100,
    name: 'Escultura de mármol de Carrara',
    cat: 'Artísticos',
    desc: 'escultura clásica monumental tallada en mármol blanco de Carrara con vetas grises naturales, volúmenes refinados e iluminación dramática de museo',
    img: './imagenes/estilo-100-escultura-marmol-carrara.jpg'
  },
  {
    id: 101,
    name: 'Linograbado bicolor artesanal',
    cat: 'Artísticos',
    desc: 'estampa artística impresa en linograbado de dos tintas (terracota y azul noche) sobre papel de algodón crema con cortes de gubia expresivos',
    img: './imagenes/estilo-101-linograbado-bicolor.jpg'
  },
  {
    id: 102,
    name: 'Fotografía infrarroja (Aerochrome)',
    cat: 'Fotografía',
    desc: 'fotografía artística surrealista en película infrarroja Kodak Aerochrome donde la vegetación brilla en rojo carmesí y rosa intenso bajo cielo turquesa',
    img: './imagenes/estilo-102-fotografia-infrarroja-aerochrome.jpg'
  },
  {
    id: 103,
    name: 'Vidrio esmerilado 3D (Glassmorphism)',
    cat: '3D y Digital',
    desc: 'diseño 3D futurista en vidrio esmerilado translúcido estilo glassmorphism con refracciones suaves, gradientes pastel holográficos y luz de estudio limpia',
    img: './imagenes/estilo-103-vidrio-esmerilado-glassmorphism.jpg'
  },
  {
    id: 104,
    name: 'Art Nouveau ornamental (Mucha)',
    cat: 'Artísticos',
    desc: 'ilustración decorativa estilo Art Nouveau inspirada en Alphonse Mucha con marco circular dorado botánico, lirios, curvas orgánicas sinuosas y tonos joya suaves',
    img: './imagenes/estilo-104-art-nouveau-mucha.jpg'
  },
  {
    id: 105,
    name: 'Cerámica Kintsugi con oro',
    cat: 'Artísticos',
    desc: 'escultura minimalista de cerámica oscura y marfil mate reparada con la técnica japonesa Kintsugi de grietas y vetas relucientes en oro de 24 quilates',
    img: './imagenes/estilo-105-ceramica-kintsugi-dorada.jpg'
  },
  {
    id: 106,
    name: 'Piñata artesanal / Papel crepé',
    cat: 'Educativos',
    desc: 'escultura festiva artesanal estilo piñata hecha de capas de tiras flecadas de papel crepé y papel de china en colores alegres y textura manual',
    img: './imagenes/estilo-106-pinata-artesanal-papel-mache.jpg'
  },
  {
    id: 107,
    name: 'Tatuaje tradicional (Old School)',
    cat: 'Artísticos',
    desc: 'ilustración estilo tatuaje tradicional Old School con contornos negros gruesos, sombreado clásico, rosas rojas, cintas decorativas y paleta vintage sobre papel crema',
    img: './imagenes/estilo-107-tatuaje-tradicional-old-school.jpg'
  },
  {
    id: 108,
    name: 'Holograma Sci-Fi Neón',
    cat: '3D y Digital',
    desc: 'proyección holográfica 3D futurista en cian eléctrico y magenta neón con malla digital translúcida, líneas de escaneo y partículas luminosas flotando sobre emisor sci-fi',
    img: './imagenes/estilo-108-holograma-scifi-neon.jpg'
  },
  {
    id: 109,
    name: 'Escultura de cartón corrugado',
    cat: 'Educativos',
    desc: 'maqueta artesanal 3D construida con capas troqueladas de cartón corrugado marrón y papel kraft mostrando los bordes acanalados y sombras cálidas de estudio',
    img: './imagenes/estilo-109-diorama-carton-corrugado.jpg'
  },
];
