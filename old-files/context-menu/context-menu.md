# Context Menu for Efficiency

Gesehen in der elektronischen Personalakte (Fa. aconso)

```
<div class="contextMenu" id="contextMenu" data-window="aconsoTOP">
   <a title="Schließen" class="contextMenuEntry32" style="left: 40px; top: 40px; display:none" href="#cc">
      <img src="/aconso/images/icons/v4/designs/classic/RadialContextMenuInlay_32_gray.png">
   </a>
   <a title="Zurück zum Anfang" class="contextMenuEntry" style="left: 48px; top: 16px;" href="#tc">
      <img src="/aconso/images/icons/v4/designs/classic/darkblue/ico_up.png">
   </a>
   <a title="Diese Applikation beenden" class="contextMenuEntry" style="left: 80px; top: 48px;" href="#cr">
      <img src="/aconso/images/icons/v4/designs/classic/darkblue/ico_exit.png">
   </a>
   <a title="Startseite" class="contextMenuEntry" style="left: 48px; top: 80px;" href="#bc">
      <img src="/aconso/images/icons/v4/designs/classic/darkblue/ico_home.png">
   </a>
   <a title="Zurück zur letzten Aktion" class="contextMenuEntry" style="left: 16px; top: 48px;" href="#cl">
      <img src="/aconso/images/icons/v4/designs/classic/darkblue/ico_left.png">
   </a>
</div>
```

```
<div role="menubar" class="">
  <button>
</div>
```


