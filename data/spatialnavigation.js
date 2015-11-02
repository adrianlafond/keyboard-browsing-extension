(function (root) {
  'use strict';

  const UP = 38;
  const DOWN = 40;
  const LEFT = 37;
  const RIGHT = 39;

  let active = false;
  let links = null;
  let modKeys = ['altKey'];
  let nonModKeys;


  function go(newLinks, newModKeys) {
    if (!active) {
      active = true;
      document.addEventListener('keydown', onKeyDown, true);
    }
    links = newLinks;
    if (newModKeys) {
      updateModKeys(newModKeys);
    }
  }

  function stop() {
    if (active) {
      active = false;
      document.removeEventListener('keydown', onKeyDown, true);
    }
  }

  function updateModKeys(newModKeys) {
    modKeys = newModKeys;
    nonModKeys = ['ctrlKey', 'shiftKey', 'altKey', 'metaKey'];
    modKeys.forEach(key => {
      var index = nonModKeys.indexOf(key);
      if (index !== -1) {
        nonModKeys.splice(index, 1);
      }
    });
  }

  function onKeyDown(event) {
    if (links.length === 0) {
      return;
    }
    for (let key of nonModKeys) {
      if (event[key]) {
        return;
      }
    }
    for (let key of modKeys) {
      if (!event[key]) {
        return;
      }
    }
    let activeEl = document.activeElement;
    if (!activeEl || activeEl.nodeName === 'BODY') {
      links[0].el.focus();
    } else {
      switch (event.keyCode || event.key) {
        case UP:
          links[1].el.focus();
          break;
        case DOWN:
          links[2].el.focus();
          break;
        case LEFT:
          links[3].el.focus();
          break;
        case RIGHT:
          links[4].el.focus();
          break;
      }
    }
  }

  updateModKeys(modKeys);
  const SpatialNavigation = { go, stop };

  if (typeof module === 'object' && module.exports) {
    module.exports = SpatialNavigation;
  } else {
    root.SpatialNavigation = SpatialNavigation;
  }

}(this));
