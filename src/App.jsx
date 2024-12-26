import React from "react"
import "./App.css"


import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import OurStore from "./pages/OurStore"
import CompareProducts from "./pages/CompareProducts"
import Wishlist from "./pages/wishlist"
import Login from "./pages/Login"
import ForgotPaswword from "./pages/ForgotPaswword"
import SignUp from "./pages/SignUp"
import SingleProduct from "./pages/SingleProduct"
import Cart from "./pages/Cart"

const App = () => {
  return (
  <>
  <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Layout/>}>
         <Route index element={<Home />}/>
         <Route path="about" element={<About/>}/>
         <Route path="contact" element={<Contact/>}/>
         <Route path="product" element={<OurStore/>}/>
         <Route path="cart" element={<Cart/>}/>
         <Route path="product/:id" element={<SingleProduct/>}/>
         <Route path="compare" element={<CompareProducts/>}/>
         <Route path="wishlist" element={<Wishlist/>}/>
         <Route path="login" element={<Login/>}/>
         <Route path="forgot-password" element={<ForgotPaswword/>}/>
         <Route path="signup" element={<SignUp/>}/>



      </Route>
    </Routes>
  </BrowserRouter></>
  )
}

export default App
