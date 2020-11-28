function checkProfile() {
    console.log('check profile');
  }
  
  function setLocalStorage() {}
  
  function scanUser() {
    var messageSenders = [];
    document.querySelectorAll("div.css-901oao.css-bfa6kz.r-jwli3a.r-1qd0xha.r-a023e6.r-b88u0q.r-ad9z0x.r-bcqeeo.r-3s2u2q.r-qvutc0 span span").forEach(
      function(find_id){
        console.log(find_id.innerText);
        messageSenders.push(find_id.innerText);
      }
    );
    return messageSenders;
    // var divText = document.getElementsByClassName('css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0')[0].innerHTML;
    // alert(divText);//for alert the inner text  of the div
    // console.log(divText);//write in console the inner text  of the div
  }
  
  
  window.onload = function(ev) {
    if (document.location.href == 'https://twitter.com/home') {
      console.log('in twitter');
      setLocalStorage();
    } else {
      console.log('not in twitter');
    }
    var jsTimerForURLChange = setInterval(checkProfile, 2000);
  };
  
  // // this visualizes flagged tweets when scrolling
  
  function getCurrentAccount() {
    return localStorage.getItem('accountName');
  }
  
  window.onscroll = function(ev) {
    //accountName = getCurrentAccount();
    var messageSenders = scanUser();
    if (document.location.href == 'https://twitter.com/home') {
      console.log('scolling');
      //console.log(accountName);
    }
  };