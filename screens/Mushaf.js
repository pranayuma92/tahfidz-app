import React, { useState, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator, Text } from 'react-native'
import { ListItem } from 'react-native-elements';
import NavbarDrawer from '../components/NavbarDrawer'
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
		<View style={{ backgroundColor: '#fff2e2', flex: 1}}>
	       	<NavbarDrawer title="Mushaf" navigation={navigation}/>
		    { isPending && <View style={styles.toCenter}><ActivityIndicator size="large" color="salmon" /></View>}
		    { !!surahs &&
		        <ScrollView>
			       	{ !!surahs && surahs.map((item, index) => (
		       			<ListItem 
		       				key={index} 
		       				onPress={() => navigation.push('SurahSingle', { number: item.number })}
		       				title={
		       					<Text style={{ marginLeft: 10, fontFamily: 'Quran', fontSize: 16, fontWeight: 'bold', color: '#656565'}}>{item.englishName} - {item.name}</Text>
		       				}
		       				leftElement={
		       					<View style={{ backgroundColor: 'salmon', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
		       						<Text style={{ color: '#fff' }}>{index+1}</Text>
		       					</View>
		       				}
		       				containerStyle={{backgroundColor: '#fff2e2'}}
		       				bottomDivider
    						chevron
		       			/>

		       		))}
		        </ScrollView>
		    }
	    </View>
	)
}

const mapStateToProps = state => ({
  surah: state.quran.surah,
})

export default connect(mapStateToProps)(Mushaf)