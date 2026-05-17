# CoC Character Height checker
An semi-automatic script that supports you to fulfill the ergonmic requirements based on [ISO 9241-303](https://www.iso.org/standard/57992.html).

> ## 1.2 Character Height (In case of usage by Allianz employees)

> **Desktop:** The required character height for optimal legibility on the screen of a viewing distance of 50cm must be at least 20 – 22 arc minutes. This applies to the presentation of all texts and text graphics required for the user's work task. The character height is measured by the capital letter.

> **Mobile:** The application supports the font settings of the operating system for optimal display of text with maximum customisation by the user. If the app uses fixed font sizes, a font height of 26 device pixels (iPad & iPad Pro) is expected for uppercase letters.

> Standard: [ISO 9241-303](https://www.iso.org/standard/57992.html)
> - https://connect.allianz.com/docs/DOC-294945

# TODO
- [ ] Separate the character height part of the full script
- [ ] Translate everything to english
- [ ] Proper CSS styling
- [ ] Disscusion how to deliver this script (Build Pipeline? Extension? NPM package? ...)

# How It Works
ToDo

---

[DE] Informationen vom internen Ergonomie-Test-Skript

## Was kann geprüft werden?
Browserseiten, deren Ausgabe auf HTML basiert.
 
## Welche Seiteninhalte können geprüft werden?
* Zeichenhöhe in Abhängigkeit von der Schriftart
* Schriftart (Konsole)
* Anzeige aller ALT-Attribute von Bildern
* Anzeige aller Bilder, bei denen das ALT-Attribut fehlt
* Anzahl der Bilder mit ALT-Attribut (Konsole)
* Anzahl der Bilder mit Text im ALT-Attribut (Konsole)
*  Anzeige aller Elemente mit LANG-Tag (Anwendung und Konsole)
* Anzeige von LABEL-Elementen ohne FOR-Attribut und ohne zugehöriges Eingabefeld (Anzahl wird in der Konsole ausgegeben)
* Anzeige von Eingabefeldern ohne zugehöriges LABEL-Element (Anzahl wird in der Konsole ausgegeben)
* Anzeige von Überschriften (Hx-Elemente) (Anzahl wird in der Konsole ausgegeben)
* Anzeige von Tabellen-Elemente (Anzahl wird in der Konsole ausgegeben inkl. Tabellen ohne Head)
* Anzeige von Listen (Anzahl wird in der Konsole ausgegeben)
* Anzeige von Links (Anzahl wird in der Konsole ausgegeben)
* Farbkontrast
* Browserfenster Größe ändern
 
## Anleitung zur Einbindung
### Ab Edge
Lade den angehängten Ordner herunter und entpacke ihn.
Führe die hier beschriebenen Schritte zur Erstellung einer MS Edge Extension durch: https://docs.microsoft.com/en-us/microsoft-edge/extensions/guides/adding-and-removing-extensions#adding-an-extension

~~Bis Internet Explorer 11
Erstelle einen beliebigen Favoriten im Browser deiner Wahl.
Klicke mit der rechten Maustaste auf den Favoriten und wähle "Eigenschaften".
Füge folgenden Code (unbedingt unverändert lassen und keine Leerzeichen und Zeilenumbrüche einfügen) in das Feld "URL" ein:
javascript:el=document.createElement('script');el.src='http://url.allianz/jV';el.charset='utf-8';document.body.appendChild(el);~~

Bestätige mit Ok.

## Anleitung zur Verwendung
Rufe eine Webseite im Browser auf. Öffne die Entwicklerkonsole des Browsers mit der Taste F12. Klicke anschließend auf den Favoriteneintrag des Tools. In der Konsole wird eine Zusammenfassung der wichtigsten erkannten Elemente ausgegeben.
 
## Schrift
### Allgemeines
Die Prüfung der Zeichenhöhe orientiert sich an den Schriftgrößen der berechneten Schriftarten auf einer Webseite. Im Tool sind ein paar ausgewählte Schriftarten mit ihren Schriftgrößen und der entsprechenden Zeichenhöhe des Großbuchstaben E hinterlegt. Wird eine Schriftart auf der Webseite verwendet, die im Tool nicht hinterlegt ist, wird geprüft, als ob die auf der Webseite erkannte Schriftart Arial wäre. Dadurch kann es zu minimalen Abweichungen zwischen der ermittelten und tatsächlichen Zeichenhöhe kommen, wodurch stets eine manuell Prüfung des Ergebnisses notwendig ist.
 
## Unterstützte Schriftarten
* Arial
* Helvetica
* Lato
* Open Sans
* Roboto
* Segoe
* Segoe UI

### TODO
- [ ] Allianz Neo

Neue Helvetica wird zwar häufig auf Webseiten als Schriftart angegeben, aber da diese Schriftart nicht Bestandteil von Windows ist und auf allen geprüften Webseiten die Schriftart Neue Helvetica nicht explizit eingebunden ist, kommt diese Schriftart gar nicht zum Einsatz.
