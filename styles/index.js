import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	justify: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		width: '100%'
	},
	ayah: {
		width: '83%',
		marginHorizontal: 10,
		fontFamily: 'Quran',
		fontSize: 20
	},
	toCenter: {
		flex: 1, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center'
	}
})

export { styles }