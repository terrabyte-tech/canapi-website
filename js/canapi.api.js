var currentURL = window.location.host;
var key;

console.log("canapi.api.js loaded in " + currentURL);


// create POST message
var date = new Date().toDateString;
var actionBody = {
  domain: currentURL,
  user: 'test',
  date: currentDate
};


// listen for clicks on canapi click triggers
var canapiTriggers = document.querySelectorAll("[data-canapi-click-trigger]");

if(canapiTriggers.length > 0){
  for(let x = 0; x < canapiTriggers.length; x++){
    canapiTriggers[x].addEventListener("click", function(){

      console.log("clicked a canapi trigger!");
      key = this.getAttribute("data-key");
      canapiAction(key);
    })
  }
}


function canapiAction(key){
  if(currentURL == "www.dev.terrabyte.eco" || currentURL == "www.dev.canapi.io"){
    console.log("terrabyte action logged");
    console.log("key: " + key);
  }
  else{
    console.log("request from unknown domain, unable to verify contribution");
    console.log("attempted key: " + key);
  }
  
}