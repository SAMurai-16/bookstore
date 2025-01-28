import React from 'react'
import ReactStars from 'react-stars'
import { Link, useLocation } from 'react-router-dom';


const Productcart = (props) => {
  const {grid}=props
    let location  = useLocation();
  return (
   <>
    <div className={`${location.pathname=="/OurStore" ? `gr-${grid}` : "col-3" } d-flex`}> 
        <Link to=":id" className="product-card position-relative ">
            <div className="wishlist-icon position-absolute">
                <button className='border-0'>
                <img src="images/wish.svg" alt="" /></button>
                
            </div>
            <div className="product-image d-flex justify-content-center">
                <img src="images/watch.jpg"
                className=''
                 alt="product image" />
                  <img src="images/watch-1.jpeg"
                className='img-fluid'
                 alt="product image" />
            </div>
            <div className="product-details">
                <h6 className='brand'>
                    Havels
                </h6>
                <h5 className="product-title">
                    KIds HEadphones
                </h5>
                <ReactStars
                    count={5}
                    
                    size={24}
                    color2={'#ffd700'} />
                     
                <p className='price'>Rs 5000</p>
            </div>
            <div className="action-bar position-absolute">
                <div className=' d-flex flex-column gap-15'>
                <button className='border-0 bg-transparent' >
                <img src="images/prodcompare.svg" alt="compare" />
                </button >
                <button className='border-0 bg-transparent' >
                <img src="images/view.svg" alt="view" />
                </button >
                <button className='border-0 bg-transparent' >
                <img src="images/add-cart.svg" alt="addcart" />
                </button >
                </div>
            </div>
        </Link>
      
    </div>
   </>
  )
}

export default Productcart
