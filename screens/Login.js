import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { signIn } from '../store/actions/userAction'
import { connect } from 'react-redux'

const Login = ({ auth, navigation, signIn, msg }) => {

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')

	if(auth.uid){
		navigation.replace('Auth')
	}

	const login = () => {
		const creds = {
			email: email.toLowerCase(),
			password: password
		}

		signIn(creds)
	}

	return (
		<ScrollView style={{ backgroundColor: '#fff2e2', flex: 1}}>
			<Image source={require('../assets/mumtaz.png')} style={{alignSelf: 'center', width: '100%', heiht: 'auto'}}/>
	        <View style={{paddingHorizontal: 20, marginTop: -20, marginBottom: 20}}>
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
	        </View>
	        <View style={{paddingHorizontal: 100}}>
	          	<Button
				  title="Masuk"
				  buttonStyle={{backgroundColor: 'salmon', borderRadius: 50 }}
				  onPress={login}
				/>
	        </View>
	        { !!msg && 
	        	<View style={{paddingHorizontal: 30, paddingVertical: 10, alignSelf: 'center'}}>
    	        	<Text>{msg}</Text>
    	        </View>
	       	}
	       	<View style={{paddingHorizontal: 30, paddingVertical: 10, alignSelf: 'center'}}>
	        	<Text onPress={() => navigation.navigate('SignUp')}>Buat akun</Text>
	        </View>
		</ScrollView>
	)
}

const mapStateToProps = state => ({
	authError : state.user.authError,
	auth: state.firebase.auth,
	msg: state.user.message
})

const mapDispatchToProps = (dispatch) => ({
	signIn : creds => dispatch(signIn(creds))
})

const styles = StyleSheet.create({
	inputContainer: {backgroundColor: '#ffffff', borderBottomWidth: 0, borderRadius: 10},
	containerInput: {height: 70},
	inputStyle: { paddingHorizontal: 10}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)