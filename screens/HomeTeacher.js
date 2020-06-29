import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import NavbarDrawer from '../components/NavbarDrawer'
import LayerTabs from '../components/LayerTabs'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { styles } from '../styles'

const HomeTeacher = ({ navigation, user, users, auth, setoran }) => {
	if(!auth.uid){
		navigation.replace('Login')
	}

	console.log(setoran)

	const dataSetoran = setoran && setoran.filter(item => user && user.student.includes(item.uid))
	const [ currentTab, setCurrentTab ] = useState('setoran')

	const handleTabs = (index) => {
		setCurrentTab(index)
	}

	const timeConverter = (timestamp) => {
	  	let a = new Date(timestamp * 1000);
	  	let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
	  	let year = a.getFullYear()
	  	let month = a.getMonth()
	  	let date = a.getDate()
	  	let hour = a.getHours()
	  	let min = a.getMinutes()
	  	let sec = a.getSeconds()
	  	let time = date + ' - ' + month + ' - ' + year + ' ; ' + hour + '.' + min
	  	return time
	}

	return(
		<View style={styles.bgPrimary}>
	        <NavbarDrawer title={!!user ? 'Assalamu\'alaikum' : 'Beranda'} navigation={navigation}/>
    		{ !user && <View style={styles.toCenter}><ActivityIndicator size="large" color="salmon" /></View> }
    		{ !!user &&
		        <ScrollView>
		        	 <View style={styles.userAvatarWrapper}>
			        	<View style={styles.userAvatarImg}>
			        		<Avatar
							  rounded
							  size="large"
							  source={{ uri: `https://api.adorable.io/avatars/285/${ user.name }.png`}}
							/>
			        	</View>
			        	<View style={styles.userAvatarSideText}>
			        		<Text style={styles.fontBig}>Guru {user.name}</Text>
			        		<Text style={styles.darkGrey}>Usia: 28 th</Text>
			        		<Text style={styles.darkGrey}>Domisili: Ma'had Tahfidz Al-Maahira</Text>
			        	</View>
			        </View>
			        <View style={styling.cardWrapper}>
				        <View style={styling.innerWrapper}>
				        	<TouchableOpacity 
				        		style={styling.customCard}
				        		onPress={() => handleTabs('setoran')}>
				        		<Text style={styling.cardText}>Setoran</Text>
				        	</TouchableOpacity>
				        </View>
				         <View style={styling.innerWrapper}>
				        	<TouchableOpacity 
				        		style={styling.customCard}
				        		onPress={() => handleTabs('hafalan')}>
				        		<Text style={styling.cardText}>Hafalan</Text>
				        	</TouchableOpacity>
				        </View>
				         <View style={styling.innerWrapper}>
				        	<TouchableOpacity 
				        		style={styling.customCard}
				        		onPress={() => navigation.navigate('VOverview')}>
				        		<Text style={styling.cardText}>Validasi</Text>
				        	</TouchableOpacity>
				        </View>
			        </View>
			        <LayerTabs current={currentTab}/>
			        { dataSetoran && dataSetoran.map(item => (
			        	<Card containerStyle={{padding: 0, borderRadius: 10}} key={item.uid}>
			        		<TouchableOpacity onPress={() => navigation.push('Koreksi', { surah: item.surah, from: item.from, to: item.to, title: item.title, name: item.name, file: item.file, uid: item.uid, tid: auth.uid })}>
				        		<View style={styles.userAvatarWrapper}>
						        	<View style={styles.userAvatarImg}>
						        		<Avatar
										  rounded
										  size="large"
										  source={{ uri: `https://api.adorable.io/avatars/285/${ item.name }.png`}}
										/>
						        	</View>
						        	<View style={styles.userAvatarSideText}>
						        		<Text style={styles.fontBig}>{item.name}</Text>
						        		<Text style={styles.darkGrey}>{item.title}: {item.from} - {item.to}</Text>
						        		<Text style={styles.darkGrey}>{timeConverter(item.date.seconds)}</Text>
						        	</View>
						        </View>
					        </TouchableOpacity>
			        	</Card>
			        ))}
		        </ScrollView>
		    }
		</View>
	)
}

const mapStateToProps = (state, props) => {
	const auth = state.firebase.auth;
	const users = state.firestore.data.users;
	const user = users ? users[auth.uid] : null;
	return {
		users: users,
		user: user,
		auth: auth,
		setoran: state.firestore.ordered.setoran
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect(({ user, auth }) => {
		return [
			{ collection:'users' },
			{ collection:'setoran' }
		]
	})
)(HomeTeacher)


const styling = StyleSheet.create({
	cardWrapper: {
		flex:1, 
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	innerWrapper: {
		width: '33%', 
		alignItems: 'center', 
		padding: 6
	},
	customCard : {
		backgroundColor: '#fff', 
		height: 80, 
		width: '100%', 
		alignItems: 'center',
		justifyContent: 'flex-end',
		borderRadius: 5,
		elevation: 5
	},
	cardText: {
		fontWeight:'bold', 
		fontSize: 15, 
		color: 'salmon', 
		textTransform: 'uppercase',
		paddingBottom: 10
	}
})