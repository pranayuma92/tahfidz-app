import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TabSetoran from './TabSetoran'
import TabHafalan from './TabHafalan'
import TabValidasi from './TabValidasi'

const LayerTabs = ({ current }) => {
	const renderTab = () => {
		if( current === 'setoran'){
			return <TabSetoran />
		} else if( current === 'hafalan'){
			return <TabHafalan />
		} else if(current === 'validasi'){
			return <TabValidasi />
		}
	}

	return (
		<View style={styles.wrapper}>
			{renderTab()}
		</View>
	)
}

export default LayerTabs

const styles = StyleSheet.create({
	wrapper: {
		marginHorizontal: 15,
		marginVertical: 30
	}
})