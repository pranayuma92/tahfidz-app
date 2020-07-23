import React, { useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { signUp } from '../store/actions/userAction'
import { connect } from 'react-redux'

const SignUp = ({ navigation, signUp, auth, msg }) => {

	// if(auth.uid){
	// 	navigation.replace('Auth')
	// }

	const [ username, setUsername ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ retype, setRetype ] = useState('')

	const handleSignup = () => {
		const newUser = {
			fullname: username,
			email: email.toLowerCase(),
			password: password
		}

		if(password !== retype){
			alert('password not match')
		} else {
			signUp(newUser, () => {
				navigation.replace('Auth')
			})
		}
	}

	return (
		<ScrollView style={{ backgroundColor: '#fff2e2', flex: 1, }}>
			<View style={{padding: 20}}>
				<Input label="Nama Pengguna"
					labelStyle={{fontWeight: '300'}} 
					inputStyle={styles.inputStyle} 
					containerStyle={styles.containerInput} 
					inputContainerStyle={styles.inputContainer} 
					onChangeText={(text) => setUsername(text)}
				/>
				<Input label="E-mail"
					labelStyle={{fontWeight: '300'}}
					inputStyle={styles.inputStyle} 
					containerStyle={styles.containerInput} 
					inputContainerStyle={styles.inputContainer}
					onChangeText={(text) => setEmail(text)} 
				/>
				<Input label="Kata Sandi"
					labelStyle={{fontWeight: '300'}}
					secureTextEntry 
					inputStyle={styles.inputStyle} 
					containerStyle={styles.containerInput}
					inputContainerStyle={styles.inputContainer}
					onChangeText={(text) => setPassword(text)} 
				/>
				<Input label="Konfirmasi Kata Sandi"
					labelStyle={{fontWeight: '300'}}
					secureTextEntry 
					inputStyle={styles.inputStyle} 
					containerStyle={styles.containerInput}
					inputContainerStyle={styles.inputContainer}
					onChangeText={(text) => setRetype(text)} 
				/>
			</View>
			<View style={{paddingHorizontal: 100}}>
				<Button
				  title="Daftar"
				  buttonStyle={{backgroundColor: 'salmon', borderRadius: 50 }}
				  onPress={handleSignup}
				/>
			</View>
			{ !!msg && 
	        	<View style={{paddingHorizontal: 30, paddingVertical: 10, alignSelf: 'center'}}>
    	        	<Text>{msg}</Text>
    	        </View>
	       	}
			<View style={{paddingHorizontal: 50, alignItems: 'center', padding: 20}}>
				<Text>Sudah punya akun? Masuk <Text style={{color: 'salmon'}} onPress={() => navigation.replace('Login')}>disini</Text></Text>
			</View>
			<Image source={require('../assets/mumtaz_footer.png')} style={{alignSelf: 'center', width: '100%', heiht: 'auto'}}/>
		</ScrollView>
	)
}

const mapStateToProps = state => ({
	authError : state.user.authError,
	auth: state.firebase.auth,
	msg: state.user.message
})

const mapDispatchToProps = (dispatch) => ({
	signUp : (newUser, callback) => dispatch(signUp(newUser, callback))
})

const styles = StyleSheet.create({
	inputContainer: {backgroundColor: '#ffffff', borderBottomWidth: 0, borderRadius: 10},
	containerInput: {height: 70},
	inputStyle: { paddingHorizontal: 10}
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)