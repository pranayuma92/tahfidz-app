import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'; 

const DrawerContent = ({ auth, user, navigation }) => {
	const menuChild = [
		{ name: 'Profil', screen: 'Profile'},
		{ name: 'Profil Guru', screen: 'ProfilGuru'},
		{ name: 'Pengaturan', screen: 'Setting'},
		{ name: 'Tentang', screen: 'Tentang'}
	]

	const menuTeacher = [
		{ name: 'Profil', screen: 'Profile'},
		{ name: 'Setoran', screen: 'SetoranStudent'},
		{ name: 'Hafalan', screen: 'HafalanStudent'},
		{ name: 'Validasi', screen: 'Validasi'},
		{ name: 'Pengaturan', screen: 'Setting'},
		{ name: 'Tentang', screen: 'Tentang'}
	]

	const handleDrawerItem = (target) => {
		navigation.navigate(`${target}`)
		navigation.toggleDrawer() 
	}

	const renderMenu = () => {
		let menus
		if(user.role === 'student'){
			menus = menuChild
		} else {
			menus = menuTeacher
		}

		return (
			menus.map( (menu, index) => (
				<TouchableOpacity onPress={() => handleDrawerItem(menu.screen)} key={index} style={styles.menuItem}>
					<Text style={styles.menuItemText}>{menu.name}</Text>
				</TouchableOpacity>
			))
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<Image style={styles.logo} source={require('../assets/mumtaz_logo.png')} />
			</View>
			<View style={styles.name}>
				<Text style={styles.text}>{!!user && user.name}</Text>
			</View>
			<View>
				{ renderMenu() }
			</View>
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
	container: {flex: 1, alignItems:'center'},
	wrapper: {
		backgroundColor: '#50755f',
		height: 150,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	name: {
		marginTop: -20 ,
		height: 40,
		backgroundColor: '#ffffff',
		paddingHorizontal: 20,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {fontWeight: 'bold', fontSize: 16},
	logo: {height: 70, resizeMode: 'contain', marginTop: -20},
	menuItem: { width: 120, paddingVertical: 10 },
	menuItemText: { color: '#ffffff', fontSize: 16},
})

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection:'users' }
	])
)(DrawerContent)