import React, { useEffect, useState } from 'react';
import Breadcrumb from './breadcrumb';
import { useLocation } from 'react-router-dom';
import Productcart from './Productcart';
import { useDispatch, useSelector } from 'react-redux';
import { getallProducts } from '../features/product/productSlice';
import { getUserWishlist } from '../features/user/userSlice';
import { Helmet } from "react-helmet";

import Meta from "../components/meta";

const OurStore = () => {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.prod.product);
    const location = useLocation();
    
    const [grid, setGrid] = useState(4);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brand, setBrand] = useState(null);
    const [category, setCategory] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sort, setSort] = useState(null);
    const [tags,setTags] = useState([])
    const [tag,setTag] = useState(null)



    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tagFromURL = params.get('tag');
        if (tagFromURL) {
            setTag(tagFromURL);
        }
        const categoryFromURL = params.get('category');
        if (categoryFromURL) {
            setCategory(categoryFromURL);
        }
        
    }, [location.search]);
    
    

    useEffect(() => {
        const newBrands = [...new Set(productState.map(item => item.brand))];
        const newCategories = [...new Set(productState.map(item => item.category))];
        const newTag = [...new Set(productState.map(item => item.tag))]
        setTags(newTag)
        setBrands(newBrands);
        setCategories(newCategories);
    }, [productState]);

    useEffect(() => {
        dispatch(getallProducts({ sort, brand, category,tag, minPrice, maxPrice }));
 }, [sort, brand, category, minPrice, maxPrice,tag,dispatch]);


    useEffect(() => {
        const fetchWishlist = async () => {
            const token = localStorage.getItem("customer");
            if (token) {
                dispatch(getUserWishlist());
            }
        };
    
        fetchWishlist();
    }, [dispatch]);  // Keeping only `dispatch` in dependency to avoid unnecessary calls
    


    return (
        <>
        <Helmet>
                            <Meta title="Store" />
                            <Meta charSet="utf-8" />
                            <title>Store</title>
                        </Helmet>


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
            OUR STORE
        </h1>

        {/* Bookstore Tagline */}
        <p className="text-white" 
            style={{ fontSize: '1.5rem', fontStyle: 'italic', marginTop: '10px' }}>
            A Universe of Stories at Your Fingertips
        </p>
    </div>
</div>


         

            <div className="store-wrapper home-wrapper-2 py-5 px-5">
                <div className="container-xxl">
                    <div className="row">
                        {/* Sidebar Filters */}
                        <div className="col-3">
                            <div className="filter-card mb-3">
                                <h5>Shop by Categories</h5>
                                <ul className="ps-0">
                                    {categories.map((item, index) => (
                                        <li key={index} onClick={() => setCategory(item)}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="filter-card mb-3">
                                <h5>Shop by Author</h5>
                                <ul className="ps-0">
                                    {brands.map((item, index) => (
                                        <li key={index} onClick={() => setBrand(item)}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="filter-card mb-3">
                            <h5 className="product-tag ">Product Tag</h5>
                            <div className="d-flex flex-wrap justify-content-center align-items-center gap-5 ">
                            {tags && tags.map((item, index) => (
                                         <span key={index} onClick={()=> setTag(item)} className='badge bg-light text-secondary py-2 px-3 mx-2'>{item}</span>
                                    ))}

                            </div>
                        </div>

                            <div className="filter-card mb-3">
                                <h5>Filter By</h5>
                

                                <h4 className='filter-title'>Price</h4>
                                <div className='d-flex justify-content-center gap-10 filter-title'>
                                    <input type="number" className="form-control" placeholder="From" onChange={(e) => setMinPrice(e.target.value)} />
                                    <input type="number" className="form-control" placeholder="To" onChange={(e) => setMaxPrice(e.target.value)} />
                                </div>
                            </div>
                            <div>
                            <button
  className="text-white border-0 p-2 rounded" 
  style={{
    color: "black",
    backgroundColor: "red",
    borderRadius: "5px",  // Rounded corners
  }}
  onClick={() => window.location.reload()} // Correct reload function
>
  Remove Filters
</button>

                            </div>
                        </div>

                        {/* Product List */}
                        <div className="col-9">
                            <div className="filter-sort-grid mb-5">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-10">
                                        <p>Sort By</p>
                                        <select className="form-control form-select" onChange={(e) => setSort(e.target.value)}>
                                            <option value="title">Alphabetically, A-Z</option>
                                            <option value="-title">Alphabetically, Z-A</option>
                                            <option value="price">Price, Low to High</option>
                                            <option value="-price">Price, High to Low</option>
                                            <option value="createdAt">Old to New</option>
                                            <option value="-createdAt">New to Old</option>
                                        </select>
                                    </div>
                                    <div className='d-flex align-items-center grid gap-15'>
                                        <p className="totalproducts mb-0">{productState.length}  Products</p>
                                        <div className='d-flex gap-10 align-items-center'>
                                            <img onClick={() => setGrid(12)} src="images/gr.svg" alt="Grid 12" className='d-block img-fluid' />
                                            <img onClick={() => setGrid(6)} src="images/gr2.svg" alt="Grid 6" className='d-block img-fluid' />
                                            <img onClick={() => setGrid(4)} src="images/gr3.svg" alt="Grid 4" className='d-block img-fluid' />
                                            <img onClick={() => setGrid(3)} src="images/gr4.svg" alt="Grid 3" className='d-block img-fluid' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="product-list pb-5 d-flex gap-10 mb-5 flex-wrap">
                                <Productcart data={productState} grid={grid} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OurStore;
