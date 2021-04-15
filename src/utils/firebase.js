import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCXj-tqUNOvGEVXhlld6Vfjou4aWi9DR68",
    authDomain: "birthday-1e926.firebaseapp.com",
    databaseURL: "https://birthday-1e926.firebaseio.com",
    projectId: "birthday-1e926",
    storageBucket: "birthday-1e926.appspot.com",
    messagingSenderId: "320503486394",
    appId: "1:320503486394:web:843af0b2902fef045d2f83"
  };

  export default firebase.initializeApp(firebaseConfig);