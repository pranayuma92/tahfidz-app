import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import Navigation from './Navigation'
import Tabs from './Tabs'
import DrawerContent from './DrawerContent'

const Drawer =  createDrawerNavigator({
	Home: Tabs
}, {
	initialRouteName: 'Home',
	drawerType: 'push-screen',
	contentOptions: {
      activeTintColor: '#ffffff'
    },
    drawerBackgroundColor: 'salmon',
    contentComponent: DrawerContent
})

export default createAppContainer(Drawer)