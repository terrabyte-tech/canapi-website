// console.log("api.js loaded in " + document.referrer);
var currentURL = window.location.href;
currentURL = currentURL.split("//").pop();

console.log("api.js loaded in " + currentURL);

function canapiAction(){
  if(currentURL == "dev.terrabyte.eco" || currentURL == "dev.canapi.io"){
    console.log("terrabyte action logged");
  }
  console.log("canapi action logged!");
}