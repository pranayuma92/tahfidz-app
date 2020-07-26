import React, { useState, useEffect } from 'react'
import {  TouchableOpacity, Text, Image, View, ScrollView } from "react-native"

import { Audio } from "expo-av"
import { Linking } from 'expo'
import * as DocumentPicker from 'expo-document-picker'

import * as Permissions from "expo-permissions"
import NavbarDrawer from '../components/NavbarDrawer'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import base64 from 'react-native-base64'
import * as firebase from "firebase"
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { addSetoran } from '../store/actions/userAction' 

const Setor = ({ navigation, auth, user, addSetoran }) => {
	const firebaseConfig = {
		apiKey: "AIzaSyCGo9EyQOrcaw0JO8DnkSdr1AWI7VebqIo",
		authDomain: "tahfidz-web.firebaseapp.com",
		databaseURL: "https://tahfidz-web.firebaseio.com",
		projectId: "tahfidz-web",
		storageBucket: "tahfidz-web.appspot.com",
		messagingSenderId: "664805159215",
		appId: "1:664805159215:web:bcb591ddd0a41b2af2b1da",
		measurementId: "G-H5856Q9WTB"
	}

	console.log(navigation.state.params)

	const { surah, title, from, to } = navigation.state.params

	const [permissions, setPermissions] = useState(null)
  	const [image, setImage] = useState('https://api.adorable.io/avatars/285/rrvrvrvrvr.png')
  	const [audiores, setAudiores] = useState('')
 	const [isRecord, setRecord] = useState(false)
  	const [duration, setDuration] = useState('00:00')
  	const [audioFile, setAudiofile] = useState([])
  	const [upload, setUpload] = useState('')

  	let recording = null

  	useEffect(() => {
    	getStatus()
    	if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig)
		}
    	return () => {
    		handleStopRecordingAudio()
    	}
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

  	const getMMSSFromMillis = (millis) => {
    	const totalSeconds = millis / 1000
    	const seconds = Math.floor(totalSeconds % 60)
    	const minutes = Math.floor(totalSeconds / 60)

    	const padWithZero = number => {
      	const string = number.toString()
      		if (number < 10) {
        		return '0' + string
      		}
      		return string
    	}
    	return padWithZero(minutes) + ':' + padWithZero(seconds)
  	}

  	const handleRecordAudio = async () => {
	    try {
		    if (permissions) {
		        recording = new Audio.Recording()
		        await recording.prepareToRecordAsync(
		          JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY))
		        )

		        recording.setOnRecordingStatusUpdate(e => {
		        	console.log(e)
		        	//setDuration(getMMSSFromMillis(e.durationMillis))
		        })
		        recording.setProgressUpdateInterval(50)

		        await recording.startAsync()
		         const audio_stream = recording.getURI()
		        console.log(audio_stream)
		    } else {
		        alert("This function requires microphone permissions")
		    }
	    } catch (err) {
	      	console.log("err caught with recording video", err)
	    }
  	}

	const handleStopRecordingAudio = async () => {
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
	      	await recording.stopAndUnloadAsync()
	      	const data = recording.getURI()
	      	setAudiofile([...audioFile, data])
	      	const { sound } = await recording.createNewLoadedSoundAsync()
	      	setAudiores(sound)
	    } catch (err) {
	      	console.log("Error caught stopping recording", err)
	    }
	}

  	const pickDocument = async () => {
    	let result = await DocumentPicker.getDocumentAsync({ type: 'image/*' })
    	setImage(result.uri)
    	console.log(result)
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

  	const prepareUpload = async (uri) => {
	  const blob = await new Promise((resolve, reject) => {
	    const xhr = new XMLHttpRequest()
	    xhr.onload = function() {
	      resolve(xhr.response)
	    }
	    xhr.onerror = function(e) {
	      console.log(e)
	      reject(new TypeError('Network request failed'))
	    }
	    xhr.responseType = 'blob'
	    xhr.open('GET', uri, true)
	    xhr.send(null)
	  })

	  const ref = firebase
	    .storage()
	    .ref()
	    .child(getNameFile(uri))
	  const snapshot = await ref.put(blob)

	  blob.close()

	  return await snapshot.ref.getDownloadURL()
	}

  	const uploadFile = async (item) => {
	   const uploadUrl = await prepareUpload(item)
	   if(uploadUrl){
	   	addSetoran(auth.uid, surah, to, from, title, uploadUrl, user.name, () => {
		   	console.log('uploaded')
		   	alert('Berhasil di upload')
	  		setUpload(uploadUrl)
	   	})
	   }
  	}

  	const handleRepeat = ({ navigation }) => {
   	 	setAudiores('')
  	}

  	const getNameFile = item => {
  		const data = item.split('/')
		return data.slice(-1)[0]
  	}

	return (
		
		<View style={{flex: 1, backgroundColor:'#fff2e2' }}>
			<NavbarDrawer title="Setor" navigation={navigation} nomenu/>
		    <ScrollView>
				<View style={{alignSelf: 'center', paddingVertical: 30}}>
			      	<TouchableOpacity
			            onPressIn={handleRecordAudio}
			            onPressOut={handleStopRecordingAudio}>
			            <Image style={{ width : 80, height: 80, margin: 'auto' }} source={require('../assets/images/mic-red.png')} />
			        </TouchableOpacity>
		        </View>
		          	{ !audioFile && 
		          		<ListItem 
		          			title={
		       					<Text>Tidak Ada Rekaman</Text>
		       				}
		       				containerStyle={{backgroundColor: '#fff2e2'}}
		       				bottomDivider
						/>
		          	}
		            {
		            	!!audioFile && audioFile.map((item, index) => (

		            		<ListItem
		            		key={index} 
		       				
		       				title={
		       					<Text>{getNameFile(item)}</Text>
		       				}
		       				rightElement={
		       					<React.Fragment>
			       					<TouchableOpacity style={{ backgroundColor: 'salmon', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginRight: 10}}
			       						  onPress={() => playSound(item)}>
			       						<Image style={{ width : 30, height: 30 }} source={require('../assets/images/play-button.png')} />
			       					</TouchableOpacity>
			       					<TouchableOpacity style={{ backgroundColor: 'salmon', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}
			       						onPress={() => uploadFile(item)}>
			       						<Image style={{ width : 20, height: 20 }} source={require('../assets/images/upload.png')} />
			       					</TouchableOpacity>
		       					</React.Fragment>
		       				}
		       				containerStyle={{backgroundColor: '#fff2e2'}}
		       				bottomDivider
		            		/>
		            	))
		            }
		           
	        </ScrollView>
	    </View>
    
	)
}

const mapStateToProps = (state, props) => {
	const auth = state.firebase.auth
	const users = state.firestore.data.users
	const user = users ? users[auth.uid] : null
	return {
		user: user,
		auth: auth
	}
}

const mapDispatchToProps = (dispatch) => ({
	addSetoran: (uid, surah, to, from, title, file, name, callback) => dispatch(addSetoran(uid, surah, to, from, title, file, name, callback))
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection:'users' }
	])
)(Setor)