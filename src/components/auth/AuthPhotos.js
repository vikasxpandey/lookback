import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Container } from '@material-ui/core'

const useStyles = makeStyles({
	flexCenter: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%'
	}
})

const AuthPhotos = () => {
	const classes = useStyles()

	return (
		<Container className={classes.flexCenter}>
			<Button href='http://localhost:8888/photos/login' variant='contained'>
				Auth Photos
			</Button>
		</Container>
	)
}

export default AuthPhotos
