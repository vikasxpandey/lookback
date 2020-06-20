import React, { createContext, useReducer } from 'react'

import { SET_SPOTIFY_ACCESS, SET_PHOTOS_ACCESS } from './types'
import Reducer from './reducer'

const initialState = {
	spotify_access_key: '',
	photos_access_key: ''
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState)

	const setSpotifyAccess = (key) => {
		dispatch({
			type: SET_SPOTIFY_ACCESS,
			payload: key
		})
	}

	const setPhotosAccess = (key) => {
		dispatch({
			type: SET_PHOTOS_ACCESS,
			payload: key
		})
	}

	return (
		<GlobalContext.Provider
			value={{
				keys: {
					spotify_access_key: state.spotify_access_key,
					photos_access_key: state.photos_access_key
				},
				setSpotifyAccess,
				setPhotosAccess
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
