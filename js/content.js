
var URL_HEADER = "http://localhost:8000"
//var URL_HEADER = "https://netrule-message.si.umich.edu"


function setLocalStorage() {
  var userItemArray = (localStorage.getItem('users')) ? 
      JSON.parse(localStorage.getItem('users')) : {};
  localStorage.setItem('users', JSON.stringify(userItemArray));
}

function cacheAccount(username, result) {
  var userItemArray = JSON.parse(localStorage.getItem('users'));
  if (!(username in userItemArray)){
    userItemArray[username] = result;
    localStorage.setItem('users', JSON.stringify(userItemArray));
    console.log(userItemArray);
  }else{
    if(result != userItemArray[username]){
      userItemArray[username] = result;
      localStorage.setItem('users', JSON.stringify(userItemArray));
    }
  }
}

function currentUser(){
  // put placeholder for user temporarily
  return "im__jane"
}

function clearCacheCompetely() {
  localStorage.clear()
}

// TODO: Weikun
function clearAccountsInCache() {
  localStorage.removeItem('users');
}
  
function scanMessageSenders() {
  if (document.location.href == 'https://twitter.com/messages') {
    var messageTabElement = document.querySelectorAll('[aria-label="Timeline: Messages"]')[0];
    if(messageTabElement != null){ // safety
      var messages = messageTabElement.querySelectorAll('[data-testid="conversation"]');
      for(var i=0; i<messages.length; i++) {
        var userCandidate = messages[i].querySelector('a')
        var canId = userCandidate.href.replace("https://twitter.com/", '')
        var userItemArray = JSON.parse(localStorage.getItem('users'));
        if (!(canId in userItemArray)){
          applyNetworkRules(canId, userCandidate);
          cacheAccount(canId, 'processing');
       }
      }
    }
  } 
}

function scanMessageRequests() {
  if (document.location.href == 'https://twitter.com/messages/requests') {
    var messageTabElement = document.querySelectorAll('[aria-label="Timeline: Message requests"]')[0];
    if(messageTabElement != null){ // safety
      var messages = messageTabElement.querySelectorAll('[data-testid="conversation"]');
      for(var i=0; i<messages.length; i++) {
        var userCandidate = messages[i].querySelector('a')
        var canId = userCandidate.href.replace("https://twitter.com/", '')
        var userItemArray = JSON.parse(localStorage.getItem('users'));
        if (!(canId in userItemArray)){
          applyNetworkRules(canId, userCandidate);
        }
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
            var userItemArray = JSON.parse(localStorage.getItem('users'));
            if (!(canId in userItemArray)){
              applyNetworkRules(canId, userCandidates[j]);
            // console.log(userCandidates[j]);
            }
          }
        }
      }
    }
  } 
}


function applyNetworkRules(sender, senderDiv){
  let url = URL_HEADER + "/author_network_rules?user=" + currentUser() + "&sender=" + sender;
  let request = new XMLHttpRequest();
  request.onreadystatechange = function(){
      if (request.readyState == 4 && request.status == 200){
          let response = parseResponse(request.responseText)
          pollStatus(sender, response['task_id'], senderDiv)
      }
  };
  request.open('GET', url);
  request.send();
}

function parseResponse(response){
  let response_json = JSON.parse(response);
  return response_json
}

function pollStatus(sender, task_id, senderDiv){
  let url = URL_HEADER + "/poll_status?task_id=" + task_id + "&user=" + currentUser() + "&sender=" + sender;
  let request = new XMLHttpRequest();

  request.onreadystatechange = function (){
    if (request.readyState == 4 && request.status == 200){
      let result = parseResponse(request.responseText)
      console.log(result);
      if (result["state"] == "PENDING"){
        setTimeout(function(){pollStatus(sender, task_id, senderDiv)}, 5000)
      } else if (result["state"] == "SUCCESS"){
        cacheAccount(sender, result["result"])
        
        if (result["result"] == false){
          colorProfileBorder(senderDiv);
          
        }

      }
    }
  }
  
  request.open('GET', url);
  request.send();

}


window.onload = function (ev) {
  if (document.location.href == 'https://twitter.com/messages') {
    console.log("in messages")
    setLocalStorage();
  }
  else if (document.location.href == 'https://twitter.com/home') {
    console.log("in home");
    setLocalStorage();
  }
  else {
    console.log("not in twitter");
  }
  setInterval(scanMessageSenders, 5000);
  setInterval(scanMessageRequests, 5000);
  setInterval(scanNotificationUsers, 5000);
};


window.onscroll = function (ev) {
  //accountName = getCurrentAccount();
  if (document.location.href == 'https://twitter.com/home') {
    console.log("scolling");
  }
};
