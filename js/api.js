// console.log("api.js loaded in " + document.referrer);
const currentURL = window.location.href;
console.log("api.js loaded in " + currentURL);

function canapiAction(){
  if(currentURL == "https://terrabyte.eco" || currentURL == "https://dev.terrabyte.eco"){
    console.log("terrabyte action logged");
  }
  console.log("canapi action logged!");
}