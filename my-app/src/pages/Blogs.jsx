import React, { useEffect, useState } from 'react'
import Breadcrumb from './breadcrumb'
import {Helmet} from "react-helmet";
import meta from '../components/meta';
import BlogCard from './BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { getallProducts } from '../features/product/productSlice';
import { getallBlogs } from '../features/blog/blogSlice';
import { useLocation } from 'react-router-dom';



const Blogs = () => {
    const dispatch = useDispatch();
    const blogState = useSelector(state=>state.blog.blog);
   
    
    const [grid, setgrid] = useState(4)
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const location = useLocation()


    useEffect(()=>{
        const newCategories = [...new Set(blogState.map(item => item.category))];
        setCategories(newCategories);

    },[blogState,location.pathname])

    useEffect(() => {
        dispatch(getallBlogs({category})); // Runs only once when component mounts
    }, [dispatch,category,location.pathname]);
    
    
  return (
    
    
    <>
          <div className="store-banner text-center m-2 position-relative" 
    style={{ height: 300, overflow: 'hidden', borderRadius: '15px' }}>
    
    {/* Background Image */}
    <img 
        src="https://bostonglobe-prod.cdn.arcpublishing.com/resizer/v_rD_nhhCSCGn6ECO6oVAA-7Src=/1024x0/cloudfront-us-east-1.images.arcpublishing.com/bostonglobe/NFW6ODVD7X353G2JERH7H3SZ4A.jpg" 
        alt="Our Store" 
        className="img-fluid w-100" 
        style={{ height: '100%', objectFit: 'cover' }} 
    />
    
    {/* Black Overlay */}
    <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        background: 'rgba(0, 0, 0, 0.6)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: '15px' 
    }}>
        {/* Store Title */}
        <h1 className="text-white fw-bold" 
            style={{ fontSize: '3rem', fontFamily: 'serif', letterSpacing: '2px' }}>
            BLOGS
        </h1>

        {/* Bookstore Tagline */}
        <p className="text-white" 
            style={{ fontSize: '1.5rem', fontStyle: 'italic', marginTop: '10px' }}>
            A Universe of Stories at Your Fingertips
        </p>
    </div>
</div>
      <div className="store-wrapper home-wrapper-2 py-5 px-3">
        <div className="conatainer-xl">
            <div className="row">
                <div className="col-3">
                    
                        <div className="filter-card mb-3">
                            <h5 className='pl-0 ml-0'>Search by Categories </h5>
                            <div>
                                <ul className="ps-0">
                                {categories.map((item, index) => (
                                        <li key={index} onClick={() => setCategory(item)}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                     
                   
                    
                </div>
                <div className="col-9">
                    <div className="filter-sort-grid mb-5">
                        <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-10">
                        <p>Sort By</p>
                        <select className="form-control form-select">
                            <option value="manual">Featured</option>
                            <option value="best-selling">Best selling</option>
                        </select>
                        </div>
                        <div className='d-flex align-items-center grid gap-15 '>
                            <p className="totalproducts mb-0">21 Products</p>
                            <div className='d-flex gap-10 align-items-center'>
                                <img onClick={()=>{setgrid(12)}} src="images/gr.svg" alt="" className='d-block img-fluid' />
                                <img onClick={()=>{setgrid(6)}} src="images/gr2.svg" alt="" className='d-block img-fluid' />
                                <img onClick={()=>{setgrid(4)}} src="images/gr3.svg" alt="" className='d-block img-fluid' />
                                <img onClick={()=>{setgrid(3)}} src="images/gr4.svg" alt="" className='d-block img-fluid' />
                            </div>
                        </div>

                        </div>
                        

                    
                    
                    </div>
                    <div className="product-list pb-5 d-flex gap-10
                    mb-5 flex-wrap ">
                        <BlogCard data={blogState}/>
                 
                    </div>

                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Blogs
