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
import HafalanDetails from '../screens/HafalanDetails'
import Setor from '../screens/Setor'
import Auth from '../screens/Auth'
import Koreksi from '../screens/Koreksi'
import KoreksiDetail from '../screens/KoreksiDetail'
import DetailKoreksi from '../screens/DetailKoreksi'
import TeacherDrawer from './TeacherDrawer'
import MateriOverview from '../screens/MateriOverview'

import Overview from '../screens/Validasi/Overview'
import AddJadwal from '../screens/Validasi/AddJadwal'
import ProsesValidasi from '../screens/Validasi/ProsesValidasi'

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
	HafalanDetails: {
		screen: HafalanDetails,
		navigationOptions: {
            header: null,
        },
	},
	Setor: {
		screen: Setor,
		navigationOptions: {
            header: null,
        },
	},
	Auth: {
		screen: Auth,
		navigationOptions: {
            header: null,
        },
	},
	HomeTeacher: {
		screen: TeacherDrawer,
		navigationOptions: {
            header: null,
        },
	},
	Koreksi: {
		screen: Koreksi,
		navigationOptions: {
            header: null,
        },
	},
	KoreksiDetail: {
		screen: KoreksiDetail,
		navigationOptions: {
            header: null,
        },
	},
	DetailKoreksi: {
		screen: DetailKoreksi,
		navigationOptions: {
            header: null,
        },
	},
	VOverview: {
		screen: Overview,
		navigationOptions: {
            header: null,
        },
	},
	MateriOverview: {
		screen: MateriOverview,
		navigationOptions: {
            header: null,
        },
	},
	AddJadwal: {
		screen: AddJadwal,
		navigationOptions: {
            header: null,
        },
	},
	ProsesValidasi: {
		screen: ProsesValidasi,
		navigationOptions: {
            header: null,
        },
	}
}, {
  initialRouteName: 'Auth'
})

export default createAppContainer(Navigation)