```
.contextMenu {
    position: absolute;
    margin: 0px;
    padding: 0px;
    width: 112px;
    height: 112px;
    background: url(/aconso/images/icons/v4/designs/classic/RadialContextMenu_112_gray_80.png);
    z-index: 1900;
}
````

<script language="JavaScript">
      function contextMenuClick(id) {
        if ('cl' === id) {
          update2('NAVIGATE', 'PREV', null, null, '/aconso/framework.servlet?_action=_navigate', null);
        } else if ('tc' === id) {
          update2('NAVIGATE', 'ENTRY', null, null, '/aconso/framework.servlet?_action=_navigate', null);
        } else if ('cr' === id) {
          update2(null, null, null, null, '/aconso/framework.servlet?_action=com.aconso.framework.login.ACT_EXIT', 'aconsoTOP');
        } else if ('bc' === id) {
          update2('NAVIGATE', 'MAIN', null, null, '/aconso/framework.servlet?_action=_navigate', null);
        }
      }
      aconso.ContextMenu.Radial.defineDefaultAction("cl", {ref: contextMenuClick, icon: "/aconso/images/icons/v4/designs/classic/darkblue/ico_left.png", title: "Zurück zur letzten Aktion"});
      aconso.ContextMenu.Radial.defineDefaultAction("tc", {ref: contextMenuClick, icon: "/aconso/images/icons/v4/designs/classic/darkblue/ico_up.png", title: "Zurück zum Anfang"});
      aconso.ContextMenu.Radial.defineDefaultAction("cr", {ref: contextMenuClick, icon: "/aconso/images/icons/v4/designs/classic/darkblue/ico_exit.png", title: "Diese Applikation beenden"});
      aconso.ContextMenu.Radial.defineDefaultAction("bc", {ref: contextMenuClick, icon: "/aconso/images/icons/v4/designs/classic/darkblue/ico_home.png", title: "Startseite"});
      aconso.page.addOnShownHandler(function() {
        var contextMenu = contextMenuImpl({
          id: "contextMenu",
          cssclass: "contextMenu",
          centerIcon: "/aconso/images/icons/v4/designs/classic/RadialContextMenuInlay_32_gray.png",
          centerTitle: "Schließen",
          element: jQuery(document)
        });
        contextMenu.init();
      });
  </script>

https://epas-p.muc.allianz/aconso/javascript.servlet/contextmenu.js?version=4
 ´´´´
 var aconso = (function (that) { // PER-1194

  var that = that || {};

  that.ContextMenu = that.ContextMenu || function() { // CRE-974
    var that = {};

    that.debug = false;

    extendMethods(that); // add basic methods
    eventuality(that); // PER-1347 - add event handling

    // CRE-974 - allow components to temporarily disable the contextmenu
    var allDisabled = {}; // if any of its properties is true, 
    that.isAllDisabled = function() {
      var result = false;
      for (var source in allDisabled) { // PER-1304
        if (allDisabled.hasOwnProperty(source)) {
          result = aconso.as_boolean(allDisabled[source]);
        }
        if (true == result) break;
      }
      return result;
    };
    that.setAllDisabled = function(source, value) { // source: identifier to differentiate between certain sources; for example 'TextComposer'
      if (source) {
        allDisabled[source] = aconso.as_boolean(value);
      }
    };

    that.getTopContextMenu = function() { // PER-1347
      var topInstance = findTopFrame().aconso.ContextMenu || that;
      return topInstance;
    };

    that.instances = {}; // PER-1347
    that.registerInstance = function(instance, window) { // PER-1347
      var id = instance.getSpecValue('id');
      try {
        if (window && window.name) {
          id = window.name + '_' + id; // ids may not be unique when using iframes -> include window name!
        }
      } catch (e) {
        console.log(e);
      }
      that.instances[id] = instance;
    };

    that.hideAll = function() { // PER-1347
      for (var id in that.instances) {
        if (that.instances.hasOwnProperty(id)) {
          try {
            var instance = that.instances[id];
            if (instance) {
              instance.hide();
            }
          } catch (e) {
            console.log('exception in ContextMenu.hideAll; id: ' + id, e);
          }
        }
      }
    };

    return that;
  }();

  that.ContextMenu.Radial = that.ContextMenu.Radial || function() { // CRE-974

    var that = {};

    that.actionDefaults = [];
    that.actionDefaults[that.actionDefaults.length] = {id: 'cc', cssclass: 'contextMenuEntry32', left: '40px', top: '40px'};
    that.actionDefaults[that.actionDefaults.length] = {id: 'tc', cssclass: 'contextMenuEntry', left: '48px', top: '16px'};
    that.actionDefaults[that.actionDefaults.length] = {id: 'tr', cssclass: 'contextMenuEntry', left: '72px', top: '24px'};
    that.actionDefaults[that.actionDefaults.length] = {id: 'cr', cssclass: 'contextMenuEntry', left: '80px', top: '48px'};
    that.actionDefaults[that.actionDefaults.length] = {id: 'br', cssclass: 'contextMenuEntry', left: '72px', top: '72px'};
    that.actionDefaults[that.actionDefaults.length] = {id: 'bc', cssclass: 'contextMenuEntry', left: '48px', top: '80px'};
    that.actionDefaults[that.actionDefaults.length] = {id: 'bl', cssclass: 'contextMenuEntry', left: '24px', top: '72px'};
    that.actionDefaults[that.actionDefaults.length] = {id: 'cl', cssclass: 'contextMenuEntry', left: '16px', top: '48px'};
    that.actionDefaults[that.actionDefaults.length] = {id: 'tl', cssclass: 'contextMenuEntry', left: '24px', top: '24px'};

    var defaultActions = {};
    that.defineDefaultAction = function(id, action) {
      defaultActions[id] = action;
    };

    that.getDefaultAction = function(id) {
      return defaultActions[id];
    };

    return that;
  }();

	return that;
}(aconso || {}));

var contextMenuImpl = function(spec, that) {
  spec = jQuery.extend({
      id: 'cm',
      cssclass: 'radialcontextmenu',
      fade: false,
      dontUseDefaultActions: false,
      element: jQuery(document)
    }, spec);
  var that = that || {};
  extendMethods(that); // add basic methods
  eventuality(that); // add event handling

  that.getSpecValue = function(id) {
    return spec ? spec[id] : null;
  };

  var actions = {};
  var r = 0;
  var cmX = 0;
  var cmY = 0;

  that.defineAction = function(id, action) {
    actions[id] = action;
  };

  that.show = function() {
    hideAll(); //PER-1304 P
    if (aconso.ContextMenu.isAllDisabled()) { // CRE-974 - check whether any disabled flags are set
      return;
    }
    var cm = that.getJQueryElement();    
    if (true === that.getSpecValue('fade')) {
      cm.fadeIn();
    } else {
      cm.show();
    }
  };

  that.hide = function() {
    var cm = that.getJQueryElement();
    if (true === that.getSpecValue('fade')) {
      cm.fadeOut();
    } else {
      cm.hide();
    }
  };

  var hideAll = function() {//PER-1304 P
    /*- PER-1347 - replaced by global hideAll
    if (true === that.getSpecValue('fade')) {
      jQuery('div.contextMenu').fadeOut();
    } else {
      jQuery('div.contextMenu').hide();
    }
    */
    aconso.ContextMenu.getTopContextMenu().hideAll(); // PER-1347
  };

  that.init = function() {
    var cm = that.getJQueryElement();
    if (aconso.ContextMenu.debug) console.log('contextmenu.init; cm: ', cm, cm.get(), window);
    r = cm.width() / 2;
    /*-
    var isInIframe = (window.location != window.parent.location) ? true : false;
    if (isInIframe) { //TODO PER-1347  löschen wenn per-1347 gelöst wurde.
      r = 56;
    }
    */
    if (aconso.ContextMenu.debug) console.log('contextmenu.init; r: ', r);
    // add actions
    var html = '';
    // CRE-974 - renamed RadialContextMenu to ContextMenu.Radial
    for (var i = -1, n = aconso.ContextMenu.Radial.actionDefaults.length; ++i < n; ) {
      var actionDefault = aconso.ContextMenu.Radial.actionDefaults[i];
      var action = actions[actionDefault['id']];
      if (!action && (true !== that.getSpecValue('dontUseDefaultActions'))) {
        action = aconso.ContextMenu.Radial.getDefaultAction(actionDefault['id']);
      }
      if (action) {
        var title = action.title ? ' title="' + action.title + '"' : '';
        html += '<a class="' + actionDefault['cssclass'] + '"' + title + ' href="#' + actionDefault['id'] + '" style="left: ' + actionDefault['left'] + '; top: ' + actionDefault['top'] + ';"><img src="' + action.icon + '"></a>'
      }
      cm.html(html);
    }

    // bind event listeners
    cm.on('mouseout', function(e) { // PER-1288
      var d = Math.sqrt(Math.pow(cmX + r - e.pageX, 2) + Math.pow(cmY + r - e.pageY, 2));
      if (d > r) {
        that.hide();
      }
    });
    cm.on('mouseover', function(e) { // PER-1288
      var d = Math.sqrt(Math.pow(cmX + r - e.pageX, 2) + Math.pow(cmY + r - e.pageY, 2));
      if (d > r) {
        that.hide();
      }
    });
    cm.on('click', 'a', function() {
      var a = jQuery(this);
      var entryId = a.attr('href');
      var hashIndex = entryId ? entryId.indexOf('#') : -1;
      if (entryId && (-1 != hashIndex)) {
        entryId = entryId.substring(hashIndex + 1);
      }
      if ('cc' === entryId) {
        that.hide();
      } else {
        var action = actions[entryId];
        if (!action && (true !== that.getSpecValue('dontUseDefaultActions'))) {
          action = aconso.ContextMenu.Radial.getDefaultAction(entryId);
        }
        if (action && action.ref) {
          if (typeof action.ref === 'function') {
            action.ref(entryId, that.elementClicked, action);
          } else {
            // ?
          }
        }
        that.hide();
      }
      this.blur();
      return false;
    });
    that.getSpecValue('element').on('contextmenu', function(e) {
      that.elementClicked = jQuery(this);
      cmX = e.pageX - r;
      cmY = e.pageY - r;
      //console.log("cmX: ", cmX, " cmY: ", cmY , " r: ", r);
      cm.css({ top: cmY, left: cmX});
      that.show();
      return false;
    });

  };

  var jQueryElement = null; 
  that.getJQueryElement = function() { //TODO PER-1347
    if (!jQueryElement) {
      var id = that.getSpecValue('id');
      jQueryElement = jQuery('#' + id);
      if (!jQueryElement[0]) {
        //alert('element not found');
        jQuery('<div/>', { // PER-1595 (B) - XSS-Schwäche in Kontextmenü
          'id': id,
          'class': that.getSpecValue('cssclass'),
          'data-window': window.name,
          'style': 'display: none;'
        }).appendTo('body');
        jQueryElement = jQuery('#' + id);
      }
    }
    return jQueryElement;
  };

  if (that.getSpecValue('centerIcon')) {
    that.defineAction('cc', {ref: 'center', icon: that.getSpecValue('centerIcon'), title: that.getSpecValue('centerTitle')});
  }

  aconso.ContextMenu.getTopContextMenu().registerInstance(that, window); // PER-1347

  return that;
};
 ´´´´