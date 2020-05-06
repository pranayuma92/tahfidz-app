import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { connect } from 'react-redux'
import Tabs from './Tabs'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import SurahSingle from '../screens/SurahSingle'

const Navigation = createStackNavigator({
	Home: {
		screen: Tabs,
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
	}
}, {
  initialRouteName: 'Home'
})

export default createAppContainer(Navigation)