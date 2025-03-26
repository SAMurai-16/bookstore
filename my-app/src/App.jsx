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
import Blogs from "./pages/Blogs"
import Checkout from "./pages/checkout"
import SingleBlog from "./pages/singleBlog"
import Review from "./pages/review"
import Orders from "./pages/Orders"
import Profile from "./pages/Profile"
import ResetPassword from "./pages/resetPassword"
import { PrivateRoutes } from "./routing/protectedRoutes"

import { OpenRoutes } from "./routing/openRoutes"
import Read from "./pages/Read"

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
         <Route path="cart" element={<PrivateRoutes><Cart/></PrivateRoutes>}/>
         <Route path="product/:id" element={<SingleProduct/>}/>
         <Route path="blog/:id" element={<SingleBlog/>}/>
         <Route path="compare" element={<CompareProducts/>}/>
         <Route path="wishlist" element={<PrivateRoutes><Wishlist/></PrivateRoutes>}/>
         <Route path="login" element={<Login/>}/>
         <Route path="profile" element={<Profile/>}/>
         <Route path="orders" element={<Orders/>}/>
         <Route path="orders/:id" element={<Read/>}/>
         <Route path="blog" element={<Blogs/>}/>
         <Route path="product/:id/review" element={<Review/>}/>
         <Route path="checkout" element={<PrivateRoutes><Checkout/></PrivateRoutes>}/>
         <Route path="forgot-password" element={<ForgotPaswword/>}/>
         <Route path="reset-password/:token" element={<ResetPassword/>}/>
         <Route path="signup" element={<SignUp/>}/>
         



      </Route>
    </Routes>
  </BrowserRouter></>
  )
}

export default App
