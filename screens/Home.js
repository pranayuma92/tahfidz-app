import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { Container, Spinner, Content, List, ListItem, Left, Right, Thumbnail, Body, Button, Text, Card, CardItem } from 'native-base'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { styles } from '../styles'
import { signOut } from '../store/actions/userAction'
import { getAllSurah } from '../store/actions/quranAction'

const Home = ({ navigation, user, auth, users, signOut, getAllSurah }) => {

	const [ student, setStudent ] = useState(['Fulan', 'Ibnu', 'Hasan', 'Khalid', 'Maulana', 'Iqbal', 'Haikal']) 

	if(!auth.uid){
		navigation.navigate('Login')
	}

	useEffect(() => {
		getAllSurah()
		console.log('ok')
	}, [])

	const handleSignOut = () => {
		signOut(() => {})
	}

	return (
		<Container style={{ backgroundColor: '#fff2e2'}}>
	        <Navbar title="Beranda" />
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
				        	<Button block small style={{backgroundColor: '#50755f', marginBottom: 10}}><Text>Hafalan saya</Text></Button>
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
        				<Text onPress={handleSignOut}>signOut</Text>
			        </ScrollView>
        		}
	    </Container>
	)
}

const mapStateToProps = (state, props) => {
	const auth = state.firebase.auth;
	const users = state.firestore.data.users;
	const user = users ? users[auth.uid] : null;
	return {
		user: user,
		auth: auth
	}
}

const mapDispatchToProps = (dispatch) => ({
	signOut : (callback) => dispatch(signOut(callback)),
	getAllSurah: () => dispatch(getAllSurah())
}) 

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection:'users' }
	])
)(Home)