import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyACW2JldtdvFaTFJXLPbX1rS060fjNkgBw",
    authDomain: "journal-universe.firebaseapp.com",
    projectId: "journal-universe",
    storageBucket: "journal-universe.appspot.com",
    messagingSenderId: "52449438005",
    appId: "1:52449438005:web:128f9a1323c315c807847c"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;