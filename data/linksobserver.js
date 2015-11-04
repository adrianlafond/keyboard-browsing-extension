let LinksObserver = (function () {
  'use strict';

  let callbacks = new Set();
  let rawLinks = new Set();
  let links = [];

  function getLinks() {
    let elements = document.body.querySelectorAll('*');
    for (let el of elements) {
      if (el.tabIndex !== -1 && el !== document.body) {
        let rect = el.getBoundingClientRect();
        rawLinks.add(el);
        links.push({
          el: el,
          rect: el.getBoundingClientRect()
        })
      }
    }
  }

  function invokeCallbacks() {
    callbacks.forEach(cb => {
      cb(links);
    });
  }

  let observer = new MutationObserver(mutations => {
    mutations.forEach(record => {
      for (let node of record.addedNodes) {
        if (node.tabIndex !== -1) {
          rawLinks.add(node);
        }
      }
      for (node of record.removeNodes) {
        if (node.tabIndex !== -1) {
          rawLinks.delete(node);
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
        // observer.observe(document.body, config);
        invokeCallbacks();
      }
    }
  }

  function disconnect(callback) {
    if (callbacks.has(callback)) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        // observer.disconnect();
        rawLinks = [];
        links = [];
      }
    }
  }

  return { connect, disconnect };
}());
