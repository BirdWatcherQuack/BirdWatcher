//sign up with facebook

window.fbAsyncInit = function () {
  FB.init({
    appId: '781387505856541',
    cookie: true,
    xfbml: true,
    version: 'v10.0'
  });

  FB.AppEvents.logPageView();

};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//we can have img from Facebook by adding it to const person picture: "", and adding it in FB.api(,picture.type(large)), and in function (userData) {person.picture = userData.picture.data.url}

const person = { userID: "", name: "", accessToken: "", email: "" };

function logIn() {
  FB.login(function (response) {
    if (response.status == 'connected') {

      //console.log(response.status)

      person.userID = response.authResponse.userID;
      person.accessToken = response.authResponse.accessToken;

      FB.api('/me?fields=id,name,email', function (userData) {
        console.log(userData)
        person.name = userData.name;
        person.email = userData.email;

        document.location.replace('/home');

      });
    } else {
      alert('Failed to sign up.');
    }

    //can add more info that will be shown on sign in window ex: birthday, but it's need to be approved by Facebook
  }, { scope: 'public_profile, email' })

  document
    .querySelector('.sign-in-form')
    .addEventListener('submit', logIn);

};


//logout if signed up with Facebook doesn't work fo now
function fLogout() {
  FB.logout(function (response) {
    console.log(response)
    if (response.status === 'connected') {
      FB.fLogout(function (response) {
        document.location.replace('/');
      });
    }
  });
}
document.querySelector('#logout').addEventListener('click', fLogout);

