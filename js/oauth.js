
login();
// OAuth.redirect('twitter', 'http://twitter.com');

function login() {
  console.log("login")
  setTimeout(function () {
    // OAuth.initialize(key)
    // OAuth.callback('twitter').done(function (twitter) {
    //   console.log("success")
    // }).fail(function (err) {
    //   console.log(err)
    // })
    OAuth.popup('twitter').done(function (twitter) {
      console.log(twitter)
      var oauth_token = twitter['oauth_token']
      var oauth_token_secret = twitter['oauth_token_secret']
      localStorage.setItem('oauth_token', oauth_token)
      localStorage.setItem('oauth_token_secret', oauth_token_secret)
      console.log(localStorage)
    }).fail(function (err) {
      console.log(err)
    })
  }, 650)

}

