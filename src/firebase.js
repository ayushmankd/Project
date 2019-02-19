import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyBIK9Gc2Fn3lIVptIjuQ8pqNIyYK1OMHwE",
  authDomain: "project-27225.firebaseapp.com",
  databaseURL: "https://project-27225.firebaseio.com",
  projectId: "project-27225",
  storageBucket: "project-27225.appspot.com",
  messagingSenderId: "296556112474"
};
let fire = firebase.initializeApp(config);
export default fire;
