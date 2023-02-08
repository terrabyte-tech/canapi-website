window.addEventListener("load", function(){

  var currentURL = window.location.host;
  var key = null;

  console.log("canapi.api.js loaded in " + currentURL);



  // listen for clicks on canapi click triggers
  var canapiTriggers = document.querySelectorAll("[data-canapi-click-trigger]");

  if(canapiTriggers.length > 0){
    for(let x = 0; x < canapiTriggers.length; x++){
      canapiTriggers[x].addEventListener("click", function(){
        key = this.getAttribute("data-key");
        canapiAction(key);
      })
    }
  }


  function canapiAction(key){
    if(key !== null){
      if(currentURL == "www.dev.terrabyte.eco" || currentURL == "www.dev.canapi.io"){
        console.log("terrabyte action logged");
        console.log("key: " + key);
      }
      else{
        console.log("request from unknown domain, unable to verify contribution");
        console.log("attempted key: " + key);
      }
    }
    else{
      console.log("bad key, unable to verify contribution");
      console.log("attempted key: " + key);
    }
  }


  // create POST message
  var currentDate = new Date().toDateString;
  var actionBody = {
    domain: currentURL,
    user: 'test',
    date: currentDate
  };
  
}, false);