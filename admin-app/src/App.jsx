import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./components/mainLayout"
import Login from "./pages/Login"
import Resetpasssword from "./pages/resetpassword"
import Forgotpassword from "./pages/forgotpassword"
import Dashboard from "./pages/dashboard"
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogcategoryList from "./pages/BlogcategoryList";
import Orders from "./pages/Orders";
import ProductList from "./pages/ProductList";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import Customers from "./pages/Customers";
import AddProduct from "./pages/AddProduct";
import AddBrand from "./pages/AddBrand";
import AddCategory from "./pages/AddCategory";
import AddBlog from "./pages/AddBlog";
import AddBlogcategory from "./pages/AddBlogcatgory";






const App = () => {
  return (
   <Router>
     <Routes>
     <Route path="/" element={<Login/>}/>
     <Route path="/reset-password" element={<Resetpasssword/>}/>
     <Route path="/forgot-password" element={<Forgotpassword/>}/>
     <Route path="/admin" element={<MainLayout/>}>
        <Route index element={<Dashboard/>}/> 
        <Route path="enquiries" element={<Enquiries/>}/>
        <Route path="blog-list" element={<BlogList/>}/>
        <Route path="Blog-category-list" element={<BlogcategoryList/>}/>
        <Route path="Order" element={<Orders/>}/>
        <Route path="Product-list" element={<ProductList/>}/>
        <Route path="product" element={<AddProduct/>}/>
        <Route path="category-list" element={<CategoryList/>}/>
        <Route path="Brand-list" element={<BrandList/>}/>
        <Route path="customers" element={<Customers/>}/>
        <Route path="Brand" element={<AddBrand/>}/>
        <Route path="Brand/:id" element={<AddBrand/>}/>
        <Route path="category/:id" element={<AddCategory/>}/>
        <Route path="category" element={<AddCategory/>}/>
        <Route path="Blog" element={<AddBlog/>}/>
        <Route path="Blog-Category" element={<AddBlogcategory/>}/>
        <Route path="Blog/:id" element={<AddBlog/>}/>
        <Route path="Blog-Category/:id" element={<AddBlogcategory/>}/>
        <Route path="Product/:id" element={<AddProduct/>}/>



     </Route>
     
      
     </Routes>
   </Router>
  )
}

export default App
