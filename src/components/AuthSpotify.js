import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/globalContext'

import { getHashParams } from '../common/helpers'
import { Typography, Button, Grid } from '@material-ui/core'

const AuthSpotify = () => {
	const { keys, setSpotifyAccess } = useContext(GlobalContext)

	useEffect(() => {
		const params = getHashParams()
		if (params.spotify_access_token) {
			setSpotifyAccess(params.spotify_access_token)
		}
	}, [])

	return (
		<Grid container spacing={0}>
			<Grid item sm={6} xs={12}>
				{!keys.spotify_access_key ? (
					<Button href='http://localhost:8888/login' variant='contained'>
						Auth Spotify
					</Button>
				) : null}
			</Grid>
			<Grid item sm={6} xs={12}>
				<Typography style={{ paddingTop: '5rem' }}>
					{keys.spotify_access_key ?? null}
				</Typography>
			</Grid>
		</Grid>
	)
}

export default AuthSpotify
