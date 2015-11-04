let SpatialNavigation = (function () {
  'use strict';

  const UP = 38;
  const DOWN = 40;
  const LEFT = 37;
  const RIGHT = 39;

  let active = false;
  let links = new Set();
  let modKeys = ['altKey'];
  let nonModKeys;


  function go(newLinks, newModKeys) {
    if (!active) {
      active = true;
      document.addEventListener('keydown', onKeyDown, true);
    }
    links = newLinks || links;
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
      let index = nonModKeys.indexOf(key);
      if (index !== -1) {
        nonModKeys.splice(index, 1);
      }
    });
  }

  function onKeyDown(event) {
    if (links.size === 0) { return; }
    for (let key of nonModKeys) {
      if (event[key]) { return; }
    }
    for (let key of modKeys) {
      if (!event[key]) { return;}
    }

    let activeEl = document.activeElement;
    let iter = links.values();
    let el = iter.next().value;
    // el = iter.next().value;
    // console.log(el.getBoundingClientRect().left);
    if (!activeEl || activeEl.nodeName === 'BODY') {
      el.value.focus();
    } else {
      switch (event.keyCode || event.key) {
        case UP:
          el.value.focus();
          break;
        case DOWN:
          el.value.focus();
          break;
        case LEFT:
          el.value.focus();
          break;
        case RIGHT:
          el.value.focus();
          break;
      }
    }
  }

  updateModKeys(modKeys);
  return { go, stop };

}());
