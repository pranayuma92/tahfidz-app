import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Container, Text, Button } from 'native-base'
import { Audio } from 'expo-av'

const AudioControl = ({ source }) => {
	let soundObject = null;

	const [ playing, setPlaying] = useState(false)
	const [ audio, setAudio ] = useState(new Audio.Sound())

	const togglePlay = () => {
		setPlaying(!playing)
	}

	const prepareSound = async () => {
	  await Audio.setIsEnabledAsync(true);

	  await Audio.setAudioModeAsync({
	    playsInSilentModeIOS: true,
	    allowsRecordingIOS: false,
	    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
	    shouldDuckAndroid: false,
	    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
	  });
	}

	const loadAudio = async () => {
		try {
		  await audio.loadAsync({uri: source})
		  // Your sound is playing!
		} catch (error) {
		  // An error occurred!
		}
	}

	const stopAudio = async () => {
		audio.stopAsync()
	}

	useEffect(() => {
		prepareSound()
		loadAudio()
		playing ? audio.playAsync() : audio.pauseAsync()
		return () => {
			//stopAudio()
			setPlaying(!playing)
			//setAudio('')
		}
	}, [audio, playing])

	return (
		<TouchableOpacity style={style.btn} onPress={togglePlay}><Text style={style.wtext}>{playing ? 'PAUSE' : 'PLAY'}</Text></TouchableOpacity>
	)
}

export default AudioControl

const style = StyleSheet.create({
	btn: {
		backgroundColor: 'salmon',
		width: 68,
		paddingVertical: 8, 
		paddingHorizontal: 15, 
		borderRadius: 50, 
		alignSelf: 'flex-start', 
		alignItems: 'center',
		marginBottom: -32,
		marginLeft: 20
	},
	wtext: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 12
	}
})