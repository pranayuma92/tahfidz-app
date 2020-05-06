const initState = {
	pending: false,
	error: false,
	message: '',
	authError: ''
}

const userReducer = (state = initState, action) => {
	switch(action.type){
		case 'AUTH_INIT' :
			return {
				...state,
				pending: false,
				error: false,
				message: 'Checking authentication...',
				authError: ''
			}
		case 'AUTH_PROCESS' :
			return {
				...state,
				pending: true,
				message: 'Authentication in progress...'
			}
		case 'SIGNUP_SUCCESS' :
			return{
				...state,
				pending: false,
				message: 'Add new user success'
			}
		case 'LOGIN_ERROR' :
			console.log('login failed', action.err.message)
			return {
				...state,
				authError: 'Login failed',
				message: action.err.message
			}
		case 'LOGIN_SUCCESS' :
			console.log('login success')
			return {
				...state,
				authError: null,
				message: 'Authentication success'
			}
		case 'SIGNOUT_SUCCESS' :
			console.log('signout success')
			return {
				...state,
				message: 'Sign out success'
			};
		default :
			return state
	}
}

export default userReducer