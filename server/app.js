require('dotenv').config()
const express = require('express')
const axios = require('axios').default
const cors = require('cors')
const querystring = require('querystring')
const cookieParser = require('cookie-parser')

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const redirect_uri = 'http://localhost:8888/callback'
const scope = 'user-read-private user-read-email'
const stateKey = 'spotify_auth_state'

const app = express()
app.use(cors()).use(cookieParser())

const generateRandomString = (length) => {
	let text = ''
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

app.get('/login', (req, res) => {
	const state = generateRandomString(16)
	res.cookie(stateKey, state)
	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id,
				scope,
				redirect_uri,
				state
			})
	)
})

app.get('/callback', (req, res) => {
	const code = req.query.code || null
	const state = req.query.state || null
	const storedState = req.cookies ? req.cookies[stateKey] : null

	if (state === null || state !== storedState) {
		res.status(403).send({ error: 'states mismatch' })
	} else {
		res.clearCookie(stateKey)

		axios({
			url: 'https://accounts.spotify.com/api/token',
			method: 'post',
			params: {
				code,
				redirect_uri,
				grant_type: 'authorization_code'
			},
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization:
					'Basic ' +
					Buffer.from(client_id + ':' + client_secret).toString('base64')
			}
		})
			.then((response) => {
				res.redirect(
					'http://localhost:3000/#' +
						querystring.stringify({
							spotify_access_token: response.data.access_token,
							spotify_refresh_token: response.data.refresh_token
						})
				)
			})
			.catch((error) => console.log(error))
	}
})

app.get('/refresh_token', (req, res) => {
	const refresh_token = req.query.refresh_token

	axios({
		url: 'https://accounts.spotify.com/api/token',
		method: 'post',
		params: {
			grant_type: 'refresh_token',
			refresh_token
		},
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization:
				'Basic ' +
				Buffer.from(client_id + ':' + client_secret).toString('base64')
		}
	})
		.then((response) =>
			res.send({
				spotify_access_token: response.data.access_token
			})
		)
		.catch((error) => console.log(error))
})

app.listen(8888, () => console.log('Server running on port 8888'))
