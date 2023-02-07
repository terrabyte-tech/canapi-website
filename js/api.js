console.log("api.js loaded in " + document.referrer);

function canapiAction(){
  if(document.referrer == "https://terrabyte.eco" || document.referrer == "https://dev.terrabyte.eco"){
    console.log("terrabyte action logged");
  }
  console.log("canapi action logged!");
}