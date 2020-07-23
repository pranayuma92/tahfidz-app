import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { signOut } from '../store/actions/userAction'
import { styles } from '../styles'

const Auth = ({ navigation, user, auth, signOut }) => {
	if(!auth.uid){
		navigation.replace('Login')
	}

	useEffect(() => {
		if(!!user && user.role === 'student'){
			navigation.replace('Home')
		} else if(!!user && user.role === 'teacher') {
			navigation.replace('HomeTeacher')
		} else if(!!user && user.role === 'unset' || !!user && user.role === 'admin') {
			signOut(() => {})
		}
	})

	return (
		<View style={styles.bgPrimary}>
			<View style={styles.toCenter}><ActivityIndicator size="large" color="salmon" /></View>
		</View>
	)
}

const mapStateToProps = (state, props) => {
	const auth = state.firebase.auth;
	const users = state.firestore.data.users;
	const user = users ? users[auth.uid] : null;
	
	return {
		user: user,
		auth: auth,
	}
}

const mapDispatchToProps = (dispatch) => ({
	signOut : (callback) => dispatch(signOut(callback))
}) 

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(({ user, auth }) => {
		return [
			{ collection:'users' }
		]
	})
)(Auth)