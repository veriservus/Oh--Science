(function($, $b){
  //populates options form from background localStorage
  function setFormValues() {
    $("#tags").val($b.cfg.vals().tags);
    $("#word").val($b.cfg.vals().word);
    $("#enableAlert").prop('checked', $b.cfg.vals().enableAlert);
    $("#enableHighlight").prop('checked', $b.cfg.vals().enableHighlight);
    $("#ignoreCase").prop('checked', $b.cfg.vals().ignoreCase);
    $("#runOnLoad").prop('checked', $b.cfg.vals().runOnLoad);
  }
  
  //returns options object from options form
  function getFormValues() {
    return {
        tags: $("#tags").val() || ['*'],
        word: $("#word").val(),
        enableAlert: $("#enableAlert").is(":checked"),
        enableHighlight: $("#enableHighlight").is(":checked"),
        ignoreCase: $("#ignoreCase").is(":checked"),
        runOnLoad: $("#runOnLoad").is(":checked")
    };
  }
  
  //sends options to background page
  //and to the since_contet of current tab
  function sendOptions(options) {
    chrome.extension.sendRequest(options);
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendRequest(tab.id, options);
    });
  }
  
  //when ready:
  $(function(){
    setFormValues();

    $("#options_btn").click(function(e){
      sendOptions(getFormValues());
      e.preventDefault();
    });

  });

})(jQuery, chrome.extension.getBackgroundPage())
