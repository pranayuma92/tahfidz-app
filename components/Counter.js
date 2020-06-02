import React, { useState, useEffect } from 'react'
import { Vibration } from 'react-native'
import { View, ScrollView, Image, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'

const Counter = () => {
	const [count, setCount] = useState(0)

	const handleCounter = () => {

		if(count > 21){
			return
		}

		setCount(count+1)
		Vibration.vibrate(100)
	}

	return (
		<TouchableOpacity onPress={handleCounter} style={{backgroundColor: 'salmon', width: 120,paddingVertical: 10, paddingHorizontal: 25, borderRadius: 50, alignSelf: 'flex-end', alignItems: 'center'}}>
			<Text style={{fontWeight: 'bold', color: '#fff'}}>{count}x BACA</Text>
		</TouchableOpacity>
	)
}

export default Counter