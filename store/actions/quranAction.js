import API from '../../utils/api'

const getAllSurah = callback => {
	return dispatch => {
		dispatch({ type: 'REQUEST_DATA_PENDING' })
		API.getAllSurah()
		.then(result => {
			dispatch({ type: 'REQUEST_SURAH_SUCCESS', surah: result.data.data })
		}, error => {
			dispatch({ type: 'REQUEST_DATA_ERROR', error })
		})
	}
}

const getAyah = number => {
	return dispatch => {
		dispatch({ type: 'REQUEST_DATA_PENDING' })
		API.getSurah( number )
		.then(result => {
			dispatch({ type: 'REQUEST_AYAH_SUCCESS' , ayah: result.data.data })
		}, error => {
			dispatch({ type: 'REQUEST_DATA_ERROR', error })
		})
	}
}

export { getAllSurah }