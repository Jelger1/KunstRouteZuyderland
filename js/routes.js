/* ==================================================
   ROUTE DATA – ZUYDERLAND KUNSTROUTE
   
   ★ Dit is het bestand dat je aanpast om routes, 
     kunstwerken en teksten te wijzigen.
   
   Structuur per locatie:
   - id:          Uniek ID
   - title:       Naam kunstwerk
   - artist:      Naam kunstenaar
   - image:       Pad naar afbeelding (in assets/images/)
   - audio:       Pad naar audiobestand (in assets/audio/)
   - location:    Waar het werk hangt
   - teaserText:  Korte, inspirerende tekst (Discovery Mode teaser)
                  Doel: patiënt overtuigen om op te staan en dit werk te gaan zien.
                  Max. 2-3 zinnen. Schrijf empathisch, warm, activerend.
   - description: Algemene omschrijving (fallback als teaserText ontbreekt)
   - audioText:   Volledig verhaal, ingesproken in Route Mode (na "Ik ben er!")
                  Dit is de 'beloning' na het lopen. Schrijf als een echte audiorondleiding.
   - quote:       Collega-quote object { text, author }
   - question:    Interactieve vraag
   - emotions:    Array met emotie-opties
   - navigation:  Object { arrow, direction, distance, motivation }
                  direction = loopinstructie die wordt getoond in navigatiestap
   ================================================== */

