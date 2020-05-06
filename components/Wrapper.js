import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Container, Spinner } from 'native-base'
import { styles } from '../styles'

const Wrapper = ({ loaded, children }) => {

	return(
		<Container>
			{ !loaded && <View style={styles.toCenter}><Spinner color='red' /></View> }
			{ !!loaded && 
				<Container>{ children }</Container>
			}
		</Container>
	)

}

export default Wrapper