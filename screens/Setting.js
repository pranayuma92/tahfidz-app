import React, { useState } from 'react'
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import NavbarDrawer from '../components/NavbarDrawer'
import { signOut } from '../store/actions/userAction'

const Setting = ({ navigation, signOut, auth }) => {
	if(!auth.uid){
		navigation.replace('Login')
	}

	const handleSignOut = () => {
		signOut(() => {})
	}

	return(
		<View style={{ backgroundColor: '#fff2e2', flex: 1}}>
			<NavbarDrawer title="Pengaturan" navigation={navigation} nomenu/>
			<ScrollView>
				<ListItem
			        title="Logout"
			        leftIcon={{ name: 'settings-power'}}
			        bottomDivider
			        chevron
			        onPress={handleSignOut}
			    />
		    </ScrollView>
		</View>
	)
}

const mapStateToProps = (state, props) => ({
	auth: state.firebase.auth
})

const mapDispatchToProps = (dispatch) => ({
	signOut : (callback) => dispatch(signOut(callback))
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Setting)