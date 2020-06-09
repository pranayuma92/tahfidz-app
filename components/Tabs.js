import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Home from '../screens/Home'
import Mushaf from '../screens/Mushaf'
import Materi from '../screens/Materi'
import Hafalan from '../screens/Hafalan'
import Profile from '../screens/Profile'

//Inisiasi tabbar
const Tabs = createBottomTabNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			tabBarLabel: 'Beranda',
			tabBarIcon: ({ tintColor }) => (
		      <Image
		        source={require('../assets/house.png')}
		        style={{width: 20, height: 20,tintColor: tintColor}}
		      />
		    ),
		},
	},
	Mushaf: {
		screen: Mushaf,
		navigationOptions: {
			tabBarLabel: 'Mushaf',
			tabBarIcon: ({ tintColor }) => (
		      <Image
		        source={require('../assets/holy-quran.png')}
		        style={{width: 20, height: 20,tintColor: tintColor}}
		      />
		    ),
		},
	},
	Materi: {
		screen: Materi,
		navigationOptions: {
			tabBarLabel: 'Materi',
			tabBarIcon: ({ tintColor }) => (
		      <Image
		        source={require('../assets/open-book.png')}
		        style={{width: 20, height: 20,tintColor: tintColor}}
		      />
		    ),
		},
	},
	Hafalan: {
		screen: Hafalan,
		navigationOptions: {
			tabBarLabel: 'Hafalan',
			tabBarIcon: ({ tintColor }) => (
		      <Image
		        source={require('../assets/study.png')}
		        style={{width: 20, height: 20, tintColor: tintColor}}
		      />
		    ),
		},
	}
}, {
  	initialRouteName: 'Home',
  	tabBarOptions: {
        activeTintColor: 'salmon', 
        inactiveTintColor: 'grey'
    }
})

export default Tabs
