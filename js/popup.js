
// Listener for login button

document.addEventListener('DOMContentLoaded', function () {
  console.log("loaded")

  if (document.getElementById('Login') != null) {
    console.log("event listener added")
    document.getElementById("Login").addEventListener("click", function() {
      console.log("click");
      let request = new XMLHttpRequest();
      request.open('GET', 'http://127.0.0.1:8000/accounts/twitter/login/');
      request.send();
    });
  }
});


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
