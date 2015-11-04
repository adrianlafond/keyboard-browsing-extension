var LinksObserver = (function () {
  'use strict';

  let callbacks = new Set();
  let links = new Set();

  // Create a set of all tab-enabled elements that are not document.body.
  function getLinks() {
    var elements = document.body.querySelectorAll('*');
    for (var el of elements) {
      if (el.tabIndex !== -1 && el !== document.body) {
        links.add(el);
      }
    }
  }

  // Send links to all callbacks/listeners.
  function invokeCallbacks() {
    callbacks.forEach(cb => {
      cb(links);
    });
  }

  let observer = new MutationObserver(mutations => {
    mutations.forEach(record => {
      for (let node of record.addedNodes) {
        if (node.tabIndex !== -1) {
          links.add(node);
        }
      }
      for (let node of record.removedNodes) {
        if (node.tabIndex !== -1) {
          links.delete(node);
        }
      }
      invokeCallbacks();
    })
  });

  let config = {
    childList: true,
    attributes: true,
    subtree: true,
    characterData: true
  };

  function connect(callback) {
    if (!callbacks.has(callback)) {
      callbacks.add(callback);
      if (callbacks.size === 1) {
        getLinks();
        observer.observe(document.body, config);
        invokeCallbacks();
      }
    }
  }

  function disconnect(callback) {
    if (callbacks.has(callback)) {
      callbacks.devare(callback);
      if (callbacks.size === 0) {
        observer.disconnect();
        links.clear();
      }
    }
  }

  return { connect, disconnect };
}());
