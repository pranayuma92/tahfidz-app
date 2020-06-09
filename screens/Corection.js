import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import NavbarDrawer from '../components/NavbarDrawer'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { styles } from '../styles'

const Corection = () => {
	const [ test, setTest ] = useState('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ')
	const [ tajwidCorrection, setTajwidCorrection ] = useState([])
	const [ makhrajCorrection, setMakhrajCorrection ] = useState([])
	const [ correction, setCorrection ] = useState(false)

	const mark = (h) => {
		alert(h)
		if(correction){
			setTajwidCorrection([...tajwidCorrection, h])
		} else {
			setMakhrajCorrection([...makhrajCorrection, h])
		}
	}

	const toggleCorrection = () => {
		setCorrection(!correction)
	}
	
	return (
		<View style={styles.bgPrimary}>
	        <NavbarDrawer title="Koreksi" navigation={navigation}/>
	        <View>
			        <View style={{flex: 1, flexDirection: 'row-reverse', padding: 15}}>
			        { test.split(' ').map((h, index) => {
			        		let color;

			        		if(tajwidCorrection.includes(h)){
								color = 'rgba(255, 0, 0, 0.3)'
							} else if(makhrajCorrection.includes(h)){
								color = 'rgba(51, 255, 0, 0.3)'
							}

			        		return 	(
			        			<Text onPress={() => mark(h)} key={index} style={{backgroundColor: color, fontFamily: 'Quran', fontSize: 20, borderRadius:3}}>{h}</Text>
			        		)
			        	})
			        }
			        </View>
			        <Text onPress={toggleCorrection}>{correction ? 'Tajwid' : 'Makhraj'}</Text>
			        </View>
	    </View>
	)
}	

export default Corection