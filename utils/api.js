import axios from 'axios'

const root = 'https://api.alquran.cloud/v1'
const GET = (endpoint) => {
	const promise = new Promise((resolve, reject) => {
		axios.get(`${root}/${endpoint}`)
		.then(result =>{
			resolve(result)
		}, err => {
			reject(err)
		})
	})

	return promise
}

const getAyah = (sid,aid) => GET(`ayah/${sid}:${aid}/ar.alafasy`)
const getSurah = (sid) => GET(`surah/${sid}/ar.alafasy`)
const getSurahWithParams = (sid, offset, limit) => GET(`surah/${sid}/ar.alafasy?offset=${offset}&limit=${limit}`)
const getAllSurah = (sid) => GET('surah') 

const API = { getAyah, getSurah, getSurahWithParams, getAllSurah }

export default API