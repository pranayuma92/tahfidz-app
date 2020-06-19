import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import { Audio } from "expo-av"
import * as Permissions from "expo-permissions"
import NavbarDrawer from '../components/NavbarDrawer'
import { styles } from '../styles'

const DetailKoreksi = ({ navigation }) => {
	const { detail } = navigation.state.params
	const [ permissions, setPermissions ] = useState(null)

	useEffect(() => {
		getStatus()
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

	return (
		<View style={styles.bgPrimary}>
	        <NavbarDrawer title="Kokresi Oleh Guru" navigation={navigation} nomenu/>
	        <ScrollView>
	        	<Card containerStyle={{borderRadius: 10}}>
	        		<Text style={{fontSize: 18, fontWeight: 'bold'}}>{detail.title} ayat {detail.numberInSurah}</Text>
	        		<View  style={{ borderRadius: 20, flex: 1, flexDirection: 'row-reverse', flexWrap: 'wrap', padding: 10}}>
	        			{ detail.text.split(' ').map((item, index) => {
	        				let color;

			        		if(detail.tajwid.includes(item)){
								color = 'rgba(255, 0, 0, 0.3)'
							} else if(detail.makhraj.includes(item)){
								color = 'rgba(51, 255, 0, 0.3)'
							}
							return (						
								<Text key={index} style={{backgroundColor: color, fontFamily: 'Quran', fontSize: 20, borderRadius:5}}>{item}</Text>
							)
	        			}) }
	        		</View>
	        		<ListItem
	       				title={
	       					<Text>Putar audio koreksi</Text>
	       				}
	       				rightElement={
	       					<React.Fragment>
		       					<TouchableOpacity style={{ backgroundColor: 'salmon', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginRight: 10}}
		       						  onPress={() => playSound(detail.file)}>
		       						<Image style={{ width : 30, height: 30 }} source={require('../assets/images/play-button.png')} />
		       					</TouchableOpacity>
	       					</React.Fragment>
	       				}
	       				containerStyle={{backgroundColor: '#fff2e2', borderRadius: 10}}
	            		/>
	        	</Card>
	        	<View style={{paddingVertical: 10, paddingHorizontal: 15}}>
	        		<Text style={{fontWeight:'bold'}}>Catatan:</Text>
	        		<Text>Makhraj: <View style={{width: 20, height: 10, backgroundColor:'rgba(51, 255, 0, 0.3)'}}></View></Text>
	        		<Text>Tajwid: <View style={{width: 20, height: 10, backgroundColor:'rgba(255, 0, 0, 0.3)'}}></View></Text>
	        	</View>
	        </ScrollView>
		</View>
	)
}	

export default DetailKoreksi