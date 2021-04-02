
// OAuth.redirect('twitter', 'http://twitter.com');

login();


function login() {
  OAUTH_PUBLIC_KEY = 'b7WiSGtdkDLZC1XXsW7_VCKyFwA';
  OAuth.initialize(OAUTH_PUBLIC_KEY);
  console.log("initialized")


  console.log("log in")
  var script = document.createElement('script');
  script.type = 'application/javascript'
  script.src = chrome.runtime.getURL('js/libraries/oauth-sdk.js');
  // script.src = chrome.runtime.getURL('js/libraries/oauth.min.js');

  document.head.appendChild(script);
  script.onload = function () {
    setTimeout(function () {
      OAuth.clearCache();
      console.log("cleared")

      OAuth.popup('twitter').done(function (twitter) {
        console.log(twitter)
        var oauth_token = twitter['oauth_token']
        var oauth_token_secret = twitter['oauth_token_secret']
        console.log(oauth_token)
        console.log(oauth_token_secret)
      }).fail(function (err) {
        console.log(OAuth.popup('twitter'))
        console.log(err)
      })
    }, 650)
  }
}

