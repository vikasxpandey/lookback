import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { GlobalProvider } from './context/globalContext'
import AuthSpotify from './components/AuthSpotify'

const App = () => {
	return (
		<GlobalProvider>
			<BrowserRouter>
				<AuthSpotify />
			</BrowserRouter>
		</GlobalProvider>
	)
}

export default App
