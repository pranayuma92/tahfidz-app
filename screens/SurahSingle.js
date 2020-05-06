import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Container, List, ListItem, Text, Button, Left, Spinner } from 'native-base'
import { Audio } from 'expo-av'
import Navbar from '../components/Navbar'
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
		<Container style={{ backgroundColor: '#fff2e2'}}>
			<Navbar title={name ? name : 'Loading...'} subtitle={!!latin && latin} navigation={navigation}/>
			{ pending && <View style={styles.toCenter}><Spinner color='red' /></View>}
			{ !!ayah &&
				<ScrollView>
					<List>
					 	{
					 		!!ayah && ayah.map((item, index) => (
								<ListItem key={index} style={styles.justify}>
									<Left style={{ backgroundColor: 'salmon', flex: 1, justifyContent: 'center', borderRadius: 5 }}>
										<Text style={{ color: '#fff' }}>{item.numberInSurah}</Text>
									</Left>
									<Text style={styles.ayah}>{(number != 1) ? item.text.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '') : item.text}</Text>
								</ListItem>
							))
					 	}
					 	{ ayahcount > 10 && 
					 		<View style={{paddingHorizontal: 100, paddingVertical: 30}}>
					 			{ available && <Button style={{ backgroundColor: 'salmon'}} rounded block onPress={loadMore}><Text>{loadtext}</Text></Button> }
					 		</View> 
					 	}
					</List>
				</ScrollView>
			}
		</Container>
	)

}

export default SurahSingle