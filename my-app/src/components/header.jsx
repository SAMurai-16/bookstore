import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { NavLink,Link } from 'react-router-dom'
import OurStore from '../pages/OurStore'


const Header = () => {
  return (
    <>
    <header className='header-top-strip py-3'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-6">
                    <p className='text-white mb-0'>Free Shipping Over Rs 500 & Free Returns</p>

                </div>
                <div className="col-6">
                    <p className="text-end text-white mb-0"  >
                        Hotline: <a className="text-white" href="tel:+91 9995678080">+91 9995678080</a></p>
                </div>
            </div>
        </div>
    
    <header className="header-upper"></header>
    

    </header>
    <header className="header-upper py-3">
        <div className="container-xxl">
            <div className="row align-items-center">
                <div className="col-2">
                    <h2>
                        <Link className='text-white'>
                        Sammmy
                        </Link>
                    </h2>
                </div>
                <div className="col-5">
                    
<div className="input-group">
  <input type="text" className="form-control py-2" placeholder="Search Product Here..." aria-label="Search Product Here..." aria-describedby="basic-addon2"/>
  <span className="input-group-text p-3" id="basic-addon2"><BsSearch/></span>
</div>
                </div>
                <div className="col-5">
                    <div className="header-upper-links d-flex align-items-center justify-content-between ">
                        <div>
                            <Link to="/compare"className='d-flex align-items-center gap-10 text-white'>
                            <img src="/images/compare.svg" alt="compare"/>
                            
                            <p className="mb-0">
                                Compare <br/> Products
                            </p>
                            </Link>
                        </div>
                        <div>
                            <Link to="/wishlist" className='d-flex align-items-center gap-10 text-white'>
                            <img src="/images/wishlist.svg" alt="wishlist"/>
                            
                            <p className="mb-0">Wishlist</p>
                            </Link>
                        </div>
                        <div>
                            <Link to="/login" className='d-flex align-items-center gap-10 text-white'>
                            <img src="/images/user.svg" alt="user"/>
                           
                            <p className="mb-0">
                                Log in <br/>
                                My Account
                            </p>
                            </Link>
                        </div>
                        <div>
                            <Link to="cart" className='d-flex align-items-center gap-10 text-white'>
                            <img src="/images/cart.svg" alt="cart"/>
                            <div className='d-flex flex-column gap-10'>
                                <span className='badge bg-white text-dark'>0</span>
                                <p className="mb-0">Inr 500</p>
                            </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </header>
    <header className='header-bottom py-2'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className='menu-bottom d-flex align-items-center gap-30'>
                        <div>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="images/menu.svg" alt="" />
                                            <span className='me-5 d-inline-block'>Shop Categories</span> 
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item text-white" to="Name">Action</Link></li>
                                    <li><Link className="dropdown-item text-white" to="Name">Another action</Link></li>
                                    <li><Link className="dropdown-item text-white" to="Name">Something else here</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className='menu-links'>
                            <div className='d-flex align-items-center gap-15'>
                                <NavLink to="/">
                                Home
                                </NavLink >
                                <NavLink to="/product">
                                Our Store
                                </NavLink >
                                <NavLink to="/">
                                 Blogs   
                                </NavLink >
                                <NavLink to="/">
                                  Contact  
                                </NavLink>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>
    </>
  )
}

export default Header
