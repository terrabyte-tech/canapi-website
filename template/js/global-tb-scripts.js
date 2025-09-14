window.addEventListener("load", function(){

  console.log(`[${window.siteData.project}] global-tb-scripts.js loaded`);

  // could revisit this and create within 11ty??

  // change copyright date
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  
  var copyrightSpan = document.getElementById("current-year-text");
  // for older implementations
  var oldCopyrightSpan = document.getElementsByClassName("copyright-date")[0];

  if(copyrightSpan){
    copyrightSpan.appendChild(document.createTextNode(currentYear));
  }
  // for older implementations
  else if(oldCopyrightSpan){
    oldCopyrightSpan.appendChild(document.createTextNode(currentYear));
  }
  else{
    // element doesn't exist
  }

}, false);