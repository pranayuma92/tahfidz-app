import firebase from './fbConfig'

class FirebaseApi {
	constructor(){
		this.db = firebase.firestore()
	}

	user = uid => this.db.doc(`users/${uid}`)
	users = () => this.db.collection('users')
}

export default FirebaseApi