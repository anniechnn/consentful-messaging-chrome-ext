
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('Login') != null) {
    document.getElementById('Login').addEventListener('click', oauthScript);
  }
});

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

function oauthScript() {
  chrome.tabs.executeScript({
    file: 'js/oauth.js'
  });
}



