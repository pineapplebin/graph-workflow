import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')

window.bridge.darkMode.getCurrentMode().then((themeMode) => {
  if (themeMode === 'dark') {
    window.bridge.darkMode.toggle()
  }
})
