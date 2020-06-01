import React, { useState, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator, Text } from 'react-native'
import { ListItem, Button } from 'react-native-elements';
import { Audio } from 'expo-av'
import NavbarDrawer from '../components/NavbarDrawer'
import AudioControl from '../components/AudioControl'
import API from '../utils/api'
import { styles } from '../styles'

const SurahSingle = ({ navigation }) => {
	const { number } = navigation.state.params
	const [ pending, setPending ] = useState(true)
	const [ error, setError ] = useState(false)
	const [ ayah, setAyah ] = useState('')
	const [ ayahcount, setAyahcount ] = useState(0)
	const [ name, setName ] = useState('')
	const [ latin, setLatin ] = useState('')
	const [ available, setAvailable ] = useState(true)
	const [ offset, setOffset ] = useState(0)
	const [ limit, setLimit ] = useState(10)
	const [ loadtext, setLoadtext ] = useState('Load More')

	useEffect(() => {
		let isSubscribed = true
		API.getSurahWithParams( number, offset, limit )
		.then((result) => {
			if (isSubscribed) {
				setAyah(result.data.data.ayahs)
				setName(result.data.data.name)
				setLatin(result.data.data.englishName)
				setAyahcount(result.data.data.numberOfAyahs)
				setPending(false)
				setOffset(offset + limit)
				setLimit(limit)
			}
		}, error => {
			setPending(false)
			setError(true)
		})

		return () => isSubscribed = false
	}, [])

	const loadMore = () => {
		console.log(offset, limit)
		setLoadtext('Loading...')
		API.getSurahWithParams(number , offset, limit)
		.then(result => {
			if(Array.isArray(result.data.data.ayahs)){
				setOffset(offset + limit)
				setLimit(limit)
				setAyah(ayah.concat(result.data.data.ayahs))
				setLoadtext('Load More')
			} else {
				setAvailable(false)
			}
		}, error => {
			setPending(false)
			setError(true)
		})
	}

	return (
		<View style={{ backgroundColor: '#fff2e2', flex: 1}}>
			<NavbarDrawer title={name ? `${latin} - ${name}` : 'Loading...'} navigation={navigation} nomenu/>
			{ pending && <View style={styles.toCenter}><ActivityIndicator size="large" color="salmon" /></View>}
			{ !!ayah &&
				<ScrollView>
				 	{ !!ayah && ayah.map((item, index) => (
						<ListItem 
		       				key={index} 
		       				title={
		       					<Text style={[styles.ayah, { alignSelf: 'flex-end', color: '#656565'}]}>{(number != 1) ? item.text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '') : item.text}</Text>
		       				}
		       				leftElement={
		       					<View style={{ backgroundColor: 'salmon', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
		       						<Text style={{ color: '#fff' }}>{item.numberInSurah}</Text>
		       					</View>
		       				}
		       				containerStyle={{backgroundColor: '#fff2e2'}}
		       				bottomDivider
		       			/>
					))}
				 	{ ayahcount > 10 && 
				 		<View style={{paddingHorizontal: 100, paddingVertical: 30}}>
				 			{ available && 
					 			<Button
								  title={loadtext}
								  buttonStyle={{backgroundColor: 'salmon', borderRadius: 50 }}
								  onPress={loadMore}
								/>
							}
				 		</View> 
				 	}
				</ScrollView>
			}
		</View>
	)

}

export default SurahSingle