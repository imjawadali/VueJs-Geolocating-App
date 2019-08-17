import firebase from 'firebase/app';
// eslint-disable-next-line no-unused-vars
import firestore from 'firebase/firestore';

// config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAjQcyt1Gu8Yvrx9Kh4ciC7ozz6xQbQ-zY",
    authDomain: "geo-ninjas-62426.firebaseapp.com",
    databaseURL: "https://geo-ninjas-62426.firebaseio.com",
    projectId: "geo-ninjas-62426",
    storageBucket: "geo-ninjas-62426.appspot.com",
    messagingSenderId: "343456641246",
    appId: "1:343456641246:web:c317faa71924d36a"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firestore database
export default firebaseApp.firestore();