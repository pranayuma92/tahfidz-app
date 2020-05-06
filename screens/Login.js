import React, { useState } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { Container, Form, Item, Input, Label, Button, Text } from 'native-base'
import { signIn } from '../store/actions/userAction'
import { connect } from 'react-redux'

const Login = ({ auth, navigation, signIn, msg }) => {

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')

	if(auth.uid){
		navigation.navigate('Home')
	}

	const login = () => {
		const creds = {
			email: email,
			password: password
		}

		signIn(creds)
	}

	return (
		<ScrollView style={{ backgroundColor: '#fff2e2', flex: 1}}>
			<Image source={require('../assets/mumtaz.png')} style={{alignSelf: 'center', width: '100%', heiht: 'auto'}}/>
			<Form style={{position: 'relative', top: -50, marginHorizontal: 10}}>
	            <Item floatingLabel>
	              <Label>Username</Label>
	              <Input style={{textTransform: 'lowercase'}} onChangeText={(text) => setEmail(text)} />
	            </Item>
	            <Item floatingLabel last>
	              <Label>Password</Label>
	              <Input secureTextEntry onChangeText={(text) => setPassword(text)}/>
	            </Item>
	        </Form>
	        <View style={{paddingHorizontal: 100}}>
	          	<Button block rounded style={{backgroundColor: 'salmon'}} onPress={login}><Text>Masuk</Text></Button>
	        </View>
	        { !!msg && 
	        	<View style={{paddingHorizontal: 30, paddingVertical: 10, alignSelf: 'center'}}>
    	        	<Text>{msg}</Text>
    	        </View>
	       	}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)