import React, { useState,useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch,useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css'

const Header = () => {
  const navigate = useNavigate()
  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([]);
  console.log(productOpt);
  

  const dispatch = useDispatch();
    const cartState = useSelector((state) => state?.auth?.cart)||[];
    console.log(cartState);
    
    const authState = useSelector((state) => state?.auth?.user)|| [];
    const ProductState = useSelector(state=>state?.prod?.product)


    
    


    const getTotalPrice = () => {
      return (cartState).reduce((total, item) => total + item?.ProductId?.price || 0, 0);
    };

    useEffect(()=>{
      let data=[];
      for (let index = 0; index < ProductState?.length; index++) {
        const element = ProductState[index];
        data.push({id:index,prod:element?._id,name:element?.title})
        
      }
      setProductOpt(data)
    },[ProductState])
  
  return (
    <>
      {/* Top Strip */}
      <header className='header-top-strip py-3 px-2'>
        <div className='container-xxl'>
          <div className='row'>

          </div>
        </div>
      </header>

      {/* Upper Header */}
      <header className='header-upper py-3 px-3'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            {/* Logo */}
            <div className='col-2'>
              <h2>
                <Link to='/' className='text-white'>Sammmy</Link>
              </h2>
            </div>

            {/* Search Bar */}
            <div className='col-5'>
              <div className='input-group'>
              <Typeahead
        id="pagination-example"
        onPaginate={() => console.log('Results paginated')}
        onChange={(selected)=>{
          navigate(`/product/${selected[0].prod}`)

        }}
        options={productOpt}
        paginate={paginate}
        labelKey={"name"}
        minLength={2}
        placeholder="Search Products..."
      />
                <span className='input-group-text p-3'><BsSearch /></span>
              </div>
            </div>

            {/* User Links */}
            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-between'>
                <Link to='/orders' className='d-flex align-items-center gap-10 text-white'>
                  <img src='/images/compare.svg' alt='compare' />
                  <p className='mb-0'>Compare <br /> Products</p>
                </Link>
                <Link to='/wishlist' className='d-flex align-items-center gap-10 text-white'>
                  <img src='/images/wishlist.svg' alt='wishlist' />
                  <p className='mb-0'>Wishlist</p>
                </Link>
                <Link to={authState?._id ? "/profile": "/login"} className='d-flex align-items-center gap-10 text-white'>
                  <img src='/images/user.svg' alt='user' />
                  {
                    authState?._id ? <p className='mb-0'>Hey <br/> <strong>{authState?.firstname}</strong></p> :  <p className='mb-0'>Log in <br /> My Account</p>
                  }
                 
                </Link>
                <Link to='/cart' className='d-flex align-items-center gap-10 text-white'>
                  <img src='/images/cart.svg' alt='cart' />
                  <div className='d-flex flex-column gap-10'>
                    <span className='badge bg-white text-dark'>{cartState?.length || "0"}</span>
                    <p className='mb-0'>INR {Array.isArray(cartState) ? getTotalPrice() : "Loading..."}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Header */}
      <header className='header-bottom py-2 '>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='menu-bottom d-flex align-items-center gap-30 justify-content-center'>
                {/* Dropdown Menu */}
            
                {/* Navigation Links */}
                <div className='menu-links my-2 mx-2 align-items-center justify-content-center'>
                  <div className='d-flex align-items-center gap-30  justify-content-center'>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/product'>Our Store</NavLink>
                    <NavLink to='/blog'>Blogs</NavLink>
                    <NavLink to='/contact'>Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
