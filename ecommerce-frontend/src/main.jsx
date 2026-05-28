import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'

axios.defaults.baseURL = 'https://neurocart-backend.onrender.com';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { ToastProvider } from './components/Toast.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AppProvider>
  </BrowserRouter>
);