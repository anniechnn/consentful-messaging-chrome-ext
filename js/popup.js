
// Listener for login button

document.addEventListener('DOMContentLoaded', function () {
  console.log("loaded")
  console.log("initialized")

  if (document.getElementById('Login') != null) {
    document.getElementById('Login').addEventListener('click', oauthScript);
    console.log("event listener added")
  }
});

// Run oauth scirpt
function oauthScript() {
  console.log("clicked log in")
  chrome.tabs.executeScript({
    file: 'js/oauth.js'
  });
}


// Listener for in twitter messages page
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'confirmed') {
      console.log(document.location.href)
      if (document.location.href === "https://twitter.com/messages" || "http://twitter.com/messages") {
        console.log("In messages!")
      }
    }
  });
