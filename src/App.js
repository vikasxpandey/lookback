import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Grid, CssBaseline } from '@material-ui/core'

import { getHashParams } from './common/helpers'
import { GlobalProvider } from './context/globalContext'
import AuthSpotify from './components/auth/AuthSpotify'
import AuthPhotos from './components/auth/AuthPhotos'
import IntroSpotify from './components/intro/IntroSpotify'
import IntroPhotos from './components/intro/IntroPhotos'

const App = () => {
	const [spotifyAccessToken, setSpotifyAccessToken] = useState(
		localStorage.getItem('spotify_access_token') || null
	)
	const [spotifyRefreshToken, setSpotifyRefreshToken] = useState(
		localStorage.getItem('spotify_refresh_token') || null
	)
	const [photosAccessToken, setPhotosAccessToken] = useState(
		localStorage.getItem('photos_access_token') || null
	)
	const [photosRefreshToken, setPhotosRefreshToken] = useState(
		localStorage.getItem('photos_refresh_token') || null
	)

	useEffect(() => {
		const params = getHashParams()
		if (
			!spotifyAccessToken &&
			!spotifyRefreshToken &&
			params.spotify_access_token &&
			params.spotify_refresh_token
		) {
			localStorage.setItem('spotify_access_token', params.spotify_access_token)
			localStorage.setItem(
				'spotify_refresh_token',
				params.spotify_refresh_token
			)
			setSpotifyAccessToken(params.spotify_access_token)
			setSpotifyRefreshToken(params.spotify_refresh_token)
		} else if (
			!photosAccessToken &&
			!photosRefreshToken &&
			params.photos_access_token &&
			params.photos_refresh_token
		) {
			localStorage.setItem('photos_access_token', params.photos_access_token)
			localStorage.setItem('photos_refresh_token', params.photos_refresh_token)
			setPhotosAccessToken(params.photos_access_token)
			setPhotosRefreshToken(params.photos_refresh_token)
		}
	}, [])

	return (
		<GlobalProvider>
			<BrowserRouter>
				<CssBaseline />
				<Grid style={{ minHeight: '100vh' }} container spacing={0}>
					<Grid style={{ background: '#1db954' }} item sm={6} xs={12}>
						{!spotifyAccessToken && !spotifyRefreshToken ? (
							<AuthSpotify />
						) : (
							<IntroSpotify
								spotify_access_token={spotifyAccessToken}
								setSpotifyAccessToken={setPhotosAccessToken}
							/>
						)}
					</Grid>
					<Grid style={{ background: '#fff' }} item sm={6} xs={12}>
						{!photosAccessToken && !photosRefreshToken ? (
							<AuthPhotos />
						) : (
							<IntroPhotos photos_access_token={photosAccessToken} />
						)}
					</Grid>
				</Grid>
			</BrowserRouter>
		</GlobalProvider>
	)
}

export default App
