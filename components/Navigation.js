import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { connect } from 'react-redux'
import Tabs from './Tabs'
import Drawer from './Drawer'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import SurahSingle from '../screens/SurahSingle'
import Profile from '../screens/Profile'
import Setting from '../screens/Setting'
import HafalanSingle from '../screens/HafalanSingle'

//Inisiasi untuk menjalankan navigasi
const Navigation = createStackNavigator({
	Home: {
		screen: Drawer,
		navigationOptions: {
            header: null,
        },
	},
	Login: {
		screen: Login,
		navigationOptions: {
            header: null,
        },
	},
	SignUp: {
		screen: SignUp,
		navigationOptions: {
            header: null,
        },
	},
	SurahSingle: {
		screen: SurahSingle,
		navigationOptions: {
            header: null,
        },
	},
	Profile: {
		screen: Profile,
		navigationOptions: {
            header: null,
        },
	},
	Setting: {
		screen: Setting,
		navigationOptions: {
            header: null,
        },
	},
	HafalanSingle: {
		screen: HafalanSingle,
		navigationOptions: {
            header: null,
        },
	}

}, {
  initialRouteName: 'Home'
})

export default createAppContainer(Navigation)