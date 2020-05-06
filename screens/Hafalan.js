import React from 'react'
import { StyleSheet } from 'react-native'
import { View, ScrollView} from 'react-native'
import { Container, Text } from 'native-base'
import Navbar from '../components/Navbar'

const Hafalan = ({ navigation }) => {
	let data = []
	for(let i = 1; i < 31; i++){
    	data.push(i)
    }
	return (
		<Container style={{ backgroundColor: '#fff2e2'}}>
	        <Navbar title="Hafalan" />
		        <ScrollView>
		        	<View style={{flex: 1, flexDirection: 'row', flexWrap : 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
		        	{ data.map( item => (
		        		<View style={{width: '33.33%'}}>
				        	<Text style={styles.juz}>JUZ {item}</Text>
				        </View>
		        	))}
			        </View>
			    </ScrollView>
	    </Container>
	)
}

const styles = StyleSheet.create({
	juz: { 
		alignSelf: 'center', 
		backgroundColor: '#50755f', 
		margin: 10, 
		padding: 10, 
		width: '80%', 
		borderRadius: 50, 
		textAlign: 'center', 
		color: '#ffffff', 
		fontWeight: 'bold'
	}
})

export default Hafalan