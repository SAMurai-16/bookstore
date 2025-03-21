import React, { useEffect } from 'react'
import ReactStars from 'react-stars'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addtoWishlist } from '../features/product/productSlice';
import { FaHeart } from "react-icons/fa";
import { getUserWishlist } from '../features/user/userSlice';


const Productcart = (props) => {
  const {grid,data}=props

const dispatch = useDispatch()


  const addtolist = (id)=>{
   
    
    dispatch(addtoWishlist(id))

  }

    useEffect(() => {
      const fetchWishlist = async () => {
        await dispatch(getUserWishlist()); // Wait for API response
         // Set loading to false after fetching
      };
      fetchWishlist();
    }, [dispatch]);
    const authState = useSelector((state) => state.auth?.user?.wishlist || []);
  
    let location  = useLocation();
  return (
   <>
   {
      data?.map((item,index)=>{
        return(
            <div key={index}
            className={`${location.pathname=="/OurStore" ? `gr-${grid}` : "col-3" } d-flex`}> 
             <Link to={item?._id} className="product-card position-relative "> 
                <div className="wishlist-icon position-absolute z-10">
                    <button className='border-0 bg-transparent' onClick={(e)=>
                       
                      
                      { e.preventDefault()
                        addtolist(item?._id)}}>
                     {
                                            authState.some(auth=>
                                              auth?._id === item?._id)
                                             ? <FaHeart color="red"/> : <FaHeart color="black"/> 
                                          }</button>
                    
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
               
             </Link> 
          
        </div>

        )
      })
   }


   </>
  )
}

export default Productcart
