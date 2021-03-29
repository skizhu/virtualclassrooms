// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyDSy4exg5Bu4zvZQQzMC8LYEdORDnYE_DU",
    authDomain: "virtualclassrooms-e7ad9.firebaseapp.com",
    databaseURL: "https://virtualclassrooms-e7ad9-default-rtdb.firebaseio.com",
    projectId: "virtualclassrooms-e7ad9",
    storageBucket: "virtualclassrooms-e7ad9.appspot.com",
    messagingSenderId: "1067971793545",
    appId: "1:1067971793545:web:18036df4d7961317db6c58"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());