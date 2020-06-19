import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import DrawerContent from './DrawerContent'
import HomeTeacher from '../screens/HomeTeacher'

const TeacherDrawer =  createDrawerNavigator({
	Root: HomeTeacher
}, {
	initialRouteName: 'Root',
	drawerType: 'push-screen',
	contentOptions: {
      activeTintColor: '#ffffff'
    },
    drawerBackgroundColor: 'salmon',
    contentComponent: DrawerContent
})

export default createAppContainer(TeacherDrawer)