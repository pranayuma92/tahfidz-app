import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import NavbarDrawer from '../components/NavbarDrawer'
import Counter from '../components/Counter'
import API from '../utils/api'
import AudioControl from '../components/AudioControl'

const HafalanDetails = ({ navigation, user, auth,  hafalan }) => {
	// if(!auth.uid){
	// 	navigation.replace('Login')
	// }

	const { surah, to, from, title } = navigation.state.params
	const [ hafal, setHafal ] = useState()
	const [ readCount, setReadCount ] = useState(0)

	useEffect(() => {
		API.getSurahWithParams( surah, (from - 1), ((to - from) + 1) )
		.then(res => {
			setHafal(res.data.data)
			console.log(res.data)
		}, err => {
			console.log(err)
		})

	}, [])

	console.log(navigation.state.params)

	const handleReadCount = () => {
		setReadCount(readCount + 1)
	}

	console.log(readCount)
 
	return (
		<View style={styles.bgPrimary}>
			<NavbarDrawer title="Hafalan" navigation={navigation} nomenu/>
			{ !hafal && <View style={styles.toCenter}><ActivityIndicator size="large" color="salmon" /></View> }
			{ !!hafal &&
				<ScrollView>
					<View style={{marginBottom: 30}}>
						<Text style={styles.yellowBtn}>BACA DAN HAFALKAN !</Text>
						<View style={styles.descWrapper}>
							<View style={styles.desc}>
								<Text style={styles.descText}>Juz</Text>
								<Text style={styles.descText}>: {hafal.ayahs[0].juz}</Text>
							</View>
							<View style={styles.desc}>
								<Text style={styles.descText}>Surat</Text>
								<Text style={styles.descText}>: {title}</Text>
							</View>
							<View style={styles.desc}>
								<Text style={styles.descText}>Ayat</Text>
								<Text style={styles.descText}>: {from} - {to}</Text>
							</View>
						</View>
						<View style={styles.opening}>
							<Text style={styles.ayahOpening}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</Text>
						</View>
						{ !!hafal && hafal.ayahs.map((item, index) => {
							let stripe

							if(index % 2 === 0) {
								stripe = '#ffcea2'
							} else {
								stripe = '#fff'
							}

							return (
								<Card key={index} containerStyle={{ borderRadius: 20, backgroundColor: stripe }}>
									<Text style={styles.ayah}>{(surah != 1) ? item.text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '') : item.text}</Text>
									<View style={styles.redline}></View>
									<AudioControl source={item.audioSecondary[1]} />
									<Counter callback={handleReadCount}/>
								</Card>
							)
						})}
						{
							(readCount >= 22) &&
							<TouchableOpacity style={styles.storBtn} onPress={() => navigation.push('Setor', { surah: surah, to: to, from: from, title: title})}>
								<Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>SETOR</Text>
							</TouchableOpacity>
						}
					</View>
				</ScrollView>
			}
		</View>
	)
}

export default HafalanDetails

const styles = StyleSheet.create({
	bgPrimary:{
		backgroundColor: '#fff2e2',
		flex: 1 
	},
	ayah: {
		width: '83%',
		marginHorizontal: 10,
		fontFamily: 'Quran',
		fontSize: 20,
		alignSelf: 'flex-end', 
		color: '#656565', 
		marginBottom: 10
	},
	redline: {
		backgroundColor: 'salmon',
		height: 7,
		position: 'relative',
		bottom: -20,
		borderRadius: 3
	},
	yellowBtn: {
		alignSelf: 'center',
		fontSize: 16,
		paddingVertical: 10,
		paddingHorizontal: 20,
		color: '#fff',
		fontWeight: 'bold',
		backgroundColor: '#fdbf50',
		borderRadius: 50,
		marginTop: 20
	},
	desc: {
		flex: 1,
		flexDirection: 'row'
	},
	descText: {
		width: 80,
		fontSize: 16
	},
	descWrapper: {
		paddingVertical: 10,
		paddingHorizontal: 18
	},
	opening: {
		width: '85%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderTopWidth: 2,
		borderTopColor: 'salmon',
		borderBottomWidth: 2,
		borderBottomColor: 'salmon'
	},
	ayahOpening: {
		width: '75%',
		marginHorizontal: 10,
		fontFamily: 'Quran',
		fontSize: 24,
		alignSelf: 'flex-start', 
		color: '#656565', 
		marginBottom: 10
	},
	toCenter: {
		flex: 1, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center'
	},
	storBtn: {
		backgroundColor: '#50755f', 
		width: 120,
		alignItems: 'center', 
		padding: 5, 
		borderRadius: 50, 
		alignSelf: 'center', 
		marginTop: 20
	}
})