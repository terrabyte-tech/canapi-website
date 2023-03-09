window.addEventListener("load", function(){

  // get/initialize client side data
    var currentURL = window.location.host;
    var key = null;
  
    console.log("canapi.js loaded in " + currentURL);
    var canapiInitObj = document.querySelector("[data-canapi-init]");
    var canapiHost = canapiInitObj.getAttribute("data-host");
  
  
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
  ////////////
  
  
    function canapiAction(key){
      if(key !== null){
        console.log("attempting action; key: " + key);

        makeAPIRequest();
      }
      else{
        console.log("bad key, unable to verify contribution");
        console.log("attempted key: " + key);
      }
    }

    function makeAPIRequest(){

      fetch(canapiHost, {
        method: "POST",

        // contents to send
        body: JSON.stringify({
          key: key,
          user: 'dev'
          // POST request URL, date are rendered on server
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })

        // convert to JSON
        .then(response => response.json())

        // display results
        .then(json => console.log(json));
    }


  }, false);