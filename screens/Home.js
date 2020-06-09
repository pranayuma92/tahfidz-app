//Komponen beranda

import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import NavbarDrawer from '../components/NavbarDrawer'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { styles } from '../styles'
import { getAllSurah } from '../store/actions/quranAction'

const Home = ({ navigation, user, auth, users, hafalan, getAllSurah }) => {

	//Inisasi data lokal komponen
	const [ student, setStudent ] = useState(['Fulan', 'Ibnu', 'Hasan', 'Khalid', 'Maulana', 'Iqbal', 'Haikal'])
	const dataHafalan = hafalan && hafalan.filter( item => user && user.hafalan.includes(item.id))
	const [ ayahfrom, setAyahfrom ] = useState('')
	const [ ayahto, setAyahto] = useState('')  
	

	//Cek autentikasi
	//Jika autentikasi ID kosong, arahkan ke layar login
	if(!auth.uid){
		navigation.replace('Login')
	}

	useEffect(() => {
		//Memanggil fungsi untuk mengambil data surah dan ayat dari API
		getAllSurah()
	}, [])

	//Render komponen
	return (
		<View style={styles.bgPrimary}>
	        <NavbarDrawer title={!!user ? `Assalamu'alaikum, ${user.name.split(' ')[0]}` : 'Beranda'} navigation={navigation}/>
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
			        		<Text style={styles.fontBig}>{user.name}</Text>
			        		<Text style={styles.darkGrey}>Sedang di hafal</Text>
			        		{ dataHafalan && dataHafalan.map(item => {
			        			if(item.status === 'Belum selesai'){
				        			return(
			                			<Text style={styles.hasBold}>{item.surah.split('_')[1]} {item.from} - {item.to}</Text>
				        			)
			        			}
			        		}) }
			        	</View>
			        </View>
			        
			        <View style={{paddingHorizontal: 15}}>
			        	<Button 
			        		small
			        		title="HAFALAN SAYA" 
			        		buttonStyle={styles.greenButton} 
			        		onPress={() => navigation.navigate('HafalanSingle', { from: ayahfrom, to: ayahto  })} 
			        	/>
			        </View>
			        <Card containerStyle={{ marginBottom: 30, borderRadius: 20, padding:0}}>
						{ student.map((u, i) => {
							let stripe

							if(i % 2 !== 0) {
								stripe = {backgroundColor: 'rgba(52, 52, 52, 0.1)'}
							} else {
								stripe = {backgroundColor: 'rgba(0, 0, 0, 0.0)'}
							}

							return (
							    <ListItem
						          	key={i}
						          	roundAvatar
						          	leftAvatar={{ source: { uri: `https://api.adorable.io/avatars/285/${ u }.png`} }}
						          	title={u}
						          	titleStyle={styles.hasBold}
						          	subtitle={
						          		<View>
						          			<Text style={styles.darkGrey}>Sedang di hafal</Text>
			                				<Text style={styles.hasBold}>Al-Mursalat 1 -10</Text>
						          		</View>
						          	}
						         	containerStyle={stripe}
							    />
							);
						})}
					</Card>
		        </ScrollView>
    		}
	    </View>
	)
}

//Mengambil data dari redux store dan mengubahnya menjadi props
const mapStateToProps = (state, props) => {
	const auth = state.firebase.auth;
	const users = state.firestore.data.users;
	const user = users ? users[auth.uid] : null;
	const hafalan = state.firestore.ordered.hafalan
	return {
		user: user,
		auth: auth,
		hafalan: hafalan
	}
}

//Memanggil fungsi action creator dan mengubahnya menjadi props
const mapDispatchToProps = (dispatch) => ({
	getAllSurah: () => dispatch(getAllSurah())
}) 

//Menghubungkan komponen dengan redux store
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(({ user, auth }) => {
		console.log(auth.uid)
		return [
			{ collection:'users' },
			{ collection: 'hafalan'}
		]
	})
)(Home)