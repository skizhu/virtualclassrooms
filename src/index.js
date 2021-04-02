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
      firebase.database().ref('users/' + userName + '/').once('value').then(
        (snapshot) => {
          if (!snapshot.exists()) {
            let classTest = {
              name: 'Google.com',
              link: 'https://google.com'
            };
            let userObj = {
              obj: classTest
            }
            console.log(userObj)
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
  var allClasses = firebase.database().ref('users/' + userName + '/');
  console.log(data.val())
  const {link, name} = data.val();
  
    let newClassDiv = `
    <div class='classesButtonClass'>
      <button class='classesButtonButton' onclick = 'window.open("${link}", "_blank")'>
        ${name}
      </button>
    </div>
    `;
    document.getElementById('classesButtonDOM').innerHTML += newClassDiv;
}

function openClassLink(link){
  location.href = link
}

document.getElementById('addClassButton').addEventListener('click', () =>{
  if(userName.length){
    console.log(userName)
    document.getElementById('launchAddClassForm').click();
  }
})

document.getElementById('addClassModalButton').addEventListener('click', () => {
  let className = document.getElementById('inputName').value;
  let classLink = document.getElementById('inputLink').value;
  if (className.length && classLink.length) {
    const db = firebase.database().ref('users/' + userName + '/');
    const newUserObj = {
      link: classLink,
      name: className,
    };
    db.push(newUserObj);
    document.getElementById('launchAddClassForm').click()
  }
});
document.getElementById('removeClass').addEventListener('click', (id) =>{

})