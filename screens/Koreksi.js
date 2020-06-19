import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import NavbarDrawer from '../components/NavbarDrawer'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Audio } from "expo-av"
import * as Permissions from "expo-permissions"
import API from '../utils/api'
import { styles } from '../styles'

const Koreksi = ({ navigation }) => {
	console.log(navigation.state.params)

	const { from, to, title, name, surah, file, uid, tid } = navigation.state.params
	const [permissions, setPermissions] = useState(null)
	const [lists, setLists] = useState()

	useEffect(() => {
    	getStatus()
    	API.getSurahWithParams( surah, (from - 1), ((to - from) + 1) )
		.then(res => {
			setLists(res.data.data)
			console.log(res.data)
		}, err => {
			console.log(err)
		})
  	}, [])

	const getStatus = async () => {
    	const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)

    	if (status === "granted") {
	      	setPermissions(true)
	      	await Audio.setIsEnabledAsync(true)
	      	await Audio.setAudioModeAsync({
	       		allowsRecordingIOS: true,
	        	interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
	        	playsInSilentModeIOS: true,
	        	shouldDuckAndroid: true,
	        	staysActiveInBackground: false,
	        	playThroughEarpieceAndroid: true,
	        	interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
	      	})
	    }
  	}

  	const playSound = async (item) => {
   		const sound = new Audio.Sound()
   		try {
   			await Audio.setAudioModeAsync({
		        allowsRecordingIOS: false,
		        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
		        playsInSilentModeIOS: true,
		        playsInSilentLockedModeIOS: true,
		        shouldDuckAndroid: true,
		        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
		        playThroughEarpieceAndroid: false,
		        staysActiveInBackground: true,
		    })

		   	await sound.loadAsync({uri: item})
		   	sound.playAsync()
		} catch(err) {
			console.log(err)
		}
  	}

  	const mark = (h) => {
		alert(h)
		// if(correction){
		// 	setTajwidCorrection([...tajwidCorrection, h])
		// } else {
		// 	setMakhrajCorrection([...makhrajCorrection, h])
		// }
	}

	const doCorrection = (item) => {
		navigation.push('KoreksiDetail', { text: item.text, numberInSurah: item.numberInSurah, surah: surah, title: title, uid: uid, tid: tid })
	}

	return (
		<View style={styles.bgPrimary}>
	        <NavbarDrawer title="Koreksi Hafalan" navigation={navigation} nomenu/>
	        <ScrollView>
	        	<View style={styles.userAvatarWrapper}>
		        	<View style={styles.userAvatarImg}>
		        		<Avatar
						  rounded
						  size="large"
						  source={{ uri: `https://api.adorable.io/avatars/285/${ name }.png`}}
						/>
		        	</View>
		        	<View style={styles.userAvatarSideText}>
		        		<Text style={styles.fontBig}>{name}</Text>
		        		<Text style={styles.darkGrey}>Surat {title}</Text>
		        		<Text style={styles.darkGrey}>Ayat {from} - {to}</Text>
		        	</View>
		        </View>
		        <Card containerStyle={{marginBottom: 30, borderRadius: 10}}>
		        	<View style={{alignItems: 'center', marginBottom: 20}}>
		        		<Text style={{marginBottom: 10}}>Putar audio setoran</Text>
			        	<TouchableOpacity onPress={() => playSound(file)}>
			        		<Image style={{ width : 50, height: 50 }} source={require('../assets/images/play-button.png')} />
			        	</TouchableOpacity>
		        	</View>
		        	<View style={styling.opening}>
						<Text style={styling.ayahOpening}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</Text>
					</View>
		        	{ !!lists && lists.ayahs.map((item, index) => {
							let stripe

							if(index % 2 === 0) {
								stripe = '#ffcea2'
							} else {
								stripe = '#fff'
							}

							return (
								<React.Fragment>
									<View key={index} style={{ borderRadius: 20, backgroundColor: stripe, flex: 1, flexDirection: 'row-reverse', flexWrap: 'wrap', paddingHorizontal: 10, paddingTop: 10, paddingBottom: 50, marginTop: 20 }}>
										<Text style={{ fontFamily: 'Quran', fontSize: 20, borderRadius:3}}>{item.text}</Text>										
									</View>
									<View style={styling.redline}></View>
									<View style={styling.kButton}>
										<TouchableOpacity onPress={() => doCorrection(item)}>
											<Text style={{color: '#fff'}}>KOREKSI</Text>
										</TouchableOpacity>
									</View>
								</React.Fragment>
							)
						})}
		        </Card>
	        </ScrollView>
	    </View>
	)
}

export default Koreksi

const styling = StyleSheet.create({
	opening: {
		width: '85%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderTopWidth: 2,
		borderTopColor: 'salmon',
		borderBottomWidth: 2,
		borderBottomColor: 'salmon'
	},
	ayahOpening: {
		width: '80%',
		marginHorizontal: 10,
		fontFamily: 'Quran',
		fontSize: 24,
		alignSelf: 'flex-start', 
		color: '#656565', 
		marginBottom: 10
	},
	kButton: {
		alignSelf: 'center', 
		backgroundColor: 'salmon', 
		paddingVertical: 10, 
		paddingHorizontal: 15, 
		borderRadius: 50,
		position: 'relative',
		marginTop: -50
	},
	redline: {
		width: '90%',
		alignSelf: 'center',
		backgroundColor: 'salmon',
		height: 7,
		position: 'relative',
		top: -25,
		borderRadius: 3
	},
})