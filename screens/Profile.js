import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Input, Button, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import NavbarDrawer from '../components/NavbarDrawer'
import { editUser } from '../store/actions/userAction'
import * as DocumentPicker from 'expo-document-picker'
import * as firebase from "firebase"

const Profile = ({ navigation, user, auth, editUser }) => {

	if(!auth.uid){
		navigation.replace('Login')
	}

	const firebaseConfig = {
		apiKey: "AIzaSyCGo9EyQOrcaw0JO8DnkSdr1AWI7VebqIo",
		authDomain: "tahfidz-web.firebaseapp.com",
		databaseURL: "https://tahfidz-web.firebaseio.com",
		projectId: "tahfidz-web",
		storageBucket: "tahfidz-web.appspot.com",
		messagingSenderId: "664805159215",
		appId: "1:664805159215:web:bcb591ddd0a41b2af2b1da",
		measurementId: "G-H5856Q9WTB"
	}
	
	const [ fullname, setFullname ] = useState(user.name)
	const [ birth, setBirth ] = useState(user.birth)
	const [ address, setAdderss ] = useState(user.address)
	const [ city, setCity ] = useState(user.city)
	const [ gender, setGender ] = useState(user.gender)
	const [ phone, setPhone ] = useState(user.phone)
	const [ img, setImg ] = useState(user.img)
	const [ edit, setEdit ] = useState(false)

	useEffect(() => {
    	if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig)
		}
  	}, [])

	const handleEdit = () => {
		setEdit(!edit)
	}

	const pickDocument = async () => {
    	let result = await DocumentPicker.getDocumentAsync({ type: 'image/*' })
    	setImg(result.uri)
    	console.log(result)
  	}

  	const getNameFile = item => {
  		const data = item.split('/')
		return data.slice(-1)[0]
  	}

  	const prepareUpload = async (uri) => {
		const blob = await new Promise((resolve, reject) => {
		    const xhr = new XMLHttpRequest()
		    xhr.onload = function() {
		      resolve(xhr.response)
		    }
		    xhr.onerror = function(e) {
		      console.log(e)
		      reject(new TypeError('Network request failed'))
		    }
		    xhr.responseType = 'blob'
		    xhr.open('GET', uri, true)
		    xhr.send(null)
		})

		const ref = firebase
		    .storage()
		    .ref()
		    .child(getNameFile(uri))
		const snapshot = await ref.put(blob)

		blob.close()

		return await snapshot.ref.getDownloadURL()
	}

	const handleSave = async () => {
		const uploadUrl = await prepareUpload(img)
	   	if(uploadUrl){
			const newData = {
				uid: auth.uid,
				name: fullname,
				birth: birth,
				address: address,
				phone: phone,
				city: city,
				gender: gender,
				img: uploadUrl
			}

			editUser(newData, () => {
				setEdit(!edit)
			})
		}
	}

	return (
		<View style={{ backgroundColor: '#fff2e2', flex: 1}}>
			<NavbarDrawer title="Profil" navigation={navigation} nomenu/>
			<ScrollView >
				<View style={{padding: 20}}>
					<View style={{alignSelf: 'center'}}>
						<Avatar
						  rounded
						  size="large"
						  source={{ uri: img }}
						/>
						{ edit && <Text style={{paddingVertical: 10, color: 'salmon'}} onPress={pickDocument}>Ganti Foto</Text> }
					</View>
					<Input label="Nama Pengguna"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer} 
						value={fullname}
						disabled={!edit}
						onChangeText={(text) => setFullname(text)}
					/>
					<Input label="Tanggal Lahir"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer} 
						value={birth}
						disabled={!edit}
						onChangeText={(text) => setBirth(text)}
					/>
					<Input label="Alamat"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer}
						value={address} 
						disabled={!edit}
						onChangeText={(text) => setAdderss(text)}
					/>
					<Input label="Kota/Kab. Provinsi"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer} 
						value={city}
						disabled={!edit}
						onChangeText={(text) => setCity(text)}
					/>
					<Input label="Jenis Kelamin"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer} 
						value={gender}
						disabled={!edit}
						onChangeText={(text) => setGender(text)}
					/>
					<Input label="No. HP"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer} 
						value={phone}
						disabled={!edit}
						onChangeText={(text) => setPhone(text)}
					/>
					<Input label="Pekerjaan"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer} 
						disabled={!edit}
					/>
				</View>
				<View style={{paddingHorizontal: 100, paddingBottom: 30}}>
					{ edit ?
						( <View>
							<Button
						  		title="Simpan"
						  		buttonStyle={{backgroundColor: 'salmon', borderRadius: 50 }}
						  		onPress={handleSave}
							/>
							<Text style={{alignSelf: 'center', paddingVertical: 10, color: 'salmon'}} onPress={handleEdit}>Batal</Text> 
						</View> ) : 
						( <Button
						  	title="Edit"
						  	buttonStyle={{backgroundColor: 'salmon', borderRadius: 50 }}
						  	onPress={handleEdit}
						/> )
					}
		        </View>
			</ScrollView>
		</View>
	)
}

const mapStateToProps = (state, props) => {
	const auth = state.firebase.auth;
	const users = state.firestore.data.users;
	const user = users ? users[auth.uid] : null;
	return {
		user: user,
		auth: auth
	}
}

const mapDispatchToProps = (dispatch) => ({
	editUser : (newData, callback) => dispatch(editUser(newData, callback))
})

const styles = StyleSheet.create({
	inputContainer: {backgroundColor: '#ffffff', borderBottomWidth: 0, borderRadius: 10},
	containerInput: {height: 70},
	inputStyle: { paddingHorizontal: 10}
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection:'users' }
	])
)(Profile)