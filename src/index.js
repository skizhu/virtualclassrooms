//var firebase = firebase.database();
var userName = '';
function signInUser() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    userName = result.user.displayName;
    console.log(userName)
    /** @type {firebase.auth.OAuthCredential} */
    
    document.getElementById('signUpInButton').innerHTML = `<span class='signXSpan' id='signUpSpan'>Logout </span>`;
    document.getElementById('signUpInButton').onclick = () => {
      firebase.auth().signOut();
      location.reload();
      return false;
    }
  }).then(
    function () {
      var classesRef = firebase.database().ref('users/' + userName + '/');
      classesRef.on('child_added', updateClasses);
      firebase.database().ref('users/').once('value').then(
        (snapshot) => {
          if (!snapshot.exists()) {
            let classTest = {
              name: 'Google.com',
              link: 'https://google.com'
            };
            firebase.database().ref('users/' + userName + '/').push(classTest);
          }
          else {
            console.log('User already exists');
          }
        }
      )
    }
  ).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
const updateClasses = data => {
  const {name, link} = data.val()
  console.log(data.val())
  
    let newClassDiv = `
    <div class='classesButtonClass'>
      <button class='classesButtonButton' onclick = "window.open('${link}')">
        ${name}
      </button>
    </div>
    `;
    document.getElementById('classesButtonDOM').innerHTML += newClassDiv;
}