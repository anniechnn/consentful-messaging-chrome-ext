function checkProfile() {
    console.log('check profile');
}
function setLocalStorage(){
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

// // this visualizes flagged tweets when scrolling 

function getCurrentAccount() {
    return localStorage.getItem('accountName')
}

window.onscroll = function (ev) {

    accountName = getCurrentAccount();
    if (document.location.href == 'https://twitter.com/home') {
        console.log("scolling");
        console.log(accountName);
    }
};