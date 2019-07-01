import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyApo3PkdpAV6T16N-id_YiE5vaBstKqTNw",
    authDomain: "my-shop-7b9e0.firebaseapp.com",
    databaseURL: "https://my-shop-7b9e0.firebaseio.com",
    projectId: "my-shop-7b9e0",
    storageBucket: "my-shop-7b9e0.appspot.com",
    messagingSenderId: "632465643676"
   };

firebase.initializeApp(firebaseConfig);
export default firebase;