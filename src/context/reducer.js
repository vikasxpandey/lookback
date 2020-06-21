import { SET_SPOTIFY_ACCESS, SET_PHOTOS_ACCESS } from './types'

export default (state, action) => {
	switch (action.type) {
		case SET_SPOTIFY_ACCESS:
			localStorage.setItem('spotify_access_key', action.payload)
			return {
				...state,
				spotify_access_key: localStorage.getItem('spotify_access_key')
			}
		case SET_PHOTOS_ACCESS:
			localStorage.setItem('photos_access_key', action.payload)
			return {
				...state,
				photos_access_key: localStorage.getItem('photos_access_key')
			}
		default:
			return state
	}
}
