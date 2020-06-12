import React, { useState, useEffect } from 'react'
import {  TouchableOpacity, Text, Image, View } from "react-native";

import { Audio } from "expo-av";
import { Linking } from 'expo'
import * as DocumentPicker from 'expo-document-picker';

import * as Permissions from "expo-permissions";
import NavbarDrawer from '../components/NavbarDrawer'

const Setor = ({ navigation }) => {
	const [permissions, setPermissions] = useState(null);
  const [image, setImage] = useState('https://api.adorable.io/avatars/285/rrvrvrvrvr.png')
  const [audiores, setAudiores] = useState('')
  const [isRecord, setRecord] = useState(false)

  let recording = null;

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    if (status === "granted") {
      setPermissions(true);
      await Audio.setIsEnabledAsync(true);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        staysActiveInBackground: false,
        playThroughEarpieceAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
      });
    }
  };

  const handleRecordAudio = async () => {
    try {
      if (permissions) {
        recording = new Audio.Recording();
        await recording.prepareToRecordAsync(
          JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY))
        );

        recording.setOnRecordingStatusUpdate(e => console.log(e));
        recording.setProgressUpdateInterval(50);

        await recording.startAsync();
         const audio_stream = recording.getURI();
        console.log(audio_stream);
      } else {
        alert("This function requires microphone permissions");
      }
    } catch (err) {
      console.log("err caught with recording video", err);
    }
  };

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
      });
      await recording.stopAndUnloadAsync();
      const data = recording.getURI();
      const { sound } = await recording.createNewLoadedSoundAsync()
      setAudiores(sound)
    } catch (err) {
      console.log("Error caught stopping recording", err);
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
    setImage(result.uri);
    console.log(result);
  }

  const playSound = async () => {
    try {
      audiores.playAsync();
      console.log('play')
    } catch (error) {
      console.log(error)
    }
  }

  const handleRepeat = ({ navigation }) => {
    setAudiores('')
  }
	return (
		<React.Fragment>
		<NavbarDrawer title="Setor" navigation={navigation} nomenu/>
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#fff2e2' }}>
      { audiores ? 
        (
          <View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity 
                 style={{marginHorizontal : 10 }}
                onPress={playSound}>
                <Image style={{ width : 80, height: 80 }} source={require('../assets/images/play-button.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginHorizontal : 10 }}
                onPressIn={handleRepeat}>
                <Image style={{ width : 80, height: 80 }} source={require('../assets/images/repeat.png')} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{marginHorizontal: 'auto', marginVertical: 50, alignSelf: 'center' }}>
              <Text>UPLOAD</Text>
            </TouchableOpacity>
          </View>
        ) :
        (
          <TouchableOpacity
            onPressIn={handleRecordAudio}
            onPressOut={handleStopRecordingAudio}>
            <Image style={{ width : 80, height: 80 }} source={require('../assets/images/mic.png')} />
          </TouchableOpacity>
        )}
    </View>
    </React.Fragment>
	)
}

export default Setor