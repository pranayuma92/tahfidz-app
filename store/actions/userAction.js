const signUp = (newUser, callback) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({type: 'AUTH_INIT'})
		const firebase = getFirebase()
		const firestore = getFirestore()

		firebase.auth().createUserWithEmailAndPassword(
			newUser.email,
			newUser.password
		).then((resp) => {
			return firestore.collection('users').doc(resp.user.uid).set({
				name: newUser.fullname,
				email: newUser.email,
				role: 'unset',
				isActive: 'true',
				birth: '',
				address: '',
				phone: '',
				city: '',
				gender: '',
				hafalan: ['opnayt001'],
				img: 'https://i0.wp.com/ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png'
			})
		}).then(() => {
			dispatch({type: 'SIGNUP_SUCCESS'})
			callback()
		}).catch(err => {
			dispatch({type: 'SIGNUP_ERROR', err})
			console.log(JSON.stringify(err))
		})
	}
}

const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		dispatch({type: 'AUTH_INIT'})
		const firebase =  getFirebase();
		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		).then(() => {
			dispatch({ type: 'LOGIN_SUCCESS'})
		}).catch((err) => {
			dispatch({ type: 'LOGIN_ERROR', err})
		})
	}
}

const signOut = (callback) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS'})
			callback()
		})
	}
}

const editUser = (newData, callback) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore()

		firestore.collection('users').doc(newData.uid).update({
			name: newData.name,
			birth: newData.birth,
			address: newData.address,
			phone: newData.phone,
			city: newData.city,
			gender: newData.gender,
			img: newData.img
		}).then((res) => {
			callback()
		}).catch(error => {
			console.log(error)
		})
	}
}

const addSetoran = (uid, surah, to, from, title, file, name, callback) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore()

		firestore.collection('setoran').add({
			uid: uid,
			surah: surah,
			to: to,
			from: from,
			title: title,
			file: file,
			name: name,
			date: new Date()
		}).then(() => {
			callback()
		}).catch(error => {
			console.log(error)
		})
	}
}

const addKoreksi = (data, callback) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore()

		firestore.collection('koreksi').add({
			...data
		}).then(() => {
			callback()
		}).catch(error => {
			console.log(error)
		})
	}
}

const addJadwalValidasi = (data, callback) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore()

		firestore.collection('jadwal_validasi').add({
			...data
		}).then(() => {
			callback()
		}).catch(error => {
			console.log(error)
		})
	}
}

const addValidasiSiswa = (data, callback) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore()

		firestore.collection('validasi').add({
			...data
		}).then(() => {
			callback()
		}).catch(error => {
			console.log(error)
		})
	}
}

export { signUp, signIn, signOut, editUser, addSetoran, addKoreksi, addJadwalValidasi, addValidasiSiswa }