import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar, Card, ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import NavbarDrawer from '../../components/NavbarDrawer'
import { styles } from '../../styles'

const Overview = ({ navigation, user, users, auth, setoran, jadwal_validasi }) => {
	if(!auth.uid){
		navigation.replace('Login')
	}

	console.log(setoran)

	const dataSetoran = setoran && setoran.filter(item => user && user.student.includes(item.uid))
	const jadwal = jadwal_validasi && jadwal_validasi.filter(item => item.uid === auth.uid)

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

	return (
		<View style={styles.bgPrimary}>
	        <NavbarDrawer title="Validasi Setoran" navigation={navigation} nomenu/>
	        <ScrollView>
	        { !jadwal_validasi ? 
	        	(
			        <View style={{alignSelf: 'center', width: '90%',flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20, borderBottomColor: 'salmon',borderBottomWidth: 2,}}>
			        	<Text style={{marginBottom: 10, fontlSize: 16, fontWeight: 'bold'}}>Anda Belum Membuat Jadwal Validasi</Text>
			        	<Button 
			        		small
			        		title="BUAT JADWAL" 
			        		buttonStyle={styles.greenButton} 
			        		onPress={() => navigation.navigate('AddJadwal')} 
			        	/>
			        </View>
	        	) :
	        	(
			        <View style={{paddingBottom: 15, borderBottomColor: 'salmon',borderBottomWidth: 2, margin: 15}}>
				        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Jadwal Validasi:</Text>
				        { jadwal && jadwal.slice(0, 1).map(item => (
				        	<View>
				        		<Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.tanggal}</Text>
				        		<Text style={{fontSize: 15, fontWeight: 'bold'}}>Jam {item.jam}</Text>
				        	</View>
				        )) }
			        </View>
	        	)
	        }
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
	        { !!jadwal_validasi && 
		        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
			        <Button 
		        		small
		        		title="Mulai Validasi" 
		        		buttonStyle={[styles.greenButton, { width: 150, marginRight: 10}]} 
		        		onPress={() => navigation.navigate('ProsesValidasi')} 
		        	/>
	        	</View>
	        }
	        </ScrollView>
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
		setoran: state.firestore.ordered.setoran,
		jadwal_validasi: state.firestore.ordered.jadwal_validasi
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect(({ user, auth }) => {
		return [
			{ collection:'users' },
			{ collection:'setoran' },
			{ collection:'jadwal_validasi' }
		]
	})
)(Overview)