import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import NavbarDrawer from '../components/NavbarDrawer'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Audio } from "expo-av"
import * as Permissions from "expo-permissions"
import * as firebase from "firebase"
import API from '../utils/api'
import { styles } from '../styles'
import { addKoreksi } from '../store/actions/userAction'

const KoreksiDetail = ({ navigation, addKoreksi }) => {
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

	const { text, numberInSurah, surah, title, uid, tid } = navigation.state.params
	const [ edit, setEdit ] = useState(false)
	const [ msg, setMsg ] = useState()
	const [ tajwidCorrection, setTajwidCorrection ] = useState([])
	const [ makhrajCorrection, setMakhrajCorrection ] = useState([])
	const [ correction, setCorrection ] = useState('')
	const [ permissions, setPermissions ] = useState(null)
	const [ audioFile, setAudiofile ] = useState([])
	const [ audiores, setAudiores ] = useState('')

	let recording = null

	useEffect(() => {
		getStatus()

    	if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig)
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
	  // Why are we using XMLHttpRequest? See:
	  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
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

  	const getNameFile = item => {
  		const data = item.split('/')
		return data.slice(-1)[0]
  	}

	const startCorrection = () => {
		setEdit(!edit)
	}

	const startMarking = (mark) => {
		if(mark === 'makhraj'){
			setMsg('Koreksi makhraj aktif')
			setCorrection('makhraj')
		} else {
			setMsg('Koreksi tajwid aktif')
			setCorrection('tajwid')
		}
	}

	const doMarking = (h) =>{
		if(edit === false || correction === ''){
			return
		}

		if(correction == 'tajwid'){
			setTajwidCorrection([...tajwidCorrection, h])
		} else {
			setMakhrajCorrection([...makhrajCorrection, h])
		}

	}

	const saveCorrection = async () => {
		if(!tajwidCorrection || !makhrajCorrection || !audioFile){
			return
		}

		setMsg('Sedang menyimpan')
		const uploadUrl = await prepareUpload(audioFile[0])
	   	if(uploadUrl){
			const data = {
				tajwid: tajwidCorrection,
				makhraj: makhrajCorrection,
				uid: uid,
				text: text,
				numberInSurah: numberInSurah,
				surah: surah,
				title: title,
				tid: tid,
				file: uploadUrl
			}

			addKoreksi(data, () => {
				setEdit(!edit)
				setMsg('')
				setTajwidCorrection([])
				setMakhrajCorrection([])
				setAudiofile([])
				alert('Berhasil menyimpan koreksi')
			})
		}
	}

	return (
		<View style={styles.bgPrimary}>
	        <NavbarDrawer title="Koreksi Hafalan" navigation={navigation} nomenu/>
	        <ScrollView>
	        	<Card>
					<View style={{ borderRadius: 20, flex: 1, flexDirection: 'row-reverse', flexWrap: 'wrap', padding: 10}}>
						{ text.split(' ').map((item, index) => {
							let color;

			        		if(tajwidCorrection.includes(item)){
								color = 'rgba(255, 0, 0, 0.3)'
							} else if(makhrajCorrection.includes(item)){
								color = 'rgba(51, 255, 0, 0.3)'
							}
							return (						
								<Text onPress={() => doMarking(item)} key={index} style={{backgroundColor: color, fontFamily: 'Quran', fontSize: 20, borderRadius:5}}>{item}</Text>
							)
						})}
					</View>
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						{ edit ? 
							( 
								<View style={{flexDirection: 'column', alignItems: 'center'}}>
									<View style={{flexDirection: 'row'}}>
										<TouchableOpacity style={styling.btnCor} onPress={() => startMarking('makhraj')}>
											<Text>Makhraj</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styling.btnCor} onPress={() => startMarking('tajwid')}>
											<Text>Tajwid</Text>
										</TouchableOpacity>
									</View>
									<View style={{flexDirection: 'row'}}>
										<TouchableOpacity style={styling.btnCor}
											onPressIn={handleRecordAudio}
			            					onPressOut={handleStopRecordingAudio}>
											<Text>Rekam Koreksi</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styling.btnCor} onPress={saveCorrection}>
											<Text>Simpan</Text>
										</TouchableOpacity>
									</View>
								</View>
							) :
							(
								<TouchableOpacity style={styling.btnCor} onPress={startCorrection}>
									<Text>Mulai Koreksi</Text>
								</TouchableOpacity>
							)
						}
					</View>
					<Text style={{alignSelf: 'center'}}>{msg}</Text>
				</Card>
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

const mapDispatchToProps = dispatch => ({
	addKoreksi: (data, callback) => dispatch(addKoreksi(data, callback))
})

export default connect(null, mapDispatchToProps)(KoreksiDetail)

const styling = StyleSheet.create({
	btnCor: {backgroundColor: 'salmon', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 50, margin: 5}
})