const ROUTES = {

  /* ------------------------------------------------
     HEERLEN – 32 kunstwerken
     Souterrain (h1–h4) → Begane grond (h5–h25) → Eerste etage (h26–h32)
     ------------------------------------------------ */
  heerlen: {
    name: "Heerlen",
    startTitle: "Je staat bij de ingang van het souterrain",
    startDescription: "Hier begint jouw kunstroute door Zuyderland Heerlen. De route voert je van het souterrain via de begane grond naar de eerste etage. Neem je tijd voor elk werk.",
    startImage: "assets/images/heerlen-restaurant.jpg",
    totalDistance: 700,

    artworks: [

      // ── SOUTERRAIN ─────────────────────────────────────────────

      {
        id: "h1",
        title: "Boot en visser",
        artist: "Martijn van Erp",
        images: ["assets/images/Martijn-van-Erp-S-Bij de toiletten, ingang longpoli.jpg"],
        audio: "assets/audio/heerlen-01.mp3",
        location: "Souterrain, bij de toiletten, ingang longpoli",
        findMe: "Dit werk hangt in het souterrain, bij de toiletten nabij de ingang van de longpoli.",
        teaserText: "Een bootje op het water, een visser die geduldig wacht. Even de drukte vergeten en jezelf verliezen in het ritme van het water. Dit werk geeft je exact dat gevoel, en het hangt op loopafstand.",
        description: "Een werk van Martijn van Erp dat de stilte en concentratie van het vissen verbeeldt.",
        audioText: "Je staat bij Boot en visser van Martijn van Erp. Het werk toont de kalmte die vissen met zich meebrengt, de stille concentratie van wachten op het water. Even geen haast, even alleen zijn met je gedachten.",
        quote: {
          text: "\"Hier neem ik altijd even de tijd om te kijken. Het is zo rustig.\"",
          author: "Medewerker longpoli"
        },
        question: "Wat brengt jou rust op een drukke dag?",
        emotions: ["Stilte", "Natuur", "Focus", "Rust"],
        navigation: {
          arrow: "→",
          direction: "Loop richting de lifthal in het souterrain",
          distance: 30,
          motivation: "In de doorgang naar de lifthal wacht een kleurrijke ontdekking."
        }
      },
      {
        id: "h2",
        title: "Yojo and the Conceptionalist",
        artist: "Maria Volkova",
        images: ["assets/images/Marta-Volkova-S-Doorgang souterrain door de lifthal.jpg"],
        audio: "assets/audio/heerlen-02.mp3",
        location: "Souterrain, doorgang door de lifthal",
        findMe: "Dit werk bevindt zich in de doorgang van het souterrain, door de lifthal.",
        teaserText: "Ergens tussen droom en werkelijkheid leven de figuren van Maria Volkova. Dit kleurrijke werk verrast je op een plek die je misschien niet verwacht. Het is de moeite waard om even te gaan kijken.",
        description: "Een werk van Maria Volkova vol fantasie en kleur, dat grenzen tussen werkelijkheid en verbeelding vervaagt.",
        audioText: "Yojo and the Conceptionalist van Maria Volkova. Volkova werkt vanuit een persoonlijke beeldtaal die de grens tussen werkelijkheid en verbeelding opheft. Dit werk nodigt je uit om anders te kijken naar wat voor ogen is.",
        quote: {
          text: "\"Dit werk verrast me elke keer opnieuw. Het vertelt een ander verhaal, afhankelijk van hoe je ernaar kijkt.\"",
          author: "Medewerker Zuyderland"
        },
        question: "Wat zie jij als eerste als je naar dit werk kijkt?",
        emotions: ["Fantasie", "Kleur", "Verwondering", "Raadsel"],
        navigation: {
          arrow: "→",
          direction: "Blijf in de lifthal, dit werk hangt vlakbij",
          distance: 10,
          motivation: "In de lifthal zelf hangt nog een werk, ditmaal van Hadassah Emmerich."
        }
      },
      {
        id: "h3",
        title: "Zonder titel",
        artist: "Hadassah Emmerich",
        images: ["assets/images/Hadassah-Emmerich-Souterrain-lifthal.jpeg"],
        audio: "assets/audio/heerlen-03.mp3",
        location: "Souterrain, lifthal",
        findMe: "Dit werk van Hadassah Emmerich hangt in de lifthal van het souterrain.",
        teaserText: "Een werk zonder naam, maar met een sterke aanwezigheid. Hadassah Emmerich laat jou de betekenis ontdekken. Elke bezoeker ziet er iets anders in, wat zie jij?",
        description: "Een werk van Hadassah Emmerich dat de lifthal van het souterrain een eigen karakter geeft.",
        audioText: "Dit werk van Hadassah Emmerich hangt in de lifthal van het souterrain. Emmerich is bekend om haar krachtige, expressieve stijl. Zelfs zonder titel spreekt dit werk een eigen taal.",
        quote: {
          text: "\"Ik zie het elke dag als ik aankom. Het is een goed begin van de dag.\"",
          author: "Medewerker Zuyderland"
        },
        question: "Welk woord zou jij aan dit werk geven?",
        emotions: ["Kracht", "Rust", "Beweging", "Kleur"],
        navigation: {
          arrow: "→",
          direction: "Loop naar de poli oogheelkunde in het souterrain",
          distance: 50,
          motivation: "Bij de poli oogheelkunde hangt een opvallend werk over zien en identiteit."
        }
      },
      {
        id: "h4",
        title: "Eyedentity",
        artist: "Marcus Debie (Gomad)",
        images: ["assets/images/Gomad-Souterrain-poli-Oogheelkunde.jpg", "assets/images/Gomad(2)-S-poli_oogheelkunde.jpg"],
        audio: "assets/audio/heerlen-04.mp3",
        location: "Souterrain, poli oogheelkunde",
        findMe: "Dit werk hangt bij de poli oogheelkunde in het souterrain.",
        teaserText: "Kijken en gezien worden, waar doe je dat liever? Gomad maakt streetart die speelt met identiteit en de blik van de ander. Bij de poli oogheelkunde krijgt dat een bijzondere lading. Dit werk vraagt jou: wat zie jij eigenlijk?",
        description: "Een werk van Gomad over zien en identiteit, op een passende plek bij de poli oogheelkunde.",
        audioText: "Je staat voor Eyedentity van Marcus Debie, beter bekend als Gomad. Hij is een van de meest invloedrijke street-artkunstenaars uit de Benelux. Zijn werk speelt met ogen, letterlijk en figuurlijk. Zien is meer dan waarnemen. Het gaat over wie je bent als iemand naar je kijkt. En wie de ander wordt als jij kijkt. Op deze plek, bij de poli oogheelkunde, heeft dat een dubbele betekenis. Ogen zijn niet alleen organen. Ze zijn de toegang tot wie we zijn.",
        quote: {
          text: "\"Onze patiënten komen hier voor hun ogen. Dit werk maakt hen bewust van het wonder van het zien.\"",
          author: "Medewerker poli oogheelkunde"
        },
        question: "Wat valt jou als eerste op als je naar iemand kijkt?",
        emotions: ["De ogen", "De houding", "De uitdrukking", "Het geheel"],
        navigation: {
          arrow: "↑",
          direction: "Neem de trap of lift naar de begane grond, richting de hoofdingang",
          distance: 60,
          motivation: "Op de begane grond begint een nieuwe wereld aan kunst, startend bij de hoofdingang."
        }
      },

      // ── BEGANE GROND ───────────────────────────────────────────

      {
        id: "h5",
        title: "Energyman / Remember Me",
        artist: "Mark Truijen",
        images: ["assets/images/marc Truijen-BG-hoofdingang.jpg", "assets/images/Marc Truijen(2)-BG-hoofdingang.jpg"],
        audio: "assets/audio/heerlen-05.mp3",
        location: "Begane grond, hoofdingang",
        findMe: "Dit werk van Mark Truijen bevindt zich direct bij de hoofdingang van Zuyderland Heerlen.",
        teaserText: "Een figuur vol energie bij de hoofdingang, dat is geen toeval. Mark Truijen maakte dit werk als een begroeting, een aansporing, een herinnering. Wie komt hier binnen? En met welke intentie? Laat dit werk je even bij stilstaan.",
        description: "Een markant werk van Mark Truijen dat bezoekers verwelkomt bij de hoofdingang.",
        audioText: "Energyman, ook wel bekend als Remember Me, van Mark Truijen. Truijen is een Limburgse kunstenaar met een uitgesproken oeuvre. Dit werk staat bij de hoofdingang van Zuyderland Heerlen, de plek waar alles begint. De figuur is krachtig, aanwezig. Het herinnert je eraan dat je er toe doet. Dat je energie hebt, ook al voel je dat nu misschien niet. Een ingang is ook een overgang: van de buitenwereld naar een andere werkelijkheid.",
        quote: {
          text: "\"Elke dag kom ik hier langs. Het werk herinnert me eraan dat ik er toe doe.\"",
          author: "Medewerker Zuyderland"
        },
        question: "Hoe voel je je als je een ziekenhuis binnenstapt?",
        emotions: ["Hoopvol", "Nerveus", "Nieuwsgierig", "Rustig"],
        navigation: {
          arrow: "→",
          direction: "Loop richting de centrale hal",
          distance: 30,
          motivation: "In de centrale hal zijn meerdere werken te vinden."
        }
      },
      {
        id: "h6",
        title: "Rats get fed and good people die",
        artist: "Bas de Wit",
        images: ["assets/images/Bas de Wit-BG-centrale-hal.jpg"],
        audio: "assets/audio/heerlen-06.mp3",
        location: "Begane grond, centrale hal",
        findMe: "Dit werk hangt in de centrale hal op de begane grond.",
        description: "Een confronterend en tegelijk ontroerend werk van Bas de Wit in de centrale hal.",
        audioText: "Rats get fed and good people die van Bas de Wit. De titel treft direct. Bas de Wit maakt werk dat de werkelijkheid niet omzeilt. In een ziekenhuis, waar leven en dood zo dichtbij kunnen komen, krijgt dit werk een bijzondere lading.",
        quote: {
          text: "\"Dit werk raakt me elke keer. Het vraagt me om eerlijk te zijn met mezelf.\"",
          author: "Medewerker Zuyderland"
        },
        question: "Wat roept de titel van dit werk bij je op?",
        emotions: ["Verdriet", "Herkenning", "Verontwaardiging", "Aanvaarding"],
        navigation: {
          arrow: "→",
          direction: "Blijf in de centrale hal en loop richting het damestoilet",
          distance: 15,
          motivation: "Naast het damestoilet staat een historisch portret."
        }
      },
      {
        id: "h7",
        title: "Borstbeeld Dr. Frans de Wever",
        artist: "Onbekende kunstenaar",
        images: ["assets/images/De Wever-BG-centraleHal damestoilet.jpg"],
        audio: "assets/audio/heerlen-07.mp3",
        location: "Begane grond, centrale hal, naast het damestoilet",
        findMe: "Het borstbeeld staat in de centrale hal, naast het damestoilet.",
        description: "Een borstbeeld ter ere van Dr. Frans de Wever, een verdienstelijke figuur in de geschiedenis van het ziekenhuis.",
        audioText: "Dit borstbeeld stelt Dr. Frans de Wever voor. Het eert zijn bijdrage aan de gezondheidszorg in de regio. Beelden als dit verbinden ons met de geschiedenis en herinneren ons aan de mensen die de basis legden voor de zorg van vandaag.",
        quote: {
          text: "\"Het is goed om te weten wie er voor ons kwamen. Dat geeft context aan ons werk.\"",
          author: "Arts Zuyderland"
        },
        question: "Wie heeft voor jou iets belangrijks betekend in het leven?",
        emotions: ["Een familielid", "Een leraar", "Een collega", "Een vriend"],
        navigation: {
          arrow: "→",
          direction: "Loop richting het drinkwaterpunt, richting balie BG.20",
          distance: 20,
          motivation: "Bij het drinkwaterpunt bevindt zich een gedenkplaquette."
        }
      },
      {
        id: "h8",
        title: "Plaquette ter nagedachtenis aan Dr. van Berckel",
        artist: "Onbekende kunstenaar",
        images: ["assets/images/Van Berckel-BG-centraleHal-herentoilet.jpg"],
        audio: "assets/audio/heerlen-08.mp3",
        location: "Begane grond, centrale hal, bij het drinkwaterpunt, richting balie BG.20",
        findMe: "De plaquette hangt in de centrale hal bij het drinkwaterpunt, richting balie BG.20.",
        description: "Een gedenkplaquette voor Dr. van Berckel, als blijvende herinnering aan zijn inzet voor de patiëntenzorg.",
        audioText: "Deze plaquette herdenkt Dr. van Berckel. Plaquettes als deze zijn stille getuigen van een leven gewijd aan de zorg. Ze vragen ons om een moment stil te staan bij mensen die niet meer onder ons zijn, maar wiens werk doorgaat.",
        quote: {
          text: "\"Zulke herinneringen houden de verbinding met ons verleden levend.\"",
          author: "Medewerker Zuyderland"
        },
        question: "Hoe wil jij herinnerd worden?",
        emotions: ["Door wat ik deed", "Door wie ik was", "Door wat ik zei", "Door wat ik gaf"],
        navigation: {
          arrow: "→",
          direction: "Loop richting gang oost, naar wachtkamer 3",
          distance: 60,
          motivation: "In gang oost hangt een werk met een bijzondere naam."
        }
      },
      {
        id: "h11",
        title: "Mockingbird",
        artist: "Nikki Pelaez",
        images: ["assets/images/Nikki Pelaez-BG-gang oost.jpg"],
        audio: "assets/audio/heerlen-11.mp3",
        location: "Begane grond, gang oost, richting wachtkamer 3",
        findMe: "Dit werk hangt in gang oost, op weg naar wachtkamer 3 vanuit de servicedesk.",
        description: "Mockingbird van Nikki Pelaez, een werk dat speelt met nabootsing, stem en identiteit.",
        audioText: "Mockingbird van Nikki Pelaez. De spotlijster is een vogel die geluiden van anderen imiteert. Pelaez verwerkt dit thema in een werk over aanpassen, nabootsen en toch jezelf blijven, een intrigerend idee in de context van zorg en herstel.",
        quote: {
          text: "\"Het woord 'mockingbird' blijft in mijn hoofd hangen als ik hier langs loop.\"",
          author: "Medewerker Zuyderland"
        },
        question: "Wanneer pas jij jezelf aan aan anderen?",
        emotions: ["Vaak", "Soms", "Zelden", "Nooit"],
        navigation: {
          arrow: "←",
          direction: "Loop terug richting de roltrappen vanuit de parkeergarage",
          distance: 50,
          motivation: "Onderaan de roltrappen staat een werk van Theo Lenartz."
        }
      },
      {
        id: "h12",
        title: "Zonder titel",
        artist: "Theo Lenartz",
        images: ["assets/images/Theo Lennartz-Onderaan roltrappen vanuit parkeergarage.jpg", "assets/images/Theo Lennartz(2)-Onderaan roltrappen vanuit parkeergarage.jpg"],
        audio: "assets/audio/heerlen-12.mp3",
        location: "Begane grond, onderaan de roltrappen vanuit de parkeergarage",
        findMe: "Dit werk staat onderaan de roltrappen die vanuit de parkeergarage naar de begane grond leiden.",
        description: "Een werk van Theo Lenartz dat de doorgang vanuit de parkeergarage markeert.",
        audioText: "Dit werk van Theo Lenartz staat op de plek waar bezoekers het ziekenhuis binnenkomen vanuit de parkeergarage, een overgangsmoment, van buiten naar binnen, van het dagelijkse leven naar de wereld van de zorg. Het werk begeleidt die overgang.",
        quote: {
          text: "\"Dit is het eerste wat mijn patiënten zien als ze binnenkomen. Dat vind ik mooi.\"",
          author: "Arts Zuyderland"
        },
        question: "Hoe bereid jij je voor op een ziekenhuisbezoek?",
        emotions: ["Praktisch", "Emotioneel", "Niet bewust", "Met aandacht"],
        navigation: {
          arrow: "→",
          direction: "Loop de gang in richting de longpoli",
          distance: 60,
          motivation: "In de gang van de longpoli hangt een tweede werk van Martijn van Erp."
        }
      },
      {
        id: "h13",
        title: "Stad impressie 1",
        artist: "Martijn van Erp",
        images: ["assets/images/Martijn van Erp-Midden gang longpoli.jpg"],
        audio: "assets/audio/heerlen-13.mp3",
        location: "Begane grond, midden in de gang van de longpoli",
        findMe: "Dit werk hangt midden in de gang van de longpoli op de begane grond.",
        description: "Een stedelijke impressie van Martijn van Erp die de dynamiek van de stad verbeeldt.",
        audioText: "Stad impressie 1 van Martijn van Erp. Eerder zag je zijn Boot en visser in het souterrain, rustig en reflectief. Dit werk toont een andere kant: de stad, de beweging, de drukte. Beide werken samen vertellen iets over de veelzijdigheid van ons bestaan.",
        quote: {
          text: "\"Heerlen is een stad met karakter. Dit werk vangt dat goed.\"",
          author: "Medewerker longpoli"
        },
        question: "Voel jij je meer thuis in de stad of in de natuur?",
        emotions: ["Stad", "Natuur", "Allebei", "Geen voorkeur"],
        navigation: {
          arrow: "→",
          direction: "Loop richting de stilteruimte",
          distance: 40,
          motivation: "In de stilteruimte hangt een bijzonder werk van Claude Jongstra."
        }
      },
      {
        id: "h15",
        title: "Titel onbekend",
        artist: "Claude Jongstra",
        images: ["assets/images/Claude Jongstra-BG-Stilteruimte.jpg"],
        audio: "assets/audio/heerlen-15.mp3",
        location: "Begane grond, stilteruimte",
        findMe: "Dit werk van Claude Jongstra bevindt zich in de stilteruimte op de begane grond.",
        description: "Een werk van textielkunstenares Claude Jongstra, bekend om haar gelaagde en organische werken.",
        audioText: "Claude Jongstra is een internationaal gerenommeerde textielkunstenares. Haar werken zijn organisch, gelaagd en vol kleur. In de stilteruimte geeft dit werk warmte en diepte aan de ruimte, een zachte aanwezigheid op een plek voor rust.",
        quote: {
          text: "\"Textiel is zo menselijk. Het geeft warmte, net als zorg.\"",
          author: "Vrijwilliger stilteruimte"
        },
        question: "Welke textuur of welk materiaal geeft jou een gevoel van veiligheid?",
        emotions: ["Wol", "Hout", "Steen", "Water"],
        navigation: {
          arrow: "↗",
          direction: "Verlaat de stilteruimte en kijk tegenover de ingang",
          distance: 10,
          motivation: "Tegenover de stilteruimte hangt een werk van Judith Krebbekx."
        }
      },
      {
        id: "h16",
        title: "Titel onbekend",
        artist: "Judith Krebbekx",
        images: [
          "assets/images/Judith Krebbek-BG-tegenover stilte(1).jpg",
          "assets/images/Judith Krebbek-BG-tegenover stilte(2).jpg",
          "assets/images/Judith Krebbek-BG-tegenover stilte(3).jpg",
          "assets/images/Judith Krebbek-BG-tegenover stilte(4).jpg",
          "assets/images/Judith Krebbek-BG-tegenover stilte(5).jpg",
          "assets/images/Judith Krebbek-BG-tegenover stilte(6).jpg"
        ],
        audio: "assets/audio/heerlen-16.mp3",
        location: "Begane grond, tegenover de stilteruimte",
        findMe: "Dit werk hangt tegenover de stilteruimte op de begane grond.",
        description: "Een werk van Judith Krebbekx dat de stilteruimte van buitenaf markeert.",
        audioText: "Dit werk van Judith Krebbekx hangt precies tegenover de stilteruimte. Het vormt een visueel ankerpunt, een gids die je naar de plek van rust leidt. Krebbekx maakt werk dat aandacht vraagt zonder opdringerig te zijn.",
        quote: {
          text: "\"Ik gebruik dit werk als oriëntatiepunt. Als ik het zie, weet ik dat ik bijna bij de stilteruimte ben.\"",
          author: "Medewerker Zuyderland"
        },
        question: "Hoe navigeer jij je door dit ziekenhuis?",
        emotions: ["Op gevoel", "Op borden", "Op kunstwerken", "Ik vraag de weg"],
        navigation: {
          arrow: "→",
          direction: "Loop richting de poli revalidatie",
          distance: 70,
          motivation: "In de poli revalidatie, tussen spreekkamer 5 en 6, hangt een werk van Chantal Ledoux."
        }
      },
      {
        id: "h17",
        title: "Zonder titel",
        artist: "Chantal Ledoux",
        images: [
          "assets/images/Chantal Ledoux-BG-poli revalidatie(1).jpg",
          "assets/images/Chantal Ledoux-BG-poli revalidatie(2).jpg",
          "assets/images/Chantal Ledoux-BG-poli revalidatie(3).jpg",
          "assets/images/Chantal Ledoux-BG-poli revalidatie(4).jpg",
          "assets/images/Chantal Ledoux-BG-poli revalidatie(5).jpg"
        ],
        audio: "assets/audio/heerlen-17.mp3",
        location: "Begane grond, poli revalidatie, tussen spreekkamer 5 en 6",
        findMe: "Dit werk hangt bij de poli revalidatie, in de gang tussen spreekkamer 5 en 6.",
        description: "Een werk van Chantal Ledoux op de poli revalidatie, een plek van herstel en vooruitgang.",
        audioText: "Zonder titel van Chantal Ledoux. Je staat bij de poli revalidatie, een afdeling die draait om herstel, beweging en het terugvinden van kracht. Dit werk ademt die sfeer. Het is aanwezig zonder te overdonderen, een stille kracht op een plek van wederopbouw.",
        quote: {
          text: "\"Voor mijn patiënten is dit werk een vertrouwd gezicht in hun hersteltraject.\"",
          author: "Revalidatiearts Zuyderland"
        },
        question: "Wat geeft jou kracht als het moeilijk is?",
        emotions: ["Familie", "Geloof", "Natuur", "Doorzettingsvermogen"],
        navigation: {
          arrow: "→",
          direction: "Loop richting de poli cardiologie, wachtruimte 4 en 5",
          distance: 60,
          motivation: "Bij de poli cardiologie hangt werk van Jack Reubsaet."
        }
      },
      {
        id: "h18",
        title: "Titel onbekend",
        artist: "Jack Reubsaet",
        images: [
          "assets/images/Jacques-Reubsaet-BG-poli-cardiologie(1).jpg",
          "assets/images/Jacques-Reubsaet-BG-poli-cardiologie(2).jpg"
        ],
        audio: "assets/audio/heerlen-18.mp3",
        location: "Begane grond, poli cardiologie, wachtruimte 4 en 5",
        findMe: "Dit werk hangt bij de poli cardiologie in wachtruimte 4 en 5.",
        description: "Een werk van Jack Reubsaet in de wachtruimte van de poli cardiologie.",
        audioText: "Dit werk van Jack Reubsaet bevindt zich in de wachtruimte van de poli cardiologie. Wachten kan zwaar zijn, zeker hier. Kunst heeft de kracht om die wachttijd te verzachten, om afleiding en tegelijk verbinding te bieden.",
        quote: {
          text: "\"Het werk helpt patiënten om even af te schakelen van hun zorgen.\"",
          author: "Verpleegkundige cardiologie"
        },
        question: "Hoe ga jij om met wachten?",
        emotions: ["Geduldig", "Ongeduldig", "Meditatief", "Afgeleid"],
        navigation: {
          arrow: "→",
          direction: "Loop door richting de grote wachtkamer cardiologie (wachtruimte 1, 2 en 3)",
          distance: 20,
          motivation: "In de grote wachtkamer hangt een indrukwekkend werk van Daan Botlek."
        }
      },
      {
        id: "h19",
        title: "Haemodynamics",
        artist: "Daan Botlek",
        images: ["assets/images/Daan Botlek-BG-wachtkamer cardiologie.jpg"],
        audio: "assets/audio/heerlen-19.mp3",
        location: "Begane grond, grote wachtkamer cardiologie (wachtruimte 1, 2 en 3)",
        findMe: "Dit grote werk van Daan Botlek hangt in de grote wachtkamer cardiologie, wachtruimte 1, 2 en 3.",
        description: "Haemodynamics van Daan Botlek: een grootschalig werk over de dynamiek van bloed en leven.",
        audioText: "Haemodynamics van Daan Botlek. Haemodynamics beschrijft de stroming van bloed door het lichaam. Botlek verbeeldt dit als een wervelend, organisch systeem vol energie. Op een afdeling die het hart bewaakt, is dit een krachtig en passend werk.",
        quote: {
          text: "\"Als cardioloog vind ik dit werk magistraal. Het laat de schoonheid zien van wat wij doen.\"",
          author: "Cardioloog Zuyderland"
        },
        question: "Wat associeer jij met het woord 'stroming'?",
        emotions: ["Leven", "Energie", "Beweging", "Rust"],
        navigation: {
          arrow: "→",
          direction: "Loop richting de ingang van vleugel B",
          distance: 80,
          motivation: "Bij de ingang van vleugel B hangt werk van Aline Thomassen."
        }
      },
      {
        id: "h20",
        title: "Titel onbekend",
        artist: "Aline Thomassen",
        images: ["assets/images/Aline Thomassen-BG-ingang vleugel B.jpg"],
        audio: "assets/audio/heerlen-20.mp3",
        location: "Begane grond, ingang vleugel B",
        findMe: "Dit werk hangt bij de ingang van vleugel B op de begane grond.",
        description: "Een werk van Aline Thomassen dat de ingang van vleugel B markeert.",
        teaserText: "Bij de ingang van vleugel B verwelkomt Aline Thomassen je met een werk dat je even doet stilstaan. Haar fotografie heeft iets vertrouwds en iets vreemds tegelijk, alsof je iets herkent wat je nooit eerder hebt gezien.",
        audioText: "Je staat voor een werk van Aline Thomassen. Thomassen is een fotografe die werkt vanuit een persoonlijke betrokkenheid bij haar directe omgeving, mensen, plekken, alledaagse momenten. Haar beelden zijn zorgvuldig gecomponeerd en toch intiem. Bij de ingang van vleugel B markeert dit werk een overgang: een nieuwe ruimte, een nieuwe mogelijkheid om te kijken. Neem even de tijd. Wat zie jij?",
        quote: {
          text: "\"Dit werk vertelt me dat ik er bijna ben. Vleugel B is mijn dagelijkse werkplek.\"",
          author: "Medewerker vleugel B"
        },
        question: "Wat betekent een welkom voor jou?",
        emotions: ["Warmte", "Herkenning", "Veiligheid", "Verbinding"],
        navigation: {
          arrow: "→",
          direction: "Loop via de loopbrug richting het centraal gebouw, binnenkomst vleugel B",
          distance: 30,
          motivation: "Via de loopbrug hangt een groot werk van Claude Jongstra, Healing Forces."
        }
      },
      {
        id: "h21",
        title: "Healing Forces",
        artist: "Claude Jongstra",
        images: ["assets/images/claudy jongstra wandkleed-BG-doorgang ingang p3.jpg"],
        audio: "assets/audio/heerlen-21.mp3",
        location: "Begane grond, binnenkomst vleugel B vanuit de loopbrug",
        findMe: "Dit werk van Claude Jongstra hangt bij de binnenkomst van vleugel B, vanuit de loopbrug vanuit het centraal gebouw.",
        description: "Healing Forces van Claude Jongstra: een krachtig textielwerk over de helende werking van natuur en kleur.",
        audioText: "Healing Forces van Claude Jongstra. Dit is een van haar meest bijzondere werken in dit ziekenhuis. Jongstra gebruikt natuurlijke kleurstoffen en vezels. De titel zegt het al: helende krachten. Het werk straalt een warmte uit die je bijna letterlijk kunt voelen.",
        quote: {
          text: "\"Dit werk is het eerste dat patiënten zien als ze vanuit het centraal gebouw komen. Het zet de toon.\"",
          author: "Verpleegkundige vleugel B"
        },
        question: "Wat ervaart jij als helend?",
        emotions: ["Natuur", "Muziek", "Rust", "Warmte"],
        navigation: {
          arrow: "→",
          direction: "Loop richting de in-/uitgang P3 van vleugel B",
          distance: 50,
          motivation: "Bij de in-/uitgang P3 is een werk van Nico Bastens te vinden."
        }
      },
      {
        id: "h22",
        title: "Jesse en Habib",
        artist: "Nico Bastens",
        images: [
          "assets/images/nico Bastens-BG-ingang p3(1).png",
          "assets/images/nico Bastens-BG-ingang p3(2).jpg",
          "assets/images/nico Bastens-BG-ingang p3(3).jpg"
        ],
        audio: "assets/audio/heerlen-22.mp3",
        location: "Begane grond, in-/uitgang P3, vleugel B",
        findMe: "Dit werk van Nico Bastens bevindt zich bij de in-/uitgang P3 van vleugel B.",
        description: "Jesse en Habib van Nico Bastens: twee figuren in een werk over ontmoeting en verbinding.",
        audioText: "Jesse en Habib van Nico Bastens. Twee namen, twee levens, één werk. Bastens maakt werk over menselijke verhoudingen, over wie we zijn voor elkaar. Op een plek waar mensen komen en gaan, is dit thema bijzonder passend.",
        quote: {
          text: "\"Ik vraag me altijd af wie Jesse en Habib zijn. Dat mysterie houdt me bezig.\"",
          author: "Bezoeker Zuyderland"
        },
        question: "Met wie zou jij graag een dag op pad gaan?",
        emotions: ["Een vriend", "Een onbekende", "Een familielid", "Niemand, solo"],
        navigation: {
          arrow: "←",
          direction: "Loop richting gang west, richting de poli dermatologie",
          distance: 90,
          motivation: "In gang west zijn nog drie werken te vinden voordat de route naar boven gaat."
        }
      },
      {
        id: "h23",
        title: "Titel onbekend",
        artist: "Birgitta van Drie",
        images: ["assets/images/Birgitta van Drie-V1-Voor de ingang poli dermatologie.jpg"],
        audio: "assets/audio/heerlen-23.mp3",
        location: "Begane grond, voor de ingang poli dermatologie, gang west",
        findMe: "Dit werk hangt voor de ingang van de poli dermatologie in gang west.",
        description: "Een werk van Birgitta van Drie bij de poli dermatologie in gang west.",
        audioText: "Dit werk van Birgitta van Drie markeert de ingang van de poli dermatologie. Dermatologie gaat over de huid, ons grootste orgaan, onze grens met de buitenwereld. Kunst bij een dergelijke poli nodigt uit om na te denken over wat we zien en wat we verbergen.",
        quote: {
          text: "\"Mijn patiënten reageren altijd op dit werk. Huid en esthetiek raken mensen diep.\"",
          author: "Dermatoloog Zuyderland"
        },
        question: "Wat zegt de buitenkant van een mens over de binnenkant?",
        emotions: ["Veel", "Weinig", "Soms veel", "Niets"],
        navigation: {
          arrow: "→",
          direction: "Loop door gang west richting wachtkamer 2",
          distance: 25,
          motivation: "In wachtkamer 2 hangt een werk van Sophie Langohr."
        }
      },
      {
        id: "h24",
        title: "Uit de serie 'New Faces'",
        artist: "Sophie Langohr",
        images: ["assets/images/Sophie Langohr-BG-W2.jpg"],
        audio: "assets/audio/heerlen-24.mp3",
        location: "Begane grond, wachtkamer 2, gang west",
        findMe: "Dit werk hangt in wachtkamer 2 in gang west.",
        description: "Een werk uit de serie New Faces van Sophie Langohr: klassieke Mariabeeldjes gecombineerd met uitdrukkingen uit hedendaagse glossy magazines.",
        teaserText: "Een Mariabeeldje met de blik van een modeblad, dat klinkt confronterend, maar het is vooral eerlijk. Sophie Langohr stelt vragen over wat wij 'mooi' of 'echt' vinden. Bij de dermatologie past dat perfect. Wie bepaalt eigenlijk hoe een gezicht eruit hoort te zien?",
        audioText: "Voor je hangt een werk uit de serie New Faces van Sophie Langohr. Voor deze serie combineerde zij de gezichten van klassieke Mariabeeldjes met expressies uit hedendaagse glossy magazines. Het resultaat is zowel herkenbaar als bevreemdend. Wie is hier mooier, eerlijker, authentieker, de eeuwenoude Madonna of het geretoucheerde model? Langohr stelt die vraag niet om te oordelen, maar om ons bewust te maken van onze eigen blik. Op deze plek, naast de afdeling dermatologie, de geneeskunde van de huid, het meest zichtbare deel van ons lichaam, krijgt dat een extra laag. Wat zien wij als wij een gezicht beoordelen?",
        quote: {
          text: "\"Haar werk is zo helder. Dat geeft rust als je zit te wachten.\"",
          author: "Bezoeker gang west"
        },
        question: "Wat denk jij aan als je zit te wachten?",
        emotions: ["Mijn dierbaren", "Mijn werk", "De toekomst", "Niets bewust"],
        navigation: {
          arrow: "→",
          direction: "Loop verder richting kindergeneeskunde, wachtruimte 6",
          distance: 35,
          motivation: "Bij de kindergeneeskunde sluit de begane grond af met een werk van Lotte van der Gaag."
        }
      },
      {
        id: "h25",
        title: "Titel onbekend",
        artist: "Lotte van der Gaag",
        images: [
          "assets/images/Lotte van der Gaag-BG-ingang wachtruimte 6(1).jpg",
          "assets/images/Lotte van der Gaag-BG-ingang wachtruimte 6(2).jpg",
          "assets/images/Lotte van der Gaag-BG-ingang wachtruimte 6(3).jpg"
        ],
        audio: "assets/audio/heerlen-25.mp3",
        location: "Begane grond, voor de ingang van wachtruimte 6, kindergeneeskunde",
        findMe: "Dit werk staat voor de ingang van wachtruimte 6 bij de kindergeneeskunde.",
        description: "Een werk van Lotte van der Gaag bij de kindergeneeskunde, toegankelijk en warm van toon.",
        audioText: "Dit werk van Lotte van der Gaag staat bij de kindergeneeskunde. Kunst voor en rondom kinderen vraagt om een andere taal, speels, toegankelijk, vol verhaal. Van der Gaag weet die taal te spreken. Dit werk spreekt zowel kinderen als volwassenen aan.",
        quote: {
          text: "\"Kinderen gaan er altijd voor staan. Dat zegt alles.\"",
          author: "Verpleegkundige kindergeneeskunde"
        },
        question: "Welk kunstwerk of welke afbeelding herinner jij je nog uit je kindertijd?",
        emotions: ["Een boek", "Een schilderij", "Een sculptuur", "Geen specifiek"],
        navigation: {
          arrow: "↑",
          direction: "Neem de trap of lift naar de eerste etage, richting de poli plein",
          distance: 50,
          motivation: "Op de eerste etage wachten nog zeven werken."
        }
      },

      // ── EERSTE ETAGE ───────────────────────────────────────────

      {
        id: "h26",
        title: "Titel onbekend",
        artist: "Magdalena Peltzer",
        images: [
          "assets/images/Magdalena Peltzer-V1-ingang poli plein(1).jpg",
          "assets/images/Magdalena Peltzer-V1-ingang poli plein(2).jpg",
          "assets/images/Magdalena Peltzer-V1-ingang poli plein(3).jpg",
          "assets/images/Magdalena Peltzer-V1-ingang poli plein(4).jpg"
        ],
        audio: "assets/audio/heerlen-26.mp3",
        location: "Eerste etage, ingang poli plein rechts, richting wachtruimte 1 en 2",
        findMe: "Dit werk bevindt zich op de eerste etage, rechts bij de ingang van de poli plein, richting wachtruimte 1 en 2.",
        description: "Een werk van onbekende maker bij de ingang van de poli plein op de eerste etage.",
        audioText: "Je bent nu op de eerste etage. Dit werk bij de ingang van de poli plein verwelkomt je op deze verdieping. De maker is onbekend, maar het werk spreekt voor zichzelf. Neem even de tijd om het in je op te nemen.",
        quote: {
          text: "\"Soms weet je niet wie iets heeft gemaakt, maar voel je wel dat het klopt.\"",
          author: "Medewerker eerste etage"
        },
        question: "Maakt het voor jou uit wie een kunstwerk heeft gemaakt?",
        emotions: ["Ja, zeker", "Soms", "Niet echt", "Nee, het werk spreekt zelf"],
        navigation: {
          arrow: "→",
          direction: "Loop richting het einde van de gang, richting wachtkamer 1 en 2 en vleugel B",
          distance: 60,
          motivation: "Aan het einde van de gang hangt een werk van Edith Eussen."
        }
      },
      {
        id: "h27",
        title: "Titel onbekend",
        artist: "Edith Eussen",
        images: [
          "assets/images/Edith-V1-einde gang richting k1-2(1).jpg",
          "assets/images/Edith-V1-einde gang richting k1-2(2).jpg"
        ],
        audio: "assets/audio/heerlen-27.mp3",
        location: "Eerste etage, einde gang richting wachtkamer 1 en 2, richting vleugel B",
        findMe: "Dit werk hangt aan het einde van de gang, richting wachtkamer 1 en 2 en vleugel B.",
        description: "Een werk van Edith Eussen dat de gang richting vleugel B afsluit.",
        audioText: "Dit werk van Edith Eussen staat op een strategische plek: aan het einde van een gang, als afsluiting of als uitnodiging om verder te lopen. Eussen maakt werk met een sterke visuele aanwezigheid, het houdt je even vast voordat je doorloopt.",
        quote: {
          text: "\"Ik loop hier elke dag langs. Het werk lijkt me steeds even aan te kijken.\"",
          author: "Medewerker eerste etage"
        },
        question: "Wat doet een lange gang met jou?",
        emotions: ["Geeft richting", "Voelt smal", "Nodigt uit", "Doet niets"],
        navigation: {
          arrow: "←",
          direction: "Loop terug richting wachtkamer 1 bij de plastische chirurgie",
          distance: 30,
          motivation: "In wachtkamer 1 bij de plastische chirurgie hangt een werk van Vera Gulikers."
        }
      },
      {
        id: "h28",
        title: "Titel onbekend",
        artist: "Vera Gulikers",
        images: [
          "assets/images/Vera Gulikers-BG-w1.jpg",
          "assets/images/Vera Gulikers-BG-w1(2).jpg"
        ],
        audio: "assets/audio/heerlen-28.mp3",
        location: "Eerste etage, wachtkamer 1, plastische chirurgie",
        findMe: "Dit werk van Vera Gulikers hangt in wachtkamer 1 bij de plastische chirurgie.",
        description: "Een werk van Vera Gulikers in de wachtkamer van de plastische chirurgie.",
        audioText: "Dit werk van Vera Gulikers bevindt zich in de wachtkamer van de plastische chirurgie. Plastische chirurgie gaat over vormen, veranderen en herstellen. Gulikers maakt werk dat eveneens over transformatie gaat, op haar eigen beeldende manier.",
        quote: {
          text: "\"In een wachtkamer heb je tijd om echt naar kunst te kijken. Dat gebeurt hier ook.\"",
          author: "Patiënt plastische chirurgie"
        },
        question: "Zou jij iets aan jezelf veranderen als het kon?",
        emotions: ["Ja", "Misschien", "Nee", "Weet niet"],
        navigation: {
          arrow: "→",
          direction: "Loop richting kamer 11 en 12, bij wachtkamer 6",
          distance: 75,
          motivation: "Tussen kamer 11 en 12 hangt een werk van André Dieteren."
        }
      },
      {
        id: "h30",
        title: "Titel onbekend",
        artist: "André Dieteren",
        images: [
          "assets/images/Andre Dieteren-V1-tussen k11-12(1).jpg",
          "assets/images/Andre Dieteren-V1-tussen k11-12(2).jpg",
          "assets/images/Andre Dieteren-V1-tussen k11-12(3).jpg",
          "assets/images/Andre Dieteren-V1-tussen k11-12(4).jpg",
          "assets/images/Andre Dieteren-V1-tussen k11-12(5).jpg"
        ],
        audio: "assets/audio/heerlen-30.mp3",
        location: "Eerste etage, tussen kamer 11 en 12, bij wachtkamer 6",
        findMe: "Dit werk hangt tussen kamer 11 en 12, bij wachtkamer 6 op de eerste etage.",
        description: "Een werk van André Dieteren tussen de spreekkamers op de eerste etage.",
        audioText: "Dit werk van André Dieteren bevindt zich tussen de spreekkamers. De gangen tussen kamers zijn functionele ruimtes, maar kunst maakt ze tot meer. Dieteren's werk vraagt om aandacht op een plek waar mensen doorgaans met hun gedachten ergens anders zijn.",
        quote: {
          text: "\"Ik ben blij dat er hier kunst hangt. Het maakt de wachtmomenten draaglijker.\"",
          author: "Patiënt eerste etage"
        },
        question: "Wanneer merk jij kunst op in je dagelijks leven?",
        emotions: ["Altijd", "Als ik er bewust naar zoek", "Soms", "Zelden"],
        navigation: {
          arrow: "→",
          direction: "Loop richting kamer 7 en de trappengang",
          distance: 30,
          motivation: "Naast kamer 7 en de trappengang hangt een tweede werk van Sophie Langohr."
        }
      },
      {
        id: "h31",
        title: "Uit de serie 'Glorious Bodies'",
        artist: "Sophie Langohr",
        images: ["assets/images/Sophie Langohr-BG-naast W7.jpg"],
        audio: "assets/audio/heerlen-31.mp3",
        location: "Eerste etage, naast kamer 7 en trappengang",
        findMe: "Dit werk van Sophie Langohr hangt naast kamer 7 en de trappengang op de eerste etage.",
        description: "Een werk uit de serie Glorious Bodies van Sophie Langohr: mannen met karakteristieke koppen naast verwante uitdrukkingen uit de kunstgeschiedenis.",
        teaserText: "Mannen met markante gezichten, naast klassieke kunstwerken, en ineens zie je hoe tijdloos een blik kan zijn. Sophie Langohr speelt met herkenning en kunstgeschiedenis. Dit werk vraagt jou: waar heb ik dit gezicht al eens gezien?",
        audioText: "Dit is een werk uit de serie Glorious Bodies van Sophie Langohr. Voor deze serie fotografeerde zij mannen met karakteristieke koppen en zocht daarna naar vergelijkbare gezichtsuitdrukkingen in de kunstgeschiedenis. Een Renaissanceportret naast een hedendaagse man uit Heerlen. Een Barokfiguur naast iemand die je zomaar op straat tegen zou kunnen komen. Het effect is ontwapenend eerlijk. Schoonheid is niet van één tijd. Glorie ook niet. Langohr toont dat gewone mensen al eeuwenlang worden vertegenwoordigd in grote kunst, zonder het zelf te weten.",
        quote: {
          text: "\"Ik vind het bijzonder dat dezelfde kunstenares op verschillende plekken terugkomt. Dat geeft samenhang.\"",
          author: "Medewerker Zuyderland"
        },
        question: "Hoe beleef je een kunstenaar anders als je meerdere werken van hem of haar ziet?",
        emotions: ["Dieper begrip", "Meer waardering", "Herkenning", "Geen verschil"],
        navigation: {
          arrow: "→",
          direction: "Loop richting wachtruimte 8, links naast kamer 2",
          distance: 25,
          motivation: "Het laatste werk van de route hangt bij wachtruimte 8."
        }
      },
      {
        id: "h32",
        title: "Save",
        artist: "Alin Klass",
        images: ["assets/images/Alin Klaas-V1-k2.jpg"],
        audio: "assets/audio/heerlen-32.mp3",
        location: "Eerste etage, bij wachtruimte 8, links naast kamer 2",
        findMe: "Het laatste werk van de route hangt bij wachtruimte 8, links naast kamer 2 op de eerste etage.",
        description: "Save van Alin Klass: een slapende figuur als veilige haven, over postmoderne identiteit en de anonimiteit van het menselijk lichaam in beweging en rust.",
        teaserText: "Een slapende figuur. Niets meer. Toch roept Save van Alin Klass iets dieps op, een verlangen naar rust, naar een plek waar je even veilig bent. Het is het sluitstuk van de route. En misschien ook het eerlijkste werk van allemaal.",
        audioText: "Je hebt de route bijna voltooid. Het laatste werk is Save van Alin Klass. Het toont een slapende persoon, anoniem, bewegingloos, ingekeerd. Klass maakt werk over de postmoderne mens: iemand zonder houvast in een globaliserende wereld, die zijn identiteit samenstelt uit losse stukken cultuur. De slapende figuur is geen symbool van zwakte. Het is een veilige haven. In slaap ontsnap je even aan de verwachtingen, de rollen, de beoordelingen. Klass richt zich bewust op anonieme houdingen en bewegingen. Ze roepen afstand op, maar ook diepe herkenning. Want wie slaapt er niet? Goed gedaan, je hebt de Zuyderland kunstroute doorlopen.",
        quote: {
          text: "\"Ik feliciteer iedereen die de hele route loopt. Het vraagt aandacht, en aandacht is geneeskrachtig.\"",
          author: "Arts Zuyderland"
        },
        question: "Wat neem je mee van deze kunstroute?",
        emotions: ["Rust", "Inspiratie", "Verbinding", "Trots"],
        navigation: null
      },

      // ── EXTRA WERKEN – BEGANE GROND ─────────────────────────

      {
        id: "h33",
        title: "Zonder titel",
        artist: "Slava Shevelenko",
        images: [
          "assets/images/Slava Shevelenko-BG-Poli revalidatie(1).jpg",
          "assets/images/Slava Shevelenko-BG-Poli revalidatie(2).jpg",
          "assets/images/Slava Shevelenko-BG-Poli revalidatie(3).jpg",
          "assets/images/Slava Shevelenko-BG-Poli revalidatie(4).jpg",
          "assets/images/Slava Shevelenko-BG-Poli revalidatie(5).jpg",
          "assets/images/Slava Shevelenko-BG-Poli revalidatie(6).jpg",
          "assets/images/Slava Shevelenko-BG-Poli revalidatie(7).jpg",
          "assets/images/Slava Shevelenko-BG-Poli revalidatie(8).jpg"
        ],
        audio: "",
        location: "Begane grond, poli revalidatie",
        findMe: "Dit werk van Slava Shevelenko hangt bij de poli revalidatie.",
        description: "Een werk van Slava Shevelenko op de poli revalidatie.",
        audioText: "Dit werk van Slava Shevelenko bevindt zich bij de poli revalidatie. Zijn kleurrijke, expressieve beelden geven energie aan de gang van de revalidatieafdeling.",
        quote: { text: "\"Dit werk geeft mij elke dag opnieuw energie.\"", author: "Medewerker revalidatie" },
        question: "Wat geeft jou elke dag nieuwe energie?",
        emotions: ["Natuur", "Mensen", "Muziek", "Beweging"],
        navigation: {
          arrow: "→",
          direction: "Loop verder door de poli revalidatie",
          distance: 20,
          motivation: "Verderop in de revalidatiegang hangen meer werken."
        }
      },
      {
        id: "h34",
        title: "Zonder titel",
        artist: "Raph de Haas",
        images: [
          "assets/images/Raph de Haas-BG-Poli revalidatie, tegenover toiletten(1).jpg",
          "assets/images/Raph de Haas-BG-Poli revalidatie, tegenover toiletten(2).jpg",
          "assets/images/Raph de Haas-BG-Poli revalidatie, tegenover toiletten(3).jpg",
          "assets/images/Raph de Haas-BG-Poli revalidatie, tegenover toiletten(4).jpg"
        ],
        audio: "",
        location: "Begane grond, poli revalidatie, tegenover de toiletten",
        findMe: "Dit werk hangt tegenover de toiletten bij de poli revalidatie.",
        description: "Een werk van Raph de Haas tegenover de toiletten bij de poli revalidatie.",
        audioText: "Raph de Haas plaatste dit werk tegenover de toiletten bij de poli revalidatie. Op een plek waar mensen even stilstaan, nodigt het werk uit om te kijken.",
        quote: { text: "\"Ik kijk hier altijd even naar als ik langs loop.\"", author: "Medewerker Zuyderland" },
        question: "Wat valt jou op als je dit werk bekijkt?",
        emotions: ["Kleur", "Beweging", "Kalmte", "Kracht"],
        navigation: {
          arrow: "→",
          direction: "Loop terug richting de gang van de longpoli",
          distance: 60,
          motivation: "Aan het einde van de longpoligang hangt ook werk van Raph de Haas."
        }
      },
      {
        id: "h35",
        title: "Zonder titel",
        artist: "Raph de Haas",
        images: [
          "assets/images/RdH-BG-einde gang longpoli.jpg",
          "assets/images/RdH-BG-einde gang longpoli(2).jpg"
        ],
        audio: "",
        location: "Begane grond, einde gang longpoli",
        findMe: "Dit werk hangt aan het einde van de gang bij de longpoli.",
        description: "Een werk van Raph de Haas aan het einde van de longpoligang.",
        audioText: "Aan het einde van de longpoligang hangt dit werk van Raph de Haas. Het markeert een eindpunt, maar ook een beginpunt van een nieuwe richting.",
        quote: { text: "\"Een goed werk op het einde van een lange gang.\"", author: "Medewerker longpoli" },
        question: "Hoe voelt het om aan het einde van een pad te staan?",
        emotions: ["Opluchting", "Nieuwsgierigheid", "Rust", "Trots"],
        navigation: {
          arrow: "↑",
          direction: "Neem de trap naar de eerste etage",
          distance: 30,
          motivation: "Op de eerste etage wacht nog meer kunst."
        }
      },
      {
        id: "h36",
        title: "Zonder titel",
        artist: "Sidi El Karchi",
        images: ["assets/images/Sidi El Karchi-BG-ingang w6.jpg"],
        audio: "",
        location: "Begane grond, ingang wachtruimte 6",
        findMe: "Dit werk hangt bij de ingang van wachtruimte 6.",
        description: "Een werk van Sidi El Karchi bij de ingang van wachtruimte 6.",
        audioText: "Sidi El Karchi is een internationaal bekende kunstenaar. Dit werk bij de ingang van wachtruimte 6 trekt de aandacht en nodigt uit om even te stoppen voor je een wachtkamer binnengaat.",
        quote: { text: "\"Dit werk geeft iets bijzonders aan deze ingang.\"", author: "Medewerker Zuyderland" },
        question: "Wat verwacht jij als je een wachtkamer binnengaat?",
        emotions: ["Rust", "Spanning", "Hoop", "Geduld"],
        navigation: {
          arrow: "↑",
          direction: "Neem de trap of lift naar de eerste etage",
          distance: 40,
          motivation: "Op de eerste etage zijn nog meer werken te ontdekken."
        }
      }

    ]
  },

  /* ------------------------------------------------
     SITTARD – 5 kunstwerken
     (met rustpunten bij lege plekken)
     ------------------------------------------------ */
  sittard: {
    name: "Sittard",
    startTitle: "Je staat bij de hoofdingang",
    startDescription: "Hier begint jouw kunstroute door Zuyderland Sittard. Onderweg zijn er rustplekken waar je even kunt zitten.",
    startImage: "assets/images/sittard-entrance.jpg",
    totalDistance: 300,

    artworks: [
      {
        id: "s1",
        title: "Welkomstmuur",
        artist: "Kunstgroep Limburg",
        image: "assets/images/sittard-01.jpg",
        audio: "assets/audio/sittard-01.mp3",
        location: "Hoofdingang",
        findMe: "Dit werk hangt direct bij de hoofdingang, je kunt het niet missen.",
        description: "Een warm welkom in kleur en vorm.",
        audioText: "Welkom bij de Kunstroute Sittard. Dit eerste werk is van Kunstgroep Limburg. Ze hebben de entree ontworpen als een warm welkom. De warme kleuren en ronde vormen moeten je het gevoel geven: je bent op de goede plek.",
        quote: {
          text: "\"Elke ochtend als ik binnenkom, word ik begroet door deze kleuren.\"",
          author: "Receptionist Mark"
        },
        question: "Voel je je welkom als je dit ziet?",
        emotions: ["Ja, absoluut", "Een beetje", "Weet niet", "Anders"],
        navigation: {
          arrow: "→",
          direction: "Loop 40 meter richting de polikliniek",
          distance: 40,
          motivation: "Even verderop is een rustplek met uitzicht op het volgende werk."
        }
      },
      {
        id: "s2",
        title: "Seizoenen",
        artist: "Anna de Vries",
        image: "assets/images/sittard-02.jpg",
        audio: "assets/audio/sittard-02.mp3",
        location: "Gang polikliniek (bankje aanwezig)",
        findMe: "Loop richting de polikliniek. Dit werk hangt in de gang – er staat een bankje om even te zitten.",
        description: "Vier schilderijen die de seizoenen vangen.",
        audioText: "Hier zie je de Seizoenen van Anna de Vries. Vier schilderijen, elk een seizoen. Anna wilde laten zien dat na elke winter weer een lente komt. Een mooie gedachte als je in het ziekenhuis bent: het wordt weer beter.",
        quote: {
          text: "\"In de herfst kijk ik altijd naar het lenteschilderij. Geeft hoop.\"",
          author: "Verpleegkundige Sophie"
        },
        question: "Welk seizoen past bij hoe je je vandaag voelt?",
        emotions: ["Lente", "Zomer", "Herfst", "Winter"],
        navigation: {
          arrow: "↑",
          direction: "Neem de lift naar verdieping 1, richting Chirurgie",
          distance: 70,
          motivation: "Boven wacht een verrassend werk dat bijna niemand kent."
        }
      },
      {
        id: "s3",
        title: "Stille Kracht",
        artist: "Henk Bergmans",
        image: "assets/images/sittard-03.jpg",
        audio: "assets/audio/sittard-03.mp3",
        location: "Verdieping 1, gang Chirurgie",
        findMe: "Neem de lift naar verdieping 1. Dit werk hangt in de gang bij afdeling Chirurgie.",
        description: "Abstract werk over innerlijke kracht.",
        audioText: "Stille Kracht van Henk Bergmans. Dit abstracte werk lijkt op het eerste gezicht misschien chaotisch. Maar kijk goed: er zit structuur in, er zit kracht in. Zoals in jezelf. Soms voelt het rommelig, maar diep van binnen weet je dat je sterk bent.",
        quote: {
          text: "\"Patiënten die hier langs lopen, stoppen vaak even om te kijken. Dat zegt alles.\"",
          author: "Chirurg Dr. Willems"
        },
        question: "Zie jij orde of chaos in dit werk?",
        emotions: ["Orde", "Chaos", "Allebei", "Verschilt per moment"],
        navigation: {
          arrow: "→",
          direction: "Loop 50 meter richting het rustpunt bij Orthopedie",
          distance: 50,
          motivation: "Bij het rustpunt kun je even zitten. Er hangt ook een mooi werk."
        }
      },
      {
        id: "s4",
        title: "In Beweging",
        artist: "Studio Limburg",
        image: "assets/images/sittard-04.jpg",
        audio: "assets/audio/sittard-04.mp3",
        location: "Rustpunt Orthopedie (zitplek aanwezig)",
        findMe: "Loop richting Orthopedie op verdieping 1. Er is een zitplek – neem even de tijd.",
        description: "Een kinetisch kunstwerk dat beweegt met de lucht.",
        audioText: "Dit is In Beweging van Studio Limburg. Het kunstwerk beweegt zachtjes mee met de luchtstroom in de gang. Het laat zien dat je niet stil hoeft te staan. Elke kleine beweging telt – net als de stappen die jij nu zet op deze route.",
        quote: {
          text: "\"Ik gebruik dit kunstwerk als motivatie voor mijn patiënten: zie je, bewegen kan mooi zijn!\"",
          author: "Fysiotherapeut Jan"
        },
        question: "Wat motiveert jou om te bewegen?",
        emotions: ["Doel", "Familie", "Gezondheid", "Vrijheid"],
        navigation: {
          arrow: "←",
          direction: "Loop 60 meter terug richting de tuin bij de centrale hal",
          distance: 60,
          motivation: "Het laatste kunstwerk staat in de binnentuin. Een mooie afsluiter!"
        }
      },
      {
        id: "s5",
        title: "Groei",
        artist: "Beeldhouwer Collectief",
        image: "assets/images/sittard-05.jpg",
        audio: "assets/audio/sittard-05.mp3",
        location: "Binnentuin",
        findMe: "Dit werk staat in de binnentuin. Volg de bordjes naar buiten – frisse lucht inbegrepen!",
        description: "Een buitensculptuur over groei en hoop.",
        audioText: "Je staat nu in de binnentuin bij Groei, gemaakt door het Beeldhouwer Collectief. Dit beeld groeit letterlijk uit de grond omhoog. Het staat voor herstel, voor vooruitgang. Je hebt de hele route gelopen, frisse lucht gepakt en kunst gezien. Knap gedaan!",
        quote: {
          text: "\"Als het mooi weer is, neem ik patiënten mee naar deze tuin. De sculptuur doet de rest.\"",
          author: "Vrijwilliger Ria"
        },
        question: "Wat neem je mee van deze route?",
        emotions: ["Kracht", "Rust", "Verbinding", "Inspiratie"],
        navigation: null
      }
    ]
  }
};
