import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar, Card, ListItem, Button, Input } from 'react-native-elements'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import NavbarDrawer from '../../components/NavbarDrawer'
import { styles } from '../../styles'
import { addJadwalValidasi } from '../../store/actions/userAction'

const AddJadwal = ({ navigation,user, users, auth, setoran, addJadwalValidasi }) => {
	const [ tanggal, setTanggal ] = useState()
	const [ jam, setJam ] = useState()
	const [ lokasi, setLokasi ] = useState()

	const simpanJadwal = () => {
		const data = {
			tanggal: tanggal,
			jam: jam,
			lokasi: lokasi,
			uid: auth.uid
		}

		addJadwalValidasi(data, () => navigation.goBack())
	}

	return (
		<View style={styles.bgPrimary}>
	        <NavbarDrawer title="Validasi Setoran" navigation={navigation} nomenu/>
	        <ScrollView>
	        <Text style={{paddingHorizontal: 10, marginBottom: 20, fontWeight: 'bold', fontSize: 22, marginTop: 20}}>Buat Jadwal Validasi</Text>
	        <Input 
	        	label="Tanggal"
				labelStyle={{fontWeight: '300'}}
				inputStyle={styling.inputStyle} 
				containerStyle={styling.containerInput} 
				inputContainerStyle={styling.inputContainer}
				onChangeText={(text) => setTanggal(text)} 
			/>
			 <Input 
	        	label="Jam"
				labelStyle={{fontWeight: '300'}}
				inputStyle={styling.inputStyle} 
				containerStyle={styling.containerInput} 
				inputContainerStyle={styling.inputContainer}
				onChangeText={(text) => setJam(text)} 
			/>
			 <Input 
	        	label="Lokasi"
				labelStyle={{fontWeight: '300'}}
				inputStyle={styling.inputStyle} 
				containerStyle={styling.containerInputTextArea} 
				inputContainerStyle={styling.inputContainer}
				onChangeText={(text) => setLokasi(text)} 
			/>
	        </ScrollView>
	        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
	        <Button 
	        		small
	        		title="Simpan" 
	        		buttonStyle={[styles.greenButton, { width: 150, marginRight: 10}]} 
	        		onPress={simpanJadwal} 
	        	/>
	        	</View>
	    </View>
	)
}

const mapStateToProps = (state, props) => {
	const auth = state.firebase.auth;
	const users = state.firestore.data.users;
	const user = users ? users[auth.uid] : null;
	return {
		users: users,
		user: user,
		auth: auth,
		setoran: state.firestore.ordered.setoran
	}
}

const mapDispatchToProps = (dispatch) => ({
	addJadwalValidasi: (data, callback) => dispatch(addJadwalValidasi(data, callback))
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect(({ user, auth }) => {
		return [
			{ collection:'users' },
			{ collection:'setoran' }
		]
	})
)(AddJadwal)


const styling = StyleSheet.create({
	inputContainer: {backgroundColor: '#ffffff', borderBottomWidth: 0, borderRadius: 10},
	containerInput: {height: 70},
	containerInputTextArea: { height: 120 },
	inputStyle: { paddingHorizontal: 10}
})