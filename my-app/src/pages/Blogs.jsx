import React, { useEffect, useState } from 'react'
import Breadcrumb from './breadcrumb'
import {Helmet} from "react-helmet";
import meta from '../components/meta';
import BlogCard from './BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { getallProducts } from '../features/product/productSlice';
import { getallBlogs } from '../features/blog/blogSlice';



const Blogs = () => {
    const dispatch = useDispatch();
    const blogState = useSelector(state=>state.blog.blog);
   
    
    const [grid, setgrid] = useState(4)

    useEffect(() => {
        dispatch(getallBlogs()); // Runs only once when component mounts
    }, []);
    
    
  return (
    
    
    <>
    <Helmet>
        <meta title="Our Store"/>
                <meta charSet="utf-8" />
                <title>Our Store</title>
              
            </Helmet>
      <Breadcrumb title= "Our Store"/>
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="conatainer-xl">
            <div className="row">
                <div className="col-3">
                    
                        <div className="filter-card mb-3">
                            <h4 className='filter-title pl-0 ml-0'>Shop by Categories </h4>
                            <div>
                                <ul className="ps-0">
                                    <li>Watch</li>
                                    <li>Tv</li>
                                    <li>Camera</li>
                                    <li>Laptop</li>
                                </ul>
                            </div>
                        </div>
                        <div className="filter-card mb-3">
                        <h4 className='filter-title ml-0 pl-0'>Filter By </h4>
                            <h5 className="sub-title">Availability</h5>
                            
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label htmlFor="" className="form-check-label">
                                    In Stock(1)
                                </label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input"
                                id="" 
                                />
                                <label htmlFor="" className="form-check-label">
                                    Out of Stock(0)
                                </label>
                            </div>
                            <h4 className='filter-title ml-0 pl-0'>Price </h4>
                            <div className='d-flex justify-content-center gap-10'>
                            <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="From"/>
                            <label htmlFor="floatingInput"></label>
                            </div>
                            <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="To"/>
                            <label htmlFor="floatingInput"></label>
                            </div>
                             </div>

                             <h4 className='filter-title ml-0 pl-0'>Colors</h4>
                            <div>
                            <ul className="colors">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            </div>
                            <h5 className='filter-title ml-0 pl-0'>Size</h5>
                            <div className='d-flex flex-wrap gap-10 jusify-content-center align-items-center'>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label htmlFor="" className="form-check-label">
                                    S(1)
                                </label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label htmlFor="" className="form-check-label">
                                    M(1)
                                </label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label htmlFor="" className="form-check-label">
                                    L(1)
                                </label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label htmlFor="" className="form-check-label">
                                    XL(1)
                                </label>
                            </div>

                            </div>



                            
                        </div>
                        <div className="filter-card mb-3">
                            <h4 className="product-tag ">Product Tag</h4>
                            <div className="d-flex flex-wrap justify-content-center align-items-center gap-5 ">
                            <span className='badge bg-light text-secondary py-2 px-3'>Headphones</span>
                            <span className='badge bg-light text-secondary py-2 px-3'>Headphones</span>
                            <span className='badge bg-light text-secondary py-2 px-3'>Headphones</span>
                            <span className='badge bg-light text-secondary py-2 px-3'>Headphones</span>
                            <span className='badge bg-light text-secondary py-2 px-3'>Headphones</span>
                            </div>
                        </div>
                        <div className="filter-card mb-3">
                       
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
