(function (root) {
  'use strict';

  let callbacks = new Set();
  let rawLinks = new Set();
  let links = [];

  function getLinks() {
    var elements = document.body.querySelectorAll('*');
    for (let el of elements) {
      if (el.tabIndex !== -1 && el !== document.body) {
        let rect = el.getBoundingClientRect();
        rawLinks.add(el);
        links.push({
          el,
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
        observer.observe(document.body, config);
        invokeCallbacks();
      }
    }
  }

  function disconnect(callback) {
    if (callbacks.has(callback)) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        observer.disconnect();
        rawLinks.clear();
        links = [];
      }
    }
  }

  const LinksObserver = {
    connect,
    disconnect
  };

  // Export.
  if (typeof module === 'object' && module.exports) {
    module.exports = LinksObserver;
  } else {
    root.LinksObserver = LinksObserver;
  }
}(this));
