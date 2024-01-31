import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.jsx';
import { Provider } from 'react-redux'
import store from './Redux/store.jsx';
// import GoogleOAuthProvider from "@react-oauth/google"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <GoogleOAuthProvider clientId={process.env.GOOGLE_AUTH_CLIENT_ID}> */}

        <App />
      {/* </GoogleOAuthProvider> */}
    </Provider>
  </React.StrictMode>,
)
