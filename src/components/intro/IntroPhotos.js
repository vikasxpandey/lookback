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
				pageSize: 21,
				filters: {
					dateFilter: {
						ranges: [
							{
								startDate: {
									year: 2020,
									month: 1,
									day: 1
								},
								endDate: {
									year: 2020,
									month: 6,
									day: 20
								}
							}
						]
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
			<GridList cellHeight={160} cols={2}>
				{photos.map((tile) => (
					<GridListTile key={tile.id} cols={tile.length || 1}>
						<img src={tile.baseUrl} alt={tile.filename} />
					</GridListTile>
				))}
			</GridList>
		</div>
	)
}

export default IntroPhotos
