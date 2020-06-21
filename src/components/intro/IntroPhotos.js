import React, { useEffect, useState } from 'react'

import { GridList, GridListTile } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper
	}
}))

const IntroPhotos = ({ photos_access_token }) => {
	const classes = useStyles()

	const [photos, setPhotos] = useState([])

	const getPhotos = () => {
		fetch('https://photoslibrary.googleapis.com/v1/mediaItems:search', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + JSON.stringify(photos_access_token)
			},
			body: JSON.stringify({
				pageSize: 100,
				filters: {
					dateFilter: {
						dates: [
							{
								year: 2020
							}
						]
					},
					mediaTypeFilter: {
						mediaTypes: ['PHOTO']
					}
				}
			})
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res)
				setPhotos(res.mediaItems)
			})
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		console.log(photos_access_token)
		getPhotos()
	}, [])

	return (
		<div className={classes.root}>
			<GridList cellHeight='auto' style={{ height: '100vh' }}>
				{photos.reverse().map((tile) => (
					<GridListTile key={tile.id}>
						<img src={tile.baseUrl} alt={tile.filename} />
					</GridListTile>
				))}
			</GridList>
		</div>
	)
}

export default IntroPhotos
