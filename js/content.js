
function getMessageSenders() {
  var messageTabElement = document.querySelector('[aria-label="Timeline: Messages"]');
  var messages = messageTabElement.querySelectorAll('[data-testid="conversation"]');
  var messageSenders = []
  for(var i=0; i<messages.length; i++) {
    var userCandidate = messages[i].querySelector('a')
    var canId = userCandidate.href.replace("https://twitter.com/", '')
    console.log(canId);
    messageSenders.push(canId);
  }
  return messageSenders
}

function checkProfile() {
  console.log('check profile');
}

function getCurrentAccount() {
  return localStorage.getItem('accountName')
}

function checkNotifUserId(document) {
  let container = document.querySelector(".stream");
  let items = container.querySelectorAll(".account-group");
  items.forEach(function(element) {
    let userIDNode = element.querySelector(".account-group .username > b");
    console.log(userIDNode)
  });
}


function setLocalStorage() {
  profileStrangerString = (profileStrangerString) ? profileStrangerString : '{}'
  profileStrangers = JSON.parse(profileStrangerString)
  console.log(profileStrangers)
  localStorage.setItem('profileStrangers', JSON.stringify(profileStrangers))

  flaggedTweetsString = (flaggedTweetsString) ? flaggedTweetsString : '{}'
  flaggedTweets = JSON.parse(flaggedTweetsString)
  console.log(flaggedTweets)
  localStorage.setItem('flaggedTweets', JSON.stringify(flaggedTweets))

  flaggedCredTweetsString = (flaggedCredTweetsString) ? flaggedCredTweetsString : '{}'
  flaggedCredTweets = JSON.parse(flaggedCredTweetsString)
  localStorage.setItem('flaggedCredTweets', JSON.stringify(flaggedCredTweets))

  followingListString = (followingListString) ? followingListString : '{}'
  followingList = JSON.parse(followingListString)
  console.log(followingList)
  console.log(followingList['im__jane'])
  localStorage.setItem('followingList', JSON.stringify(followingList))
  
}


window.onload = function (ev) {
  if (document.location.href == 'https://twitter.com/home') {
    console.log("in twitter");
    setLocalStorage();
  }
  else {
    console.log("not in twitter");
  }
  var jsTimerForURLChange = setInterval(checkProfile, 2000);
};


window.onscroll = function (ev) {
  getMessageSenders();
  accountName = getCurrentAccount();
  if (document.location.href == 'https://twitter.com/home') {
    console.log("scolling");
    console.log(accountName);
  }
};
