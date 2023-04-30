import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { WorkOutContextProvider } from "./context/WorkoutContext"
import { AuthContextProvider } from "./context/AuthContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkOutContextProvider>
        <App />
      </WorkOutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
