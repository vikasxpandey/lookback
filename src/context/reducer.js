import { SET_SPOTIFY_ACCESS, SET_PHOTOS_ACCESS } from './types'

export default (state, action) => {
	switch (action.type) {
		case SET_SPOTIFY_ACCESS:
			return {
				...state,
				spotify_access_key: action.payload
			}
		case SET_PHOTOS_ACCESS:
			return {
				...state,
				photos_access_key: action.payload
			}
		default:
			return state
	}
}
