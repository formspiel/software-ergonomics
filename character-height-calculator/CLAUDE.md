# Character-Size Project — Latest State

**Last Updated:** 2026-04-23  
**Status:** Consolidation complete, pushed to remote

## Completion Summary

The character-size project consolidation is **complete and committed to main**. Three overlapping versions of the character height calculator have been unified into a single, feature-complete tool.

### What Was Done

**Merged three versions into one:**
- Old German version (`character-height-calculator copy 2/`) — deleted
- Intermediate English root version (root index.html + supporting files) — deleted
- Polished English version (`character-height-calculator/`) — **retained as single source of truth**

**Features merged:**
1. ✅ Viewing distance input (numeric field, cm)
2. ✅ Screen type shortcuts (radio buttons: Monitor 50cm / Laptop 40cm / Tablet 40cm / Smartphone 30cm)
3. ✅ Arc-minute thresholds (16′, 20′, 22′ calculated from viewing distance)
4. ✅ Auto-calculate on preset selection
5. ✅ Bug fix: reset button now correctly clears all fields

**Device data migrated:**
- 46 corporate devices from `screens.js` → `presets.json`
- Organized into 4 categories: Office Display, Laptop, Tablet, Smartphone
- Normalized schema: `{ key, label, width, height, diagonal }`

### Current Structure

```
/
├── character-height-calculator/
│   ├── index.html          (consolidated calculator, vanilla JS)
│   ├── presets.json        (46 devices, 4 categories)
│   ├── style.css           (updated for new sections)
│   ├── README.md           (usage docs)
│   ├── CLAUDE.md           (this file)
│   └── docs/
│       └── superpowers/
│           ├── specs/      (specification document)
│           └── plans/      (implementation plan, 10 tasks)
├── character-height-checker/  (separate tool, not consolidated)
├── Windows-high-contrast/
├── coc-ressources/
├── modals-popups-other/
├── prevent-tab-close/
├── theming/
└── index.html              (root index)
```

### Recent Commits

```
778d957 Add consolidated character-size project with merged calculator
8c505e1 Open local changes
d8b6b46 Clean up
```

### Files Deleted

- `character-height-calculator copy 2/` (old German version)
- Root: `index.html`, `styles.css`, `screens.js`, `screen-management.js`, `character-height-calculator.js`

---

## Technical Details

### Arc-Minute Calculation

Formula used for threshold detection:
```
pixel_pitch_mm = physical_height_mm / screen_height_px
arc_minutes(n_px) = (2 * atan((n_px * pixel_pitch_mm / 2) / viewing_distance_mm) * 180 / PI) * 60
```

Thresholds: 16′ (secondary info), 20′ (minimum), 22′ (optimal)  
Viewing distance: entered in cm, multiplied by 10 for calculations

### Device Categories

| Category | Count | Examples |
|----------|-------|----------|
| Office Display | 15 | Fujitsu, NEC models (1920×1080 to 2560×1600) |
| Laptop | 12 | Fujitsu Lifebook, HP, Lenovo (1366×768 to 1920×1080) |
| Tablet | 6 | iPad Pro 9.7", Samsung Galaxy Tab |
| Smartphone | 13 | iPhone, Pixel, Samsung Galaxy (1080×2400 to 2688×1242) |

### Known Issues / Notes

- Character-height-checker tool was manually moved out of scope by user — not part of consolidation
- Device specifications verified during migration (iPhone 13 mini corrected: 1080×2340 @ 5.4", not 1170×2532)
- NEC EA261WM labeled "(old)" to distinguish from current product line
- No build system — opens directly in browser as standalone HTML

---

## Next Steps / Out of Scope (Phase 2+)

- UI/UX improvements
- Adding arc-minute results to screenshot export
- Translating remaining German content
- Making Calculate button optional (auto-calculate on all input changes)
- README content expansions

---

## For Future Sessions

- **Smoke test:** Open `character-size/character-height-calculator/index.html` in browser; verify all features work (presets, viewing distance input, screen type shortcuts, arc-minute calculations)
- **Adding devices:** Edit `presets.json` directly (no build system)
- **Spec reference:** See `character-size/docs/superpowers/specs/2026-04-22-character-height-calculator-cleanup-design.md`
