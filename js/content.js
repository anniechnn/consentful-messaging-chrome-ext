
var URL_HEADER = "http://localhost:8000"

// TODO: Weikun
function checkProfile() {
    console.log('check profile');
  }

// TODO: Weikun
function setLocalStorage() {}
  
function scanMessageSenders() {
  if (document.location.href == 'https://twitter.com/messages') {
    // var messageSenders = [];
    // document.querySelectorAll("div.css-901oao.css-bfa6kz.r-jwli3a.r-1qd0xha.r-a023e6.r-b88u0q.r-ad9z0x.r-bcqeeo.r-3s2u2q.r-qvutc0 span span").forEach(
    //   function(find_id){
    //     console.log(find_id.innerText);
    //     messageSenders.push(find_id.innerText);
    //   }
    // );
    // return messageSenders;
    // var divText = document.getElementsByClassName('css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0')[0].innerHTML;
    // alert(divText);//for alert the inner text  of the div
    // console.log(divText);//write in console the inner text  of the div
    var messageTabElement = document.querySelectorAll('[aria-label="Timeline: Messages"]')[0];
    if(messageTabElement != null){ // safety
      var messages = messageTabElement.querySelectorAll('[data-testid="conversation"]');
      //console.log(messages);
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
      // //console.log(messages);
      for(var i=0; i<messages.length; i++) {
        var userCandidate = messages[i].querySelector('a');
        var canId = userCandidate.href.replace("https://twitter.com/", '');
        console.log(canId);
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
