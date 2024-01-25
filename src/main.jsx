import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import App from './App.jsx';
import { Provider } from 'react-redux' 
import { store } from './Redux/store.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
  </React.StrictMode>,
)
