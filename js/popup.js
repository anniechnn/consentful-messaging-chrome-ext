
// Listener for login button
document.addEventListener('DOMContentLoaded', function () {
  OAuth.initialize(OAUTH_PUBLIC_KEY);
  if (document.getElementById('Login') != null) {
    document.getElementById('Login').addEventListener('click', oauthScript);
  }
});

// Run oauth scirpt
function oauthScript() {
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





