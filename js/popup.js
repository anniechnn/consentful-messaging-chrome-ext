
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

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
  main();
});

