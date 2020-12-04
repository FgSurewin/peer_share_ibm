import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "ENTER YOUR OWN STUFF",
	authDomain: "ENTER YOUR OWN STUFF",
	databaseURL: "ENTER YOUR OWN STUFF",
	projectId: "ENTER YOUR OWN STUFF",
	storageBucket: "ENTER YOUR OWN STUFF",
	messagingSenderId: "ENTER YOUR OWN STUFF",
	appId: "ENTER YOUR OWN STUFF",
	measurementId: "ENTER YOUR OWN STUFF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { projectStorage, projectFirestore, timestamp };
