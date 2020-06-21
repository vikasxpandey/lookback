import React, { useEffect, useState } from 'react'

import {
	Container,
	Typography,
	Card,
	CardContent,
	CardMedia,
	GridList
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '10px',
		marginBottom: '10px'
	},
	content: {
		flex: '1 0 auto'
	},
	cover: {
		maxWidth: '100px'
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1)
	},
	playIcon: {
		height: 38,
		width: 38
	}
}))

const IntroSpotify = ({ spotify_access_token, setSpotifyAccessToken }) => {
	const classes = useStyles()

	const [songs, setSongs] = useState([])

	const getTopSongs = () => {
		fetch('https://api.spotify.com/v1/me/top/tracks', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + spotify_access_token
			}
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error && res.error.status === 401) {
					localStorage.clear()
					setSpotifyAccessToken('')
					window.location.href('/')
				} else {
					setSongs(res.items)
				}
			})
	}

	useEffect(() => {
		getTopSongs()
	}, [])

	return (
		<GridList cellHeight='auto' style={{ height: '100vh' }} cols={1}>
			{songs.map((song) => (
				<Container maxWidth='xs' key={song.id}>
					<Card className={classes.root}>
						<CardContent>
							<Typography variant='h5'>{song.name}</Typography>
							<Typography
								style={{ maxWidth: '180px' }}
								noWrap={true}
								variant='subtitle2'
								color='textSecondary'
								title={song.artists.map(
									(artist, index) =>
										artist.name + (index < song.artists.length - 1 ? ', ' : '')
								)}
							>
								{song.artists.map(
									(artist, index) =>
										artist.name + (index < song.artists.length - 1 ? ', ' : '')
								)}
							</Typography>
							<audio controls>
								<source src={song.preview_url} type='audio/mpeg' />
							</audio>
						</CardContent>
						<CardMedia
							className={classes.cover}
							component='img'
							src={song.album.images[0].url}
							title={song.album.name}
						/>
					</Card>
				</Container>
			))}
		</GridList>
	)
}

export default IntroSpotify
