const axios = require('axios').default
const querystring = require('querystring')
const router = require('express').Router()

const generateRandomString = require('../common/generateRandomString')
const client_id = process.env.PHOTOS_CLIENT_ID
const client_secret = process.env.PHOTOS_CLIENT_SECRET
const redirect_uri = 'http://localhost:8888/photos/callback'
const scope = 'https://www.googleapis.com/auth/photoslibrary'
const stateKey = 'photos_auth_state'

router.get('/login', (req, res) => {
	const state = generateRandomString(16)
	res.cookie(stateKey, state)
	res.redirect(
		'https://accounts.google.com/o/oauth2/v2/auth?' +
			querystring.stringify({
				client_id,
				redirect_uri,
				access_type: 'offline',
				response_type: 'code',
				scope,
				state
			})
	)
})

router.get('/callback', (req, res) => {
	const code = req.query.code || null
	const state = req.query.state || null
	const storedState = req.cookies ? req.cookies[stateKey] : null

	if (state === null || state !== storedState) {
		res.status(403).send({ error: 'states mismatch' })
	} else {
		res.clearCookie(stateKey)

		axios({
			url: 'https://oauth2.googleapis.com/token',
			method: 'post',
			params: {
				code,
				client_id,
				client_secret,
				redirect_uri,
				grant_type: 'authorization_code'
			},
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
			.then((response) => {
				res.redirect(
					'http://localhost:3000/#' +
						querystring.stringify({
							photos_access_token: response.data.access_token,
							photos_refresh_token: response.data.refresh_token
						})
				)
			})
			.catch((error) => console.log(error))
	}
})

router.post('/refresh_token', (req, res) => {
	const refresh_token = req.body.refresh_token

	axios({
		url: 'https://oauth2.googleapis.com/token',
		method: 'post',
		params: {
			client_id,
			client_secret,
			grant_type: 'refresh_token',
			refresh_token
		},
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
		.then((response) =>
			res.send({
				photos_access_token: response.data.access_token
			})
		)
		.catch((error) => console.log(error))
})

module.exports = router
