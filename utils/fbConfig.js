import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyCGo9EyQOrcaw0JO8DnkSdr1AWI7VebqIo",
	authDomain: "tahfidz-web.firebaseapp.com",
	databaseURL: "https://tahfidz-web.firebaseio.com",
	projectId: "tahfidz-web",
	storageBucket: "tahfidz-web.appspot.com",
	messagingSenderId: "664805159215",
	appId: "1:664805159215:web:bcb591ddd0a41b2af2b1da",
	measurementId: "G-H5856Q9WTB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
