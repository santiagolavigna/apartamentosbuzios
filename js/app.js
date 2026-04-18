(function () {
  "use strict";

  const MAPS_URL = "https://maps.app.goo.gl/TqTyCGyZawfFK2uf8";
  /* Same coordinates as MAPS_URL (resolved from maps.app.goo.gl short link) */
  const MAP_EMBED_SRC =
    "https://maps.google.com/maps?q=-22.763825,-41.891617&hl=pt&z=13&output=embed&iwloc=near";

  /* One SVG per amenity row (ES order); same icons for all languages */
  const AMENITY_ICON_SVGS = [
    /* huéspedes */
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    /* baño */
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-4-7-13-7-13S5 11 5 15a7 7 0 0 0 7 7z"/></svg>',
    /* cocina */
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z"/><path d="M8 10V8a4 4 0 0 1 8 0v2"/><path d="M9 6V4"/><path d="M15 6V4"/></svg>',
    /* sala */
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="M15 22v-4a2 2 0 0 1 2-2h4"/><path d="M15 2v6"/></svg>',
    /* aire acondicionado */
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.8 19.6A2 2 0 1 1 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/></svg>',
    /* TV + WiFi */
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="14" height="11" rx="1"/><path d="M6 21h4"/><path d="M8 16v5"/><path d="M17 8a5 5 0 0 1 5 5"/><path d="M17 11a2 2 0 0 1 2 2"/><path d="M17 14h.01"/></svg>',
    /* ropa de cama */
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h20a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/></svg>',
    /* quincho / exterior */
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c-2 2.5-5 5-5 9a5 5 0 0 0 10 0c0-4-3-6.5-5-9Z"/><path d="M12 22v-7"/><path d="M8 22h8"/><path d="M5 12h2"/><path d="M17 12h2"/></svg>',
  ];

  const STORAGE_KEY = "abu-lang";

  const STR = {
    es: {
      pageTitle: "Apartamentos Búzios | Naturaleza y modernidad",
      brand: "Apartamentos Búzios",
      navProperties: "Propiedades",
      navAmenities: "Comodidades",
      navHost: "Anfitriona",
      navBuzios: "Búzios",
      navLocation: "Ubicación",
      navBook: "Reservar",
      heroKicker: "Armação dos Búzios, Brasil",
      heroTitle: "Tu refugio ideal entre el verde y el mar",
      heroSubtitle: "Apartamentos para cuatro personas en el corazón de Búzios",
      heroCta: "Consultar por WhatsApp",
      heroSecondary: "Instagram",
      sectionPropertiesEyebrow: "Estancias",
      sectionPropertiesTitle: "Diferentes apartamentos, misma esencia",
      sectionPropertiesLead:
        "Cada unidad tiene identidad propia. Elegí la tuya y recorré el espacio en 360° en las unidades con tour virtual.",
      cardEterName: "Apartamento Eter",
      cardEterTag: "Luz matutina, patio y aire de casa de playa.",
      cardAquaName: "Apartamento Aqua",
      cardAquaTag: "Tonos de mar, espacios frescos y calma costera.",
      cardTerraName: "Apartamento Terra",
      cardTerraTag: "Piedra, madera y jardín que abraza la casa.",
      cardArName: "Apartamento Ar",
      cardArTag: "Terrazas altas, brisa y copas de árboles alrededor.",
      cardFogoName: "Apartament Fogo",
      cardFogoTag: "Espacios cálidos para vivir Búzios a tu ritmo.",
      cardTour: "Tour virtual 360°",
      carouselPrev: "Foto anterior",
      carouselNext: "Foto siguiente",
      carouselDotsGroup: "Fotos del apartamento",
      sectionAmenitiesEyebrow: "Incluido",
      sectionAmenitiesTitle: "Todo lo esencial para una estadía cómoda",
      sectionAmenitiesLead:
        "Mismas comodidades en cada apartamento, pensadas para desconectar sin renunciar a lo práctico.",
      amenities: [
        "Capacidad hasta 4 personas",
        "1 baño completo",
        "Cocina con utensilios",
        "Sala de estar",
        "Aire acondicionado",
        "TV y WiFi",
        "Recambio de sábanas y toallas",
        "Quincho y quinta amplia",
      ],
      sectionHostEyebrow: "Anfitriona",
      sectionHostTitle: "Mariana te recibe",
      hostBio: [
        "¡Hola! Soy Mariana. Vivo en Búzios hace 30 años: vine de vacaciones y nunca más pude despegar de este lugar maravilloso que, además de sus bellezas naturales, me abrió sus puertas y me dio todo lo que tengo en la vida.",
        "Amo Búzios, amo mi familia buziana: sin dudas es mi lugar en el mundo.",
        "Me encanta que vengan a conocerlo; los recibo con los brazos abiertos, como lo hace este maravilloso lugar.",
        "Casi 20 años recibiendo huéspedes me llenaron de alegría y de personas hoy grandes amigos. Es una hermosa oportunidad poder recibirlos.",
      ],
      momentsTitle: "Búzios en imágenes",
      buziosTitle: "Un pueblo que se vive despacio",
      buziosText:
        "Entre playas, colinas y una energía única, Búzios invita a caminar sin prisa. Nuestro complejo está en un barrio tranquilo, a pocos minutos del ritmo del centro, de la playa y del silencio de la naturaleza.",
      sectionLocationEyebrow: "Barrio",
      sectionLocationTitle: "¿Dónde estamos?",
      mapLinkAria: "Abrir ubicación en Google Maps",
      waFabLabel: "Escribinos por WhatsApp",
      footerFollow: "Seguinos",
      footerRights: "Apartamentos Búzios. Todos los derechos reservados.",
    },
    en: {
      pageTitle: "Apartamentos Búzios | Nature and modern comfort",
      brand: "Apartamentos Búzios",
      navProperties: "Properties",
      navAmenities: "Amenities",
      navHost: "Your host",
      navBuzios: "Búzios",
      navLocation: "Location",
      navBook: "Book",
      heroKicker: "Armação dos Búzios, Brazil",
      heroTitle: "Your ideal retreat between greenery and the sea",
      heroSubtitle: "Apartments for four guests in the heart of Búzios",
      heroCta: "Message on WhatsApp",
      heroSecondary: "Instagram",
      sectionPropertiesEyebrow: "Stays",
      sectionPropertiesTitle: "Different apartments, one same spirit",
      sectionPropertiesLead:
        "Each unit has its own personality. Choose yours and explore in 360° where a virtual tour is available.",
      cardEterName: "Apartamento Eter",
      cardEterTag: "Morning light, patio, and that easy beach-house breeze.",
      cardAquaName: "Apartamento Aqua",
      cardAquaTag: "Ocean hues, fresh spaces, and coastal calm.",
      cardTerraName: "Apartamento Terra",
      cardTerraTag: "Stone, wood, and a garden that wraps around the home.",
      cardArName: "Apartamento Ar",
      cardArTag: "Upper terraces, tree canopies, and the wind off the hills.",
      cardFogoName: "Apartament Fogo",
      cardFogoTag: "Warm spaces to enjoy Búzios at your own pace.",
      cardTour: "360° virtual tour",
      carouselPrev: "Previous photo",
      carouselNext: "Next photo",
      carouselDotsGroup: "Apartment photos",
      sectionAmenitiesEyebrow: "Included",
      sectionAmenitiesTitle: "Everything you need for a relaxed stay",
      sectionAmenitiesLead:
        "The same thoughtful comforts in every apartment—so you can unplug without giving up practicality.",
      amenities: [
        "Up to 4 guests",
        "1 full bathroom",
        "Kitchen with utensils",
        "Living room",
        "Air conditioning",
        "TV and Wi‑Fi",
        "Linens and towels",
        "BBQ and spacious garden",
      ],
      sectionHostEyebrow: "Host",
      sectionHostTitle: "Mariana welcomes you",
      hostBio: [
        "Hi! I'm Mariana. I've lived in Búzios for 30 years—I came on holiday and never really left this wonderful place that, beyond its natural beauty, opened its doors and gave me everything I have in life.",
        "I love Búzios and my Búzios family; without a doubt, this is my place in the world.",
        "I love that people come to discover it—I welcome you with open arms, just like this special town does.",
        "Nearly 20 years hosting guests has filled me with joy and with people who are great friends today. It's a privilege to welcome you.",
      ],
      momentsTitle: "Búzios in frames",
      buziosTitle: "A town meant to be lived slowly",
      buziosText:
        "Between beaches, hills, and a singular energy, Búzios invites you to wander without rush. Our complex sits in a quiet neighborhood, minutes from the pace of the centre, the beach, and the silence of nature.",
      sectionLocationEyebrow: "Neighborhood",
      sectionLocationTitle: "Where are we?",
      mapLinkAria: "Open location in Google Maps",
      waFabLabel: "Message us on WhatsApp",
      footerFollow: "Follow us",
      footerRights: "Apartamentos Búzios. All rights reserved.",
    },
    pt: {
      pageTitle: "Apartamentos Búzios | Natureza e conforto moderno",
      brand: "Apartamentos Búzios",
      navProperties: "Propriedades",
      navAmenities: "Comodidades",
      navHost: "Anfitriã",
      navBuzios: "Búzios",
      navLocation: "Localização",
      navBook: "Reservar",
      heroKicker: "Armação dos Búzios, Brasil",
      heroTitle: "O seu refúgio ideal entre o verde e o mar",
      heroSubtitle: "Apartamentos para quatro pessoas no coração de Búzios",
      heroCta: "Falar no WhatsApp",
      heroSecondary: "Instagram",
      sectionPropertiesEyebrow: "Estadias",
      sectionPropertiesTitle: "Apartamentos diferentes, a mesma essência",
      sectionPropertiesLead:
        "Cada unidade tem personalidade própria. Escolha a sua e percorra o espaço em 360° nas unidades com tour virtual.",
      cardEterName: "Apartamento Eter",
      cardEterTag: "Luz da manhã, quintal e clima de casa de praia.",
      cardAquaName: "Apartamento Aqua",
      cardAquaTag: "Tons de mar, ambientes frescos e calma costeira.",
      cardTerraName: "Apartamento Terra",
      cardTerraTag: "Pedra, madeira e jardim que abraça a casa.",
      cardArName: "Apartamento Ar",
      cardArTag: "Varandas altas, brisa e copas das árvores ao redor.",
      cardFogoName: "Apartament Fogo",
      cardFogoTag: "Ambientes acolhedores para viver Búzios no seu ritmo.",
      cardTour: "Tour virtual 360°",
      carouselPrev: "Foto anterior",
      carouselNext: "Próxima foto",
      carouselDotsGroup: "Fotos do apartamento",
      sectionAmenitiesEyebrow: "Incluso",
      sectionAmenitiesTitle: "Tudo o essencial para uma estadia leve",
      sectionAmenitiesLead:
        "As mesmas comodidades em cada apartamento—para desligar sem abrir mão do prático.",
      amenities: [
        "Até 4 pessoas",
        "1 banheiro completo",
        "Cozinha com utensílios",
        "Sala de estar",
        "Ar-condicionado",
        "TV e Wi‑Fi",
        "Troca de lençóis e toalhas",
        "Churrasqueira e quintal amplo",
      ],
      sectionHostEyebrow: "Anfitriã",
      sectionHostTitle: "Mariana recebe você",
      hostBio: [
        "Olá! Sou a Mariana. Moro em Búzios há 30 anos: vim de férias e nunca mais consegui me desgrudar deste lugar maravilhoso que, além das belezas naturais, me abriu as portas e me deu tudo o que tenho na vida.",
        "Amo Búzios, amo minha família buziana—sem dúvida é o meu lugar no mundo.",
        "Adoro que venham conhecê-lo; recebo todos de braços abertos, como este lugar faz.",
        "Quase 20 anos recebendo hóspedes me encheram de alegria e de pessoas que hoje são grandes amigos. É uma linda oportunidade recebê-los.",
      ],
      momentsTitle: "Búzios em imagens",
      buziosTitle: "Uma cidade para viver devagar",
      buziosText:
        "Entre praias, morros e uma energia única, Búzios convida a caminhar sem pressa. Nosso conjunto fica num bairro tranquilo, a poucos minutos do ritmo do centro, da praia e do silêncio da natureza.",
      sectionLocationEyebrow: "Bairro",
      sectionLocationTitle: "Onde estamos?",
      mapLinkAria: "Abrir localização no Google Maps",
      waFabLabel: "Fale conosco no WhatsApp",
      footerFollow: "Siga-nos",
      footerRights: "Apartamentos Búzios. Todos os direitos reservados.",
    },
    it: {
      pageTitle: "Apartamentos Búzios | Natura e comfort moderno",
      brand: "Apartamentos Búzios",
      navProperties: "Alloggi",
      navAmenities: "Servizi",
      navHost: "Ospitante",
      navBuzios: "Búzios",
      navLocation: "Mappa",
      navBook: "Prenota",
      heroKicker: "Armação dos Búzios, Brasile",
      heroTitle: "Il tuo rifugio ideale tra il verde e il mare",
      heroSubtitle: "Appartamenti per quattro persone nel cuore di Búzios",
      heroCta: "Scrivici su WhatsApp",
      heroSecondary: "Instagram",
      sectionPropertiesEyebrow: "Soggiorni",
      sectionPropertiesTitle: "Appartamenti diversi, la stessa anima",
      sectionPropertiesLead:
        "Ogni unità ha un carattere proprio. Scegli la tua e esplora lo spazio a 360° dove è disponibile il tour virtuale.",
      cardEterName: "Apartamento Eter",
      cardEterTag: "Luce del mattino, patio e aria da casa al mare.",
      cardAquaName: "Apartamento Aqua",
      cardAquaTag: "Tonalità marine, spazi freschi e calma costiera.",
      cardTerraName: "Apartamento Terra",
      cardTerraTag: "Pietra, legno e giardino che avvolge la casa.",
      cardArName: "Apartamento Ar",
      cardArTag: "Terrazze alte, brezza e chiome degli alberi intorno.",
      cardFogoName: "Apartament Fogo",
      cardFogoTag: "Spazi caldi per vivere Búzios al tuo ritmo.",
      cardTour: "Tour virtuale 360°",
      carouselPrev: "Foto precedente",
      carouselNext: "Foto successiva",
      carouselDotsGroup: "Foto dell’appartamento",
      sectionAmenitiesEyebrow: "Incluso",
      sectionAmenitiesTitle: "Tutto l’essenziale per un soggiorno sereno",
      sectionAmenitiesLead:
        "Le stesse comodità in ogni appartamento—per staccare la spina senza rinunciare al pratico.",
      amenities: [
        "Fino a 4 persone",
        "1 bagno completo",
        "Cucina con utensili",
        "Soggiorno",
        "Aria condizionata",
        "TV e Wi‑Fi",
        "Cambio lenzuola e asciugamani",
        "Barbecue e ampio giardino",
      ],
      sectionHostEyebrow: "Host",
      sectionHostTitle: "Mariana vi accoglie",
      hostBio: [
        "Ciao! Sono Mariana. Vivo a Búzios da 30 anni: sono arrivata in vacanza e non sono più riuscita a staccarmi da questo posto meraviglioso che, oltre alle sue bellezze naturali, mi ha aperto le porte e mi ha dato tutto ciò che ho nella vita.",
        "Amo Búzios, amo la mia famiglia buziana—senza dubbio è il mio posto nel mondo.",
        "Mi piace che veniate a scoprirlo; vi accolgo a braccia aperte, come fa questo luogo speciale.",
        "Quasi 20 anni di ospiti mi hanno riempito di gioia e di persone che oggi sono grandi amici. È una bellissima opportunità accogliervi.",
      ],
      momentsTitle: "Búzios in immagini",
      buziosTitle: "Un paese da vivere con calma",
      buziosText:
        "Tra spiagge, colline e un’energia unica, Búzios invita a passeggiare senza fretta. Il nostro complesso si trova in un quartiere tranquillo, a pochi minuti dal ritmo del centro, dalla spiaggia e dal silenzio della natura.",
      sectionLocationEyebrow: "Quartiere",
      sectionLocationTitle: "Dove siamo?",
      mapLinkAria: "Apri la posizione in Google Maps",
      waFabLabel: "Scrivici su WhatsApp",
      footerFollow: "Seguici",
      footerRights: "Apartamentos Búzios. Tutti i diritti riservati.",
    },
  };

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && STR[saved]) return saved;
    const nav = navigator.language || "es";
    if (nav.startsWith("pt")) return "pt";
    if (nav.startsWith("it")) return "it";
    if (nav.startsWith("en")) return "en";
    return "es";
  }

  function setLang(lang) {
    if (!STR[lang]) return;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang =
      lang === "pt" ? "pt-BR" : lang === "en" ? "en" : lang === "it" ? "it" : "es";
    applyStrings(lang);
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });
  }

  function applyStrings(lang) {
    const t = STR[lang];
    document.title = t.pageTitle;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (key && t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-aria");
      if (key && t[key] !== undefined) {
        el.setAttribute("aria-label", t[key]);
      }
    });

    const list = document.getElementById("amenitiesList");
    if (list && Array.isArray(t.amenities)) {
      list.innerHTML = t.amenities
        .map(function (item, idx) {
          var icon =
            AMENITY_ICON_SVGS[idx] ||
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" aria-hidden="true"><circle cx="12" cy="12" r="3"/></svg>';
          return (
            '<li><span class="amenities__icon">' +
            icon +
            '</span><span class="amenities__label">' +
            item +
            "</span></li>"
          );
        })
        .join("");
    }

    const hostBio = document.getElementById("hostBio");
    if (hostBio && Array.isArray(t.hostBio)) {
      hostBio.innerHTML = t.hostBio
        .map(function (p) {
          return "<p>" + p + "</p>";
        })
        .join("");
    }

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key && t[key]) el.setAttribute("title", t[key]);
    });

    var fab = document.querySelector(".wa-fab");
    if (fab && t.waFabLabel) {
      fab.setAttribute("aria-label", t.waFabLabel);
    }
  }

  function initLangButtons() {
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
    setLang(getLang());
  }

  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initParallax() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const back = document.querySelector(".hero__img-back");
    const buziosParallax = document.querySelector(".buzios-band__overlay");

    function onScroll() {
      const y = window.scrollY;
      if (back) {
        back.style.transform = "translate3d(0, " + y * 0.35 + "px, 0) scale(1.08)";
      }
      if (buziosParallax) {
        const band = document.querySelector(".buzios-band");
        if (band) {
          const rect = band.getBoundingClientRect();
          const vh = window.innerHeight || 1;
          const progress = 1 - (rect.top + rect.height * 0.35) / (vh + rect.height);
          const clamped = Math.max(0, Math.min(1, progress));
          buziosParallax.style.transform =
            "translate3d(0, " + (clamped - 0.5) * 80 + "px, 0) scale(1.1)";
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initCardCarousels() {
    document.querySelectorAll("[data-card-carousel]").forEach(function (root) {
      var track = root.querySelector(".card-carousel__track");
      var slides = root.querySelectorAll(".card-carousel__slide");
      var prevBtn = root.querySelector("[data-carousel-prev]");
      var nextBtn = root.querySelector("[data-carousel-next]");
      var dots = root.querySelectorAll("[data-carousel-dot]");
      if (!track || !slides.length) return;

      var n = slides.length;
      var i = 0;

      function setIndex(idx) {
        i = ((idx % n) + n) % n;
        track.style.transform = "translateX(-" + (100 * i) / n + "%)";
        slides.forEach(function (s, j) {
          s.classList.toggle("is-active", j === i);
        });
        dots.forEach(function (d, j) {
          d.classList.toggle("is-active", j === i);
          if (j === i) {
            d.setAttribute("aria-current", "true");
          } else {
            d.removeAttribute("aria-current");
          }
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          setIndex(i - 1);
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          setIndex(i + 1);
        });
      }
      dots.forEach(function (d) {
        d.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          var idx = parseInt(d.getAttribute("data-carousel-dot"), 10);
          if (!isNaN(idx)) setIndex(idx);
        });
      });

      root.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setIndex(i - 1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setIndex(i + 1);
        }
      });

      var viewport = root.querySelector(".card-carousel__viewport");
      var touchStart = 0;
      if (viewport) {
        viewport.addEventListener(
          "touchstart",
          function (e) {
            touchStart = e.changedTouches[0].screenX;
          },
          { passive: true }
        );
        viewport.addEventListener(
          "touchend",
          function (e) {
            var x = e.changedTouches[0].screenX;
            var dx = x - touchStart;
            if (dx > 52) setIndex(i - 1);
            if (dx < -52) setIndex(i + 1);
          },
          { passive: true }
        );
      }

      setIndex(0);
    });
  }

  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach(function (el) {
      io.observe(el);
      var r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 800) * 1.05) {
        el.classList.add("is-visible");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLangButtons();
    initHeaderScroll();
    initParallax();
    initReveal();
    initCardCarousels();

    const mapFrame = document.getElementById("mapFrame");
    if (mapFrame) mapFrame.src = MAP_EMBED_SRC;

    const mapLink = document.getElementById("mapLink");
    if (mapLink) mapLink.href = MAPS_URL;
  });
})();
