import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SmoothScroll from './components/SmoothScroll.tsx'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './contexts/userContext.tsx';
import { ProductProvider } from './contexts/productContext.tsx';
import { CartProvider } from "./contexts/cartContext";


import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScroll />
      <UserProvider>
        <ProductProvider>
          <CartProvider>
          <App />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
   
  </StrictMode>,
)
