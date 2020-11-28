var URL_HEADER = "http://localhost:8000"

function getMessageSenders() {
  if (document.location.href == 'https://twitter.com/messages') {
    var messageTabElement = document.querySelectorAll('[aria-label="Timeline: Messages"]')[0];
    if(messageTabElement != null){
      var messages = messageTabElement.querySelectorAll('[data-testid="conversation"]');
      console.log(messages);
      for(var i=0; i<messages.length; i++) {
        var userCandidate = messages[i].querySelector('a')
        var canId = userCandidate.href.replace("https://twitter.com/", '')
        console.log(canId);
        applyNetworkRules(canId);
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
          console.log('returned: ' + request.responseText)
          // callback(request.responseText); 
      }
  };
  console.log(url)
  request.open('GET', url);
  request.send();
}

// TODO: Weikun
function checkProfile() {
  console.log('check profile');
}

// TODO: Weikun
function getCurrentAccount() {
  return localStorage.getItem('accountName')
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

// TODO: Weikun
function setLocalStorage() {
  profileStrangerString = (profileStrangerString) ? profileStrangerString : '{}'
  profileStrangers = JSON.parse(profileStrangerString)
  console.log(profileStrangers)
  localStorage.setItem('profileStrangers', JSON.stringify(profileStrangers))

  followingListString = (followingListString) ? followingListString : '{}'
  followingList = JSON.parse(followingListString)
  console.log(followingList)
  console.log(followingList['im__jane'])
  localStorage.setItem('followingList', JSON.stringify(followingList))
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
  setInterval(getMessageSenders, 2000);
};


window.onscroll = function (ev) {
  accountName = getCurrentAccount();
  if (document.location.href == 'https://twitter.com/home') {
    console.log("scolling");
  }
};
