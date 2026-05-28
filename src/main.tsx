import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SmoothScroll from './components/SmoothScroll.tsx'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './contexts/userContext.tsx';
import { ProductProvider } from './contexts/productContext.tsx';


import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScroll />
      <UserProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
   
  </StrictMode>,
)
