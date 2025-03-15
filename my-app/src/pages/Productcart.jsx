import React from 'react'
import ReactStars from 'react-stars'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtoWishlist } from '../features/product/productSlice';


const Productcart = (props) => {
  const {grid,data}=props

const dispatch = useDispatch()


  const addtolist = (id)=>{
    alert(id);
    
    dispatch(addtoWishlist(id))

  }
  
    let location  = useLocation();
  return (
   <>
   {
      data?.map((item,index)=>{
        return(
            <div key={index}
            className={`${location.pathname=="/OurStore" ? `gr-${grid}` : "col-3" } d-flex`}> 
             <Link to={item?._id} className="product-card position-relative "> 
                <div className="wishlist-icon position-absolute">
                    <button className='border-0' onClick={(e)=>{addtolist(item?._id)}}>
                    <img src="images/wish.svg" alt="" /></button>
                    
                </div>
                <div className="product-image d-flex justify-content-center">
                    <img src={item?.images[0]?.url}
                    width={200}
                    className=''
                     alt="product image" />
                      <img src={item?.images[0]?.url}
                    className='img-fluid'
                     alt="product image" />
                </div>
                <div className="product-details">
                    <h6 className='brand'>
                        {item?.brand}
                    </h6>
                    <h5 className="product-title">
                    {item?.title}
                    </h5>
                    <ReactStars
                        count={5}
                        value={Number(item?.totalratings)}
                        size={24}
                        color2={'#ffd700'} />
                         
                    <p className='price'>Rs {item?.price}</p>
                </div>
                <div className="action-bar position-absolute z-10">
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

        )
      })
   }


   </>
  )
}

export default Productcart
