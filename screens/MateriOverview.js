import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar, Button, Card, ListItem } from 'react-native-elements'
import NavbarDrawer from '../components/NavbarDrawer'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Modal from 'react-native-modal'
import { styles } from '../styles'

const MateriOverview = ({ navigation, module, mod }) => {
	const { title, mat } = navigation.state.params
	const modules = module && module.filter( item => item.cat === mat )

	const [isModalVisible, setModalVisible] = useState(false)

	const [ matsingle, setMatsingle ] = useState({})
  
	const toggleModal = (id) => {
	    setModalVisible(!isModalVisible)

	    

		    const mat = {
		    	title: mod[id].title,
		    	content: mod[id].content,
		    	img: mod[id].img ? mod[id].img : '',
		    	sound: mod[id].sound ? mod[id].sound : ''
		    }

		    setMatsingle(mat)
	    
	    console.log(mod[id].title)
	}

	const closeModal = () => {
		setModalVisible(!isModalVisible)
	}

	return (
		<View style={styles.bgPrimary}>
	        <NavbarDrawer title={title} navigation={navigation} nomenu/>
	        <ScrollView>
	        { modules && modules.map(item => (
	        <ListItem 
				
				key={item.id}
				title={
					<Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#656565'}}>{item.title}</Text>
				}
				leftElement={
					<View style={{ backgroundColor: 'salmon', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{ color: '#fff' }}>1</Text>
					</View>
				}
				containerStyle={{backgroundColor: '#fff2e2'}}
				bottomDivider
				chevron
				onPress={() => toggleModal(item.id)}

			/>
			))}
	        </ScrollView>
	        <Modal isVisible={isModalVisible}>
	          	<View style={{backgroundColor: '#fff', padding: 10, borderRadius: 10}}>
	            	<Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>{matsingle.title}</Text>
	            	<Image source={{uri: matsingle.img }}/>
	            	<Text style={{marginBottom: 30}}>{matsingle.content}</Text>
	            	<Button 
		        		small
		        		title="Tutup" 
		        		buttonStyle={styles.greenButton} 
		        		onPress={closeModal} 
		        	/>
	          	</View>
	        </Modal>
	    </View>
	)
}

const mapStateToProps = state => ({
	module : state.firestore.ordered.cat_module,
	mod: state.firestore.data.cat_module
})

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection:'cat_module' }
	])
)(MateriOverview)