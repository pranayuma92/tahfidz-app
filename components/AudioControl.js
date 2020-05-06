import React, { useState, useEffect } from 'react'
import { Container, Text, Button } from 'native-base'
import { Audio } from 'expo-av'

const AudioControl = ({ source }) => {
	let soundObject = null;

	const [ playing, setPlaying] = useState(false)
	const [ audio, setAudio ] = useState(new Audio.Sound())

	const togglePlay = () => {
		setPlaying(!playing)
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
		loadAudio()
		playing ? audio.playAsync() : audio.pauseAsync()
		return () => {
			//stopAudio()
			setPlaying(!playing)
			//setAudio('')
		}
	}, [audio, playing])

	return (

			<Button onPress={togglePlay}><Text>{playing ? 'Pause' : 'Play'}</Text></Button>
	)
}

export default AudioControl