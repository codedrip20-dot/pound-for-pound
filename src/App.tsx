
import LandingPage from './routes/Landingpage'
import Navbar from './routes/Navbar'
import {Routes, Route} from 'react-router-dom'
import CartPage from './routes/Cartpage.tsx'
import AboutUsPage from './routes/Aboutuspage.tsx'
import MarketPage from './routes/Marketpage.tsx'
import SignInPage from './routes/Signinpage.tsx'
import SignUpPage from './routes/Signuppage.tsx'
import MyProfile from './routes/Myprofile.tsx'
import NotificationCom from './components/authenticationCom/NotificationCom.tsx'
import ForgotPassword from './components/authenticationCom/ForgotPassword.tsx'
import ViewProduct from './routes/ViewProduct.tsx'
  

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<LandingPage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='market' element={<MarketPage />} />
        <Route path='signin' element={<SignInPage />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path='aboutus' element={<AboutUsPage />} />
        <Route path='myprofile' element={<MyProfile />} />
        <Route path='verify-email' element={<NotificationCom />} />
        <Route path='reset-password' element={<ForgotPassword />} />
        <Route path='product/:uid' element={<ViewProduct />} />
        <Route path='cart' element={<CartPage />} />
      </Route>

    </Routes>
     
    </>
  )
}

export default App
