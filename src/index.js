import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/index'
import { Toaster } from 'react-hot-toast'

const App = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense>
          <App />
          <Toaster
            toastOptions={{
              position: 'top-right',
              style: {
                background: '#283046',
                color: '#fff',
              },
            }}
          />
        </Suspense>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
