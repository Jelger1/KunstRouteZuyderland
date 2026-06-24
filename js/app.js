(function () {
  "use strict";

  const LOCATION_STORAGE_KEY = "kunstroute_location";
  const FLOORS = [
    { key: "souterrain",   label: "Souterrain"   },
    { key: "begane-grond", label: "Begane grond" },
    { key: "eerste-etage", label: "1e etage"     }
  ];
  const VISUALS = [
    "linear-gradient(160deg, #2d6f7b, #7cb1c7)",
    "linear-gradient(160deg, #9b6b33, #d8b06a)",
    "linear-gradient(160deg, #426d5f, #8ec2a2)",
    "linear-gradient(160deg, #6e5368, #c89ab4)",
    "linear-gradient(160deg, #425b88, #88b2d6)"
  ];
  const ROUTE_DETAIL_IMAGES = {
    heerlen: "assets/images/Heerlen_illustratie_groot.jpg",
    sittard: "assets/images/Sittard_Geleen_illustratie_groot.jpg"
  };

  const ICON_PLAY  = '<svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><circle cx="26" cy="26" r="24.5" stroke="currentColor" stroke-width="3"/><path d="M21 17l16 9-16 9V17z" fill="currentColor"/></svg>';
  const ICON_PAUSE = '<svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><circle cx="26" cy="26" r="24.5" stroke="currentColor" stroke-width="3"/><rect x="17" y="16" width="6" height="20" rx="3" fill="currentColor"/><rect x="29" y="16" width="6" height="20" rx="3" fill="currentColor"/></svg>';

  const audioPlayer = {
    el: null,
    useTTS: false,
    isPlaying: false,
    ttsUtterance: null,
    dom: null
  };

  const state = {
    locationKey: null,
    route: null,
    activeFloor: "begane-grond",
    currentArtworkId: null,
    visitedIds: new Set(),
    detailRenderToken: 0,
    feedbackTimer: null,
    walkSession: { active: false, artworks: [], index: 0, step: "nav" },
    galleryImageIndices: {},
    galleryImageTimer: null,
    detailImageTimer: null
  };

  // ── Auto-scroll: Discovery Mode marquee affordance ────────
  // Slow continuous horizontal scroll that pauses on hover/touch,
  // inviting serendipitous swiping. Uses cloned nodes for seamless looping.
  var autoScroll = (function () {
    var raf = null;
    var paused = false;
    var container = null;
    var resumeTimer = null;
    var SPEED = 0.5; // px / animation frame ≈ 30 px/s @ 60 fps

    function pause() {
      paused = true;
      clearTimeout(resumeTimer);
    }
    function scheduleResume(ms) {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () { paused = false; }, ms);
    }
    function onMouseEnter() { pause(); }
    function onMouseLeave() { clearTimeout(resumeTimer); paused = false; }
    function onTouchStart() { pause(); }
    function onTouchEnd()   { scheduleResume(3000); }
    function onWheel()      { pause(); scheduleResume(2500); }

    function destroy() {
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
      clearTimeout(resumeTimer);
      if (container) {
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
        container.removeEventListener("touchstart", onTouchStart);
        container.removeEventListener("touchend", onTouchEnd);
        container.removeEventListener("touchcancel", onTouchEnd);
        container.removeEventListener("wheel", onWheel);
        container = null;
      }
      paused = false;
    }

    function init(cont, artworks) {
      destroy();
      if (!cont || !artworks || artworks.length < 3) { return; }
      container = cont;

      // Clone all original cards and append them → creates seamless loop
      // Clones are aria-hidden and not focusable; clicks delegate to focusArtwork
      var originals = Array.from(cont.children);
      originals.forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("tabindex", "-1");
        var artId = card.dataset.artworkId;
        clone.addEventListener("click", function () {
          if (artId) { focusArtwork(artId, true); }
        });
        cont.appendChild(clone);
      });

      cont.addEventListener("mouseenter", onMouseEnter);
      cont.addEventListener("mouseleave", onMouseLeave);
      cont.addEventListener("touchstart", onTouchStart, { passive: true });
      cont.addEventListener("touchend", onTouchEnd, { passive: true });
      cont.addEventListener("touchcancel", onTouchEnd, { passive: true });
      cont.addEventListener("wheel", onWheel, { passive: true });

      // RAF tick: increment scrollLeft; jump back at the halfway mark for infinite feel
      function tick() {
        if (!paused && container) {
          container.scrollLeft += SPEED;
          var half = container.scrollWidth / 2;
          if (container.scrollLeft >= half) {
            container.scrollLeft -= half;
          }
        }
        raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
    }

    return { init: init, destroy: destroy };
  }());

  const screens = {
    home: document.getElementById("screen-home"),
    detail: document.getElementById("screen-detail"),
    route: document.getElementById("screen-route"),
    walk: document.getElementById("screen-walk")
  };

  const dom = {
    hospitalPill: document.getElementById("hospital-pill"),
    hospitalName: document.getElementById("hospital-name"),
    btnHome: document.getElementById("btn-home"),
    btnBack: document.getElementById("btn-back"),
    btnWalk: document.getElementById("btn-walk"),
    btnViewRoute: document.getElementById("btn-view-route"),
    btnBackToHome: document.getElementById("btn-back-to-home"),
    btnStartRoute: document.getElementById("btn-start-route"),
    homeDescription: document.getElementById("home-description"),
    totalArtworks: document.getElementById("stat-total-artworks"),
    routeStatusText: document.getElementById("route-status-text"),
    routeStatusBar: document.getElementById("route-status-bar"),
    floorTabs: document.getElementById("floor-tabs"),
    artGridFlat: document.getElementById("art-grid-flat"),
    routeOverviewMeta: document.getElementById("route-overview-meta"),
    routeOverviewList: document.getElementById("route-overview-list"),
    detailMedia: document.getElementById("detail-media"),
    detailTitle: document.getElementById("detail-title"),
    detailArtist: document.getElementById("detail-artist"),
    detailDescription: document.getElementById("detail-description"),
    detailLocation: document.getElementById("detail-location"),
    audioPlayBtn: document.getElementById("audio-play-btn"),
    audioProgressBar: document.getElementById("audio-progress-bar"),
    audioLabel: document.getElementById("audio-label"),
    audioEl: document.getElementById("detail-audio"),
    walkProgress: document.getElementById("walk-progress"),
    walkFloorLabel: document.getElementById("walk-floor-label"),
    walkDirection: document.getElementById("walk-direction"),
    walkMotivation: document.getElementById("walk-motivation"),
    walkRewardMedia: document.getElementById("walk-reward-media"),
    walkRewardTitle: document.getElementById("walk-reward-title"),
    walkRewardArtist: document.getElementById("walk-reward-artist"),
    walkRewardStory: document.getElementById("walk-reward-story"),
    walkAudioPlayBtn: document.getElementById("walk-audio-play-btn"),
    walkAudioProgressBar: document.getElementById("walk-audio-progress-bar"),
    walkAudioLabel: document.getElementById("walk-audio-label"),
    walkAudioEl: document.getElementById("walk-audio"),
    btnArrived: document.getElementById("btn-arrived"),
    btnNextArtwork: document.getElementById("btn-next-artwork"),
    btnWalkQuit: document.getElementById("btn-walk-quit"),
    btnWalkQuitReward: document.getElementById("btn-walk-quit-reward"),
    walkNextHint: document.getElementById("walk-next-hint"),
    walkNextHintText: document.getElementById("walk-next-hint-text"),
    walkProgressDots: document.getElementById("walk-progress-dots"),
    btnResetRoute: document.getElementById("btn-reset-route")
  };

  function init() {
    if (!screens.home || !screens.detail) {
      return;
    }

    bindEvents();
    bootstrapRoute();
  }

  function bindEvents() {
    if (dom.btnHome) {
      dom.btnHome.addEventListener("click", function () {
        if (state.visitedIds.size === 0) {
          resetRoute();
          return;
        }
        if (window.confirm("Weet je het zeker? Je huidige selectie wordt gewist.")) {
          resetRoute();
        }
      });
    }

    if (dom.btnBack) {
      dom.btnBack.addEventListener("click", function () {
        showScreen("home");
      });
    }

    if (dom.btnWalk) {
      dom.btnWalk.addEventListener("click", function () {
        const artwork = getCurrentArtwork();
        if (!artwork) { return; }

        var wasInRoute = state.visitedIds.has(artwork.id);
        if (wasInRoute) {
          state.visitedIds.delete(artwork.id);
          renderHome();
          renderDetail(artwork);
        } else {
          state.visitedIds.add(artwork.id);
          renderHome();
          renderDetail(artwork);
          flashWalkFeedback();
        }
      });
    }

    if (dom.btnViewRoute) {
      dom.btnViewRoute.addEventListener("click", function () {
        if (state.visitedIds.size === 0) {
          return;
        }
        renderRouteOverview();
        showScreen("route");
      });
    }

    if (dom.btnResetRoute) {
      dom.btnResetRoute.addEventListener("click", function () {
        state.visitedIds = new Set();
        renderRouteOverview();
        renderHome();
        showScreen("home");
      });
    }

    if (dom.btnBackToHome) {
      dom.btnBackToHome.addEventListener("click", function () {
        showScreen("home");
      });
    }

    if (dom.btnStartRoute) {
      dom.btnStartRoute.addEventListener("click", function () {
        startWalkSession();
      });
    }

    if (dom.audioPlayBtn) {
      dom.audioPlayBtn.addEventListener("click", function () {
        var artwork = getCurrentArtwork();
        if (artwork) {
          toggleAudio(artwork);
        }
      });
    }

    if (dom.walkAudioPlayBtn) {
      dom.walkAudioPlayBtn.addEventListener("click", function () {
        var session = state.walkSession;
        var artwork = session.artworks[session.index];
        if (artwork) {
          toggleAudio(artwork);
        }
      });
    }

    if (dom.btnArrived) {
      dom.btnArrived.addEventListener("click", function () {
        state.walkSession.step = "reward";
        renderWalkStep();
      });
    }

    if (dom.btnNextArtwork) {
      dom.btnNextArtwork.addEventListener("click", function () {
        advanceWalkSession();
      });
    }

    if (dom.btnWalkQuit) {
      dom.btnWalkQuit.addEventListener("click", function () {
        endWalkSession();
      });
    }

    if (dom.btnWalkQuitReward) {
      dom.btnWalkQuitReward.addEventListener("click", function () {
        endWalkSession();
      });
    }
  }

  function resetRoute() {
    if (!state.route) {
      return;
    }

    window.clearTimeout(state.feedbackTimer);
    state.visitedIds = new Set();
    state.activeFloor = getMostPopulatedFloor();
    state.currentArtworkId = state.route.artworks[0] ? state.route.artworks[0].id : null;

    renderHome();

    if (state.currentArtworkId) {
      renderDetail(getCurrentArtwork());
    }

    showScreen("home");
  }

  async function bootstrapRoute() {
    const detectedLocation = await detectLocationKey();
    if (!detectedLocation) {
      return;
    }

    setRoute(detectedLocation);

    const initialArtwork = state.route.artworks[0] || null;
    if (initialArtwork) {
      state.currentArtworkId = initialArtwork.id;
      renderDetail(initialArtwork);
    }

    renderHome();
    showScreen("home");
  }

  async function detectLocationKey() {
    const params = new URLSearchParams(window.location.search);
    const locationParam = params.get("location");
    if (isKnownLocation(locationParam)) {
      safeSetStorage(LOCATION_STORAGE_KEY, locationParam);
      return locationParam;
    }

    const detectedByDevice = await detectLocationFromDevice();
    if (isKnownLocation(detectedByDevice)) {
      safeSetStorage(LOCATION_STORAGE_KEY, detectedByDevice);
      return detectedByDevice;
    }

    const storedLocation = safeGetStorage(LOCATION_STORAGE_KEY);
    if (isKnownLocation(storedLocation)) {
      return storedLocation;
    }

    const fallbackLocation = Object.keys(ROUTES)[0] || null;
    if (fallbackLocation) {
      safeSetStorage(LOCATION_STORAGE_KEY, fallbackLocation);
    }
    return fallbackLocation;
  }

  function detectLocationFromDevice() {
    return new Promise(function (resolve) {
      if (!("geolocation" in navigator)) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve(coordsToLocation(position.coords));
        },
        function () {
          resolve(null);
        },
        {
          timeout: 1800,
          maximumAge: 300000,
          enableHighAccuracy: false
        }
      );
    });
  }

  function coordsToLocation(coords) {
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    const distanceToHeerlen = Math.hypot(latitude - 50.888, longitude - 5.982);
    const distanceToSittard = Math.hypot(latitude - 50.998, longitude - 5.873);
    const threshold = 0.03;

    if (distanceToHeerlen >= threshold && distanceToSittard >= threshold) {
      return null;
    }

    return distanceToHeerlen <= distanceToSittard ? "heerlen" : "sittard";
  }

  function setRoute(locationKey) {
    state.locationKey = locationKey;
    state.route = ROUTES[locationKey];

    if (!state.route) {
      return;
    }

    if (dom.hospitalName) {
      dom.hospitalName.textContent = "Zuyderland " + state.route.name;
    }

    if (dom.homeDescription) {
      dom.homeDescription.textContent =
        "Welke kunstwerken spreken je aan? Tik op een werk om er meer over te ontdekken en bouw je eigen wandelroute.";
    }

    state.activeFloor = getMostPopulatedFloor();
  }

  function showScreen(name) {
    stopAudio();
    stopDetailCycling();

    Object.keys(screens).forEach(function (key) {
      const isActive = key === name;
      const screen = screens[key];
      screen.classList.toggle("active", isActive);
      screen.setAttribute("aria-hidden", String(!isActive));
    });

    if (name === "detail" && dom.detailMedia) {
      dom.detailMedia.classList.add("is-loading");
      window.setTimeout(function () {
        dom.detailMedia.classList.remove("is-loading");
      }, 700);
    }

    window.scrollTo(0, 0);
  }

  function renderHome() {
    if (!state.route) {
      return;
    }

    updateStats();
    renderArtGrid();
  }

  function updateStats() {
    if (dom.totalArtworks) {
      dom.totalArtworks.textContent = String(state.route.artworks.length);
    }

    updateRouteStatus();
  }

  function updateRouteStatus() {
    var count = state.visitedIds.size;

    if (dom.routeStatusText) {
      if (count === 0) {
        dom.routeStatusText.textContent = "Jouw route is nog leeg.";
      } else if (count === 1) {
        dom.routeStatusText.textContent = "Je route bevat nu 1 werk.";
      } else {
        dom.routeStatusText.textContent = "Je route bevat nu " + count + " werken.";
      }
    }

    if (dom.routeStatusBar) {
      dom.routeStatusBar.classList.toggle("has-items", count > 0);
    }

    if (dom.btnViewRoute) {
      var hasItems = count > 0;
      dom.btnViewRoute.disabled = !hasItems;
      dom.btnViewRoute.setAttribute("aria-disabled", String(!hasItems));
      dom.btnViewRoute.classList.toggle("has-items", hasItems);
    }
  }

  function getFloor(artwork) {
    const loc = artwork.location.toLowerCase();
    if (loc.startsWith("souterrain")) return "souterrain";
    if (loc.startsWith("begane grond")) return "begane-grond";
    if (loc.startsWith("eerste etage")) return "eerste-etage";
    if (loc.includes("souterrain")) return "souterrain";
    if (loc.includes("verdieping 1") || loc.includes("eerste etage")) return "eerste-etage";
    return "begane-grond";
  }

  function getFloorLabel(artwork) {
    var floorKey = getFloor(artwork);
    var floorDef = FLOORS.find(function (f) { return f.key === floorKey; });
    return floorDef ? floorDef.label : "";
  }

  function getActiveFloors() {
    if (!state.route) return [];
    const used = new Set(state.route.artworks.map(getFloor));
    return FLOORS.filter(function (f) { return used.has(f.key); });
  }

  function getMostPopulatedFloor() {
    if (!state.route) return "begane-grond";
    const counts = {};
    state.route.artworks.forEach(function (a) {
      var f = getFloor(a);
      counts[f] = (counts[f] || 0) + 1;
    });
    var activeFloors = getActiveFloors();
    var maxFloor = activeFloors.length ? activeFloors[0].key : "begane-grond";
    var maxCount = 0;
    Object.keys(counts).forEach(function (f) {
      if (counts[f] > maxCount) { maxCount = counts[f]; maxFloor = f; }
    });
    return maxFloor;
  }

  function renderFloorTabs() {
    const container = dom.floorTabs;
    if (!container) return;

    container.innerHTML = "";
    const activeFloors = getActiveFloors();

    if (activeFloors.length <= 1) {
      container.hidden = true;
      return;
    }
    container.hidden = false;

    if (!activeFloors.find(function (f) { return f.key === state.activeFloor; })) {
      state.activeFloor = activeFloors[0].key;
    }

    activeFloors.forEach(function (floor) {
      const count = state.route.artworks.filter(function (a) {
        return getFloor(a) === floor.key;
      }).length;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "floor-tab" + (state.activeFloor === floor.key ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(state.activeFloor === floor.key));

      const labelSpan = document.createElement("span");
      labelSpan.textContent = floor.label;

      const countSpan = document.createElement("span");
      countSpan.className = "floor-tab-count";
      countSpan.textContent = String(count);

      btn.appendChild(labelSpan);
      btn.appendChild(countSpan);

      btn.addEventListener("click", function () {
        state.activeFloor = floor.key;
        renderFloorTabs();
        renderArtGrid();
      });

      container.appendChild(btn);
    });
  }

  function renderArtGrid() {
    const container = dom.artGridFlat;
    if (!container) return;

    stopGalleryCycling();
    autoScroll.destroy();
    container.innerHTML = "";
    state.galleryImageIndices = {};

    // All artworks rendered flat – no floor filter
    const artworks = state.route.artworks;
    artworks.forEach(function (artwork) {
      container.appendChild(createGalleryCard(artwork));
    });

    // Initialise auto-scroll after the browser has painted the new cards
    if (artworks.length > 2) {
      requestAnimationFrame(function () {
        autoScroll.init(container, artworks);
        startGalleryCycling();
      });
    } else {
      startGalleryCycling();
    }
  }

  function createGalleryCard(artwork) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "art-card";
    var displayTitle = (!artwork.title || artwork.title.toLowerCase() === "titel onbekend" || artwork.title.toLowerCase() === "zonder titel")
      ? "Werk van " + artwork.artist
      : artwork.title;
    button.setAttribute("aria-label", displayTitle + ". Ontdek dit werk.");
    if (artwork.id === state.currentArtworkId) {
      button.classList.add("is-current");
    }
    if (state.visitedIds.has(artwork.id)) {
      button.classList.add("is-selected");
    }
    button.dataset.artworkId = artwork.id;

    const visual = getArtworkVisual(artwork.id);
    const media = document.createElement("div");
    media.className = "art-card-media";
    media.style.background = visual;

    if (artwork.images && artwork.images.length > 0) {
      media.style.backgroundImage = 'url("' + artwork.images[0] + '")';
      media.style.backgroundSize = "cover";
      media.style.backgroundPosition = "center";
      media.classList.add("has-image");
    }

    const check = document.createElement("span");
    check.className = "art-card-check";
    check.setAttribute("aria-hidden", "true");
    check.textContent = "\u2713";
    media.appendChild(check);

    const initial = document.createElement("span");
    initial.className = "art-card-initial";
    initial.textContent = artwork.title.charAt(0).toUpperCase();
    media.appendChild(initial);

    const body = document.createElement("div");
    body.className = "art-card-body";

    const meta = document.createElement("div");
    meta.className = "art-card-meta";

    const titleWrap = document.createElement("div");

    var displayTitle = (!artwork.title || artwork.title.toLowerCase() === "titel onbekend" || artwork.title.toLowerCase() === "zonder titel")
      ? "Werk van " + artwork.artist
      : artwork.title;
    const title = document.createElement("h3");
    title.className = "art-card-title";
    title.textContent = displayTitle;

    titleWrap.appendChild(title);
    meta.appendChild(titleWrap);

    const location = document.createElement("p");
    location.className = "art-card-location";
    location.textContent = artwork.location.replace(/^(Souterrain|Begane grond|Eerste etage)\s*[—\-]\s*/i, "");

    const footer = document.createElement("div");
    footer.className = "art-card-footer";

    const action = document.createElement("span");
    action.className = "art-card-action";
    action.textContent = "Ontdek";
    footer.appendChild(action);

    const floorLabel = getFloorLabel(artwork);
    if (floorLabel) {
      const floorTag = document.createElement("span");
      floorTag.className = "art-card-floor-tag";
      floorTag.setAttribute("aria-hidden", "true");
      floorTag.textContent = floorLabel;
      footer.appendChild(floorTag);
    }

    body.appendChild(meta);
    body.appendChild(location);
    body.appendChild(footer);
    button.appendChild(media);
    button.appendChild(body);

    attachPressFeedback(button);

    button.addEventListener("click", function () {
      focusArtwork(artwork.id, true);
    });

    return button;
  }

  function focusArtwork(artworkId, shouldOpenDetail) {
    const artwork = findArtwork(artworkId);
    if (!artwork) {
      return;
    }

    state.currentArtworkId = artwork.id;
    renderHome();
    renderDetail(artwork);

    if (shouldOpenDetail) {
      showScreen("detail");
    }
  }

  function renderDetail(artwork) {
    if (!artwork) {
      return;
    }

    if (dom.detailTitle) {
      dom.detailTitle.textContent = artwork.title;
    }

    if (dom.detailArtist) {
      dom.detailArtist.textContent = artwork.artist;
    }

    if (dom.detailDescription) {
      dom.detailDescription.textContent = artwork.teaserText || artwork.description || "";
    }

    if (dom.detailLocation) {
      dom.detailLocation.textContent = artwork.location.replace(/^(Souterrain|Begane grond|Eerste etage)\s*[—\-]\s*/i, "");
    }

    updateWalkButtonLabel(artwork);
    renderDetailMedia(artwork);
    initAudioPlayer(artwork, {
      el: dom.audioEl,
      playBtn: dom.audioPlayBtn,
      progressBar: dom.audioProgressBar,
      label: dom.audioLabel
    });
  }

  function renderDetailMedia(artwork) {
    if (!dom.detailMedia) {
      return;
    }

    stopDetailCycling();
    state.detailRenderToken += 1;
    const renderToken = state.detailRenderToken;
    const visual = getArtworkVisual(artwork.id);

    dom.detailMedia.classList.remove("has-image");
    dom.detailMedia.innerHTML = "";
    dom.detailMedia.style.background = visual;
    dom.detailMedia.style.backgroundImage = "none";
    dom.detailMedia.style.backgroundSize = "cover";
    dom.detailMedia.style.backgroundPosition = "center";

    const initial = document.createElement("span");
    initial.className = "art-card-initial";
    initial.textContent = artwork.title.charAt(0).toUpperCase();
    dom.detailMedia.appendChild(initial);

    const detailImage = resolveDetailImage(artwork);
    if (!detailImage) {
      return;
    }

    const image = new Image();
    image.addEventListener("load", function () {
      if (renderToken !== state.detailRenderToken) {
        return;
      }

      dom.detailMedia.classList.add("has-image");
      dom.detailMedia.style.backgroundImage =
        "linear-gradient(180deg, rgba(16, 41, 58, 0.12), rgba(16, 41, 58, 0.5)), url(\"" + detailImage + "\")";
      startDetailCycling(artwork, dom.detailMedia, renderToken);
    });
    image.src = detailImage;
  }

  // ── Audio Player ────────────────────────────────────────

  function initAudioPlayer(artwork, playerDom) {
    stopAudio();

    var pd = playerDom || {
      el: dom.audioEl,
      playBtn: dom.audioPlayBtn,
      progressBar: dom.audioProgressBar,
      label: dom.audioLabel
    };

    audioPlayer.el = pd.el;
    audioPlayer.dom = pd;
    audioPlayer.useTTS = !artwork.audio;

    if (pd.playBtn) { pd.playBtn.innerHTML = ICON_PLAY; }
    if (pd.progressBar) { pd.progressBar.style.width = "0%"; }
    if (pd.label) { pd.label.textContent = "Luister naar het verhaal"; }

    if (!audioPlayer.useTTS && audioPlayer.el) {
      audioPlayer.el.src = artwork.audio;
      audioPlayer.el.load();
      audioPlayer.el.onerror = function () {
        audioPlayer.useTTS = true;
      };
      audioPlayer.el.ontimeupdate = updateAudioProgress;
      audioPlayer.el.onended = function () {
        audioPlayer.isPlaying = false;
        setPlayBtnState(false);
        if (audioPlayer.dom && audioPlayer.dom.label) {
          audioPlayer.dom.label.textContent = "Klaar";
        }
      };
    }
  }

  function toggleAudio(artwork) {
    if (audioPlayer.isPlaying) {
      stopAudio();
    } else {
      playAudio(artwork);
    }
  }

  function playAudio(artwork) {
    if (audioPlayer.useTTS || !audioPlayer.el || !audioPlayer.el.src) {
      if (!window.speechSynthesis) {
        return;
      }
      window.speechSynthesis.cancel();
      var text = artwork.audioText || artwork.description || "";
      if (!text) {
        return;
      }
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "nl-NL";
      utterance.rate = 0.88;
      utterance.pitch = 1;
      utterance.onend = function () {
        audioPlayer.isPlaying = false;
        audioPlayer.ttsUtterance = null;
        setPlayBtnState(false);
        if (audioPlayer.dom && audioPlayer.dom.label) {
          audioPlayer.dom.label.textContent = "Luister naar het verhaal";
        }
      };
      audioPlayer.ttsUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      audioPlayer.el.play().catch(function () {
        audioPlayer.useTTS = true;
        playAudio(artwork);
      });
    }
    audioPlayer.isPlaying = true;
    setPlayBtnState(true);
    if (audioPlayer.dom && audioPlayer.dom.label) {
      audioPlayer.dom.label.textContent = "Speelt\u2026";
    }
  }

  function stopAudio() {
    if (audioPlayer.el) {
      audioPlayer.el.pause();
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    audioPlayer.ttsUtterance = null;
    audioPlayer.isPlaying = false;
    setPlayBtnState(false);
  }

  function setPlayBtnState(isPlaying) {
    var btn = audioPlayer.dom && audioPlayer.dom.playBtn;
    if (!btn) {
      return;
    }
    btn.classList.toggle("is-playing", isPlaying);
    btn.setAttribute("aria-label", isPlaying ? "Pauzeer" : "Luister naar het verhaal");
    btn.innerHTML = isPlaying ? ICON_PAUSE : ICON_PLAY;
  }

  function updateAudioProgress() {
    if (!audioPlayer.el || !audioPlayer.el.duration) {
      return;
    }
    var pct = (audioPlayer.el.currentTime / audioPlayer.el.duration) * 100;
    if (audioPlayer.dom && audioPlayer.dom.progressBar) {
      audioPlayer.dom.progressBar.style.width = pct.toFixed(1) + "%";
    }
  }

  // ── Smart Route ─────────────────────────────────────────

  function getSortedRoute() {
    var floorOrder = { "souterrain": 0, "begane-grond": 1, "eerste-etage": 2 };
    return state.route.artworks
      .filter(function (a) { return state.visitedIds.has(a.id); })
      .sort(function (a, b) {
        return (floorOrder[getFloor(a)] || 0) - (floorOrder[getFloor(b)] || 0);
      });
  }

  // ── Walk Session ─────────────────────────────────────────

  function startWalkSession() {
    var sorted = getSortedRoute();
    if (!sorted.length) { return; }
    state.walkSession = { active: true, artworks: sorted, index: 0, step: "nav" };
    showScreen("walk");
    renderWalkStep();
  }

  function renderWalkStep() {
    var session = state.walkSession;
    var artwork = session.artworks[session.index];
    if (!artwork) { return; }
    if (session.step === "nav") {
      renderWalkNav(artwork);
    } else {
      renderWalkReward(artwork);
    }
  }

  function renderWalkNav(artwork) {
    var navView = document.getElementById("walk-nav-view");
    var rewardView = document.getElementById("walk-reward-view");
    if (navView) { navView.hidden = false; }
    if (rewardView) { rewardView.hidden = true; }

    var idx = state.walkSession.index;
    var total = state.walkSession.artworks.length;
    var floorObj = FLOORS.find(function (f) { return f.key === getFloor(artwork); });

    if (dom.walkProgress) {
      dom.walkProgress.textContent = "Werk " + (idx + 1) + " van " + total;
    }
    if (dom.walkFloorLabel) {
      dom.walkFloorLabel.textContent = floorObj ? floorObj.label : "";
    }
    if (dom.walkDirection) {
      dom.walkDirection.textContent = (artwork.navigation && artwork.navigation.direction)
        ? artwork.navigation.direction
        : (artwork.findMe || artwork.location);
    }
    if (dom.walkMotivation) {
      dom.walkMotivation.textContent = artwork.teaserText || artwork.description || "";
    }

    renderWalkProgressDots();
  }

  function renderWalkProgressDots() {
    var container = dom.walkProgressDots;
    if (!container) { return; }
    var total = state.walkSession.artworks.length;
    var current = state.walkSession.index;
    container.innerHTML = "";
    for (var i = 0; i < total; i++) {
      var dot = document.createElement("span");
      dot.className = "walk-dot" +
        (i < current ? " is-done" : "") +
        (i === current ? " is-active" : "");
      container.appendChild(dot);
    }
  }

  function renderWalkReward(artwork) {
    var navView = document.getElementById("walk-nav-view");
    var rewardView = document.getElementById("walk-reward-view");
    if (navView) { navView.hidden = true; }
    if (rewardView) { rewardView.hidden = false; }

    if (dom.walkRewardTitle) { dom.walkRewardTitle.textContent = artwork.title; }
    if (dom.walkRewardArtist) { dom.walkRewardArtist.textContent = artwork.artist; }
    if (dom.walkRewardStory) {
      dom.walkRewardStory.textContent = artwork.audioText || artwork.description || "";
    }

    renderWalkRewardMedia(artwork);

    initAudioPlayer(artwork, {
      el: dom.walkAudioEl,
      playBtn: dom.walkAudioPlayBtn,
      progressBar: dom.walkAudioProgressBar,
      label: dom.walkAudioLabel
    });

    var isLast = state.walkSession.index >= state.walkSession.artworks.length - 1;
    if (dom.btnNextArtwork) {
      dom.btnNextArtwork.textContent = isLast ? "Route voltooid \u2713" : "Volgend kunstwerk \u2192";
    }

    if (dom.walkNextHint && dom.walkNextHintText) {
      if (!isLast) {
        var nextArtwork = state.walkSession.artworks[state.walkSession.index + 1];
        var nextDirection = (nextArtwork.navigation && nextArtwork.navigation.direction)
          ? nextArtwork.navigation.direction
          : (nextArtwork.findMe || nextArtwork.location);
        dom.walkNextHintText.textContent = nextDirection;
        dom.walkNextHint.hidden = false;
      } else {
        dom.walkNextHint.hidden = true;
      }
    }
  }

  function renderWalkRewardMedia(artwork) {
    var mediaEl = dom.walkRewardMedia;
    if (!mediaEl) { return; }

    state.detailRenderToken += 1;
    var renderToken = state.detailRenderToken;
    var visual = getArtworkVisual(artwork.id);

    mediaEl.classList.remove("has-image");
    mediaEl.innerHTML = "";
    mediaEl.style.background = visual;
    mediaEl.style.backgroundImage = "none";
    mediaEl.style.backgroundSize = "cover";
    mediaEl.style.backgroundPosition = "center";

    var initial = document.createElement("span");
    initial.className = "art-card-initial";
    initial.textContent = artwork.title.charAt(0).toUpperCase();
    mediaEl.appendChild(initial);

    var detailImage = resolveDetailImage(artwork);
    if (!detailImage) { return; }

    var image = new Image();
    image.addEventListener("load", function () {
      if (renderToken !== state.detailRenderToken) { return; }
      mediaEl.classList.add("has-image");
      mediaEl.style.backgroundImage =
        "linear-gradient(180deg, rgba(16,41,58,0.12), rgba(16,41,58,0.5)), url(\"" + detailImage + "\")";
      startDetailCycling(artwork, mediaEl, renderToken);
    });
    image.src = detailImage;
  }

  function advanceWalkSession() {
    var session = state.walkSession;
    if (session.index >= session.artworks.length - 1) {
      endWalkSession();
      return;
    }
    stopAudio();
    session.index++;
    session.step = "nav";
    renderWalkStep();
  }

  function endWalkSession() {
    stopAudio();
    state.walkSession = { active: false, artworks: [], index: 0, step: "nav" };
    showScreen("home");
  }

  function renderRouteOverview() {
    var sorted = getSortedRoute();

    if (dom.routeOverviewMeta) {
      dom.routeOverviewMeta.textContent =
        sorted.length + " werk" + (sorted.length === 1 ? "" : "en");
    }

    if (!dom.routeOverviewList) return;
    dom.routeOverviewList.innerHTML = "";

    var byFloor = {};
    sorted.forEach(function (artwork, i) {
      var floor = getFloor(artwork);
      if (!byFloor[floor]) byFloor[floor] = [];
      byFloor[floor].push({ artwork: artwork, index: i + 1 });
    });

    FLOORS.forEach(function (f) {
      if (!byFloor[f.key]) return;
      var section = document.createElement("div");
      section.className = "route-floor-section";
      var heading = document.createElement("p");
      heading.className = "route-floor-heading";
      heading.textContent = f.label;
      section.appendChild(heading);
      byFloor[f.key].forEach(function (entry) {
        section.appendChild(createRouteListItem(entry.artwork, entry.index));
      });
      dom.routeOverviewList.appendChild(section);
    });
  }

  function createRouteListItem(artwork, index) {
    var item = document.createElement("div");
    item.className = "route-list-item";

    var num = document.createElement("span");
    num.className = "route-list-num";
    num.textContent = String(index);

    var body = document.createElement("button");
    body.type = "button";
    body.className = "route-list-body";

    var title = document.createElement("span");
    title.className = "route-list-title";
    title.textContent = artwork.title;

    var sub = document.createElement("span");
    sub.className = "route-list-sub";
    var floorObj = FLOORS.find(function (f) { return f.key === getFloor(artwork); });
    sub.textContent = (floorObj ? floorObj.label + " — " : "") + artwork.location.replace(/^(Souterrain|Begane grond|Eerste etage)\s*[—–-]\s*/i, "");

    body.appendChild(title);
    body.appendChild(sub);

    var removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "route-list-remove";
    removeBtn.setAttribute("aria-label", "Verwijder " + artwork.title + " uit route");
    removeBtn.textContent = "\u00d7";

    item.appendChild(num);
    item.appendChild(body);
    item.appendChild(removeBtn);

    attachPressFeedback(body);
    body.addEventListener("click", function () {
      focusArtwork(artwork.id, true);
    });

    attachPressFeedback(removeBtn);
    removeBtn.addEventListener("click", function () {
      state.visitedIds.delete(artwork.id);
      renderRouteOverview();
      renderHome();
      if (state.visitedIds.size === 0) {
        showScreen("home");
      }
    });

    return item;
  }

  function updateWalkButtonLabel(artwork) {
    if (!dom.btnWalk) {
      return;
    }

    dom.btnWalk.classList.remove("is-confirmed", "is-remove");
    if (state.visitedIds.has(artwork.id)) {
      dom.btnWalk.textContent = "Verwijder uit route";
      dom.btnWalk.classList.add("is-remove");
    } else {
      dom.btnWalk.textContent = "Voeg toe aan route";
    }
  }

  function flashWalkFeedback() {
    if (!dom.btnWalk) {
      return;
    }

    window.clearTimeout(state.feedbackTimer);
    dom.btnWalk.classList.add("is-confirmed");
    dom.btnWalk.textContent = "Toegevoegd aan route";

    state.feedbackTimer = window.setTimeout(function () {
      const artwork = getCurrentArtwork();
      if (!artwork) {
        return;
      }
      updateWalkButtonLabel(artwork);
    }, 1400);
  }

  function attachPressFeedback(element, onPressStart, onPressEnd) {
    const start = function () {
      element.classList.add("is-pressed");
      if (typeof onPressStart === "function") {
        onPressStart();
      }
    };

    const end = function () {
      element.classList.remove("is-pressed");
      if (typeof onPressEnd === "function") {
        onPressEnd();
      }
    };

    element.addEventListener("pointerdown", start);
    element.addEventListener("pointerup", end);
    element.addEventListener("pointercancel", end);
    element.addEventListener("pointerleave", end);
    element.addEventListener("blur", end);
  }

  function rotateArray(items, offset) {
    if (!items.length) {
      return [];
    }

    const startIndex = ((offset % items.length) + items.length) % items.length;
    return items.slice(startIndex).concat(items.slice(0, startIndex));
  }

  function getArtworkVisual(artworkId) {
    const index = state.route.artworks.findIndex(function (artwork) {
      return artwork.id === artworkId;
    });

    return VISUALS[index % VISUALS.length];
  }

  function resolveDetailImage(artwork) {
    if (artwork && artwork.images && artwork.images.length > 0) {
      return artwork.images[0];
    }
    return null;
  }

  // ── Image cycling helpers ──────────────────────────────────

  function startGalleryCycling() {
    stopGalleryCycling();
    if (!state.route) { return; }
    var hasCycleArtworks = state.route.artworks.some(function (a) {
      return a.images && a.images.length > 1;
    });
    if (!hasCycleArtworks) { return; }
    state.galleryImageTimer = setInterval(function () {
      var container = dom.artGridFlat;
      if (!container) { return; }
      container.querySelectorAll('[data-artwork-id]').forEach(function (card) {
        var artId = card.dataset.artworkId;
        var artwork = findArtwork(artId);
        if (!artwork || !artwork.images || artwork.images.length <= 1) { return; }
        var current = state.galleryImageIndices[artId] || 0;
        var next = (current + 1) % artwork.images.length;
        state.galleryImageIndices[artId] = next;
        var media = card.querySelector('.art-card-media');
        if (media) {
          media.style.backgroundImage = 'url("' + artwork.images[next] + '")';
        }
      });
    }, 3500);
  }

  function stopGalleryCycling() {
    if (state.galleryImageTimer) {
      clearInterval(state.galleryImageTimer);
      state.galleryImageTimer = null;
    }
  }

  function startDetailCycling(artwork, mediaEl, renderToken) {
    stopDetailCycling();
    if (!artwork.images || artwork.images.length <= 1) { return; }
    var idx = 0;
    state.detailImageTimer = setInterval(function () {
      if (renderToken !== state.detailRenderToken) {
        stopDetailCycling();
        return;
      }
      idx = (idx + 1) % artwork.images.length;
      mediaEl.classList.add('has-image');
      mediaEl.style.backgroundImage =
        'linear-gradient(180deg, rgba(16, 41, 58, 0.12), rgba(16, 41, 58, 0.5)), url("' + artwork.images[idx] + '")';
    }, 4000);
  }

  function stopDetailCycling() {
    if (state.detailImageTimer) {
      clearInterval(state.detailImageTimer);
      state.detailImageTimer = null;
    }
  }

  function getCurrentArtwork() {
    return findArtwork(state.currentArtworkId);
  }

  function findArtwork(artworkId) {
    if (!state.route) {
      return null;
    }

    return state.route.artworks.find(function (artwork) {
      return artwork.id === artworkId;
    }) || null;
  }

  function isKnownLocation(locationKey) {
    return Boolean(locationKey && ROUTES[locationKey]);
  }

  function safeGetStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeSetStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      return null;
    }
    return value;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
