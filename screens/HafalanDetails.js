import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import NavbarDrawer from '../components/NavbarDrawer'
import Counter from '../components/Counter'
import API from '../utils/api'

const HafalanDetails = ({ navigation, user, auth,  hafalan }) => {
	// if(!auth.uid){
	// 	navigation.replace('Login')
	// }

	const [ hafal, setHafal ] = useState([])

	useEffect(() => {
		const { surah, to, from } = navigation.state.params
		API.getSurahWithParams( surah, (from - 1), ((to - from) + 1) )
		.then(res => {
			setHafal(res.data.data.ayahs)
			//console.log(res.data.data.ayahs)
		}, err => {
			console.log(err)
		})

	}, [])

	console.log(navigation.state.params)

	return (
		<View style={styles.bgPrimary}>
			<NavbarDrawer title="Hafalan" navigation={navigation} nomenu/>
			<ScrollView>
				<View style={{marginBottom: 30}}>
				{ hafal.map((item, index) => (
					<Card key={index} containerStyle={{ borderRadius: 20}}>
						<Text style={styles.ayah}>{item.text}</Text>
						<Counter />
					</Card>
				)) }
				</View>
			</ScrollView>
		</View>
	)
}

export default HafalanDetails


const styles = StyleSheet.create({
	ayah: {
		width: '83%',
		marginHorizontal: 10,
		fontFamily: 'Quran',
		fontSize: 20,
		alignSelf: 'flex-end', 
		color: '#656565', 
		marginBottom: 10
	}
})