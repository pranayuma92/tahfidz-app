import React from 'react'
import { View, ScrollView } from 'react-native'
import { Container, Card, CardItem, Body, Text, Content } from 'native-base'
import NavbarDrawer from '../components/NavbarDrawer'

const Materi = ({ navigation }) => {
	const test = () => {
		alert('Button works great!')
	}

	return (
		<Container style={{ backgroundColor: '#fff2e2'}}>
	        <NavbarDrawer title="Materi" navigation={navigation} />
	        <ScrollView>
	        	<Content padder>
		        	<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
		        		<View style={{width: '50%', padding: 5}}>
				        	<View style={{ height: 60, backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5}} >
				                <Text onPress={() => navigation.navigate('MateriOverview', { title: 'Makhrijul Huruf', mat: 'makharijul'})}>
				                  Makhrijul Huruf
				                </Text>
					        </View>
				        </View>
				        <View style={{width: '50%', padding: 5}}>
				        	<View style={{ height: 60, backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5}} >
				                <Text onPress={() => navigation.navigate('MateriOverview', { title: 'Mad', mat: 'mad'})}>
				                   Mad
				                </Text>
				            </View>
				        </View>
				        <View style={{width: '50%', padding: 5}}>
				        	<View style={{ height: 60, backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5}} >
				                <Text onPress={() => navigation.navigate('MateriOverview', { title: 'Hukum Idgham', mat: 'hukum-idgham'})}>
				                   Hukum Idgham
				                </Text>
				            </View>
				        </View>
				        <View style={{width: '50%', padding: 5}}>
				        	<View style={{ height: 60, backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5}} >
				                <Text onPress={() => navigation.navigate('MateriOverview', { title: 'Sifat Huruf', mat: 'sifat-huruf'})}>
				                   Sifat Huruf
				                </Text>
					        </View>
				        </View>
				        <View style={{width: '50%', padding: 5}}>
				        	<View style={{ height: 60, backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5}} >
				                <Text onPress={() => navigation.navigate('MateriOverview', { title: 'Qolqolah', mat: 'qolqolah'})}>
				                   Qolqolah
				                </Text>
				            </View>
				        </View>
				        <View style={{width: '50%', padding: 5}}>
				        	<View style={{ height: 60, backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, padding: 5}} >
				                <Text onPress={() => navigation.navigate('MateriOverview', { title: 'Hukum Nun Sukun & Tanwin', mat: 'hukum-nun-sukun-tanwin'})}>
				                   Hukum Nun Sukun & Tanwin
				                </Text>
				            </View>
				        </View>
				        <View style={{width: '50%', padding: 5}}>
				        	<View style={{ height: 60, backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5}} >
				                <Text onPress={() => navigation.navigate('MateriOverview', { title: 'Hukum Mim Sukun', mat: 'hukum-mim-sukun'})}>
				                   Hukum Mim Sukun
				                </Text>
				            </View>
				        </View>
				        <View style={{width: '50%', padding: 5}}>
				        	<View style={{ height: 60, backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5}} >
				                <Text onPress={() => navigation.navigate('MateriOverview', { title: 'Hukum Ra', mat: 'hukum-ra'})}>
				                   Hukum Ra
				                </Text>
				            </View>
				        </View>
			        </View>
		        </Content>
	        </ScrollView>
	    </Container>
	)
}

export default Materi