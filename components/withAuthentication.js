import React, { useEffect, useState } from 'react'
import { Container } from 'native-base'
import { connect } from 'react-redux'

export default (Component) => {
	const withAuthentication = (props) => {
		const [ isAuth, setAuth] = useState(true)
		const { auth } = props.data.firebase

		useEffect(() => {
			if(!auth.uid){
				props.navigation.navigate('Login')
				setAuth(false)
			}
		}, [])

		return (
			<Component {...props} />
		)
	}

	const mapPropsToState = (state) => ({
		data: state
	})

	return connect(mapPropsToState)(withAuthentication)
}

		