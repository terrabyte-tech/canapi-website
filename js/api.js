var currentURL = window.location.host;

console.log("Canapi api.js loaded in " + currentURL);

var date = new Date().toDateString;

var actionBody = {
  domain: currentURL,
  user: 'test',
  date: currentDate
};

function canapiAction(){
  if(currentURL == "www.dev.terrabyte.eco" || currentURL == "www.dev.canapi.io"){
    console.log("terrabyte action logged");
  }
  else{
    console.log("request from unknown domain, unable to verify contribution");
  }
  
}