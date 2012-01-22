(function($) {
  science = {
    init: function() {
      this.cfg = {};
      this.setupListeners();
    },
    runMatcher: function() {
      var msg = 'Oh, '
      if(this.matchAndColour()) {
        msg += '"' + this.cfg.word + '"!';
      } else {
        msg += 'no "' + this.cfg.word + '" is not here!';
      }
      this.showMessage(msg);
    },
    showMessage: function(msg) {
      if(this.cfg.enableAlert) {
        alert(msg)
      } else {
        console.log(msg);
      }
    },
    matchingElements: function() {
      return $(this.cfg.tags.join(',')); 
    },
    setupListeners: function() {
      var self = this;
      //assumes one type of request - the one with config that triggers runMatcher
      chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
        //cleanup after previous run:
        $('*').removeClass('sc_match');
        //update local config
        self.cfg = request;
        //go for it
        self.runMatcher();
      });
    },
    matchAndColour: function() {
      var self     = this;
      var hasMatch = false;
      self.matchingElements().each(function(idx, element) {
        var jElement = $(element);
        var regFlags = self.cfg.ignoreCase ? 'i' : '';
        if (jElement.text().match(new RegExp(self.cfg.word, regFlags))) { 
          hasMatch = true;
          if (self.cfg.enableHighlight)
            jElement.addClass('sc_match');
        }
      });
      return hasMatch;
    }
  };
  
  science.init();
})(jQuery) 
