import React from 'react'
import { Header, Button, Icon } from 'react-native-elements'

const NavbarDrawer = ({ title, navigation, nomenu }) => {
	return (
		<Header
			statusBarProps={{ barStyle: 'light-content' }}
  			barStyle="light-content" 
	        containerStyle={{
		    	backgroundColor: 'salmon',
		    	justifyContent: 'space-around',
		    	paddingTop: 0,
		    	height: 40,
		    	borderBottomRightRadius: 20,
		  	}}
		  	leftComponent={<Button onPress={() => nomenu ? navigation.goBack() : navigation.toggleDrawer()}
			  icon={
			    <Icon
			      name={nomenu ? 'chevron-left' : 'menu'}
			      size={25}
			      color="white"
			      style="solid"
			    />
			  }
			  type="clear"
			/>}
		  centerComponent={{ text: title, style: { color: '#fff', fontWeight: 'bold' } }}
		/>
	)
}

export default NavbarDrawer