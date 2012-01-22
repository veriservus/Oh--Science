var store, cfg;

(function($) {
  //Sotorage wraps localStorage
  var Storage = function() {};

  Storage.prototype.set = function(key, value) {
    localStorage[key] = JSON.stringify(value);
  }

  Storage.prototype.get = function(key) {
    return JSON.parse((localStorage[key] || "{}"));
  }

  store = new Storage();

  //holds configuration
  var Config = function() {
    this.sotrageKey = 'scConfig';
    this.defaults   = {
      word: 'Science',
      enableHighlight: true,
      enableAlert: true,
      ignoreCase: false,
      tags: ['h1', 'h2', 'h3', 'h4', 'h5']
    }
  }

  Config.prototype.vals = function(values) {
    if(!arguments.length) {
      return store.get(this.storageKey);
    }
    return store.set(this.storageKey, values)
  }

  Config.prototype.setup = function(values) {
    if(!values) values = this.defaults
    this.vals($.extend({}, this.vals(), values));
  }

  cfg = new Config();
  cfg.setup();
  
  //listen for config update:
  chrome.extension.onRequest.addListener(function(req) {
    cfg.setup(req);
  })

})(jQuery)
