import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	bgPrimary:{
		backgroundColor: '#fff2e2', 
		flex: 1
	},
	darkGrey: {
		color: '#656565'
	},
	hasBold: {
		fontWeight: 'bold', 
	},
	fontBig: {
		fontSize: 17
	},
	fontMedium: {
		fontSize: 14
	},
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
	},

	/* Home style */
	userAvatarWrapper: {
		flexDirection: 'row', 
		paddingVertical: 15
	},
	userAvatarImg: {
		width: '30%', 
		alignItems: 'center', 
		justifyContent: 'center'
	},
	userAvatarSideText: {
		width: '70%', 
		justifyContent: 'center'
	},
	greenButton: {
		backgroundColor: '#50755f', 
		height: 30, 
		borderRadius: 15
	}

})

export { styles }