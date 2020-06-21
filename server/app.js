require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const spotify = require('./routes/spotify')
const photos = require('./routes/photos')
const bodyParser = require('body-parser')

const app = express()
app
	.use(cors())
	.use(cookieParser())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))

app.use('/spotify', spotify)
app.use('/photos', photos)

app.listen(8888, () => console.log('Server running on port 8888'))
