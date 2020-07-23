import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Audio } from "expo-av"
import * as Permissions from "expo-permissions"

const SoundControl = ({ uri }) => {
	const [ isPlaying, setPlayibg ] =  useState(false)
    const [ playbackInstance, setPlaybackInstance ] = useState(null)
    const [ volume, setVolume ] = useState(1.0)
    const [ isBuffering, setBuffering ] = useState(false)
    const [ duration, setDuration ] = useState('00:00')
    const [ playDuration, setPlayDuration] = useState('00:00')
    const [ slider, setSlider ] = useState(0)
    const [ warn, setWarn ] = useState(false)

    useEffect(() => {
    	prepare()
    }, [])

    const prepare = async () => {
    	try {
    		await Audio.setAudioModeAsync({
      			allowsRecordingIOS: false,
      			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      			playsInSilentModeIOS: true,
      			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      			shouldDuckAndroid: true,
      			staysActiveInBackground: true,
      			playThroughEarpieceAndroid: false
     		})

     		loadAudio()
    	} catch(e){
    		console.log(e)
    		setWarn(!warn)
    	}
    }

    const loadAudio = async () => {
    	setDuration('00:00')
    	setPlayDuration('00:00')
    	setSlider(0)

    	try {
    		const playbackInstance = new Audio.Sound()
		    const source = {
		     	uri: uri
		    }

		    const status = {
     			shouldPlay: isPlaying,
     			volume
   			}

   			playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
		    playbackInstance.setOnPlaybackStatusUpdate(e => {
		    	setDuration(getMMSSFromMillis(e.durationMillis))
		    	setPlayDuration(getMMSSFromMillis(e.positionMillis))
		    	setSlider(getSeekSliderPosition(e.positionMillis, e.durationMillis))
		    })   
		    await playbackInstance.loadAsync(source, status, false)
		    setPlaybackInstance(playbackInstance)
    	} catch (e){
    		console.log(e)
    		setWarn(!warn)
    	}
    }

    const onPlaybackStatusUpdate = status => {
   		setBuffering(status.isBuffering)	
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
  
  	const getSeekSliderPosition = (pos, dur) => {
    	const sleek = pos / dur * 100
    	return Math.ceil(sleek )
  	}

  	const handlePlayPause = async () => {
	    isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
	    setPlayibg(!isPlaying)
   	}

   	const sliderW = `${slider}%`

	if(warn){
		return (
			<Text style={{flexDirection: 'row', marginVertical: 10, alignSelf: 'center', color: 'salmon'}}>Cannot load sound: Null</Text>
		)
	} else {

		return (
			<View>
	   			<View style={{width: '100%', height: 5, backgroundColor: '#7b7b7b', marginHorizontal: 10, alignSelf: 'center', borderRadius: 5}}>
	            	<View style={{width: sliderW, height: 5, backgroundColor: 'salmon', borderRadius: 5}}></View>
	          	</View>
		   		<View style={{flexDirection: 'row', marginVertical: 10, alignItems: 'center'}}>
			   		<TouchableOpacity onPress={handlePlayPause} style={{marginRight: 20}}>
			   			<Text style={{color: 'salmon'}}>{!isPlaying ? 'Play' : 'Pause'}</Text>
			   		</TouchableOpacity>
			   		<Text> {playDuration} / </Text>
			   		<Text>{duration}</Text>
		   		</View>
	   		</View>
		)
	}	
}

export default SoundControl