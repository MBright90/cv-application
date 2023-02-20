import '@fortawesome/fontawesome-free/css/all.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { AppProvider } from './app/appContext'

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<AppProvider />)
