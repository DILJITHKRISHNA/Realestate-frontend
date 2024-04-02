import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './Redux/store.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from './Redux/store.jsx';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// const quaryClient = new QueryClient()
const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID

console.log(clientId, 'clientId');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId='1086612982293-45aginbtqub1iibtq7md9ebe3claogrp.apps.googleusercontent.com'>
          {/* <QueryClientProvider clientId={quaryClient}> */}
          <App />
          {/* </QueryClientProvider> */}
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
