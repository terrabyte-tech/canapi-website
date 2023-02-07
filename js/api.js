var currentURL = window.location.host;

console.log("Canapi api.js loaded in " + currentURL);

function canapiAction(){
  if(currentURL == "www.dev.terrabyte.eco" || currentURL == "www.dev.canapi.io"){
    console.log("terrabyte action logged");
  }
  else{
    console.log("request from unknown domain, unable to verify contribution");
  }
  
}