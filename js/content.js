
var URL_HEADER = "http://localhost:8000"

// TODO: Weikun
function setLocalStorage() {

}

// TODO: Weikun
function cacheAccount(username, result) {

}
  
function scanMessageSenders() {
  if (document.location.href == 'https://twitter.com/messages') {
    var messageTabElement = document.querySelectorAll('[aria-label="Timeline: Messages"]')[0];
    if(messageTabElement != null){ // safety
      var messages = messageTabElement.querySelectorAll('[data-testid="conversation"]');
      for(var i=0; i<messages.length; i++) {
        var userCandidate = messages[i].querySelector('a')
        var canId = userCandidate.href.replace("https://twitter.com/", '')
        console.log(canId);
        applyNetworkRules(canId);
      }
    }
  } 
}

function scanNotificationUsers(){
  if (document.location.href == 'https://twitter.com/notifications') {
    var messageTabElement = document.querySelectorAll('[aria-label="Timeline: Notifications"]')[0];
    if(messageTabElement != null){
      var messages = messageTabElement.querySelectorAll('[role="article"]');
      for (var i=0; i<messages.length; i++) {
        var userCandidates = messages[i].querySelectorAll('a'); // There may be multiple users per alert.
        for (var j=0; j<userCandidates.length; j++) {
          if (userCandidates[j].href != null){
            var canId = userCandidates[j].href.replace("https://twitter.com/", '');
            console.log(canId);
          }
        }
      }
    }
  } 
}

function applyNetworkRules(sender){
  // put placeholder for user temporarily
  var url = URL_HEADER + "/author_network_rules?user=im__jane&sender=" + sender;
    
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
      if (request.readyState == 4 && request.status == 200){
          //console.log('returned: ' + request.responseText)
      }
  };
  console.log(url)
  request.open('GET', url);
  request.send();
}


function colorProfileBorder(senderDiv){
  let profileElement = senderDiv.querySelector('.css-1dbjc4n.r-sdzlij.r-1p0dtai.r-1mlwlqe.r-1d2f490.r-1udh08x.r-u8s1d.r-zchlnj.r-ipm5af.r-417010');
  console.log(profileElement);
  profileElement.style.border = '5px solid red';
}


// TODO: Weikun
function checkNotifUserId(document) {
  let container = document.querySelector(".stream");
  let items = container.querySelectorAll(".account-group");
  items.forEach(function(element) {
    let userIDNode = element.querySelector(".account-group .username > b");
    console.log(userIDNode)
  });
}


window.onload = function (ev) {
  if (document.location.href == 'https://twitter.com/messages') {
    console.log("in messages")
  }
  else if (document.location.href == 'https://twitter.com/home') {
    console.log("in home");
    setLocalStorage();
  }
  else {
    console.log("not in twitter");
  }
  setInterval(scanMessageSenders, 2000);
  setInterval(scanNotificationUsers, 2000);
};


window.onscroll = function (ev) {
  accountName = getCurrentAccount();
  if (document.location.href == 'https://twitter.com/home') {
    console.log("scolling");
  }
};
