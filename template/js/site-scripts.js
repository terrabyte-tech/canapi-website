// Careful in template sync, should be site specific

window.addEventListener("load", function(){

  console.log(`[${window.siteData.project}] site-scripts.js loaded`);
  console.log(`Using template version [${window.siteData.templateVersion}].`);

  // Add a class to the body element to indicate that the page has loaded
  document.body.classList.add("loaded");

  // custom script here
  
}, false);