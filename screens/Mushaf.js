import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Container, List, ListItem, Text, Spinner, Left, Body } from 'native-base'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { styles } from '../styles'

const Mushaf = ({ surah, navigation }) => {

	const [surahs, setSurahs] = useState('')
	const [isPending, setPending] = useState(true)

	useEffect(() => {
		if(!surahs){
			setSurahs(surah)
			setPending(!isPending)
		}
		console.log(surahs)	
	}, [surahs, isPending])
	
	return (
		<Container style={{ backgroundColor: '#fff2e2'}}>
	       <Navbar title="Mushaf" />
		    { isPending && <View style={styles.toCenter}><Spinner color='red' /></View>}
		    { !!surahs &&
		        <ScrollView>
			       <List>
			       	{
			       		!!surahs && surahs.map((item, index) => (
			       			<ListItem key={index} onPress={() => navigation.push('SurahSingle', { number: item.number })}>
			       				<Left style={{ backgroundColor: 'salmon', flex: 1, justifyContent: 'center', borderRadius: 5 }}>
			       					<Text style={{ color: '#fff' }}>{index+1}</Text>
			       				</Left>
			       				<Text style={{ width: '85%', marginLeft: 10, fontFamily: 'Quran'}}>{item.englishName} - {item.name}</Text>
			       			</ListItem>

			       		))
			       	}
			       </List>
		        </ScrollView>
		    }
	    </Container>
	)
}

const mapStateToProps = state => ({
  surah: state.quran.surah,
})

export default connect(mapStateToProps)(Mushaf)