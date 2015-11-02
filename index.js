var data = require('sdk/self').data;
var pageMod = require('sdk/page-mod');

pageMod.PageMod({
  include: '*',
  contentScriptFile: [
    data.url('linksobserver.js'),
    data.url('spatialnavigation.js'),
    data.url('main.js')
  ]
});



// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
