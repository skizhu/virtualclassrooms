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
  const {link, name} = data.val();
  var path;
  firebase.database().ref('users/' + userName + '/').once('value').then(
    (snapshot) => {
      var numChildren = snapshot.numChildren()
      
      var childKeyStringify = JSON.stringify(snapshot.val());
      var newObject = JSON.parse(childKeyStringify);
      const values = Object.values(newObject);
      for (k = 0; k < (numChildren); k++) {
        if (values[k].name == (name)) {
          path = Object.keys(snapshot.val())[k];
          break
        }
      }
    }
  ).then(
    () => {
    let newClassDiv = `
    <div id='${path}'>
    <div class='classesButtonClass'>
      <button class='classesButtonButton' onclick = 'window.open("${link}", "_blank")'>
        ${name}
      </button>
      <button type="button" class="close removeButton" aria-label="Close" onclick="removeClass('${path}')">
            <span aria-hidden="true">&times;</span>
          </button>
    </div>
    </div>
    `;
    document.getElementById('classesButtonDOM').innerHTML += newClassDiv;
    }
  )
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

function removeClass(path){
  let ref = firebase.database().ref('users/' + userName + '/');
  document.getElementById(path).style.opacity = '0';
  $('#' + path).remove();
  ref.child(path).remove();
}