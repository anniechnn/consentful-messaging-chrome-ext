OAuth.initialize('ACSnwKzHuMiD-R3vKcE1uHyN0kA')
//login code here.

login();

function login() {
  console.log("login")
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
}



