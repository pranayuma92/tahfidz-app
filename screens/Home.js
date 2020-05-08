//Komponen beranda

import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { Container, Spinner, Content, List, ListItem, Left, Right, Thumbnail, Body, Button, Text, Card, CardItem } from 'native-base'
import NavbarDrawer from '../components/NavbarDrawer'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { styles } from '../styles'
import { getAllSurah } from '../store/actions/quranAction'

const Home = ({ navigation, user, auth, users, getAllSurah }) => {

	//Inisasi data lokal komponen
	const [ student, setStudent ] = useState(['Fulan', 'Ibnu', 'Hasan', 'Khalid', 'Maulana', 'Iqbal', 'Haikal']) 

	//Cek autentikasi
	//Jika autentikasi ID kosong, arahkan ke layar login
	if(!auth.uid){
		navigation.replace('Login')
	}

	useEffect(() => {
		//Memanggil fungsi untuk mengambil data surah dan ayat dari API
		getAllSurah()
	}, [])

	//Render komponen
	return (
		<Container style={{ backgroundColor: '#fff2e2'}}>
	        <NavbarDrawer title={!!user ?  `Assalamu'alaikum, ${user.name.split(' ')[0]}` : 'Beranda'} navigation={navigation}/>
    		{ !user && <View style={styles.toCenter}><Spinner color='red' /></View> }
    		{
    			!!user &&
		        <ScrollView>
		        	<List>
			            <ListItem thumbnail style={{ borderColor: '#fff2e2' }}>
			              <Left>
			                <Thumbnail rounded source={{ uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y' }} />
			              </Left>
			              <Body>
			                <Text style={{fontWeight: 'bold', fontSize: 17}}>{user.name}</Text>
			                <Text note numberOfLines={1}>Sedang di hafal</Text>
			                <Text note numberOfLines={1} style={{fontWeight: 'bold', fontSize: 14}}>Al-Mursalat 1 -10</Text>
			              </Body>
			            </ListItem>
			        </List>
			        <Content style={{paddingHorizontal: 15}}>
			        	<Button block small style={{backgroundColor: '#50755f', marginBottom: 10}} onPress={() => navigation.toggleDrawer()}><Text>Hafalan saya</Text></Button>
			        	<Card>
			            	<List>
			            		{ student.map( item => (
						            <ListItem thumbnail style={{ borderColor: '#fff2e2' }}>
						              <Left>
						                <Thumbnail rounded source={{ uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y' }} />
						              </Left>
						              <Body>
						                <Text style={{fontSize: 15}}>{item}</Text>
						                <Text note numberOfLines={1}>Al-Anbiya</Text>
						                <Text note numberOfLines={1} style={{fontSize: 14}}>1 -10</Text>
						              </Body>
						            </ListItem>
			            		))}
					        </List>
			          	</Card>
			        </Content>
		        </ScrollView>
    		}
	    </Container>
	)
}

//Mengambil data dari redux store dan mengubahnya menjadi props
const mapStateToProps = (state, props) => {
	const auth = state.firebase.auth;
	const users = state.firestore.data.users;
	const user = users ? users[auth.uid] : null;
	return {
		user: user,
		auth: auth
	}
}

//Memanggil fungsi action creator dan mengubahnya menjadi props
const mapDispatchToProps = (dispatch) => ({
	getAllSurah: () => dispatch(getAllSurah())
}) 

//Menghubungkan komponen dengan redux store
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection:'users' }
	])
)(Home)