//firebase.auth().signInWithPopup(provider);
function test() {
  console.log('hi')
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
}
console.log('in file');