import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { View, ScrollView, Image, ActivityIndicator, Text } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import NavbarDrawer from '../components/NavbarDrawer'
import { styles } from '../styles'

const HafalanSingle = ({ navigation, user, auth,  hafalan, koreksi }) => {
	if(!auth.uid){
		navigation.replace('Login')
	}
		
	const dataHafalan = hafalan && hafalan.filter( item => user && user.hafalan.includes(item.id))

	return (
		<View style={styles.bgPrimary}>
	        <NavbarDrawer title="Hafalan Saya" navigation={navigation} />
	        <ScrollView>
	        	{
	        		!!koreksi &&
	        		<View>
	        			<View style={{padding: 10}}>
	        				<Text style={{fontSize: 18, fontWeight: 'bold'}}>Koreksi oleh guru</Text>
	        			</View>
	        			{
	        				!!koreksi && koreksi.map((item, index) => { 
	        					if(item.uid === auth.uid){
		        					return (
		        						<ListItem 
						       				key={index} 
						       				
						       				title={
						       					<Text style={{ marginLeft: 10, fontFamily: 'Quran', fontSize: 16, fontWeight: 'bold', color: '#656565'}}>{item.title} ayat {item.numberInSurah} </Text>
						       				}
						       				leftElement={
						       					<View style={{ backgroundColor: 'salmon', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
						       						<Text style={{ color: '#fff' }}>{index+1}</Text>
						       					</View>
						       				}
						       				containerStyle={{backgroundColor: '#fff2e2'}}
						       				bottomDivider
											chevron
											onPress={() => navigation.push('DetailKoreksi', { detail: item }) }
	
						       			/>
			        				)}
		        				}
	        				)

	        			}
	        		</View>
	        	}
	        	{
	        		<View>
	        			<View style={{padding: 10}}>
	        				<Text style={{fontSize: 18, fontWeight: 'bold'}}>Hafalan saya</Text>
	        			</View>
			        	{ !!dataHafalan && dataHafalan.map((item, index) => (
			       			<ListItem 
			       				key={index} 
			       				
			       				title={
			       					<Text style={{ marginLeft: 10, fontFamily: 'Quran', fontSize: 16, fontWeight: 'bold', color: '#656565'}}>{item.surah.split('_')[1]} | {item.from} - {item.to} </Text>
			       				}
			       				leftElement={
			       					<View style={{ backgroundColor: 'salmon', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
			       						<Text style={{ color: '#fff' }}>{index+1}</Text>
			       					</View>
			       				}
			       				containerStyle={{backgroundColor: '#fff2e2'}}
			       				bottomDivider
								chevron
								onPress={() => navigation.push('HafalanDetails', {surah : item.surah.split('_')[0], title: item.surah.split('_')[1],  to: item.to, from: item.from}) }

			       			/>

			       		))}
	        		</View>
	        	}
	        </ScrollView>
	    </View>
	)
}

const mapStateToProps = (state) => {
	const auth = state.firebase.auth;
	const users = state.firestore.data.users;
	const user = users ? users[auth.uid] : null;
	const hafalan = state.firestore.ordered.hafalan
	return {
		user: user,
		auth: auth,
		hafalan: hafalan,
		koreksi: state.firestore.ordered.koreksi
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection:'users' },
		{ collection: 'hafalan'},
		{ collection: 'koreksi'}
	])
)(HafalanSingle)