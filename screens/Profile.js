import React, { useState } from 'react'
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import NavbarDrawer from '../components/NavbarDrawer'

const Profile = ({ navigation, user, auth }) => {

	if(!auth.uid){
		navigation.replace('Login')
	}
	
	const [ fullname, setFullname ] = useState(user.name)
	const [ birth, setBirth ] = useState(user.birth)
	const [ address, setAdderss ] = useState(user.address)
	const [ city, setCity ] = useState(user.city)
	const [ gender, setGender ] = useState(user.gender)
	const [ phone, setPhone ] = useState(user.phone)
	const [ edit, setEdit ] = useState(false)

	const handleEdit = () => {
		setEdit(!edit)
	}

	return (
		<View style={{ backgroundColor: '#fff2e2', flex: 1}}>
			<NavbarDrawer title="Profil" navigation={navigation} nomenu/>
			<ScrollView >
				<View style={{padding: 20}}>
					<Text>Lengkapi profil anda</Text>
					<Input label="Nama Pengguna"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer} 
						value={fullname}
						disabled={!edit}
					/>
					<Input label="Tanggal Lahir"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer} 
						value={birth}
						disabled={!edit}
					/>
					<Input label="Alamat"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer}
						value={address} 
						disabled={!edit}
					/>
					<Input label="Kota/Kab. Provinsi"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer} 
						value={city}
						disabled={!edit}
					/>
					<Input label="Jenis Kelamin"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer} 
						value={gender}
						disabled={!edit}
					/>
					<Input label="No. HP"
						labelStyle={{fontWeight: '300'}} 
						inputStyle={styles.inputStyle} 
						containerStyle={styles.containerInput} 
						inputContainerStyle={styles.inputContainer} 
						value={phone}
						disabled={!edit}
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

const styles = StyleSheet.create({
	inputContainer: {backgroundColor: '#ffffff', borderBottomWidth: 0, borderRadius: 10},
	containerInput: {height: 70},
	inputStyle: { paddingHorizontal: 10}
})

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection:'users' }
	])
)(Profile)