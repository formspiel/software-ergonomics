*Sample for requirements and <abr title="definition of done" lang="en">DoD</abr>*

# Drop-Down
Eindeutiger Bezeichner zur besseren Kommunikation? DSX-Form-03?

## Status der Komponente
* Letzte Änderung: 6. November 2017
* Usertest: 23. November 2017 – Projekt UW.e
* Ergonomics Review: Freigegeben [Link zu mehr Informationen](/)
* Security Review: nicht notwendig
* Noch Andere Ideen?


## Wiederverwendung

Fertig implementierte Komponenten:

* Angular [GDF Angular Library]()
* REACT
* Neuer heißer Scheiß

##  Design
![DSX Drop-Down-Feld im normalen Zustand](dsx-drop-down-field.png)
*Hinweis: Die Komponente gibt es als [Sketch-Symbol zur UI-Konzeption](/)*

## Code

``` html
<select class="dsx--drop-down_standard" name="">
  <optgroup label="Gruppe A">
    <option value="">Option A-1</option>
    <option value="">Option A-2</option>
    <option value="">Option A-3</option>
  </optgroup>
  <optgroup label="Gruppe B">
    <option value="">Option B-1</option>
    <option value="">Option B-2</option>
    <option value="">Option B-3</option>
  </optgroup>
</select>
```
Notes:
_Evtl. Notizen zum Code zum besseren Verständnis_

## Varianten

* [Drop-Down mit Textfeld](/)
* Und noch ein großartiges DSX-Element


## Tastaturbedienung

Das Verhalten der Komponente muss dem Verhalten des Standard-Elements entsprechen. Gibt es bewusste Abweichungen, so sollen diese sich nah wie möglich an ähnlichen Komponenten orientieren. Eine umfassende Beschreibung gibt es auf den Seiten  des [W3C (englischer Text)](/) und (mit Fokus Barrierefreiheit) bei den [<abbr title="Accessible Rich Internet Applications" lang="en">WAI-ARIA</abbr> Authoring Practices (englischer Text)](http://w3c.github.io/aria-practices/)

### Verhalten

* <kbd>Tab</kbd> auf das Element
* Fokus (siehe Design) muss deutlich erkennbar sein
* <kbd>alt</kbd> + <kbd>↓</kbd> öffnet Optionen
* Fokus wechselt zum ersten Eintrag
* Nutzer kann mit <kbd>↑</kbd> und <kbd>↓</kbd> zwischen den Inhalten navigieren; Fokus geht mit der Auswahl mit
* Nutzer kann die Auswahl mit <kbd>Leertaste</kbd> oder <kbd>Enter</kbd> bestätigen und die Optionen schließen sich
* der Fokus geht auf das Drop-Down-Element zurück
  * der Nutzer kann jederzeit die Optionen mit der Taste <kbd>Esc</kbd> schließen
  * der Fokus geht dann zum Drop-Down-Element zurück

#### Automatisiertes Testen
Gherkin Dateien:
Mach mit! Du hast bereits ein Test für das Element geschrieben? Bitte teile Dein Skript, oder hinterlege einen Link zum Deinem Repository.

## Screenreader
* Die Implementierung soll sich am [ARIA 1.0/1.1](https://www.w3.org/TR/wai-aria-1.1/) und höher Standard orientieren.
* Das [CoC]() ist bei der Unterstützung gern behilflich.

## Definition of Done

- [ ] Es ist für die Zielgruppe deutlich zu erkennen, dass das Element eine Auswahl von Optionen bietet (z.B. durch Grafik "▼" )
- [ ] Bei Klick öffnen sich die Optionen ohne deutliche Verzögerung
- [ ] Es ist kein Abstand zwischen dem Element und den Optionen die ein Schließen provozieren können.
- [ ] Alle Status (enabled, :hover, :active und :fokus) sind implementiert.
- [ ] Eine Bedienung für Tastatur ist vollständig möglich
  - [ ] Das Verhalten orientiert sich am dem im Abschnitt "Tastaturbedienung" vorgegebenen Verhalten
- [ ] Alle Zustände und Optionen (inkl. Auswahl) sind im Windows® Hochkontrastmodus (im IE) erkennbar.
- [ ] Das Element ist vollständig per Screenreader (JAWS 18+) steuerbar.


