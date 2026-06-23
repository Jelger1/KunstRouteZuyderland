# BRAND IDENTITY & STYLE GUIDE: ZUYDERLAND
> Referentiedocument voor AI-assistent (Claude) — leidend bij alle HTML/CSS/UX beslissingen.

---

## 1. Kernidentiteit & Missie

| | |
|---|---|
| **Organisatie** | Zuyderland (MC, Zorgcentra, Thuiszorg, Thuishulp, GGZ) |
| **Pay-off** | "De zorg van je leven." |
| **Kernwaarden** | Professioneel · Betrouwbaar · Energiek · Mensgericht |
| **Doelgroep app** | Herstellende patiënten (vermoeid, soms eenhandig, breed qua leeftijd en digitale vaardigheid) |

---

## 2. Kleurenpalet

| Token | HEX | RGB | Gebruik |
|---|---|---|---|
| `--color-teal` (primair 1) | `#286B86` | 40, 107, 134 | Primaire knoppen, actieve tabs, accenten |
| `--color-light-blue` (primair 2) | `#81CBF2` | 129, 203, 242 | Achtergrond-accenten, subtiele highlights |
| `--color-white` | `#FFFFFF` | 255, 255, 255 | Panels, kaarten, oppervlakken |
| `--color-ink` | `#183447` | 24, 52, 71 | Primaire tekst |
| `--color-ink-soft` | `#597387` | 89, 115, 135 | Secundaire tekst, labels |

**Regel:** Elk scherm MOET minimaal één van de twee primaire Zuyderland-kleuren bevatten.

---

## 3. Typografie

| Rol | Lettertype | Fallback |
|---|---|---|
| Headings / display | Mark OT | Aptos, Calibri, Arial, sans-serif |
| Body / UI | Mark OT | Aptos, Calibri, Arial, sans-serif |

- Koppen: `font-weight: 600–700`, ruime regelafstand (`line-height: 1.1–1.2`)
- Body: `font-size: 1rem`, `line-height: 1.5–1.65`
- Minimale leesbare fontgrootte: `0.78rem` (labels), `1rem` voor lopende tekst
- Toegankelijkheid: minimaal 16px voor patiëntteksten

---

## 4. Visuele Richtlijnen (CSS)

### ✅ WEL
- Veel witruimte (`gap`, `padding`)
- Zachte, lichte schaduwen (ambient + directional, max. `0 24px 60px rgba(...)`)
- Grote ronde hoeken: `1.5rem–2rem` voor panels, `1.6rem` voor kaarten, `999px` voor pills/knoppen
- Minimale, functionele animaties (`0.18s–0.22s ease`)
- Hoog contrast voor tekst op lichte achtergronden

### ❌ NIET
- Geen flare-effecten of glow
- Geen drukke gradients (maximaal 2 kleuren, lichte overgang)
- Geen zware box-shadows (geen `blur > 60px`)
- Geen drukke patronen of texturen
- Geen onnodig complexe visuele effecten

---

## 5. Componentstandaarden

### Knoppen
- Minimale taphoogte: **56px** (`3.5rem`) — gewone knoppen
- Primaire CTA: **72px** (`4.5rem`) — `btn-large`
- Border-radius: `999px` (volledig afgerond)
- Primaire kleur: `#286B86` (teal gradient)
- Actie-feedback: `scale(0.97–0.98)` on press

### Kaarten (`.art-card`)
- Breedte: `300px` vast in carousel, `flex: 0 0 300px`
- Border-radius: `1.6rem`
- Achtergrond: `rgba(255,255,255,0.92)`
- Schaduw: licht, tweelaagsstructuur
- Footer CTA pill: teal achtergrond, wit tekst

### Panels (`.home-panel`, `.art-stage`, etc.)
- Border-radius: `2rem`
- Achtergrond: licht wit-transparant met `backdrop-filter: blur(18px)`
- Border: `1px solid rgba(255,255,255,0.46)`

---

## 6. Tone of Voice (copy in UI)

| | |
|---|---|
| **Taal** | Nederlands, B1-niveau |
| **Toon** | Helder, empathisch, geruststellend, professioneel |
| **Zinnen** | Kort, actief, direct |
| **Perspectief** | Tweede persoon (jij/je) richting patiënt |
| **Gamification** | Alleen discovery, verwondering, emotie — GEEN prestaties of cijfers |

**Do's:** "Tik op een werk dat je aanspreekt." / "Luister naar het verhaal." / "Ik ben er!"
**Don'ts:** "Je hebt X meter gelopen." / "Geweldig gedaan! 🎉" / medisch jargon

---

## 7. Toegankelijkheidseisen

- Minimale tap-target: 44×44px (WCAG 2.2), voorkeur 56px+
- Kleurcontrast tekst/achtergrond: minimaal 4.5:1 (WCAG AA)
- `aria-label` op alle icoon-knoppen
- `aria-live` op statusupdates (route-teller)
- Audio: altijd TTS-fallback als `.mp3` ontbreekt
- `prefers-reduced-motion`: animaties uitschakelen

---

## 8. Schermstaten (app-flow)

```
screen-home      → Discovery Mode (galerij per verdieping)
screen-detail    → Artwork teaser + "Voeg toe aan route"
screen-route     → Route-overzicht gesorteerd op verdieping
screen-walk      → Actieve Route Mode
  └─ nav-view    → Loopinstructie + "Ik ben er!"
  └─ reward-view → Volledig verhaal + audio + "Volgend kunstwerk →"
```

---

*Laatste update: 16 juni 2026*
