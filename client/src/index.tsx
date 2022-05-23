import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './contexts/CartContext'
import { UserProvider } from './contexts/UserContext'
import ProductsProvider from './contexts/ProductsContext'
 import UserContextProvider from './contexts/UserContext'
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <UserProvider>
      <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
      </ProductsProvider>
        </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
