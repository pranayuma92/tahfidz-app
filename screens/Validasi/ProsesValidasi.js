import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar, Card, ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import NavbarDrawer from '../../components/NavbarDrawer'
import { styles } from '../../styles'
import { addValidasiSiswa } from '../../store/actions/userAction'
import Modal from 'react-native-modal'

const ProsesValidasi = ({ navigation, user, users, auth, setoran, jadwal_validasi, validasi, addValidasiSiswa }) => {

	const dataSetoran = setoran && setoran.filter(item => user && user.student.includes(item.uid))
	const jadwal = jadwal_validasi && jadwal_validasi.filter(item => item.uid === auth.uid)

	const [isModalVisible, setModalVisible] = useState(false)

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

	const proses = (item) => {
		const data = {
			uid: item.uid,
			gid: auth.uid,
			name: item.name,
			surah: item.title,
			from: item.from,
			to: item.to
		}

		addValidasiSiswa(data, () => setModalVisible(!isModalVisible))

		//setModalVisible(!isModalVisible)
	}

	return (
		<View style={styles.bgPrimary}>
	        <NavbarDrawer title="Validasi Setoran" navigation={navigation} nomenu/>
	        <ScrollView>
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
			        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
				        <Button 
			        		small
			        		title="Proses" 
			        		buttonStyle={[styles.greenButton, { width: 150, marginRight: 10}]} 
			        		onPress={() => proses(item)} 
			        	/>
		        	</View>
	        	</Card>
	        ))}
	        </ScrollView>
	        <Modal isVisible={isModalVisible}>
	          	<View style={{backgroundColor: '#fff', padding: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', height: 150}}>
	          		<Text style={{fontSize: 16, fontWeight:'bold'}}>Berhasil memproses</Text>
	            	<Text style={{marginBottom: 30, fontSize: 16, fontWeight:'bold'}}>Setoran dalam proses validasi</Text>
	            	<Button 
		        		small
		        		title="Tutup" 
		        		buttonStyle={styles.greenButton} 
		        		onPress={() => setModalVisible(!isModalVisible)} 
		        	/>
	          	</View>
	        </Modal>
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
		jadwal_validasi: state.firestore.ordered.jadwal_validasi,
		validasi: state.firestore.ordered.validasi
	}
}

const mapDispatchToProps = (dispatch) => ({
	addValidasiSiswa: (data, callback) => dispatch(addValidasiSiswa(data, callback))	
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(({ user, auth }) => {
		return [
			{ collection:'users' },
			{ collection:'setoran' },
			{ collection:'jadwal_validasi' },
			{ collection:'validasi' }
		]
	})
)(ProsesValidasi)