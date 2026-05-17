# Theming &amp; Accessibility

DRAFT!

## Requirements

With Dark Mode a hot topic is in the block since 2017. Since 2019 it's default on iOS and Android 10 and suddenly becomes "default". The high contrast mode is available since ....
To be truly human-centred we should deliver the design in light mode, dark mode *and high contrast*. Fortunately Microsoft finally delivers--thanks to Chromium--a true browser with support for media queries. Delivering for high contrast is easy as cake now.

## Research
* https://drafts.csswg.org/mediaqueries-5/#forced-colors
* https://www.w3.org/TR/css-color-adjust-1/#forced
* https://drafts.csswg.org/css-color/#css-system-colors
* https://drafts.csswg.org/mediaqueries-5/#descdef-media-prefers-color-scheme	
* https://hiddedevries.nl/en/blog/2018-12-24-making-single-color-svg-icons-work-in-dark-mode
* https://ericwbailey.github.io/working-with-high-contrast-mode-talk/#/

The old proprietary attribute where aliased:
-ms-high-contrast to forced-colors
-ms-high-contrast-adjust to forced-colors-adjust

## Support

09/2020

| CSS | Support |
|---|---|
| ```(-ms-high-contrast: active), (-ms-high-contrast: black-on-white), (-ms-high-contrast: white-on-black)``` | **macOS**: not supported; **Windows**: IE, Edge [Deprecated]  |
| ```(prefers-color-scheme: dark)``` (Dark Mode not High Contrast mode) | **macOS**: Safari, Chrome; **Windows**: Safari, Chrome, Chredge (Chromium Edge) |
| ```(forced-colors: active)``` | **macOS**: not supported; **Windows**: Chredge (Chromium Edge) |

### Let's look into the future

```(prefers-contrast: high)```
https://drafts.csswg.org/mediaqueries-5/#prefers-contrast


### Copy and Paste

Full media query example for old and new contrast mode support:

```@media screen and (-ms-high-contrast: active), (forced-colors: active) {}```

## Windows System High Contrast Colours
| System Colour | Description |
|---|---|
| Canvas | Background of application content or documents.  |
| CanvasText | Text in application content or documents. |
| LinkText | Text in non-active, non-visited links. |
| VisitedText | Text in visited links. |
| ActiveText | Text in active links. |
| ButtonFace | The face background color for push buttons. |
| ButtonText | Text on push buttons. |
| Field | Background of input fields. |
| FieldText | Text in input fields. |
| Highlight | Background of item(s) selected in a control. |
| HighlightText | Text of item(s) selected in a control. |
| GrayText | Disabled text. (Often, but not necessarily, gray.) |
